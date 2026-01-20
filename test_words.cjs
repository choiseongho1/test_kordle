const CHOSEONG = ['ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];
const JUNGSEONG = ['ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ', 'ㅕ', 'ㅖ', 'ㅗ', 'ㅘ', 'ㅙ', 'ㅚ', 'ㅛ', 'ㅜ', 'ㅝ', 'ㅞ', 'ㅟ', 'ㅠ', 'ㅡ', 'ㅢ', 'ㅣ'];
const JONGSEONG = ['', 'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ', 'ㄷ', 'ㄹ', 'ㄺ', 'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ', 'ㄿ', 'ㅀ', 'ㅁ', 'ㅂ', 'ㅄ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];
const ALLOWED_KEYS = ['ㄱ', 'ㄴ', 'ㄷ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅅ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ', 'ㄲ', 'ㄸ', 'ㅃ', 'ㅆ', 'ㅉ', 'ㅏ', 'ㅑ', 'ㅓ', 'ㅕ', 'ㅗ', 'ㅛ', 'ㅜ', 'ㅠ', 'ㅡ', 'ㅣ'];

const fs = require('fs');
const constantsContent = fs.readFileSync('src/constants.js', 'utf8');
const wordsMatch = constantsContent.match(/export const WORDS = (\[[\s\S]*?\]);/);
const WORDS = JSON.parse(wordsMatch[1].replace(/\/\/.*$/gm, '').replace(/,(\s*\])/, '$1'));


function decompose(word) {
    let result = [];
    for (let char of word) {
        const code = char.charCodeAt(0) - 44032;
        if (code < 0 || code > 11171) continue;
        const cho = Math.floor(code / 588);
        const jung = Math.floor((code % 588) / 28);
        const jong = code % 28;
        result.push(CHOSEONG[cho], JUNGSEONG[jung]);
        if (jong !== 0) result.push(JONGSEONG[jong]);
    }
    return result;
}

const failures = [];
WORDS.forEach(word => {
    const units = decompose(word);
    if (units.length !== 6) {
        failures.push(`${word} (Length: ${units.length}, [${units.join(',')}])`);
    } else {
        units.forEach(u => {
            if (!ALLOWED_KEYS.includes(u)) {
                failures.push(`${word} (Unsupported Key: ${u})`);
            }
        });
    }
});

if (failures.length > 0) {
    console.log('--- TEST FAILED ---');
    console.log(`Total Failures: ${failures.length}`);
    failures.forEach(f => console.log(f));
} else {
    console.log(`--- TEST PASSED: ALL ${WORDS.length} WORDS ARE VALID ---`);
}
