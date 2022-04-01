import './style.css';

const content = document.querySelector('.content');
const nav = document.querySelector('div.nav');
const navAlt = document.querySelector('div.nav-alt');

(function getMenuInput() {
  const menuExpand = nav.querySelector('button.expand');
  const menuOther = nav.querySelectorAll('button.menu-item');

  function expandMenu() {
    menuExpand.classList.add('active');
    navAlt.classList.add('active');
  }

  function shrinkMenu() {
    menuExpand.classList.remove('active');
    navAlt.classList.remove('active');
  }

  // For desktop
  menuExpand.addEventListener('mouseover', function () {
    if (!isTouchDevice()) {
      expandMenu();
    }
  });
  menuExpand.addEventListener('mouseout', function () {
    if (!isTouchDevice()) {
      shrinkMenu();
    }
  });
  navAlt.addEventListener('mouseover', function () {
    if (!isTouchDevice()) {
      expandMenu();
    }
  });
  navAlt.addEventListener('mouseout', function () {
    if (!isTouchDevice()) {
      shrinkMenu();
    }
  });

  // For mobile or touch device
  // Expand or shrink the alt menu on input
  menuExpand.addEventListener('click', function () {
    // Don't let desktop user click the button when expanded
    if (!isTouchDevice()) return;
    if (this.classList.contains('active')) {
      shrinkMenu();
    } else {
      expandMenu();
    }
  });

  // Shrink the alt menu on any click outside
  menuOther.forEach((button) => {
    button.addEventListener('click', function () {
      shrinkMenu();
    });
  });
  content.addEventListener('click', function () {
    shrinkMenu();
  });

  // Remove the alt navbar on target choice
  navAlt.addEventListener('click', function () {
    shrinkMenu();
  });

  // Check if the user is using a touch device or desktop
  function isTouchDevice() {
    return (
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      navigator.msMaxTouchPoints > 0
    );
  }
})();

(function createCarousel() {
  const carousel = document.querySelector('.carousel');
  const images = carousel.querySelectorAll('img');
  const arrowControls = carousel.querySelectorAll('.controls');
  const quickControls = document.querySelectorAll('.slider button');
  const progressBar = document.querySelector('.progress-bar .timer');

  // Let the user change image with arrows
  arrowControls.forEach((button) => {
    button.addEventListener('click', setImageFromArrows);
  });

  // Let the user change image from dots
  quickControls.forEach((button) => {
    button.addEventListener('click', setImageFromControls);
  });

  let count = 0;
  let imgTimer = window.setInterval(setImageFromTimer, 5000);
  let progressBarTimer;
  setActiveImage(count);

  // Change the image every 5 seconds

  function setImageFromArrows() {
    if (this.classList.contains('next')) {
      count++;
    } else {
      count--;
    }
    setActiveImage(count);
  }

  function setImageFromControls() {
    setActiveImage(this.value);
  }

  function setImageFromTimer() {
    count++;
    setActiveImage(count);
  }

  function setActiveImage(index) {
    // Always keep count between 0 and 4
    if (index < 0) {
      count = index + 5;
    } else {
      count = index % 5;
    }
    for (const img of images) {
      img.classList.remove('active');
    }
    for (const dot of quickControls) {
      dot.classList.remove('active');
    }
    images[count].classList.add('active');
    quickControls[count].classList.add('active');

    // Reset the timer
    clearInterval(imgTimer);
    imgTimer = window.setInterval(setImageFromTimer, 5000);
    updateProgressBar();
  }

  function updateProgressBar() {
    let width = 1;
    clearInterval(progressBarTimer);
    progressBarTimer = setInterval(moveProgressBar, 50);
    function moveProgressBar() {
      width++;
      progressBar.style.width = `${width}%`;
    }
  }
})();
