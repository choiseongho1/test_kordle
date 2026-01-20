const WORDS = [
    "각막",
    "각질",
    "각혈",
    "간경",
    "간성",
    "간암",
    "간염",
    "간장",
    "간질",
    "갈증",
    "감각",
    "감별",
    "감압",
    "감염",
    "강박",
    "건강",
    "건막",
    "건선",
    "검안",
    "검역",
    "검진",
    "검출",
    "견갑",
    "결막",
    "결장",
    "결절",
    "결찰",
    "결핍",
    "경결",
    "경골",
    "경령",
    "경막",
    "경상",
    "경증",
    "경직",
    "경통",
    "골격",
    "골막",
    "골반",
    "골절",
    "공막",
    "굴절",
    "균열",
    "균혈",
    "근력",
    "근막",
    "근육",
    "근종",
    "근통",
    "금단",
    "금연",
    "급성",
    "긴급",
    "난산",
    "난임",
    "난청",
    "남용",
    "농양",
    "농혈",
    "눈물",
    "눈병",
    "늑간",
    "늑골",
    "늑막",
    "단식",
    "단층",
    "담낭",
    "담석",
    "담즙",
    "당분",
    "당질",
    "독감",
    "독물",
    "독성",
    "독약",
    "독혈",
    "동공",
    "동상",
    "동통",
    "림절",
    "만병",
    "만성",
    "망막",
    "면역",
    "멸균",
    "몸살",
    "문병",
    "문진",
    "민감",
    "반응",
    "반점",
    "발목",
    "발병",
    "발암",
    "발열",
    "발육",
    "발작",
    "발적",
    "발진",
    "발한",
    "방역",
    "병독",
    "병동",
    "병력",
    "병명",
    "병변",
    "병상",
    "병실",
    "병인",
    "복강",
    "복골",
    "복근",
    "복막",
    "복벽",
    "복압",
    "복약",
    "복용",
    "복통",
    "본진",
    "봉합",
    "분만",
    "분석",
    "분진",
    "불면",
    "불안",
    "불임",
    "빈혈",
    "산전",
    "산증",
    "산혈",
    "살균",
    "상담",
    "상병",
    "석면",
    "선암",
    "설암",
    "섬망",
    "성병",
    "성상",
    "성장",
    "성홍",
    "속병",
    "손목",
    "손상",
    "숙면",
    "숙성",
    "습윤",
    "식염",
    "신경",
    "신석",
    "신성",
    "신암",
    "신염",
    "신장",
    "신전",
    "실명",
    "실신",
    "실혈",
    "심근",
    "심낭",
    "심막",
    "심박",
    "심방",
    "심실",
    "심음",
    "심장",
    "심전",
    "심정",
    "심통",
    "악력",
    "악몽",
    "안압",
    "암종",
    "압상",
    "압통",
    "약국",
    "약물",
    "약실",
    "약전",
    "약품",
    "양상",
    "양성",
    "양약",
    "역병",
    "연골",
    "연막",
    "열병",
    "열상",
    "염병",
    "염분",
    "염산",
    "염증",
    "영상",
    "영양",
    "욕창",
    "용량",
    "용법",
    "용혈",
    "운동",
    "육종",
    "음낭",
    "음성",
    "응급",
    "응혈",
    "인산",
    "인술",
    "임상",
    "임신",
    "입실",
    "작열",
    "잠복",
    "잡음",
    "장막",
    "장벽",
    "장암",
    "장염",
    "적응",
    "적혈",
    "전약",
    "전염",
    "절단",
    "절상",
    "절식",
    "점막",
    "접골",
    "접종",
    "접촉",
    "정낭",
    "정력",
    "정상",
    "정신",
    "종격",
    "종골",
    "종물",
    "종양",
    "종창",
    "중독",
    "중등",
    "중상",
    "중증",
    "중풍",
    "직장",
    "진균",
    "진단",
    "진전",
    "진정",
    "진찰",
    "진통",
    "질벽",
    "질병",
    "질산",
    "질염",
    "착란",
    "착상",
    "찰상",
    "창상",
    "척골",
    "천공",
    "천식",
    "철분",
    "청결",
    "청력",
    "청진",
    "촉진",
    "총상",
    "출산",
    "출혈",
    "충혈",
    "측정",
    "침상",
    "침술",
    "침윤",
    "칼슘",
    "코로나",
    "콧물",
    "탄산",
    "통증",
    "통풍",
    "판독",
    "판막",
    "판정",
    "폭식",
    "풍진",
    "한약",
    "한열",
    "합병",
    "항균",
    "항문",
    "항암",
    "항염",
    "혈담",
    "혈당",
    "혈변",
    "혈병",
    "혈압",
    "혈장",
    "혈종",
    "혈증",
    "혈청",
    "혈흔",
    "협심",
    "협착",
    "형질",
    "혼란",
    "홍반",
    "홍역",
    "흉강",
    "흉골",
    "흉근",
    "흉막",
    "흉벽",
    "흉선",
    "흉통",
    "흑반",
    "흡연",
    "흡인",
    "흡입",
    "흡착"
];

