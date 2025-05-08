// Инициализация Telegram WebApp
const tg = window.Telegram.WebApp;
tg.expand();

// TODO: Заменить placeholder.jpg на реальные фотографии после получения от заказчика
// TODO: Обновить ссылки на виджеты для каждой студии после получения от заказчика

// Данные студий (для масштабирования)
const studios = [
    {
        id: 'studio1',
        name: 'Студия на Вернадского',
        address: 'Москва, Вернадского 15',
        phone: '+7 (999) 123-45-67',
        yandexNavLink: 'https://yandex.ru/navi/?whatshere[point]=37.524659,55.686320',
        yandexMapsLink: 'https://yandex.ru/maps/org/fitnes_ugolok/156758960674/reviews/?ll=37.524659%2C55.686320&tab=reviews&z=17.04',
        telegramChat: 'tg://resolve?domain=TotalBodyVernadskogo',
        widgets: {
            schedule: 'https://infototalbodyonline.impulsecrm.ru/widget/360',
            personalAccount: 'https://infototalbodyonline.impulsecrm.ru/widget/361',
            payment: 'https://infototalbodyonline.impulsecrm.ru/widget/payment'
        },
        trainers: [
            {
                name: 'Анна Петрова',
                experience: 5,
                specialization: ['Растяжка', 'Йога'],
                photo: 'placeholder.jpg'
            },
            {
                name: 'Мария Иванова',
                experience: 3,
                specialization: ['Пилатес', 'Стретчинг'],
                photo: 'placeholder.jpg'
            },
            {
                name: 'Елена Смирнова',
                experience: 4,
                specialization: ['Танцы', 'Растяжка'],
                photo: 'placeholder.jpg'
            },
            {
                name: 'Ольга Кузнецова',
                experience: 2,
                specialization: ['Фитнес', 'Стретчинг'],
                photo: 'placeholder.jpg'
            }
        ]
    },
    {
        id: 'studio2',
        name: 'Студия на Новом Арбате',
        address: 'Москва, Новый Арбат 1',
        phone: '+7 (999) 123-45-68',
        yandexNavLink: 'https://yandex.ru/navi/?whatshere[point]=37.524659,55.686320',
        yandexMapsLink: 'https://yandex.ru/maps/org/fitnes_ugolok/156758960674/reviews/?ll=37.524659%2C55.686320&tab=reviews&z=17.04',
        telegramChat: 'tg://resolve?domain=TotalBodyVernadskogo',
        widgets: {
            schedule: 'https://infototalbodyonline.impulsecrm.ru/widget/360',
            personalAccount: 'https://infototalbodyonline.impulsecrm.ru/widget/361',
            payment: 'https://infototalbodyonline.impulsecrm.ru/widget/payment'
        },
        trainers: [
            {
                name: 'Анна Петрова',
                experience: 5,
                specialization: ['Растяжка', 'Йога'],
                photo: 'placeholder.jpg'
            },
            {
                name: 'Мария Иванова',
                experience: 3,
                specialization: ['Пилатес', 'Стретчинг'],
                photo: 'placeholder.jpg'
            }
        ]
    },
    {
        id: 'studio3',
        name: 'Студия на Тверской',
        address: 'Москва, Тверская 10',
        phone: '+7 (999) 123-45-69',
        yandexNavLink: 'https://yandex.ru/navi/?whatshere[point]=37.524659,55.686320',
        yandexMapsLink: 'https://yandex.ru/maps/org/fitnes_ugolok/156758960674/reviews/?ll=37.524659%2C55.686320&tab=reviews&z=17.04',
        telegramChat: 'tg://resolve?domain=TotalBodyVernadskogo',
        widgets: {
            schedule: 'https://infototalbodyonline.impulsecrm.ru/widget/360',
            personalAccount: 'https://infototalbodyonline.impulsecrm.ru/widget/361',
            payment: 'https://infototalbodyonline.impulsecrm.ru/widget/payment'
        },
        trainers: [
            {
                name: 'Елена Смирнова',
                experience: 4,
                specialization: ['Танцы', 'Растяжка'],
                photo: 'placeholder.jpg'
            },
            {
                name: 'Ольга Кузнецова',
                experience: 2,
                specialization: ['Фитнес', 'Стретчинг'],
                photo: 'placeholder.jpg'
            }
        ]
    },
    {
        id: 'studio4',
        name: 'Студия на Кутузовском',
        address: 'Москва, Кутузовский проспект 30',
        phone: '+7 (999) 123-45-70',
        yandexNavLink: 'https://yandex.ru/navi/?whatshere[point]=37.524659,55.686320',
        yandexMapsLink: 'https://yandex.ru/maps/org/fitnes_ugolok/156758960674/reviews/?ll=37.524659%2C55.686320&tab=reviews&z=17.04',
        telegramChat: 'tg://resolve?domain=TotalBodyVernadskogo',
        widgets: {
            schedule: 'https://infototalbodyonline.impulsecrm.ru/widget/360',
            personalAccount: 'https://infototalbodyonline.impulsecrm.ru/widget/361',
            payment: 'https://infototalbodyonline.impulsecrm.ru/widget/payment'
        },
        trainers: [
            {
                name: 'Анна Петрова',
                experience: 5,
                specialization: ['Растяжка', 'Йога'],
                photo: 'placeholder.jpg'
            },
            {
                name: 'Мария Иванова',
                experience: 3,
                specialization: ['Пилатес', 'Стретчинг'],
                photo: 'placeholder.jpg'
            }
        ]
    },
    {
        id: 'studio5',
        name: 'Студия на Ленинском',
        address: 'Москва, Ленинский проспект 50',
        phone: '+7 (999) 123-45-71',
        yandexNavLink: 'https://yandex.ru/navi/?whatshere[point]=37.524659,55.686320',
        yandexMapsLink: 'https://yandex.ru/maps/org/fitnes_ugolok/156758960674/reviews/?ll=37.524659%2C55.686320&tab=reviews&z=17.04',
        telegramChat: 'tg://resolve?domain=TotalBodyVernadskogo',
        widgets: {
            schedule: 'https://infototalbodyonline.impulsecrm.ru/widget/360',
            personalAccount: 'https://infototalbodyonline.impulsecrm.ru/widget/361',
            payment: 'https://infototalbodyonline.impulsecrm.ru/widget/payment'
        },
        trainers: [
            {
                name: 'Елена Смирнова',
                experience: 4,
                specialization: ['Танцы', 'Растяжка'],
                photo: 'placeholder.jpg'
            },
            {
                name: 'Ольга Кузнецова',
                experience: 2,
                specialization: ['Фитнес', 'Стретчинг'],
                photo: 'placeholder.jpg'
            }
        ]
    },
    {
        id: 'studio6',
        name: 'Студия на Проспекте Мира',
        address: 'Москва, Проспект Мира 100',
        phone: '+7 (999) 123-45-72',
        yandexNavLink: 'https://yandex.ru/navi/?whatshere[point]=37.524659,55.686320',
        yandexMapsLink: 'https://yandex.ru/maps/org/fitnes_ugolok/156758960674/reviews/?ll=37.524659%2C55.686320&tab=reviews&z=17.04',
        telegramChat: 'tg://resolve?domain=TotalBodyVernadskogo',
        widgets: {
            schedule: 'https://infototalbodyonline.impulsecrm.ru/widget/360',
            personalAccount: 'https://infototalbodyonline.impulsecrm.ru/widget/361',
            payment: 'https://infototalbodyonline.impulsecrm.ru/widget/payment'
        },
        trainers: [
            {
                name: 'Анна Петрова',
                experience: 5,
                specialization: ['Растяжка', 'Йога'],
                photo: 'placeholder.jpg'
            },
            {
                name: 'Мария Иванова',
                experience: 3,
                specialization: ['Пилатес', 'Стретчинг'],
                photo: 'placeholder.jpg'
            }
        ]
    }
];

