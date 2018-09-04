const LinkedList = require('./sll');

class SCHashMap {
  constructor(initialCapacity = 8) {
    this.length = 0;
    this._slots = [];
    this._capacity = initialCapacity;
    this._deleted = 0;
  }

  getKeyValuePairs() {
    let keyValArr = [];
    this._slots
      .filter(slot => (slot !== undefined))
      .forEach(slot =>{
        let curNode = slot.head;
        while(curNode !== null){
          keyValArr.push({key: curNode.key, value: curNode.value});
          curNode = curNode.next;
        }
      });
    return keyValArr;
  }

  // get(key) {
  //   const index = this._findSlot(key);
  //   if (this._slots[index] === undefined) {
  //       throw new Error('Key error');
  //   }
  //   return this._slots[index].value;
  // }

  set(key, value) {
    const loadRatio = (this.length + this._deleted + 1) / this._capacity;
    if (loadRatio > SCHashMap.MAX_LOAD_RATIO) {
        this._resize(this._capacity * SCHashMap.SIZE_RATIO);
    }

    const index = this._findSlot(key);

    if(this._slots[index] === undefined){
      this._slots[index] = new LinkedList();
      this._slots[index].insertLast(key, value);
      this.length++;
    }else{
      const curNode = this._slots[index].find(key);
      if(curNode){
        curNode.value = value;
      }else{
        this._slots[index].insertLast(key, value);
        this.length++;
      }
    }
  }

  // remove(key) {
  //   const index = this._findSlot(key);
  //   const slot = this._slots[index];
  //   if (slot === undefined) {
  //       throw new Error('Key error');
  //   }
  //   slot.deleted = true;
  //   this.length--;
  //   this._deleted++;
  // }

  _findSlot(key) {
    const hash = SCHashMap._hashString(key);
    const hashIndex = hash % this._capacity;

    return hashIndex;
  }

  // _resize(size) {
  //     const oldSlots = this._slots;
  //     this._capacity = size;
  //     // Reset the length - it will get rebuilt as you add the items back
  //     this.length = 0;
  //     this._deleted = 0;
  //     this._slots = [];

  //     for (const slot of oldSlots) {
  //         if (slot !== undefined && !slot.deleted) {
  //             this.set(slot.key, slot.value);
  //         }
  //     }
  // }

  static _hashString(string) {
      let hash = 5381;
      for (let i = 0; i < string.length; i++) {
          hash = (hash << 5) + hash + string.charCodeAt(i);
          hash = hash & hash;
      }
      return hash >>> 0;
  }
}

SCHashMap.MAX_LOAD_RATIO = 0.7;
SCHashMap.SIZE_RATIO = 3;

module.exports = SCHashMap;