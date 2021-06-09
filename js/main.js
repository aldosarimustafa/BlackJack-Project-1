const suits = ['s', 'c', 'd', 'h'];
const ranks = ['02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K', 'A'];
const masterDeck = buildMasterDeck();


/*----- app's state (variables) -----*/
let shuffledDeck;
let playerHand;
let dealerHand;
let winner;
let dealerTotal;
let playerTotal;
let gameStatus

/*----- cached element references -----*/
const dealEl = document.querySelector("#deal");
const headerEl = document.querySelector("h1");
const playerCardEl = document.getElementById("plr");
const dealerCardEl = document.getElementById("dlr");
const playerTotalEl = document.getElementById("player-total");
const dealerTotalEl = document.getElementById("dealer-total");
const hitEl = document.querySelector("#hit");
const standEl = document.querySelector("#stand");
/*----- event listeners -----*/
document.querySelector("#deal").addEventListener("click", setDeal)
document.querySelector("#hit").addEventListener("click", hit)
document.querySelector("#stand").addEventListener("click", stand)
/*----- functions -----*/
init()
function init() {
  shuffledDeck = getNewShuffledDeck(); 
  playerHand = [];
  dealerHand = [];
  playerTotal = 0;
  dealerTotal = 0;
  gameStatus = null;
  winner = null;
 hitEl.disabled = true;
  standEl.disabled = true;
   render();
} 

function setDeal() {
  standEl.disabled = false;
  hitEl.disabled = false;
  dealEl.disabled = true;
  dealEl.style.visibility = "hidden"
  headerEl.innerHTML = "Chose Hit or Stand!"
  dealHand();
    render();
 }

function dealHand(hand) {
    playerHand = [shuffledDeck.pop(), shuffledDeck.pop()]
    dealerHand = [shuffledDeck.pop(), shuffledDeck.pop()]
};
  

  

function render() {
  if(dealerHand.length < 5) {
    getNewShuffledDeck();
  }
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
  checkBlkJck();
  
};

function hit() {
  
  playerHand.push(shuffledDeck.pop());
  render();
  if(dealerTotal === 21 || playerTotal > 21) {
    dealerWins();
    return;
  } else if (playerTotal === 21) {
    playerWins();
    return;
  } else if(playerTotal > 21) {
    dealerWins();
    return;
  } else if (dealerTotal === playerTotal) {
    push();
  }return;
  
  };
  
  function stand() {
    hitEl.disabled = true;
    standEl.disabled = true;
    dealerHand.push(shuffledDeck.pop());
    render();
    if (dealerTotal < 18 || dealerTotal < playerTotal) {
      dealerHand.push(shuffledDeck.pop());
      render();
    }
    if (dealerTotal > 21) {
      playerWins();
    } else if (dealerTotal > playerTotal && dealerTotal < 22) {
      dealerWins();
    } else if (dealerTotal === playerTotal) {
      push();
    }
   
    
  }

  function push() {
    
      if(playerTotal >= 18 && dealerTotal >= 18) {
        headerEl.innerHTML = "Push";
        hitEl.disabled = true;
        standEl.disabled = true;
        dealEl.disabled = false;
        dealEl.style.visibility = "visible"
      }
    }
    
function playerWins() {
    headerEl.innerHTML = "Congrats!, Player Won";
    hitEl.disabled = true;
    standEl.disabled = true;
    dealEl.disabled = false;
    dealEl.style.visibility = "visible"
}

function dealerWins() {
  headerEl.innerHTML = "You Failed! Dealer Won!";
  hitEl.disabled = true;
  standEl.disabled = true;
  dealEl.disabled = false;
  dealEl.style.visibility = "visible"
}


function checkBlkJck() {
  if (playerTotal === 21) {
    headerEl.innerHTML = "BlackJack!!"
    hitEl.disabled = true;
    standEl.disabled = true;
    dealEl.disabled = false;
    dealEl.style.visibility = "visible"
  }else if (dealerTotal === 21) {
    headerEl.innerHTML = "Dealer BlackJack!!"
    hitEl.disabled = true;
    standEl.disabled = true;
    dealEl.disabled = false;
    dealEl.style.visibility = "visible"
  }
}

function getNewShuffledDeck() {
    const tempDeck = [...masterDeck];
    const newShuffledDeck = [];
    while (tempDeck.length) {
      const rndIdx = Math.floor(Math.random() * tempDeck.length);
      newShuffledDeck.push(tempDeck.splice(rndIdx, 1)[0]);
    }
    if (newShuffledDeck.length < 4) {
      getNewShuffledDeck(); 
    }
    return newShuffledDeck;
    
  }  

  function buildMasterDeck() {
      const deck = [];
    suits.forEach(function(suit) {
        ranks.forEach(function(rank) {
          deck.push({
            face: `${suit}${rank}`,
            value: Number(rank) || (rank === "A" ? 11 : 10),
            hidden: false
          })
        })
      }) 
      return deck;
    }  