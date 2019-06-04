const slider = document.querySelector('#slider');
const sliderItems = slider.querySelectorAll('.slider__item');
const sliderPages = slider.querySelectorAll('.slider__page');
const sliderControls = slider.querySelector('#slider-controls');

let index = 0;
let hasNextSlide = false;
const lenght = sliderItems.length;

const btnRight = slider.querySelector('#btn-right');
const btnLeft = slider.querySelector('#btn-left');

btnLeft.addEventListener('click', handleClickMoveSlide);
btnRight.addEventListener('click', handleClickMoveSlide);
sliderControls.addEventListener('click', handleClickMoveSlide);

autoStartSlider();

function handleClickMoveSlide(e) {
  let nextIndex;
  if(e.currentTarget === btnRight) {
    nextIndex = (index + 1) % lenght;
  }
  else if(e.currentTarget === btnLeft) {
    nextIndex = index - 1 < 0 ? lenght - 1: index - 1;
  }
  else {
    nextIndex = e.target.dataset.index;
    if(!nextIndex) {
      return;
    }

  }
  changeSlide(nextIndex);
}

function changeSlide(nextIndex) {
  [...sliderItems].forEach(item => item.style.transform = `translateX(-${nextIndex * 100}%`);
  changeActivePage(index, nextIndex);
  index = nextIndex;
}
function changeActivePage(prevIndex, nextIndex)
{
  sliderPages[prevIndex].classList.remove('slider__page_active');
  sliderPages[nextIndex].classList.add('slider__page_active');
}

function autoStartSlider() {
  if(window.innerWidth <= 450) {
    slider.addEventListener('click', e => {
      hasNextSlide = true;
      nextSlide();
    });
    setInterval(() => {
      if(hasNextSlide) {
        hasNextSlide = false;
      }
      else {
        nextSlide();
      }
    }, 2000);
  }
}
function nextSlide() {
  let nextIndex = (index + 1) % lenght;
  changeSlide(nextIndex);
}

const langueges = {
  index: 0,
  texts: ['EN', 'FR', 'GM']
};
const values = {
  index: 0,
  texts: ["$", "€", "£"]
};

const headerTopLang = document.querySelector('#header-top-lang');
const headerTopValue = document.querySelector('#header-top-value');

headerTopLang.addEventListener('click', handleClickChange);
headerTopValue.addEventListener('click', handleClickChange);

function handleClickChange(e) {
  if(e.currentTarget === headerTopLang) {
   changeLangOrValue(e, langueges);
  }
  else {
    changeLangOrValue(e, values);
  }

}

function changeLangOrValue(event, data) {
  const btn = event.currentTarget.previousElementSibling;
  const index = event.target.dataset.index;
  if(index === data.index) {
    return;
  }

  event.currentTarget.children[data.index].classList.remove("header-top__btn_active");
  event.target.classList.add("header-top__btn_active");

  btn.innerHTML = data.texts[index];
  data.index = index;
}


const menu = document.querySelector('#menu');
menu.addEventListener('click', e => {
  if(e.target === menu) {
    menu.classList.add('show-menu-end');
    setTimeout(() => {
      menu.classList.remove('show-menu');
      menu.classList.remove('show-menu-end');
      }, 300);

  }
});

const btnMenu = document.querySelector('#btn-menu');
btnMenu.addEventListener('click', () => {
  menu.classList.add('show-menu');
});


const btnSignIn = document.querySelector('#log-in');
const btnSignUp = document.querySelector('#sign-up');
const headerModal = document.querySelector('#header-modal');
let modal = null;

btnSignIn.addEventListener('click', showModal);
btnSignUp.addEventListener('click', showModal);
function showModal(e) {
  e.stopPropagation();

  if(modal) {
    return;
  }
  let id = e.target.dataset.template;
  let source   = document.getElementById(id).innerHTML;
  let template = Handlebars.compile(source);

  let html = template({});
  headerModal.insertAdjacentHTML('beforeend', html);

  modal = document.querySelector('#modal');;

}

document.addEventListener('click', removeModal);

function removeModal(e) {
  const parent = e.target.closest('#modal')
  if(!parent) {
    if(modal) {
      modal.remove();
      modal = null;
      //document.removeEventListener('click', removeModal);
    }
  }
}
