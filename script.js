document.addEventListener('DOMContentLoaded', () => {
    // --- LÓGICA DO CONTADOR DE TEMPO ---

    // Data de início: 12 de junho de 2007 (para completar 18 anos em 12/06/2025)
    const startDate = new Date(2007, 1, 3, 0, 0, 0); 

    const yearsEl = document.getElementById('years');
    const monthsEl = document.getElementById('months');
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');
    const sinceDateEl = document.getElementById('since-date-text');

    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    sinceDateEl.textContent = `Desde ${startDate.toLocaleDateString('pt-BR', options)}`;
    
    const formatUnit = (unit) => String(unit).padStart(2, '0');

    function updateTimer() {
        const now = new Date();
        let years = now.getFullYear() - startDate.getFullYear();
        let months = now.getMonth() - startDate.getMonth();
        let days = now.getDate() - startDate.getDate();
        let hours = now.getHours() - startDate.getHours();
        let minutes = now.getMinutes() - startDate.getMinutes();
        let seconds = now.getSeconds() - startDate.getSeconds();

        if (seconds < 0) { seconds += 60; minutes--; }
        if (minutes < 0) { minutes += 60; hours--; }
        if (hours < 0) { hours += 24; days--; }
        if (days < 0) {
            months--;
            const daysInLastMonth = new Date(now.getFullYear(), now.getMonth(), 0).getDate();
            days += daysInLastMonth;
        }
        if (months < 0) { months += 12; years--; }
        
        yearsEl.textContent = formatUnit(years);
        monthsEl.textContent = formatUnit(months);
        daysEl.textContent = formatUnit(days);
        hoursEl.textContent = formatUnit(hours);
        minutesEl.textContent = formatUnit(minutes);
        secondsEl.textContent = formatUnit(seconds);
    }

    // --- LÓGICA DO CARROSSEL DE IMAGENS (COM INDICADORES) ---
    
    const carouselSlide = document.querySelector('.carousel-slide');
    const totalImages = carouselSlide.children.length;
    let currentIndex = 0;
    
    const indicatorsContainer = document.querySelector('.carousel-indicators');
    let slideInterval = setInterval(moveToNextSlide, 4000); // 4 segundos

    for (let i = 0; i < totalImages; i++) {
        const dot = document.createElement('span');
        dot.classList.add('indicator-dot');
        dot.addEventListener('click', () => {
            moveToSlide(i);
        });
        indicatorsContainer.appendChild(dot);
    }
    const indicators = document.querySelectorAll('.indicator-dot');

    function updateIndicators() {
        indicators.forEach((dot, index) => {
            if (index === currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    function moveToSlide(index) {
        currentIndex = index;
        const offset = -currentIndex * (100 / totalImages);
        carouselSlide.style.transform = `translateX(${offset}%)`;
        updateIndicators();
        clearInterval(slideInterval);
        slideInterval = setInterval(moveToNextSlide, 4000);
    }

    function moveToNextSlide() {
        currentIndex = (currentIndex + 1) % totalImages;
        const offset = -currentIndex * (100 / totalImages);
        carouselSlide.style.transform = `translateX(${offset}%)`;
        updateIndicators();
    }

    // Inicia tudo
    updateTimer();
    setInterval(updateTimer, 1000);
    updateIndicators();
});