const CHOSEONG = ['ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];
const JUNGSEONG = ['ㅏ', 'ㅑ', 'ㅓ', 'ㅕ', 'ㅗ', 'ㅛ', 'ㅜ', 'ㅠ', 'ㅡ', 'ㅣ'];
const JONGSEONG = ['', 'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ', 'ㄷ', 'ㄹ', 'ㄺ', 'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ', 'ㄿ', 'ㅀ', 'ㅁ', 'ㅂ', 'ㅄ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];

const KEYBOARD_LAYOUT = [
    ['ㅂ', 'ㅈ', 'ㄷ', 'ㄱ', 'ㅅ', 'ㅛ', 'ㅕ', 'ㅑ'],
    ['ㅁ', 'ㄴ', 'ㅇ', 'ㄹ', 'ㅎ', 'ㅗ', 'ㅓ', 'ㅏ', 'ㅣ'],
    ['ENTER', 'ㅋ', 'ㅌ', 'ㅊ', 'ㅍ', 'ㅠ', 'ㅜ', 'ㅡ', 'BACK']
];

class MedicalKordle {
    constructor() {
        this.targetWord = "";
        this.targetJaso = [];
        this.currentRow = 0;
        this.currentTile = 0;
        this.guesses = [];
        this.gameOver = false;

        this.init();
    }

    init() {
        this.setDailyTarget();
        this.createGrid();
        this.createKeyboard();
        this.setupEventListeners();
    }

    setDailyTarget() {
        const now = new Date();
        const start = new Date(now.getFullYear(), 0, 0);
        const diff = now - start;
        const oneDay = 1000 * 60 * 60 * 24;
        const dayOfYear = Math.floor(diff / oneDay);

        const index = dayOfYear % WORDS.length;
        this.targetWord = WORDS[index];
        this.targetJaso = this.decompose(this.targetWord);

        document.getElementById('game-number').textContent = `#${dayOfYear}`;
        document.getElementById('game-date').textContent = now.toLocaleDateString();
    }

    decompose(word) {
        let result = [];
        for (let char of word) {
            const code = char.charCodeAt(0) - 44032;
            if (code < 0 || code > 11171) {
                result.push(char);
                continue;
            }
            const cho = Math.floor(code / 588);
            const jungIdx = Math.floor((code % 588) / 28);
            const jongIdx = code % 28;

            // Note: In current logic, we use standard decomposition.
            // But since our target list and keyboard are restricted, 
            // words with complex vowels (ㅐ, ㅔ, ㅘ 등) won't appear or be typable.
            const fullJungList = ['ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ', 'ㅕ', 'ㅖ', 'ㅗ', 'ㅘ', 'ㅙ', 'ㅚ', 'ㅛ', 'ㅜ', 'ㅝ', 'ㅞ', 'ㅟ', 'ㅠ', 'ㅡ', 'ㅢ', 'ㅣ'];
            const fullJongList = ['', 'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ', 'ㄷ', 'ㄹ', 'ㄺ', 'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ', 'ㄿ', 'ㅀ', 'ㅁ', 'ㅂ', 'ㅄ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];

            result.push(CHOSEONG[cho]);
            result.push(fullJungList[jungIdx]);
            if (jongIdx !== 0) result.push(fullJongList[jongIdx]);
        }
        return result;
    }

    createGrid() {
        const container = document.getElementById('grid-container');
        container.innerHTML = '';
        for (let i = 0; i < 6; i++) {
            const row = document.createElement('div');
            row.className = 'grid-row';
            row.id = `row-${i}`;
            for (let j = 0; j < 6; j++) {
                const tile = document.createElement('div');
                tile.className = 'tile';
                tile.id = `row-${i}-tile-${j}`;
                row.appendChild(tile);
            }
            container.appendChild(row);
        }
    }

    createKeyboard() {
        const container = document.getElementById('keyboard-container');
        container.innerHTML = '';
        KEYBOARD_LAYOUT.forEach(row => {
            const rowElement = document.createElement('div');
            rowElement.className = 'key-row';
            row.forEach(key => {
                const btn = document.createElement('button');
                btn.className = 'key';
                btn.textContent = key;
                btn.id = `key-${key}`;
                if (key === 'ENTER' || key === 'BACK') btn.classList.add('wide');
                btn.addEventListener('click', () => this.handleInput(key));
                rowElement.appendChild(btn);
            });
            container.appendChild(rowElement);
        });
    }

    setupEventListeners() {
        if (!this._keydownHandler) {
            this._keydownHandler = (e) => {
                if (this.gameOver) return;
                if (e.key === 'Enter') this.handleInput('ENTER');
                else if (e.key === 'Backspace') this.handleInput('BACK');
            };
            window.addEventListener('keydown', this._keydownHandler);
        }

        const helpBtn = document.getElementById('help-btn');
        if (helpBtn) {
            helpBtn.onclick = () => this.showHelp();
        }
    }

    handleInput(key) {
        if (this.gameOver) return;

        if (key === 'ENTER') {
            this.submitGuess();
        } else if (key === 'BACK') {
            this.deleteChar();
        } else {
            this.addChar(key);
        }
    }

    addChar(char) {
        if (this.currentTile < 6) {
            const tile = document.getElementById(`row-${this.currentRow}-tile-${this.currentTile}`);
            tile.textContent = char;
            tile.setAttribute('data-state', 'toggled');
            this.currentTile++;
        }
    }

    deleteChar() {
        if (this.currentTile > 0) {
            this.currentTile--;
            const tile = document.getElementById(`row-${this.currentRow}-tile-${this.currentTile}`);
            tile.textContent = '';
            tile.removeAttribute('data-state');
        }
    }

    submitGuess() {
        if (this.currentTile < 6) {
            this.showToast('6글자(자소)를 모두 입력해주세요.');
            return;
        }

        const guess = [];
        for (let i = 0; i < 6; i++) {
            guess.push(document.getElementById(`row-${this.currentRow}-tile-${i}`).textContent);
        }

        this.revealGuess(guess);
    }

    revealGuess(guess) {
        const targetCopy = [...this.targetJaso];
        const statuses = new Array(6).fill('absent');

        // First pass: Find correct positions
        guess.forEach((char, i) => {
            if (char === targetCopy[i]) {
                statuses[i] = 'correct';
                targetCopy[i] = null;
            }
        });

        // Second pass: Find present characters
        guess.forEach((char, i) => {
            if (statuses[i] !== 'correct' && targetCopy.includes(char)) {
                statuses[i] = 'present';
                targetCopy[targetCopy.indexOf(char)] = null;
            }
        });

        // Animate reveal
        guess.forEach((char, i) => {
            const tile = document.getElementById(`row-${this.currentRow}-tile-${i}`);
            setTimeout(() => {
                tile.classList.add('reveal');
                tile.classList.add(statuses[i]);
                this.updateKeyboardColor(char, statuses[i]);

                if (i === 5) {
                    this.checkGameStatus(statuses);
                }
            }, i * 200);
        });
    }

    updateKeyboardColor(key, status) {
        const btn = document.getElementById(`key-${key}`);
        if (!btn) return;

        if (status === 'correct') {
            btn.className = 'key correct';
        } else if (status === 'present' && !btn.classList.contains('correct')) {
            btn.className = 'key present';
        } else if (status === 'absent' && !btn.classList.contains('correct') && !btn.classList.contains('present')) {
            btn.className = 'key absent';
        }
    }

    checkGameStatus(statuses) {
        if (statuses.every(s => s === 'correct')) {
            this.gameOver = true;
            this.showToast('축하합니다! 정답입니다.');
        } else if (this.currentRow === 5) {
            this.gameOver = true;
            this.showToast(`아쉽네요. 정답은 [${this.targetWord}]였습니다.`);
        } else {
            this.currentRow++;
            this.currentTile = 0;
        }
    }

    showToast(msg) {
        const container = document.getElementById('toast-container');
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = msg;
        container.appendChild(toast);
        setTimeout(() => toast.remove(), 2000);
    }

    showHelp() {
        const modal = document.getElementById('modal-overlay');
        const body = document.getElementById('modal-body');
        body.innerHTML = `
            <h2>게임 방법</h2>
            <p>6자소로 된 의학용어를 6번의 기회 안에 맞추세요.</p>
            <div class="help-example">
                <div class="tile correct">ㄱ</div>
                <p><strong>ㄱ</strong>는 정답에 포함되며 자리가 일치합니다.</p>
            </div>
            <div class="help-example">
                <div class="tile present">ㅏ</div>
                <p><strong>ㅏ</strong>는 정답에 포함되나 자리가 다릅니다.</p>
            </div>
            <div class="help-example">
                <div class="tile absent">ㄴ</div>
                <p><strong>ㄴ</strong>는 정답에 포함되지 않습니다.</p>
            </div>
            <p><strong>6자소 구성 예시:</strong><br>
            - 간염 (ㄱ, ㅏ, ㄴ, ㅇ, ㅕ, ㅁ = 6)<br>
            - 코로나 (ㅋ, ㅗ, ㄹ, ㅗ, ㄴ, ㅏ = 6)</p>
            <p><small>*ㅐ, ㅔ 및 복합모음이 포함된 단어는 제외되었습니다.</small></p>
        `;
        modal.classList.remove('hidden');
        const closeBtn = document.getElementById('close-modal');
        if (closeBtn) {
            closeBtn.onclick = () => modal.classList.add('hidden');
        }
    }
}

new MedicalKordle();
