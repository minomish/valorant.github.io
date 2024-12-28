fetch('https://valorant-api.com/v1/agents')
  .then(response => response.json())
  .then(data => {
    const agentsContainer = document.getElementById('agents-container');
    const sliderTrack = document.querySelector('.slider-track');
    const prevButton = document.querySelector('.prev-button');
    const nextButton = document.querySelector('.next-button');

    // Добавляем карточки агентов в DOM
    data.data.forEach(agent => {
      if (agent.fullPortrait) {
        const agentCard = document.createElement('div');
        agentCard.classList.add('agent-card');

        // Изображение агента
        const agentImage = document.createElement('img');
        agentImage.src = agent.fullPortrait;
        agentImage.alt = agent.displayName;
        agentCard.appendChild(agentImage);

        // Имя агента
        const agentName = document.createElement('h3');
        agentName.textContent = agent.displayName;
        agentCard.appendChild(agentName);

        // Описание агента
        const agentDescription = document.createElement('p');
        agentDescription.textContent = agent.description || 'Описание отсутствует.';
        agentCard.appendChild(agentDescription);

        agentsContainer.appendChild(agentCard);
      }
    });

    // Устанавливаем размер карточек после того, как они добавлены
    const agentCards = document.querySelectorAll('.agent-card');
    const slideWidth = agentCards[0].offsetWidth + 20; // Ширина карточки + отступ

    // Клонируем все карточки и добавляем их в конец слайдера
    const clonedCards = Array.from(agentCards).map(card => card.cloneNode(true));
    clonedCards.forEach(clonedCard => {
      sliderTrack.appendChild(clonedCard);
    });

    let currentPosition = 0; // Начальная позиция слайдера
    const maxScroll = -(sliderTrack.scrollWidth / 2 - sliderTrack.offsetWidth); // Максимальная прокрутка для половины слайдера

    // Логика для слайдера
    function moveSlider() {
      if (currentPosition <= maxScroll) {
        // Если дошли до конца, сбрасываем позицию без анимации
        currentPosition = 0;
        sliderTrack.style.transition = 'none';
        sliderTrack.style.transform = `translateX(${currentPosition}px)`;
        
        // После небольшой задержки включаем анимацию
        setTimeout(() => {
          sliderTrack.style.transition = 'transform 0.3s ease'; 
          sliderTrack.style.transform = `translateX(${currentPosition}px)`;
        }, 50); // небольшая задержка для плавного перехода
      } else {
        currentPosition -= slideWidth;
        sliderTrack.style.transform = `translateX(${currentPosition}px)`;
      }
    }

    function moveSliderBack() {
      if (currentPosition >= 0) {
        // Если на старте, перемещаем слайдер в конец без анимации
        currentPosition = maxScroll;
        sliderTrack.style.transition = 'none';
        sliderTrack.style.transform = `translateX(${currentPosition}px)`;

        // После небольшой задержки включаем анимацию
        setTimeout(() => {
          sliderTrack.style.transition = 'transform 0.3s ease'; 
          sliderTrack.style.transform = `translateX(${currentPosition}px)`;
        }, 50); // задержка для плавности
      } else {
        currentPosition += slideWidth;
        sliderTrack.style.transform = `translateX(${currentPosition}px)`;
      }
    }

    // Привязываем события для кнопок
    prevButton.addEventListener('click', moveSliderBack); // Для прокрутки влево
    nextButton.addEventListener('click', moveSlider); // Для прокрутки вправо
  })
  .catch(error => {
    console.error('Ошибка при загрузке данных об агентах:', error);
  });

// Функция для переключения меню
function toggleMenu() {
    const menu = document.querySelector('.nav-list');
    menu.classList.toggle('active');
}

// Закрываем меню при клике на ссылку
const navLinks = document.querySelectorAll('.nav-list a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        const menu = document.querySelector('.nav-list');
        menu.classList.remove('active'); // Закрываем меню при клике
    });
});
