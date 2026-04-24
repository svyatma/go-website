document.addEventListener('DOMContentLoaded', () => {
  // ========== СКРОЛЛ-ЭФФЕКТЫ ==========
  const sections = document.querySelectorAll('.js-section');
  const logo = document.querySelector('.logo');
  const form = document.querySelector('.form');
  const tgButton = document.querySelector('.button--go-to-tg');
  const fixButton = document.querySelector('.button--fix');
  
  function checkScroll() {
    const windowHeight = window.innerHeight;
    const scrolled70Percent = window.scrollY >= window.innerHeight * 0.4;
    
    sections.forEach(section => {
      const sectionPosition = section.getBoundingClientRect().top;
      const triggerPoint = windowHeight - 150;
      
      if (sectionPosition < triggerPoint) {
        section.style.opacity = '1';
      }
    });
    
    if (form && logo && tgButton && fixButton) {
      const formRect = form.getBoundingClientRect();
      const formFullyVisible = formRect.top >= 0 && formRect.bottom <= windowHeight;
      
      if (scrolled70Percent && !formFullyVisible) {
        logo.style.opacity = '0';
        logo.style.pointerEvents = 'none';
      } else {
        logo.style.opacity = '1';
        logo.style.pointerEvents = 'all';
      }
      
      if (formFullyVisible) {
        tgButton.style.opacity = '1';
        tgButton.style.pointerEvents = 'all';
        fixButton.style.opacity = '0';
        fixButton.style.pointerEvents = 'none';
      } else {
        tgButton.style.opacity = '0';
        tgButton.style.pointerEvents = 'none';
        fixButton.style.opacity = scrolled70Percent ? '1' : '0';
        fixButton.style.pointerEvents = scrolled70Percent ? 'all' : 'none';
      }
    }
  }
  
  window.addEventListener('scroll', checkScroll);
  window.addEventListener('resize', checkScroll);
  checkScroll();

  // ========== КАСТОМНЫЙ СЕЛЕКТ ==========
  const customSelect = document.querySelector('.custom-select');
  if (!customSelect) return;
  
  const selected = customSelect.querySelector('.custom-select__selected');
  const arrow = customSelect.querySelector('.select-arrow');
  const dropdown = customSelect.querySelector('.custom-select__dropdown');
  const options = customSelect.querySelectorAll('.custom-select__option');
  
  // Добавляем tabindex для фокуса
  selected.setAttribute('tabindex', '0');
  
  let currentFocusIndex = -1;
  
  // Функция открытия
  function openSelect() {
    dropdown.classList.add('show');
    arrow.classList.add('open');
    currentFocusIndex = -1;
    removeHighlightFromAll();
  }
  
  // Функция закрытия
  function closeSelect() {
    dropdown.classList.remove('show');
    arrow.classList.remove('open');
    currentFocusIndex = -1;
    removeHighlightFromAll();
  }
  
	// Убрать выделение со всех опций
	function removeHighlightFromAll() {
		options.forEach(opt => {
			opt.classList.remove('keyboard-highlight');
			opt.classList.remove('custom-select__option--hover');
			opt.style.boxShadow = '';
			opt.style.background = '';
		});
	}
  
// Функция подсветки опции при навигации
function highlightOption(index) {
  // Сначала убираем подсветку со всех
  removeHighlightFromAll();
  
  // Подсвечиваем текущую
  if (index >= 0 && index < options.length) {
    options[index].classList.add('keyboard-highlight');
    options[index].classList.add('custom-select__option--hover');
    
    // Скроллим к элементу если нужно
    options[index].scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }
}
  
  // Клик по селекту
  selected.addEventListener('click', (e) => {
    e.stopPropagation();
    if (dropdown.classList.contains('show')) {
      closeSelect();
    } else {
      openSelect();
    }
  });
  
  // Фокус/блур для подсветки
  selected.addEventListener('focus', () => {
    selected.style.outline = 'none';
    selected.style.boxShadow = 'inset 0px 0px 2px rgba(68, 98, 245, 0.2), inset 2px 3px 5px rgba(68, 98, 245, 0.2)';
  });
  
  selected.addEventListener('blur', () => {
    selected.style.outline = '';
    selected.style.boxShadow = '';
  });
  
  // Клавиатурная навигация
  selected.addEventListener('keydown', (e) => {
    const isOpen = dropdown.classList.contains('show');
    
    if (!isOpen) {
      // Если закрыт - открываем по Enter/Space
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openSelect();
      }
    } else {
      // Если открыт - навигация
      switch(e.key) {
        case 'ArrowDown':
          e.preventDefault();
          currentFocusIndex = (currentFocusIndex + 1) % options.length;
          highlightOption(currentFocusIndex);
          break;
          
        case 'ArrowUp':
          e.preventDefault();
          currentFocusIndex = (currentFocusIndex - 1 + options.length) % options.length;
          highlightOption(currentFocusIndex);
          break;
          
        case 'Enter':
        case ' ':
          e.preventDefault();
          if (currentFocusIndex >= 0) {
            // Эмулируем клик по опции
            options[currentFocusIndex].click();
          }
          closeSelect();
          break;
          
        case 'Escape':
          e.preventDefault();
          closeSelect();
          break;
      }
    }
  });
  
  // Выбор опции
  options.forEach(option => {
    option.addEventListener('click', (e) => {
      e.stopPropagation();
      
      options.forEach(opt => opt.classList.remove('selected'));
      option.classList.add('selected');
      
      // Обновляем текст в selected (сохраняем SVG)
      const svg = selected.querySelector('svg');
      selected.innerHTML = option.textContent + ' ';
      selected.appendChild(svg);
      
      closeSelect();
      
      console.log('Выбрано:', option.dataset.value);
    });
  });
  
  // Закрытие при клике вне
  document.addEventListener('click', (e) => {
    if (!customSelect.contains(e.target)) {
      closeSelect();
    }
  });
});

// Добавьте эти функции в ваш существующий код
function openProofModal() {
  const proofModal = document.querySelector('.modal__proof');
  proofModal.classList.add('visible');
  document.body.style.overflow = 'hidden';  // Блокируем скролл
}

function closeProofModal() {
  const proofModal = document.querySelector('.modal__proof');
  proofModal.classList.remove('visible');
  document.body.style.overflow = '';  // Разблокируем скролл
}

// Открытие по клику на .proof
document.querySelector('.proof')?.addEventListener('click', openProofModal);

// Закрытие по клику вне .proof__container
document.querySelector('.modal__proof')?.addEventListener('click', function(e) {
  if (!e.target.closest('.proof__container')) {
    closeProofModal();
  }
});

// Закрытие по Escape (добавьте в существующий обработчик)
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    const thankYouModal = document.querySelector('.modal__thank-you');
    const proofModal = document.querySelector('.modal__proof');
    
    if (thankYouModal?.classList.contains('visible')) {
      closeModal(); // существующая функция для thank-you
    }
    
    if (proofModal?.classList.contains('visible')) {
      closeProofModal(); // новая функция для proof
    }
  }
});

// Универсальный обработчик для всех кнопок закрытия
document.addEventListener('click', function(e) {
  const closeButton = e.target.closest('.close-modal');
  
  if (closeButton) {
    // Ищем ближайшее модальное окно с классом "modal"
    const modal = closeButton.closest('.modal');
    
    if (modal) {
      // Убираем класс visible
      modal.classList.remove('visible');
      
      // Проверяем, остались ли открытые модальные окна с классом "modal"
      const openModals = document.querySelectorAll('.modal.visible');
      if (openModals.length === 0) {
        document.body.style.overflow = ''; // разблокируем скролл
      }
    }
  }
});