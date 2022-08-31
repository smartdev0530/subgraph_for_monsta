# Auction Subgraph

## Setup

1. Run graph-node
2. Install packages

```bash
yarn install
```

3. Generate and deploy

```bash
yarn codegen
yarn create-local
yarn deploy-local
```

## Sample Query

```json
query {
  monstas (
    orderBy: token
    orderDirection: asc
    where:{auctionStatus: SystemAuctionCreated}
    first: 9
    skip: 0
  ) {
    id
    txid
    timestamp
    owner
    genes
    monstaStatus
    auctionStatus
    matron {
      id
    }
    sire {
      id
    }
    monstaEvents (
      orderBy: timestamp
      orderDirection: desc
      where: {
        type_in: [SystemAuctionCreated  SystemAuctionCancelled SystemAuctionSuccessful]
      }
      first: 1
    ) {
      id
      timestamp
      type
      ... on AuctionCreate {
        startingPrice
        endingPrice
        duration
        seller
      }
      ... on AuctionSucceed {
        totalPrice
        winner
      }
    }
  }
}
```