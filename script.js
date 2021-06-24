// Function to make a deck of 52 cards
// rank 1-13; 1-4 suits: hearts, diamonds, clubs, spades; 2-10 and jack, queen, king and ace
var makeDeck = function () {
  // Initialise an empty deck array
  var cardDeck = [];

  // Create an array of 4 suits
  var suits = ['hearts', 'diamonds', 'clubs', 'spades'];
  var suitIndex = 0;

  // Create an outer loop through the 4 suits
  while (suitIndex < suits.length) {
    var rankCounter = 1;
    while (rankCounter <= 13) {
      var card = {
        name: rankCounter,
        suit: suits[suitIndex],
        rank: rankCounter
      }
      if (rankCounter == 1) {
        card.name = 'ace';
      } else if (rankCounter == 11) {
        card.name = 'jack';
      } else if (rankCounter == 12) {
        card.name = 'queen';
      } else if (rankCounter == 13) {
        card.name = 'king';
      }
      cardDeck.push(card);
      rankCounter += 1;
    } 
    suitIndex += 1;
  }
return cardDeck;
}

// make deck
var deck = makeDeck();
// global array to track the player's cards at every hit
var playerCardsArray = [];
// global array to track the dealer's cards at every hit (for version 3)
var dealerCardsArray = [];
// global variable to store the message on list of player cards
var listOfCards_player = '';
// global variable to store the message on list of dealer cards
var listOfCards_dealer = '';
// global variables to store the number of hits for player and dealer
var numberOfHits_player = 0;
var numberOfHits_dealer = 0;
// global variable to store number of wins for player and dealer
var numberOfWins_player = 0;
var numberOfWins_dealer = 0;
// global variable to store number of rounds played
var numberOfRounds = 0;
// game modes
var GAME_MODE_WELCOME = 'GAME_MODE_WELCOME';
var GAME_MODE_PLAYER_HIT = 'GAME_MODE_PLAYER_HIT';
var GAME_MODE_PLAYER_STAND = 'GAME_MODE_PLAYER_STAND'
var GAME_MODE_EVALUATE_WIN = 'GAME_MODE_EVALUATE_WIN';
// initialise game mode
var gameMode = GAME_MODE_WELCOME;
// hit or stand message to player after every hit
var hitOrStandMessage = '';
// winner message after the game ends
var winnerMessage = '';

// Function to get a random index ranging from 0 (inclusive) to max (exclusive)
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
}

// Function to shuffle the elements in the cardDeck array
var shuffleCards = function (cardDeck) {
  // Loop over the card deck array once
  var currentIndex = 0;
  while (currentIndex < cardDeck.length) {
    // Select a random index in the deck
    var randomIndex = getRandomIndex(cardDeck.length);
    // Select the card that corresponds to randomIndex
    var randomCard = cardDeck[randomIndex];
    // Select the card that corresponds to currentIndex
    var currentCard = cardDeck[currentIndex];
    // Swap positions of randomCard and currentCard in the deck
    cardDeck[currentIndex] = randomCard;
    cardDeck[randomIndex] = currentCard;
    // Increment currentIndex
    currentIndex += 1;
  }
  // Return the shuffled deck
  return cardDeck;
}

// Function to sum up card ranks of any player
var sumOfRanks = function (cardsArray) {
  var index = 0;
  var sumOfRanks = 0;
  while (index < cardsArray.length) {
    var card = cardsArray[index];
    var cardRank = card.rank;
    sumOfRanks = sumOfRanks + cardRank;
    index += 1;
  }
  return sumOfRanks;
}

// Function to determine if any player is bust 
var determineBust = function (string) {  
  // Sum up this player's cards
  var sumOfCards = 0;

  // check if the human player bust - if sumOfCards is above 21, return true
  if (string == 'player') {
    sumOfCards = sumOfRanks(playerCardsArray);
    if (sumOfCards > 21) {
      return true;
    }
  }
  
  // check if the dealer bust - if sumOfCards is above 21, return true
  if (string == 'dealer') {
    sumOfCards = sumOfRanks(dealerCardsArray);
    if (sumOfCards > 21) {
      return true;
    }
  }
  return false;
}

