let minValue = document.querySelector('#userInputMin');
let maxValue = document.querySelector('#userInputMax');
let orderNumber = 1;
let gameRun = true;
let answerNumber;

const orderNumberField = document.querySelector('#orderNumberField');
const answerField = document.querySelector('#answerField');
const startPhrase = 'Для начала игры задайте диапазон чисел от -999 до 999 и я попробую угадать число которое вы загадали \n \u{1F913}';
answerField.innerText = startPhrase;

//Перевод числа в
function textToNumber(number) {
    let firstDecade = {
        1: "один",
        2: "два",
        3: "три",
        4: "четыре",
        5: "пять",
        6: "шесть",
        7: "семь",
        8: "восемь",
        9: "девять"
    };
    let secondDecade = {
        10: "десять",
        11: "одиннадцать",
        12: "двенадцать",
        13: "тринадцать",
        14: "четырнадцать",
        15: "пятнадцать",
        16: "шестнадцать",
        17: "семнадцать",
        18: "восемнадцать",
        19: "девятнадцать"
    };
    let NumDecade = {
        2: "двадцать",
        3: "тридцать",
        4: "сорок",
        5: "пятьдесят",
        6: "шестьдесят",
        7: "семьдесят",
        8: "восемьдесят",
        9: "девяносто"
    };
    let NumHundreds = {
        1: "сто",
        2: "двести",
        3: "триста",
        4: "четыреста",
        5: "пятьсот",
        6: "шестьсот",
        7: "семьсот",
        8: "восемьсот",
        9: "девятьсот"
    };
    let textAnswer = "";
    let numAnswer = parseInt(number);
    key = null;
    if (numAnswer == 0) {
        textAnswer = "0";
        return textAnswer;
    }
    if (numAnswer < 0) {
        numAnswer = Math.abs(numAnswer);
        textAnswer += "минус ";
    }
    if (numAnswer >= 100) {
        key = Math.floor(numAnswer / 100);
        numAnswer = numAnswer - key * 100;
        textAnswer += NumHundreds[key] + " ";
    }
    if (numAnswer >= 10 && numAnswer <= 20) {
        textAnswer += secondDecade[numAnswer] + " ";
    }
    else if (numAnswer < 10 && numAnswer > 0) {
        textAnswer += firstDecade[numAnswer] + " ";
    }
    else if (numAnswer >= 20) {
        key = Math.floor(numAnswer / 10);
        numAnswer = numAnswer - key * 10;
        textAnswer += NumDecade[key] + " ";
        if (numAnswer > 0) {
            textAnswer += firstDecade[numAnswer];
        }
    }
    textAnswer.trim;
    return textAnswer.length < 20 ? textAnswer : number;
}

//Ответы
function questionSelect() {
    phraseRandom = Math.round(Math.random() * 2);
    switch (phraseRandom) {
        case 0:
            return `Может это число ${textToNumber(answerNumber)}?\n\u{1F914}`;
        case 1:
            return `Это число ${textToNumber(answerNumber)}?\n\u{1F644}`;
        case 2:
            return `Так... это число ${textToNumber(answerNumber)}?\n\u{1F9D0}`;
    }
}

//Текст при победе
function answerWinSelect() {
    phraseRandom = Math.round(Math.random() * 2);
    switch (phraseRandom) {
        case 0:
            return `Я всегда угадываю\n\u{1F60E}`;
        case 1:
            return `Это было не сложно\n\u{1F929}`;
        case 2:
            return `Я чемпион\n\u{1F92D}`;
    }
}

//Начало игры
document.querySelector('#btnStart').addEventListener('click', (event) => {
    if (minValue.value === maxValue.value || minValue.value > maxValue.value) {
        const phraseRandom = Math.round(Math.random());
        const answerPhrase = (phraseRandom === 1) ?
            `Вы ввели не правильный диапазон!\n\u{1F914}` :
            `Будьте внимательны\n\u{1F92F}`;
        answerField.innerText = answerPhrase;
        gameRun = false;
    }
    else {
        minValue = minValue.value < -999 ? -999 : parseInt(minValue.value) > 999 ? -999 : parseInt(minValue.value) || -999;
        maxValue = maxValue.value < -999 ? -999 : parseInt(maxValue.value) > 999 ? 999 : parseInt(maxValue.value) || 999;
        userNumber.hidden = false;
        userNumber.innerText = `Ваш диапазон от ${minValue} до ${maxValue}`;
        document.querySelector('#userInputMin').hidden = true;
        document.querySelector('#userInputMax').hidden = true;
        document.querySelector('#btnStart').hidden = true;
        answerNumber = Math.floor((minValue + maxValue) / 2);
        answerField.innerText = `Вы загадали число ${textToNumber(answerNumber)}?\n\u{1F971}`;
        orderNumberField.innerText = `Вопрос № ${orderNumber}`;
        gameRun = true;
    }
})

//Кнопка больше
document.querySelector('#btnOver').addEventListener('click', (event) => {
    if (gameRun) {
        if (answerNumber === maxValue) {
            const phraseRandom = Math.round(Math.random());
            const answerPhrase = (phraseRandom === 1) ?
                `Вы загадали неправильное число!\n\u{1F914}` :
                `Я сдаюсь..\n\u{1F92F}`;
            answerField.innerText = answerPhrase;
            gameRun = false;
        } else {
            minValue = answerNumber + 1;
            answerNumber = Math.floor((minValue + maxValue) / 2);
            orderNumber++;
            orderNumberField.innerText = `Вопрос № ${orderNumber}`;
            answerField.innerText = questionSelect();
        }
    }
})

//Кнопка меньше
document.querySelector('#btnLess').addEventListener('click', (event) => {
    if (gameRun) {
        if (answerNumber === minValue) {
            const phraseRandom = Math.round(Math.random());
            const answerPhrase = (phraseRandom === 1) ?
                `Вы загадали неправильное число!\n\u{1F914}` :
                `Я сдаюсь..\n\u{1F92F}`;
            answerField.innerText = answerPhrase;
            gameRun = false;
        } else {
            maxValue = answerNumber - 1;
            answerNumber = Math.floor((minValue + maxValue) / 2);
            orderNumber++;
            orderNumberField.innerText = `Вопрос № ${orderNumber}`;
            answerField.innerText = questionSelect();

        }
    }
})

//Сначала
document.querySelector('#btnRetry').addEventListener('click', (event) => {
    document.querySelector('#userInputMin').value = "";
    document.querySelector('#userInputMax').value = "";
    minValue = document.querySelector('#userInputMin');
    maxValue = document.querySelector('#userInputMax');
    answerField.innerText = startPhrase;
    userNumber.hidden = true;
    orderNumberField.hidden = true;
    document.querySelector('#userInputMin').hidden = false;
    document.querySelector('#userInputMax').hidden = false;
    document.querySelector('#btnStart').hidden = false;
    gameRun = false;
})

//Верно
document.querySelector('#btnEqual').addEventListener('click', (event) => {
    if (gameRun) {
        answerField.innerText = answerWinSelect();
        gameRun = false;
    }
})