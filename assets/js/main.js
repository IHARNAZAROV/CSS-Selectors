const date = new Date();
const timeEl = document.querySelector('.time');
const time = date.toLocaleTimeString('ru-RU', {
  hour: '2-digit',
  minute: '2-digit',
});

timeEl.textContent = time;

function displayIframe() {
  document.getElementById('iframeDisplay').innerHTML = '<iframe src="./assets/html/start.html" target="_parent"  marginwidth="0" marginheight="0" scrolling="auto" onload="" width="950px" height="630px"  allowtransparency="false" ></iframe>';
}

const exampleWindow = document.getElementById('iframeDisplay');

function closeExampleWindow() {
  exampleWindow.classList.toggle('activeiframe');
}

document.getElementById('item').addEventListener('click', closeExampleWindow);
