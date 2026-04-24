// COOKIE POPUP

// document.addEventListener('DOMContentLoaded', () => {
//   const cookiePopup = document.querySelector('.cookie-popup');
//   const acceptAllButton = document.querySelector('[data-cookie-action="accept-all"]');
//   const acceptNecessaryButton = document.querySelector('[data-cookie-action="accept-necessary"]');

//   if (!cookiePopup) return;
  
//   const COOKIE_ALL_KEY = 'cookieChoiceAll';
//   const COOKIE_NECESSARY_KEY = 'cookieChoiceNecessary';
//   const ANALYTICS_ENABLED_KEY = 'analyticsEnabled';
  
//   // Проверяем, был ли уже выбор "Принять все"
//   const hasAcceptedAll = localStorage.getItem(COOKIE_ALL_KEY) === 'true';
  
//   // Если пользователь уже принимал все куки, сразу запускаем аналитику
//   if (hasAcceptedAll && localStorage.getItem(ANALYTICS_ENABLED_KEY) !== 'true') {
//     localStorage.setItem(ANALYTICS_ENABLED_KEY, 'true');
//     initAnalytics();
//   }
  
//   if (!hasAcceptedAll) {
//     setTimeout(() => {
//       cookiePopup.classList.add('cookie-popup--visible');
//       cookiePopup.hidden = false;
//     }, 2000);
//   }
  
//   function hideCookiePopup() {
//     cookiePopup.classList.remove('cookie-popup--visible');
//   }
  
//   if (acceptAllButton) {
//     acceptAllButton.addEventListener('click', () => {
//       localStorage.setItem(COOKIE_ALL_KEY, 'true');
//       localStorage.removeItem(COOKIE_NECESSARY_KEY);
//       localStorage.setItem(ANALYTICS_ENABLED_KEY, 'true'); // Включаем аналитику
      
//       hideCookiePopup();
//       initAnalytics(); // Запускаем аналитику
//     });
//   }
  
//   if (acceptNecessaryButton) {
//     acceptNecessaryButton.addEventListener('click', () => {
//       localStorage.setItem(COOKIE_NECESSARY_KEY, 'true');
//       localStorage.removeItem(COOKIE_ALL_KEY);
//       localStorage.removeItem(ANALYTICS_ENABLED_KEY); // Не включаем аналитику
      
//       hideCookiePopup();
//     });
//   }
// });

// COOKIE NEW

document.addEventListener('DOMContentLoaded', () => {
    const popup = document.querySelector('.popup-cookie');
    const closeBtn = document.querySelector('.close__popup-cookie');
    
    // Ключ для localStorage
    const STORAGE_KEY = 'cookie_popup_closed';
    
    // Проверяем, закрывал ли пользователь попап ранее
    const isPopupClosed = localStorage.getItem(STORAGE_KEY) === 'true';
    
    // Если пользователь уже закрывал попап, ничего не делаем
    if (isPopupClosed) {
        return;
    }
    
    // Таймер для показа попапа через 3 секунды
    let timeoutId = setTimeout(() => {
        popup.classList.add('popup-cookie--visible');
    }, 3000);
    
    // Обработчик закрытия с сохранением в localStorage
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            popup.classList.remove('popup-cookie--visible');
            // Сохраняем информацию о закрытии в localStorage
            localStorage.setItem(STORAGE_KEY, 'true');
            // Очищаем таймер, если попап закрыли до его срабатывания
            clearTimeout(timeoutId);
        });
    }
    
    // Если пользователь уйдет со страницы раньше 3 секунд - очищаем таймер
    window.addEventListener('beforeunload', () => {
        clearTimeout(timeoutId);
    });
});


// СИСТЕМА СБОРА АНАЛИТИКИ ПОЛЬЗОВАТЕЛЬСКОГО ПОВЕДЕНИЯ

// ============================
// ГЛОБАЛЬНЫЕ ФУНКЦИИ
// ============================
// function initAnalytics() {
//   if (localStorage.getItem('analyticsEnabled') !== 'true') {
//     return; // Не запускаем, если пользователь не принял куки
//   }
  
