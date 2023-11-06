/**
 * Returns an array of 52 Cards
 * @returns {Array} deck - a deck of cards
 */
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

//
// CHECKS
const deck = getDeck()
console.log(`Deck length equals 52? ${deck.length === 52}`)

const randomCard = deck[Math.floor(Math.random() * 52)]

console.log(randomCard)

const cardHasVal =
  randomCard && randomCard.val && typeof randomCard.val === 'number'
console.log(`Random card has val? ${cardHasVal}`)

const cardHasSuit =
  randomCard && randomCard.suit && typeof randomCard.suit === 'string'
console.log(`Random card has suit? ${cardHasSuit}`)

const cardHasDisplayVal =
  randomCard &&
  randomCard.displayVal &&
  typeof randomCard.displayVal === 'string'
console.log(`Random card has display value? ${cardHasDisplayVal}`)

console.log(deck)