// Конфигурация бота
const BOT_CONFIG = {
    chatId: 'YOUR_BOT_CHAT_ID',
    apiUrl: 'https://api.telegram.org/botYOUR_BOT_TOKEN'
};

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', () => {
    initializeStudioSelector();
    initializeForms();
    subscribeToBot();
    updateStudioInfo(studios[0]); // Инициализация первой студии
});

// Инициализация селектора студий
function initializeStudioSelector() {
    const select = document.getElementById('studio-select');
    studios.forEach(studio => {
        const option = document.createElement('option');
        option.value = studio.id;
        option.textContent = studio.name;
        select.appendChild(option);
    });
}

// Инициализация форм
function initializeForms() {
    const bookingForm = document.getElementById('booking-form');
    bookingForm.addEventListener('submit', handleBookingSubmit);

    const reviewForm = document.getElementById('review-form');
    reviewForm.addEventListener('submit', handleReviewSubmit);
}

// Обработка отправки формы записи
async function handleBookingSubmit(event) {
    event.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        phone: document.getElementById('phone').value,
        date: document.getElementById('date').value,
        studio: document.getElementById('studio-select').value
    };

    try {
        // Здесь будет интеграция с API для записи
        console.log('Данные записи:', formData);
        alert('Запись успешно создана!');
        event.target.reset();
    } catch (error) {
        console.error('Ошибка при создании записи:', error);
        alert('Произошла ошибка при создании записи. Пожалуйста, попробуйте позже.');
    }
}

