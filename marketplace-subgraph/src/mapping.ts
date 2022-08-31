import * as MonstaAuction from '../generated/UserAuction/MonstaAuction'
import * as MonstaToken from '../generated/MonstaToken/MonstaToken'
import {Monsta, MonstaEvolve, MonstaRebirth, MonstaRetire,
  AuctionCancel, AuctionSucceed, AuctionCreate, MonstaTransfer} from '../generated/schema'
import { BigInt } from '@graphprotocol/graph-ts'


export function handleAuctionCreated(type: string, event: MonstaAuction.AuctionCreated): void {
  let id = event.transaction.hash.toHex()
  let createdAuction = new AuctionCreate(id)
  createdAuction.token = event.params._tokenId.toString()
  createdAuction.timestamp = event.block.timestamp
  createdAuction.type = type
  createdAuction.startingPrice = event.params._startingPrice
  createdAuction.endingPrice = event.params._endingPrice
  createdAuction.duration = event.params._duration
  createdAuction.seller = event.params._seller
  createdAuction.save()
  let monsta = Monsta.load(createdAuction.token)
  if (monsta != null) {
    monsta.auctionStatus = createdAuction.type
    monsta.lastSeller = createdAuction.seller
    monsta.lastStartPrice = createdAuction.startingPrice
    monsta.lastEndPrice = createdAuction.endingPrice
    monsta.save()
  }
}

export function handleAuctionCancelled(type: string, event : MonstaAuction.AuctionCancelled) : void {
  let id = event.transaction.hash.toHex()
  let cancelledAuction = new AuctionCancel(id)
  cancelledAuction.token = event.params._tokenId.toString()
  cancelledAuction.timestamp = event.block.timestamp
  cancelledAuction.type = type
  cancelledAuction.save()
  let monsta = Monsta.load(cancelledAuction.token)
  if (monsta != null) {
    monsta.auctionStatus = cancelledAuction.type
    monsta.save()
  }
}

export function handleAuctionSuccessful(type: string, event : MonstaAuction.AuctionSuccessful) : void {
  let id = event.transaction.hash.toHex() 
  let successAuction = new AuctionSucceed(id)
  successAuction.token = event.params._tokenId.toString()
  successAuction.timestamp = event.block.timestamp
  successAuction.type = type
  successAuction.totalPrice = event.params._totalPrice
  successAuction.winner = event.params._winner
  successAuction.save()
  let monsta = Monsta.load(successAuction.token)
  if (monsta != null) {
    monsta.auctionStatus = successAuction.type
    monsta.save()
  }
}

export function handleUserAuctionCreated(event: MonstaAuction.AuctionCreated): void {
  handleAuctionCreated("UserAuctionCreated", event)
}

export function handleUserAuctionCancelled(event : MonstaAuction.AuctionCancelled) : void {
  handleAuctionCancelled("UserAuctionCancelled", event)
}

export function handleUserAuctionSuccessful(event : MonstaAuction.AuctionSuccessful) : void {
  handleAuctionSuccessful("UserAuctionSuccessful", event)
}

export function handleSysAuctionCreated(event: MonstaAuction.AuctionCreated): void {
  handleAuctionCreated("SystemAuctionCreated", event)
}

export function handleSysAuctionCancelled(event : MonstaAuction.AuctionCancelled) : void {
  handleAuctionCancelled("SystemAuctionCancelled", event)
}

export function handleSysAuctionSuccessful(event : MonstaAuction.AuctionSuccessful) : void {
  handleAuctionSuccessful("SystemAuctionSuccessful", event)
}

export function handleMonstaSpawned(event : MonstaToken.MonstaSpawned) : void {
  let id = event.params._monstaId.toString()
  let spawnedMonsta = new Monsta(id)
  spawnedMonsta.token = event.params._monstaId
  spawnedMonsta.txid = event.transaction.hash.toHex()
  spawnedMonsta.timestamp =  event.block.timestamp
  spawnedMonsta.owner = event.params._owner
  spawnedMonsta.genes = event.params._genes
  if (!event.params._matronId.equals(BigInt.zero())) {
    spawnedMonsta.matron = event.params._matronId.toString()
  }
  if (!event.params._sireId.equals(BigInt.zero())) {
    spawnedMonsta.sire = event.params._sireId.toString()
  }
  spawnedMonsta.specialType = ((spawnedMonsta.genes >> 248) & BigInt.fromI32(255)).toI32()
  spawnedMonsta.classType = ((spawnedMonsta.genes >> 186) & BigInt.fromI32(63)).toI32()
  spawnedMonsta.birthStatus = ((spawnedMonsta.genes >> 245) & BigInt.fromI32(7)).toI32()
  spawnedMonsta.cloneUsage = ((spawnedMonsta.genes >> 242) & BigInt.fromI32(7)).toI32()
  spawnedMonsta.save()
}

