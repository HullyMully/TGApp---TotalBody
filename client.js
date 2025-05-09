
document.addEventListener('DOMContentLoaded', () => {
    const tg = window.Telegram.WebApp;
    tg.expand();

    const mainContent = document.getElementById('main-content');
    const tabs = document.querySelectorAll('.tab-item');

    // Content for each page
    const pages = {
        home: `
            <div class="home-content">
                <header>
                    <div class="logo">
                        <img src="logo.svg" alt="Total Body" class="logo-image">
                        <h1>Total Body</h1>
                        <p class="tagline">Студия современного фитнеса</p>
                    </div>
                    <div class="studio-selector">
                        <select id="studio-select" class="studio-select">
                            <option value="">Выберите студию</option>
                            <option value="1">Total Body на Красной Пресне</option>
                            <option value="2">Total Body в Хамовниках</option>
                            <option value="3">Total Body на Патриарших</option>
                        </select>
                    </div>
                </header>
                <section class="section">
                    <h2>О студии</h2>
                    <div class="about-content">
                        <p>Total Body - это современная студия фитнеса, где каждый найдет занятие по душе. Мы предлагаем широкий спектр тренировок: от растяжки до интенсивных кардио-нагрузок.</p>
                        <p>Наши преимущества:</p>
                        <ul>
                            <li>Профессиональные тренеры</li>
                            <li>Современное оборудование</li>
                            <li>Удобное расположение</li>
                            <li>Гибкая система абонементов</li>
                        </ul>
                    </div>
                </section>
                <section class="section">
                    <h2>Запись на пробное занятие</h2>
                    <form id="booking-form">
                        <input type="text" id="name" placeholder="Ваше имя" required>
                        <input type="tel" id="phone" placeholder="Телефон" required>
                        <input type="date" id="date" required>
                        <button type="submit">Записаться</button>
                    </form>
                </section>
                <section class="section">
                    <h2>Наши тренеры</h2>
                    <div class="trainers-grid">
                        <div class="trainer-card">
                            <img src="https://randomuser.me/api/portraits/women/32.jpg" alt="Тренер 1">
                            <h3>Анна Петрова</h3>
                            <p>Опыт: 5 лет</p>
                            <p>Специализация: Растяжка, йога</p>
                        </div>
                        <div class="trainer-card">
                            <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Тренер 2">
                            <h3>Мария Иванова</h3>
                            <p>Опыт: 3 года</p>
                            <p>Специализация: Пилатес, стретчинг</p>
                        </div>
                        <div class="trainer-card">
                            <img src="https://randomuser.me/api/portraits/women/68.jpg" alt="Тренер 3">
                            <h3>Елена Смирнова</h3>
                            <p>Опыт: 7 лет</p>
                            <p>Специализация: Силовые тренировки</p>
                        </div>
                        <div class="trainer-card">
                            <img src="https://randomuser.me/api/portraits/women/91.jpg" alt="Тренер 4">
                            <h3>Ольга Козлова</h3>
                            <p>Опыт: 4 года</p>
                            <p>Специализация: Фитнес-аэробика</p>
                        </div>
                    </div>
                </section>
                <section class="section">
                    <h2>Отзывы</h2>
                    <div class="reviews-section">
                        <h3>Оценка:</h3>
                        <div class="rating-buttons">
                            <button class="rating-btn">5</button>
                            <button class="rating-btn">4</button>
                            <button class="rating-btn">3</button>
                            <button class="rating-btn">2</button>
                            <button class="rating-btn">1</button>
                        </div>
                        <textarea class="review-input" placeholder="Оставьте свой отзыв"></textarea>
                        <button class="submit-review">Отправить отзыв</button>
                    </div>
                </section>
            </div>
        `,
        schedule: `
            <div class="widget-container">
                <iframe src="https://infototalbodyonline.impulsecrm.ru/widget/360" frameborder="0"></iframe>
            </div>
        `,
        account: `
            <div class="widget-container">
                <iframe src="https://infototalbodyonline.impulsecrm.ru/widget/361" frameborder="0"></iframe>
            </div>
        `
    };

    // Show page content
    function showPage(pageId) {
        mainContent.innerHTML = pages[pageId];
        tabs.forEach(tab => {
            tab.classList.toggle('active', tab.dataset.page === pageId);
        });
    }

    // Tab click handlers
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            showPage(tab.dataset.page);
        });
    });

    // Show initial page
    showPage('home');
});
