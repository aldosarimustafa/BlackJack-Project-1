const suits = ['s', 'c', 'd', 'h'];
const ranks = ['02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K', 'A'];
const masterDeck = buildMasterDeck();


/*----- app's state (variables) -----*/
let gameStatus;
let shuffledDeck;
let dealerHand;
let playerHand;
let winner;
let betPower;
let bet;
let dealerTotal;
let playerTotal;

/*----- cached element references -----*/
const headerEl = document.querySelector("h1");
const playerCardEl = document.getElementById("plr");
const dealerCardEl = document.getElementById("dlr");
const playerTotalEl = document.getElementById("player-total");
const dealerTotalEl = document.getElementById("dealer-total");
const hitEl = document.querySelector("#hit");
const standEl = document.querySelector("#stand");
const dealEl = document.querySelector("#deal");
/*----- event listeners -----*/
document.querySelector("#hit").addEventListener("click", hit)
document.querySelector("#stand").addEventListener("click", stand)
document.querySelector("#deal").addEventListener("click", setDeal)
/*----- functions -----*/


function setDeal() {
    dealEl.disabled = true;
    hitEl.disabled = false;
    standEl.disabled = false;
    headerEl.innerHTML = "Choose Hit or Stand!"
    dealHand();
    render();
}

function dealHand(hand) {
    playerHand = [shuffledDeck.pop(), shuffledDeck.pop()]
    dealerHand = [shuffledDeck.pop(), shuffledDeck.pop()]
    
};


init()
function init() {
  shuffledDeck = getNewShuffledDeck(); 
  dealerHand = [];
  playerHand = [];
  dealerTotal = 0;
  playerTotal = 0;
  bet = 0;
  gameStatus = null;
  betPower = 0;
  winner = null;
 hitEl.disabled = true;
  standEl.disabled = true;
   render();
} 


function render() {
   playerTotal = 0; 
  let playerCardsHtml = '';
  playerHand.forEach(function(card) {
    playerCardsHtml += `<div class="card ${card.face}"></div>`;
    playerTotal += card.value;
    playerTotalEl.innerHTML = playerTotal;
    });
  playerCardEl.innerHTML = playerCardsHtml;
  
    dealerTotal = 0;
  let dealerCardsHtml = "";
  dealerHand.forEach(function(card) {
    dealerCardsHtml += `<div class="card ${card.face}"></div>`;
    dealerTotal += card.value;
    dealerTotalEl.innerHTML = dealerTotal;
    });
    
  dealerCardEl.innerHTML = dealerCardsHtml;
};

function stand() {
  hitEl.disabled = true;
  dealerHand.push(shuffledDeck.pop());
  render();
}

function hit() {
  standEl.disabled = true;
  playerHand.push(shuffledDeck.pop());
  render();

}



function getNewShuffledDeck() {
    const tempDeck = [...masterDeck];
    const newShuffledDeck = [];
    while (tempDeck.length) {

      const rndIdx = Math.floor(Math.random() * tempDeck.length);
      newShuffledDeck.push(tempDeck.splice(rndIdx, 1)[0]);
    }
    return newShuffledDeck;
  }

  function buildMasterDeck() {
      const deck = [];
    suits.forEach(function(suit) {
        ranks.forEach(function(rank) {
          deck.push({
            face: `${suit}${rank}`,
            value: Number(rank) || (rank === "A" ? 11 : 10)
          })
        })
      }) 
      return deck;
    }