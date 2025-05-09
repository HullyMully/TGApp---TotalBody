const express = require('express');
const path = require('path');
const app = express();

// Serve static files
app.use(express.static(path.join(__dirname)));

// Start server
const PORT = 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});

// Инициализация Telegram WebApp
const tg = window.Telegram.WebApp;
tg.expand();

// Данные для расписания
const scheduleData = {
    currentWeek: new Date(),
    weeks: [
        {
            startDate: '2024-03-18',
            endDate: '2024-03-24',
            days: [
                {
                    date: '2024-03-18',
                    classes: [
                        { time: '09:00', name: 'Растяжка', trainer: 'Анна Петрова', capacity: 8, enrolled: 5 },
                        { time: '11:00', name: 'Йога', trainer: 'Мария Иванова', capacity: 10, enrolled: 7 },
                        { time: '18:00', name: 'Пилатес', trainer: 'Елена Смирнова', capacity: 8, enrolled: 6 }
                    ]
                },
                // ... остальные дни недели
            ]
        }
    ]
};

// Данные для личного кабинета
const mockUserData = {
    name: 'Иван Иванов',
    phone: '+7 (999) 123-45-67',
    email: 'ivan@example.com',
    studio: 'Студия на Вернадского',
    joinDate: '2024-01-15'
};

const mockSubscriptions = [
    {
        id: 1,
        name: 'Базовый абонемент',
        startDate: '2024-03-01',
        endDate: '2024-03-31',
        visitsLeft: 8,
        status: 'active'
    },
    {
        id: 2,
        name: 'Премиум абонемент',
        startDate: '2024-04-01',
        endDate: '2024-04-30',
        visitsLeft: 12,
        status: 'pending'
    }
];

const mockHistory = [
    {
        date: '2024-03-15',
        time: '18:00',
        class: 'Растяжка',
        trainer: 'Анна Петрова',
        status: 'completed'
    },
    {
        date: '2024-03-13',
        time: '11:00',
        class: 'Йога',
        trainer: 'Мария Иванова',
        status: 'completed'
    }
];

// Данные о студиях
const studios = [
    {
        id: 1,
        name: 'Студия на Вернадского',
        address: 'пр-т Вернадского, 78',
        phone: '+7 (495) 123-45-67',
        schedule: 'Пн-Вс: 07:00 - 23:00',
        trainers: [
            {
                name: 'Анна Петрова',
                specialization: 'Растяжка, Йога',
                experience: '5 лет',
                photo: 'https://example.com/trainer1.jpg'
            },
            {
                name: 'Мария Иванова',
                specialization: 'Пилатес, Функциональный тренинг',
                experience: '7 лет',
                photo: 'https://example.com/trainer2.jpg'
            }
        ],
        description: 'Современная студия с новейшим оборудованием. Просторные залы для групповых и индивидуальных занятий.',
        amenities: [
            'Раздевалки с душевыми',
            'Зона отдыха',
            'Бесплатный Wi-Fi',
            'Парковка'
        ]
    },
    {
        id: 2,
        name: 'Студия на Новом Арбате',
        address: 'ул. Новый Арбат, 21',
        phone: '+7 (495) 234-56-78',
        schedule: 'Пн-Вс: 08:00 - 22:00',
        trainers: [
            {
                name: 'Елена Смирнова',
                specialization: 'Йога, Медитация',
                experience: '8 лет',
                photo: 'https://example.com/trainer3.jpg'
            },
            {
                name: 'Алексей Козлов',
                specialization: 'Функциональный тренинг, Кроссфит',
                experience: '6 лет',
                photo: 'https://example.com/trainer4.jpg'
            }
        ],
        description: 'Уютная студия в центре города с панорамными окнами и современным оборудованием.',
        amenities: [
            'Раздевалки с душевыми',
            'Зона отдыха',
            'Бесплатный Wi-Fi',
            'Велостоянка'
        ]
    },
    {
        id: 3,
        name: 'Студия на Тверской',
        address: 'ул. Тверская, 15',
        phone: '+7 (495) 345-67-89',
        schedule: 'Пн-Вс: 07:00 - 23:00',
        trainers: [
            {
                name: 'Дмитрий Волков',
                specialization: 'Силовые тренировки, TRX',
                experience: '10 лет',
                photo: 'https://example.com/trainer5.jpg'
            },
            {
                name: 'Ольга Новикова',
                specialization: 'Пилатес, Растяжка',
                experience: '4 года',
                photo: 'https://example.com/trainer6.jpg'
            }
        ],
        description: 'Премиальная студия с эксклюзивным оборудованием и индивидуальным подходом к каждому клиенту.',
        amenities: [
            'Раздевалки с душевыми',
            'Зона отдыха',
            'Бесплатный Wi-Fi',
            'Подземная парковка',
            'SPA-зона'
        ]
    }
];

