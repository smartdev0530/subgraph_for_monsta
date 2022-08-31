# Subgraph

Setup subgraph for bridge interface.

## Installation

Tested on Ubuntu 20.04

```bash
sudo apt-get update
sudo apt-get install postgresql

curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
source $HOME/.cargo/env

wget https://dist.ipfs.io/go-ipfs/v0.10.0/go-ipfs_v0.10.0_linux-amd64.tar.gz
tar -xvzf go-ipfs_v0.10.0_linux-amd64.tar.gz
cd go-ipfs/
sudo bash install.sh
ipfs --version
ipfs init
# ipfs daemon

sudo apt-get install -y clang libpq-dev libssl-dev pkg-config
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt-get update
sudo apt-get install yarn
```

Setup IPFS autostart

```bash
sudo nano /etc/systemd/system/ipfs.service

[Unit]
Description=IPFS Daemon
After=syslog.target network.target remote-fs.target nss-lookup.target

[Service]
Type=simple
ExecStart=/usr/local/bin/ipfs daemon --enable-namesys-pubsub
User=ubuntu
[Install]
WantedBy=multi-user.target

sudo systemctl enable ipfs
sudo systemctl start ipfs
sudo systemctl status ipfs
```

Setup database

```bash
sudo su - postgres
createdb graph-node
psql
create user subgraph with encrypted password 'K6dZDt8v9hZA6P8';
grant all privileges on database "graph-node" to subgraph;
\connect graph-node
create extension pg_trgm;
create extension pg_stat_statements;
create extension btree_gist;
create extension postgres_fdw;
grant usage on foreign data wrapper postgres_fdw to subgraph;
\q
exit
```

## Usage

Configure

```bash
git clone https://github.com/poanetwork/xdai-omnibridge-ui.git
cd xdai-omnibridge-ui/
yarn
yarn subgraph:prepare-monsta
```

Run local node

```bash
git clone https://github.com/graphprotocol/graph-node
cd graph-node
cargo build
cargo run -p graph-node --release -- \
  --postgres-url postgresql://subgraph:K6dZDt8v9hZA6P8@localhost:5432/graph-node \
  --ethereum-rpc monsta:https://testnet.monstachain.org/ \
  --ipfs 127.0.0.1:5001
```

Deploy local node

```bash
cargo build --release
sudo cp target/release/graph-node /usr/local/bin/graph-node
sudo nano /etc/systemd/system/graph.service

[Unit]
Description=Graph Daemon
After=syslog.target network.target remote-fs.target nss-lookup.target

[Service]
Type=simple
ExecStart=/usr/local/bin/graph-node \
  --postgres-url postgresql://subgraph:K6dZDt8v9hZA6P8@localhost:5432/graph-node \
  --ethereum-rpc monsta:https://testnet.monstachain.org/ \
  --ipfs 127.0.0.1:5001
ExecStart2=/usr/local/bin/graph-node \
  --ipfs 127.0.0.1:5001 \
  --node-id viewer1 \
  --config /home/ubuntu/shard.toml
User=ubuntu
Environment=GRAPH_GRAPHQL_QUERY_TIMEOUT=10
Environment=GRAPH_GRAPHQL_MAX_DEPTH=10
Environment=GRAPH_GRAPHQL_MAX_OPERATIONS_PER_CONNECTION=5
Environment=GRAPH_GRAPHQL_MAX_FIRST=100
Environment=GRAPH_SQL_STATEMENT_TIMEOUT=10
Environment=DISABLE_BLOCK_INGESTOR=true
Environment=STORE_CONNECTION_POOL_SIZE=100
Environment=GRAPH_QUERY_CACHE_MAX_MEM=10000
Environment=EXPERIMENTAL_SUBGRAPH_VERSION_SWITCHING_MODE=synced
LimitNOFILE=1048576
LimitNOFILESoft=48576
[Install]
WantedBy=multi-user.target

sudo systemctl enable graph
sudo systemctl start graph
sudo systemctl status graph
```

Deploy

```bash
yarn subgraph:codegen
yarn subgraph:build
yarn subgraph:create-monsta
yarn subgraph:deploy-monsta
```

## Troubleshoot

Not enough memory while building graph-node

```bash
sudo fallocate -l 4G /swapfile
sudo dd if=/dev/zero of=/swapfile bs=1024 count=4194304
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
sudo swapon --show
sudo free -h

sudo swapoff -v /swapfile
sudo rm /swapfile
```