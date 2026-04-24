// ПОЯВЛЕНИЕ ХЭДЭРА И ФИКСИРОВАННОЙ КНОПКИ

document.addEventListener('DOMContentLoaded', () => {
  // БЛОКИРОВКА НА МОБИЛЬНЫХ
  // const isMobile = window.innerWidth <= 767;
  // if (isMobile) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      document.querySelector('.header-menu').style.opacity = entry.isIntersecting ? '1' : '0';
      document.querySelector('.button-fix').style.opacity = entry.isIntersecting ? '1' : '0';
    });
  }, { threshold: 0.5 });
  
  observer.observe(document.querySelector('.sectionShow-container'));
});


// ПЕРЕКЛЮЧЕНИЕ СЕКЦИЙ

document.addEventListener('DOMContentLoaded', () => {
  // БЛОКИРОВКА НА МОБИЛЬНЫХ
  // const isMobile = window.innerWidth <= 767;
  // if (isMobile) return;

  const headerItems = document.querySelectorAll('.header-item');
  const sectionShows = document.querySelectorAll('.sectionShow');

  headerItems.forEach(item => {
    item.addEventListener('click', () => {
      const choice = item.getAttribute('data-choice');
      
      headerItems.forEach(i => i.classList.remove('active'));
      sectionShows.forEach(s => s.classList.remove('active'));
      
      item.classList.add('active');
      
      sectionShows.forEach(section => {
        if (section.id === choice) {
          section.classList.add('active');
        }
      });
    });
  });
});


// КНОПКИ 1-ГО УРОВНЯ

document.addEventListener('DOMContentLoaded', () => {
  // БЛОКИРОВКА НА МОБИЛЬНЫХ
  // const isMobile = window.innerWidth <= 767;
  // if (isMobile) return;

  const sections = ['includes', 'stages', 'showcase', 'price'];
  const activeStates = {
    includes: 'Seo',
    stages: 'Call', 
    showcase: 'case-1',
    price: 'priceHtml'
  };

  sections.forEach(sectionId => {
    const section = document.getElementById(sectionId);
    if (!section) return;
    
    const buttons = section.querySelectorAll('.button-lvl1');
    const containers = section.querySelectorAll('.container-lvl1');
    const bg = section.querySelector('.buttons-lvl1__bg');
    
    // Устанавливаем начальное активное состояние из памяти
    const activeChoice = activeStates[sectionId];
    
    // Позиционируем bg под активную кнопку при загрузке
    updateBgPosition(bg, buttons, activeChoice);
    
    buttons.forEach(button => {
      if (button.getAttribute('dataChoice') === activeChoice) {
        button.classList.add('active');
      }
      
      button.addEventListener('click', () => {
        const choice = button.getAttribute('dataChoice');
        
        // Обновляем память
        activeStates[sectionId] = choice;
        
        buttons.forEach(btn => btn.classList.remove('active'));
        containers.forEach(container => container.classList.remove('active'));
        
        button.classList.add('active');
        
        // Позиционируем bg под нажатую кнопку
        updateBgPosition(bg, buttons, choice);
        
        containers.forEach(container => {
          if (container.id === choice) {
            container.classList.add('active');
          }
        });
      });
    });
    
    // Активируем соответствующий контейнер
    containers.forEach(container => {
      if (container.id === activeChoice) {
        container.classList.add('active');
      }
    });
  });

  function updateBgPosition(bg, buttons, activeChoice) {
    if (!bg) return;
    
    buttons.forEach(button => {
      if (button.getAttribute('dataChoice') === activeChoice) {
        const buttonRect = button.getBoundingClientRect();
        const parentRect = button.parentElement.getBoundingClientRect();
        
        bg.style.width = `${buttonRect.width}px`;
        bg.style.height = `${buttonRect.height}px`;
        bg.style.left = `${buttonRect.left - parentRect.left}px`;
      }
    });
  }
});


// КНОПКИ 2-ГО УРОВНЯ

document.addEventListener('DOMContentLoaded', () => {
  // БЛОКИРОВКА НА МОБИЛЬНЫХ
  // const isMobile = window.innerWidth <= 767;
  // if (isMobile) return;

  // Объект для запоминания активных состояний кнопок и контейнеров 2 уровня
  // Структура: { containerLvl1Id: activeButtonLvl2Id }
  const activeStatesLvl2 = {};

  // Находим все контейнеры 1 уровня
  const containersLvl1 = document.querySelectorAll('.container-lvl1');
  
  containersLvl1.forEach(containerLvl1 => {
    const containerLvl1Id = containerLvl1.id;
    
    // Находим элементы 2 уровня внутри каждого контейнера 1 уровня
    const buttonsLvl2 = containerLvl1.querySelectorAll('.button-lvl2');
    const containersLvl2 = containerLvl1.querySelectorAll('.container-lvl2');
    const bgLvl2 = containerLvl1.querySelector('.buttons-lvl2__bg');
    
    // Инициализируем память для этого контейнера, если еще нет
    if (!activeStatesLvl2[containerLvl1Id]) {
      const firstButton = buttonsLvl2[0];
      activeStatesLvl2[containerLvl1Id] = firstButton ? firstButton.getAttribute('dataChoice') : '';
    }
    
    const activeChoiceLvl2 = activeStatesLvl2[containerLvl1Id];
    
    // Позиционируем bg под активную кнопку 2 уровня
    if (bgLvl2 && activeChoiceLvl2) {
      updateBgPosition(bgLvl2, buttonsLvl2, activeChoiceLvl2);
    }
    
    // Устанавливаем начальные активные состояния
    buttonsLvl2.forEach(button => {
      if (button.getAttribute('dataChoice') === activeChoiceLvl2) {
        button.classList.add('active');
      }
    });
    
    containersLvl2.forEach(container => {
      if (container.id === activeChoiceLvl2) {
        container.classList.add('active');
      }
    });
    
    // Обработчики кликов для кнопок 2 уровня
    buttonsLvl2.forEach(button => {
      button.addEventListener('click', () => {
        const choice = button.getAttribute('dataChoice');
        
        // Обновляем память для этого контейнера 1 уровня
        activeStatesLvl2[containerLvl1Id] = choice;
        
        // Убираем active у всех кнопок и контейнеров 2 уровня в этом контейнере
        buttonsLvl2.forEach(btn => btn.classList.remove('active'));
        containersLvl2.forEach(container => container.classList.remove('active'));
        
        // Добавляем active к нажатой кнопке и соответствующему контейнеру
        button.classList.add('active');
        
        // Позиционируем bg под нажатую кнопку 2 уровня
        if (bgLvl2) {
          updateBgPosition(bgLvl2, buttonsLvl2, choice);
        }
        
        // Активируем соответствующий контейнер 2 уровня
        containersLvl2.forEach(container => {
          if (container.id === choice) {
            container.classList.add('active');
          }
        });
      });
    });
  });

  function updateBgPosition(bg, buttons, activeChoice) {
    buttons.forEach(button => {
      if (button.getAttribute('dataChoice') === activeChoice) {
        // Используем offsetLeft для позиции относительно родителя
        const buttonLeft = button.offsetLeft;
        const buttonWidth = button.offsetWidth;
        
        bg.style.width = `${buttonWidth}px`;
        bg.style.height = `${button.offsetHeight}px`;
        bg.style.left = `${buttonLeft}px`; // ← напрямую offsetLeft
      }
    });
  }
});


