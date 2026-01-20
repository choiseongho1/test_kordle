import { CHOSEONG, JUNGSEONG, JONGSEONG } from './constants';

export function decompose(word) {
    let result = [];
    const fullJungList = ['ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ', 'ㅕ', 'ㅖ', 'ㅗ', 'ㅘ', 'ㅙ', 'ㅚ', 'ㅛ', 'ㅜ', 'ㅝ', 'ㅞ', 'ㅟ', 'ㅠ', 'ㅡ', 'ㅢ', 'ㅣ'];
    const fullJongList = ['', 'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ', 'ㄷ', 'ㄹ', 'ㄺ', 'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ', 'ㄿ', 'ㅀ', 'ㅁ', 'ㅂ', 'ㅄ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];

    for (let char of word) {
        const code = char.charCodeAt(0) - 44032;
        if (code < 0 || code > 11171) {
            result.push(char);
            continue;
        }
        const cho = Math.floor(code / 588);
        const jungIdx = Math.floor((code % 588) / 28);
        const jongIdx = code % 28;

        result.push(CHOSEONG[cho]);
        result.push(fullJungList[jungIdx]);
        if (jongIdx !== 0) result.push(fullJongList[jongIdx]);
    }
    return result;
}

export function getDailyTarget(words) {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now - start;
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);

    const index = dayOfYear % words.length;
    return {
        word: words[index],
        dayNumber: dayOfYear,
        dateString: now.toLocaleDateString()
    };
}
