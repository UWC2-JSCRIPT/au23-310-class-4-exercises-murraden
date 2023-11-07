const blackjackDeck = getDeck();

function getDeck() {
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
        const shuffle = Math.floor(Math.random() * blackjackDeck.length);
        const randomCard = blackjackDeck[shuffle];
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
//  * @returns {number} blackJackScore.blackJackScore
//  * @returns {boolean} blackJackScore.isSoft
//  */
function calcPoints(hand) {
    let blackJackScore = 0;
    let aceInHand = false;


    for (let index = 0; index < hand.length; index++) {
        const card = hand[index];
        blackJackScore += card.val;
        if (card.displayVal === 'Ace') {
            aceInHand = true;
        }
    }

    if (aceInHand && blackJackScore - 10 > 21) {
        blackJackScore -= 10;
    }

    return {
        blackJackScore: blackJackScore,
        isSoft: aceInHand && blackJackScore - 10 <= 21
    };
}
//
// /**
//  * Determines whether the dealer should draw another card.
//  * 
//  * @param {Array} dealerHand Array of card objects with val, displayVal, suit properties
//  * @returns {boolean} whether dealer should draw another card
//  */
function dealerShouldDraw(dealerHand) {
    const dealerScore = calcPoints(dealerHand);

    if (dealerScore.blackJackScore < 17) {
        return true;
    }

    if (dealerScore.isSoft && dealerScore.blackJackScore === 17) {
        return true;
    }

    return false;
}


// /**
//  * Determines the winner if both player and dealer stand
//  * @param {number} playerScore 
//  * @param {number} dealerScore 
//  * @returns {string} Shows the player's score, the dealer's score, and who wins
//  */

const determineWinner = (playerScore, dealerScore) =>  {
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
   console.log(`${player.name}'s hand is ${displayHand.join(', ')} (${calcPoints(player.hand).blackJackScore})`);
 }

// /**
//  * Runs Blackjack Game
//  */
 const startGame = function() {
   player.drawCard();
   dealer.drawCard();
   player.drawCard();
   dealer.drawCard();

   let playerScore = calcPoints(player.hand).blackJackScore;
   showHand(player);
   if (playerScore === 21) {
    return 'You have BLACKJACK! You Win!';
   }
   while (playerScore < 21 && confirm(getMessage(playerScore, dealer.hand[0]))) {
     player.drawCard();
     playerScore = calcPoints(player.hand).blackJackScore;
     showHand(player);
   }
   if (playerScore > 21) {
     return 'You went over 21 - you lose!';
   }
   console.log(`Player stands at ${playerScore}`);

   let dealerScore = calcPoints(dealer.hand).blackJackScore;
   if (dealerScore === 21) {
    return 'Dealer has BLACKJACK! You Lose!';
   }
   while (dealerScore < 21 && dealerShouldDraw(dealer.hand)) {
     dealer.drawCard();
     dealerScore = calcPoints(dealer.hand).blackJackScore;
     showHand(dealer);
   }
   if (dealerScore > 21) {
     return 'Dealer went over 21 - you win!';
   }
   console.log(`Dealer stands at ${dealerScore}`);

   return determineWinner(playerScore, dealerScore);
 }
 console.log(startGame());