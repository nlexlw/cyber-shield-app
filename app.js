const tg = window.Telegram.WebApp;
tg.expand();

// Переключение вкладок
function switchTab(tabId, element) {
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
    document.getElementById(tabId).classList.add('active');
    element.classList.add('active');
    tg.HapticFeedback.impactOccurred('light');
}

// Приветствие пользователя
if (tg.initDataUnsafe?.user) {
    document.getElementById('header-title').innerText = `ОБЪЕКТ: ${tg.initDataUnsafe.user.first_name.toUpperCase()}`;
}

// ЛОГИКА КВИЗА
const quizData = [
    { q: "Тебе прислали ссылку на 'выплату 1000 рублей от государства'. Перейдешь?", a: false },
    { q: "Сотрудник МВД просит перевести деньги на 'безопасный счет'. Это правда?", a: false },
    { q: "Двухфакторная аутентификация реально защищает?", a: true }
];

function runQuiz() {
    let step = 0;
    const container = document.getElementById('quiz-flow');

    function showStep() {
        if (step >= quizData.length) {
            container.innerHTML = "<h4>АНАЛИЗ ЗАВЕРШЕН</h4><p>Данные переданы в нейросеть бота.</p>";
            tg.sendData(JSON.stringify({action: "quiz_complete", points: 100}));
            return;
        }
        container.innerHTML = `
            <p style="margin-bottom:20px">${quizData[step].q}</p>
            <button class="main-btn" onclick="handleAns(true)">ДА</button>
            <button class="main-btn" style="background:rgba(255,255,255,0.1); color:white; margin-top:10px" onclick="handleAns(false)">НЕТ</button>
        `;
    }

    window.handleAns = (val) => {
        step++;
        tg.HapticFeedback.impactOccurred('medium');
        showStep();
    }
    showStep();
}
 function startScan() {
    const url = document.getElementById('url-input').value;
    const res = document.getElementById('scan-result');
    if(!url || !url.startsWith('http')) {
        alert("Введите корректную ссылку!");
        return;
    }

    res.style.display = "block";
    res.innerHTML = "<p>📡 Данные переданы боту для API-анализа...</p>";

    tg.HapticFeedback.impactOccurred('heavy');

    // Отправляем ссылку боту — теперь бот сам сделает запрос к VT
    tg.sendData(JSON.stringify({action: "scan_log", url: url}));

    setTimeout(() => {
        res.innerHTML = "<p style='color:var(--blue)'>Результат придет в чат бота через несколько секунд.</p>";
    }, 1500);
}