export function handleMonstaRebirthed(event : MonstaToken.MonstaRebirthed) : void {
  let id = event.transaction.hash.toHex()
  let rebirthedMonsta = new MonstaRebirth(id)
  rebirthedMonsta.token = event.params._monstaId.toString()
  rebirthedMonsta.timestamp = event.block.timestamp
  rebirthedMonsta.type = "Rebirthed"
  rebirthedMonsta.genes = event.params._genes
  rebirthedMonsta.save()
  let monsta = Monsta.load(rebirthedMonsta.token)
  if (monsta != null) {
    monsta.monstaStatus = rebirthedMonsta.type
    monsta.genes = rebirthedMonsta.genes
    monsta.specialType = ((monsta.genes >> 248) & BigInt.fromI32(255)).toI32()
    monsta.classType = ((monsta.genes >> 186) & BigInt.fromI32(63)).toI32()
    monsta.birthStatus = ((monsta.genes >> 245) & BigInt.fromI32(7)).toI32()
    monsta.cloneUsage = ((monsta.genes >> 242) & BigInt.fromI32(7)).toI32()
    monsta.save()
  }
}

export function handleMonstaRetired(event : MonstaToken.MonstaRetired) : void {
  let id = event.transaction.hash.toHex()
  let retiredMonsta = new MonstaRetire(id)
  retiredMonsta.token = event.params._monstaId.toString()
  retiredMonsta.timestamp = event.block.timestamp
  retiredMonsta.type = "Retired"
  retiredMonsta.save()
  let monsta = Monsta.load(retiredMonsta.token)
  if (monsta != null) {
    monsta.monstaStatus = retiredMonsta.type
    monsta.save()
  }
}

export function handleMonstaEvolved(event : MonstaToken.MonstaEvolved) : void {
  let id = event.transaction.hash.toHex()
  let evolvedMonsta = new MonstaEvolve(id)
  evolvedMonsta.token = event.params._monstaId.toString()
  evolvedMonsta.timestamp = event.block.timestamp
  evolvedMonsta.type = "Evolved"
  evolvedMonsta.oldGenes = event.params._oldGenes
  evolvedMonsta.newGenes = event.params._newGenes
  evolvedMonsta.save()
  let monsta = Monsta.load(evolvedMonsta.token)
  if (monsta != null) {
    monsta.monstaStatus = evolvedMonsta.type
    monsta.genes = evolvedMonsta.newGenes
    monsta.specialType = ((monsta.genes >> 248) & BigInt.fromI32(255)).toI32()
    monsta.classType = ((monsta.genes >> 186) & BigInt.fromI32(63)).toI32()
    monsta.birthStatus = ((monsta.genes >> 245) & BigInt.fromI32(7)).toI32()
    monsta.cloneUsage = ((monsta.genes >> 242) & BigInt.fromI32(7)).toI32()
    monsta.spb = ((monsta.genes >> 221) & BigInt.fromI32(7)).toI32()
    monsta.spa = ((monsta.genes >> 218) & BigInt.fromI32(7)).toI32()
    monsta.spl = ((monsta.genes >> 215) & BigInt.fromI32(7)).toI32()
    monsta.sph = ((monsta.genes >> 212) & BigInt.fromI32(7)).toI32()
    monsta.spf = ((monsta.genes >> 209) & BigInt.fromI32(7)).toI32()
    monsta.spt = ((monsta.genes >> 206) & BigInt.fromI32(7)).toI32()
    monsta.clsddb = ((monsta.genes >> 186) & BigInt.fromI32(63)).toI32()
    monsta.clsdda = ((monsta.genes >> 154) & BigInt.fromI32(63)).toI32()
    monsta.clsddl = ((monsta.genes >> 122) & BigInt.fromI32(63)).toI32()
    monsta.clsddh = ((monsta.genes >> 90) & BigInt.fromI32(63)).toI32()
    monsta.clsddf = ((monsta.genes >> 58) & BigInt.fromI32(63)).toI32()
    monsta.clsddt = ((monsta.genes >> 26) & BigInt.fromI32(63)).toI32()
    
    monsta.save()
  }
}

export function handleTransfer(event : MonstaToken.Transfer) : void {
  let id = event.transaction.hash.toHex()
  let transfer = new MonstaTransfer(id)
  transfer.token = event.params.tokenId.toString()
  transfer.timestamp = event.block.timestamp
  transfer.from = event.params.from
  transfer.to = event.params.to
  transfer.save()
  let monsta = Monsta.load(transfer.token)
  if (monsta != null) {
    monsta.owner = transfer.to
    monsta.save()
  }
}
