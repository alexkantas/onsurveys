const body = document.querySelector('body');
const bnyBtn = document.querySelector('#bnyButton');
bnyBtn.addEventListener('click', () => {
    if (body.classList.contains('blackNyellow')) return body.classList.remove('blackNyellow');
    body.classList.add('blackNyellow')
})