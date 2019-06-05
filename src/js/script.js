class Slider {
  constructor(slider) {
    this.slider = slider;
    this.sliderItems = this.slider.querySelectorAll('.slider__item');
    this.sliderPages = this.slider.querySelectorAll('.slider__page');
    this.sliderControls = this.slider.querySelector('#slider-controls');
    this.btnRight = this.slider.querySelector('#btn-right');
    this.btnLeft = this.slider.querySelector('#btn-left');

    this.index = 0;
    this.hasNextSlide = false;

    this.btnLeft.addEventListener('click', this.handleClickMoveSlide);
    this.btnRight.addEventListener('click', this.handleClickMoveSlide);
    this.sliderControls.addEventListener('click', this.handleClickMoveSlide);

    this.autoStartSlider();
  }

  get length() {
    return this.sliderItems.length;
  }

  handleClickMoveSlide = e => {
    let nextIndex;
    if(e.currentTarget === this.btnRight) {
      nextIndex = (this.index + 1) % this.length;
    }
    else if(e.currentTarget === this.btnLeft) {
      nextIndex = this.index - 1 < 0 ? this.length - 1: this.index - 1;
    }
    else {
      nextIndex = e.target.dataset.index;
      if(!nextIndex) {
        return;
      }

    }
    this.changeSlide(nextIndex);
  }

  changeSlide = nextIndex => {
    [...this.sliderItems].forEach(item => item.style.transform = `translateX(-${nextIndex * 100}%`);
    this.changeActivePage(this.index, nextIndex);
    this.index = nextIndex;
  }

  changeActivePage = (prevIndex, nextIndex) =>
  {
    this.sliderPages[prevIndex].classList.remove('slider__page_active');
    this.sliderPages[nextIndex].classList.add('slider__page_active');
  }

  autoStartSlider = () => {
    if(window.innerWidth <= 450) {
      this.slider.addEventListener('click', e => {
        this.hasNextSlide = true;
        this.nextSlide();
      });
      setInterval(() => {
        if(this.hasNextSlide) {
          this.hasNextSlide = false;
        }
        else {
          this.nextSlide();
        }
      }, 2000);
    }
  }
  nextSlide = () => {
    let nextIndex = (this.index + 1) % this.length;
    this.changeSlide(nextIndex);
  }
}

const slider = new Slider(document.querySelector('#slider'));


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