//   // ============================
//   // КОНФИГУРАЦИЯ
//   // ============================
//   const ANALYTICS_KEY = 'userAnalyticsData';
//   const VISIT_COUNT_KEY = 'analyticsVisitCount';
//   const LAST_VISIT_KEY = 'analyticsLastVisit';
//   const SESSION_END_KEY = 'analyticsSessionEnd';

//   // ============================
//   // ОСНОВНЫЕ ДАННЫЕ ПОЛЬЗОВАТЕЛЯ
//   // ============================
//   const userData = {
//       // Идентификация
//       visitNumber: 1,
//       sessionId: generateSessionId(),
      
//       // Устройство и браузер
//       device: getDeviceType(),
//       os: getOperatingSystem(),
//       browser: getBrowser(),
      
//       // Экран
//       screenResolution: `${screen.width}×${screen.height}`,
//       screenColorDepth: `${screen.colorDepth} бит`,
//       pixelRatio: window.devicePixelRatio,
      
//       // Окно браузера
//       windowSize: `${window.innerWidth}×${window.innerHeight}`,
//       viewportSize: `${document.documentElement.clientWidth}×${document.documentElement.clientHeight}`,
      
//       // Время
//       firstVisitTime: new Date().toISOString(),
//       timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
//       timezoneOffset: new Date().getTimezoneOffset(),
      
//       // Навигация
//       currentSection: getCurrentSection(),
//       navigationMethods: {
//           scroll: 0,
//           arrows: { up: 0, down: 0, left: 0, right: 0 },
//           space: { normal: 0, shift: 0 },
//           clicks: { header: 0, buttonLvl1: 0, buttonLvl2: 0, links: 0 },
//           swipes: { left: 0, right: 0 }
//       },
      
//       // Клики по ссылкам
//       linkClicks: [],
      
//       // Статистика посещений
//       visitStats: {
//           totalVisits: 1,
//           intervalsBetweenVisits: []
//       },

//       // Время на контейнерах
//       containerTimeSpent: {},
      
//       // Активные контейнеры
//       activeContainers: {
//           section: null,
//           containerLvl1: null,
//           containerLvl2: null
//       }
//   };

//   // ============================
//   // ТАЙМЕРЫ И ПЕРЕМЕННЫЕ
//   // ============================
//   let startTime = Date.now();
//   let lastActionTime = Date.now();
//   let actionTimeout = null;
//   let isMouseWheelEvent = false;
//   let lastScrollEventTime = 0;
//   let scrollTimeout = null;
//   let totalActiveTime = 0;
//   let heartbeatInterval = null;
//   let sessionEndTimer = null;
//   let sessionEnded = false;

//   // Таймеры для контейнеров
//   let containerTimers = {
//       combination: { key: null, startTime: Date.now() }
//   };

//   // ============================
//   // ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ
//   // ============================
//   function generateSessionId() {
//       return 'session_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
//   }

//   function getDeviceType() {
//       const ua = navigator.userAgent;
//       if (/Mobile|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua)) {
//           if (/iPad|Tablet|PlayBook|Silk/i.test(ua)) {
//               return 'Планшет';
//           }
//           return 'Мобильный';
//       }
//       return 'ПК';
//   }

//   function getOperatingSystem() {
//       const ua = navigator.userAgent;
//       if (/Windows NT/i.test(ua)) return 'Windows';
//       if (/Mac OS/i.test(ua)) return 'macOS';
//       if (/Linux/i.test(ua)) return 'Linux';
//       if (/Android/i.test(ua)) return 'Android';
//       if (/iOS|iPhone|iPad|iPod/i.test(ua)) return 'iOS';
//       return 'Неизвестно';
//   }

//   function getBrowser() {
//       const ua = navigator.userAgent;
//       if (/Chrome/i.test(ua) && !/Edg/i.test(ua)) return 'Chrome';
//       if (/Firefox/i.test(ua)) return 'Firefox';
//       if (/Safari/i.test(ua) && !/Chrome/i.test(ua)) return 'Safari';
//       if (/Edg/i.test(ua)) return 'Edge';
//       if (/Opera|OPR/i.test(ua)) return 'Opera';
//       return 'Неизвестно';
//   }

