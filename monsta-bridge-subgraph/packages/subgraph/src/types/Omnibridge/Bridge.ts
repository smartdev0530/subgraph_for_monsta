// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt
} from "@graphprotocol/graph-ts";

export class TokensBridged extends ethereum.Event {
  get params(): TokensBridged__Params {
    return new TokensBridged__Params(this);
  }
}

export class TokensBridged__Params {
  _event: TokensBridged;

  constructor(event: TokensBridged) {
    this._event = event;
  }

  get recipient(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get value(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }

  get messageId(): Bytes {
    return this._event.parameters[2].value.toBytes();
  }
}

export class TokensBridgingInitiated extends ethereum.Event {
  get params(): TokensBridgingInitiated__Params {
    return new TokensBridgingInitiated__Params(this);
  }
}

export class TokensBridgingInitiated__Params {
  _event: TokensBridgingInitiated;

  constructor(event: TokensBridgingInitiated) {
    this._event = event;
  }

  get sender(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get value(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }

  get messageId(): Bytes {
    return this._event.parameters[2].value.toBytes();
  }
}

export class Bridge extends ethereum.SmartContract {
  static bind(address: Address): Bridge {
    return new Bridge("Bridge", address);
  }
}
