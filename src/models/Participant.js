import Block from './Block'
export default class ParticipantBlock extends Block {
  constructor(index, previousHash, timestamp, data, hash) {
    // test extends

    super(index, previousHash, timestamp, data, hash)
    // this.index = index;
    // this.previousHash = previousHash.toString();
    // this.timestamp = timestamp;
    // this.hash = hash.toString();
    // this.data = data
  }
}