//   function getCurrentSection() {
//       const activeSection = document.querySelector('.sectionShow.active');
//       return activeSection ? activeSection.id : 'home';
//   }

//   function formatTime(ms) {
//       if (!ms) return '0 сек';
      
//       const seconds = Math.floor(ms / 1000);
//       const minutes = Math.floor(seconds / 60);
//       const hours = Math.floor(minutes / 60);
      
//       if (hours > 0) {
//           return `${hours}ч ${minutes % 60}м ${seconds % 60}с`;
//       } else if (minutes > 0) {
//           return `${minutes}м ${seconds % 60}с`;
//       } else {
//           return `${seconds}с`;
//       }
//   }

//   // ============================
//   // ОТСЛЕЖИВАНИЕ ДЕЙСТВИЙ
//   // ============================
//   function trackNavigation(method, details = {}) {
//       if (sessionEnded) return;
      
//       if (actionTimeout) {
//           clearTimeout(actionTimeout);
//       }
      
//       lastActionTime = Date.now();
      
//       switch(method) {
//           case 'scroll':
//               userData.navigationMethods.scroll++;
//               actionTimeout = setTimeout(() => {
//                   collectAndDisplayResults();
//               }, 300);
//               return;
//           case 'arrow':
//               if (details.direction) {
//                   userData.navigationMethods.arrows[details.direction]++;
//               }
//               break;
//           case 'space':
//               if (details.withShift) {
//                   userData.navigationMethods.space.shift++;
//               } else {
//                   userData.navigationMethods.space.normal++;
//               }
//               break;
//           case 'click':
//               if (details.elementType) {
//                   userData.navigationMethods.clicks[details.elementType]++;
//               }
//               break;
//           case 'swipe':
//               if (details.direction) {
//                   userData.navigationMethods.swipes[details.direction]++;
//               }
//               break;
//       }
      
//       actionTimeout = setTimeout(() => {
//           collectAndDisplayResults();
//       }, 100);
//   }

//   function trackLinkClick(linkElement) {
//       if (sessionEnded) return;
      
//       const linkData = {
//           href: linkElement.href,
//           text: linkElement.textContent.trim(),
//           className: linkElement.className,
//           time: new Date().toISOString(),
//           fromSection: userData.currentSection
//       };
      
//       userData.linkClicks.push(linkData);
//       userData.navigationMethods.clicks.links++;
      
//       collectAndDisplayResults();
//   }

//   // ============================
//   // НАСТРОЙКА СЛУШАТЕЛЕЙ СОБЫТИЙ
//   // ============================
//   function setupEventListeners() {
//       // 1. СКРОЛЛ (только для ПК)
//       if (userData.device === 'ПК') {
//           let lastScrollTime = 0;
          
//           window.addEventListener('wheel', (e) => {
//               const now = Date.now();
              
//               if (scrollTimeout) {
//                   clearTimeout(scrollTimeout);
//               }
              
//               isMouseWheelEvent = true;
//               lastScrollEventTime = now;
              
//               scrollTimeout = setTimeout(() => {
//                   isMouseWheelEvent = false;
//               }, 500);
              
//               if (now - lastScrollTime > 500) {
//                   trackNavigation('scroll', { deltaY: e.deltaY });
//                   lastScrollTime = now;
//               }
//           }, { passive: true });
//       }
      
//       // 2. КЛАВИАТУРА (только для ПК)
//       if (userData.device === 'ПК') {
//           document.addEventListener('keydown', (e) => {
//               if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
              
//               switch(e.keyCode) {
//                   case 38: // Стрелка вверх
//                       trackNavigation('arrow', { direction: 'up' });
//                       break;
//                   case 40: // Стрелка вниз
//                       trackNavigation('arrow', { direction: 'down' });
//                       break;
//                   case 37: // Стрелка влево
//                       trackNavigation('arrow', { direction: 'left' });
//                       break;
//                   case 39: // Стрелка вправо
//                       trackNavigation('arrow', { direction: 'right' });
//                       break;
//                   case 32: // Пробел
//                       if (e.shiftKey) {
//                           trackNavigation('space', { withShift: true });
//                       } else {
//                           trackNavigation('space', { withShift: false });
//                       }
//                       break;
//               }
//           });
//       }
      