// ОСНОВНАЯ ФУНКЦИЯ СКРОЛЛА

document.addEventListener('DOMContentLoaded', () => {
  // БЛОКИРОВКА НА МОБИЛЬНЫХ
  const isMobile = window.innerWidth <= 767;
  
  const sections = ['includes', 'stages', 'showcase', 'price'];
  let currentSectionIndex = 0;
  let currentButtonLvl1Index = {};
  let currentButtonLvl2Index = {};
  
  // Переменные для обработки свайпов
  let touchStartX = 0;
  let touchStartY = 0;
  let touchEndX = 0;
  let touchEndY = 0;
  const minSwipeDistance = 10; // Минимальная дистанция свайпа
  
  // === ИЗМЕНЕННАЯ ФУНКЦИЯ ДЛЯ ПРОВЕРКИ ВИДИМОСТИ ===
  // На мобильных устройствах всегда возвращает false, чтобы не было центрирования
  function isContainerFullyVisible() {
    if (window.innerWidth <= 767) {
      return false; // На мобильных не центрируем
    }
    
    // Десктопная логика (оставляем как было)
    const sectionContainer = document.querySelector('.sectionShow-container');
    if (!sectionContainer) return false;
    
    const containerRect = sectionContainer.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    
    // Вычисляем видимую высоту контейнера
    const visibleHeight = Math.min(containerRect.bottom, viewportHeight) - Math.max(containerRect.top, 0);
    const containerHeight = containerRect.height;
    
    // Контейнер считается видимым, если видно 50% или больше
    return (visibleHeight / containerHeight) >= 0.5;
  }
  
  // === НОВАЯ ФУНКЦИЯ ДЛЯ ПРОВЕРКИ ВИДИМОСТИ ДЛЯ СВАЙПОВ ===
  // Используется только для мобильных устройств
  function isContainerVisibleForMobile() {
    // Только для мобильных
    if (window.innerWidth > 767) return isContainerFullyVisible();
    
    const sectionContainer = document.querySelector('.sectionShow-container');
    if (!sectionContainer) return false;
    
    const containerRect = sectionContainer.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    
    // Проверяем, находится ли контейнер хотя бы частично в области просмотра
    const isVerticallyVisible = (
      containerRect.top <= viewportHeight && 
      containerRect.bottom >= 0
    );
    
    // Для горизонтальных свайпов проверяем горизонтальную видимость
    const viewportWidth = window.innerWidth;
    const isHorizontallyVisible = (
      containerRect.left <= viewportWidth && 
      containerRect.right >= 0
    );
    
    return isVerticallyVisible && isHorizontallyVisible;
  }
  
  // Функция для проверки, достигнута ли КРАЙНЯЯ ВПЕРЕД позиция (последняя)
  function isAtLastExtremePosition() {
    const isVisible = isContainerFullyVisible();
    if (!isVisible) return false;
    
    updateCurrentIndices();
    
    const currentSectionId = sections[currentSectionIndex];
    const section = document.getElementById(currentSectionId);
    if (!section) return false;
    
    const buttonsLvl1 = section.querySelectorAll('.button-lvl1');
    if (buttonsLvl1.length === 0) return false;
    
    const currentLvl1Index = currentButtonLvl1Index[currentSectionId];
    const currentButtonLvl1 = buttonsLvl1[currentLvl1Index];
    const currentContainerId = currentButtonLvl1.getAttribute('dataChoice');
    const currentContainer = document.getElementById(currentContainerId);
    
    if (!currentContainer) return false;
    
    const buttonsLvl2 = currentContainer.querySelectorAll('.button-lvl2');
    const currentLvl2Index = currentButtonLvl2Index[currentContainerId] || 0;
    
    // Последняя секция?
    const isLastSection = currentSectionIndex === sections.length - 1;
    
    // Последняя кнопка 1 уровня в этой секции?
    const isLastButtonLvl1 = currentLvl1Index === buttonsLvl1.length - 1;
    
    // Последняя кнопка 2 уровня в текущем контейнере?
    const isLastButtonLvl2 = buttonsLvl2.length === 0 || 
                            currentLvl2Index === buttonsLvl2.length - 1;
    
    return isLastSection && isLastButtonLvl1 && isLastButtonLvl2;
  }
  
  // Функция для проверки, достигнута ли ПЕРВАЯ позиция
  function isAtFirstPosition() {
    const isVisible = isContainerFullyVisible();
    if (!isVisible) return false;
    
    updateCurrentIndices();
    
    const currentSectionId = sections[currentSectionIndex];
    const section = document.getElementById(currentSectionId);
    if (!section) return false;
    
    const buttonsLvl1 = section.querySelectorAll('.button-lvl1');
    if (buttonsLvl1.length === 0) return false;
    
    const currentLvl1Index = currentButtonLvl1Index[currentSectionId];
    const currentButtonLvl1 = buttonsLvl1[currentLvl1Index];
    const currentContainerId = currentButtonLvl1.getAttribute('dataChoice');
    const currentContainer = document.getElementById(currentContainerId);
    
    if (!currentContainer) return false;
    
    const buttonsLvl2 = currentContainer.querySelectorAll('.button-lvl2');
    const currentLvl2Index = currentButtonLvl2Index[currentContainerId] || 0;
    
    // Первая секция?
    const isFirstSection = currentSectionIndex === 0;
    
    // Первая кнопка 1 уровня в этой секции?
    const isFirstButtonLvl1 = currentLvl1Index === 0;
    
    // Первая кнопка 2 уровня в текущем контейнере?
    const isFirstButtonLvl2 = currentLvl2Index === 0;
    
    return isFirstSection && isFirstButtonLvl1 && isFirstButtonLvl2;
  }
  
  // Функция для обновления текущих индексов на основе активных элементов
  function updateCurrentIndices() {
    // Находим активную секцию
    const activeSection = document.querySelector('.sectionShow.active');
    if (activeSection) {
      const sectionId = activeSection.id;
      currentSectionIndex = sections.indexOf(sectionId);
      
      // Находим активную кнопку 1 уровня в этой секции
      const buttonsLvl1 = activeSection.querySelectorAll('.button-lvl1');
      let activeLvl1Index = 0;
      
      buttonsLvl1.forEach((button, index) => {
        if (button.classList.contains('active')) {
          activeLvl1Index = index;
          currentButtonLvl1Index[sectionId] = index;
          
          // Находим активный контейнер 1 уровня
          const containerId = button.getAttribute('dataChoice');
          const container = document.getElementById(containerId);
          
          if (container) {
            // Находим активную кнопку 2 уровня в этом контейнере
            const buttonsLvl2 = container.querySelectorAll('.button-lvl2');
            let activeLvl2Index = 0;
            
            buttonsLvl2.forEach((btnLvl2, idx) => {
              if (btnLvl2.classList.contains('active')) {
                activeLvl2Index = idx;
                currentButtonLvl2Index[containerId] = idx;
              }
            });
            
            // Если не нашли активную кнопку 2 уровня, ставим первую
            if (buttonsLvl2.length > 0 && currentButtonLvl2Index[containerId] === undefined) {
              currentButtonLvl2Index[containerId] = 0;
            }
          }
        }
      });
      
      // Если не нашли активную кнопку 1 уровня, ставим первую
      if (buttonsLvl1.length > 0 && currentButtonLvl1Index[sectionId] === undefined) {
        currentButtonLvl1Index[sectionId] = 0;
        
        // И первую кнопку 2 уровня в первом контейнере
        const firstButton = buttonsLvl1[0];
        const firstContainerId = firstButton.getAttribute('dataChoice');
        currentButtonLvl2Index[firstContainerId] = 0;
      }
    }
  }
  
  // Функция для навигации (общая для всех типов управления)
  function navigate(direction, inputType = 'wheel') {
    // inputType: 'wheel', 'arrowUpDown', 'arrowLeftRight', 'space', 'swipe'
    
    // === ИЗМЕНЕНИЕ: Для мобильных используем другую проверку видимости ===
    let isVisible;
    if (inputType === 'swipe') {
      // Для свайпов на мобильных используем специальную функцию
      isVisible = isContainerVisibleForMobile();
    } else {
      isVisible = isContainerFullyVisible();
    }
    
    // Определяем, разрешен ли скролл страницы для этого типа ввода
    const allowPageScroll = inputType === 'wheel' || inputType === 'arrowUpDown' || inputType === 'space';
    
    // Если sectionShow-container НЕ виден
    if (!isVisible) {
      // И это не стрелки влево/вправо и не свайпы - делаем обычный скролл
      if (inputType !== 'arrowLeftRight' && inputType !== 'swipe') {
        const currentScroll = window.pageYOffset;
        const viewportHeight = window.innerHeight;
        if (direction > 0) {
          window.scrollTo({ top: currentScroll + viewportHeight, behavior: 'smooth' });
        } else {
          window.scrollTo({ top: currentScroll - viewportHeight, behavior: 'smooth' });
        }
      }
      return;
    }
    
    // Если sectionShow-container не виден И это стрелки влево/вправо или свайпы
    if (!isVisible && (inputType === 'arrowLeftRight' || inputType === 'swipe')) {
      return; // Ничего не делаем
    }
    
    // Проверяем, достигнута ли КРАЙНЯЯ ВПЕРЕД позиция (только для движения вперед)
    if (direction > 0 && isAtLastExtremePosition()) {
      // Движение ВПЕРЕД на крайней позиции - ничего не делаем
      return;
    }
    
    // Если sectionShow-container виден - навигация по кнопкам
    // ОБНОВЛЯЕМ текущие индексы перед навигацией
    updateCurrentIndices();
    
    const currentSectionId = sections[currentSectionIndex];
    const section = document.getElementById(currentSectionId);
    
    if (!section) return;
    
    // Все кнопки 1 уровня в текущей секции
    const buttonsLvl1 = section.querySelectorAll('.button-lvl1');
    if (buttonsLvl1.length === 0) return;
    
    const currentLvl1Index = currentButtonLvl1Index[currentSectionId];
    const currentButtonLvl1 = buttonsLvl1[currentLvl1Index];
    const currentContainerId = currentButtonLvl1.getAttribute('dataChoice');
    const currentContainer = document.getElementById(currentContainerId);
    
    if (!currentContainer) return;
    
    // Все кнопки 2 уровня в текущем контейнере
    const buttonsLvl2 = currentContainer.querySelectorAll('.button-lvl2');
    const currentLvl2Index = currentButtonLvl2Index[currentContainerId] || 0;
    
    if (direction > 0) { // ДВИЖЕНИЕ ВПЕРЕД (вниз/вправо)
      // 1. Проверяем кнопки 2 уровня
      if (buttonsLvl2.length > 0 && currentLvl2Index < buttonsLvl2.length - 1) {
        // Есть следующая кнопка 2 уровня - переключаем на нее
        currentButtonLvl2Index[currentContainerId] = currentLvl2Index + 1;
        buttonsLvl2[currentLvl2Index + 1].click();
        return;
      }
      
      // 2. Достигли последней кнопки 2 уровня - переключаем кнопку 1 уровня
      if (currentLvl1Index < buttonsLvl1.length - 1) {
        // Переключаем на следующую кнопку 1 уровня
        currentButtonLvl1Index[currentSectionId] = currentLvl1Index + 1;
        const nextButtonLvl1 = buttonsLvl1[currentLvl1Index + 1];
        const nextContainerId = nextButtonLvl1.getAttribute('dataChoice');
        
        // Сбрасываем индекс кнопок 2 уровня для нового контейнера
        currentButtonLvl2Index[nextContainerId] = 0;
        
        nextButtonLvl1.click();
        return;
      }
      
      // 3. Достигли последней кнопки 1 уровня - переключаем секцию
      if (currentSectionIndex < sections.length - 1) {
        // Переключаем на следующую секцию
        currentSectionIndex++;
        const nextSectionId = sections[currentSectionIndex];
        
        // ОБНОВЛЯЕМ активные элементы для новой секции
        updateCurrentIndices();
        
        // Находим и кликаем header-item для новой секции
        const headerItem = document.querySelector(`[data-choice="${nextSectionId}"]`);
        if (headerItem) {
          headerItem.click();
        }
        return;
      }
      
      // 4. Достигли последней секции - ничего не делаем (уже проверено в isAtLastExtremePosition)
      
    } else { // ДВИЖЕНИЕ НАЗАД (вверх/влево)
      // 1. Проверяем кнопки 2 уровня
      if (buttonsLvl2.length > 0 && currentLvl2Index > 0) {
        // Есть предыдущая кнопка 2 уровня - переключаем на нее
        currentButtonLvl2Index[currentContainerId] = currentLvl2Index - 1;
        buttonsLvl2[currentLvl2Index - 1].click();
        return;
      }
      
      // 2. Первая кнопка 2 уровня - переключаем на предыдущую кнопку 1 уровня
      if (currentLvl1Index > 0) {
        // Переключаем на предыдущую кнопку 1 уровня
        currentButtonLvl1Index[currentSectionId] = currentLvl1Index - 1;
        const prevButtonLvl1 = buttonsLvl1[currentLvl1Index - 1];
        const prevContainerId = prevButtonLvl1.getAttribute('dataChoice');
        const prevContainer = document.getElementById(prevContainerId);
        
        if (prevContainer) {
          // Устанавливаем индекс на последнюю кнопку 2 уровня предыдущего контейнера
          const prevButtonsLvl2 = prevContainer.querySelectorAll('.button-lvl2');
          currentButtonLvl2Index[prevContainerId] = prevButtonsLvl2.length - 1;
        }
        
        prevButtonLvl1.click();
        return;
      }
      
      // 3. Первая кнопка 1 уровня - переключаем на предыдущую секцию
      if (currentSectionIndex > 0) {
        // Переключаем на предыдущую секцию
        currentSectionIndex--;
        const prevSectionId = sections[currentSectionIndex];
        
        // ОБНОВЛЯЕМ активные элементы для предыдущей секции
        updateCurrentIndices();
        
        // Находим и кликаем header-item для предыдущей секции
        const prevHeaderItem = document.querySelector(`[data-choice="${prevSectionId}"]`);
        if (prevHeaderItem) {
          prevHeaderItem.click();
        }
        return;
      }
      
      // 4. Первая секция, первая кнопка 1 уровня, первая кнопка 2 уровня
      // Только если разрешен скролл страницы - проверяем, можем ли скроллить выше к секции home
      if (allowPageScroll) {
        const currentScroll = window.pageYOffset;
        const viewportHeight = window.innerHeight;
        const homeSection = document.getElementById('home');
        if (homeSection) {
          const homeRect = homeSection.getBoundingClientRect();
          
          // Если home секция не видна полностью - скроллим к ней
          if (homeRect.top > 0 || homeRect.bottom < viewportHeight) {
            window.scrollTo({ top: currentScroll - viewportHeight, behavior: 'smooth' });
            return;
          }
        }
        
        // Если home секция уже видна - скроллим на 100vh вверх
        window.scrollTo({ top: currentScroll - viewportHeight, behavior: 'smooth' });
        return;
      }
      
      // Если это стрелки влево/вправо или свайпы и мы на первой позиции - ничего не делаем
      // (остаемся на месте)
    }
  }
  
  // Функция обработки свайпов
  function handleSwipe() {
    // Вычисляем дистанцию по горизонтали и вертикали
    const deltaX = touchEndX - touchStartX;
    const deltaY = touchEndY - touchStartY;
    
    // Проверяем, что это горизонтальный свайп (горизонтальное движение больше вертикального)
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > minSwipeDistance) {
      // Определяем направление
      const direction = deltaX > 0 ? 1 : -1; // Вправо = вперед, Влево = назад
      
      // === ИЗМЕНЕНИЕ: Для свайпов используем отдельную проверку видимости ===
      const isVisible = isContainerVisibleForMobile();
      
      // Если контейнер не виден - ничего не делаем
      if (!isVisible) return;
      
      // Выполняем навигацию по горизонтальным свайпам
      navigate(-direction, 'swipe'); // Инвертируем направление: свайп вправо = движение вперед
    }
  }
  
  // Инициализируем индексы при загрузке
  updateCurrentIndices();
  
  // 1. ОБРАБОТКА СКРОЛЛА КОЛЕСОМ
  document.addEventListener('wheel', function(e) {
    e.preventDefault();
    const direction = e.deltaY > 0 ? 1 : -1;
    navigate(direction, 'wheel');
  }, { passive: false });
  
  // 2. ОБРАБОТКА КЛАВИШ
  document.addEventListener('keydown', function(e) {
    // === ИЗМЕНЕНИЕ: Для стрелок влево/вправо на мобильных используем другую проверку ===
    const isVisibleForArrows = isContainerFullyVisible(); // Для десктопа
    const isMobileForArrows = window.innerWidth <= 767;
    
    // Стрелка ВНИЗ (40) - движение вперед
    if (e.keyCode === 40 && 
        e.target.tagName !== 'INPUT' && 
        e.target.tagName !== 'TEXTAREA') {
      e.preventDefault();
      navigate(1, 'arrowUpDown');
    }
    
    // ПРОБЕЛ без Shift (32) - движение вперед
    if (e.keyCode === 32 && !e.shiftKey && 
        e.target.tagName !== 'INPUT' && 
        e.target.tagName !== 'TEXTAREA') {
      e.preventDefault();
      navigate(1, 'space');
    }
    
    // Стрелка ВВЕРХ (38) - движение назад
    if (e.keyCode === 38 && 
        e.target.tagName !== 'INPUT' && 
        e.target.tagName !== 'TEXTAREA') {
      e.preventDefault();
      navigate(-1, 'arrowUpDown');
    }
    
    // SHIFT+ПРОБЕЛ (32 с Shift) - движение назад
    if (e.keyCode === 32 && e.shiftKey && 
        e.target.tagName !== 'INPUT' && 
        e.target.tagName !== 'TEXTAREA') {
      e.preventDefault();
      navigate(-1, 'space');
    }
    
    // Стрелка ВПРАВО (39) - движение вперед
    // На мобильных стрелки не работают для навигации внутри контейнера
    if (e.keyCode === 39 && 
        e.target.tagName !== 'INPUT' && 
        e.target.tagName !== 'TEXTAREA') {
      e.preventDefault();
      // На мобильных стрелки влево/вправо не обрабатываем внутри контейнера
      if (isMobileForArrows) return;
      
      // Если контейнер не виден - ничего не делаем
      if (!isVisibleForArrows) return;
      navigate(1, 'arrowLeftRight');
    }
    
    // Стрелка ВЛЕВО (37) - движение назад
    // На мобильных стрелки не работают для навигации внутри контейнера
    if (e.keyCode === 37 && 
        e.target.tagName !== 'INPUT' && 
        e.target.tagName !== 'TEXTAREA') {
      e.preventDefault();
      // На мобильных стрелки влево/вправо не обрабатываем внутри контейнера
      if (isMobileForArrows) return;
      
      // Если контейнер не виден - ничего не делаем
      if (!isVisibleForArrows) return;
      navigate(-1, 'arrowLeftRight');
    }
  });
  
	// 3. ОБРАБОТКА СВАЙПОВ ТОЛЬКО НА МОБИЛЬНЫХ
	if (isMobile) {
		// Флаг для отслеживания начала касания в навигационных элементах
		let isTouchInNavigation = false;
		
		// Обработка начала касания
		document.addEventListener('touchstart', function(e) {
			touchStartX = e.changedTouches[0].screenX;
			touchStartY = e.changedTouches[0].screenY;
			
			// Проверяем, началось ли касание в элементах header-menu, buttons-lvl1, buttons-lvl2
			const targetElement = e.target;
			const targetClass = targetElement.className || '';
			
			// Проверяем только конкретные классы, которые вы просили
			if (targetClass.includes('header-item') || 
					targetClass.includes('button-lvl1') || 
					targetClass.includes('button-lvl2')) {
				isTouchInNavigation = true;
			} else {
				isTouchInNavigation = false;
			}
			
		}, { passive: true });
		
		// Обработка окончания касания
		document.addEventListener('touchend', function(e) {
			touchEndX = e.changedTouches[0].screenX;
			touchEndY = e.changedTouches[0].screenY;
			
			// Не обрабатываем свайп, если касание началось в навигационном элементе
			if (isTouchInNavigation) {
				return;
			}
			
			handleSwipe();
		}, { passive: true });
		
		// Обработка движения при касании
		document.addEventListener('touchmove', function(e) {
			// Не предотвращаем скролл, если касание началось в навигационном элементе
			if (isTouchInNavigation) {
				return;
			}
			
			// Проверяем, находимся ли мы внутри sectionShow-container
			const sectionContainer = document.querySelector('.sectionShow-container');
			if (!sectionContainer) return;
			
			const containerRect = sectionContainer.getBoundingClientRect();
			const touch = e.changedTouches[0];
			
			// Если касание внутри видимой области контейнера
			if (containerRect.top <= window.innerHeight && 
					containerRect.bottom >= 0 &&
					touch.clientX >= containerRect.left && 
					touch.clientX <= containerRect.right &&
					touch.clientY >= containerRect.top && 
					touch.clientY <= containerContainerRect.bottom) {
				
				// Вычисляем горизонтальное и вертикальное движение
				const deltaX = Math.abs(touch.screenX - touchStartX);
				const deltaY = Math.abs(touch.screenY - touchStartY);
				
				// Если горизонтальное движение значительное, предотвращаем вертикальный скролл
				if (deltaX > deltaY && deltaX > minSwipeDistance) {
					e.preventDefault();
				}
			}
		}, { passive: false });
	}

	// 4. ПРОКРУТКА HEADER-MENU К ВЫБРАННОЙ HEADER-ITEM НА МОБИЛЬНЫХ
	if (isMobile) {
		// Функция для прокрутки header-menu к активному элементу
		function scrollHeaderMenuToActive() {
			const headerMenu = document.querySelector('.header-menu');
			const activeHeaderItem = document.querySelector('.header-item.active');
			
			if (headerMenu && activeHeaderItem) {
				// Получаем координаты элемента относительно контейнера
				const menuRect = headerMenu.getBoundingClientRect();
				const itemRect = activeHeaderItem.getBoundingClientRect();
				
				// Вычисляем смещение для центрирования элемента
				const scrollLeft = activeHeaderItem.offsetLeft - (headerMenu.offsetWidth / 2) + (activeHeaderItem.offsetWidth / 2);
				
				// Прокручиваем с плавной анимацией
				headerMenu.scrollTo({
					left: scrollLeft,
					behavior: 'smooth'
				});
			}
		}
		
		// Слушаем клики на header-item и прокручиваем к ним
		document.addEventListener('click', function(e) {
			const target = e.target;
			const isHeaderItem = target.classList.contains('header-item') || 
													target.closest('.header-item');
			
			if (isHeaderItem) {
				// Небольшая задержка, чтобы дать время на добавление класса active
				setTimeout(scrollHeaderMenuToActive, 100);
			}
		});
		
		// Также прокручиваем при загрузке страницы, если есть активный элемент
		window.addEventListener('load', scrollHeaderMenuToActive);
		document.addEventListener('DOMContentLoaded', scrollHeaderMenuToActive);
	}

	// 5. ПРОКРУТКА BUTTONS-LVL2 К ВЫБРАННОЙ BUTTON-LVL2 НА МОБИЛЬНЫХ
	if (isMobile) {
		// Функция для прокрутки контейнера buttons-lvl2 к активному элементу
		function scrollButtonsLvl2ToActive() {
			// Находим ВСЕ контейнеры buttons-lvl2 на странице
			const allButtonsLvl2Containers = document.querySelectorAll('.buttons-lvl2');
			
			// Для каждого контейнера проверяем, есть ли в нем активная кнопка
			allButtonsLvl2Containers.forEach(buttonsLvl2Container => {
				const activeButtonLvl2 = buttonsLvl2Container.querySelector('.button-lvl2.active');
				
				if (activeButtonLvl2) {
					// Получаем позиции и размеры
					const buttonLeft = activeButtonLvl2.offsetLeft;
					const buttonWidth = activeButtonLvl2.offsetWidth;
					const containerWidth = buttonsLvl2Container.offsetWidth;
					const currentScrollLeft = buttonsLvl2Container.scrollLeft;
					
					// Определяем видимость кнопки с учетом отступов 4px
					const isButtonFullyVisible = (buttonLeft + 4) >= currentScrollLeft && 
																			(buttonLeft + buttonWidth - 4) <= (currentScrollLeft + containerWidth);
					
					// Если кнопка уже полностью видна с отступами - ничего не делаем
					if (isButtonFullyVisible) {
						return;
					}
					
					// Определяем, какая часть кнопки не видна
					const buttonRightInView = buttonLeft + buttonWidth;
					const visibleRight = currentScrollLeft + containerWidth;
					
					// Если часть кнопки справа за пределами видимой области
					if (buttonRightInView > visibleRight) {
						// Прокручиваем так, чтобы активная кнопка оказалась справа с отступом 4px
						const scrollLeft = buttonLeft + buttonWidth - containerWidth + 4;
						const finalScrollLeft = Math.max(0, scrollLeft);
						
						buttonsLvl2Container.scrollTo({
							left: finalScrollLeft,
							behavior: 'smooth'
						});
					} 
					// Если часть кнопки слева за пределами видимой области
					else if (buttonLeft < currentScrollLeft) {
						// Прокручиваем так, чтобы активная кнопка оказалась слева с отступом 4px
						buttonsLvl2Container.scrollTo({
							left: buttonLeft - 4,
							behavior: 'smooth'
						});
					}
				}
			});
		}
		
		// Слушаем клики на button-lvl2 и прокручиваем к ним
		document.addEventListener('click', function(e) {
			const target = e.target;
			const isButtonLvl2 = target.classList.contains('button-lvl2') || 
													target.closest('.button-lvl2');
			
			if (isButtonLvl2) {
				// Небольшая задержка, чтобы дать время на добавление класса active
				setTimeout(scrollButtonsLvl2ToActive, 100);
			}
		});
		
		// Также прокручиваем при клике на button-lvl1 (при смене контейнера)
		document.addEventListener('click', function(e) {
			const target = e.target;
			const isButtonLvl1 = target.classList.contains('button-lvl1') || 
													target.closest('.button-lvl1');
			
			if (isButtonLvl1) {
				// Задержка побольше, так как меняется контейнер
				setTimeout(scrollButtonsLvl2ToActive, 300);
			}
		});
		
		// Прокручиваем при загрузке страницы
		window.addEventListener('load', scrollButtonsLvl2ToActive);
		document.addEventListener('DOMContentLoaded', scrollButtonsLvl2ToActive);
	}
});


