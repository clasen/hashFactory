const path = require('path');
const hashFactoryPath = path.join(__dirname, '..', 'index.js');
const hashFactory = require(hashFactoryPath);

// Basic usage - default settings
console.log('\n--- Basic Usage ---');
const defaultHash = hashFactory();
console.log('Default hash:         ', defaultHash('Hello World'));
console.log('Default hash (longer):', defaultHash('This is a much longer string with special characters: @#$%^&*()'));

// Alphanumeric hashes
console.log('\n--- Alphanumeric Hashes ---');
const alphaHash = hashFactory({ alpha: true });
console.log('Alpha hash:           ', alphaHash('Hello World'));
console.log('Alpha hash (longer):  ', alphaHash('This is a much longer string with special characters: @#$%^&*()'));

// Words with hash
console.log('\n--- Word Extraction with Hash ---');
const wordHash = hashFactory({ words: true });
console.log('Word hash:            ', wordHash('Hello World'));
console.log('Word hash (multiple): ', wordHash('This is a longer string with multiple words'));

// Configure word count and length
console.log('\n--- Configuring Word Count and Length ---');
const wordConfig = hashFactory({ words: true, wcount: 2, wlen: 3 });
console.log('2 words, 3 chars each:', wordConfig('Hello World Example String'));

// Custom delimiter 
console.log('\n--- Custom Delimiters ---');
const dashDelimiter = hashFactory({ words: true, delimiter: '-' });
console.log('Dash delimiter:       ', dashDelimiter('Hello World Example'));

// Maximum length with padding
console.log('\n--- Maximum Length with Padding ---');
const maxLenPadded = hashFactory({ words: true, maxlen: 20, padding: 'x' });
console.log('Max length 20:        ', maxLenPadded('Hello World Example'));
console.log('Already at max:       ', maxLenPadded('ThisIsAVeryLongString'));

// Combination of options
console.log('\n--- Combined Options ---');
const combined = hashFactory({ 
  words: true,
  alpha: true,
  wcount: 3,
  wlen: 4, 
  delimiter: '-',
  maxlen: 30,
  padding: '_'
});
console.log('Combined settings:    ', combined('The Quick Brown Fox Jumps Over The Lazy Dog'));

// Real-world use case: URL-friendly IDs
console.log('\n--- URL-friendly IDs ---');
const urlId = hashFactory({ 
  words: true,
  alpha: true,
  wcount: 2,
  wlen: 5, 
  delimiter: '-'
});
console.log('Article title ID:     ', urlId('How to Use HashFactory in Your Projects'));
console.log('Product name ID:      ', urlId('Modern Ergonomic Office Chair - Black'));

// Handling international characters
console.log('\n--- International Characters ---');
const intlHash = hashFactory({ words: true, alpha: true, padding: 'x' });
console.log('Spanish text:         ', intlHash('¡Hola, cómo estás!'));
console.log('French text:          ', intlHash('Voilà! C\'est très magnifique!'));
console.log('German text:          ', intlHash('Ich möchte ein Bier, bitte'));

// Special case: Infinite word length
console.log('\n--- Special Cases ---');
const infiniteWordLen = hashFactory({ words: true, wlen: -1, wcount: 3 });
console.log('Infinite word length: ', infiniteWordLen('Keep Full Words Without Truncation'));

// Random paragraphs with different configurations
console.log('\n--- Random Paragraphs with Various Configurations ---');

const paragraph1 = "The ancient oak tree stood sentinel at the edge of the forest, its gnarled branches reaching toward the sky like arthritic fingers. Generations had passed under its watchful presence, each leaving their own marks upon the land.";
const paragraph2 = "Digital innovation continues to reshape our modern economy, blending artificial intelligence with human creativity to solve complex problems. Companies must adapt quickly or risk obsolescence in this rapidly evolving landscape.";
const paragraph3 = "Crisp mountain air filled her lungs as she reached the summit just before dawn. The valley below lay shrouded in mist, waiting for the first golden rays to reveal its hidden beauty. This moment made every difficult step worthwhile.";

// Default configuration
console.log('Default hash (paragraph):', defaultHash(paragraph1));

// Long alphanumeric hash
const longAlpha = hashFactory({ alpha: true, maxlen: 50 });
console.log('Long alpha hash:', longAlpha(paragraph2));

// Extract first 5 words, 6 characters each
const fiveWords = hashFactory({ words: true, wcount: 5, wlen: 6 });
console.log('Five words, 6 chars each:', fiveWords(paragraph1));

// URL-friendly with underscore
const urlFriendly = hashFactory({ words: true, alpha: true, wcount: 3, wlen: 4, delimiter: '_' });
console.log('URL friendly underscore:', urlFriendly(paragraph2));

// Short memorable ID
const memorableId = hashFactory({ words: true, wcount: 2, wlen: -1, delimiter: '-' });
console.log('Memorable ID (full words):', memorableId(paragraph3));

// Fixed length with custom padding
const fixedLength = hashFactory({ maxlen: 15, padding: '0', alpha: true });
console.log('Fixed length 15 chars:', fixedLength(paragraph3));

// Maximum word extraction
const maxWords = hashFactory({ words: true, wcount: 8, wlen: 3, delimiter: '.' });
console.log('Many short words with dots:', maxWords(paragraph1));

// Combination for document fingerprinting
const docFingerprint = hashFactory({ 
  alpha: true,
  maxlen: 32,
  padding: 'x'
});
console.log('Document fingerprint:', docFingerprint(paragraph1 + paragraph2 + paragraph3));
