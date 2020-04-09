const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-one');
const messageTwo = document.querySelector('#message-two');


weatherForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const location = search.value;
  messageOne.textContent = 'Searching...';
  messageTwo.textContent = '';
  fetch(`http://localhost:3000/weather?address=${location}`).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        messageTwo.textContent = '';
        messageOne.textContent = 'There has been an error';
      } else {
        messageOne.textContent = location;
        messageTwo.textContent = `It is currently ${data.temp} in ${location}. There is a ${data.rainProb}% chance of rain`;
      }
    })
  })
})