// АВТОМАТИЧЕСКИЙ СКРОЛЛ К ТОП 0

document.addEventListener('DOMContentLoaded', () => {
  /**
   * Автоматически скроллит секцию sectionShow-container к позиции top: 0
   * Работает независимо от других функций
   * @param {boolean} smooth - Плавная анимация скролла (по умолчанию true)
   */
  function centerSectionShowContainer(smooth = true) {
    const sectionContainer = document.querySelector('.sectionShow-container');
    if (!sectionContainer) return;
    
    const absoluteTop = sectionContainer.getBoundingClientRect().top + window.pageYOffset;
    
    window.scrollTo({
      top: absoluteTop,
      behavior: smooth ? 'smooth' : 'auto'
    });
  }

  /**
   * Проверяет видимость и центрирует при необходимости
   * @param {number} thresholdPx - На сколько пикселей можно отклониться от верха
   */
  function autoCenterIfNotAtTop(thresholdPx = 10) {
    const sectionContainer = document.querySelector('.sectionShow-container');
    if (!sectionContainer) return false;
    
    const currentTop = sectionContainer.getBoundingClientRect().top;
    
    if (Math.abs(currentTop) > thresholdPx) {
      centerSectionShowContainer(true);
      return true;
    }
    return false;
  }

  // Система отслеживания изменений видимого контента
  function initContentChangeCentering() {
    let isProcessing = false;
    let lastContentHash = '';
    
    // Функция для получения "отпечатка" видимого контента
    function getVisibleContentHash() {
      const sectionContainer = document.querySelector('.sectionShow-container');
      if (!sectionContainer) return '';
      
      let hash = '';
      
      const activeSection = document.querySelector('.sectionShow.active');
      if (activeSection) {
        hash += activeSection.id + '|';
      }
      
      const activeButtonsLvl1 = document.querySelectorAll('.button-lvl1.active');
      activeButtonsLvl1.forEach(btn => {
        hash += btn.getAttribute('dataChoice') + '|';
      });
      
      const activeContainersLvl1 = document.querySelectorAll('.container-lvl1.active');
      activeContainersLvl1.forEach(container => {
        hash += container.id + '|';
      });
      
      const activeButtonsLvl2 = document.querySelectorAll('.button-lvl2.active');
      activeButtonsLvl2.forEach(btn => {
        hash += btn.getAttribute('dataChoice') + '|';
      });
      
      const activeContainersLvl2 = document.querySelectorAll('.container-lvl2.active');
      activeContainersLvl2.forEach(container => {
        hash += container.id + '|';
      });
      
      return hash;
    }
    
    // Проверка изменений и центрирование
    function checkAndCenterOnChange() {
      if (isProcessing) return;
      
      const currentHash = getVisibleContentHash();
      
      if (currentHash !== lastContentHash) {
        isProcessing = true;
        lastContentHash = currentHash;
        
        setTimeout(() => {
          autoCenterIfNotAtTop(10);
          isProcessing = false;
        }, 50);
      }
    }
    
    // Отслеживание изменений DOM через MutationObserver
    function initMutationObserver() {
      const observer = new MutationObserver(() => {
        checkAndCenterOnChange();
      });
      
      const sectionContainer = document.querySelector('.sectionShow-container');
      if (sectionContainer) {
        observer.observe(sectionContainer, {
          childList: true,
          subtree: true,
          attributes: true,
          attributeFilter: ['class', 'id', 'style']
        });
      }
      
      return observer;
    }
    
    // Отслеживание кликов для быстрого реагирования
    function initClickHandler() {
      document.addEventListener('click', (e) => {
        const target = e.target;
        if (target.closest('.header-item, .button-lvl1, .button-lvl2')) {
          setTimeout(() => {
            checkAndCenterOnChange();
          }, 100);
        }
      }, { passive: true });
    }
    
    // Инициализация начального состояния
    lastContentHash = getVisibleContentHash();
    
    // Запускаем все системы отслеживания
    const observer = initMutationObserver();
    initClickHandler();
    
    return {
      stop: () => {
        if (observer) observer.disconnect();
        clearInterval(intervalId);
        document.removeEventListener('click', initClickHandler);
      },
      forceCenter: () => centerSectionShowContainer(true),
      forceCheck: () => checkAndCenterOnChange()
    };
  }

  // Автоматическая инициализация
  setTimeout(() => {
    const centeringSystem = initContentChangeCentering();
    window.sectionCentering = centeringSystem;
  }, 500);
});