//       // 3. КЛИКИ (используем mousedown вместо click)
//       document.addEventListener('mousedown', (e) => {
//           if (e.button !== 0) return;
          
//           const now = Date.now();
          
//           if (isMouseWheelEvent && (now - lastScrollEventTime < 500)) {
//               return;
//           }
          
//           const target = e.target;
          
//           if (target.closest('.header-item')) {
//               trackNavigation('click', { elementType: 'header' });
//               return;
//           }
//           else if (target.closest('.button-lvl1')) {
//               trackNavigation('click', { elementType: 'buttonLvl1' });
//               return;
//           }
//           else if (target.closest('.button-lvl2')) {
//               trackNavigation('click', { elementType: 'buttonLvl2' });
//               return;
//           }
//           else if (target.closest('a[href]')) {
//               const link = target.closest('a[href]');
//               if (link.href && !link.href.includes('javascript:')) {
//                   trackLinkClick(link);
//                   return;
//               }
//           }
//       });
      
//       // 4. СВАЙПЫ (для мобильных и планшетов)
//       if (userData.device === 'Мобильный' || userData.device === 'Планшет') {
//           let touchStartX = 0;
//           let touchStartY = 0;
          
//           document.addEventListener('touchstart', (e) => {
//               touchStartX = e.changedTouches[0].screenX;
//               touchStartY = e.changedTouches[0].screenY;
//           }, { passive: true });
          
//           document.addEventListener('touchend', (e) => {
//               const touchEndX = e.changedTouches[0].screenX;
//               const touchEndY = e.changedTouches[0].screenY;
              
//               const deltaX = touchEndX - touchStartX;
//               const deltaY = touchEndY - touchStartY;
              
//               if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
//                   if (deltaX > 0) {
//                       trackNavigation('swipe', { direction: 'right' });
//                   } else {
//                       trackNavigation('swipe', { direction: 'left' });
//                   }
//               }
//           }, { passive: true });
//       }

//       // 5. ОТСЛЕЖИВАНИЕ ИЗМЕНЕНИЯ ХЭША
//       function observeHashChanges() {
//           let lastHash = window.location.hash;
          
//           setInterval(() => {
//               const currentHash = window.location.hash;
//               if (currentHash !== lastHash) {
//                   collectAndDisplayResults();
//                   lastHash = currentHash;
//               }
//           }, 100);
//       }

//       observeHashChanges();
      
//       // 6. ОТСЛЕЖИВАНИЕ ИЗМЕНЕНИЯ РАЗМЕРА ОКНА
//       let resizeTimeout;
//       window.addEventListener('resize', () => {
//           clearTimeout(resizeTimeout);
//           resizeTimeout = setTimeout(() => {
//               userData.windowSize = `${window.innerWidth}×${window.innerHeight}`;
//               userData.viewportSize = `${document.documentElement.clientWidth}×${document.documentElement.clientHeight}`;
//           }, 250);
//       });
//   }

//   // ============================
//   // ВЫВОД РЕЗУЛЬТАТОВ
//   // ============================
//   function collectAndDisplayResults() {
//       if (sessionEnded) return;
      
//       const currentSection = document.querySelector('.sectionShow.active');
      
//       let sectionId = 'no-section';
//       let container1Id = 'no-lvl1';
//       let container2Id = 'no-lvl2';
      
//       const isOnHome = window.location.hash === '#home' || 
//                                       window.location.hash === '' || 
//                                       (!currentSection && document.querySelector('#home'));
      
//       if (isOnHome) {
//           sectionId = 'home';
//           container1Id = 'no-lvl1';
//           container2Id = 'no-lvl2';
//       } else if (currentSection) {
//           sectionId = currentSection.id;
          
//           const activeContainer1 = currentSection.querySelector('.container-lvl1.active');
//           if (activeContainer1) {
//               container1Id = activeContainer1.id;
              
