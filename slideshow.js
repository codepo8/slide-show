if (typeof slideshow === 'object') {
let styles = document.createElement('link');
styles.rel="stylesheet";
styles.href="slideshow.css";
document.head.appendChild(styles);
document.querySelector(slideshow.container).innerHTML = `
<div class="slideshow-info"></div>
<div class="slideshow-docs">Arrow keys go back/forward.
<span>space to toggle autoplay</span></div>
<button id="slideshow-next">▶</button>
<button id="slideshow-prev">◀</button>
<button id="slideshow-autoplay"></button>
<div class="slideshow-wrapper">
</div>
`;
const out = document.querySelector('.slideshow-info');
const wrapper = document.querySelector('.slideshow-wrapper');
const next = document.querySelector('#slideshow-next');
const prev = document.querySelector('#slideshow-prev');
const autoplay = document.querySelector('#slideshow-autoplay');
let hash = 'counter' + slideshow.folder;
let counter = localStorage.getItem(hash)||0;
let autoincrease = slideshow.autoplay === 'no' ? false : true;
let restart = slideshow.endless === 'no' ? false : true;
let first = false;
let last = false;
let timeout = false;
let speed = slideshow.speed || 3000;
let all = slideshow.media.length

function validatecounter() {
  autoplay.innerText = autoincrease ? "▶️" : '⏸';
  if (restart) {
    if (counter < 0) counter = all - 1;
    counter = counter % all;
  } else {
    if (counter <= 0) {
      counter = 0;
    }
    if (counter === all) counter = all - 1;
  }
  if (!restart) {
    first = counter === 0;
    last = counter === all - 1;
      if (counter === 0) {
      prev.classList.add('hidden'); 
    } else {
      prev.classList.remove('hidden'); 
    }
    if (counter === all - 1) {
      next.classList.add('hidden'); 
      autoplay.classList.add('hidden'); 
    } else {
      next.classList.remove('hidden'); 
      autoplay.classList.remove('hidden'); 
    }
  }

  localStorage.setItem(hash,counter);
  show();
}
function show() {
  clearTimeout(timeout);
  out.innerText = `${slideshow.media[counter]} ${counter+1}/${all}`;
  wrapper.innerText = '';
  wrapper.dataset.loaded = 'false';

  if(slideshow.media[counter].endsWith('.mp4')) {
    wrapper.style.backgroundImage = ``;
    let vid = document.createElement('video');
    vid.setAttribute('loop','true');
    vid.setAttribute('autoplay','true');
    vid.setAttribute('src', slideshow.folder + slideshow.media[counter]);
    if (wrapper.dataset.loaded === 'false') {
      vid.addEventListener('canplaythrough', ev => {
        wrapper.appendChild(vid);
        loaded();
      },{passive:true, once:true});
    }
  } else {
    wrapper.innerText = ' ';
    let url = slideshow.folder + slideshow.media[counter];
    let i = new Image();
    i.src = url;
    i.onload = function() {
      wrapper.style.backgroundImage = `url(${url})`;
      loaded();
    }
    i.onerror = function() {
      wrapper.innerText = 'Error loading image ' + url;
      loaded();
    }
  }
}
function loaded() {
  wrapper.dataset.loaded = 'true';
  if (autoincrease && !last) {
    timeout = window.setTimeout(function(){
      counter++;
      validatecounter();
    },speed);
  }
}
function nextslide() {
  if(!last) {
    counter++;
    autoincrease = false;
    validatecounter();
  }
};
function prevslide() {
  if(!first) {
    counter--;
    autoincrease = false;
    validatecounter();
  }
};
function toggleauto() {
  autoincrease = !autoincrease;
  validatecounter();
};
next.addEventListener('click', nextslide);
prev.addEventListener('click', prevslide);
autoplay.addEventListener('click',toggleauto);
document.addEventListener('keyup', ev => {
  ev.preventDefault();
  if (ev.key === "ArrowRight") { nextslide(); }
  if (ev.key === "ArrowUp") { history.back(); }
  if (ev.key === "ArrowLeft") { prevslide(); }
  if (ev.key === " ") { toggleauto(); }
});
validatecounter();
} else {
  console.error('Please define a slideshow object first');
  document.body.innerText = "⚠️ Can't find slideshow object"
}