// Function to determine winner
var determineWinner = function () {
  // variable to store message announcing winner
  var message = '';
  // variable to store sum of player's cards
  var playerRank = sumOfRanks(playerCardsArray);
  // variable to store sum of dealer's cards 
  var dealerRank = sumOfRanks(dealerCardsArray);

  // variable to store win and lose message
  var playerWinMsg = 'You win, dealer loses!';
  var dealerWinMsg = 'Dealer wins, you lose!';

  //// Winning conditions ////

  // If either player got 21 and the other did not, then announce blackjack winner
  if (playerRank == 21 && dealerRank !== 21) {
    message = 'Black Jack! <br>' + playerWinMsg; 
    // Increment player wins
    numberOfWins_player += 1;
  } 
  else if (playerRank !== 21 && dealerRank == 21) {
    message = 'Black Jack! <br>' + dealerWinMsg;
    // Increment dealer wins
    numberOfWins_dealer += 1;
  } 
  // If neither got 21 but either one goes bust, then announce winner
  else if (determineBust('player') == true && determineBust('dealer') == false) {
    message = "You're bust! <br>" + dealerWinMsg;
    // Increment dealer wins
    numberOfWins_dealer += 1;
  } 
  else if (determineBust('player') == false && determineBust('dealer') == true) {
    message = 'Dealer is bust! <br>' + playerWinMsg;
    // Increment player wins
    numberOfWins_player += 1;
  }
  // If both did not go bust, the one closer to 21 wins
  else if (dealerRank > playerRank) {
    message = dealerWinMsg;
    // Increment dealer wins
    numberOfWins_dealer += 1;
  }
  else if (dealerRank < playerRank) {
    message = playerWinMsg;
    // Increment player wins
    numberOfWins_player += 1;
  }
  // Otherwise, it is a tie
  else {
    message = 'It is a tie <br>' + playerOutcomes;
  }
  return message;
}