// УПРАВЛЕНИЕ URL ХЭШАМИ ДЛЯ ВСЕХ УРОВНЕЙ С ПРОВЕРКОЙ ВИДИМОСТИ

document.addEventListener('DOMContentLoaded', () => {
  // ФУНКЦИЯ ПРОВЕРКИ ВИДИМОСТИ SECTIONSHOW-CONTAINER
  function isSectionContainerVisible() {
    const sectionContainer = document.querySelector('.sectionShow-container');
    if (!sectionContainer) return false;
    
    const containerRect = sectionContainer.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    
    const visibleHeight = Math.min(containerRect.bottom, viewportHeight) - Math.max(containerRect.top, 0);
    const containerHeight = containerRect.height;
    
    return (visibleHeight / containerHeight) >= 0.5;
  }
  
  // ФУНКЦИЯ ДЛЯ ПОЛУЧЕНИЯ ПОЛНОГО СОСТОЯНИЯ
  function getCurrentState() {
    const activeSection = document.querySelector('.sectionShow.active');
    const activeButtonLvl1 = activeSection ? activeSection.querySelector('.button-lvl1.active') : null;
    const activeContainerLvl1 = activeSection ? activeSection.querySelector('.container-lvl1.active') : null;
    const activeButtonLvl2 = activeContainerLvl1 ? activeContainerLvl1.querySelector('.button-lvl2.active') : null;
    
    return {
      section: activeSection ? activeSection.id : 'includes',
      level1: activeButtonLvl1 ? activeButtonLvl1.getAttribute('dataChoice') : 'Law',
      level2: activeButtonLvl2 ? activeButtonLvl2.getAttribute('dataChoice') : null
    };
  }
  
  // ФУНКЦИЯ ДЛЯ ФОРМИРОВАНИЯ ХЭША ИЗ СОСТОЯНИЯ
  function formatHash(state) {
    // Для showcase используем только один уровень
    if (state.section === 'showcase') {
      return `#${state.section}:${state.level1}`;
    }
    
    // Для остальных секций используем два уровня
    if (state.level2) {
      return `#${state.section}:${state.level1}:${state.level2}`;
    }
    
    return `#${state.section}:${state.level1}`;
  }
  
  // ФУНКЦИЯ ДЛЯ ОБНОВЛЕНИЯ URL С ХЭШЕМ
  function updateURLHash() {
    if (!isSectionContainerVisible()) {
      if (window.location.hash) {
        history.replaceState(null, '', window.location.pathname);
      }
      return;
    }
    
    const state = getCurrentState();
    const hash = formatHash(state);
    
    history.replaceState(null, '', window.location.pathname + hash);
  }
  
  // ФУНКЦИЯ ДЛЯ ПАРСИНГА ХЭША ИЗ URL
  function parseHash() {
    const hash = window.location.hash.substring(1);
    
    if (!hash) return null;
    
    const parts = hash.split(':');
    
    // showcase - только секция и level1
    if (parts[0] === 'showcase' && parts.length === 2) {
      return {
        section: parts[0],
        level1: parts[1],
        level2: null
      };
    }
    
    // Остальные секции - могут быть 2 или 3 части
    if (parts.length === 3) {
      return {
        section: parts[0],
        level1: parts[1],
        level2: parts[2]
      };
    } else if (parts.length === 2) {
      return {
        section: parts[0],
        level1: parts[1],
        level2: null
      };
    }
    
    return null;
  }
  
  // ФУНКЦИЯ ДЛЯ ВОССТАНОВЛЕНИЯ СОСТОЯНИЯ ИЗ ХЭША
  function restoreFromHash() {
    const savedState = parseHash();
    
    if (!savedState) {
      if (isSectionContainerVisible()) {
        applyState({
          section: 'includes',
          level1: 'Law',
          level2: 'Docs'
        });
      }
      return;
    }
    
    const sectionExists = document.getElementById(savedState.section);
    
    if (sectionExists) {
      applyState(savedState);
    }
  }
  
  // ФУНКЦИЯ ДЛЯ ПРИМЕНЕНИЯ СОСТОЯНИЯ К ИНТЕРФЕЙСУ
  function applyState(state) {
    if (!isSectionContainerVisible()) {
      return;
    }
    
    // 1. Активируем секцию
    const targetSection = document.getElementById(state.section);
    if (targetSection) {
      document.querySelectorAll('.sectionShow').forEach(s => s.classList.remove('active'));
      document.querySelectorAll('.header-item').forEach(btn => btn.classList.remove('active'));
      
      targetSection.classList.add('active');
      
      const headerButton = document.querySelector(`[data-choice="${state.section}"]`);
      if (headerButton) {
        headerButton.classList.add('active');
      }
    }
    
    // 2. Активируем кнопку и контейнер 1 уровня
    if (state.level1 && document.getElementById(state.level1)) {
      const targetButtonLvl1 = document.querySelector(`[dataChoice="${state.level1}"]`);
      const targetContainerLvl1 = document.getElementById(state.level1);
      
      if (targetButtonLvl1 && targetContainerLvl1) {
        const activeSection = document.querySelector('.sectionShow.active');
        if (activeSection) {
          activeSection.querySelectorAll('.button-lvl1').forEach(btn => btn.classList.remove('active'));
          activeSection.querySelectorAll('.container-lvl1').forEach(cont => cont.classList.remove('active'));
        }
        
        targetButtonLvl1.classList.add('active');
        targetContainerLvl1.classList.add('active');
        
        updateBgPositionForLevel1();
      }
    }
    
    // 3. Активируем кнопку и контейнер 2 уровня (только если есть и не showcase)
    if (state.section !== 'showcase' && state.level2 && document.getElementById(state.level2)) {
      const targetButtonLvl2 = document.querySelector(`[dataChoice="${state.level2}"]`);
      const targetContainerLvl2 = document.getElementById(state.level2);
      
      if (targetButtonLvl2 && targetContainerLvl2) {
        const activeContainerLvl1 = document.querySelector('.container-lvl1.active');
        if (activeContainerLvl1) {
          activeContainerLvl1.querySelectorAll('.button-lvl2').forEach(btn => btn.classList.remove('active'));
          activeContainerLvl1.querySelectorAll('.container-lvl2').forEach(cont => cont.classList.remove('active'));
        }
        
        targetButtonLvl2.classList.add('active');
        targetContainerLvl2.classList.add('active');
        
        updateBgPositionForLevel2();
      }
    } else if (state.section !== 'showcase') {
      // Для секций с 2 уровнем, но без level2 в хэше - активируем первую кнопку 2 уровня
      const activeContainerLvl1 = document.querySelector('.container-lvl1.active');
      if (activeContainerLvl1) {
        const firstButtonLvl2 = activeContainerLvl1.querySelector('.button-lvl2');
        if (firstButtonLvl2) {
          firstButtonLvl2.click();
        }
      }
    }
    
    setTimeout(updateURLHash, 100);
  }
  
  // ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ
  function updateBgPositionForLevel1() {
    const activeSection = document.querySelector('.sectionShow.active');
    if (!activeSection) return;
    
    const bg = activeSection.querySelector('.buttons-lvl1__bg');
    const buttons = activeSection.querySelectorAll('.button-lvl1');
    const activeButton = activeSection.querySelector('.button-lvl1.active');
    
    if (bg && buttons.length > 0 && activeButton) {
      const buttonLeft = activeButton.offsetLeft;
      const buttonWidth = activeButton.offsetWidth;
      const buttonHeight = activeButton.offsetHeight;
      
      bg.style.width = `${buttonWidth}px`;
      bg.style.height = `${buttonHeight}px`;
      bg.style.left = `${buttonLeft}px`;
    }
  }
  
  function updateBgPositionForLevel2() {
    const activeContainerLvl1 = document.querySelector('.container-lvl1.active');
    if (!activeContainerLvl1) return;
    
    const bg = activeContainerLvl1.querySelector('.buttons-lvl2__bg');
    const buttons = activeContainerLvl1.querySelectorAll('.button-lvl2');
    const activeButton = activeContainerLvl1.querySelector('.button-lvl2.active');
    
    if (bg && buttons.length > 0 && activeButton) {
      const buttonLeft = activeButton.offsetLeft;
      const buttonWidth = activeButton.offsetWidth;
      const buttonHeight = activeButton.offsetHeight;
      
      bg.style.width = `${buttonWidth}px`;
      bg.style.height = `${buttonHeight}px`;
      bg.style.left = `${buttonLeft}px`;
    }
  }
  
  // НАБЛЮДАТЕЛЬ ЗА ИЗМЕНЕНИЯМИ DOM
  function setupMutationObserver() {
    const observer = new MutationObserver(() => {
      setTimeout(updateURLHash, 50);
    });
    
    const sectionContainer = document.querySelector('.sectionShow-container');
    if (sectionContainer) {
      observer.observe(sectionContainer, {
        attributes: true,
        attributeFilter: ['class'],
        subtree: true
      });
    }
    
    return observer;
  }
  
  // ОБРАБОТЧИКИ КЛИКОВ
  function setupClickHandlers() {
    document.addEventListener('click', (e) => {
      if (e.target.closest('.header-item') || 
          e.target.closest('.button-lvl1') || 
          e.target.closest('.button-lvl2')) {
        if (isSectionContainerVisible()) {
          setTimeout(() => {
            updateURLHash();
          }, 50);
        }
      }
    });
  }
  
  // ОБРАБОТЧИК СКРОЛЛА
  function setupScrollHandler() {
    let scrollTimer = null;
    
    window.addEventListener('scroll', () => {
      if (scrollTimer) clearTimeout(scrollTimer);
      
      scrollTimer = setTimeout(() => {
        updateURLHash();
      }, 100);
    }, { passive: true });
  }
  
  // ОБРАБОТЧИК ИЗМЕНЕНИЯ ХЭША
  function setupHashChangeHandler() {
    window.addEventListener('hashchange', () => {
      if (isSectionContainerVisible()) {
        restoreFromHash();
      }
    });
  }
  
  // ИНИЦИАЛИЗАЦИЯ
  function init() {
    const observer = setupMutationObserver();
    setupClickHandlers();
    setupScrollHandler();
    setupHashChangeHandler();
    
    setTimeout(() => {
      updateBgPositionForLevel1();
      updateBgPositionForLevel2();
      updateURLHash();
    }, 300);
  }
  
  init();
});


