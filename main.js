import {
  animate,
  scroll,
  hover,
} from "https://cdn.jsdelivr.net/npm/motion@latest/+esm";
// import { gsap } from "https://cdn.jsdelivr.net/npm/gsap@3.14.1/dist/gsap.min.js";
gsap.registerPlugin(ScrambleTextPlugin);

let blurbs = [
    "implement robust designs.",
    "high performance products.",
    "build maintainable softwares.",
  ],
  curIndex = 0;

setInterval(() => {
  curIndex = (curIndex + 1) % blurbs.length;
  gsap.to(".todo", {
    scrambleText: {
      text: blurbs[curIndex],
      chars: "upperAndLowerCase",
      revealDelay: 0.1,
      tweenLength: true,
      newClass: curIndex == 2 ? "border" : "",
    },
    ease: "power2.inOut",
    overwrite: "auto",
    duration: 2,
  });
}, 5000);

// Requirements

// Carousel should scroll to the left (one frame at a time)
// Carousel should be draggable to the left (many frame at a time)
// Carousel should be draggable to the right(many frame at a time)
// Buttons inside cards should be clickable
// Scroll should pause on mouse over
// Configuration should respond to window size change

// Responsiveness
// It should be responsive for tablet and mobile

// It should be implemented for touch screen

const carousel = document.querySelector(".carousel__wrapper");
const carouselInner = document.querySelector(".carousel__slides");
const slides = document.querySelectorAll(".carousel__slide");

let innerDim = window.innerWidth;
let itemsPerSlide =
  innerDim < 720 ? 1 : innerDim > 720 && innerDim < 1100 ? 3 : 4;
let position = itemsPerSlide;
let autoAdvanceInterval;
let userActivityTimeout;
let isWithinFrame = false;
let totalItems = slides.length;
let slideBy;
let isDragging = false;
let isAnimating = false;
let currentIndex;
let isRestarting = false;
let startX;
let startPosition;
let currrentCarouselWidth;

const initConfig = () => {
  innerDim = window.innerWidth;
  itemsPerSlide =
    innerDim < 720 ? 1 : innerDim >= 720 && innerDim < 1100 ? 3 : 4;
  slideBy = 1;
};

const carouselSetup = () => {
  const originalItems = Array.from(
    document.querySelectorAll(".carousel__slide:not(.clone)")
  );
  document.querySelectorAll(".clone").forEach((clone) => clone.remove());
  const lastClones = originalItems
    .slice(-itemsPerSlide)
    .map((item) => {
      const clone = item.cloneNode(true);
      clone.classList.add("clone");
      return clone;
    })
    .reverse();
  lastClones.forEach((clone) => carouselInner.prepend(clone));

  const firstClones = originalItems.slice(0, itemsPerSlide).map((item) => {
    const clone = item.cloneNode(true);
    clone.classList.add("clone");
    return clone;
  });
  firstClones.forEach((clone) => carouselInner.append(clone));
};

const startDrag = (e) => {
  e.preventDefault();
  isDragging = true;
  startX = e.type.includes("mouse") ? e.clientX : e.touches[0].clientX;
  startPosition = position;
  carousel.classList.add("dragging");
  carouselInner.style.transition = "none";
  document.body.style.cursor = "grabbing";
  document.body.style.userSelect = "none";
};
const drag = (e) => {
  e.preventDefault();
  if (isDragging) {
    // move carousel
    //   const translateX = (position * -103) / itemsPerSlide;
    // carouselInner.style.transform = `translateX(${translateX}%)`;
    carouselInner.style.transition = "transform 0.1s ease-in-out";
    const x = e.type.includes("mouse") ? e.clientX : e.touches[0].clientX;
    // const walk = ((x - startX) / carousel.offsetWidth) * itemsPerSlide;
    // const newPosition = startPosition - walk;
    // const translateX = (newPosition * -100) / itemsPerSlide;
    // carouselInner.style.transform = `translateX(${translateX}%)`;
    const walk = x - startX;
    carouselInner.style.transform = `translateX(${
      currrentCarouselWidth + walk
    }px)`;
  }
};
const endDrag = (e) => {
  e.preventDefault();
  if (!isDragging) return;
  isDragging = false;
  carousel.classList.remove("dragging");
  document.body.style.cursor = "";
  document.body.style.userSelect = "";

  // position carousel logic
  const x = e.type?.includes("mouse")
    ? e.clientX
    : e.changedTouches
    ? e.changedTouches[0].clientX
    : startX;

  const walk = ((x - startX) / carousel.offsetWidth) * itemsPerSlide;

  if (walk > 0.2) {
    prev();
  } else if (walk < -0.2) {
    next();
  } else {
    updateCarouselPosition();
  }
  carouselInner.style.transition = "transform 0.5s ease";
};

