const fs = require('fs');

const constantsPath = 'c:/Users/95_cs/.gemini/antigravity/scratch/medical-kordle/src/constants.js';
const content = fs.readFileSync(constantsPath, 'utf8');

// Extract WORDS array content manually if needed or regex
const regex = /export const WORDS = (\[[\s\S]*?\]);/;
const match = content.match(regex);
if (match) {
    // We can't easily eval if it contains imports, but constants.js is simple.
    // However, it's safer to just extract the array content.
    const arrayStr = match[1];
    // Since it's a simple array of strings, we can just use JSON.parse if it's formatted correctly, 
    // but it might have single quotes. Let's fix it for JSON.parse.
    const validJsonArray = arrayStr.replace(/'/g, '"').replace(/,(\s*\])/, '$1');
    const wordsArray = JSON.parse(validJsonArray);

    const jsonEncoded = Buffer.from(JSON.stringify(wordsArray)).toString('base64');

    // In Browser, window.atob and decodeURIComponent(escape()) works for UTF-8.
    const finalContent = content.replace(
        /export const WORDS = \[[\s\S]*?\];/,
        `const _W = "${jsonEncoded}";\nexport const WORDS = JSON.parse(decodeURIComponent(escape(window.atob(_W))));`
    );

    fs.writeFileSync(constantsPath, finalContent);
    console.log("Obfuscated WORDS in constants.js");
}
