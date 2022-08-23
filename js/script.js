"use strict";

// SWIPER LIBRARY INITIALIZATION
const swiper = new Swiper(".swiper", {
  // Optional parameters
  direction: "horizontal",
  loop: false,

  // If we need pagination
  pagination: {
    el: ".swiper-pagination",
  },

  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

// LIKE BUTTON
const likeBtn = document.querySelector(".icon--heart");
const filledBtn = document.querySelector(".heart--fill");

// Logic to add the animation to the heart button
likeBtn.closest(".like").addEventListener("click", function (e) {
  if (!e.target.classList.contains("hidden")) {
    likeBtn.classList.toggle("hidden");
    filledBtn.classList.toggle("hidden");
  }
});

// IMAGES API
const imagesContainer = document.querySelector(".swiper-wrapper");

// Render each image in the slider container
const renderImage = function (url1, url2, url3) {
  const html = `
      <div class="swiper-slide"><img class="swipe-img" src="${url1}" alt="slide1" /></div>
      <div class="swiper-slide"><img class="swipe-img" src="${url2}" alt="slide2" /></div>
      <div class="swiper-slide"><img class="swipe-img" src="${url3}" alt="slide3" /></div>
  `;

  imagesContainer.insertAdjacentHTML("beforeend", html);
};

// Random numbers to get different images everytime.
const random = function () {
  let randomNums = [];
  for (let i = 0; i < 3; i++) {
    randomNums.push(Math.trunc(Math.random() * 95) + 1);
  }
  return randomNums;
};

// IIFE calling the lorem picsum API
(function () {
  fetch(`https://picsum.photos/v2/list?page=2&limit=100`)
    .then((response) => response.json())
    .then((data) => {
      let randomNum = random();

      const imgs = data.map((img) => img.download_url);

      return renderImage(
        imgs[randomNum[0]],
        imgs[randomNum[1] + 1],
        imgs[randomNum[2] + 2]
      );
    });
})();

// COMMENT SECTION
const comment = document.querySelector(".comment-box");
const postBtn = document.querySelector(".post");

postBtn.addEventListener("click", function () {
  // Getting the text content from the input
  const content = comment.value;

  // If there is no content return inmediately
  if (!content) return;

  // Creating elements to append the text later
  const list = document.createElement("li");
  const spanEl = document.createElement("span");
  const textSpan = document.createTextNode("Comment ");
  const textList = document.createTextNode(content);

  // Adding classes to apply CSS
  list.classList.add("ul");

  // Adding values
  list.appendChild(textList);
  spanEl.appendChild(textSpan);
  list.prepend(spanEl);

  // adding list elements to the comments
  document.querySelector(".personal-comment").appendChild(list);

  // Resetting the value back to an empty space
  comment.value = "";

  // Scroll to the last comment
  const lastComment = document.querySelector(".ul");
  const topComment = document.querySelector(".comment-section");
  const commentCoords = lastComment.getBoundingClientRect();

  topComment.scrollTo({
    top: commentCoords.top,
    behavior: "smooth",
  });
});