// Инициализация приложения
function initializeApp() {
    // Получение данных пользователя из Telegram
    const userData = tg.initDataUnsafe?.user;
    if (userData) {
        // Заполняем поле имени в форме записи
        const nameInput = document.querySelector('#booking-form input[name="name"]');
        if (nameInput) {
            nameInput.value = `${userData.first_name} ${userData.last_name || ''}`.trim();
        }
    }

    // Инициализация селектора студий
    initializeStudioSelector();

    // Инициализация обработчиков событий
    initializeEventHandlers();
}

/**
 * Инициализация селектора студий
 */
function initializeStudioSelector() {
    const studioSelect = document.querySelector('#studio-select');
    if (!studioSelect) return;

    // Заполняем селектор студиями
    studioSelect.innerHTML = studios.map(studio => 
        `<option value="${studio.id}">${studio.name}</option>`
    ).join('');

    // Добавляем обработчик изменения студии
    studioSelect.addEventListener('change', (e) => {
        const selectedStudio = studios.find(s => s.id === parseInt(e.target.value));
        if (selectedStudio) {
            updateStudioInfo(selectedStudio);
        }
    });

    // Инициализируем информацию о первой студии
    if (studios.length > 0) {
        updateStudioInfo(studios[0]);
    }
}

/**
 * Обновление информации о студии
 */
function updateStudioInfo(studio) {
    // Обновляем информацию в разделе "О студии"
    const aboutSection = document.querySelector('#about-studio');
    if (aboutSection) {
        aboutSection.innerHTML = `
            <div class="about-content">
                <p>${studio.description}</p>
                <h3>Информация</h3>
                <ul>
                    <li>Адрес: ${studio.address}</li>
                    <li>Телефон: ${studio.phone}</li>
                    <li>Режим работы: ${studio.schedule}</li>
                </ul>
                <h3>Удобства</h3>
                <ul>
                    ${studio.amenities.map(amenity => `<li>${amenity}</li>`).join('')}
                </ul>
            </div>
        `;
    }

    // Обновляем информацию о тренерах
    const trainersSection = document.querySelector('#trainers');
    if (trainersSection) {
        trainersSection.innerHTML = `
            <div class="trainers-grid">
                ${studio.trainers.map(trainer => `
                    <div class="trainer-card">
                        <img src="${trainer.photo}" alt="${trainer.name}">
                        <h3>${trainer.name}</h3>
                        <p>${trainer.specialization}</p>
                        <p>Опыт: ${trainer.experience}</p>
                    </div>
                `).join('')}
            </div>
        `;
    }
}

/**
 * Инициализация обработчиков событий
 */
