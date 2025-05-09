document.addEventListener('DOMContentLoaded', () => {
    const tg = window.Telegram.WebApp;
    tg.expand();

    const mainContent = document.getElementById('main-content');
    const tabs = document.querySelectorAll('.tab-item');

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
                    }
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
                    photo: 'https://randomuser.me/api/portraits/women/32.jpg'
                },
                {
                    name: 'Мария Иванова',
                    specialization: 'Пилатес, Функциональный тренинг',
                    experience: '7 лет',
                    photo: 'https://randomuser.me/api/portraits/women/44.jpg'
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
                    photo: 'https://randomuser.me/api/portraits/women/68.jpg'
                },
                {
                    name: 'Алексей Козлов',
                    specialization: 'Функциональный тренинг, Кроссфит',
                    experience: '6 лет',
                    photo: 'https://randomuser.me/api/portraits/men/45.jpg'
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
                    photo: 'https://randomuser.me/api/portraits/men/22.jpg'
                },
                {
                    name: 'Ольга Новикова',
                    specialization: 'Пилатес, Растяжка',
                    experience: '4 года',
                    photo: 'https://randomuser.me/api/portraits/women/91.jpg'
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

    // Content for each page
    const pages = {
        home: `
            <div class="home-content">
                <header>
                    <div class="logo">
                        <img src="https://via.placeholder.com/120" alt="Total Body" class="logo-image">
                        <h1>Total Body</h1>
                        <p class="tagline">Студия современного фитнеса</p>
                    </div>
                    <div class="studio-selector">
                        <select id="studio-select" class="studio-select">
                            <option value="">Выберите студию</option>
                            ${studios.map(studio => `<option value="${studio.id}">${studio.name}</option>`).join('')}
                        </select>
                    </div>
                </header>
                <section class="section" id="about-studio">
                    <h2>О студии</h2>
                    <div class="about-content">
                        <p>${studios[0].description}</p>
                        <h3>Информация</h3>
                        <ul>
                            <li>Адрес: ${studios[0].address}</li>
                            <li>Телефон: ${studios[0].phone}</li>
                            <li>Режим работы: ${studios[0].schedule}</li>
                        </ul>
                        <h3>Удобства</h3>
                        <ul>
                            ${studios[0].amenities.map(amenity => `<li>${amenity}</li>`).join('')}
                        </ul>
                    </div>
                </section>
                <section class="section">
                    <h2>Запись на пробное занятие</h2>
                    <form id="booking-form">
                        <input type="text" id="name" name="name" placeholder="Ваше имя" required>
                        <input type="tel" id="phone" name="phone" placeholder="Телефон" required>
                        <input type="date" id="date" name="date" required>
                        <button type="submit">Записаться</button>
                    </form>
                </section>
                <section class="section" id="trainers">
                    <h2>Наши тренеры</h2>
                    <div class="trainers-grid">
                        ${studios[0].trainers.map(trainer => `
                            <div class="trainer-card">
                                <img src="${trainer.photo}" alt="${trainer.name}">
                                <h3>${trainer.name}</h3>
                                <p>Опыт: ${trainer.experience}</p>
                                <p>Специализация: ${trainer.specialization}</p>
                            </div>
                        `).join('')}
                    </div>
                </section>
                <section class="section">
                    <h2>Отзывы</h2>
                    <div class="reviews-section">
                        <h3>Оценка:</h3>
                        <div class="rating-buttons">
                            <button class="rating-btn" data-rating="5">5</button>
                            <button class="rating-btn" data-rating="4">4</button>
                            <button class="rating-btn" data-rating="3">3</button>
                            <button class="rating-btn" data-rating="2">2</button>
                            <button class="rating-btn" data-rating="1">1</button>
                        </div>
                        <textarea class="review-input" id="review-text" placeholder="Оставьте свой отзыв"></textarea>
                        <button class="submit-review">Отправить отзыв</button>
                        <div class="reviews-list"></div>
                    </div>
                </section>
            </div>
        `,
        schedule: `
            <div class="schedule-container">
                <div class="schedule-nav">
                    <button class="prev-week">←</button>
                    <span class="week-range">${formatDate(new Date(scheduleData.weeks[0].startDate))} - ${formatDate(new Date(scheduleData.weeks[0].endDate))}</span>
                    <button class="next-week">→</button>
                </div>
                <div class="schedule-grid">
                    ${scheduleData.weeks[0].days.map(day => `
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
            </div>
        `,
        account: `
            <div class="personal-account-container">
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
            </div>
        `
    };

    // DOM элементы
    const DOM = {
        scheduleContainer: null,
        personalAccountContainer: null,
        studioSelect: null,
        aboutStudio: null,
        trainers: null,
        bookingForm: null,
        reviewsList: null
    };

    // Show page content
    function showPage(pageId) {
        mainContent.innerHTML = pages[pageId];
        tabs.forEach(tab => {
            tab.classList.toggle('active', tab.dataset.page === pageId);
        });

        // Обновляем DOM элементы после рендеринга страницы
        DOM.scheduleContainer = document.querySelector('.schedule-container');
        DOM.personalAccountContainer = document.querySelector('.personal-account-container');
        DOM.studioSelect = document.querySelector('#studio-select');
        DOM.aboutStudio = document.querySelector('#about-studio');
        DOM.trainers = document.querySelector('#trainers');
        DOM.bookingForm = document.querySelector('#booking-form');
        DOM.reviewsList = document.querySelector('.reviews-list');

        // Инициализация после рендеринга
        initializeApp();
    }

    // Tab click handlers
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            showPage(tab.dataset.page);
        });
    });

    // Форматирование даты
    function formatDate(date) {
        return date.toLocaleDateString('ru-RU', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    }

    // Получение текста статуса
    function getStatusText(status) {
        const statusMap = {
            active: 'Активен',
            pending: 'Ожидает',
            completed: 'Завершено',
            cancelled: 'Отменено'
        };
        return statusMap[status] || status;
    }

    // Инициализация приложения
    function initializeApp() {
        console.log('App initialization started');

        // Получение данных пользователя из Telegram
        const userData = tg.initDataUnsafe?.user;
        if (userData) {
            console.log('User data received:', userData);
            const nameInput = document.querySelector('#name');
            if (nameInput) {
                nameInput.value = `${userData.first_name} ${userData.last_name || ''}`.trim();
                console.log('Name field populated:', nameInput.value);
            }
        }

        // Инициализация селектора студий
        initializeStudioSelector();

        // Инициализация обработчиков событий
        initializeEventHandlers();

        // Инициализация списка отзывов
        updateReviewsList();

        console.log('App initialization completed');
    }

    // Инициализация селектора студий
    function initializeStudioSelector() {
        console.log('Initializing studio selector');
        if (!DOM.studioSelect) {
            console.warn('Studio select element not found');
            return;
        }

        DOM.studioSelect.addEventListener('change', (e) => {
            const selectedStudio = studios.find(s => s.id === parseInt(e.target.value));
            if (selectedStudio) {
                console.log('Studio selected:', selectedStudio.name);
                updateStudioInfo(selectedStudio);
            }
        });

        // Инициализируем информацию о первой студии
        if (studios.length > 0) {
            console.log('Initializing first studio info');
            updateStudioInfo(studios[0]);
        }
    }

    // Обновление информации о студии
    function updateStudioInfo(studio) {
        if (DOM.aboutStudio) {
            DOM.aboutStudio.innerHTML = `
                <h2>О студии</h2>
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

        if (DOM.trainers) {
            DOM.trainers.innerHTML = `
                <h2>Наши тренеры</h2>
                <div class="trainers-grid">
                    ${studio.trainers.map(trainer => `
                        <div class="trainer-card">
                            <img src="${trainer.photo}" alt="${trainer.name}">
                            <h3>${trainer.name}</h3>
                            <p>Опыт: ${trainer.experience}</p>
                            <p>Специализация: ${trainer.specialization}</p>
                        </div>
                    `).join('')}
                </div>
            `;
        }
    }

    // Инициализация обработчиков событий
    function initializeEventHandlers() {
        console.log('Initializing event handlers');

        // Обработчик отправки формы записи
        if (DOM.bookingForm) {
            DOM.bookingForm.addEventListener('submit', (e) => {
                e.preventDefault();
                console.log('Booking form submitted');

                const formData = new FormData(DOM.bookingForm);
                const bookingData = {
                    name: formData.get('name'),
                    phone: formData.get('phone'),
                    date: formData.get('date'),
                    studio: DOM.studioSelect ? studios.find(s => s.id === parseInt(DOM.studioSelect.value))?.name : 'Не выбрано'
                };
                console.log('Booking data:', bookingData);

                tg.sendData(JSON.stringify(bookingData));
                console.log('Booking data sent to Telegram');

                alert('Спасибо за запись! Мы свяжемся с вами в ближайшее время.');
                DOM.bookingForm.reset();
            });
        }

        // Обработчики для кнопок рейтинга
        const ratingButtons = document.querySelectorAll('.rating-btn');
        ratingButtons.forEach(button => {
            button.addEventListener('click', () => {
                console.log('Rating button clicked:', button.dataset.rating);
                ratingButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
            });
        });

        // Обработчик отправки отзыва
        const submitReviewButton = document.querySelector('.submit-review');
        if (submitReviewButton) {
            submitReviewButton.addEventListener('click', () => {
                console.log('Review submit button clicked');

                const selectedRating = document.querySelector('.rating-btn.active');
                if (!selectedRating) {
                    console.warn('No rating selected');
                    alert('Пожалуйста, выберите оценку');
                    return;
                }

                const reviewText = document.querySelector('#review-text').value.trim();
                if (!reviewText) {
                    console.warn('No review text provided');
                    alert('Пожалуйста, напишите отзыв');
                    return;
                }

                const userData = tg.initDataUnsafe?.user;
                const userName = userData ? 
                    `${userData.first_name} ${userData.last_name || ''}`.trim() : 
                    'Анонимный пользователь';
                console.log('User name for review:', userName);

                const review = {
                    rating: parseInt(selectedRating.dataset.rating),
                    text: reviewText,
                    date: new Date().toISOString(),
                    userName: userName
                };
                console.log('Review object created:', review);

                const reviews = JSON.parse(localStorage.getItem('reviews') || '[]');
                reviews.unshift(review);
                localStorage.setItem('reviews', JSON.stringify(reviews));
                console.log('Review saved to localStorage');

                updateReviewsList();

                document.querySelector('#review-text').value = '';
                ratingButtons.forEach(btn => btn.classList.remove('active'));

                alert('Спасибо за ваш отзыв!');
            });
        }

        // Обработчики для кнопок записи на занятие
        if (DOM.scheduleContainer) {
            DOM.scheduleContainer.querySelectorAll('.enroll-button').forEach((button, index) => {
                button.addEventListener('click', () => {
                    const lesson = scheduleData.weeks[0].days[0].classes[index];
                    const selectedStudio = studios.find(s => s.id === parseInt(DOM.studioSelect?.value || '1'));
                    console.log('Enrollment requested for lesson:', lesson.name);

                    const enrollmentData = {
                        type: 'enrollment',
                        lesson: {
                            time: lesson.time,
                            name: lesson.name,
                            trainer: lesson.trainer,
                            studio: selectedStudio.name,
                            date: scheduleData.weeks[0].days[0].date
                        }
                    };
                    console.log('Enrollment data:', enrollmentData);

                    tg.sendData(JSON.stringify(enrollmentData));
                    console.log('Enrollment data sent to Telegram');

                    lesson.enrolled++;
                    console.log('Enrolled count updated:', lesson.enrolled);

                    showPage('schedule'); // Перерендерим страницу расписания

                    alert('Вы успешно записались на занятие!');
                });
            });
        }
    }

    // Обновление списка отзывов
    function updateReviewsList() {
        if (!DOM.reviewsList) return;

        const reviews = JSON.parse(localStorage.getItem('reviews') || '[]');
        
        if (reviews.length === 0) {
            DOM.reviewsList.innerHTML = '<p class="no-reviews">Пока нет отзывов. Будьте первым!</p>';
            return;
        }

        DOM.reviewsList.innerHTML = reviews.map(review => `
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

    // Show initial page
    showPage('home');
});