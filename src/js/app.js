const messageList = document.querySelector('.message__list');
const messageForm = document.querySelector('.message__form');
const coordinateModal = document.querySelector('.coordinate__modal');
const coordinateForm = document.querySelector('.coordinate__form');
messageForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const now = new Date();
  let coordinates;
  const newMessage = document.createElement('div');
  newMessage.classList.add('message__item');
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      coordinates = `${latitude}, ${longitude}`;
      newMessage.innerHTML = `<div class="message__date">${now.getDay()}.${now.getMonth()}.${now.getFullYear()} ${now.getHours()}:${now.getMinutes()}</div>
      ${messageForm.querySelector('.message__input').value}
      <div class="message__coord">${coordinates}</div>`;
      messageList.appendChild(newMessage);
    }, () => {
      coordinateModal.classList.add('coordinate__modal--display');
      coordinateForm.addEventListener('submit', (e) => {
        e.preventDefault();
        newMessage.innerHTML = `<div class="message__date">${now.getDay()}.${now.getMonth()}.${now.getFullYear()} ${now.getHours()}:${now.getMinutes()}</div>
          ${messageForm.querySelector('.message__input').value}
          <div class="message__coord">${coordinateForm.querySelector('.coordinate__input').value}</div>`;
        messageList.appendChild(newMessage);
        coordinateModal.classList.remove('coordinate__modal--display');
      })
    })
    return;
  }
  coordinateModal.classList.add('coordinate__modal--display');
  coordinateForm.addEventListener('submit', (e) => {
    e.preventDefault();
    newMessage.innerHTML = `<div class="message__date">${now.getDay()}.${now.getMonth()}.${now.getFullYear()} ${now.getHours()}:${now.getMinutes()}</div>
      ${messageForm.querySelector('.message__input').value}
      <div class="message__coord">${coordinateForm.querySelector('.coordinate__input').value}</div>`;
    messageList.appendChild(newMessage);
    coordinateModal.classList.remove('coordinate__modal--display');
  });
});


