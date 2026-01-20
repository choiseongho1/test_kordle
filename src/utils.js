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
    // 한국 시간(KST) 아침 9시는 UTC 00:00입니다.
    // UTC 00:00 기준 일 수를 사용하여 전 세계 어디서나 한국 시간 9시에 초기화되도록 합니다.
    const dayCount = Math.floor(now.getTime() / (1000 * 60 * 60 * 24));

    const index = dayCount % words.length;
    return {
        word: words[index],
        dayNumber: dayCount,
        dateString: new Date(dayCount * 86400000).toLocaleDateString()
    };
}
