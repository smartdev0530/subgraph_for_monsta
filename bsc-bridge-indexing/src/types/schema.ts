// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  TypedMap,
  Entity,
  Value,
  ValueKind,
  store,
  Address,
  Bytes,
  BigInt,
  BigDecimal
} from "@graphprotocol/graph-ts";

export class UserRequest extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save UserRequest entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save UserRequest entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("UserRequest", id.toString(), this);
  }

  static load(id: string): UserRequest | null {
    return store.get("UserRequest", id) as UserRequest | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get user(): Bytes | null {
    let value = this.get("user");
    if (value === null) {
      return null;
    } else {
      return value.toBytes();
    }
  }

  set user(value: Bytes | null) {
    if (value === null) {
      this.unset("user");
    } else {
      this.set("user", Value.fromBytes(value as Bytes));
    }
  }

  get token(): Bytes | null {
    let value = this.get("token");
    if (value === null) {
      return null;
    } else {
      return value.toBytes();
    }
  }

  set token(value: Bytes | null) {
    if (value === null) {
      this.unset("token");
    } else {
      this.set("token", Value.fromBytes(value as Bytes));
    }
  }

  get decimals(): i32 {
    let value = this.get("decimals");
    return value.toI32();
  }

  set decimals(value: i32) {
    this.set("decimals", Value.fromI32(value));
  }

  get symbol(): string | null {
    let value = this.get("symbol");
    if (value === null) {
      return null;
    } else {
      return value.toString();
    }
  }

  set symbol(value: string | null) {
    if (value === null) {
      this.unset("symbol");
    } else {
      this.set("symbol", Value.fromString(value as string));
    }
  }

  get amount(): BigInt | null {
    let value = this.get("amount");
    if (value === null) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set amount(value: BigInt | null) {
    if (value === null) {
      this.unset("amount");
    } else {
      this.set("amount", Value.fromBigInt(value as BigInt));
    }
  }

  get timestamp(): BigInt {
    let value = this.get("timestamp");
    return value.toBigInt();
  }

  set timestamp(value: BigInt) {
    this.set("timestamp", Value.fromBigInt(value));
  }

  get txHash(): Bytes {
    let value = this.get("txHash");
    return value.toBytes();
  }

  set txHash(value: Bytes) {
    this.set("txHash", Value.fromBytes(value));
  }

  get messageId(): Bytes | null {
    let value = this.get("messageId");
    if (value === null) {
      return null;
    } else {
      return value.toBytes();
    }
  }

  set messageId(value: Bytes | null) {
    if (value === null) {
      this.unset("messageId");
    } else {
      this.set("messageId", Value.fromBytes(value as Bytes));
    }
  }

  get encodedData(): Bytes | null {
    let value = this.get("encodedData");
    if (value === null) {
      return null;
    } else {
      return value.toBytes();
    }
  }

  set encodedData(value: Bytes | null) {
    if (value === null) {
      this.unset("encodedData");
    } else {
      this.set("encodedData", Value.fromBytes(value as Bytes));
    }
  }

  get message(): string | null {
    let value = this.get("message");
    if (value === null) {
      return null;
    } else {
      return value.toString();
    }
  }

  set message(value: string | null) {
    if (value === null) {
      this.unset("message");
    } else {
      this.set("message", Value.fromString(value as string));
    }
  }
}

export class Execution extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save Execution entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save Execution entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("Execution", id.toString(), this);
  }

  static load(id: string): Execution | null {
    return store.get("Execution", id) as Execution | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get user(): Bytes | null {
    let value = this.get("user");
    if (value === null) {
      return null;
    } else {
      return value.toBytes();
    }
  }

  set user(value: Bytes | null) {
    if (value === null) {
      this.unset("user");
    } else {
      this.set("user", Value.fromBytes(value as Bytes));
    }
  }

  get token(): Bytes | null {
    let value = this.get("token");
    if (value === null) {
      return null;
    } else {
      return value.toBytes();
    }
  }

  set token(value: Bytes | null) {
    if (value === null) {
      this.unset("token");
    } else {
      this.set("token", Value.fromBytes(value as Bytes));
    }
  }

  get amount(): BigInt | null {
    let value = this.get("amount");
    if (value === null) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set amount(value: BigInt | null) {
    if (value === null) {
      this.unset("amount");
    } else {
      this.set("amount", Value.fromBigInt(value as BigInt));
    }
  }

  get sender(): Bytes | null {
    let value = this.get("sender");
    if (value === null) {
      return null;
    } else {
      return value.toBytes();
    }
  }

  set sender(value: Bytes | null) {
    if (value === null) {
      this.unset("sender");
    } else {
      this.set("sender", Value.fromBytes(value as Bytes));
    }
  }

  get executor(): Bytes | null {
    let value = this.get("executor");
    if (value === null) {
      return null;
    } else {
      return value.toBytes();
    }
  }

  set executor(value: Bytes | null) {
    if (value === null) {
      this.unset("executor");
    } else {
      this.set("executor", Value.fromBytes(value as Bytes));
    }
  }

  get messageId(): Bytes | null {
    let value = this.get("messageId");
    if (value === null) {
      return null;
    } else {
      return value.toBytes();
    }
  }

  set messageId(value: Bytes | null) {
    if (value === null) {
      this.unset("messageId");
    } else {
      this.set("messageId", Value.fromBytes(value as Bytes));
    }
  }

  get status(): boolean {
    let value = this.get("status");
    return value.toBoolean();
  }

  set status(value: boolean) {
    this.set("status", Value.fromBoolean(value));
  }

  get timestamp(): BigInt {
    let value = this.get("timestamp");
    return value.toBigInt();
  }

  set timestamp(value: BigInt) {
    this.set("timestamp", Value.fromBigInt(value));
  }

  get txHash(): Bytes {
    let value = this.get("txHash");
    return value.toBytes();
  }

  set txHash(value: Bytes) {
    this.set("txHash", Value.fromBytes(value));
  }
}

export class Message extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save Message entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save Message entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("Message", id.toString(), this);
  }

  static load(id: string): Message | null {
    return store.get("Message", id) as Message | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get msgId(): Bytes | null {
    let value = this.get("msgId");
    if (value === null) {
      return null;
    } else {
      return value.toBytes();
    }
  }

  set msgId(value: Bytes | null) {
    if (value === null) {
      this.unset("msgId");
    } else {
      this.set("msgId", Value.fromBytes(value as Bytes));
    }
  }

  get txHash(): Bytes {
    let value = this.get("txHash");
    return value.toBytes();
  }

  set txHash(value: Bytes) {
    this.set("txHash", Value.fromBytes(value));
  }

  get msgHash(): Bytes | null {
    let value = this.get("msgHash");
    if (value === null) {
      return null;
    } else {
      return value.toBytes();
    }
  }

  set msgHash(value: Bytes | null) {
    if (value === null) {
      this.unset("msgHash");
    } else {
      this.set("msgHash", Value.fromBytes(value as Bytes));
    }
  }

  get msgData(): Bytes | null {
    let value = this.get("msgData");
    if (value === null) {
      return null;
    } else {
      return value.toBytes();
    }
  }

  set msgData(value: Bytes | null) {
    if (value === null) {
      this.unset("msgData");
    } else {
      this.set("msgData", Value.fromBytes(value as Bytes));
    }
  }

  get signatures(): Array<Bytes> | null {
    let value = this.get("signatures");
    if (value === null) {
      return null;
    } else {
      return value.toBytesArray();
    }
  }

  set signatures(value: Array<Bytes> | null) {
    if (value === null) {
      this.unset("signatures");
    } else {
      this.set("signatures", Value.fromBytesArray(value as Array<Bytes>));
    }
  }
}

