document.addEventListener('DOMContentLoaded', () => {
    const tg = window.Telegram.WebApp;
    tg.expand();

    const mainContent = document.querySelector('.scrollable-content');
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
                    photo: "source/trainers/Рустамова Анастасия.jpeg", // TODO: Заменить на реальное фото тренера
                    description: "Анастасия — тренер с 6-летним опытом, кандидат в мастера спорта по синхронному фигурному катанию, многократная чемпионка России и Европы. С раннего детства в спорте — от фигурного катания и художественной гимнастики до сноуборда и вейксёрфа. Проводит персональные и групповые тренировки в мини-группах до 8 человек. Работает с подростками и взрослыми, создавая атмосферу поддержки, движения и заботы о теле. Вдохновляет личным примером: совмещает тренерство с нутрициологией, регулярно учится и планирует освоить массаж. Верит, что спорт помогает не только телу, но и уму — восстанавливает, заряжает и возвращает к себе. Любит путешествия, русскую музыку и всё, что связано с активной жизнью. На её тренировках — результат с душой."
                },
                {
                    name: "Наталья Королёва",
                    specialization: "Фитнес, Эмоциональное восстановление",
                    experience: "12 лет",
                    photo: "source/trainers/Королёва Наталья.jpeg", // TODO: Заменить на реальное фото тренера
                    description: "Наталья пришла в фитнес в 2012 году как участница, а сегодня — сертифицированный тренер и кандидат биологических наук. Она совмещает научный подход с личным опытом, создавая осознанные и эффективные тренировки. Проводит занятия в мини-группах и больших залах, делая акцент не только на физический результат, но и на эмоциональное восстановление. Её путь — от полного подростка до профессионального тренера — вдохновляет тех, кто хочет меняться и чувствовать поддержку. Наталья продолжает развиваться, обучаясь новым методикам. Её занятия наполнены вниманием, заботой и энергией. Любит танцы, сайкл и прогулки — всё, что заряжает и помогает быть в ресурсе. Если тебе нужен тренер с душой и научным подходом — тебе к Наталье."
                },
                {
                    name: "Ирина Мозалева",
                    specialization: "Хатха-йога, Гвоздестояние",
                    experience: "1 год",
                    photo: "source/trainers/Мозалёва Ирина.jpeg", // TODO: Заменить на реальное фото тренера
                    description: "Ирина — инструктор хатха-йоги с академическим образованием (МГУ, филология) и сертификацией YTTC-200 Федерации йоги России. Её занятия — это баланс практики, философии и осознанности, где физическая нагрузка сочетается с внутренним спокойствием. С раннего детства Ирина занималась балетом и фитнесом, но именно йога стала её путём к ментальной устойчивости. Более года она проводит групповые и индивидуальные тренировки, включая гвоздестояние — для глубокого расслабления и концентрации. Вне практики Ирина любит читать, учит французский и увлекается плаванием. Она создаёт пространство, где каждый может почувствовать себя услышанным и вдохновлённым. Если тебе важна гармония тела и разума — занятия с Ириной помогут найти устойчивость и силу внутри себя."
                },
                {
                    name: "Наталья Зуева",
                    specialization: "Пилатес, Стретчинг, Здоровая спина",
                    experience: "Не указан",
                    photo: "source/trainers/Зуева Наталья.jpeg", // TODO: Заменить на реальное фото тренера
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
                <header class="header-bg" style="background-image: url('https://via.placeholder.com/400x300?text=Background');">
                    <h1>Красота и стройность — просто. Как улыбка.</h1>
                    <p>Твоя красота начинается здесь. Женские тренировки рядом с домом: растяжка, аэройога, танцы, фитнес, здоровая спина.</p>
                    <p>🔥 Пробное занятие с профессиональным тренером — всего за 500 ₽. Попробуй любое направление в поддерживающей атмосфере.</p>
                    <button class="cta-button" onclick="showPopup()">Записаться на пробное за 500 ₽</button>
                    <ul>
                        <li>⬤ Подходит даже с нуля</li>
                        <li>⬤ Группы до 15 человек</li>
                        <li>⬤ Опытные тренеры с индивидуальным подходом</li>
                    </ul>
                </header>
                <div class="reviews-carousel carousel">
                    <div class="carousel-card">⭐⭐⭐⭐⭐ Отзыв</div>
                    <div class="carousel-card">⭐⭐⭐⭐⭐ Отзыв</div>
                    <div class="carousel-card">⭐⭐⭐⭐⭐ Отзыв</div>
                </div>
            </div>
        `,
        directions: `
            <div class="directions-content">
                <h2>Выбери своё направление — тренировка, которая подойдёт именно тебе</h2>
                <p>У нас нет «сложных» тренировок — только те, которые помогают раскрыть тело и почувствовать себя лучше. Ты можешь начать с любого формата — даже если никогда раньше не занималась.</p>
                <div class="trainings-carousel carousel">
                    <div class="carousel-card">
                        <span>🧘</span>
                        <h3>Растяжка</h3>
                        <p>мягкое развитие гибкости, расслабление мышц</p>
                    </div>
                    <div class="carousel-card">
                        <span>🌬</span>
                        <h3>Аэройога</h3>
                        <p>тренировки в гамаках, снятие напряжения</p>
                    </div>
                    <div class="carousel-card">
                        <span>💪</span>
                        <h3>Фитнес</h3>
                        <p>силовые и кардио-тренировки, укрепление</p>
                    </div>
                    <div class="carousel-card">
                        <span>💃</span>
                        <h3>High Heels & Strip Dance</h3>
                        <p>танцы на каблуках, развитие пластики</p>
                    </div>
                    <div class="carousel-card">
                        <span>🏋️‍♀️</span>
                        <h3>Здоровая спина</h3>
                        <p>программа для снятия зажатости</p>
                    </div>
                    <div class="carousel-card">
                        <span>🌀</span>
                        <h3>МФР</h3>
                        <p>расслабление через дыхание и роллы</p>
                    </div>
                </div>
                <div class="additional-block">
                    <p>💡 Не знаешь, с чего начать? Запишись на пробное.</p>
                </div>
                <button class="cta-button" onclick="showPopup()">Попробовать пробную тренировку за 500 ₽</button>
            </div>
        `,
        'trainers-schedule': `
            <div class="trainers-schedule-content">
                <h2>Тренеры и расписание</h2>
                
                <div class="trainers-carousel carousel">
                    ${studios[0].trainers.map(trainer => `
                        <div class="carousel-card">
                            <img src="${trainer.photo}" alt="${trainer.name}">
                            <h3>${trainer.name}</h3>
                            <p>${trainer.specialization}</p>
                            <p>Опыт: ${trainer.experience}</p>
                        </div>
                    `).join('')}
                </div>

                <p>Расписание доступно после записи</p>
            </div>
        `,
        account: `
            <div class="personal-account-container">
                <iframe id="widgetAccount" src="about:blank" frameborder="0" allowfullscreen></iframe>
            </div>
        `,
        trainings: `
            <div class="trainings-content">
                <h2>Что выбрать? Тренировки, которые подходят под твой ритм и желания</h2>
                <p class="trainings-intro">Ты не обязана всё знать заранее. Просто выбери, что тебе сейчас ближе — расслабиться, укрепиться или добавить энергии. А мы подскажем, что подойдёт.</p>
                <div class="trainings-grid">
                    <div class="training-card">
                        <span class="training-icon">💪</span>
                        <h3>Силовые и кардио-тренировки</h3>
                        <ul class="training-benefits">
                            <li>подтянуть тело</li>
                            <li>сбросить напряжение</li>
                            <li>энергия и контроль</li>
                        </ul>
                        <p class="training-formats">Форматы: функциональный фитнес, женские круговые, кардио-миксы</p>
                    </div>
                    <div class="training-card">
                        <span class="training-icon">🧘</span>
                        <h3>Растяжка и мягкие тренировки</h3>
                        <ul class="training-benefits">
                            <li>гибкость без насилия</li>
                            <li>снятие напряжения</li>
                            <li>слушать тело</li>
                        </ul>
                        <p class="training-formats">Форматы: стретчинг, шпагаты, мягкое вытяжение</p>
                    </div>
                    <div class="training-card">
                        <span class="training-icon">🌬</span>
                        <h3>Йога и аэройога</h3>
                        <ul class="training-benefits">
                            <li>отпустить тревожность</li>
                            <li>осанка и дыхание</li>
                            <li>разгрузка</li>
                        </ul>
                        <p class="training-formats">Форматы: хатха, аэройога в гамаках, дыхательные практики</p>
                    </div>
                    <div class="training-card">
                        <span class="training-icon">💃</span>
                        <h3>Танцевальные направления</h3>
                        <ul class="training-benefits">
                            <li>раскрыть женственность</li>
                            <li>уверенность</li>
                            <li>пластика</li>
                        </ul>
                        <p class="training-formats">Форматы: high heels, strip plastic, frame up, женская хореография</p>
                    </div>
                </div>
            </div>
        `,
        'video-faq-geo': `
            <div class="video-faq-geo-content">
                <h2>Видео, FAQ, Как нас найти</h2>
                
                <div class="video-section">
                    <iframe src="https://via.placeholder.com/400x300?text=Video" frameborder="0" allowfullscreen></iframe>
                </div>

                <div class="faq-section">
                    <dl>
                        <dt>Какие абонементы у вас есть?</dt>
                        <dd>У нас есть несколько вариантов абонементов:
                            <ul>
                                <li>Утренние (до 14:00)</li>
                                <li>Дневные (с 14:00 до 17:00)</li>
                                <li>Полный день</li>
                                <li>Индивидуальные занятия</li>
                            </ul>
                        </dd>

                        <dt>Как записаться на пробное занятие?</dt>
                        <dd>Вы можете записаться на пробное занятие через наш сайт, по телефону или в студии. Пробное занятие стоит 500 рублей.</dd>

                        <dt>Что нужно взять с собой на первое занятие?</dt>
                        <dd>Спортивную форму, сменную обувь, полотенце и бутылку воды. Все необходимое оборудование предоставляется студией.</dd>

                        <dt>Есть ли у вас раздевалки и душевые?</dt>
                        <dd>Да, в каждой студии есть комфортные раздевалки с душевыми кабинами, шкафчиками и фенами.</dd>

                        <dt>Можно ли заниматься с нуля?</dt>
                        <dd>Конечно! Наши тренеры адаптируют программу под ваш уровень подготовки. Есть специальные группы для начинающих.</dd>

                        <dt>Как часто нужно заниматься?</dt>
                        <dd>Рекомендуем заниматься 2-3 раза в неделю для достижения оптимальных результатов. Но график можно подобрать индивидуально.</dd>

                        <dt>Есть ли у вас парковка?</dt>
                        <dd>Да, у каждой студии есть парковка. Подробности можно уточнить у администратора.</dd>
                    </dl>
                </div>

                <div id="map" style="height: 300px;"></div>
            </div>
        `,
        'social-geo': `
            <div class="social-geo-content">
                <h2>Социальные сети и контакты</h2>
                
                <div class="social-section">
                    <ul class="social-links">
                        <li>
                            <a href="https://t.me/TotalBodyVernadskogo" class="social-link telegram">
                                <span class="social-icon">📱</span>
                                Telegram
                            </a>
                        </li>
                        <li>
                            <a href="https://vk.com/totalbody" class="social-link vk">
                                <span class="social-icon">💬</span>
                                VK
                            </a>
                        </li>
                        <li>
                            <a href="https://instagram.com/totalbody" class="social-link instagram">
                                <span class="social-icon">📸</span>
                                Instagram
                            </a>
                        </li>
                    </ul>
                </div>

                <div class="contact-section">
                    <h3>Наши студии</h3>
                    <ul class="studios-list">
                        ${studios.map(studio => `
                            <li>
                                <a href="${studio.addressLink}" class="studio-link">
                                    <strong>${studio.name}</strong>
                                    <span>${studio.address}</span>
                                    <span class="schedule">${studio.schedule}</span>
                                </a>
                            </li>
                        `).join('')}
                    </ul>
                </div>
            </div>
        `,
        'reviews-photos': `
            <div class="reviews-photos-content">
                <h2>Отзывы и фото</h2>
                
                <div class="reviews-section">
                    <div class="rating-buttons">
                        <button class="rating-btn" data-rating="1">1</button>
                        <button class="rating-btn" data-rating="2">2</button>
                        <button class="rating-btn" data-rating="3">3</button>
                        <button class="rating-btn" data-rating="4">4</button>
                        <button class="rating-btn" data-rating="5">5</button>
                    </div>
                    <textarea id="review-text" placeholder="Оставьте отзыв"></textarea>
                    <button class="submit-review">Отправить отзыв</button>
                </div>

                <div class="photos-carousel carousel">
                    <div class="carousel-card">
                        <img src="https://via.placeholder.com/400x300?text=Фото+студии+1" alt="Фото студии">
                    </div>
                    <div class="carousel-card">
                        <img src="https://via.placeholder.com/400x300?text=Фото+студии+2" alt="Фото студии">
                    </div>
                    <div class="carousel-card">
                        <img src="https://via.placeholder.com/400x300?text=Фото+студии+3" alt="Фото студии">
                    </div>
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
        bookingForm: null
    };

    // Удаляем showPage и обработчики табов
    // Добавляем функцию для длинной страницы
    function renderScrollableContent() {
        if (!mainContent) return;
        mainContent.innerHTML = [
            pages.home,
            pages.directions,
            pages['trainers-schedule'],
            pages['video-faq-geo'],
            pages['reviews-photos'],
            pages['social-geo']
        ].map(section => `<div class="screen-section">${section}</div>`).join('');
        initializeApp();
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
            subscribeToBot();
        } else {
            console.warn('User data not available');
        }

        // Инициализация карты
        const mapElement = document.getElementById('map');
        if (mapElement) {
            const map = L.map('map').setView([55.686320, 37.524659], 12);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors'
            }).addTo(map);

            // Добавляем маркеры для каждой студии
            studios.forEach(studio => {
                const [lat, lng] = studio.addressLink.replace('geo:', '').split(',').map(Number);
                L.marker([lat, lng])
                    .bindPopup(`
                        <strong>${studio.name}</strong><br>
                        ${studio.address}<br>
                        ${studio.phone}
                    `)
                    .addTo(map);
            });
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

        // Обновляем фото в секции отзывов
        const reviewsPhotos = document.querySelector('.reviews-photos .studio-photos');
        if (reviewsPhotos) {
            reviewsPhotos.innerHTML = studio.photos.map(photo => `
                <img src="${photo}" alt="Фото студии" class="studio-photo">
            `).join('');
        }

        if (DOM.trainers) {
            DOM.trainers.innerHTML = `
                <h3>Тренеры</h3>
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
        if (currentPageId === 'trainers-schedule' && DOM.scheduleContainer) {
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

    // Функция для показа попапа с формой
    function showPopup() {
        console.log('Popup opened');
        
        // Создаем элементы попапа
        const popup = document.createElement('div');
        popup.className = 'popup';
        
        const popupContent = document.createElement('div');
        popupContent.className = 'popup-content';
        
        const closeButton = document.createElement('button');
        closeButton.className = 'popup-close';
        closeButton.innerHTML = '×';
        closeButton.onclick = () => {
            document.body.removeChild(popup);
        };
        
        const form = document.createElement('form');
        form.innerHTML = `
            <h2>Запись на пробное занятие</h2>
            <input type="text" name="name" placeholder="Ваше имя" required>
            <input type="tel" name="phone" placeholder="Телефон" required>
            <select name="direction" required>
                <option value="">Выберите направление</option>
                <option value="Растяжка">Растяжка</option>
                <option value="Аэройога">Аэройога</option>
                <option value="Фитнес">Фитнес</option>
                <option value="Танцы">Танцы</option>
                <option value="Здоровая спина">Здоровая спина</option>
            </select>
            <button type="submit">Отправить</button>
        `;
        
        form.onsubmit = (e) => {
            e.preventDefault();
            console.log('Form submitted from popup');
            
            const formData = new FormData(form);
            const data = {
                type: 'popup_booking',
                name: formData.get('name'),
                phone: formData.get('phone'),
                direction: formData.get('direction')
            };
            
            tg.sendData(JSON.stringify(data));
            document.body.removeChild(popup);
            alert('Спасибо за запись! Мы свяжемся с вами в ближайшее время.');
        };
        
        popupContent.appendChild(closeButton);
        popupContent.appendChild(form);
        popup.appendChild(popupContent);
        document.body.appendChild(popup);
    }

    // Инициализация обработчиков событий
    function initializeEventHandlers() {
        console.log('Initializing event handlers');

        // Обработчик для CTA кнопки
        const ctaButton = document.querySelector('.cta-button');
        if (ctaButton) {
            ctaButton.addEventListener('click', () => {
                console.log('CTA button clicked');
                showPopup();
            });
        }

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
        if (currentPageId === 'trainers-schedule') {
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
    renderScrollableContent();
});
