import throttle from "lodash.throttle";
//Тут імпортується функція throttle із бібліотеки Lodash. throttle використовується для обмеження частоти виклику функції onInputData,
//що корисно, щоб уникнути надмірного оновлення даних у локальному сховищі при швидкому введенні.
const LOCAL_KEY = 'feedback-form-state';
//Ця константа використовується для завдання ключа, під яким дані форми зберігатимуться у локальному сховищі браузера.

const form = document.querySelector('.feedback-form');

form.addEventListener('input', throttle(onInputData, 500));
form.addEventListener('submit', onFormSubmit);
//Перший слухач відстежує подію input на формі і викликає функцію onInputData з використанням throttle. 
//throttle дозволяє викликати наInputData не частіше, ніж раз на 500 мілісекунд, щоб зменшити навантаження на локальне сховище при частому введенні даних.
// Другий слухач відслідковує подію підряду на формі і викликає функцію наFormSubmit, коли форма відправляється.

let dataForm = JSON.parse(localStorage.getItem(LOCAL_KEY)) || {};
//Цей рядок намагається отримати дані з локального сховища з ключем LOCAL_KEY і розбирає їх з JSON-рядка. 
//Якщо дані відсутні або можуть бути розібрані, створюється порожній об'єкт {} і присвоюється змінної dataForm.
const { email, message } = form.elements;
//Тут використовується деструктуризація об'єкта form.elements для отримання посилань на елементи форми з іменами email та message.
//Це дозволяє легко звертатися до даних, введених у ці поля.
reloadPage();
//Цей рядок викликає функцію reloadPage(), яка заповнює поля форми збереженими даними з об'єкта dataForm, якщо такі дані є.

function onInputData(e) {
    dataForm = { email: email.value, message: message.value };
    localStorage.setItem(LOCAL_KEY, JSON.stringify(dataForm));
  }
  //Ця функція викликається під час введення даних у поля форми. Вона оновлює об'єкт dataForm новими даними та зберігає їх
  //у локальне сховище браузера, перевівши об'єкт у JSON-рядок.

  function reloadPage() {
    if (dataForm) {
      email.value = dataForm.email || '';
      message.value = dataForm.message || '';
    }
    //Ця функція заповнює поля форм даних з об'єкта dataForm, якщо такі дані є. Якщо якесь із полів відсутнє у dataForm,
    //воно буде заповнене порожнім рядком.
  }

  function onFormSubmit(e) {
    e.preventDefault();
    console.log({ email: email.value, message: message.value });
  
    if (email.value === '' || message.value === '') {
      return alert('Please fill in all the fields!');
    }
  
    localStorage.removeItem(LOCAL_KEY);
    e.currentTarget.reset();
    dataForm = {};
  }
  //Ця функція викликається під час надсилання форми. Вона запобігає стандартній поведінці відправки форми (перезавантаження сторінки),
  //виводить дані з полів email та message в консоль, перевіряє, що обидва поля заповнені, і якщо ні, виводить попередження.
  //Потім видаляє дані з локального сховища за допомогою localStorage.removeItem, скидає значення полів форми і очищає об'єкт dataForm.