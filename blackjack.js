const blackjackDeck = getDeck();

/**
 * Represents a card player (including dealer).
 * @constructor
 * @param {string} name - The name of the player
 */
const CardPlayer = function(name) {
  // Create player function here
  this.name = name;
  this.hand = [];
  this.drawCard = function() {
    const card = blackjackDeck[Math.floor(Math.random() * 52)];
    this.hand.push(card);
  };
};

// Create two new CardPlayers
let dealer = new CardPlayer('Dealer');
let player = new CardPlayer('Player');

/**
 * Calculates the score of a Blackjack hand
 * @param {Array} hand - Array of cards
 * @returns {Object} - total points and whether hand isSoft
 */
const calcPoints = function(hand) {
  let hasAce = false;
  let handScore = 0;
  let isSoft = false;

  for (let i = 0; i < hand.length; i++) {
    const card = hand[i];

    if (card.displayVal === 'Ace') {
      hasAce = true;
      handScore += 1;
    } else {
      handScore += card.val;
    }
  }
  if (handScore <= 11 && hasAce) {
    handScore += 10;
    isSoft = true;
  }
  return {
    total: handScore,
    isSoft: isSoft
  };
};

const dealerShouldDraw = function(dealerHand) {
  let points = calcPoints(dealerHand).total;
  //console.log(points + " " + dealerHand);
  let isSoft = calcPoints(dealerHand).isSoft;
  if (points < 17 || (points === 17 && isSoft)) {
    return true;
  } else {
    return false;
  }
};

/*
1. Create unit tests with Jasmine to test the following cases:

10, 9 passed in to function should return false
Ace, 6 passed in to function should return true
10, 6, Ace passed in to function should return false
2, 4, 2, 5 passed in should return true
*/

const testDeck = getDeck();
//console.log(testDeck);

// Create two new CardPlayers
let test_one = new CardPlayer('one');
test_one.hand[0] = testDeck[12]; // 10 of hearts
test_one.hand[1] = testDeck[11]; // 9 of hearts
let test_one_value = dealerShouldDraw(test_one.hand);
//console.log(`${test_one_value}: jasmine test here.`);
//expect(dealerShouldDraw(test_one.hand)).toBe(true);


let test_two = new CardPlayer('two');
test_two.hand[0] = testDeck[3]; // Ace
test_two.hand[1] = testDeck[8]; // 6 of heards
let test_two_value = dealerShouldDraw(test_two.hand);
//console.log(`${test_two_value}: jasmine test here.`);
//expect(dealerShouldDraw(test_one.hand)).toBe(true);


let test_three = new CardPlayer('three');
test_three.hand[0] = testDeck[12]; // 10 of hearts
test_three.hand[1] = testDeck[8]; // 6 of hearts
test_three.hand[2] = testDeck[3]; // Ace
let test_three_value = dealerShouldDraw(test_three.hand);
//console.log(`${test_three_value}: jasmine test here.`);
//expect(dealerShouldDraw(test_one.hand)).toBe(true);


let test_four = new CardPlayer('four');
test_four.hand[0] = testDeck[4]; //2
test_four.hand[1] = testDeck[6]; //4
test_four.hand[0] = testDeck[4]; //2
test_four.hand[0] = testDeck[7]; //5
let test_four_value = dealerShouldDraw(test_two.hand);
//console.log(`${test_four_value}: jasmine test here.`);

describe('Test dealerShouldDraw for Blackjack', ()=> {
  it('Should return correct boolean result', ()=>{
    expect(test_one_value).toBe(false);
    expect(test_two_value).toBe(true);
    expect(test_three_value).toBe(false);
    expect(test_four_value).toBe(true);
  })
})

/**
 * Determines the winner if both player and dealer stand
 * @param {number} playerScore
 * @param {number} dealerScore
 */
const determineWinner = function(playerScore, dealerScore) {
  if (playerScore > dealerScore) {
    return `Your total of ${playerScore} beat the dealer's total of ${dealerScore}.  You win!`;
  } else if (playerScore < dealerScore) {
    return `The dealer's total of ${dealerScore} beat your total of ${playerScore}.  You lose!`;
  } else {
    return `The dealer's total of ${dealerScore} equaled your total of ${playerScore}.  Tie!`;
  }
};

/**
 * Creates user prompt to ask if they'd like to draw a card
 * @param {number} count
 * @param {string} dealerCard
 */
const getMessage = function(count, dealerCard) {
  return `Dealer showing ${dealerCard.displayVal}, your count is ${count}.  Draw card?`;
};

/**
 * Logs the player's hand to the console
 * @param {CardPlayer} player
 */
const showHand = function(player) {
  let displayHand = player.hand.map(function(card) {
    return card.displayVal;
  });
  console.log(
    `${player.name}'s hand is ${displayHand.join(', ')} (${
      calcPoints(player.hand).total
    })`
  );
};

/**
 * Runs Blackjack Game
 */
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
  showHand(dealer);
  while (dealerShouldDraw(dealer.hand)) {
    dealer.drawCard();
    showHand(dealer);
  }
  let dealerScore = calcPoints(dealer.hand).total;
  if (dealerScore > 21) {
    return 'Dealer went over 21, you win!';
  } else {
    console.log(`Dealer stays at ${dealerScore}`);
  }

  return determineWinner(playerScore, dealerScore);
};
//console.log(startGame());
