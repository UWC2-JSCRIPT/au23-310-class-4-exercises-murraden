//const blackjackDeck = getDeck();

const getDeck = () => {
    const suits = ['hearts', 'spades', 'clubs', 'diamonds'];
    const displayVals = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace'];
    const deck = [];
  
    for (const suit of suits) {
        for (const displayVal of displayVals) {
            let val;
            if (displayVal === 'Jack' || displayVal === 'Queen' || displayVal === 'King') {
                val = 10;
            } else if (displayVal === 'Ace') {
                val = 11;
            } else {
                val = parseInt(displayVal);
            }
  
            const card = {
                suit: suit,
                displayVal: displayVal,
                val: val
            };
  
            deck.push(card);
        }
    }
  
    return deck;
}

const deck = getDeck()
// /**
//  * Represents a card player (including dealer).
//  * @constructor
//  * @param {string} name - The name of the player
//  */
 class CardPlayer {
    constructor(name) {
        this.name = name;
        this.hand = [];
    }
    
    drawCard() {
        const shuffle = Math.floor(Math.random() * deck.length);
        const randomCard = deck[shuffle];
        this.hand.push(randomCard);
    }
 }; //TODO

// // CREATE TWO NEW CardPlayers
 const player = new CardPlayer('Player'); // TODO
 const dealer = new CardPlayer('Dealer'); // TODO


// /**
//  * Calculates the score of a Blackjack hand
//  * @param {Array} hand - Array of card objects with val, displayVal, suit properties
//  * @returns {Object} blackJackScore
//  * @returns {number} blackJackScore.total
//  * @returns {boolean} blackJackScore.isSoft
//  */
const calcPoints = (...hand) => {
    let blackJackScore = 0
    let numberOfAces = 0
    for (let index = 0; index < hand.length; index++) {
        const card = hand[index];
        blackJackScore += card.val
        if (card.val === 11) {
            numberOfAces++
        }  
    }
    while(numberOfAces > 0 && blackJackScore > 21) {
        blackJackScore -= 10;
        numberOfAces--
    }
    for (let j = 0; j < hand.length; j++) {
        const card = hand[j];
        if (card.val === 11 && blackJackScore !== 21) {
        console.log(`Your ${blackJackScore} is soft.`)
        }
            else if (blackJackScore === 21) {
            console.log(`${player.name} has BLACKJACK!!!`)
            }
    }

    return blackJackScore
       
}

const testCardsArray = [
    { val: 6, displayVal: "6", suit: "hearts" },
    { val: 11, displayVal: "Ace", suit: "hearts" },
    { val: 10, displayVal: "King", suit: "hearts" },
    { val: 10, displayVal: "Jack", suit: "hearts" }
  ];

  
  console.log(`${player.name} has : ${calcPoints()}`)

//
// /**
//  * Determines whether the dealer should draw another card.
//  * 
//  * @param {Array} dealerHand Array of card objects with val, displayVal, suit properties
//  * @returns {boolean} whether dealer should draw another card
//  */
 const dealerShouldDraw = (...dealerHand) => {
    let blackJackScore = 0
    let numberOfAces = 0
    for (let index = 0; index < dealerHand.length; index++) {
        const card = dealerHand[index];
        blackJackScore += card.val
        if (card.val === 11) {
            numberOfAces++
        }  
    }
    while(numberOfAces > 0 && blackJackScore > 21) {
        blackJackScore -= 10;
        numberOfAces--
    }
        const shouldDealerHit = blackJackScore < 17 
            console.log(`Dealer should hit? ${shouldDealerHit}`)
            for (let j = 0; j < dealerHand.length; j++) {
                const card = dealerHand[j];
                if (card.val === 11 && blackJackScore !== 21) {
                console.log(`Your ${blackJackScore} is soft.`)
                }
                    else if (blackJackScore === 21) {
                    console.log(`${dealer.name} has BLACKJACK!!!`)
                    }
            }

    return blackJackScore

}

 console.log(`${dealer.name} has : ${dealerShouldDraw()}`)

const dealerScore = dealerShouldDraw()
const playerScore = calcPoints()


// /**
//  * Determines the winner if both player and dealer stand
//  * @param {number} playerScore 
//  * @param {number} dealerScore 
//  * @returns {string} Shows the player's score, the dealer's score, and who wins
//  */
const determineWinner = (playerScore, dealerScore) => {
    if (playerScore > dealerScore) {
        console.log(`${player.name} has ${playerScore} and ${dealer.name} has ${dealerScore}, ${player.name} Wins!`)
    }
    else if (dealerScore > playerScore) {
        console.log(`${dealer.name} has ${dealerScore} and ${player.name} has ${playerScore}, ${dealer.name} Wins!`)
    }
    else {
        console.log(`${player.name} has ${playerScore} and ${dealer.name} has ${dealerScore}, the game is a Push!`)
    }
}

console.log(determineWinner(playerScore, dealerScore))

// /**
//  * Creates user prompt to ask if they'd like to draw a card
//  * @param {number} count 
//  * @param {string} dealerCard 
//  */
 const getMessage = (count, dealerCard) => {
   return `Dealer showing ${dealerCard.displayVal}, your count is ${count}.  Draw card?`
 }

// /**
//  * Logs the player's hand to the console
//  * @param {CardPlayer} player 
//  */
 const showHand = (player) => {
   const displayHand = player.hand.map((card) => card.displayVal);
   console.log(`${player.name}'s hand is ${displayHand.join(', ')} (${calcPoints(player.hand).total})`);
 }

// /**
//  * Runs Blackjack Game
//  */
 const startGame = function() {
   player.drawCard();
   dealer.drawCard();
   player.drawCard();
   dealer.drawCard();

   let playerScore = calcPoints(player.hand).total;
   showHand(player);
   while (playerScore < 21 && confirm(getMessage(playerScore, dealer.hand[0]))) {
     player.drawCard();
     playerScore = calcPoints(player.hand).total;
     showHand(player);
   }
   if (playerScore > 21) {
     return 'You went over 21 - you lose!';
   }
   console.log(`Player stands at ${playerScore}`);

   let dealerScore = calcPoints(dealer.hand).total;
   while (dealerScore < 21 && dealerShouldDraw(dealer.hand)) {
     dealer.drawCard();
     dealerScore = calcPoints(dealer.hand).total;
     showHand(dealer);
   }
   if (dealerScore > 21) {
     return 'Dealer went over 21 - you win!';
   }
   console.log(`Dealer stands at ${dealerScore}`);

   return determineWinner(playerScore, dealerScore);
 }
 console.log(startGame());