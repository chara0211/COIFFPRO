// Gestion du burger menu on click*********************************************************************************************************
document.addEventListener("DOMContentLoaded", function () {
  const menuIcon = document.querySelector(".fa-bars");
  const menu = document.getElementById("menu");

  menuIcon.addEventListener("click", function () {
    menu.classList.toggle("menuPhone");
    if (!menu.classList.contains("menuPhone")) {
      menu.setAttribute("hidden", true);
    } else {
      menu.removeAttribute("hidden");
    }
  });
});

// Gestion des categories on small media**********************************************************************
document.addEventListener("DOMContentLoaded", function () {
  const circles = document.querySelectorAll(".services .cercle");
  let currentIndex = 0;

  // Initialize by showing the first circle
  circles[currentIndex].classList.add("active");

  // Function to update active circle
  function updateCircle(index) {
    circles.forEach((circle, i) => {
      circle.classList.toggle("active", i === index);
    });
  }

  // Left arrow click event
  document.querySelector(".left-arrow").addEventListener("click", () => {
    currentIndex = (currentIndex > 0) ? currentIndex - 1 : circles.length - 1;
    updateCircle(currentIndex);
  });

  // Right arrow click event
  document.querySelector(".right-arrow").addEventListener("click", () => {
    currentIndex = (currentIndex < circles.length - 1) ? currentIndex + 1 : 0;
    updateCircle(currentIndex);
  });
});

// Gestion de price slider*********************************************************************************************************
// First Price Slider Elements
const slider1 = document.querySelector(".price-range-slider");
const lowerHandle1 = document.querySelector(".slider-handle-lower");
const upperHandle1 = document.querySelector(".slider-handle-upper");
const lowerPriceDisplay1 = document.querySelector(
  ".slider-range__prices-lower span"
);
const upperPriceDisplay1 = document.querySelector(
  ".slider-range__prices-upper span"
);

// Second Price Slider Elements
const slider2 = document.querySelector(".price-range-slider.second-slider");
const lowerHandle2 = document.querySelector(".slider-handle-lower-second");
const upperHandle2 = document.querySelector(".slider-handle-upper-second");
const lowerPriceDisplay2 = slider2.parentNode.querySelector(
  ".slider-range__prices-lower span"
);
const upperPriceDisplay2 = slider2.parentNode.querySelector(
  ".slider-range__prices-upper span"
);

const minPrice = 0;
const maxPrice = 2643;

// Slider State Variables
let lowerValue1 = minPrice;
let upperValue1 = maxPrice;
let lowerValue2 = minPrice;
let upperValue2 = maxPrice;

// Utility function to calculate price based on slider position
function calculatePrice(position, isUpperHandle, slider) {
  return Math.round(
    minPrice + ((maxPrice - minPrice) * position) / slider.clientWidth
  );
}

// Update slider track between handles
function updateSliderTrack(slider, lowerHandle, upperHandle) {
  const lowerPosition =
    ((parseFloat(lowerHandle.style.left) || 0) / 100) * slider.clientWidth;
  const upperPosition =
    ((parseFloat(upperHandle.style.left) || 0) / 100) * slider.clientWidth;
  slider.querySelector(".slider-track").style.left = `${lowerPosition}px`;
  slider.querySelector(".slider-track").style.width = `${
    upperPosition - lowerPosition
  }px`;
}

// Update handle positions and display prices
function updatePosition(slider, lowerHandle, upperHandle, lowerDisplay, upperDisplay, lowerValue, upperValue) {
  lowerHandle.style.left = `${
    ((lowerValue - minPrice) / (maxPrice - minPrice)) * 100
  }%`;
  upperHandle.style.left = `${
    ((upperValue - minPrice) / (maxPrice - minPrice)) * 100
  }%`;
  lowerDisplay.textContent = lowerValue;
  upperDisplay.textContent = upperValue;
  updateSliderTrack(slider, lowerHandle, upperHandle);
}

// Drag event handler for each slider
function handleDrag(event, handle, slider, isUpperHandle, lowerValue, upperValue, updateValuesCallback) {
  function onMouseMove(e) {
    const rect = slider.getBoundingClientRect();
    const offset = e.clientX - rect.left;
    const newValue = calculatePrice(
      Math.min(Math.max(offset, 0), slider.clientWidth),
      isUpperHandle,
      slider
    );

    if (isUpperHandle) {
      if (newValue > lowerValue) {
        upperValue = newValue;
        updateValuesCallback(lowerValue, upperValue);
      }
    } else {
      if (newValue < upperValue) {
        lowerValue = newValue;
        updateValuesCallback(lowerValue, upperValue);
      }
    }
  }

  function onMouseUp() {
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
  }

  document.addEventListener("mousemove", onMouseMove);
  document.addEventListener("mouseup", onMouseUp);
}

// Initialize slider event listeners and setup
function initializeSlider(slider, lowerHandle, upperHandle, lowerDisplay, upperDisplay, initialLowerValue, initialUpperValue) {
  let lowerValue = initialLowerValue;
  let upperValue = initialUpperValue;

  function updateValuesCallback(newLowerValue, newUpperValue) {
    lowerValue = newLowerValue;
    upperValue = newUpperValue;
    updatePosition(slider, lowerHandle, upperHandle, lowerDisplay, upperDisplay, lowerValue, upperValue);
  }

  lowerHandle.addEventListener("mousedown", (event) =>
    handleDrag(event, lowerHandle, slider, false, lowerValue, upperValue, updateValuesCallback)
  );
  upperHandle.addEventListener("mousedown", (event) =>
    handleDrag(event, upperHandle, slider, true, lowerValue, upperValue, updateValuesCallback)
  );

  updatePosition(slider, lowerHandle, upperHandle, lowerDisplay, upperDisplay, lowerValue, upperValue);
}

// Initialize both sliders
initializeSlider(slider1, lowerHandle1, upperHandle1, lowerPriceDisplay1, upperPriceDisplay1, lowerValue1, upperValue1);
initializeSlider(slider2, lowerHandle2, upperHandle2, lowerPriceDisplay2, upperPriceDisplay2, lowerValue2, upperValue2);


// Gestion du filtre on small media *********************************************************************************************************
let closeButton = document.querySelector(".close");
let filter = document.querySelector(".slide-filter");
let filterIcon = document.querySelector("#filtericon");

closeButton.addEventListener("click", () => {
  filter.style.left = "100%";
});

filterIcon.addEventListener("click", (e) => {
  e.preventDefault();
  filter.style.left = "0";
});

// Show or hide the button based on scroll position*********************************************************************************************************
const backToTopButton = document.querySelector(".back-to-top");

window.addEventListener("scroll", function () {
  if (window.scrollY > 200) {
    // Show button when scrolled down 200px
    backToTopButton.style.display = "flex";
  } else {
    backToTopButton.style.display = "none";
  }
});

// Smooth scroll to the top when button is clicked
backToTopButton.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