export class Token extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save Token entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save Token entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("Token", id.toString(), this);
  }

  static load(id: string): Token | null {
    return store.get("Token", id) as Token | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get homeAddress(): Bytes {
    let value = this.get("homeAddress");
    return value.toBytes();
  }

  set homeAddress(value: Bytes) {
    this.set("homeAddress", Value.fromBytes(value));
  }

  get homeName(): string {
    let value = this.get("homeName");
    return value.toString();
  }

  set homeName(value: string) {
    this.set("homeName", Value.fromString(value));
  }

  get homeChainId(): i32 {
    let value = this.get("homeChainId");
    return value.toI32();
  }

  set homeChainId(value: i32) {
    this.set("homeChainId", Value.fromI32(value));
  }

  get decimals(): i32 {
    let value = this.get("decimals");
    return value.toI32();
  }

  set decimals(value: i32) {
    this.set("decimals", Value.fromI32(value));
  }

  get symbol(): string {
    let value = this.get("symbol");
    return value.toString();
  }

  set symbol(value: string) {
    this.set("symbol", Value.fromString(value));
  }

  get foreignAddress(): Bytes | null {
    let value = this.get("foreignAddress");
    if (value === null) {
      return null;
    } else {
      return value.toBytes();
    }
  }

  set foreignAddress(value: Bytes | null) {
    if (value === null) {
      this.unset("foreignAddress");
    } else {
      this.set("foreignAddress", Value.fromBytes(value as Bytes));
    }
  }

  get foreignName(): string | null {
    let value = this.get("foreignName");
    if (value === null) {
      return null;
    } else {
      return value.toString();
    }
  }

  set foreignName(value: string | null) {
    if (value === null) {
      this.unset("foreignName");
    } else {
      this.set("foreignName", Value.fromString(value as string));
    }
  }

  get foreignChainId(): i32 {
    let value = this.get("foreignChainId");
    return value.toI32();
  }

  set foreignChainId(value: i32) {
    this.set("foreignChainId", Value.fromI32(value));
  }
}
