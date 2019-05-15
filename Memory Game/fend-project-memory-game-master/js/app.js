/*
 * Create a list that holds all of your cards
 */
 // constant with all card faces
const faces = ["fa fa-diamond","fa fa-diamond","fa fa-paper-plane-o",
"fa fa-paper-plane-o","fa fa-anchor","fa fa-anchor","fa fa-bolt","fa fa-bolt",
"fa fa-cube","fa fa-cube","fa fa-leaf","fa fa-leaf","fa fa-bicycle",
"fa fa-bicycle","fa fa-bomb","fa fa-bomb"];

// Create cards
// create all variables
// start a timer here so scope is across the whole page

const cardDeck = document.querySelector(".deck");
let shuffledDeck = [];
let flippedCards = [];
let matchedCards = [];
let moves = 0;
let time = 0;
let finishTime = 0;
let gameTimer = setInterval(startTimer,1000);


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

//function to initiliaze game
//creates and shuffles deck and starts event listener
function init(){
    shuffledDeck = shuffle(faces);
    for(let i = 0; i < faces.length; i++){
      const card = document.createElement("div");
      card.classList.add("card");
      card.innerHTML = `<i class="${shuffledDeck[i]}"></i>`;
      cardDeck.appendChild(card);
      //listen for clicks
      click(card);
    }
 }

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
 // event listener that "flips" cards and compares
 function click(card){
   card.addEventListener("click",function(){
     // if no cards have been flipped yet, display and add card to flipped stack
     // if two cards have been flipped show and compare, add to moves, check if rating needs to change
     if(flippedCards.length === 0){
       card.classList.add("open");
       card.classList.add("show");
       card.classList.add("disable");
       flippedCards.push(this);
     } else {
       card.classList.add("open");
       card.classList.add("show");
       card.classList.add("disable");
       const secondCard = this;
       const firstCard = flippedCards[0];
       flippedCards.push(this);
       checkMatch(secondCard, firstCard);
       moveCounter();
       rating();
     }
   });
 }

// function to check if flipped cards match
 function checkMatch(secondCard, firstCard){
   // if they match add to match list and reset flippedCards array
   if(secondCard.innerHTML === firstCard.innerHTML){
     secondCard.classList.add("match");
     firstCard.classList.add("match")
     matchedCards.push(secondCard, firstCard);
     flippedCards = [];

     //check if you won but have 100ms delay so card can finish flipping
     // alert player that they won and stop timer
     if(matchedCards.length === 16){
       setTimeout(function(){
         alert(`YOU WIN! You took ${moves} moves and ${time} seconds! Press the restart button to play again!`);
         clearInterval(gameTimer);
       },100);
     }
   } else {
     // if they don't match "flip" it back and reset array
     // wait half a second before flipping back so that you can see it
     flippedCards = [];
     setTimeout(function(){
       secondCard.classList.remove("open");
       secondCard.classList.remove("show");
       secondCard.classList.remove("disable");
       firstCard.classList.remove("open");
       firstCard.classList.remove("show");
       firstCard.classList.remove("disable");
     },500);
   }
 }

// move counter
// every time the second card is pressed the move counter goes up
  const showMoves = document.querySelector(".moves");
  function moveCounter(){
    moves++;
    showMoves.innerHTML = moves;
  }

// timer that counts time variable up every second
  const showTimer = document.querySelector(".timer");
  function startTimer(){
    time++;
    showTimer.innerHTML = time;
  };

  // star rating
  // decreases star rating based on number of moves
  const starRating = document.querySelector(".stars");
  function rating(){
    if(moves > 15){
      starRating.innerHTML = `<li><i class="fa fa-star"></i></li>
      <li><i class="fa fa-star"></i></li>`;
    }
    if (moves > 20){
      starRating.innerHTML = `<li><i class="fa fa-star"></i></li>`;
    }
  }

  // resets to three stars
  function resetStars(){
    starRating.innerHTML = `<li><i class="fa fa-star"></i></li>
    <li><i class="fa fa-star"></i></li>
    <li><i class="fa fa-star"></i></li>`;
  }


 // create restart button and event listener
 // event listener deletes deck and resets arrays and variables and calls init again
 const resetButton = document.querySelector(".restart");
 resetButton.addEventListener("click", function(){
   cardDeck.innerHTML = "";
   flippedCards = [];
   matchedCards = [];
   time = 0;
   moves = 0;
   showTimer.innerHTML = time;
   showMoves.innerHTML = moves;
   resetStars();
   gameTimer = setInterval(startTimer,1000);
   init();
 })

// call init to start game
  init();