var main = function (input) {
  // Default output value
  var myOutputValue = ''; 
  console.log('Game mode:');
  console.log(gameMode);

  // If gameMode is GAME_MODE_WELCOME, change gameMode to GAME_MODE_PLAYER_HIT and output default welcome message
  if (gameMode == GAME_MODE_WELCOME) {
    // Increment the number of rounds
    numberOfRounds += 1;
    console.log('Round:');
    console.log(numberOfRounds);
    // Change gameMode to GAME_MODE_PLAYER_HIT
    gameMode = GAME_MODE_PLAYER_HIT;
    console.log('Game mode:');
    console.log(gameMode);
    myOutputValue = `Welcome to BlackJack <b> Round ${numberOfRounds}</b>! There are 2 players in this round - you vs the computer. Press submit to draw a random card from the deck for both you and the computer.`;
    console.log('myOutputValue');
    console.log(myOutputValue);
    return myOutputValue;
  }

  // If gameMode is GAME_MODE_PLAYER_HIT, draw a card for the player first
  if (gameMode == GAME_MODE_PLAYER_HIT) {
    // If player enters 'stand', change gamemode to GAME_MODE_PLAYER_STAND
    if (input == 'stand' && gameMode == GAME_MODE_PLAYER_HIT) {
      gameMode = GAME_MODE_PLAYER_STAND;
      console.log('game mode:');
      console.log(gameMode);
      return 'You chose to stand. The dealer is now drawing a card.. Press submit to see who won!.';
    }

    // TO CORRECT: Input validation: If player enters anything other than '' or 'stand', request to renenter
    //if ((input !== 'stand' || input !== '') && gameMode == GAME_MODE_PLAYER_HIT) {
      //myOutputValue = "Invalid input. Please either press submit to hit again, or enter 'stand' to stand";
      //return myOutputValue;
    //}

    // Shuffle the deck and store it in a new variable shuffledDeck
    var shuffledDeck = shuffleCards(deck);
    console.log('shuffling deck..');

    // Draw a card from the top of the deck
    var playerCard = shuffledDeck.pop();
    console.log('player draws a card..')
    console.log(playerCard);

    // Store the new card in the playerCardsArray and increase the no. of hits
    playerCardsArray.push(playerCard);
    numberOfHits_player += 1; 
    console.log('playerCardsArray');
    console.log(playerCardsArray);

    // Create message stating which cards were drawn for the player
    var playerCardMessage = 
    'Player draws ' +
    playerCard.name +
    ' of ' +
    playerCard.suit +
    '.<br>';

    // Create message listing player's total cards
    listOfCards_player = "<b> Player's cards: </b><br>";
    var cardCount = 0;
    // Create loop through all cards in playerCardsArray
    while (cardCount < playerCardsArray.length) {
      listOfCards_player = listOfCards_player + 
      playerCardsArray[cardCount].name + 
      ' of ' + 
      playerCardsArray[cardCount].suit + '.<br>';
      cardCount += 1;
    }

    // Conditions to check if the player can still continue hitting (<21), got blackjack (=21) or got bust (>21)
    hitOrStandMessage = "Your cards are still below 21. To hit again, press submit. To stand, enter 'stand' and submit.";
    if (sumOfRanks(playerCardsArray) == 21) {
      hitOrStandMessage = "Blackjack! Press submit to see what the dealer draws";
    }
    if (determineBust('player') == true) {
      hitOrStandMessage = "Oops! You bust and should not continue hitting. Enter 'stand' for the dealer's turn.";
    }
    myOutputValue = playerCardMessage + listOfCards_player + '<br>' + hitOrStandMessage;
    return myOutputValue;
  }

  // If gameMode is GAME_MODE_PLAYER_STAND, draw a card for the computer and change gameMode to GAME_MODE_EVALUATE_WIN
  if (gameMode == GAME_MODE_PLAYER_STAND) {
    // Shuffle the deck and store it in a new variable shuffledDeck
    var shuffledDeck = shuffleCards(deck);
    console.log('shuffling deck..');

    // Draw a card from the top of the deck
    var dealerCard = shuffledDeck.pop();
    console.log('dealer draws a card..')
    console.log(dealerCard);

    // Store the new card in the dealerCardsArray and increase the no. of hits
    dealerCardsArray.push(dealerCard);
    numberOfHits_dealer += 1;

    // Create message listing all of the dealer's cards 
    listOfCards_dealer = "<b> Dealer's cards: </b><br>";
    var cardCount = 0;
    // Create loop through all cards in dealerCardsArray
    while (cardCount < dealerCardsArray.length) {
      listOfCards_dealer = listOfCards_dealer + 
      dealerCardsArray[cardCount].name + 
      ' of ' + 
      dealerCardsArray[cardCount].suit + '.<br>';
      cardCount += 1;
    }

    // Once dealer draws one card, change gameMode to GAME_MODE_EVALUATE_WIN
    gameMode = GAME_MODE_EVALUATE_WIN;
  }


  if (gameMode == GAME_MODE_EVALUATE_WIN) {
    // Determine winner
    winnerMessage = determineWinner();
    // Construct message of the list of cards for the player and dealer
    myOutputValue = listOfCards_player + '<br>' + listOfCards_dealer + '<br>';
    // reset the playerCardsArray, dealerCardsArray & list of cards for the next round
    listOfCards_player = '';
    listOfCards_dealer = '';
    playerCardsArray = [];
    dealerCardsArray = [];
    // reset gameMode to GAME_MODE_WELCOME
    gameMode = GAME_MODE_WELCOME;
  }

  return winnerMessage + 
  '<br><br>' + 
  `<b>Round ${numberOfRounds}</b><br>` + 
  myOutputValue + 
  '<b> Winning streak </b><br>' +
  `Player: ${numberOfWins_player} / ${numberOfRounds} <br> 
  Dealer: ${numberOfWins_dealer} / ${numberOfRounds}`;
};


