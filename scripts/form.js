document.addEventListener('DOMContentLoaded', function() {
  function setError(element, hasError) {
    if (hasError) {
      element.classList.add('error');
    } else {
      element.classList.remove('error');
    }
  }

  function openModal() {
    const modal = document.querySelector('.modal__thank-you');
    modal.classList.add('visible');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    const modal = document.querySelector('.modal__thank-you');
    modal.classList.remove('visible');
    document.body.style.overflow = '';
  }

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      const modal = document.querySelector('.modal__thank-you');
      if (modal.classList.contains('visible')) {
        closeModal();
      }
    }
  });

  document.querySelector('.modal__thank-you')?.addEventListener('click', function(e) {
    if (!e.target.closest('.thank-you__container')) {
      closeModal();
    }
  });

  document.querySelector('.close-modal')?.addEventListener('click', closeModal);

  document.getElementById('Checkbox').addEventListener('change', function() {
    const checkboxSpan = document.querySelector('.checkbox');
    if (this.checked) {
      checkboxSpan.classList.remove('error');
    }
  });

  document.querySelector('input[type="tel"]').addEventListener('input', function() {
    this.classList.remove('error');
  });

  document.querySelector('.form__seo-rt').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    document.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
    
    let hasErrors = false;
    
    const phoneInput = document.querySelector('input[type="tel"]');
    const checkboxSpan = document.querySelector('.checkbox');
    const checkboxInput = document.getElementById('Checkbox');
    
    if (!phoneInput.value.trim()) {
      setError(phoneInput, true);
      hasErrors = true;
    }
    
    if (!checkboxInput.checked) {
      setError(checkboxSpan, true);
      hasErrors = true;
    }
    
    if (hasErrors) {
      return;
    }
    
    openModal();
    
    const name = document.querySelector('.input-wrapper:first-child input')?.value || '';
    const city = document.querySelectorAll('.input-wrapper')[1]?.querySelector('input')?.value || '';
    
    let selectValue = '...';
    const selectedOption = document.querySelector('.custom-select__selected');
    if (selectedOption) {
      selectValue = selectedOption.textContent?.trim() || '...';
    }
    
    const contact = phoneInput.value;
    
    // Определяем заголовок в зависимости от URL
    const currentUrl = window.location.href;
    let messageTitle = '<b>SEO ремонт телефонов</b>';
    
    if (currentUrl.includes('free-test-reklama')) {
      messageTitle = '<b>Тест контекстной рекламы</b>';
    } else if (currentUrl.includes('seo-rt')) {
      messageTitle = '<b>SEO ремонт телефонов</b>';
    }
    
    const message = `${messageTitle}\n\n` +
    `${name ? name + ',' : '...,'}\n` +
    `${city ? city + ',' : '...,'}\n` +
    `${selectValue + ','}\n` +
    `${contact ? contact : '...'}`;
    
    const botToken = '';
    const chatId = '';
    
    fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'HTML'
      }),
    });
    
    this.reset();
    
    const customSelect = document.querySelector('.custom-select');
    if (customSelect) {
      const selected = customSelect.querySelector('.custom-select__selected');
      const options = customSelect.querySelectorAll('.custom-select__option');
      const arrow = customSelect.querySelector('.select-arrow');
      const dropdown = customSelect.querySelector('.custom-select__dropdown');
      
      const svg = selected.querySelector('svg');
      selected.innerHTML = '';
      selected.appendChild(svg);
      
      options.forEach(opt => opt.classList.remove('selected'));
      
      if (dropdown) dropdown.classList.remove('show');
      if (arrow) arrow.classList.remove('open');
    }
  });
});