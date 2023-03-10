// Declare the Variables
let section = document.querySelector("section");
let playerLivesCount = document.querySelector("span");
let playerLives = 10;

// Link text(playerLives)
playerLivesCount.textContent = playerLives;

// Generate the object
const getData = () => [
  { imgSrc: "./img/elephant.jpg", name: "elephant" },
  { imgSrc: "./img/zebra.jpg", name: "zebra" },
  { imgSrc: "./img/tiger.webp", name: "tiger" },
  { imgSrc: "./img/bear.jpg", name: "bear" },
  { imgSrc: "./img/horse.jpg", name: "horse" },
  { imgSrc: "./img/rabbit.jpg", name: "rabbit" },
  { imgSrc: "./img/lion.jpg", name: "lion" },
  { imgSrc: "./img/panda.jpg", name: "panda" },
  { imgSrc: "./img/elephant.jpg", name: "elephant" },
  { imgSrc: "./img/zebra.jpg", name: "zebra" },
  { imgSrc: "./img/tiger.webp", name: "tiger" },
  { imgSrc: "./img/bear.jpg", name: "bear" },
  { imgSrc: "./img/horse.jpg", name: "horse" },
  { imgSrc: "./img/rabbit.jpg", name: "rabbit" },
  { imgSrc: "./img/lion.jpg", name: "lion" },
  { imgSrc: "./img/panda.jpg", name: "panda" },
];

// Randomize the object
const randomize = () => {
  let randomizedCardData = getData();
  randomizedCardData.sort(() => Math.random() - 0.5);
  return randomizedCardData;
};

// Card generator function
const cardGenerator = () => {
  let cardData = randomize();
  // Generate the HTML
  cardData.forEach((item) => {
    let card = document.createElement("div");
    let face = document.createElement("img");
    let back = document.createElement("div");
    // card.classList.add("card"); // Here we can also use this type of syntax OR we can also use below type syntax.
    card.classList = "card"; // Here we add our first class that's why we use this type of syntax.
    face.classList = "face";
    back.classList = "back";
    // Attach the information into face and card.
    face.src = item.imgSrc; // Here we give not setAttribute because it's img tag.
    card.setAttribute("name", item.name); // Here we give setAttribute because it's div tag.
    // Append the card into section (sction ma attach krvu).
    section.appendChild(card);
    // Append the face and back into card (card ma attach krvu).
    card.appendChild(face);
    card.appendChild(back);

    card.addEventListener("click", (e) => {
      card.classList.toggle("toggleCard");
      checkCards(e);
    });
  });
};

// Check cards function
const checkCards = (e) => {
  let clickedCard = e.target;
  clickedCard.classList.add("flipped"); // Here we can not use below type of syntax because we can add one more class.
  //   card.classList = "card";
  let flippedCards = document.querySelectorAll(".flipped");
  //   console.log(flippedCards.length);
  let toggleCards = document.querySelectorAll(".toggleCard");

  //   Logic
  if (flippedCards.length === 2) {
    if (
      flippedCards[0].getAttribute("name") ===
      flippedCards[1].getAttribute("name")
    ) {
      // console.log("Match");
      flippedCards.forEach((card) => {
        card.classList.remove("flipped");
        card.style.pointerEvents = "none";
      });
    } else {
      // console.log("Wrong");
      flippedCards.forEach((card) => {
        card.classList.remove("flipped");
        setTimeout(() => card.classList.remove("toggleCard"), 1000);
      });
      playerLives--;
      playerLivesCount.textContent = playerLives;
      if (playerLives === 0) {
        restart("You lose the game!");
      }
    }
  }
  // Check if we won the game
  if (toggleCards.length === 16) {
    setTimeout(() => restart("Hurray! You won the game!"), 1000);
  }
};

// Restart function
const restart = (text) => {
  let restartedCardData = randomize();
  let restartedfaces = document.querySelectorAll(".face");
  let restartedCards = document.querySelectorAll(".card");
  section.style.pointerEvents = "none";
  restartedCardData.forEach((item, index) => {
    restartedCards[index].classList.remove("toggleCard");
    setTimeout(() => {
      restartedCards[index].style.pointerEvents = "all";
      restartedfaces[index].src = item.imgSrc;
      restartedCards[index].setAttribute("name", item.name);
      section.style.pointerEvents = "all";
    }, 1000);
  });
  playerLives = 10;
  playerLivesCount.textContent = playerLives;
  setTimeout(() => window.alert(text), 100);
};

cardGenerator();