const next = () => {
  isAnimating = true;
  if (!isDragging) {
    position += slideBy;
    updateCarouselPosition();
  }
  isAnimating = false;
};

function prev() {
  if (isAnimating) return;
  isAnimating = true;
  position -= slideBy;
  updateCarouselPosition();
  isAnimating = false;
}

let carouselWidthInterval;
clearInterval(carouselWidthInterval);
carouselWidthInterval = setInterval(() => {
  currrentCarouselWidth = carouselInner.getBoundingClientRect().x;
}, 500);

function startAutoAdvance() {
  clearInterval(autoAdvanceInterval);
  autoAdvanceInterval = setInterval(next, 3000);
}

function resetAutoAdvanceTimer() {
  clearTimeout(userActivityTimeout);
  clearInterval(autoAdvanceInterval);
  userActivityTimeout = setTimeout(startAutoAdvance, 100);
}

const debounce = (func, delay = 500) => {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(this, args), delay);
  };
};

carousel.addEventListener("mousedown", startDrag);
carousel.addEventListener("mousemove", debounce(drag));
carousel.addEventListener("mouseup", endDrag);

carousel.addEventListener("touchstart", startDrag, { passive: true });
carousel.addEventListener("touchmove", debounce(drag), { passive: true });
carousel.addEventListener("touchend", endDrag);

carousel.addEventListener("mouseenter", () => {
  clearInterval(autoAdvanceInterval);
});

carousel.addEventListener("mouseleave", () => {
  isRestarting = true;
  resetAutoAdvanceTimer();
});

carouselInner.addEventListener("transitionend", (e) => {
  e.preventDefault();
  isAnimating = false;
  // Handle infinite loop logic
  if (position >= totalItems + itemsPerSlide) {
    position = itemsPerSlide + (position - (totalItems + itemsPerSlide));
    updateCarouselPosition(false);
  } else if (position < itemsPerSlide) {
    position = totalItems + position;
    updateCarouselPosition(false);
  }
  currentIndex = (position - itemsPerSlide) % totalItems;
});

const updateCarouselPosition = (animate = true) => {
  if (animate) {
    carouselInner.style.transition = "transform 2s ease";
  } else {
    carouselInner.style.transition = "none";
  }

  const translateX = (position * -103) / itemsPerSlide;
  carouselInner.style.transform = `translateX(${translateX}%)`;
  // console.log(translateX);
  // console.log("currrentCarouselWidth: ", currrentCarouselWidth);
};

const stop = () => {
  document.querySelectorAll(".clone").forEach((clone) => clone.remove());
  clearTimeout(userActivityTimeout);
  clearInterval(autoAdvanceInterval);
};

window.addEventListener("resize", (e) => {
  e.preventDefault();
  if (isWithinFrame) {
    initConfig();
    carouselSetup();
    position = itemsPerSlide;
    updateCarouselPosition(false);
  }
});

const callback = (entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      initConfig();
      carouselSetup();
      updateCarouselPosition(false);
      isWithinFrame = true;
      startAutoAdvance();
    } else {
      stop();
    }
  });
};

const observer = new IntersectionObserver(callback, { threshold: 0.1 });
observer.observe(carousel);

const main = document.querySelector(".heading__wrapper");

gsap.set(".heading__wrapper", { perspective: 650 });

const outerRX = gsap.quickTo(".title", "rotationX", { ease: "power3" });
const outerRY = gsap.quickTo(".title", "rotationY", { ease: "power3" });
const innerX = gsap.quickTo(".heading-desc", "x", { ease: "power3" });
const innerY = gsap.quickTo(".heading-desc", "y", { ease: "power3" });

main.addEventListener("pointermove", (e) => {
  outerRX(gsap.utils.interpolate(15, -15, e.y / window.innerHeight));
  outerRY(gsap.utils.interpolate(-15, 15, e.x / window.innerWidth));
  innerX(gsap.utils.interpolate(-30, 30, e.x / window.innerWidth));
  innerY(gsap.utils.interpolate(-30, 30, e.y / window.innerHeight));
});

main.addEventListener("pointerleave", (e) => {
  outerRX(0);
  outerRY(0);
  innerX(0);
  innerY(0);
});