function initializeEventHandlers() {
    // Обработчик отправки формы записи
    const bookingForm = document.querySelector('#booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Собираем данные формы
            const formData = new FormData(bookingForm);
            const bookingData = {
                name: formData.get('name'),
                phone: formData.get('phone'),
                email: formData.get('email'),
                studio: formData.get('studio'),
                date: formData.get('date'),
                time: formData.get('time'),
                class: formData.get('class')
            };

            // Отправляем данные в Telegram
            tg.sendData(JSON.stringify(bookingData));

            // Показываем сообщение об успешной отправке
            alert('Спасибо за запись! Мы свяжемся с вами в ближайшее время.');
            
            // Очищаем форму
            bookingForm.reset();
        });
    }

    // Обработчики для кнопок рейтинга
    const ratingButtons = document.querySelectorAll('.rating-btn');
    ratingButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Убираем активный класс у всех кнопок
            ratingButtons.forEach(btn => btn.classList.remove('active'));
            // Добавляем активный класс выбранной кнопке
            button.classList.add('active');
        });
    });

    // Обработчик отправки отзыва
    const reviewForm = document.querySelector('#review-form');
    if (reviewForm) {
        reviewForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Получаем выбранную оценку
            const selectedRating = document.querySelector('.rating-btn.active');
            if (!selectedRating) {
                alert('Пожалуйста, выберите оценку');
                return;
            }

            // Получаем текст отзыва
            const reviewText = document.querySelector('#review-text').value.trim();
            if (!reviewText) {
                alert('Пожалуйста, напишите отзыв');
                return;
            }

            // Создаем объект отзыва
            const review = {
                rating: selectedRating.dataset.rating,
                text: reviewText,
                date: new Date().toISOString(),
                userName: mockUserData.name // TODO: Заменить на реальное имя пользователя
            };

            // Сохраняем отзыв в localStorage
            const reviews = JSON.parse(localStorage.getItem('reviews') || '[]');
            reviews.unshift(review); // Добавляем новый отзыв в начало массива
            localStorage.setItem('reviews', JSON.stringify(reviews));

            // Обновляем список отзывов
            updateReviewsList();

            // Очищаем форму
            reviewForm.reset();
            ratingButtons.forEach(btn => btn.classList.remove('active'));

            // Показываем сообщение об успешной отправке
            alert('Спасибо за ваш отзыв!');
        });
    }
}

/**
 * Обновление списка отзывов
 */
function updateReviewsList() {
    const reviewsList = document.querySelector('.reviews-list');
    if (!reviewsList) return;

    const reviews = JSON.parse(localStorage.getItem('reviews') || '[]');
    
    if (reviews.length === 0) {
        reviewsList.innerHTML = '<p class="no-reviews">Пока нет отзывов. Будьте первым!</p>';
        return;
    }

    reviewsList.innerHTML = reviews.map(review => `
        <div class="review-card">
            <div class="review-header">
                <div class="review-rating">
                    ${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}
                </div>
                <div class="review-meta">
                    <span class="review-author">${review.userName}</span>
                    <span class="review-date">${formatDate(new Date(review.date))}</span>
                </div>
            </div>
            <p class="review-text">${review.text}</p>
        </div>
    `).join('');
}

// Инициализация приложения при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
    updateReviewsList(); // Добавляем инициализацию списка отзывов
});

/**
 * Обновление виджетов
 */
function updateWidgets(studio) {
    // Функция для обработки ошибок загрузки виджетов
    const handleWidgetError = (container, widgetName) => {
        console.error(`Ошибка загрузки виджета ${widgetName}`);
        container.innerHTML = `
            <div class="widget-placeholder">
                Ошибка загрузки виджета, попробуйте позже
            </div>
        `;
    };

    // Обновление виджета расписания
    updateSchedule(DOM.scheduleContainer);

    // Обновление виджета личного кабинета
    updateAccount(DOM.personalAccountContainer);

    // Обновление виджета оплаты
    if (studio.widgets.payment) {
        updateWidget(DOM.paymentWidget, studio.widgets.payment, 'оплаты', handleWidgetError);
    } else {
        DOM.paymentWidget.innerHTML = '<div class="widget-placeholder">Виджет оплаты в разработке</div>';
    }
}

/**
 * Обновление расписания
 */
