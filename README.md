# hashFactory

 🆔 A versatile and lightweight utility for generating configurable hash strings, optimized for creating memorable IDs, URL-friendly slugs, and unique identifiers.

## Features

- **Lightning Fast**: Uses the optimized djb2 hashing algorithm for excellent performance
- **Flexible Output Formats**: Generate hex hashes, alphanumeric strings, or word-based identifiers
- **Configurable**: Control output length, word count, delimiters, and more
- **Zero Dependencies**: Works in Node.js and browsers with no external dependencies
- **URL-Friendly**: Perfect for creating slugs, short IDs, and readable identifiers

## Installation

```bash
npm install hash-factory
```

## Quick Start

```javascript
const hashFactory = require('hash-factory');

// Create default hash function
const hash = hashFactory();
hash('Hello World');
// Outputs "1661258373"

// Create alphanumeric hash
const alphaHash = hashFactory({ alpha: true });
alphaHash('Hello World');
// Outputs "rh2j5x"

// Create word-based identifiers
const wordHash = hashFactory({ words: true });
wordHash('Hello World');
// Outputs "hello_world_1661258373"

// Create word-based identifiers with alphanumeric hash
const wordAlphaHash = hashFactory({ words: true, alpha: true });
wordAlphaHash('Hello World');
// Outputs "hello_world_rh2j5x"

const wordOnly = hashFactory({ hash: false });
wordOnly('Hello World');
// Outputs "hello_world"

// You can combine it with other options
const customWordOnly = hashFactory({
    hash: false,
    delimiter: '-',
    wlen: 4
});
customWordOnly('Hello Beautiful World');
// Outputs "hell-beau-worl"
```

## API Reference

### hashFactory(options)

Returns a hash function configured with the specified options.

#### Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `hash` | Boolean | true | Whether to append a hash to the output |
| `wcount` | Number | -1 | Number of words to include (-1 for all words) |
| `wlen` | Number | 6 | Length of each word (-1 for full words) |
| `maxlen` | Number | 36 | Maximum length of the output hash (-1 for unlimited) |
| `alpha` | Boolean | false | Use base36 (alphanumeric) encoding instead of decimal |
| `words` | Boolean | false | Extract words from the input string |
| `delimiter` | String | '_' | Character(s) to join words and hash |
| `padding` | String\|null | null | Character used for padding to reach maxlen (null for no padding) |

## Use Cases

### URL-Friendly Slugs

```javascript
const urlSlug = hashFactory({
    maxlen: 40,
    words: true,
    alpha: true,
    delimiter: '-',
    wlen: -1
});

const articleUrl = urlSlug('How to Create URL-Friendly Slugs with HashFactory');
// Output: "how-to-create-url-friendly-slugs-1qbtqvl"
```

### Short File IDs

```javascript
const fileId = hashFactory({ 
  words: true,
  wlen: 6,
  alpha: true,
  maxlen: 30
});

fileId('Quarterly Financial Report Q3 2023.pdf');
// Output: "quarte_financ_report_q3_t6ghpa"
```

### Memorable Document IDs

```javascript
const docId = hashFactory({ 
  words: true, 
  wcount: 3,
  wlen: 4, 
  delimiter: '-',
  alpha: true
});

docId('Meeting Minutes: Project Kickoff January 2023');
// Output: "meet-minu-proj-1kh0t3m"
```

### Fixed-Length Database Keys

```javascript
const dbKey = hashFactory({ 
  alpha: true,
  maxlen: 12,
  padding: 'xyz',
  delimiter: ''
});

dbKey('user123@example.com');
// Output: "19u25ojxyzxy"
```

## Algorithm Details

HashFactory uses the djb2 hashing algorithm by default, which offers:

- **Speed**: Very efficient computation, especially for string inputs
- **Distribution**: Good distribution properties for minimal collisions
- **Simplicity**: Lightweight implementation with minimal overhead

The hashing function returns a number between 0 and 4294967295.

The djb2 algorithm was created by Daniel J. Bernstein and is widely used for its excellent performance characteristics in real-world applications.

## Examples

Check out the [demo directory](demo/cases.js) for more usage examples.

## License

MIT

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.
