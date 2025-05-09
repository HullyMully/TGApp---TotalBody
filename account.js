
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Telegram WebApp
    const tg = window.Telegram.WebApp;
    tg.expand();

    // Mock data - replace with actual API calls
    const mockUserData = {
        name: "Анна Петрова",
        phone: "+7 (999) 123-45-67",
        email: "anna@example.com"
    };

    const mockSubscriptions = [
        {
            name: "Базовый",
            visits: "8 занятий",
            validUntil: "01.03.2024",
            remainingVisits: 5
        }
    ];

    const mockHistory = [
        {
            date: "2024-02-05",
            className: "Фитнес-аэробика",
            trainer: "Наталья Королева",
            time: "10:00"
        }
    ];

    // Update UI with mock data
    document.getElementById('user-name').textContent = mockUserData.name;
    document.getElementById('user-phone').textContent = mockUserData.phone;
    document.getElementById('user-email').textContent = mockUserData.email;

    // Render subscriptions
    const subscriptionsContainer = document.getElementById('subscriptions');
    mockSubscriptions.forEach(sub => {
        const subElement = document.createElement('div');
        subElement.className = 'subscription-card';
        subElement.innerHTML = `
            <h3>${sub.name}</h3>
            <p>Тип: ${sub.visits}</p>
            <p>Действует до: ${sub.validUntil}</p>
            <p>Осталось занятий: ${sub.remainingVisits}</p>
        `;
        subscriptionsContainer.appendChild(subElement);
    });

    // Render history
    const historyContainer = document.getElementById('training-history');
    mockHistory.forEach(entry => {
        const historyElement = document.createElement('div');
        historyElement.className = 'history-item';
        historyElement.innerHTML = `
            <div class="history-date">${entry.date}</div>
            <div class="history-details">
                <h4>${entry.className}</h4>
                <p>Тренер: ${entry.trainer}</p>
                <p>Время: ${entry.time}</p>
            </div>
        `;
        historyContainer.appendChild(historyElement);
    });
});