function updateSchedule(container) {
    if (!container) return;

    const currentWeek = scheduleData.weeks[0]; // TODO: Заменить на реальные данные
    const weekStart = new Date(currentWeek.startDate);
    const weekEnd = new Date(currentWeek.endDate);

    container.innerHTML = `
        <div class="schedule-nav">
            <button class="prev-week">←</button>
            <span class="week-range">${formatDate(weekStart)} - ${formatDate(weekEnd)}</span>
            <button class="next-week">→</button>
        </div>
        <div class="schedule-grid">
            ${currentWeek.days.map(day => `
                <div class="schedule-day">
                    <h3>${formatDate(new Date(day.date))}</h3>
                    ${day.classes.map(lesson => `
                        <div class="schedule-lesson">
                            <div class="lesson-time">${lesson.time}</div>
                            <div class="lesson-info">
                                <h4>${lesson.name}</h4>
                                <p>Тренер: ${lesson.trainer}</p>
                                <p>Мест: ${lesson.enrolled}/${lesson.capacity}</p>
                            </div>
                            <button class="enroll-button" ${lesson.enrolled >= lesson.capacity ? 'disabled' : ''}>
                                ${lesson.enrolled >= lesson.capacity ? 'Нет мест' : 'Записаться'}
                            </button>
                        </div>
                    `).join('')}
                </div>
            `).join('')}
        </div>
    `;

    // Добавляем обработчики для кнопок навигации
    container.querySelector('.prev-week').addEventListener('click', () => {
        // TODO: Реализовать переход на предыдущую неделю
        console.log('Предыдущая неделя');
    });

    container.querySelector('.next-week').addEventListener('click', () => {
        // TODO: Реализовать переход на следующую неделю
        console.log('Следующая неделя');
    });
}

/**
 * Обновление личного кабинета
 */
function updateAccount(container) {
    if (!container) return;

    container.innerHTML = `
        <div class="profile-info">
            <h3>Мои данные</h3>
            <div class="info-grid">
                <div class="info-item">
                    <label>Имя:</label>
                    <span>${mockUserData.name}</span>
                </div>
                <div class="info-item">
                    <label>Телефон:</label>
                    <span>${mockUserData.phone}</span>
                </div>
                <div class="info-item">
                    <label>Email:</label>
                    <span>${mockUserData.email}</span>
                </div>
                <div class="info-item">
                    <label>Студия:</label>
                    <span>${mockUserData.studio}</span>
                </div>
                <div class="info-item">
                    <label>Дата регистрации:</label>
                    <span>${formatDate(new Date(mockUserData.joinDate))}</span>
                </div>
            </div>
        </div>

        <div class="subscriptions-grid">
            <h3>Мои абонементы</h3>
            ${mockSubscriptions.map(sub => `
                <div class="subscription-card ${sub.status}">
                    <h4>${sub.name}</h4>
                    <p>Период: ${formatDate(new Date(sub.startDate))} - ${formatDate(new Date(sub.endDate))}</p>
                    <p>Осталось посещений: ${sub.visitsLeft}</p>
                    <span class="status-badge">${getStatusText(sub.status)}</span>
                </div>
            `).join('')}
        </div>

        <div class="history-list">
            <h3>История занятий</h3>
            ${mockHistory.map(lesson => `
                <div class="history-item ${lesson.status}">
                    <div class="history-date">
                        <span class="date">${formatDate(new Date(lesson.date))}</span>
                        <span class="time">${lesson.time}</span>
                    </div>
                    <div class="history-info">
                        <h4>${lesson.class}</h4>
                        <p>Тренер: ${lesson.trainer}</p>
                    </div>
                    <span class="status-badge">${getStatusText(lesson.status)}</span>
                </div>
            `).join('')}
        </div>
    `;
}

/**
 * Форматирование даты
 */
function formatDate(date) {
    return date.toLocaleDateString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
}

/**
 * Получение текста статуса
 */
function getStatusText(status) {
    const statusMap = {
        active: 'Активен',
        pending: 'Ожидает',
        completed: 'Завершено',
        cancelled: 'Отменено'
    };
    return statusMap[status] || status;
}