import Player from '@vimeo/player';// Цей код імпортує модуль Player з бібліотеки Vimeo для роботи з відеоплеєром Vimeo.
import throttle from 'lodash.throttle';//Імпортується функція throttle з бібліотеки Lodash, яка дозволяє обмежувати частоту виклику функції.


const CURRENT_TIME_KEY = 'videoplayer-current-time'; //Створюється константа CURRENT_TIME_KEY, яка буде використовуватись як ключ для 
                                                     //збереження та вилучення поточного часу відтворення з локального сховища (localStorage).
const iframe = document.querySelector('iframe'); //Виходить елемент <iframe> з DOM, що ймовірно містить відео Vimeo.
const player = new Player(iframe, { //Створюється екземпляр плеєра Vimeo, використовуючи імпортований модуль Player, 
  loop: true,                       //та передається елемент <iframe>. Налаштовуються опції програвача, такі як loop (повтор відтворення), 
  fullscreen: true,                 //fullscreen (підтримка повноекранного режиму) та quality (якість відео).
  quality: '1080p',
});

const getCurrentTime = function (currentTime) { //Це функція, яка приймає поточний час відтворення відео (у секундах) та зберігає його у 
  const seconds = currentTime.seconds;          //локальному сховищі (localStorage) із ключем CURRENT_TIME_KEY.
  localStorage.setItem(CURRENT_TIME_KEY, JSON.stringify(seconds));
};

player.on('timeupdate', throttle(getCurrentTime, 1000));
//Встановлюється обробник події timeupdate на плеєрі. 
//Ця подія спрацьовує при зміні поточного відтворення відео. Функція throttle використовується обмеження частоти виклику функції
//getCurrentTime до одного разу на секунду.
player.setCurrentTime(JSON.parse(localStorage.getItem(CURRENT_TIME_KEY)) || 0);
//Виходить значення поточного часу відтворення локального сховища (якщо воно було збережено раніше).
//Потім встановлюється час відтворення на плеєрі за допомогою player.setCurrentTime.
player
  .setColor('#d8e0ff')
  .then(function (color) {
    console.log('The new color value: #D8E0FF');
  })
  .catch(function (error) {
    console.log('An error occurred while setting the color');
  });
  //Встановлюється колір програвача за допомогою методу setColor. Якщо операція буде успішною, виводиться повідомлення в консоль
  //про нове значення кольору. У разі помилки також відображається повідомлення про помилку.