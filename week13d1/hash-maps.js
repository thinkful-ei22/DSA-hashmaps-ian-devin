class HashMap {
    constructor(initialCapacity = 8) {
        this.length = 0;
        this._slots = [];
        this._capacity = initialCapacity;
        this._deleted = 0;
    }

    display() {
        return this._slots.filter(slot => {
            return (slot !== undefined && slot.deleted === false);
        });
    }

    get(key) {
        const index = this._findSlot(key);
        if (this._slots[index] === undefined) {
            throw new Error('Key error');
        }
        return this._slots[index].value;
    }

    set(key, value) {
        const loadRatio = (this.length + this._deleted + 1) / this._capacity;
        if (loadRatio > HashMap.MAX_LOAD_RATIO) {
            this._resize(this._capacity * HashMap.SIZE_RATIO);
        }

        const index = this._findSlot(key);
        this._slots[index] = {
            key,
            value,
            deleted: false
        };
        this.length++;
    }

    remove(key) {
        const index = this._findSlot(key);
        const slot = this._slots[index];
        if (slot === undefined) {
            throw new Error('Key error');
        }
        slot.deleted = true;
        this.length--;
        this._deleted++;
    }

    _findSlot(key) {
        const hash = HashMap._hashString(key);
        const start = hash % this._capacity;

        for (let i = start; i < start + this._capacity; i++) {
            const index = i % this._capacity;
            const slot = this._slots[index];
            if (slot === undefined || (slot.key == key && !slot.deleted)) {
                return index;
            }
        }
    }

    _resize(size) {
        const oldSlots = this._slots;
        this._capacity = size;
        // Reset the length - it will get rebuilt as you add the items back
        this.length = 0;
        this._deleted = 0;
        this._slots = [];

        for (const slot of oldSlots) {
            if (slot !== undefined && !slot.deleted) {
                this.set(slot.key, slot.value);
            }
        }
    }

    static _hashString(string) {
        let hash = 5381;
        for (let i = 0; i < string.length; i++) {
            hash = (hash << 5) + hash + string.charCodeAt(i);
            hash = hash & hash;
        }
        return hash >>> 0;
    }
}

HashMap.MAX_LOAD_RATIO = 0.7;
HashMap.SIZE_RATIO = 3;

const main = () => {
    let lotrData = [
        { Hobbit: "Bilbo" },
        { Hobbit: "Frodo" },
        { Wizard: "Gandolf" },
        { Human: "Aragon" },
        { Elf: "Legolas" },
        { Maiar: "The Necromancer" },
        { Maiar: "Sauron" },
        { RingBearer: "Gollum" },
        { LadyOfLight: "Galadriel" },
        { HalfElven: "Arwen" },
        { Ent: "Treebeard" }
    ];
    let lotr = new HashMap();
    lotrData.forEach(element => {
        let key = Object.keys(element);
        lotr.set(key[0], element[key[0]]);
    });
    // console.log(lotr.get("Wizard"));
    console.log(lotr);
}

// main();

//----------------------PALINDROME--------------------------------------

//input string
//output is boolean whether string iteration is palindrome

const palindrome = string => {
    let stringHashMap = new HashMap();
    let odd = 0;
    for (let i = 0; i < string.length; i++) {
        try {
            let charCount = stringHashMap.get(string[i]);
            charCount ++;
            if(charCount % 2 === 0) {
                odd --;
            } else {
                odd++;
            }
            stringHashMap.set(string[i], charCount);
        } catch {
            stringHashMap.set(string[i], 1)
            odd ++;
        }
    }
    if (string.length % 2 === 0 && odd === 0
        || string.length % 2 === 1 && odd === 1){
        return true;
    } else {
        return false;
    }
}

// console.log(palindrome('racecr'));

//--------------ANAGRAM-------------------------------

//input array of strings, some of which may be anagrams
//output is an array of arrays that consist of anagrams

const anagram = (array) => {
    let wordHashMap = new HashMap();
    array.forEach(word => {
        let sortedKey = word.split('').sort().join('');
        try {
            let valuesArray = wordHashMap.get(sortedKey);
            valuesArray.push(word)
        } catch {
            wordHashMap.set(sortedKey, [word])
        }
    })
    return wordHashMap.display();
}

console.log(anagram(['east', 'cars', 'acre', 'arcs', 'teas', 'eats', 'race']));