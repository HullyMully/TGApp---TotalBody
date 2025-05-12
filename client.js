document.addEventListener('DOMContentLoaded', () => {
    const tg = window.Telegram.WebApp;
    tg.expand();

    const mainContent = document.querySelector('.scrollable-content');
    const tabs = document.querySelectorAll('.tab-item');
    let currentPageId = 'home'; // Добавляем отслеживание текущей страницы
    let selectedStudioIndex = 0;

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
                    photo: "source/trainers/Рустамова Анастасия.jpeg",
                    description: "Анастасия — тренер с 6-летним опытом, кандидат в мастера спорта по синхронному фигурному катанию, многократная чемпионка России и Европы. С раннего детства в спорте — от фигурного катания и художественной гимнастики до сноуборда и вейксёрфа. Проводит персональные и групповые тренировки в мини-группах до 8 человек. Работает с подростками и взрослыми, создавая атмосферу поддержки, движения и заботы о теле. Вдохновляет личным примером: совмещает тренерство с нутрициологией, регулярно учится и планирует освоить массаж. Верит, что спорт помогает не только телу, но и уму — восстанавливает, заряжает и возвращает к себе. Любит путешествия, русскую музыку и всё, что связано с активной жизнью. На её тренировках — результат с душой."
                },
                {
                    name: "Наталья Королёва",
                    specialization: "Фитнес, Эмоциональное восстановление",
                    experience: "12 лет",
                    photo: "source/trainers/Королёва Наталья.jpeg",
                    description: "Наталья пришла в фитнес в 2012 году как участница, а сегодня — сертифицированный тренер и кандидат биологических наук. Она совмещает научный подход с личным опытом, создавая осознанные и эффективные тренировки. Проводит занятия в мини-группах и больших залах, делая акцент не только на физический результат, но и на эмоциональное восстановление. Её путь — от полного подростка до профессионального тренера — вдохновляет тех, кто хочет меняться и чувствовать поддержку. Наталья продолжает развиваться, обучаясь новым методикам. Её занятия наполнены вниманием, заботой и энергией. Любит танцы, сайкл и прогулки — всё, что заряжает и помогает быть в ресурсе. Если тебе нужен тренер с душой и научным подходом — тебе к Наталье."
                },
                {
                    name: "Ирина Мозалева",
                    specialization: "Хатха-йога, Гвоздестояние",
                    experience: "1 год",
                    photo: "source/trainers/Мозалёва Ирина.jpeg",
                    description: "Ирина — инструктор хатха-йоги с академическим образованием (МГУ, филология) и сертификацией YTTC-200 Федерации йоги России. Её занятия — это баланс практики, философии и осознанности, где физическая нагрузка сочетается с внутренним спокойствием. С раннего детства Ирина занималась балетом и фитнесом, но именно йога стала её путём к ментальной устойчивости. Более года она проводит групповые и индивидуальные тренировки, включая гвоздестояние — для глубокого расслабления и концентрации. Вне практики Ирина любит читать, учит французский и увлекается плаванием. Она создаёт пространство, где каждый может почувствовать себя услышанным и вдохновлённым. Если тебе важна гармония тела и разума — занятия с Ириной помогут найти устойчивость и силу внутри себя."
                },
                {
                    name: "Наталья Зуева",
                    specialization: "Пилатес, Стретчинг, Здоровая спина",
                    experience: "Не указан",
                    photo: "source/trainers/Зуева Наталья.jpeg",
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
            <div class="apple-hero">
                <div class="apple-hero-bg"></div>
                <div class="apple-hero-content">
                    <h1>Красота и стройность — просто. Как улыбка.</h1>
                    <p class="apple-hero-subtitle">
                        Твоя красота начинается здесь.  Женские тренировки рядом с домом.<br>
                        Группы до 15 человек, индивидуальный подход, уютная атмосфера.
                    </p>
                    <ul class="apple-hero-features">
                        <li>🧘‍♀️ <b>Растяжка и аэройога</b> — мягко, безопасно, эффективно</li>
                        <li>💪 <b>Фитнес и танцы</b> — энергия, драйв, результат</li>
                        <li>👩‍🏫 <b>Профессиональные тренеры</b> — поддержка и мотивация</li>
                    </ul>
                    <button class="apple-cta" onclick="showPopup()">Записаться на пробное занятие за 500 ₽</button>
                    <div class="apple-hero-note">
                        <span>🎧</span> Онлайн-тренировки и аудиосопровождение
                    </div>
                </div>
            </div>
        `,
        directions: `
            <div class="apple-directions">
                <h2>Выбери своё направление</h2>
                <p class="apple-directions-subtitle">
                    Ты не обязана всё знать заранее. Просто выбери, что тебе сейчас ближе — расслабиться,<br>
                    укрепиться или добавить энергии. А мы подскажем, что подойдёт.
                </p>
                <div class="apple-directions-carousel carousel">
                    <div class="apple-direction-card">
                        <span class="apple-direction-emoji">🧘‍♀️</span>
                        <h3>Растяжка</h3>
                        <p>Гибкость, лёгкость, здоровье спины</p>
                    </div>
                    <div class="apple-direction-card">
                        <span class="apple-direction-emoji">🤸‍♂️</span>
                        <h3>Аэройога</h3>
                        <p>Антигравитация, релакс, новые ощущения</p>
                    </div>
                    <div class="apple-direction-card">
                        <span class="apple-direction-emoji">💃</span>
                        <h3>Танцы</h3>
                        <p>Драйв, пластика, настроение</p>
                    </div>
                    <div class="apple-direction-card">
                        <span class="apple-direction-emoji">🏋️‍♂️</span>
                        <h3>Фитнес</h3>
                        <p>Сила, выносливость, результат</p>
                    </div>
                    <div class="apple-direction-card">
                        <span class="apple-direction-emoji">🧑‍⚕️</span>
                        <h3>Здоровая спина</h3>
                        <p>Профилактика и восстановление</p>
                    </div>
                    <div class="apple-direction-card">
                        <span class="apple-direction-emoji">👶</span>
                        <h3>Детские группы</h3>
                        <p>Развитие, игра, социализация</p>
                    </div>
                </div>
                <button class="apple-cta" onclick="showPopup()">Попробовать за 500 ₽</button>
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
        'social-geo': `
            <div class="social-geo-content">
                <h2>Социальные сети и контакты</h2>
                
                <div class="social-section">
                    <ul class="social-links">
                        <li>
                            <a href="https://t.me/TotalBodyVernadskogo" class="social-link telegram" target="_blank">
                                <span class="social-icon">📱</span> Telegram
                            </a>
                        </li>
                        <li>
                            <a href="https://vk.com/totalbody" class="social-link vk" target="_blank">
                                <span class="social-icon">💬</span> VK
                            </a>
                        </li>
                        <li>
                            <a href="https://instagram.com/totalbody" class="social-link instagram" target="_blank">
                                <span class="social-icon">📸</span> Instagram
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

    function renderStudioSelector() {
        return `
            <div class="studio-selector-apple compact">
                <img src="logo.png" alt="Total Body Logo" class="studio-logo-square">
                <label for="studio-select" class="studio-label">Выберите студию:</label>
                <select id="studio-select" class="studio-select-apple">
                    ${studios.map((studio, idx) => `<option value="${idx}" ${idx === selectedStudioIndex ? 'selected' : ''}>${studio.name}</option>`).join('')}
                </select>
            </div>
        `;
    }

    function renderHomeSection(studio) {
        return pages.home;
    }

    function renderDirectionsSection(studio) {
        // Горизонтальный скролл
        return `
            <div class="apple-directions">
                <h2>Выбери своё направление</h2>
                <p class="apple-directions-subtitle">
             Ты не обязана всё знать заранее. Просто выбери, что тебе сейчас ближе — расслабиться,
                    укрепиться или добавить энергии. А мы подскажем, что подойдёт.
                </p>
                <div class="apple-directions-carousel carousel">
                    <div class="apple-direction-card">
                        <span class="apple-direction-emoji">🧘‍♀️</span>
                        <h3>Растяжка</h3>
                        <p>Гибкость, лёгкость, здоровье спины</p>
                    </div>
                    <div class="apple-direction-card">
                        <span class="apple-direction-emoji">🤸‍♂️</span>
                        <h3>Аэройога</h3>
                        <p>Антигравитация, релакс, новые ощущения</p>
                    </div>
                    <div class="apple-direction-card">
                        <span class="apple-direction-emoji">💃</span>
                        <h3>Танцы</h3>
                        <p>Драйв, пластика, настроение</p>
                    </div>
                    <div class="apple-direction-card">
                        <span class="apple-direction-emoji">🏋️‍♂️</span>
                        <h3>Фитнес</h3>
                        <p>Сила, выносливость, результат</p>
                    </div>
                    <div class="apple-direction-card">
                        <span class="apple-direction-emoji">🧑‍⚕️</span>
                        <h3>Здоровая спина</h3>
                        <p>Профилактика и восстановление</p>
                    </div>
                    <div class="apple-direction-card">
                        <span class="apple-direction-emoji">👶</span>
                        <h3>Детские группы</h3>
                        <p>Развитие, игра, социализация</p>
                    </div>
                </div>
                <button class="apple-cta" onclick="showPopup()">Попробовать за 500 ₽</button>
            </div>
        `;
    }

    function renderTrainersSection(studio) {
        // Для студии на Вернадского — реальные фото и длинные описания
        if (studio.id === 1) {
            const trainers = [
                {
                    name: "Анастасия Рустамова",
                    specialization: "Растяжка, Йога",
                    photo: "source/trainers/Рустамова Анастасия.jpeg",
                    full: `Анастасия — тренер с 6-летним опытом, кандидат в мастера спорта по синхронному фигурному катанию, многократная чемпионка России и Европы. С раннего детства в спорте — от фигурного катания и художественной гимнастики до сноуборда и вейксёрфа.<br><br>Проводит персональные и групповые тренировки в мини-группах до 8 человек. Работает с подростками и взрослыми, создавая атмосферу поддержки, движения и заботы о теле.<br><br>Вдохновляет личным примером: совмещает тренерство с нутрициологией, регулярно учится и планирует освоить массаж. Верит, что спорт помогает не только телу, но и уму — восстанавливает, заряжает и возвращает к себе.<br><br>Любит путешествия, русскую музыку и всё, что связано с активной жизнью. На её тренировках — результат с душой.`
                },
                {
                    name: "Наталья Королёва",
                    specialization: "Фитнес, Эмоциональное восстановление",
                    photo: "source/trainers/Королёва Наталья.jpeg",
                    full: `Наталья пришла в фитнес в 2012 году как участница, а сегодня — сертифицированный тренер и кандидат биологических наук. Она совмещает научный подход с личным опытом, создавая осознанные и эффективные тренировки.<br><br>Проводит занятия в мини-группах и больших залах, делая акцент не только на физический результат, но и на эмоциональное восстановление. Её путь — от полного подростка до профессионального тренера — вдохновляет тех, кто хочет меняться и чувствовать поддержку.<br><br>Наталья продолжает развиваться, обучаясь новым методикам. Её занятия наполнены вниманием, заботой и энергией. Любит танцы, сайкл и прогулки — всё, что заряжает и помогает быть в ресурсе.<br><br>Если тебе нужен тренер с душой и научным подходом — тебе к Наталье.`
                },
                {
                    name: "Ирина Мозалева",
                    specialization: "Хатха-йога, Гвоздестояние",
                    photo: "source/trainers/Мозалёва Ирина.jpeg",
                    full: `Ирина — инструктор хатха-йоги с академическим образованием (МГУ, филология) и сертификацией YTTC-200 Федерации йоги России. Её занятия — это баланс практики, философии и осознанности, где физическая нагрузка сочетается с внутренним спокойствием.<br><br>С раннего детства Ирина занималась балетом и фитнесом, но именно йога стала её путём к ментальной устойчивости. Более года она проводит групповые и индивидуальные тренировки, включая гвоздестояние — для глубокого расслабления и концентрации.<br><br>Вне практики Ирина любит читать, учит французский и увлекается плаванием. Она создаёт пространство, где каждый может почувствовать себя услышанным и вдохновлённым.<br><br>Если тебе важна гармония тела и разума — занятия с Ириной помогут найти устойчивость и силу внутри себя.`
                },
                {
                    name: "Наталья Зуева",
                    specialization: "Пилатес, Стретчинг, Здоровая спина",
                    photo: "source/trainers/Зуева Наталья.jpeg",
                    full: `Наталья — сертифицированный тренер с высшим образованием (СПБГУСЭ, «Сервис») и дипломами в сфере фитнеса, включая пилатес и тренажёрный зал.<br><br>Она ведёт групповые тренировки по пилатесу, стретчингу и «Здоровой спине», сочетая эффективность и мягкость. Спорт сопровождает её с 7 лет: за плечами — победы в волейболе и участие в соревнованиях по лёгкой атлетике, баскетболу и метанию гранаты.<br><br>С 2024 года, переехав в Москву, Наталья активно развивает себя как тренер, создавая занятия, которые укрепляют тело и возвращают внутреннее равновесие.<br><br>Вдохновляется музыкой, танцами и дизайном — и переносит это творчество в свои тренировки.<br><br>Если вы хотите улучшить осанку, стать гибче и сильнее — тренировки с Натальей помогут вам почувствовать тело и наполниться энергией.`
                }
            ];
            return `
                <div class="trainers-schedule-content">
                    <h2>Тренеры и расписание</h2>
                    <div class="trainers-carousel carousel">
                        ${trainers.map((t, i) => `
                            <div class="trainer-card-horizontal">
                                <div class="trainer-photo-wrap">
                                    <img src="${t.photo}" alt="${t.name}" class="trainer-photo-full">
                                </div>
                                <div class="trainer-info-wrap">
                                    <h3>${t.name}</h3>
                                    <p class="trainer-special">${t.specialization}</p>
                                    <button class="trainer-more-btn" onclick="showTrainerModal(${i})">Подробнее</button>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                    <div class="schedule-container">
                        <iframe id="widgetSchedule" src="${studio.widgets.schedule}" frameborder="0" allowfullscreen></iframe>
                    </div>
                    <div id="trainer-modal-root"></div>
                </div>
            `;
        }
        // Для других студий — стандартный вывод
        return `
            <div class="trainers-schedule-content">
                <h2>Тренеры и расписание</h2>
                <div class="trainers-carousel carousel">
                    ${studio.trainers.map((trainer, i) => `
                        <div class="trainer-card-horizontal">
                            <div class="trainer-photo-wrap">
                                <img src="${trainer.photo}" alt="${trainer.name}" class="trainer-photo-full">
                            </div>
                            <div class="trainer-info-wrap">
                                <h3>${trainer.name}</h3>
                                <p class="trainer-special">${trainer.specialization}</p>
                                <button class="trainer-more-btn" onclick="showTrainerModal(${i})">Подробнее</button>
                            </div>
                        </div>
                    `).join('')}
                </div>
                <div class="schedule-container">
                    <iframe id="widgetSchedule" src="${studio.widgets.schedule}" frameborder="0" allowfullscreen></iframe>
                </div>
                <div id="trainer-modal-root"></div>
            </div>
        `;
    }

    function renderAccountSection(studio) {
        return `
            <div class="account-content">
                <h2>Личный кабинет</h2>
                <div class="account-container">
                    <iframe id="widgetAccount" src="${studio.widgets.account}" frameborder="0" allowfullscreen></iframe>
                </div>
            </div>
        `;
    }

    function renderVideoFaqGeoSection(studio) {
        // Случайное видео с YouTube (короткое, например, фитнес)
        const youtubeId = 'dQw4w9WgXcQ'; // Можно заменить на другой id
        const faqs = [
            {
                q: 'Какие абонементы у вас есть?',
                a: 'У нас есть несколько вариантов абонементов: утренние (до 14:00), дневные (с 14:00 до 17:00), полный день, индивидуальные занятия.'
            },
            {
                q: 'Как записаться на пробное занятие?',
                a: 'Вы можете записаться на пробное занятие через наш сайт, по телефону или в студии. Пробное занятие стоит 500 рублей.'
            },
            {
                q: 'Что нужно взять с собой на первое занятие?',
                a: 'Спортивную форму, сменную обувь, полотенце и бутылку воды. Всё необходимое оборудование предоставляется студией.'
            },
            {
                q: 'Есть ли у вас раздевалки и душевые?',
                a: 'Да, в каждой студии есть комфортные раздевалки с душевыми кабинами, шкафчиками и фенами.'
            },
            {
                q: 'Можно ли заниматься с нуля?',
                a: 'Конечно! Наши тренеры адаптируют программу под ваш уровень подготовки. Есть специальные группы для начинающих.'
            },
            {
                q: 'Как часто нужно заниматься?',
                a: 'Рекомендуем заниматься 2-3 раза в неделю для достижения оптимальных результатов. Но график можно подобрать индивидуально.'
            },
            {
                q: 'Есть ли у вас парковка?',
                a: 'Да, у каждой студии есть парковка. Подробности можно уточнить у администратора.'
            }
        ];
        return `
            <div class="video-faq-geo-content">
                <h2>Видео, FAQ, Как нас найти</h2>
                <div class="video-section" style="display: flex; justify-content: center; margin-bottom: 32px;">
                    <iframe width="360" height="215" src="https://www.youtube.com/embed/${youtubeId}" frameborder="0" allowfullscreen style="border-radius: 18px; box-shadow: 0 4px 24px rgba(141,19,66,0.10);"></iframe>
                </div>
                <div class="faq-list">
                    ${faqs.map((faq, i) => `
                        <div class="faq-card" onclick="toggleFaqAnswer(${i})">
                            <div class="faq-question">${faq.q}</div>
                            <div class="faq-answer" id="faq-answer-${i}" style="max-height:0;opacity:0;overflow:hidden;">${faq.a}</div>
                        </div>
                    `).join('')}
                </div>
                <div id="map" style="height: 300px; margin-top: 32px;"></div>
            </div>
        `;
    }

    function renderReviewsPhotosSection(studio) {
        // Используем реальные фото из source/photo
        const studioPhotos = [
            'source/photo/studia1.jpg',
            'source/photo/studia2.jpg',
            'source/photo/studia3.jpg'
        ];
        return `
            <div class="reviews-photos-content">
                <h2>Отзывы и фото</h2>
                <form class="review-form">
                    <div class="rating-buttons">
                        <button type="button" class="rating-btn" data-rating="1">1</button>
                        <button type="button" class="rating-btn" data-rating="2">2</button>
                        <button type="button" class="rating-btn" data-rating="3">3</button>
                        <button type="button" class="rating-btn" data-rating="4">4</button>
                        <button type="button" class="rating-btn" data-rating="5">5</button>
                    </div>
                    <textarea id="review-text" placeholder="Оставьте отзыв"></textarea>
                    <button type="button" class="submit-review">Отправить отзыв</button>
                </form>
                <div class="photos-carousel carousel">
                    ${studioPhotos.map(photo => `
                        <div class="carousel-card">
                            <img src="${photo}" alt="Фото студии">
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    function renderSocialGeoSection(studio) {
        return `
            <div class="social-geo-content">
                <h2>Социальные сети и контакты</h2>
                <div class="social-section">
                    <ul class="social-links">
                        <li>
                            <a href="https://t.me/TotalBodyVernadskogo" class="social-link telegram" target="_blank">
                                <span class="social-icon">📱</span> Telegram
                            </a>
                        </li>
                        <li>
                            <a href="https://vk.com/totalbody" class="social-link vk" target="_blank">
                                <span class="social-icon">💬</span> VK
                            </a>
                        </li>
                        <li>
                            <a href="https://instagram.com/totalbody" class="social-link instagram" target="_blank">
                                <span class="social-icon">📸</span> Instagram
                            </a>
                        </li>
                    </ul>
                </div>
                <div class="contact-section">
                    <h3>Наши студии</h3>
                    <div class="studios-address-list">
                        ${studios.map(studio => `
                            <div class="studio-address-card">
                                <span class="studio-address-icon">📍</span>
                                <div>
                                    <div class="studio-address-title">${studio.name}</div>
                                    <a href="${studio.addressLink}" class="studio-address-link" target="_blank">${studio.address}</a>
                                    <div class="studio-address-meta">${studio.schedule}</div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    }

    function renderScrollableContent() {
        const mainContent = document.querySelector('.scrollable-content');
        if (!mainContent) return;
        const studio = studios[selectedStudioIndex];
        mainContent.innerHTML = [
            renderStudioSelector(),
            `<div class="screen-section">${renderHomeSection(studio)}</div>`,
            `<div class="screen-section">${renderDirectionsSection(studio)}</div>`,
            `<div class="screen-section">${renderTrainersSection(studio)}</div>`,
            `<div class="screen-section">${renderVideoFaqGeoSection(studio)}</div>`,
            `<div class="screen-section">${renderReviewsPhotosSection(studio)}</div>`,
            `<div class="screen-section">${renderSocialGeoSection(studio)}</div>`
        ].join('');

        // Обработчик смены студии
        const studioSelect = document.getElementById('studio-select');
        if (studioSelect) {
            studioSelect.addEventListener('change', (e) => {
                selectedStudioIndex = parseInt(e.target.value, 10);
                renderScrollableContent();
            });
        }

        // Добавляем стили для iframe
        const style = document.createElement('style');
        style.textContent = `
            .schedule-container {
                width: 100%;
                height: calc(100vh - 60px);
                margin-top: 20px;
                border-radius: 12px;
                overflow: hidden;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            }
            .schedule-container iframe {
                width: 100%;
                height: 100%;
                border: none;
            }
            @media (max-width: 768px) {
                .schedule-container {
                    height: calc(100vh - 80px);
                }
            }
        `;
        document.head.appendChild(style);

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
        
        // Преобразуем geo-ссылку в формат Яндекс.Навигатора
        const [lat, lng] = studio.addressLink.replace('geo:', '').split(',').map(Number);
        const yandexNavLink = `https://yandex.ru/navi/?whatshere[point]=${lng},${lat}`;
        
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
                        <li>Адрес: <a href="${yandexNavLink}" class="address-link" target="_blank">${studio.address}</a></li>
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
            // Формируем приветственное сообщение
            const welcomeMessage = `👋 Добро пожаловать в Total Body, ${data.firstName}!

🎯 Теперь вы будете получать:
• Уведомления о новых занятиях
• Специальные предложения
• Напоминания о записи
• Новости студии

💪 Начните свой путь к здоровому телу прямо сейчас!
Запишитесь на пробное занятие за 500 ₽`;

            // Отправляем приветственное сообщение через Telegram API
            const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    chat_id: userData.id,
                    text: welcomeMessage,
                    parse_mode: 'HTML'
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Failed to send subscription data: ${errorData.description || response.statusText}`);
            }

            console.log('Welcome message sent successfully');
            
            // Отправляем данные о подписке в Telegram
            tg.sendData(JSON.stringify(data));
            console.log('Subscription data sent to Telegram');

            // Сохраняем подписчика в localStorage
            const subscribers = JSON.parse(localStorage.getItem('subscribers') || '[]');
            subscribers.push({
                ...data,
                subscribedAt: new Date().toISOString()
            });
            localStorage.setItem('subscribers', JSON.stringify(subscribers));
            
            // Устанавливаем флаг подписки
            localStorage.setItem('isSubscribed', 'true');
            console.log('Subscription completed and saved');

        } catch (error) {
            console.error('Error subscribing to bot:', error);
            alert('Произошла ошибка при подписке на бота. Пожалуйста, попробуйте позже или обратитесь в поддержку.');
        }
    }

    // --- FAQ раскрытие ---
    window.toggleFaqAnswer = function(idx) {
        const ans = document.getElementById(`faq-answer-${idx}`);
        if (!ans) return;
        if (ans.style.maxHeight === '0px' || ans.style.maxHeight === '0' || !ans.style.maxHeight) {
            ans.style.maxHeight = '400px';
            ans.style.opacity = '1';
        } else {
            ans.style.maxHeight = '0';
            ans.style.opacity = '0';
        }
    };

    // Show initial page
    renderScrollableContent();

    window.showTrainerModal = function(index) {
        const studio = studios[selectedStudioIndex];
        let trainer;
        if (studio.id === 1) {
            trainer = [
                {
                    name: "Анастасия Рустамова",
                    specialization: "Растяжка, Йога",
                    photo: "source/trainers/Рустамова Анастасия.jpeg",
                    full: `Анастасия — тренер с 6-летним опытом, кандидат в мастера спорта по синхронному фигурному катанию, многократная чемпионка России и Европы. С раннего детства в спорте — от фигурного катания и художественной гимнастики до сноуборда и вейксёрфа.<br><br>Проводит персональные и групповые тренировки в мини-группах до 8 человек. Работает с подростками и взрослыми, создавая атмосферу поддержки, движения и заботы о теле.<br><br>Вдохновляет личным примером: совмещает тренерство с нутрициологией, регулярно учится и планирует освоить массаж. Верит, что спорт помогает не только телу, но и уму — восстанавливает, заряжает и возвращает к себе.<br><br>Любит путешествия, русскую музыку и всё, что связано с активной жизнью. На её тренировках — результат с душой.`
                },
                {
                    name: "Наталья Королёва",
                    specialization: "Фитнес, Эмоциональное восстановление",
                    photo: "source/trainers/Королёва Наталья.jpeg",
                    full: `Наталья пришла в фитнес в 2012 году как участница, а сегодня — сертифицированный тренер и кандидат биологических наук. Она совмещает научный подход с личным опытом, создавая осознанные и эффективные тренировки.<br><br>Проводит занятия в мини-группах и больших залах, делая акцент не только на физический результат, но и на эмоциональное восстановление. Её путь — от полного подростка до профессионального тренера — вдохновляет тех, кто хочет меняться и чувствовать поддержку.<br><br>Наталья продолжает развиваться, обучаясь новым методикам. Её занятия наполнены вниманием, заботой и энергией. Любит танцы, сайкл и прогулки — всё, что заряжает и помогает быть в ресурсе.<br><br>Если тебе нужен тренер с душой и научным подходом — тебе к Наталье.`
                },
                {
                    name: "Ирина Мозалева",
                    specialization: "Хатха-йога, Гвоздестояние",
                    photo: "source/trainers/Мозалёва Ирина.jpeg",
                    full: `Ирина — инструктор хатха-йоги с академическим образованием (МГУ, филология) и сертификацией YTTC-200 Федерации йоги России. Её занятия — это баланс практики, философии и осознанности, где физическая нагрузка сочетается с внутренним спокойствием.<br><br>С раннего детства Ирина занималась балетом и фитнесом, но именно йога стала её путём к ментальной устойчивости. Более года она проводит групповые и индивидуальные тренировки, включая гвоздестояние — для глубокого расслабления и концентрации.<br><br>Вне практики Ирина любит читать, учит французский и увлекается плаванием. Она создаёт пространство, где каждый может почувствовать себя услышанным и вдохновлённым.<br><br>Если тебе важна гармония тела и разума — занятия с Ириной помогут найти устойчивость и силу внутри себя.`
                },
                {
                    name: "Наталья Зуева",
                    specialization: "Пилатес, Стретчинг, Здоровая спина",
                    photo: "source/trainers/Зуева Наталья.jpeg",
                    full: `Наталья — сертифицированный тренер с высшим образованием (СПБГУСЭ, «Сервис») и дипломами в сфере фитнеса, включая пилатес и тренажёрный зал.<br><br>Она ведёт групповые тренировки по пилатесу, стретчингу и «Здоровой спине», сочетая эффективность и мягкость. Спорт сопровождает её с 7 лет: за плечами — победы в волейболе и участие в соревнованиях по лёгкой атлетике, баскетболу и метанию гранаты.<br><br>С 2024 года, переехав в Москву, Наталья активно развивает себя как тренер, создавая занятия, которые укрепляют тело и возвращают внутреннее равновесие.<br><br>Вдохновляется музыкой, танцами и дизайном — и переносит это творчество в свои тренировки.<br><br>Если вы хотите улучшить осанку, стать гибче и сильнее — тренировки с Натальей помогут вам почувствовать тело и наполниться энергией.`
                }
            ][index];
        } else {
            trainer = studio.trainers[index];
            trainer.full = trainer.description;
        }
        const modal = document.createElement('div');
        modal.className = 'trainer-modal';
        modal.innerHTML = `
            <div class="trainer-modal-content">
                <button class="trainer-modal-close" onclick="closeTrainerModal()">Назад</button>
                <img src="${trainer.photo}" alt="${trainer.name}" class="trainer-modal-photo">
                <h3>${trainer.name}</h3>
                <p class="trainer-special">${trainer.specialization}</p>
                <div class="trainer-modal-desc">${trainer.full}</div>
            </div>
        `;
        document.getElementById('trainer-modal-root').appendChild(modal);
    }

    window.closeTrainerModal = function() {
        const root = document.getElementById('trainer-modal-root');
        if (root) root.innerHTML = '';
    }

    window.showPopup = function() {
        // Если попап уже открыт — не создавать второй
        if (document.getElementById('popup-overlay')) return;
        const directions = [
            'Растяжка',
            'Аэройога',
            'Фитнес',
            'Танцы'
        ];
        const popup = document.createElement('div');
        popup.id = 'popup-overlay';
        popup.innerHTML = `
            <div class="popup-backdrop" style="position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.45);z-index:3000;"></div>
            <div class="popup-form-wrap" style="position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:#fff;border-radius:22px;box-shadow:0 8px 32px rgba(141,19,66,0.13);padding:32px 24px 24px 24px;z-index:3010;min-width:320px;max-width:95vw;display:flex;flex-direction:column;align-items:center;">
                <button class="popup-close-btn" style="position:absolute;top:18px;right:18px;background:none;border:none;font-size:1.3em;color:#8D1342;cursor:pointer;" onclick="document.getElementById('popup-overlay').remove()">×</button>
                <h2 style="color:#8D1342;margin-bottom:18px;font-size:1.25em;">Запись на пробное занятие</h2>
                <form id="popup-form" style="width:100%;display:flex;flex-direction:column;gap:14px;">
                    <input type="text" name="name" placeholder="Ваше имя" required style="padding:10px 12px;border-radius:10px;border:1.5px solid #F0E5DA;font-size:1em;">
                    <input type="tel" name="phone" placeholder="Телефон" required style="padding:10px 12px;border-radius:10px;border:1.5px solid #F0E5DA;font-size:1em;">
                    <select name="direction" required style="padding:10px 12px;border-radius:10px;border:1.5px solid #F0E5DA;font-size:1em;">
                        <option value="" disabled selected>Выберите направление</option>
                        ${directions.map(d => `<option value="${d}">${d}</option>`).join('')}
                    </select>
                    <button type="submit" style="background:linear-gradient(90deg,#FF5733 0%,#8D1342 100%);color:#fff;font-size:1.08em;font-weight:600;border:none;border-radius:14px;padding:10px 0;cursor:pointer;margin-top:8px;">Записаться</button>
                </form>
            </div>
        `;
        document.body.appendChild(popup);
        // Обработка отправки формы
        document.getElementById('popup-form').onsubmit = function(e) {
            e.preventDefault();
            // Здесь можно добавить отправку данных на сервер или в Telegram
            popup.remove();
            alert('Спасибо за заявку! Мы свяжемся с вами.');
        };
    };
});