//               const activeContainer2 = activeContainer1.querySelector('.container-lvl2.active');
//               if (activeContainer2) {
//                   container2Id = activeContainer2.id;
//               }
//           } else {
//               const nestedContainer2 = currentSection.querySelector('.container-lvl2.active');
//               if (nestedContainer2) {
//                   container2Id = nestedContainer2.id;
//               }
//           }
//       }
      
//       const currentCombination = `${sectionId}:${container1Id}:${container2Id}`;
      
//       if (!containerTimers.combination) {
//           containerTimers.combination = { 
//               key: currentCombination, 
//               startTime: Date.now() 
//           };
//       }
      
//       if (containerTimers.combination.key !== currentCombination) {
//           const timeSpent = Date.now() - containerTimers.combination.startTime;
//           userData.containerTimeSpent[containerTimers.combination.key] = 
//               (userData.containerTimeSpent[containerTimers.combination.key] || 0) + timeSpent;

//           totalActiveTime += timeSpent;
          
//           containerTimers.combination = { 
//               key: currentCombination, 
//               startTime: Date.now() 
//           };
//       }
      
//       userData.activeContainers.section = sectionId !== 'no-section' ? sectionId : null;
//       userData.activeContainers.containerLvl1 = container1Id !== 'no-lvl1' ? container1Id : null;
//       userData.activeContainers.containerLvl2 = container2Id !== 'no-lvl2' ? container2Id : null;
//       userData.currentSection = sectionId !== 'no-section' ? sectionId : 'home';
      
//       const currentActiveTime = containerTimers.combination ? 
//           Date.now() - containerTimers.combination.startTime : 0;
//       const displayTotalTime = totalActiveTime + currentActiveTime;
      
//       const finalData = {
//           ...userData,
//           collectionTime: new Date().toISOString(),
//           totalTime: displayTotalTime
//       };
      
//       localStorage.setItem(ANALYTICS_KEY, JSON.stringify(finalData));
//   }

//   // ============================
//   // ФУНКЦИЯ ФИНАЛИЗАЦИИ ДАННЫХ
//   // ============================
//   function finalizeAnalyticsData() {
//       if (containerTimers.combination && containerTimers.combination.key) {
//           const finalTimeSpent = Date.now() - containerTimers.combination.startTime;
//           userData.containerTimeSpent[containerTimers.combination.key] = 
//               (userData.containerTimeSpent[containerTimers.combination.key] || 0) + finalTimeSpent;
          
//           totalActiveTime += finalTimeSpent;
          
//           containerTimers.combination.startTime = Date.now();
//       }
      
//       return {
//           ...userData,
//           totalTime: totalActiveTime
//       };
//   }

//   // ============================
//   // SEND HEARTBEAT
//   // ============================
//   function sendHeartbeat() {
//       if (sessionEnded) return;
      
//       collectAndDisplayResults();
//       const finalizedData = finalizeAnalyticsData();
//       sendToTelegram(finalizedData);
//   }

//   // ============================
//   // ТЕЛЕГРАМ ОТПРАВКА
//   // ============================
//   let telegramSent = false;

//   function sendToTelegram(data) {
//       if (telegramSent) return;
      
//       if (!window.ANALYTICS_CONFIG) return;
      
//       const { TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID } = window.ANALYTICS_CONFIG;
      
//       if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) return;
      
//       const message = formatTelegramMessage(data);
//       const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
      
//       const dataToSend = JSON.stringify({
//           chat_id: TELEGRAM_CHAT_ID,
//           text: message,
//           parse_mode: 'HTML'
//       });
      
//       // Пробуем только fetch без sendBeacon
//       fetch(url, {
//           method: 'POST',
//           headers: {
//               'Content-Type': 'application/json',
//           },
//           body: dataToSend,
//           mode: 'cors',
//           credentials: 'omit',
//           keepalive: true
//       }).catch(() => {});
//   }

//   function formatTelegramMessage(data) {
//       let message = `<b>📊 АНАЛИТИКА ПОЛЬЗОВАТЕЛЬСКОГО ПОВЕДЕНИЯ</b>\n\n`;
      
