document.addEventListener('DOMContentLoaded', () => {
    const tg = window.Telegram.WebApp;
    tg.expand();

    const mainContent = document.getElementById('main-content');
    const tabs = document.querySelectorAll('.tab-item');
    let currentPageId = 'home'; // Добавляем отслеживание текущей страницы

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

    // Обновлено: добавлены данные для нескольких студий
    const studios = [
        {
            id: 1,
            name: "Студия на Вернадского",
            address: "Москва, Вернадского 15",
            addressLink: "geo:55.686320,37.524659",
            phone: "+7 915 064 0309",
            schedule: "Пн-Вс: 07:00 - 23:00",
            description: "Современная студия с новейшим оборудованием. Просторные залы для групповых и индивидуальных занятий.",
            photos: [
                "https://via.placeholder.com/400x300?text=Студия+1",
                "https://via.placeholder.com/400x300?text=Студия+2"
            ],
            amenities: ["Раздевалки с душевыми", "Зона отдыха", "Бесплатный Wi-Fi", "Парковка"],
            trainers: [
                {
                    name: "Анастасия Рустамова",
                    specialization: "Растяжка, Йога",
                    experience: "6 лет",
                    photo: "https://randomuser.me/api/portraits/women/32.jpg", // TODO: Заменить на реальное фото тренера
                    description: "Анастасия — тренер с 6-летним опытом, кандидат в мастера спорта по синхронному фигурному катанию, многократная чемпионка России и Европы. С раннего детства в спорте — от фигурного катания и художественной гимнастики до сноуборда и вейксёрфа. Проводит персональные и групповые тренировки в мини-группах до 8 человек. Работает с подростками и взрослыми, создавая атмосферу поддержки, движения и заботы о теле. Вдохновляет личным примером: совмещает тренерство с нутрициологией, регулярно учится и планирует освоить массаж. Верит, что спорт помогает не только телу, но и уму — восстанавливает, заряжает и возвращает к себе. Любит путешествия, русскую музыку и всё, что связано с активной жизнью. На её тренировках — результат с душой."
                },
                {
                    name: "Наталья Королёва",
                    specialization: "Фитнес, Эмоциональное восстановление",
                    experience: "12 лет",
                    photo: "https://randomuser.me/api/portraits/women/44.jpg", // TODO: Заменить на реальное фото тренера
                    description: "Наталья пришла в фитнес в 2012 году как участница, а сегодня — сертифицированный тренер и кандидат биологических наук. Она совмещает научный подход с личным опытом, создавая осознанные и эффективные тренировки. Проводит занятия в мини-группах и больших залах, делая акцент не только на физический результат, но и на эмоциональное восстановление. Её путь — от полного подростка до профессионального тренера — вдохновляет тех, кто хочет меняться и чувствовать поддержку. Наталья продолжает развиваться, обучаясь новым методикам. Её занятия наполнены вниманием, заботой и энергией. Любит танцы, сайкл и прогулки — всё, что заряжает и помогает быть в ресурсе. Если тебе нужен тренер с душой и научным подходом — тебе к Наталье."
                },
                {
                    name: "Ирина Мозалева",
                    specialization: "Хатха-йога, Гвоздестояние",
                    experience: "1 год",
                    photo: "https://randomuser.me/api/portraits/women/68.jpg", // TODO: Заменить на реальное фото тренера
                    description: "Ирина — инструктор хатха-йоги с академическим образованием (МГУ, филология) и сертификацией YTTC-200 Федерации йоги России. Её занятия — это баланс практики, философии и осознанности, где физическая нагрузка сочетается с внутренним спокойствием. С раннего детства Ирина занималась балетом и фитнесом, но именно йога стала её путём к ментальной устойчивости. Более года она проводит групповые и индивидуальные тренировки, включая гвоздестояние — для глубокого расслабления и концентрации. Вне практики Ирина любит читать, учит французский и увлекается плаванием. Она создаёт пространство, где каждый может почувствовать себя услышанным и вдохновлённым. Если тебе важна гармония тела и разума — занятия с Ириной помогут найти устойчивость и силу внутри себя."
                },
                {
                    name: "Наталья Зуева",
                    specialization: "Пилатес, Стретчинг, Здоровая спина",
                    experience: "Не указан",
                    photo: "https://randomuser.me/api/portraits/women/91.jpg", // TODO: Заменить на реальное фото тренера
                    description: "Наталья — сертифицированный тренер с высшим образованием (СПБГУСЭ, «Сервис») и дипломами в сфере фитнеса, включая пилатес и тренажёрный зал. Её подход — это сочетание знаний, внимания к деталям и заботы о каждом клиенте. Она ведёт групповые тренировки по пилатесу, стретчингу и «Здоровой спине», сочетая эффективность и мягкость. Спорт сопровождает её с 7 лет: за плечами — победы в волейболе и участие в соревнованиях по лёгкой атлетике, баскетболу и метанию гранаты. С 2024 года, переехав в Москву, Наталья активно развивает себя как тренер, создавая занятия, которые укрепляют тело и возвращают внутреннее равновесие. Вдохновляется музыкой, танцами и дизайном — и переносит это творчество в свои тренировки. Если вы хотите улучшить осанку, стать гибче и сильнее — тренировки с Натальей помогут вам почувствовать тело и наполниться энергией."
                }
            ],
            widgets: {
                schedule: "https://infototalbodyonline.impulsecrm.ru/widget/360",
                account: "https://infototalbodyonline.impulsecrm.ru/widget/361"
            }
        },
        {
            id: 2,
            name: "Студия на Ленинском",
            address: "Москва, Ленинский проспект 30",
            addressLink: "geo:55.701320,37.564659",
            phone: "+7 915 064 0308",
            schedule: "Пн-Вс: 08:00 - 22:00",
            description: "Уютная студия в историческом центре. Современное оборудование и индивидуальный подход к каждому клиенту.",
            photos: [
                "https://via.placeholder.com/400x300?text=Студия+Ленинский+1",
                "https://via.placeholder.com/400x300?text=Студия+Ленинский+2"
            ],
            amenities: ["Раздевалки", "Зона отдыха", "Wi-Fi", "Парковка", "Кофейня"],
            trainers: [
                {
                    name: "Елена Соколова",
                    specialization: "Йога, Пилатес",
                    experience: "8 лет",
                    photo: "https://randomuser.me/api/portraits/women/45.jpg",
                    description: "Сертифицированный инструктор по йоге и пилатесу с 8-летним опытом."
                },
                {
                    name: "Алексей Петров",
                    specialization: "Функциональный тренинг",
                    experience: "5 лет",
                    photo: "https://randomuser.me/api/portraits/men/32.jpg",
                    description: "Мастер спорта по легкой атлетике, специалист по функциональному тренингу."
                }
            ],
            widgets: {
                schedule: "https://example.com/widget/schedule-2",
                account: "https://example.com/widget/account-2"
            }
        },
        {
            id: 3,
            name: "Студия на Тверской",
            address: "Москва, Тверская 20",
            addressLink: "geo:55.761320,37.604659",
            phone: "+7 915 064 0307",
            schedule: "Пн-Вс: 09:00 - 21:00",
            description: "Премиальная студия в самом центре Москвы. Эксклюзивные программы и персональные тренировки.",
            photos: [
                "https://via.placeholder.com/400x300?text=Студия+Тверская+1",
                "https://via.placeholder.com/400x300?text=Студия+Тверская+2"
            ],
            amenities: ["VIP раздевалки", "SPA-зона", "Премиум Wi-Fi", "Подземная парковка", "Ресторан"],
            trainers: [
                {
                    name: "Мария Иванова",
                    specialization: "Стретчинг, Балет",
                    experience: "10 лет",
                    photo: "https://randomuser.me/api/portraits/women/22.jpg",
                    description: "Бывшая балерина Большого театра, эксперт по стретчингу и балетной подготовке."
                },
                {
                    name: "Дмитрий Смирнов",
                    specialization: "Силовые тренировки",
                    experience: "7 лет",
                    photo: "https://randomuser.me/api/portraits/men/55.jpg",
                    description: "Мастер спорта по тяжелой атлетике, специалист по силовым тренировкам."
                }
            ],
            widgets: {
                schedule: "https://example.com/widget/schedule-3",
                account: "https://example.com/widget/account-3"
            }
        }
    ];

    // Content for each page
    const pages = {
        home: `
            <div class="home-content">
                <header>
                    <div class="logo">
                        <img src="logo.png" alt="Total Body" class="logo-image">
                        <h1>Total Body</h1>
                        <p class="tagline">Студия современного фитнеса</p>
                    </div>
                    <div class="studio-selector">
                        <select id="studio-select" class="studio-select">
                            ${studios.map(studio => `
                                <option value="${studio.id}">${studio.name}</option>
                            `).join('')}
                        </select>
                    </div>
                </header>
                <section class="section" id="about-studio">
                    <h2>О студии</h2>
                    <div class="about-content">
                        <p>${studios[0].description}</p>
                        <div class="studio-photos">
                            ${studios[0].photos.map(photo => `
                                <img src="${photo}" alt="Фото студии" class="studio-photo">
                            `).join('')}
                        </div>
                        <h3>Информация</h3>
                        <ul>
                            <li>Адрес: <a href="${studios[0].addressLink}" class="address-link">${studios[0].address}</a></li>
                            <li>Телефон: <a href="tel:${studios[0].phone}">${studios[0].phone}</a></li>
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
                        <div class="button-group">
                            <button type="submit" class="button">Записаться</button>
                            <button type="button" class="button payment-button">Оплатить пробное занятие</button>
                        </div>
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
                                <p class="trainer-description">${trainer.description}</p>
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
                    </div>
                </section>
            </div>
        `,
        schedule: `
            <div class="schedule-container">
                <iframe id="widgetSchedule" src="about:blank" frameborder="0" allowfullscreen></iframe>
            </div>
        `,
        account: `
            <div class="personal-account-container">
                <iframe id="widgetAccount" src="about:blank" frameborder="0" allowfullscreen></iframe>
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
        bookingForm: null
    };

    // Show page content
    function showPage(pageId) {
        console.log('Showing page:', pageId);
        currentPageId = pageId;
        mainContent.innerHTML = pages[pageId];
        tabs.forEach(tab => {
            tab.classList.toggle('active', tab.dataset.page === pageId);
        });

        // Исправлено: асинхронная инициализация селектора для корректной работы DOM
        setTimeout(() => {
            // Обновляем DOM элементы после рендеринга страницы
            DOM.scheduleContainer = document.querySelector('.schedule-container') || null;
            DOM.personalAccountContainer = document.querySelector('.personal-account-container') || null;
            DOM.studioSelect = document.querySelector('#studio-select') || null;
            DOM.aboutStudio = document.querySelector('#about-studio') || null;
            DOM.trainers = document.querySelector('#trainers') || null;
            DOM.bookingForm = document.querySelector('#booking-form') || null;

            // Инициализация после рендеринга
            initializeApp();
            
            // Загружаем виджеты при переключении страниц
            if (pageId === 'schedule') {
                const widgetSchedule = document.getElementById('widgetSchedule');
                if (widgetSchedule) {
                    console.log('Loading schedule widget');
                    widgetSchedule.src = studios[0].widgets.schedule;
                }
            } else if (pageId === 'account') {
                const widgetAccount = document.getElementById('widgetAccount');
                if (widgetAccount) {
                    console.log('Loading account widget');
                    widgetAccount.src = studios[0].widgets.account;
                }
            }
        }, 0);
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
            // Обновлено: реальная подписка на Telegram-бота с проверкой однократной подписки
            subscribeToBot();
        } else {
            console.warn('User data not available');
        }

        // Инициализация селектора студий
        initializeStudioSelector();

        // Инициализация обработчиков событий
        initializeEventHandlers();

        console.log('App initialization completed');
    }

    // Инициализация селектора студий
    function initializeStudioSelector() {
        console.log('Initializing studio selector');
        if (!DOM.studioSelect) {
            console.warn('Studio select element still not found after delay');
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
        const firstStudio = studios[0];
        if (firstStudio) {
            console.log('Initializing with first studio:', firstStudio.name);
            updateStudioInfo(firstStudio);
        }
    }

    // Обновлено: обработка виджетов для разных студий
    function updateStudioInfo(studio) {
        console.log('Updating studio info:', studio.name);
        
        if (DOM.aboutStudio) {
            DOM.aboutStudio.innerHTML = `
                <h2>О студии</h2>
                <div class="about-content">
                    <p>${studio.description}</p>
                    <div class="studio-photos">
                        ${studio.photos.map(photo => `
                            <img src="${photo}" alt="Фото студии" class="studio-photo">
                        `).join('')}
                    </div>
                    <h3>Информация</h3>
                    <ul>
                        <li>Адрес: <a href="${studio.addressLink}" class="address-link">${studio.address}</a></li>
                        <li>Телефон: <a href="tel:${studio.phone}">${studio.phone}</a></li>
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
                            <p class="trainer-description">${trainer.description}</p>
                        </div>
                    `).join('')}
                </div>
            `;
        }

        // Обновляем виджеты для выбранной студии
        if (currentPageId === 'schedule' && DOM.scheduleContainer) {
            const widgetSchedule = document.getElementById('widgetSchedule');
            if (widgetSchedule) {
                console.log('Loading schedule widget for studio:', studio.name);
                widgetSchedule.src = studio.widgets.schedule;
            }
        }
        
        if (currentPageId === 'account' && DOM.personalAccountContainer) {
            const widgetAccount = document.getElementById('widgetAccount');
            if (widgetAccount) {
                console.log('Loading account widget for studio:', studio.name);
                widgetAccount.src = studio.widgets.account;
            }
        }
    }

    // Инициализация обработчиков событий
    function initializeEventHandlers() {
        console.log('Initializing event handlers');

        // Обработчик отправки формы записи
        if (DOM.bookingForm) {
            DOM.bookingForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                console.log('Booking form submitted');

                const formData = new FormData(DOM.bookingForm);
                const phone = formData.get('phone');

                // Валидация номера телефона
                const phoneRegex = /^(\+7|8)\d{10}$/;
                if (!phoneRegex.test(phone)) {
                    console.log('Phone validation failed:', phone);
                    alert('Введите корректный номер телефона (например, +79991234567)');
                    return;
                }
                console.log('Phone validation passed:', phone);

                const bookingData = {
                    type: 'booking',
                    name: formData.get('name'),
                    phone: formData.get('phone'),
                    date: formData.get('date'),
                    studio: DOM.studioSelect ? studios.find(s => s.id === parseInt(DOM.studioSelect.value))?.name : 'Не выбрано'
                };
                console.log('Booking data:', bookingData);

                // Отправка данных администратору через Telegram API
                const botToken = "7498555936:AAG270jJhDjkjNnXRPnggO5ITiW0Y4waJk4";
                const adminId = "5947469995";
                const message = `Новая запись на пробное занятие:\nИмя: ${bookingData.name}\nТелефон: ${bookingData.phone}\nДата: ${bookingData.date}\nСтудия: ${bookingData.studio}`;

                try {
                    console.log('Sending booking data to admin');
                    const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            chat_id: adminId,
                            text: message
                        })
                    });

                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }

                    console.log('Booking data sent to admin');
                } catch (error) {
                    console.error('Failed to send booking data to admin:', error);
                }

                // Продолжаем стандартную обработку формы
                tg.sendData(JSON.stringify(bookingData));
                console.log('Booking data sent to Telegram');

                alert('Спасибо за запись! Мы свяжемся с вами в ближайшее время.');
                DOM.bookingForm.reset();
            });

            // Обновлено: финализация логики оплаты через личный кабинет
            const paymentButton = DOM.bookingForm.querySelector('.payment-button');
            if (paymentButton) {
                paymentButton.addEventListener('click', () => {
                    console.log('Payment button clicked');
                    alert('Вы будете перенаправлены в личный кабинет для оплаты.');
                    console.log('Redirecting to account page for payment');
                    showPage('account');
                });
            }
        }

        // Обработчики для виджетов
        if (currentPageId === 'schedule') {
            const widgetSchedule = document.getElementById('widgetSchedule');
            if (widgetSchedule) {
                console.log('Loading schedule widget');
                widgetSchedule.src = studios[0].widgets.schedule;
            }
        }

        if (currentPageId === 'account') {
            const widgetAccount = document.getElementById('widgetAccount');
            if (widgetAccount) {
                console.log('Loading account widget');
                widgetAccount.src = studios[0].widgets.account;
            }
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

                const rating = parseInt(selectedRating.dataset.rating);
                if (rating === 5) {
                    console.log('Redirecting to Yandex Maps for 5-star review');
                    window.location.href = 'https://yandex.ru/maps/org/fitnes_ugolok/156758960674/reviews/';
                } else {
                    console.log('Redirecting to Telegram chat for review');
                    const message = `Отзыв от ${userName}: ${reviewText} (Оценка: ${rating})`;
                    window.location.href = `https://t.me/TotalBodyVernadskogo?text=${encodeURIComponent(message)}`;
                }

                // Очищаем форму
                document.querySelector('#review-text').value = '';
                ratingButtons.forEach(btn => btn.classList.remove('active'));

                alert('Спасибо за ваш отзыв!');
            });
        }
    }

    // Обновлено: реальная подписка на Telegram-бота с проверкой однократной подписки
    async function subscribeToBot() {
        console.log('Checking subscription status...');
        
        // Проверяем, была ли уже выполнена подписка
        const isSubscribed = localStorage.getItem('isSubscribed');
        if (isSubscribed === 'true') {
            console.log('Subscription skipped: already subscribed');
            return;
        }

        const userData = tg.initDataUnsafe?.user;
        if (!userData) {
            console.warn('User data not available for subscription');
            return;
        }

        const botToken = "7498555936:AAG270jJhDjkjNnXRPnggO5ITiW0Y4waJk4";
        const data = {
            type: 'subscription',
            userId: userData.id,
            firstName: userData.first_name,
            lastName: userData.last_name || '',
            username: userData.username || ''
        };
        console.log('Subscription data:', data);

        try {
            // Отправляем данные боту через Telegram API
            const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    chat_id: userData.id,
                    text: `Добро пожаловать в Total Body!\nИмя: ${data.firstName}\nФамилия: ${data.lastName}\nUsername: ${data.username}`
                })
            });

            if (!response.ok) {
                throw new Error('Failed to send subscription data');
            }

            console.log('Subscription data sent to Telegram bot');
            tg.sendData(JSON.stringify(data));

            // Сохраняем подписчика в localStorage
            const subscribers = JSON.parse(localStorage.getItem('subscribers') || '[]');
            subscribers.push(data);
            localStorage.setItem('subscribers', JSON.stringify(subscribers));
            
            // Устанавливаем флаг подписки
            localStorage.setItem('isSubscribed', 'true');
            console.log('Subscription completed and saved');

        } catch (error) {
            console.error('Error subscribing to bot:', error);
            alert('Произошла ошибка при подписке на бота. Пожалуйста, попробуйте позже.');
        }
    }

    // Show initial page
    showPage('home');
});
