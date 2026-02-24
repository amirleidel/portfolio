'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");
const modalTime = document.querySelector("[data-modal-time]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;
    modalTime.innerHTML = this.querySelector("[data-testimonials-time]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);

// testimonials scroll buttons on desktop devices

const list = document.querySelector('.testimonials-list');
const items = document.querySelectorAll('.testimonials-item');
const prev = document.querySelector('.scroll-btn.left');
const next = document.querySelector('.scroll-btn.right');

const wrapper = document.querySelector('.testimonials-wrapper');
const firstItem = document.querySelector('.testimonials-item');

function positionScrollButtons() {
  if (!firstItem) return;

  const listRect = list.getBoundingClientRect();
  const itemRect = firstItem.getBoundingClientRect();
  const wrapperRect = wrapper.getBoundingClientRect();

  // distance from wrapper top → li center
  const top =
    (itemRect.top - wrapperRect.top) +
    itemRect.height / 2;

  prev.style.top = `${top}px`;
  next.style.top = `${top}px`;
}

// run once and on resize
positionScrollButtons();
window.addEventListener('resize', positionScrollButtons);

const GAP = 15; // must match CSS gap
const BREAKPOINT = 1024;

function itemsPerScroll() {
  return window.innerWidth >= BREAKPOINT ? 2 : 1;
}

function scrollAmount() {
  const count = itemsPerScroll();
  const itemWidth = items[0].offsetWidth;

  return count * itemWidth + (count * GAP);
}

function updateButtons() {
const maxScrollLeft =
  list.scrollWidth - list.clientWidth;

// beginning
prev.classList.toggle(
  'is-hidden',
  list.scrollLeft <= 1
);

// end
next.classList.toggle(
  'is-hidden',
  list.scrollLeft >= maxScrollLeft - 1
);
}

next.addEventListener('click', () => {
  list.scrollBy({ left: scrollAmount(), behavior: 'smooth' });
});

prev.addEventListener('click', () => {
  list.scrollBy({ left: -scrollAmount(), behavior: 'smooth' });
});

// update on scroll + resize
list.addEventListener('scroll', updateButtons);
window.addEventListener('resize', updateButtons);

// initial state
updateButtons();


// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}