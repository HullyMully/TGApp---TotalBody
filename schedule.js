
document.addEventListener('DOMContentLoaded', () => {
    const tg = window.Telegram.WebApp;
    tg.expand();

    // Schedule logic will be implemented here
    const scheduleGrid = document.getElementById('schedule-grid');
    // Example schedule data - replace with actual API call
    const scheduleData = [
        { time: '10:00', class: 'Фитнес-аэробика', trainer: 'Анна П.' },
        { time: '12:00', class: 'Растяжка', trainer: 'Мария И.' },
        { time: '15:00', class: 'Пилатес', trainer: 'Елена С.' }
    ];

    scheduleData.forEach(item => {
        const classElement = document.createElement('div');
        classElement.className = 'schedule-item';
        classElement.innerHTML = `
            <div class="time">${item.time}</div>
            <div class="class-info">
                <h4>${item.class}</h4>
                <p>Тренер: ${item.trainer}</p>
            </div>
        `;
        scheduleGrid.appendChild(classElement);
    });
});