//       if (data.visitStats.intervalsBetweenVisits.length > 0) {
//           const lastInterval = data.visitStats.intervalsBetweenVisits[data.visitStats.intervalsBetweenVisits.length - 1];
//           message += `<b>С последнего визита:</b> ${lastInterval.days}д ${lastInterval.hours}ч ${lastInterval.minutes}м\n`;
//       } else {
//           message += `<b>С последнего визита:</b> первый визит\n`;
//       }
      
//       message += `\n`;
//       message += `<b>Устройство:</b> ${data.device}\n`;
//       message += `<b>ОС:</b> ${data.os}\n`;
//       message += `<b>Браузер:</b> ${data.browser}\n`;
//       message += `<b>Экран:</b> ${data.screenResolution}\n`;
//       message += `<b>Окно:</b> ${data.windowSize}\n`;
      
//       message += `\n`;
//       message += `<b>Часовой пояс:</b> ${data.timezone}\n`;
//       message += `<b>Время захода:</b> ${new Date(data.firstVisitTime).toLocaleString()}\n`;
//       message += `<b>Общее время на сайте за посещение:</b> ${formatTime(data.totalTime)}\n`;
      
//       message += `\n<b>Способы навигации</b>\n`;
//       message += `Скролл: ${data.navigationMethods.scroll}\n`;
//       message += `↑: ${data.navigationMethods.arrows.up}\n`;
//       message += `↓: ${data.navigationMethods.arrows.down}\n`;
//       message += `←: ${data.navigationMethods.arrows.left}\n`;
//       message += `→: ${data.navigationMethods.arrows.right}\n`;
//       message += `Пробел: ${data.navigationMethods.space.normal}\n`;
//       message += `Shift+Пробел: ${data.navigationMethods.space.shift}\n`;
//       message += `Клики: ${data.navigationMethods.clicks.header + data.navigationMethods.clicks.buttonLvl1 + data.navigationMethods.clicks.buttonLvl2 + data.navigationMethods.clicks.links}\n`;
//       message += `Свайп ←: ${data.navigationMethods.swipes.left}\n`;
//       message += `Свайп →: ${data.navigationMethods.swipes.right}\n`;
      
//       if (data.linkClicks.length > 0) {
//           message += `\n<b>Клики по ссылкам</b>\n`;
//           data.linkClicks.forEach((click, i) => {
//               message += `${i+1}. ${click.text} → ${click.href}\n`;
//           });
//       }
      
//       message += `\n<b>Время на контейнерах</b>\n`;
//       Object.entries(data.containerTimeSpent).forEach(([key, time]) => {
//           message += `${key}: ${formatTime(time)}\n`;
//       });
      
//       return message;
//   }

//   // ============================
//   // УПРАВЛЕНИЕ СЕССИЕЙ
//   // ============================
//   function startHeartbeat() {
//       heartbeatInterval = setInterval(() => {
//           if (!sessionEnded && document.visibilityState === 'visible') {
//               sendHeartbeat();
//           }
//       }, 30000);
//   }

//   function handleVisibilityChange() {
//       if (document.visibilityState === 'hidden') {
//           // Пользователь ушел со страницы
//           // Запускаем таймер на 2 минуты
//           if (sessionEndTimer) {
//               clearTimeout(sessionEndTimer);
//           }
          
//           sessionEndTimer = setTimeout(() => {
//               // Через 2 минуты завершаем сессию
//               endSession();
//           }, 120000); // 2 минуты = 120000 мс
//       } else {
//           // Пользователь вернулся
//           if (sessionEndTimer) {
//               clearTimeout(sessionEndTimer);
//               sessionEndTimer = null;
//           }
          
//           // Если сессия была завершена, но пользователь вернулся - начинаем новую
//           if (sessionEnded) {
//               startNewSession();
//           }
//       }
//   }

//   function endSession() {
//       sessionEnded = true;
      
//       // Останавливаем heartbeat
//       if (heartbeatInterval) {
//           clearInterval(heartbeatInterval);
//           heartbeatInterval = null;
//       }
      
//       // Останавливаем таймер завершения сессии
//       if (sessionEndTimer) {
//           clearTimeout(sessionEndTimer);
//           sessionEndTimer = null;
//       }
      
