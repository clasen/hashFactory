const hashFactory = require('../index.js');

const dbKey = hashFactory({
    alpha: true,
    maxlen: 12,
    padding: '0'
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

console.log(fileId('Quarterly Financial Report Q3 2023.pdf'));

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