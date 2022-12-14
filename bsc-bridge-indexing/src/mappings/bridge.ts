import { log, Address } from '@graphprotocol/graph-ts';
import {
  TokensBridgingInitiated,
  TokensBridged,
} from '../types/Omnibridge/Bridge';
import { Execution, UserRequest } from '../types/schema';

import {
  fetchTokenInfo,
  mediatedTokens,
  updateHomeTokenInfo,
  updateHomeToken,
} from './helpers';

export function handleBridgeTransfer(event: TokensBridged): void {
  log.debug('Parsing TokensBridged', []);
  // if (!mediatedTokens.isSet(event.address)) return;
  let txHash = event.transaction.hash;
  let execution = Execution.load(txHash.toHexString());
  if (execution == null) {
    execution = new Execution(txHash.toHexString());
  }
  execution.txHash = txHash;
  execution.timestamp = event.block.timestamp;
  // let tokenAddress = mediatedTokens.get(event.address) as Address;
  // execution.token = tokenAddress;
  execution.user = event.params.recipient;
  execution.amount = event.params.value;
  execution.messageId = event.params.messageId;
  execution.save();

  log.debug('TokensBridged token {}', [execution.token.toHexString()]);

  // updateHomeToken(tokenAddress);
}

export function handleInitiateTransfer(event: TokensBridgingInitiated): void {
  log.debug('Parsing TokensBridged address : {}', [event.address.toHexString()]);
  // if (!mediatedTokens.isSet(event.address)) return;
  let txHash = event.transaction.hash;
  let request = UserRequest.load(txHash.toHexString());
  if (request == null) {
    request = new UserRequest(txHash.toHexString());
  }
  request.txHash = txHash;
  request.timestamp = event.block.timestamp;

  log.debug('parsing tokenbridged step 1', [])
  // let tokenAddress = mediatedTokens.get(event.address) as Address;
  // request.token = tokenAddress;
  // let tokenInfo = fetchTokenInfo(tokenAddress);
  log.debug('parsing tokenbridged step 2', [])
  // request.decimals = tokenInfo.decimals;
  // request.symbol = tokenInfo.symbol;
  request.user = event.params.sender;
  request.amount = event.params.value;
  request.messageId = event.params.messageId;
  log.debug('parsing tokenbridged step 3', [])
  request.save();

  log.debug('TokensBridgingInitiated token {}', [request.token.toHexString()]);

  // updateHomeTokenInfo(tokenAddress, tokenInfo);
}
