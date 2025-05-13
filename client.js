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
                                        <select id="studio-select" class="studio-select-apple">
                        ${studios.map((studio, idx) => `<option value="${idx}" ${idx === selectedStudioIndex ? 'selected' : ''}>${studio.name}</option>`).join('')}
                    </select>
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
                        <h3>Силовые и кардио-тренировки</h3>
                        <div style="margin-bottom: 8px; color: #8D1342; font-weight: 500;">💪 Подойдут тебе, если ты хочешь:</div>
                        <ul style="text-align:left; margin:0 0 10px 0; padding-left:18px; color:#8D1342;">
                            <li>— подтянуть тело</li>
                            <li>— сбросить напряжение через активность</li>
                            <li>— почувствовать энергию и контроль над своим телом</li>
                        </ul>
                        <div class="direction-formats" style="margin-top:8px; color:#FF5733; font-weight:600;">🔥 Форматы: <span style="color:#8D1342; font-weight:400;">функциональный фитнес, женские круговые, кардио-миксы</span></div>
                    </div>
                    <div class="apple-direction-card">
                        <h3>Растяжка и мягкие тренировки</h3>
                        <div style="margin-bottom: 8px; color: #8D1342; font-weight: 500;">🧘 Подойдут тебе, если ты хочешь:</div>
                        <ul style="text-align:left; margin:0 0 10px 0; padding-left:18px; color:#8D1342;">
                            <li>— стать гибкой без насилия над собой</li>
                            <li>— снять напряжение в спине и шее</li>
                            <li>— научиться слышать своё тело</li>
                        </ul>
                        <div class="direction-formats" style="margin-top:8px; color:#FF5733; font-weight:600;">💫 Форматы: <span style="color:#8D1342; font-weight:400;">стретчинг, шпагаты, мягкое вытяжение</span></div>
                    </div>
                    <div class="apple-direction-card">
                        <h3>Йога и аэройога</h3>
                        <div style="margin-bottom: 8px; color: #8D1342; font-weight: 500;">🌬 Подойдут тебе, если ты хочешь:</div>
                        <ul style="text-align:left; margin:0 0 10px 0; padding-left:18px; color:#8D1342;">
                            <li>— отпустить тревожность и восстановиться</li>
                            <li>— улучшить осанку и дыхание</li>
                            <li>— разгрузить тело после сидячей работы</li>
                        </ul>
                        <div class="direction-formats" style="margin-top:8px; color:#FF5733; font-weight:600;">💫 Форматы: <span style="color:#8D1342; font-weight:400;">хатха, аэройога в гамаках, дыхательные практики</span></div>
                    </div>
                    <div class="apple-direction-card">
                        <h3>Танцевальные направления</h3>
                        <div style="margin-bottom: 8px; color: #8D1342; font-weight: 500;">💃 Подойдут тебе, если ты хочешь:</div>
                        <ul style="text-align:left; margin:0 0 10px 0; padding-left:18px; color:#8D1342;">
                            <li>— раскрыть женственность и тело</li>
                            <li>— почувствовать уверенность в движении</li>
                            <li>— прокачать пластику и наслаждаться собой</li>
                        </ul>
                        <div class="direction-formats" style="margin-top:8px; color:#FF5733; font-weight:600;">💫 Форматы: <span style="color:#8D1342; font-weight:400;">high heels, strip plastic, frame up, женская хореография</span></div>
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
                <div class="trainings-carousel carousel">
                    <div class="training-card">
                        <span class="training-icon">💪 </span>
                        <h3>Силовые и кардио-тренировки</h3>
                        <div style="margin-bottom: 8px; color: #8D1342; font-weight: 500;"> Подойдут тебе, если ты хочешь:</div>
                        <ul style="text-align:left; margin:0 0 10px 0; padding-left:18px; color:#8D1342;">
                            <li>— подтянуть тело</li>
                            <li>— сбросить напряжение через активность</li>
                            <li>— почувствовать энергию и контроль над своим телом</li>
                        </ul>
                        <div class="direction-formats" style="margin-top:8px; color:#FF5733; font-weight:600;">🔥 Форматы: <span style="color:#8D1342; font-weight:400;">функциональный фитнес, женские круговые, кардио-миксы</span></div>
                    </div>
                    <div class="training-card">
                        <span class="training-icon">🧘 </span>
                        <h3>Растяжка и мягкие тренировки</h3>
                        <div style="margin-bottom: 8px; color: #8D1342; font-weight: 500;"> Подойдут тебе, если ты хочешь:</div>
                        <ul style="text-align:left; margin:0 0 10px 0; padding-left:18px; color:#8D1342;">
                            <li>— стать гибкой без насилия над собой</li>
                            <li>— снять напряжение в спине и шее</li>
                            <li>— научиться слышать своё тело</li>
                        </ul>
                        <div class="direction-formats" style="margin-top:8px; color:#FF5733; font-weight:600;">💫 Форматы: <span style="color:#8D1342; font-weight:400;">стретчинг, шпагаты, мягкое вытяжение</span></div>
                    </div>
                    <div class="training-card">
                        <span class="training-icon">🌬</span>
                        <h3>Йога и аэройога</h3>
                        <div style="margin-bottom: 8px; color: #8D1342; font-weight: 500;"> Подойдут тебе, если ты хочешь:</div>
                        <ul style="text-align:left; margin:0 0 10px 0; padding-left:18px; color:#8D1342;">
                            <li>— отпустить тревожность и восстановиться</li>
                            <li>— улучшить осанку и дыхание</li>
                            <li>— разгрузить тело после сидячей работы</li>
                        </ul>
                        <div class="direction-formats" style="margin-top:8px; color:#FF5733; font-weight:600;">💫 Форматы: <span style="color:#8D1342; font-weight:400;">хатха, аэройога в гамаках, дыхательные практики</span></div>
                        </div>
                    <div class="training-card">
                        <span class="training-icon">💃</span>
                        <h3>Танцевальные направления</h3>
                        <div style="margin-bottom: 8px; color: #8D1342; font-weight: 500;"> Подойдут тебе, если ты хочешь:</div>
                        <ul style="text-align:left; margin:0 0 10px 0; padding-left:18px; color:#8D1342;">
                            <li>— раскрыть женственность и тело</li>
                            <li>— почувствовать уверенность в движении</li>
                            <li>— прокачать пластику и наслаждаться собой</li>
                        </ul>
                        <div class="direction-formats" style="margin-top:8px; color:#FF5733; font-weight:600;">💫 Форматы: <span style="color:#8D1342; font-weight:400;">high heels, strip plastic, frame up, женская хореография</span></div>
                    </div>
                </div>
            </div>
        `,
        'social-geo': `
            <div class="social-geo-content">
                <h2 style="color:#8D1342;text-align:center;margin-bottom:32px;">Социальные сети и контакты</h2>
                <div class="social-btns-block">
                    <a href="https://t.me/TotalBodyVernadskogo" class="social-btn telegram" target="_blank">Мы в Telegram</a>
                    <a href="https://vk.com/totalbody" class="social-btn vk" target="_blank">Мы ВКонтакте</a>
                </div>
                <div class="contact-section">
                    <h3 style="color:#8D1342;text-align:center;margin:36px 0 18px 0;">Наши студии</h3>
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

    function renderHomeSection(studio) {
        return `
        <div class="home-card">
          <div class="home-card-photo">
            <img src="source/background/home.jpg" alt="Total Body" />
          </div>
          <div class="home-card-logo">
            <img src="logo.png" alt="Total Body Logo" />
          </div>
          <h1 class="home-card-title">Красота и стройность — просто. Как улыбка.</h1>
          <div class="home-card-subtitle">
            Твоя красота начинается здесь. Женские тренировки рядом с домом: растяжка, аэройога, танцы, фитнес, здоровая спина.
          </div>
          <div class="home-card-offer">
            <b>🔥 Пробное занятие с профессиональным тренером — всего за 500 ₽</b>
            <span class="home-card-offer-try">Попробуй любое направление в поддерживающей атмосфере</span>
          </div>
          <button class="home-card-btn" onclick="showPopup()">Записаться на пробное за 500 ₽</button>
          <ul class="home-card-benefits">
            <li>● Подходит даже с нуля</li>
            <li>● Группы до 15 человек</li>
            <li>● Опытные тренеры — индивидуальный подход</li>
          </ul>
        </div>
        `;
    }

    function renderDirectionsSection(studio) {
        // Данные направлений с реальными фото
        const directions = [
            {
                name: "Растяжка (стретчинг)",
                photo: "source/direction/rastyaj.jpg",
                short: "Мягкое развитие гибкости, расслабление мышц, улучшение осанки.",
                full: "Растяжка — это мягкая практика для любого уровня. Помогает снять напряжение, улучшить осанку и почувствовать лёгкость в теле."
            },
            {
                name: "Аэройога",
                icon: "🤸‍♂️",
                photo: "source/direction/aieyoga.jpg",
                short: "Тренировки в гамаках, снятие напряжения, проработка спины.",
                full: "Аэройога — это тренировки в специальных гамаках. Снимает напряжение, помогает проработать спину и раскрыть новые ощущения."
            },
            {
                name: "Фитнес",
                icon: "💪",
                photo: "source/direction/fitnes.jpg",
                short: "Силовые и кардио-тренировки с женским подходом, укрепление и тонус.",
                full: "Фитнес — это силовые и кардио-тренировки, которые укрепляют тело, делают его подтянутым и энергичным. Женский подход и поддержка тренера."
            },
            {
                name: "High Heels & Strip Dance",
                icon: "👠",
                photo: "source/direction/High Heels & Strip Dance .jpg",
                short: "Танцы на каблуках, развитие пластики, уверенности и женственности.",
                full: "High Heels & Strip Dance — это танцы для раскрытия женственности, уверенности и пластики. Подходит для любого уровня."
            },
            {
                name: "Здоровая спина",
                icon: "🧑‍⚕️",
                photo: "source/direction/heltfback.jpg",
                short: "Специальная программа для тех, кто чувствует зажатость, боль или усталость.",
                full: "Здоровая спина — это тренировки для профилактики и снятия боли, укрепления мышц спины и улучшения самочувствия."
            },
            {
                name: "МФР (миофасциальный релиз)",
                icon: "🌀",
                photo: "source/direction/mfr.jpg",
                short: "Работа с глубоким напряжением, расслабление через дыхание и роллы.",
                full: "МФР — это техника расслабления мышц и фасций с помощью роллов и дыхания. Помогает снять глубокое напряжение и улучшить подвижность."
            }
        ];
        // Генерируем карточки
        const cards = directions.map((d, i) => `
            <div class="apple-direction-card" data-idx="${i}">
                <div class="direction-photo-wrap">
                    ${d.photo ? `<img src='${d.photo}' alt='${d.name}' class='direction-photo'>` : `<span class='apple-direction-emoji'>${d.icon}</span>`}
                </div>
                <h3>${d.name}</h3>
                <div class="direction-short">${d.short}</div>
                <button class="direction-more-btn" onclick="toggleDirectionDesc(${i})">Подробнее</button>
                <div class="direction-full" id="direction-full-${i}" style="max-height:0;opacity:0;overflow:hidden;transition:max-height 0.3s,opacity 0.3s;">${d.full}</div>
            </div>
        `).join('');
        // Основной рендер
        return `
            <div class="apple-directions">
                <h2>Выбери своё направление — тренировка, которая подойдёт именно тебе</h2>
                <div class="apple-directions-subtitle" style="margin-bottom:18px;">
                    У нас нет «сложных» тренировок — только те, которые помогают раскрыть тело и почувствовать себя лучше.<br><br>
                    Ты можешь начать с любого формата — даже если никогда раньше не занималась.
                </div>
                <div class="apple-directions-carousel carousel">
                    ${cards}
                </div>
                <div class="apple-directions-tip" style="background:#F0E5DA;border-radius:16px;padding:18px 16px;margin:18px 0 0 0;color:#8D1342;font-size:1.08em;">
                    💡 <b>Не знаешь, с чего начать?</b> Запишись на пробное, и мы подберём лучшее направление под твои цели и состояние.
                </div>
                <button class="apple-cta" style="margin-top:24px;" onclick="showPopup()">Попробовать пробную тренировку с опытным тренером за 500 ₽</button>
            </div>
        `;
    }

    function renderTrainersSection(studio) {
        return `
            <div class="important-section">
                <h2>Важное</h2>
                <div class="important-carousel">
                    <div class="important-card" onclick="showTrainersModal()">
                        <div class="important-card-icon">🧑‍🏫</div>
                        <div class="important-card-title">Тренеры</div>
                    </div>
                    <div class="important-card" onclick="showScheduleModal()">
                        <div class="important-card-icon">📅</div>
                        <div class="important-card-title">Расписание</div>
                    </div>
                    <div class="important-card" onclick="showMasterclassModal()">
                        <div class="important-card-icon">🏆</div>
                        <div class="important-card-title">Мастер-классы</div>
                    </div>
                </div>
                <div id="important-modal-root"></div>
            </div>
        `;
    }

    // Модалки-заглушки (можно доработать)
    window.showTrainersModal = function() {
        const modal = document.createElement('div');
        modal.className = 'popup';
        modal.innerHTML = `
          <div class="popup-content" style="padding:0;max-width:100vw;width:100vw;height:100vh;max-height:100vh;display:flex;flex-direction:column;">
            <button class="popup-close" style="position:absolute;top:18px;right:18px;z-index:10;" onclick="document.body.removeChild(this.closest('.popup'))">&times;</button>
            <div style="overflow-y:auto;flex:1 1 0;display:flex;flex-direction:column;align-items:center;justify-content:flex-start;padding:32px 0 24px 0;">
              <h2 class="popup-title" style="color:#8D1342;">Тренеры</h2>
              <div class="trainer-modal-list" style="width:100%;max-width:520px;">
                ${[
                  {
                    name: "Анастасия Рустамова",
                    spec: "Растяжка, Йога",
                    photo: "source/trainers/Рустамова Анастасия.jpeg",
                    desc: `<b>Анастасия Рустамова — тренер, который помогает чувствовать тело и быть в ресурсе</b><br><br>Анастасия — тренер с 6-летним опытом, кандидат в мастера спорта по синхронному фигурному катанию, многократная чемпионка России и Европы. С раннего детства в спорте — от фигурного катания и художественной гимнастики до сноуборда и вейксёрфа.<br><br>Проводит персональные и групповые тренировки в мини-группах до 8 человек. Работает с подростками и взрослыми, создавая атмосферу поддержки, движения и заботы о теле.<br><br>Вдохновляет личным примером: совмещает тренерство с нутрициологией, регулярно учится и планирует освоить массаж. Верит, что спорт помогает не только телу, но и уму — восстанавливает, заряжает и возвращает к себе.<br><br>Любит путешествия, русскую музыку и всё, что связано с активной жизнью. На её тренировках — результат с душой.`
                  },
                  {
                    name: "Наталья Королёва",
                    spec: "Фитнес, Эмоциональное восстановление",
                    photo: "source/trainers/Королёва Наталья.jpeg",
                    desc: `<b>Наталья Королёва — тренер, который вдохновляет и помогает вернуться к себе</b><br><br>Наталья пришла в фитнес в 2012 году как участница, а сегодня — сертифицированный тренер и кандидат биологических наук. Она совмещает научный подход с личным опытом, создавая осознанные и эффективные тренировки.<br><br>Проводит занятия в мини-группах и больших залах, делая акцент не только на физический результат, но и на эмоциональное восстановление. Её путь — от полного подростка до профессионального тренера — вдохновляет тех, кто хочет меняться и чувствовать поддержку.<br><br>Наталья продолжает развиваться, обучаясь новым методикам. Её занятия наполнены вниманием, заботой и энергией. Любит танцы, сайкл и прогулки — всё, что заряжает и помогает быть в ресурсе.<br><br>Если тебе нужен тренер с душой и научным подходом — тебе к Наталье.`
                  },
                  {
                    name: "Ирина Мозалева",
                    spec: "Хатха-йога, Гвоздестояние",
                    photo: "source/trainers/Мозалёва Ирина.jpeg",
                    desc: `<b>Ирина Мозалева — тренер, соединяющий тело, ум и душу</b><br><br>Ирина — инструктор хатха-йоги с академическим образованием (МГУ, филология) и сертификацией YTTC-200 Федерации йоги России. Её занятия — это баланс практики, философии и осознанности, где физическая нагрузка сочетается с внутренним спокойствием.<br><br>С раннего детства Ирина занималась балетом и фитнесом, но именно йога стала её путём к ментальной устойчивости. Более года она проводит групповые и индивидуальные тренировки, включая гвоздестояние — для глубокого расслабления и концентрации.<br><br>Вне практики Ирина любит читать, учит французский и увлекается плаванием. Она создаёт пространство, где каждый может почувствовать себя услышанным и вдохновлённым.<br><br>Если тебе важна гармония тела и разума — занятия с Ириной помогут найти устойчивость и силу внутри себя.`
                  },
                  {
                    name: "Наталья Зуева",
                    spec: "Пилатес, Стретчинг, Здоровая спина",
                    photo: "source/trainers/Зуева Наталья.jpeg",
                    desc: `<b>Наталья Зуева — тренер, вдохновляющий на движение и гармонию</b><br><br>Наталья — сертифицированный тренер с высшим образованием (СПБГУСЭ, «Сервис») и дипломами в сфере фитнеса, включая пилатес и тренажёрный зал. Её подход — это сочетание знаний, внимания к деталям и заботы о каждом клиенте.<br><br>Она ведёт групповые тренировки по пилатесу, стретчингу и «Здоровой спине», сочетая эффективность и мягкость. Спорт сопровождает её с 7 лет: за плечами — победы в волейболе и участие в соревнованиях по лёгкой атлетике, баскетболу и метанию гранаты.<br><br>С 2024 года, переехав в Москву, Наталья активно развивает себя как тренер, создавая занятия, которые укрепляют тело и возвращают внутреннее равновесие.<br><br>Вдохновляется музыкой, танцами и дизайном — и переносит это творчество в свои тренировки.<br><br>Если вы хотите улучшить осанку, стать гибче и сильнее — тренировки с Натальей помогут вам почувствовать тело и наполниться энергией.`
                  }
                ].map(t => `
                  <div class="trainer-modal-card">
                    <img src="${t.photo}" alt="${t.name}" class="trainer-modal-photo">
                    <div class="trainer-modal-name">${t.name}</div>
                    <div class="trainer-modal-spec">${t.spec}</div>
                    <div class="trainer-modal-desc">${t.desc}</div>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
        `;
        document.body.appendChild(modal);
    }
    window.showScheduleModal = function() {
        const modal = document.createElement('div');
        modal.className = 'popup';
        modal.innerHTML = `
          <div class="popup-content" style="padding:0;max-width:100vw;width:100vw;height:100vh;max-height:100vh;display:flex;flex-direction:column;">
            <button class="popup-close" style="position:absolute;top:18px;right:18px;z-index:10;" onclick="document.body.removeChild(this.closest('.popup'))">&times;</button>
            <iframe src='https://infototalbodyonline.impulsecrm.ru/widget/360' style='width:100vw;height:100vh;border:none;border-radius:0;flex:1 1 0;'></iframe>
          </div>
        `;
        document.body.appendChild(modal);
    }
    window.showMasterclassModal = function() {
        const modal = document.createElement('div');
        modal.className = 'popup';
        modal.innerHTML = `
          <div class="popup-content trainer-modal-popup">
            <button class="popup-close" onclick="document.body.removeChild(this.closest('.popup'))">&times;</button>
            <h2 class="popup-title" style="color:#8D1342;">Мастер-классы</h2>
            <div style="color:#8D1342;font-size:1.1em;text-align:center;opacity:0.85;">Скоро здесь появятся анонсы и расписание мастер-классов!</div>
          </div>
        `;
        document.body.appendChild(modal);
    }
    window.closeImportantModal = function() {
        document.getElementById('important-modal-root').innerHTML = '';
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
        return `
      <div class="important-section">
        <h2>Видео, Часто задаваемые вопросы, Как нас найти</h2>
        <div class="important-carousel">
          <div class="important-card" onclick="showVideoModal()">
            <div class="important-card-icon">▶️</div>
            <div class="important-card-title">Видео</div>
          </div>
          <div class="important-card" onclick="showFaqModal()">
            <div class="important-card-icon">❓</div>
            <div class="important-card-title">Часто задаваемые вопросы</div>
          </div>
          <div class="important-card" onclick="showGeoModal()">
            <div class="important-card-icon">📍</div>
            <div class="important-card-title">Как нас найти</div>
          </div>
          <div class="important-card" onclick="showReviewModal()">
            <div class="important-card-icon">📝</div>
            <div class="important-card-title">Оставить отзыв</div>
          </div>
        </div>
      </div>
    `;
    }

    window.showVideoModal = function() {
      const modal = document.createElement('div');
      modal.className = 'popup';
      modal.innerHTML = `
        <div class="popup-content" style="padding:0;max-width:100vw;width:100vw;height:100vh;max-height:100vh;display:flex;flex-direction:column;">
          <button class="popup-close" style="position:absolute;top:18px;right:18px;z-index:10;" onclick="document.body.removeChild(this.closest('.popup'))">&times;</button>
          <div style="flex:1 1 0;display:flex;align-items:center;justify-content:center;">
            <iframe width="360" height="215" src="https://www.youtube.com/embed/dQw4w9WgXcQ" frameborder="0" allowfullscreen style="border-radius: 18px; box-shadow: 0 4px 24px rgba(141,19,66,0.10);width:80vw;max-width:600px;height:45vw;max-height:340px;"></iframe>
          </div>
        </div>
      `;
      document.body.appendChild(modal);
    }

    window.showFaqModal = function() {
      const faqs = [
        {q: 'Какие есть абонементы?', a: 'В студиях представлена широкая линейка абонементов: утренние, дневные и полного дня. Средний формат — 8 занятий в месяц. После первого занятия тренер составит программу, и мы подберем удобный формат под ваши цели.'},
        {q: 'Что взять с собой на тренировку?', a: 'Удобную спортивную форму (лосины/топ), воду и хорошее настроение. Всё остальное (коврики, оборудование, гамаки) предоставляется в студии.'},
        {q: 'Как записаться и где посмотреть расписание?', a: 'Вы можете записаться на пробное занятие через сайт. Расписание и доступные направления мы вышлем вам после заявки в мессенджере или на почту.'},
        {q: 'Есть ли подарочные сертификаты?', a: 'Да, у нас есть подарочные сертификаты на любую сумму или определённое количество занятий. Отличный вариант для заботливого подарка.'},
        {q: 'Какое направление мне подойдёт?', a: 'Мы подскажем! На пробном занятии тренер оценит уровень подготовки и цели, после чего порекомендует оптимальный формат. Вы точно найдёте своё.'},
        {q: 'Разбивка платежа — это кредит?', a: 'Нет, это удобная система оплаты — вы можете платить за абонемент частями, без процентов и без оформления кредита.'},
        {q: 'Если я не успею посетить все занятия, они сгорят?', a: 'Нет. Мы можем перенести занятия или заморозить абонемент по уважительной причине. Нам важно, чтобы вы занимались комфортно и без давления.'},
        {q: 'Как получить занятия в подарок?', a: 'У нас действуют акции: пригласи подругу — получи занятие в подарок. Также мы дарим тренировки за участие в мероприятиях и активность в нашем сообществе.'}
      ];
      const modal = document.createElement('div');
      modal.className = 'popup';
      modal.innerHTML = `
        <div class="popup-content" style="padding:0;max-width:100vw;width:100vw;height:100vh;max-height:100vh;display:flex;flex-direction:column;">
          <button class="popup-close" style="position:absolute;top:18px;right:18px;z-index:10;" onclick="document.body.removeChild(this.closest('.popup'))">&times;</button>
          <div style="overflow-y:auto;flex:1 1 0;display:flex;flex-direction:column;align-items:center;justify-content:flex-start;padding:32px 0 24px 0;">
            <h2 class="popup-title" style="color:#8D1342;">Часто задаваемые вопросы</h2>
            <div class="faq-list" style="width:100%;max-width:700px;">
              ${faqs.map(faq => `
                <div class="faq-card">
                  <div class="faq-question">${faq.q}</div>
                  <div class="faq-answer" style="opacity:1;max-height:1000px;">${faq.a}</div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      `;
      document.body.appendChild(modal);
    }

    window.showGeoModal = function() {
      const modal = document.createElement('div');
      modal.className = 'popup';
      modal.innerHTML = `
        <div class="popup-content" style="padding:0;max-width:100vw;width:100vw;height:100vh;max-height:100vh;display:flex;flex-direction:column;">
          <button class="popup-close" style="position:absolute;top:18px;right:18px;z-index:10;" onclick="document.body.removeChild(this.closest('.popup'))">&times;</button>
          <div style="overflow-y:auto;flex:1 1 0;display:flex;flex-direction:column;align-items:center;justify-content:flex-start;padding:32px 0 24px 0;">
            <h2 class="popup-title" style="color:#8D1342;text-align:center;">Как нас найти</h2>
            <div style="width:100vw;margin:0 auto 18px auto;">
              <div id="geo-map" style="width:100vw;height:40vh;min-height:320px;border-radius:18px;box-shadow:0 2px 8px rgba(141,19,66,0.10);margin-bottom:18px;"></div>
              <div style="color:#8D1342;font-size:1.1em;text-align:center;">
                <b>Москва, Вернадского 15</b><br>
                <a href="tel:+79150640309" style="color:#FF5733;text-decoration:none;font-weight:600;">+7 915 064 0309</a>
              </div>
            </div>
          </div>
        </div>
      `;
      document.body.appendChild(modal);
      // Инициализация карты (Leaflet)
      setTimeout(() => {
        if (window.L) {
          const map = L.map('geo-map').setView([55.686320, 37.524659], 15);
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
          }).addTo(map);
          L.marker([55.686320, 37.524659])
            .bindPopup('Москва, Вернадского 15')
            .addTo(map);
        }
      }, 200);
    }

    function renderReviewsPhotosSection(studio) {
      // Массив искусственных отзывов
      const reviews = [
        { name: 'Анна К.', avatar: '👩‍🦰', rating: 5, text: 'Очень понравилось! Тренеры внимательные, атмосфера супер. Уже после первой тренировки почувствовала результат.' },
        { name: 'Мария П.', avatar: '👩‍🎤', rating: 4, text: 'Хожу на стретчинг и аэройогу. Всё чисто, уютно, тренеры поддерживают. Иногда бывает много людей, но в целом всё отлично.' },
        { name: 'Екатерина С.', avatar: '👩‍🔬', rating: 5, text: 'Прекрасный центр! Доброжелательные администраторы, удобное расписание, много направлений. Дочка в восторге от детских занятий.' },
        { name: 'Ольга В.', avatar: '👩‍🏫', rating: 5, text: 'Занимаюсь фитнесом и танцами. Очень нравится женская атмосфера и индивидуальный подход. Спасибо тренерам!' },
        { name: 'Ирина Л.', avatar: '👩‍💼', rating: 4, text: 'Хорошее оборудование, приятные залы. Иногда сложно записаться на вечер, но всегда находят место.' },
        { name: 'Светлана Д.', avatar: '👩‍🔧', rating: 5, text: 'Мои любимые тренировки! После занятий всегда отличное настроение. Рекомендую всем подругам.' },
        { name: 'Татьяна М.', avatar: '👩‍🎨', rating: 5, text: 'Очень уютно, чисто, современно. Тренеры профессионалы, всегда помогут и подскажут.' },
        { name: 'Виктория Б.', avatar: '👩‍🚀', rating: 5, text: 'Занимаюсь уже полгода, результат потрясающий! Спасибо за заботу и поддержку.' },
        { name: 'Елена Ф.', avatar: '👩‍⚕️', rating: 4, text: 'Понравилась система абонементов и возможность заморозки. Всё удобно и прозрачно.' },
        { name: 'Дарья Ю.', avatar: '👩‍🍳', rating: 5, text: 'Лучшее место для женских тренировок! Всегда возвращаюсь с радостью.' }
      ];
      // Фото
      const studioPhotos = [
        'source/photo/studia1.jpg',
        'source/photo/studia2.jpg',
        'source/photo/studia3.jpg'
      ];
      // Слайдер отзывов и фото
      return `
        <div class="reviews-photos-content">
          <h2>Отзывы и фото</h2>
          <div class="reviews-slider-block">
            <div class="reviews-slider" id="reviews-slider"></div>
            <div class="reviews-slider-nav">
              <button class="slider-arrow" id="review-prev">&#8592;</button>
              <span id="review-indicator">1/${reviews.length}</span>
              <button class="slider-arrow" id="review-next">&#8594;</button>
            </div>
            <!-- Миниатюры отзывов убраны по запросу -->
          </div>
          <div class="photos-slider-block">
            <div class="photos-slider" id="photos-slider"></div>
            <div class="photos-slider-nav">
              <button class="slider-arrow" id="photo-prev">&#8592;</button>
              <span id="photo-indicator">1/${studioPhotos.length}</span>
              <button class="slider-arrow" id="photo-next">&#8594;</button>
            </div>
            <div class="photos-thumbnails">
              ${studioPhotos.map((p, i) => `
                <div class="photo-thumb" data-idx="${i}" id="photo-thumb-${i}">
                  <img src="${p}" alt="Миниатюра студии" />
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      `;
    }

    window.initReviewsPhotosSliders = function() {
      const reviews = [
        { name: 'Анна', avatar: '👩‍🦰', rating: 5, text: 'Очень понравилось! Тренеры внимательные, атмосфера супер. Уже после первой тренировки почувствовала результат.' },
        { name: 'Мария', avatar: '👩‍🎤', rating: 4, text: 'Хожу на стретчинг и аэройогу. Всё чисто, уютно, тренеры поддерживают. Иногда бывает много людей, но в целом всё отлично.' },
        { name: 'Екатерина', avatar: '👩‍🔬', rating: 5, text: 'Прекрасный центр! Доброжелательные администраторы, удобное расписание, много направлений. Дочка в восторге от детских занятий.' },
        { name: 'Ольга', avatar: '👩‍🏫', rating: 5, text: 'Занимаюсь фитнесом и танцами. Очень нравится женская атмосфера и индивидуальный подход. Спасибо тренерам!' },
        { name: 'Ирина', avatar: '👩‍💼', rating: 4, text: 'Хорошее оборудование, приятные залы. Иногда сложно записаться на вечер, но всегда находят место.' },
        { name: 'Светлана', avatar: '👩‍🔧', rating: 5, text: 'Мои любимые тренировки! После занятий всегда отличное настроение. Рекомендую всем подругам.' },
        { name: 'Татьяна', avatar: '👩‍🎨', rating: 5, text: 'Очень уютно, чисто, современно. Тренеры профессионалы, всегда помогут и подскажут.' },
        { name: 'Виктория', avatar: '👩‍🚀', rating: 5, text: 'Занимаюсь уже полгода, результат потрясающий! Спасибо за заботу и поддержку.' },
        { name: 'Елена', avatar: '👩‍⚕️', rating: 4, text: 'Понравилась система абонементов и возможность заморозки. Всё удобно и прозрачно.' },
        { name: 'Дарья', avatar: '👩‍🍳', rating: 5, text: 'Лучшее место для женских тренировок! Всегда возвращаюсь с радостью.' }
      ];
      const studioPhotos = [
        'source/photo/studia1.jpg',
        'source/photo/studia2.jpg',
        'source/photo/studia3.jpg'
      ];
      window.currentReviewSlide = 0;
      window.currentPhotoSlide = 0;

      function renderReviewSlide(idx) {
        const r = reviews[idx];
        const slider = document.getElementById('reviews-slider');
        if (!slider) return;
        slider.innerHTML = `
          <div class='review-card fade-in'>
            <div style="display:flex;align-items:center;gap:12px;margin-bottom:10px;">
              <span style="font-size:2.2em;">${r.avatar}</span>
              <span style="font-weight:700;font-size:1.1em;color:#8D1342;">${r.name}</span>
              <span style="margin-left:8px;">${'★'.repeat(r.rating)}${'☆'.repeat(5-r.rating)}</span>
            </div>
            <div style="color:#222;font-size:1.08em;line-height:1.5;">${r.text}</div>
          </div>
        `;
        const indicator = document.getElementById('review-indicator');
        if (indicator) indicator.textContent = `${idx+1}/${reviews.length}`;
        reviews.forEach((_,i)=>{
          const thumb = document.getElementById('review-thumb-'+i);
          if(thumb) thumb.classList.toggle('active',i===idx);
        });
      }
      function renderPhotoSlide(idx) {
        const slider = document.getElementById('photos-slider');
        if (!slider) return;
        slider.innerHTML = `
          <div class='photo-card fade-in'>
            <img src='${studioPhotos[idx]}' alt='Фото студии' />
          </div>
        `;
        const indicator = document.getElementById('photo-indicator');
        if (indicator) indicator.textContent = `${idx+1}/${studioPhotos.length}`;
        studioPhotos.forEach((_,i)=>{
          const thumb = document.getElementById('photo-thumb-'+i);
          if(thumb) thumb.classList.toggle('active',i===idx);
        });
      }
      window.goToReview = function(idx) {
        window.currentReviewSlide = idx;
        renderReviewSlide(idx);
      }
      window.goToPhoto = function(idx) {
        window.currentPhotoSlide = idx;
        renderPhotoSlide(idx);
      }
      setTimeout(()=>{
        renderReviewSlide(window.currentReviewSlide);
        renderPhotoSlide(window.currentPhotoSlide);
        const reviewPrev = document.getElementById('review-prev');
        const reviewNext = document.getElementById('review-next');
        if (reviewPrev) reviewPrev.onclick = ()=>{
          window.currentReviewSlide = (window.currentReviewSlide-1+reviews.length)%reviews.length;
          renderReviewSlide(window.currentReviewSlide);
        };
        if (reviewNext) reviewNext.onclick = ()=>{
          window.currentReviewSlide = (window.currentReviewSlide+1)%reviews.length;
          renderReviewSlide(window.currentReviewSlide);
        };
        reviews.forEach((_,i)=>{
          const thumb = document.getElementById('review-thumb-'+i);
          if(thumb) thumb.onclick = ()=>window.goToReview(i);
        });
        const photoPrev = document.getElementById('photo-prev');
        const photoNext = document.getElementById('photo-next');
        if (photoPrev) photoPrev.onclick = ()=>{
          window.currentPhotoSlide = (window.currentPhotoSlide-1+studioPhotos.length)%studioPhotos.length;
          renderPhotoSlide(window.currentPhotoSlide);
        };
        if (photoNext) photoNext.onclick = ()=>{
          window.currentPhotoSlide = (window.currentPhotoSlide+1)%studioPhotos.length;
          renderPhotoSlide(window.currentPhotoSlide);
        };
        studioPhotos.forEach((_,i)=>{
          const thumb = document.getElementById('photo-thumb-'+i);
          if(thumb) thumb.onclick = ()=>window.goToPhoto(i);
        });
      },100);
    }

    function renderSocialGeoSection(studio) {
        return `
            <div class="social-geo-content">
                <h2 style="color:#8D1342;text-align:center;margin-bottom:32px;">Социальные сети и контакты</h2>
                <div class="social-btns-block">
                    <a href="https://t.me/TotalBodyVernadskogo" class="social-btn telegram" target="_blank">Мы в Telegram</a>
                    <a href="https://vk.com/totalbody" class="social-btn vk" target="_blank">Мы ВКонтакте</a>
                </div>
                <div class="contact-section">
                    <h3 style="color:#8D1342;text-align:center;margin:36px 0 18px 0;">Наши студии</h3>
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
            `<div class="screen-section">${renderHomeSection(studio)}</div>`,
            `<div class="screen-section">${pages.trainings}</div>`,
            `<div class="screen-section">${renderTrainersSection(studio)}</div>`,
            `<div class="screen-section">${renderVideoFaqGeoSection(studio)}</div>`,
            `<div class="screen-section">${renderDirectionsSection(studio)}</div>`,
            `<div class="screen-section">${renderReviewsPhotosSection(studio)}</div>`,
            `<div class="screen-section">${renderSocialGeoSection(studio)}</div>`
        ].join('');

        // Обработчик смены студии для нового селектора
        const studioSelect = document.getElementById('studio-select');
        if (studioSelect) {
            studioSelect.addEventListener('change', (e) => {
                selectedStudioIndex = parseInt(e.target.value, 10);
                renderScrollableContent();
            });
        }

        // ИНИЦИАЛИЗАЦИЯ СЛАЙДЕРОВ ОТЗЫВОВ И ФОТО
        if (window.initReviewsPhotosSliders) window.initReviewsPhotosSliders();
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
        // Лог открытия попапа
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
        // Обработка клика по фону для закрытия попапа
        popup.addEventListener('mousedown', (e) => {
            if (e.target === popup) {
                document.body.removeChild(popup);
            }
        });
        const form = document.createElement('form');
        form.className = 'popup-form';
        form.innerHTML = `
            <h2 class="popup-title">Запись на пробное занятие</h2>
            <input type="text" name="name" placeholder="Ваше имя" required class="popup-input">
            <input type="tel" name="phone" placeholder="Телефон" required class="popup-input">
            <select name="direction" required class="popup-select">
                <option value="">Выберите направление</option>
                <option value="Растяжка">Растяжка</option>
                <option value="Аэройога">Аэройога</option>
                <option value="Фитнес">Фитнес</option>
                <option value="Танцы">Танцы</option>
                <option value="Здоровая спина">Здоровая спина</option>
            </select>
            <button type="submit" class="popup-submit">Отправить</button>
        `;
        // Обработчик отправки формы
        form.onsubmit = async (e) => {
            e.preventDefault();
            // Лог отправки формы
            console.log('Form submitted from popup');
            const formData = new FormData(form);
            const name = formData.get('name');
            const phone = formData.get('phone');
            const direction = formData.get('direction');
            // Валидация телефона: +7XXXXXXXXXX или 8XXXXXXXXXX
            const phoneRegex = /^(\+7|8)\d{10}$/;
            if (!phoneRegex.test(phone)) {
                alert('Введите корректный номер телефона (например, +79991234567 или 89991234567)');
                form.phone.focus();
                return;
            }
            // Формируем сообщение для Telegram
            const message = `Новая запись: Имя: ${name}, Телефон: ${phone}, Направление: ${direction}`;
            const token = "7498555936:AAG270jJhDjkjNnXRPnggO5ITiW0Y4waJk4";
            const chat_id = "5947469995";
            const url = `https://api.telegram.org/bot${token}/sendMessage`;
            try {
                // Отправка данных через Bot API
                const response = await fetch(url, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ chat_id, text: message })
                });
                if (response.ok) {
                    alert("Спасибо за заявку! Мы свяжемся с вами.");
                } else {
                    alert("Ошибка отправки. Попробуйте позже.");
                }
            } catch (error) {
                // Безопасная обработка ошибок
                alert("Ошибка отправки. Попробуйте позже.");
            } finally {
                // Закрываем попап в любом случае
                document.body.removeChild(popup);
            }
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

    // --- JS для раскрытия описания направления ---
    window.toggleDirectionDesc = function(idx) {
        const el = document.getElementById(`direction-full-${idx}`);
        if (!el) return;
        if (el.style.maxHeight === '0px' || el.style.maxHeight === '0' || !el.style.maxHeight) {
            el.style.maxHeight = '200px';
            el.style.opacity = '1';
        } else {
            el.style.maxHeight = '0';
            el.style.opacity = '0';
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

    window.showPopup = showPopup;

    window.showReviewModal = function() {
      const modal = document.createElement('div');
      modal.className = 'popup';
      modal.innerHTML = `
        <div class="popup-content" style="padding:0;max-width:100vw;width:100vw;height:100vh;max-height:100vh;display:flex;flex-direction:column;">
          <button class="popup-close" style="position:absolute;top:18px;right:18px;z-index:10;" onclick="document.body.removeChild(this.closest('.popup'))">&times;</button>
          <div style="overflow-y:auto;flex:1 1 0;display:flex;flex-direction:column;align-items:center;justify-content:flex-start;padding:32px 0 24px 0;">
            <h2 class="popup-title" style="color:#8D1342;">Оставить отзыв</h2>
            <form class="review-form" onsubmit="event.preventDefault(); submitReview();">
              <div class="rating-buttons">
                <button type="button" class="rating-btn" data-rating="1">1</button>
                <button type="button" class="rating-btn" data-rating="2">2</button>
                <button type="button" class="rating-btn" data-rating="3">3</button>
                <button type="button" class="rating-btn" data-rating="4">4</button>
                <button type="button" class="rating-btn" data-rating="5">5</button>
              </div>
              <textarea id="review-text" placeholder="Оставьте отзыв"></textarea>
              <button type="submit" class="submit-review">Отправить отзыв</button>
            </form>
          </div>
        </div>
      `;
      document.body.appendChild(modal);

      // Логика выбора рейтинга
      const ratingBtns = modal.querySelectorAll('.rating-btn');
      let selectedRating = 0;
      ratingBtns.forEach(btn => {
        btn.onclick = function() {
          ratingBtns.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          selectedRating = btn.getAttribute('data-rating');
        };
      });

      // Логика отправки отзыва
      window.submitReview = function() {
        const text = modal.querySelector('#review-text').value.trim();
        if (!selectedRating) {
          alert('Пожалуйста, выберите оценку!');
          return;
        }
        if (!text) {
          alert('Пожалуйста, напишите отзыв!');
          return;
        }
        // Здесь можно отправить отзыв на сервер или обработать иначе
        alert('Спасибо за ваш отзыв!\nОценка: ' + selectedRating + '\nТекст: ' + text);
        document.body.removeChild(modal);
      };
    }
});