//       // Отправляем финальные данные
//       collectAndDisplayResults();
//       const finalizedData = finalizeAnalyticsData();
      
//       // Добавляем метку о завершении сессии
//       const sessionEndData = {
//           ...finalizedData,
//           sessionEnded: true,
//           sessionEndTime: new Date().toISOString(),
//           sessionDuration: totalActiveTime
//       };
      
//       // Сохраняем в localStorage
//       localStorage.setItem(SESSION_END_KEY, JSON.stringify(sessionEndData));
      
//       // Отправляем в Telegram
//       sendToTelegram(sessionEndData);
//       telegramSent = true;
//   }

//   function startNewSession() {
//       sessionEnded = false;
//       telegramSent = false;
      
//       // Генерируем новую сессию
//       userData.sessionId = generateSessionId();
//       userData.firstVisitTime = new Date().toISOString();
      
//       // Сбрасываем счетчики
//       userData.navigationMethods = {
//           scroll: 0,
//           arrows: { up: 0, down: 0, left: 0, right: 0 },
//           space: { normal: 0, shift: 0 },
//           clicks: { header: 0, buttonLvl1: 0, buttonLvl2: 0, links: 0 },
//           swipes: { left: 0, right: 0 }
//       };
      
//       userData.linkClicks = [];
//       userData.containerTimeSpent = {};
//       totalActiveTime = 0;
      
//       // Запускаем heartbeat
//       startHeartbeat();
//   }

//   // ============================
//   // ИНИЦИАЛИЗАЦИЯ ПОЛЬЗОВАТЕЛЯ
//   // ============================
//   function initializeUser() {
//       // Счетчик посещений
//       let visitCount = localStorage.getItem(VISIT_COUNT_KEY);
//       if (!visitCount) {
//           visitCount = 1;
//       } else {
//           visitCount = parseInt(visitCount) + 1;
//       }
//       localStorage.setItem(VISIT_COUNT_KEY, visitCount.toString());
//       userData.visitNumber = visitCount;
//       userData.visitStats.totalVisits = visitCount;
      
//       // Интервал между посещениями
//       const lastVisit = localStorage.getItem(LAST_VISIT_KEY);
//       if (lastVisit) {
//           const lastVisitTime = new Date(lastVisit);
//           const currentTime = new Date();
//           const intervalMs = currentTime - lastVisitTime;
//           const intervalHours = Math.floor(intervalMs / (1000 * 60 * 60));
//           const intervalMinutes = Math.floor((intervalMs % (1000 * 60 * 60)) / (1000 * 60));
          
//           userData.visitStats.intervalsBetweenVisits.push({
//               days: Math.floor(intervalHours / 24),
//               hours: intervalHours % 24,
//               minutes: intervalMinutes,
//               totalMinutes: Math.floor(intervalMs / (1000 * 60))
//           });
//       }
      
//       localStorage.setItem(LAST_VISIT_KEY, new Date().toISOString());
//   }

//   // ============================
//   // ЗАПУСК СИСТЕМЫ
//   // ============================
//   function startAnalytics() {
//       // Инициализируем пользователя
//       initializeUser();
      
//       // Настраиваем слушатели событий
//       setupEventListeners();
      
//       // Запускаем heartbeat
//       startHeartbeat();
      
//       // Настраиваем отслеживание видимости страницы
//       document.addEventListener('visibilitychange', handleVisibilityChange);
      
//       // Также отправляем при закрытии вкладки (на всякий случай)
//       window.addEventListener('beforeunload', () => {
//           if (!sessionEnded) {
//               endSession();
//           }
//       });
//   }

//   // ЗАПУСК
//   startAnalytics();
// }

// ============================
// АВТОМАТИЧЕСКИЙ ЗАПУСК ПРИ ЗАГРУЗКЕ
// ============================
// document.addEventListener('DOMContentLoaded', () => {
//   // Проверяем, дал ли пользователь согласие на аналитику
//   if (localStorage.getItem('analyticsEnabled') === 'true') {
//       initAnalytics();
//   }
// });