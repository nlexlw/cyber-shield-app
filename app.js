const tg = window.Telegram.WebApp;


tg.expand();
tg.ready();

if (tg.initDataUnsafe?.user) {
    const user = tg.initDataUnsafe.user;
    document.getElementById('welcome-user').innerText = `Привет, ${user.first_name}!`;
}

function encryptText() {
    const textInput = document.getElementById('text-to-encrypt');
    const resultDiv = document.getElementById('result');
    const text = textInput.value;

    if (!text) {
        tg.HapticFeedback.notificationOccurred('error');
        return;
    }

    const encrypted = btoa(unescape(encodeURIComponent(text + "_SECURE_2026")));

    resultDiv.style.display = 'block';
    resultDiv.innerText = "TOKEN: " + encrypted;

    tg.HapticFeedback.impactOccurred('medium');

    tg.sendData(JSON.stringify({
        action: "encrypt",
        payload: encrypted
    }));
}