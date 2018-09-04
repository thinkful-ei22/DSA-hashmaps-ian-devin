const OAHashMap = require('./OAHash');
const SCHashMap = require('./SCHash');

const main = () => {
    let lotrData = [
        { Hobbit: 'Bilbo' },
        { Hobbit: 'Frodo' },
        { Wizard: 'Gandolf' },
        { Human: 'Aragon' },
        { Elf: 'Legolas' },
        { Maiar: 'The Necromancer' },
        { Maiar: 'Sauron' },
        { RingBearer: 'Gollum' },
        { LadyOfLight: 'Galadriel' },
        { HalfElven: 'Arwen' },
        { Ent: 'Treebeard' }
    ];
    // let lotr = new OAHashMap();
    let lotr = new SCHashMap();
    lotrData.forEach(element => {
        let key = Object.keys(element);
        lotr.set(key[0], element[key[0]]);
    });
    // console.log(lotr.get("Wizard"));
    console.log(lotr);
    console.log(lotr.getKeyValuePairs());
};

main();

//----------------------PALINDROME--------------------------------------

//input string
//output is boolean whether string iteration is palindrome

const palindrome = string => {
    let stringHashMap = new OAHashMap();
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
        } catch (e){
            stringHashMap.set(string[i], 1);
            odd ++;
        }
    }
    if (string.length % 2 === 0 && odd === 0
        || string.length % 2 === 1 && odd === 1){
        return true;
    } else {
        return false;
    }
};

console.log(palindrome('acecarr'));

//--------------ANAGRAM-------------------------------

//input array of strings, some of which may be anagrams
//output is an array of arrays that consist of anagrams

const anagram = (array) => {
    let wordHashMap = new OAHashMap();
    array.forEach(word => {
        let sortedKey = word.split('').sort().join('');
        try {
            let valuesArray = wordHashMap.get(sortedKey);
            valuesArray.push(word);
        } catch(e){
            wordHashMap.set(sortedKey, [word]);
        }
    });
    return wordHashMap.display();
};

console.log(anagram(['east', 'cars', 'acre', 'arcs', 'teas', 'eats', 'race']));

function SCHashTest(){
    const hashy = new SCHashMap();

    hashy.set('drop7', 'kick');
    hashy.set('kidney', 'punch');
    console.log(hashy.getKeyValuePairs());

}

SCHashTest();