// ДОПОЛНИТЕЛЬНЫЙ КОД ДЛЯ ЦВЕТА ЛОГОТИПА

document.addEventListener('DOMContentLoaded', () => {
  const showcaseItemGauri = document.querySelector('.showcase-item-gauri');
  const showcaseItemSotik = document.querySelector('.showcase-item-sotik-s');
  const showcaseItemTaskTimer = document.querySelector('.showcase-item__task-timer');
  const showcaseItemObsidianLearning = document.querySelector('.showcase-item__obsidian-learning');
  const showcaseItemStilHouse = document.querySelector('.showcase-item__stilhouse');
  const headerLogo = document.querySelector('.header-logo');
  const buttonFix = document.querySelector('.button-fix');
  const headerMenu = document.querySelector('.header-menu');
  const headerItems = document.querySelectorAll('.header-item');
  const buttonLvl1Showcase = document.querySelectorAll('.button-lvl1__showcase');
  const h2 = document.querySelector('.h2-white');

  // Единая функция для добавления/удаления класса у всех элементов коллекций
  function toggleWhiteClass(add) {
    // Для кнопок showcase
    buttonLvl1Showcase.forEach(button => {
      if (add) {
        button.classList.add('white');
      } else {
        button.classList.remove('white');
      }
    });
    
    // Для элементов хедера
    headerItems.forEach(item => {
      if (add) {
        item.classList.add('white');
      } else {
        item.classList.remove('white');
      }
    });
  }

  // GAURI
  if (showcaseItemGauri) {
    showcaseItemGauri.addEventListener('mouseenter', function() {
      headerLogo.classList.add('white');
      buttonFix.classList.add('white');
      headerMenu.classList.add('white');
      h2.classList.add('white');
      toggleWhiteClass(true);
    });

    showcaseItemGauri.addEventListener('mouseleave', function() {
      headerLogo.classList.remove('white');
      buttonFix.classList.remove('white');
      headerMenu.classList.remove('white');
      h2.classList.remove('white');
      toggleWhiteClass(false);
    });
  }

  // SOTIK S
  if (showcaseItemSotik) {
    showcaseItemSotik.addEventListener('mouseenter', function() {
      headerLogo.classList.add('white');
      buttonFix.classList.add('white');
      headerMenu.classList.add('white');
      h2.classList.add('white');
      toggleWhiteClass(true);
    });

    showcaseItemSotik.addEventListener('mouseleave', function() {
      headerLogo.classList.remove('white');
      buttonFix.classList.remove('white');
      headerMenu.classList.remove('white');
      h2.classList.remove('white');
      toggleWhiteClass(false);
    });
  }

  // TASK TRACKER
  if (showcaseItemTaskTimer) {
    showcaseItemTaskTimer.addEventListener('mouseenter', function() {
      headerLogo.classList.add('white');
      buttonFix.classList.add('white');
      headerMenu.classList.add('white');
      h2.classList.add('white');
      toggleWhiteClass(true);
    });

    showcaseItemTaskTimer.addEventListener('mouseleave', function() {
      headerLogo.classList.remove('white');
      buttonFix.classList.remove('white');
      headerMenu.classList.remove('white');
      h2.classList.remove('white');
      toggleWhiteClass(false);
    });
  }

  // OBSIDIAN LEARNING
  if (showcaseItemObsidianLearning) {
    showcaseItemObsidianLearning.addEventListener('mouseenter', function() {
      headerLogo.classList.add('white');
      buttonFix.classList.add('white');
      headerMenu.classList.add('white');
      h2.classList.add('white');
      toggleWhiteClass(true);
    });

    showcaseItemObsidianLearning.addEventListener('mouseleave', function() {
      headerLogo.classList.remove('white');
      buttonFix.classList.remove('white');
      headerMenu.classList.remove('white');
      h2.classList.remove('white');
      toggleWhiteClass(false);
    });
  }

  // СТИЛЬ ХАУС
  if (showcaseItemStilHouse) {
    showcaseItemStilHouse.addEventListener('mouseenter', function() {
      headerLogo.classList.add('white');
      buttonFix.classList.add('white');
      headerMenu.classList.add('white');
      h2.classList.add('white');
      toggleWhiteClass(true);
    });

    showcaseItemStilHouse.addEventListener('mouseleave', function() {
      headerLogo.classList.remove('white');
      buttonFix.classList.remove('white');
      headerMenu.classList.remove('white');
      h2.classList.remove('white');
      toggleWhiteClass(false);
    });
  }
});