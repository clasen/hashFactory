const path = require('path');
const hashFactoryPath = path.join(__dirname, '..', 'index.js');
const hashFactory = require(hashFactoryPath);

const dbKey = hashFactory({
    alpha: true,
    maxlen: 12,
    padding: 'xyz',
    delimiter: ''
});

console.log(dbKey('user123@example.com'));

const docId = hashFactory({
    words: true,
    wcount: 3,
    wlen: 4,
    delimiter: '-',
    alpha: true
});

console.log(docId('Meeting Minutes: Project Kickoff January 2023'));

const fileId = hashFactory({
    words: true,
    wlen: 6,
    alpha: true,
    maxlen: 30
});

console.log(fileId('😃 Quarterly Financial Report Q3 2023.pdf'));

const urlSlug = hashFactory({
    maxlen: 40,
    wlen: -1,
    words: true,
    alpha: true,
    delimiter: '-'
});

const articleUrl = urlSlug('How to Create URL-Friendly Slugs with HashFactory');
console.log(articleUrl);

const wordHash = hashFactory({ words: true });
console.log(wordHash('Hello World'));

const alphaHash = hashFactory({ alpha: true });
console.log(alphaHash('Hello World'));

const hash = hashFactory();
console.log(hash('Hello World')); // Outputs a numeric hash

const hashId = hashFactory({ hash: false });
console.log(hashId('Hello World')); // Outputs a worlds hash

const timeOrderedId = hashFactory({ 
    now: true,
    alpha: true,
    delimiter: '-'
  });

console.log(timeOrderedId('Monthly Report'));

const wc = hashFactory({ words: true, wcount: 1, wlen: -1 });
console.log(wc('Hello World Test'));

const nw = hashFactory({ now: true, words: true, wlen: 3, alpha: true, maxlen: 20 });
const result = nw('Hello World');
console.log(result);