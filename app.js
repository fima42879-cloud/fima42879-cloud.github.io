// Инициализация Telegram Web App
const tg = window.Telegram.WebApp;
tg.expand(); // Раскрываем на все окно
tg.enableClosingConfirmation(); // Подтверждение закрытия

// Элементы DOM
const clickArea = document.getElementById('clickArea');
const penis = document.getElementById('penis');
const congrats = document.getElementById('congrats');
const clickCountElement = document.getElementById('clickCount');
const resetBtn = document.getElementById('resetBtn');

// Переменные состояния
let clickCount = 0;
const maxClicks = 5;
const baseSize = 20; // базовый размер шрифта

// Функция для обновления размера пениса
function updatePenisSize() {
    const newSize = baseSize + (clickCount * 8);
    penis.style.fontSize = ${newSize}px;
    
    // Добавляем эффект "пульсации" при клике
    penis.style.transform = 'scale(1.1)';
    setTimeout(() => {
        penis.style.transform = 'scale(1)';
    }, 150);
}

// Функция для проверки достижения максимума кликов
function checkCompletion() {
    if (clickCount >= maxClicks) {
        congrats.classList.add('show');
        clickArea.style.cursor = 'default';
        clickArea.style.opacity = '0.6';
        
        // Вибрация (если поддерживается)
        if (navigator.vibrate) {
            navigator.vibrate([100, 50, 100]);
        }
        
        // Отправка данных в Telegram (опционально)
        tg.sendData(JSON.stringify({
            action: 'completed',
            clicks: clickCount
        }));
    }
}

// Обработчик клика
clickArea.addEventListener('click', function() {
    if (clickCount < maxClicks) {
        clickCount++;
        clickCountElement.textContent = clickCount;
        updatePenisSize();
        checkCompletion();
    }
});

// Обработчик сброса
resetBtn.addEventListener('click', function() {
    clickCount = 0;
    clickCountElement.textContent = clickCount;
    penis.style.fontSize = ${baseSize}px;
    congrats.classList.remove('show');
    clickArea.style.cursor = 'pointer';
    clickArea.style.opacity = '1';
});

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', function() {
    clickCountElement.textContent = clickCount;
    
    // Анимация появления элементов
    setTimeout(() => {
        document.querySelector('.container').style.opacity = '1';
    }, 100);
});