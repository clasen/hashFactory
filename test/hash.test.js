const { expect } = require('chai');
const path = require('path');

// Import the hash function from the main file
const hashFactoryPath = path.join(__dirname, '..', 'index.js');
const hashFactory = require(hashFactoryPath);

describe('Hash Factory Tests', function() {
  describe('Default configuration', function() {
    it('should generate a numeric hash with default settings', function() {
      const hash = hashFactory();
      const result = hash('test string');
      
      expect(result).to.be.a('string');
      expect(result).to.match(/^\d+$/); // Should be only digits
    });
    
    it('should generate consistent hashes for the same input', function() {
      const hash = hashFactory();
      const result1 = hash('hello world');
      const result2 = hash('hello world');
      
      expect(result1).to.equal(result2);
    });
    
    it('should generate different hashes for different inputs', function() {
      const hash = hashFactory();
      const result1 = hash('hello world');
      const result2 = hash('hello universe');
      
      expect(result1).to.not.equal(result2);
    });
  });
  
  describe('Alphanumeric configuration', function() {
    it('should generate an alphanumeric hash when alpha=true', function() {
      const hash = hashFactory({ alpha: true });
      const result = hash('test string');
      
      expect(result).to.be.a('string');
      expect(result).to.match(/^[a-z0-9]+$/i); // Should be alphanumeric
    });
  });
  
  describe('Word extraction', function() {
    it('should include words from the input when words=true', function() {
      const hash = hashFactory({ words: true, wcount: 2, wlen: 3 });
      const result = hash('Hello World');
      
      expect(result).to.include('hel');
      expect(result).to.include('wor');
    });
    
    it('should honor word count limit', function() {
      const hash = hashFactory({ words: true, wcount: 1, wlen: -1 });
      const result = hash('Hello World Test');
      const wordParts = result.split('_');
      
      // Should have the word "hello" plus the hash
      expect(wordParts.length).to.equal(2);
      expect(wordParts[0]).to.equal('hello');
    });
    
    it('should honor word length limit', function() {
      const hash = hashFactory({ words: true, wcount: -1, wlen: 2 });
      const result = hash('Hello World');
      const wordParts = result.split('_');
      
      expect(wordParts[0]).to.equal('he');
      expect(wordParts[1]).to.equal('wo');
    });
  });
  
  describe('Delimiter configuration', function() {
    it('should use the specified delimiter', function() {
      const hash = hashFactory({ words: true, delimiter: '-' });
      const result = hash('Hello World');
      
      expect(result).to.include('-');
      expect(result).to.not.include('_');
    });
  });
  
  describe('Maximum length configuration', function() {
    it('should honor maximum length limit', function() {
      const hash = hashFactory({ words: true, maxlen: 15 });
      const result = hash('A very long string that should be truncated');
      
      expect(result.length).to.be.at.most(15);
    });
  });
  
  describe('Padding configuration', function() {
    it('should pad the result when padding is specified', function() {
      const hash = hashFactory({ words: true, maxlen: 20, padding: 'x' });
      const result = hash('Short');
      
      expect(result.length).to.equal(20);
      expect(result).to.include('x');
    });
    
    it('should use delimiter when padding=true', function() {
      const hash = hashFactory({ words: true, maxlen: 20, padding: true });
      const result = hash('Short');
      
      expect(result.length).to.equal(20);
      expect(result.endsWith('_'.repeat(20 - result.replace(/_+$/, '').length - 1))).to.be.true;
    });
  });
  
  describe('Special cases', function() {
    it('should handle empty strings', function() {
      const hash = hashFactory();
      const result = hash('');
      
      expect(result).to.be.a('string');
    });
    
    it('should handle unicode characters', function() {
      const hash = hashFactory({ words: true });
      const result = hash('Héllò Wórld');
      
      expect(result).to.include('hello');
      expect(result).to.include('world');
    });
  });
}); 