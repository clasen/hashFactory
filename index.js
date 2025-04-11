function hashFactory({ hash = true, wcount = -1, wlen = 6, maxlen = 36, alpha = false, words = false, delimiter = '_', padding = null } = {}) {

    if (hash === false) words = true;

    function toInt(str) {
        // Use djb2 algorithm
        let h = 5381;
        let i = str.length;
        while (i) {
            h = (h * 33) ^ str.charCodeAt(--i);
        }
        return h >>> 0; // Ensure positive integer      
    }

    function toWords(text, hashLength) {
        const tokens = text.normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-zA-Z0-9\s_\.-]/g, '')
            .toLowerCase().trim().split(/[-_\.\s]+/);

        let result = [];
        if (maxlen === -1) {
            result = wcount === -1 ? tokens : tokens.slice(0, wcount);
        } else {
            // Calculate hash length that will be added later
            const hashWithDelimiterLength = hashLength + (tokens.length > 0 ? delimiter.length : 0);

            let availableSpace = maxlen - hashWithDelimiterLength;
            let currentLength = 0;

            for (let token of tokens) {
                // Handle infinite word length
                const normalizedToken = wlen === -1 ? token : token.slice(0, wlen);
                const delimiterSize = result.length > 0 ? delimiter.length : 0;
                const wouldBeLength = currentLength + normalizedToken.length + delimiterSize;

                // Check for infinite limits
                const wordsLimitReached = wcount !== -1 && result.length >= wcount;
                const maxlenLimitReached = availableSpace !== -1 && wouldBeLength > availableSpace;

                if (wordsLimitReached || maxlenLimitReached) break;

                result.push(normalizedToken);
                currentLength = wouldBeLength;
            }
        }

        return result;
    }

    function rightPad(str) {
        if (!padding || maxlen === -1 || str.length >= maxlen) {
            return str;
        }
        const char = padding === true ? delimiter : padding;
        return str + delimiter + char.repeat(maxlen - str.length - delimiter.length);
    }

    return function hashFunction(str) {
        const hashValue = alpha ? toInt(str).toString(36) : toInt(str).toString();
        const result = words ? toWords(str, hash ? hashValue.length : 0) : [];
        if (hash) result.push(hashValue);
        return rightPad(result.join(delimiter));
    };
}



module.exports = hashFactory;