// Обработка отправки отзыва
async function handleReviewSubmit(event) {
    event.preventDefault();
    
    const rating = document.querySelector('input[name="rating"]:checked').value;
    const reviewText = document.getElementById('review-text').value;
    const currentStudio = studios.find(s => s.id === document.getElementById('studio-select').value);

    try {
        if (rating === '5') {
            // Перенаправление на Яндекс.Карты для 5-звездочного отзыва
            window.open(currentStudio.yandexMapsLink, '_blank');
        } else {
            // Перенаправление в Telegram для отзывов ниже 5 звезд
            window.location.href = currentStudio.telegramChat;
        }
        
        alert('Спасибо за ваш отзыв!');
        event.target.reset();
    } catch (error) {
        console.error('Ошибка при отправке отзыва:', error);
        alert('Произошла ошибка при отправке отзыва. Пожалуйста, попробуйте позже.');
    }
}

// Обновление информации о студии
function updateStudioInfo(studio) {
    // Обновление адреса, телефона и ссылок
    const studioDetails = document.querySelector('.studio-details');
    studioDetails.innerHTML = `
        <p>Адрес: ${studio.address}</p>
        <p>Телефон: ${studio.phone}</p>
        <a href="${studio.yandexNavLink}" class="yandex-nav-link" target="_blank">Открыть в Яндекс.Навигаторе</a>
        <div class="studio-gallery">
            <!-- TODO: Заменить placeholder.jpg на реальные фотографии студии после получения от заказчика -->
            <img src="placeholder.jpg" alt="Фото студии 1">
            <img src="placeholder.jpg" alt="Фото студии 2">
        </div>
    `;

    // Обновление виджетов
    document.querySelector('#schedule iframe').src = studio.widgets.schedule;
    document.querySelector('#personal-account iframe').src = studio.widgets.personalAccount;
    
    // Обновление виджета оплаты (заглушка)
    const paymentWidget = document.querySelector('#payment-widget');
    if (studio.widgets.payment) {
        paymentWidget.innerHTML = `<iframe src="${studio.widgets.payment}" frameborder="0"></iframe>`;
    } else {
        paymentWidget.innerHTML = '<div class="widget-placeholder">Виджет оплаты в разработке</div>';
    }

    // Обновление тренеров
    const trainersGrid = document.querySelector('.trainers-grid');
    trainersGrid.innerHTML = '';
    studio.trainers.forEach(trainer => {
        const trainerCard = document.createElement('div');
        trainerCard.className = 'trainer-card';
        trainerCard.innerHTML = `
            <!-- TODO: Заменить placeholder.jpg на реальные фотографии тренеров после получения от заказчика -->
            <img src="placeholder.jpg" alt="${trainer.name}">
            <h3>${trainer.name}</h3>
            <p>Опыт: ${trainer.experience} лет</p>
            <p>Специализация: ${trainer.specialization.join(', ')}</p>
        `;
        trainersGrid.appendChild(trainerCard);
    });
}

// Подписка на бота
function subscribeToBot() {
    try {
        // Здесь будет реальная логика подписки на бота
        console.log('Подписка на бота выполнена');
    } catch (error) {
        console.error('Ошибка при подписке на бота:', error);
    }
}

// Обработка изменения выбранной студии
document.getElementById('studio-select').addEventListener('change', (event) => {
    const selectedStudio = studios.find(s => s.id === event.target.value);
    if (selectedStudio) {
        updateStudioInfo(selectedStudio);
    }
}); 