import { Address, TypedMap, log, dataSource } from '@graphprotocol/graph-ts';

import { Token } from '../types/Omnibridge/Token';
import { Token as TokenEntity } from '../types/schema';

class TokenObject {
  address: Address;
  name: string;
  symbol: string;
  decimals: i32;
}

function getOverrides(): TypedMap<Address, boolean> {
  let overridenTokens = new TypedMap<Address, boolean>();

  // **** OVERRIDES START ****
  overridenTokens.set(
    // xMONI MONI Testnet
    Address.fromString('0xb12Ba3134d569a6961429511dCa6bEa0755CA39E'),
    true,
  );
  overridenTokens.set(
    // xMONI MONI Mainnet
    Address.fromString('0x7D2ea85F1dF98201289598E20778529f98E0d2Ba'),
    true,
  );
  overridenTokens.set(
    // xSTT STT Testnet
    Address.fromString('0xa5cee110eF72333E44D8aeb882B07aAB0F7175F4'),
    true,
  );
  // **** OVERRIDES END ****

  return overridenTokens;
}

export var overrides = getOverrides();

export function fetchTokenInfo(address: Address): TokenObject {
  let tokenInstance = Token.bind(address);
  log.debug('TokenContract at {}', [address.toHex()]);
  let tokenObject = new TokenObject();
  tokenObject.address = address;

  let name = tokenInstance.try_name();
  let symbol = tokenInstance.try_symbol();
  let decimals = tokenInstance.try_decimals();

  if (!name.reverted) {
    tokenObject.name = name.value;
  }

  if (!symbol.reverted) {
    tokenObject.symbol = symbol.value;
  }

  if (!decimals.reverted) {
    tokenObject.decimals = decimals.value;
  }

  return tokenObject;
}

function getMediatedTokens(): TypedMap<Address, Address> {
  let mediatedTokens = new TypedMap<Address, Address>();

  // **** OVERRIDES START ****
  mediatedTokens.set(
    // xMONI MONI Testnet
    Address.fromString('0x408d8B8545D9d751e51cf8e58EEA8fA2B188bCd9'),
    Address.fromString('0xb12Ba3134d569a6961429511dCa6bEa0755CA39E'),
  );
  mediatedTokens.set(
    // xMONI MONI Mainnet
    Address.fromString('0xCC353470f632aF83686e2bFeC8681103062B06B3'),
    Address.fromString('0x7D2ea85F1dF98201289598E20778529f98E0d2Ba'),
  );
  mediatedTokens.set(
    // xSTT STT Testnet
    Address.fromString('0x79411b53a2acc914f0C874c54975c7D63ee9731E'),
    Address.fromString('0xa5cee110eF72333E44D8aeb882B07aAB0F7175F4'),
  );
  // **** OVERRIDES END ****

  return mediatedTokens;
}

export var mediatedTokens = getMediatedTokens();

export function fetchMediatedTokenInfo(mediator: Address): TokenObject {
  return fetchTokenInfo(mediatedTokens.get(mediator));
}

export function updateHomeToken(tokenAddress: Address): void {
  let token = TokenEntity.load(tokenAddress.toHexString());
  if (token == null) {
    let tokenInfo = fetchTokenInfo(tokenAddress);
    updateHomeTokenInfo(tokenAddress, tokenInfo);
  }
}

export function updateHomeTokenInfo(
  tokenAddress: Address,
  tokenObject: TokenObject,
): void {
  let token = TokenEntity.load(tokenAddress.toHexString());
  if (token == null) {
    let token = new TokenEntity(tokenAddress.toHexString());
    token.homeAddress = tokenAddress;

    token.symbol = tokenObject.symbol;
    token.decimals = tokenObject.decimals;

    let tokenAddressHex = tokenAddress.toHexString()
    if (tokenAddressHex == '0xb12Ba3134d569a6961429511dCa6bEa0755CA39E' ||
        tokenAddressHex == '0xa5cee110eF72333E44D8aeb882B07aAB0F7175F4')
      token.homeChainId = 1000;
    else
      token.homeChainId = 1001;
    token.homeName = tokenObject.name;

    token.save();
    log.debug('New homeToken {} and foreignToken {}', [
      token.homeAddress.toHexString(),
      token.foreignAddress.toHexString(),
    ]);
  }
}
