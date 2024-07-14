// start the game button
var strat = document.querySelector(".start_game");
strat.onclick = function () {
  strat.classList.add('ba_co_green');
  strat.classList.add('opacity_05');
  strat.classList.add('pointer_events_none');
  setTimeout(function load() {
    var loadGame = document.createElement("div");
    loadGame.className = 'load_game';
    document.body.appendChild(loadGame);

    var spanContainer = document.createElement("div");
    spanContainer.className = 'span_Container';
    loadGame.appendChild(spanContainer);

    var spanLoad = document.createElement("span");
    spanLoad.className = 'span_load';
    spanContainer.appendChild(spanLoad);
    
    function spanLoadStyle() {
      spanLoad.classList.add('span_load_scale') 
    }
    setTimeout(spanLoadStyle, 1000);

    
    
    // progress
    function progress() {
      var progressBar = document.createElement("div");
      progressBar.className = 'progress_bar';
      loadGame.appendChild(progressBar);
      
      var perc = 0;
      setInterval(() => {
        if (perc === 100) {
          clearInterval();
        } else {
          perc += 1;
          progressBar.innerHTML = perc + '%';
        }
      }, 60)
    }
    
    setTimeout(progress, 1000);
  
   
  }, 1000)
  setTimeout(function () {
    loadGame = document.querySelector(".load_game")
    loadGame.classList.add('di_no');
  }, 7000);
  setTimeout(mainFunction, 7000);
}

// main functio game
function mainFunction() {
 
  var theGame = document.querySelector(".computer_player");
  theGame.classList.add('di_flex');

  // get the URL for each card image and stor them into an array
  var urlList = [
    'images/card-1.jpg',
    'images/card-2.jpg',
    'images/card-3.jpg',
    'images/card-4.jpg',
    'images/card-5.jpg',
    'images/card-6.jpg',
    'images/card-7.jpg',
    'images/card-8.jpg',
    'images/card-9.jpg',
    'images/card-10.jpg'
  ]

  var playerCardsList = [];



  // make a function to fetch the first player card from the images folder
  function fetchFirstPlaerCard() {
    var chosenUrlNumber = Math.floor(Math.random() * urlList.length);
    var sumPlayerCards = playerCardsList.reduce((a, b) => a + b, 0);
    if (chosenUrlNumber === 0) {
      var updatedChosenUrlNumber = 10
    } else { var updatedChosenUrlNumber = chosenUrlNumber }
    playerCardsList.push(updatedChosenUrlNumber + 1);
    var chosenUrlValue = urlList[chosenUrlNumber];
    console.log(`player's first card is ${chosenUrlValue}`);
    fetch(chosenUrlValue)
      .then(response => response.blob())
      .then(blob => {
        const url = URL.createObjectURL(blob);
        const img = document.createElement('img');
        img.className = 'card_size'
        img.src = url;
        var playerCards = document.querySelector(".pl_ca")
        playerCards.appendChild(img)
      });
  }

  // make a function to fetch the second player card from the images folder
  function fetchSecondPlayerCard() {
    var chosenUrlNumber = Math.floor(Math.random() * urlList.length);
    var sumPlayerCards = playerCardsList.reduce((a, b) => a + b, 0);
    if (chosenUrlNumber === 0) {
      if (sumPlayerCards >= 11) {
        var updatedChosenUrlNumber = 0
      } else {
        var updatedChosenUrlNumber = 10
      }
    } else { var updatedChosenUrlNumber = chosenUrlNumber }
    playerCardsList.push(updatedChosenUrlNumber + 1);
    var chosenUrlValue = urlList[chosenUrlNumber];
    console.log(`player's second card is ${chosenUrlValue}`);
    fetch(chosenUrlValue)
      .then(response => response.blob())
      .then(blob => {
        const url = URL.createObjectURL(blob);
        const img = document.createElement('img');
        img.className = 'card_size'
        img.src = url;
        var playerCards = document.querySelector(".pl_ca")
        playerCards.appendChild(img)
      });
  }
  // make a function to fetch more player card from the images folder
  function fetchMorePlayerCard() {
    var chosenUrlNumber = Math.floor(Math.random() * urlList.length);
    var sumPlayerCards = playerCardsList.reduce((a, b) => a + b, 0);
    if (chosenUrlNumber === 0) {
      if (sumPlayerCards >= 11) {
        var updatedChosenUrlNumber = 0
      } else {
        var updatedChosenUrlNumber = 10
      }
    } else { var updatedChosenUrlNumber = chosenUrlNumber }
    playerCardsList.push(updatedChosenUrlNumber + 1);
    var chosenUrlValue = urlList[chosenUrlNumber];
    console.log(`player's more card is ${chosenUrlValue}`);
    fetch(chosenUrlValue)
      .then(response => response.blob())
      .then(blob => {
        const url = URL.createObjectURL(blob);
        const img = document.createElement('img');
        img.className = 'card_size'
        img.src = url;
        var playerCards = document.querySelector(".pl_ca")
        playerCards.appendChild(img)
      });
  }


  setTimeout(fetchFirstPlaerCard, 1000)
  setTimeout(fetchSecondPlayerCard, 2000)



  // make a function to giv the player his total point and ask him if  he wants another card
  function playerInfoF() {
    var sumPlayerCards = playerCardsList.reduce((a, b) => a + b, 0);
    var playerInfo = document.querySelector(".player_info");
    var playerCardInfo = document.createElement("span");
    var infoText = document.createTextNode(`Your current hand is ${sumPlayerCards}`);
    playerCardInfo.classList.add("card_info")
    playerCardInfo.appendChild(infoText);
    playerInfo.appendChild(playerCardInfo);

    // first case player lass than 21
    if (sumPlayerCards < 21) {
      var anotherCard = document.createElement("span");
      var anotherText = document.createTextNode("Do you want to get another card?");
      anotherCard.appendChild(anotherText);
      anotherCard.className = "another_card"
      playerInfo.appendChild(anotherCard);

      // creat buttons
      var yesButton = document.createElement("button");
      var yesText = document.createTextNode("Yes");
      yesButton.className = ("yes_button");
      yesButton.appendChild(yesText);
      anotherCard.appendChild(yesButton);
      var noButton = document.createElement("button");
      var noText = document.createTextNode("No, I quit with what I have");
      noButton.className = ("no_button");
      noButton.appendChild(noText);
      anotherCard.appendChild(noButton);

      // add card 
      yesButton.onclick = function () {
        playerCardInfo.classList.add("di_no");
        anotherCard.classList.add("di_no");
        setTimeout(fetchMorePlayerCard, 1000);
        setTimeout(sumPlayerCardsF, 3000);
        setTimeout(playerInfoF, 4000);
        setTimeout(addMoreToComputer, 1000);
        setTimeout(checkMoreThan21Player, 1000);
      }
    
      // quit
      noButton.onclick = function () {
        anotherCard.classList.add("di_no");
        setTimeout(quitPlayer, 6000);
        setTimeout(addMoreToComputer, 1000);
      
      }
    }

  }
  setTimeout(playerInfoF, 4000);

  // check if player's hand more than 21 or = 21
  function checkMoreThan21Player() {
    var sumPlayerCards = playerCardsList.reduce((a, b) => a + b, 0);
    if (sumPlayerCards > 21) {
      var sumComputerCards = computerCardsList.reduce((a, b) => a + b, 0);
      if (sumComputerCards >= 22) {
        console.log("even by lossing")
        showComputerHand();
        setTimeout(evenGame, 1000);

      } else if (sumComputerCards <= 21) {
        console.log(`you lost with score more then 21 ${sumPlayerCards}`);
        lossGame();
        showComputerHand()
      }
      // check if player's hand equle to 21
    }else if (sumPlayerCards === 21) {
      var sumComputerCards = computerCardsList.reduce((a, b) => a + b, 0);
      if (sumComputerCards === 21) {
        console.log("even");
        setTimeout(evenGame, 1000)
        setTimeout(showComputerHand, 1000);
      } else if (sumComputerCards < 21 || sumComputerCards > 21) {
        console.log("you wan");
        setTimeout(winGame, 1000);
        setTimeout(showComputerHand, 1000);
      }
    }
  }
  setTimeout(checkMoreThan21Player, 5000);

  
  

  
  // make a function to calculate player cards
  function sumPlayerCardsF() {
    var sumPlayerCards = playerCardsList.reduce((a, b) => a + b, 0);
    console.log(`sum of player's points = ${sumPlayerCards}`);
  }
  setTimeout(sumPlayerCardsF, 3000)


  // start computer setting
  var computerCardsList = [];
  // make a function to fetch the first computer card from the images folder
  function fetchFirstComputerCard() {
    var chosenUrlNumber = Math.floor(Math.random() * urlList.length);
    var sumComputerCards = computerCardsList.reduce((a, b) => a + b, 0);
    if (chosenUrlNumber === 0) {
      var updatedChosenUrlNumber = 10
    } else { var updatedChosenUrlNumber = chosenUrlNumber }
    computerCardsList.push(updatedChosenUrlNumber + 1);
    var chosenUrlValue = urlList[chosenUrlNumber];
    console.log(`computer's first card is ${chosenUrlValue}`);
    fetch(chosenUrlValue)
      .then(response => response.blob())
      .then(blob => {
        const url = URL.createObjectURL(blob);
        const img = document.createElement('img');
        img.className = 'card_size'
        img.src = url;
        var computerCards = document.querySelector(".co_ca")
        computerCards.appendChild(img)
      });
  }

  // make a function to fetch the second computer card from the images folder
  function fetchSecondComputerCard() {
    var chosenUrlNumber = Math.floor(Math.random() * urlList.length);
    var sumComputerCards = computerCardsList.reduce((a, b) => a + b, 0);
    if (chosenUrlNumber === 0) {
      if (sumComputerCards >= 11) {
        var updatedChosenUrlNumber = 0
      } else {
        var updatedChosenUrlNumber = 10
      }
    } else { var updatedChosenUrlNumber = chosenUrlNumber }
    computerCardsList.push(updatedChosenUrlNumber + 1);
    var chosenUrlValue = urlList[chosenUrlNumber];
    console.log(`computer's second card is ${chosenUrlValue}`);
    var computerCards = document.querySelector(".co_ca")
    var box = document.createElement("span");
    box.className = "box";
    box.classList.add("m_L_10")
    computerCards.appendChild(box);
  
    fetch(chosenUrlValue)
      .then(response => response.blob())
      .then(blob => {
        const url = URL.createObjectURL(blob);
        const img = document.createElement('img');
        img.className = 'card_size'
        img.classList.add('face');
        img.classList.add('back_rotateY');
        img.src = url;
        box.appendChild(img)
      });

    fetch("images/back-face.jpeg")
      .then(response => response.blob())
      .then(blob => {
        const url = URL.createObjectURL(blob);
        const img = document.createElement('img');
        img.className = 'card_size'
        img.classList.add('face');
        img.classList.add('front');
        img.src = url;
        box.appendChild(img)
      });
  }
  setTimeout(fetchFirstComputerCard, 5000);
  setTimeout(fetchSecondComputerCard, 6000);

  // make a function to fetch more computer card from the images folder
  function fetchMoreComputerCard() {
    var chosenUrlNumber = Math.floor(Math.random() * urlList.length);
    var sumComputerCards = computerCardsList.reduce((a, b) => a + b, 0);
    if (chosenUrlNumber === 0) {
      if (sumComputerCards >= 11) {
        var updatedChosenUrlNumber = 0
      } else {
        var updatedChosenUrlNumber = 10
      }
    } else { var updatedChosenUrlNumber = chosenUrlNumber }
    computerCardsList.push(updatedChosenUrlNumber + 1);
    var chosenUrlValue = urlList[chosenUrlNumber];
    console.log(`computer's more card is ${chosenUrlValue}`);
    var computerCards = document.querySelector(".co_ca")
    var box = document.createElement("span");
    box.className = "box";
    computerCards.appendChild(box);
  
    fetch(chosenUrlValue)
      .then(response => response.blob())
      .then(blob => {
        const url = URL.createObjectURL(blob);
        const img = document.createElement('img');
        img.className = 'card_size'
        img.classList.add('face');
        img.classList.add('back_rotateY');
        img.src = url;
        box.appendChild(img)
      });

    fetch("images/back-face.jpeg")
      .then(response => response.blob())
      .then(blob => {
        const url = URL.createObjectURL(blob);
        const img = document.createElement('img');
        img.className = 'card_size'
        img.classList.add('face');
        img.classList.add('front');
        img.src = url;
        box.appendChild(img)
      });
  }



  // make a function to giv the computer's point 
  function computerInfoF() {
    var sumComputerCards = computerCardsList.reduce((a, b) => a + b, 0);
    var computerInfo = document.querySelector(".computer_info");
    var computerInfoText = document.createTextNode(`Computer's current hand is ${sumComputerCards}`);
    computerInfo.classList.add("card_info");
    computerInfo.classList.add("blur_filter_20");
    computerInfo.classList.add("computer_info_text");
    computerInfo.appendChild(computerInfoText);
  };


  // make a function to calculate computer cards
  function sumComputerCardsF() {
    var sumComputerCards = computerCardsList.reduce((a, b) => a + b, 0);
    console.log(`sum of computer's points = ${sumComputerCards}`);
  }
  setTimeout(sumComputerCardsF, 7000);


  // end computer setting

  // create loss function
  function lossGame() {
    setTimeout(function () {
      var sumPlayerCards = playerCardsList.reduce((a, b) => a + b, 0);
      var sumComputerCards = computerCardsList.reduce((a, b) => a + b, 0);
      document.getElementById("error").play();
      var loss = document.createElement("div");
      lossText = document.createTextNode(`Game over, you lost. Your final hand is [${sumPlayerCards}],
        and the computer's final hand is[${sumComputerCards}]`);
      loss.appendChild(lossText);
      loss.className = 'end_game';
      document.body.appendChild(loss);
      // reload Function
      function reload() {
        let relodButton = document.createElement("button");
        let relodText = document.createTextNode("play again");
        relodButton.appendChild(relodText);
        relodButton.classList = 'relod_Button';
        loss.appendChild(relodButton);
        document.addEventListener("click", (y) => {
          if (y.target.className === 'relod_Button') {
            window.location.reload();
          }
        });
      };
      reload();
    }, 1000)
  
  }

  // make a function to show the computer's hand.
  function showComputerHand() {
    setTimeout(computerInfoF, 1000)
    var cards = document.querySelectorAll(".box");
    cardsArray = Array.from(cards);
    for (let i = 0; i < cardsArray.length; i++) {
      const e = cardsArray[i];
      e.classList.add("box_rotateY");
    }
  
  }

  // create quit function
  function quitPlayer() {
    var sumPlayerCards = playerCardsList.reduce((a, b) => a + b, 0);
    var sumComputerCards = computerCardsList.reduce((a, b) => a + b, 0);
    if (sumComputerCards <= 21) {
      if (sumComputerCards > sumPlayerCards) {
        console.log("you lost");
        setTimeout(lossGame, 1000);
        setTimeout(showComputerHand, 1000);
      } else if (sumComputerCards < sumPlayerCards) {
        console.log("you wan");
        setTimeout(winGame, 1000);
        setTimeout(showComputerHand, 1000);
      } else if (sumComputerCards === sumPlayerCards) {
        console.log("even");
        setTimeout(evenGame, 1000);
        setTimeout(showComputerHand, 1000);
      }
    }else if (sumComputerCards > 21) {
      console.log("you wan");
      setTimeout(winGame, 1000);
      setTimeout(showComputerHand, 1000);
    }
  }

  // create win function
  function winGame() {
    setTimeout(function () {
      var sumPlayerCards = playerCardsList.reduce((a, b) => a + b, 0);
      var sumComputerCards = computerCardsList.reduce((a, b) => a + b, 0);
      document.getElementById("success").play();
      var win = document.createElement("div");
      winText = document.createTextNode(`congragolations, you wan. Your final hand is [${sumPlayerCards}],
        and the computer's final hand is[${sumComputerCards}]`);
      win.appendChild(winText);
      win.className = 'end_game';
      document.body.appendChild(win);
      // reload Function
      function reload() {
        let relodButton = document.createElement("button");
        let relodText = document.createTextNode("play again");
        relodButton.appendChild(relodText);
        relodButton.classList = 'relod_Button';
        win.appendChild(relodButton);
        document.addEventListener("click", (y) => {
          if (y.target.className === 'relod_Button') {
            window.location.reload();
          }
        });
      };
      reload();
    }, 1000)
  
  }

  // cerate even function
  function evenGame() {
    setTimeout(function () {
      var sumPlayerCards = playerCardsList.reduce((a, b) => a + b, 0);
      var sumComputerCards = computerCardsList.reduce((a, b) => a + b, 0);
      document.getElementById("success").play();
      var even = document.createElement("div");
      evenText = document.createTextNode(`Even!. Your final hand is [${sumPlayerCards}],
        and the computer's final hand is[${sumComputerCards}]`);
      even.appendChild(evenText);
      even.className = 'end_game';
      document.body.appendChild(even);
      // reload Function
      function reload() {
        let relodButton = document.createElement("button");
        let relodText = document.createTextNode("play again");
        relodButton.appendChild(relodText);
        relodButton.classList = 'relod_Button';
        even.appendChild(relodButton);
        document.addEventListener("click", (y) => {
          if (y.target.className === 'relod_Button') {
            window.location.reload();
          }
        });
      };
      reload();
    }, 1000)
  
  }

  // create a function to add card to the computre if its hand lass than 17
  function addMoreToComputer() {
    function repeatCard() {
      sumComputerCardsF();
      var sumComputerCards = computerCardsList.reduce((a, b) => a + b, 0);
      if (sumComputerCards < 17) {
        fetchMoreComputerCard();
        repeatCard();
      }
    }
    setTimeout(repeatCard, 1000)
  }
}

// game information function
var info = document.querySelector(".header_button");
info.onclick = function () {
  
  var gameInfo = document.createElement("div");
  var gameInfoText = document.createTextNode('');
  gameInfo.appendChild(gameInfoText);
  gameInfo.className = 'game_info'; 

  var typingIntervel = null;
  function startTimer() {
    typingIntervel = setInterval(function () {
      var typing = document.getElementById("typing");
      typing.play();
    }, 10);
  }

  function stopTimer() {
    clearInterval(typingIntervel)
  }

  var exit = document.createElement("button");
  var exitText = document.createTextNode("X");
  exit.className = 'exit';
  exit.appendChild(exitText);
  gameInfo.appendChild(exit);
  document.body.appendChild(gameInfo);

  exit.onclick = function () {
    gameInfo.classList.add("di_no");
    stopTimer();
    typing.pause()
  }

  startTimer();

  var timePerLetter = 50;
  var newLineCharacter = '|';
  function printOut(str) {
    var i = 0;
    (function main() {
      var char = str[i++];
      gameInfoText.nodeValue += char == newLineCharacter ? '\n' : char;
      if (i < str.length)
        setTimeout(main, timePerLetter);
      else if (i === str.length) {
        stopTimer();
        typing.pause();
      }
    })();
  }
  printOut(`Welcome to the Black Jack game!|
    Game Information:|
    When you start the game the computer will choose the first two cards for you and than it will choose his own cards.|
    As you can see, you can know the first computer's card only, and the rest will be on its back face.|
    
    At the buttom of your cards you will see your current hand of points, and allsw there are two buttons to add card or quit the game|
    - Each time  you click on yes, you will add a card to your current cards and your hand will be increased by the new card's value.|
    - If you clicked on no, you will stop the game and keep what you have in your hand.|
    - And as for the computer, it can add more cards as long as its hand is lass than 17.
    
    When do I win or loss the game?|
    The basice of the wining is to get points more than the computre, but your hand has to be no more than 21.
    
    1- the lacky way to win, when you get the first two cards (A and 10), in this case the card A will becomes 11, becuase this card takes to valuse..|
       - if your hand lass than 11, the A will turns into 11 and your hand will be 21 which means you wan.|
       - if your hand is more than 10 the A card will turns into 1|
    The same thing for the computer, it can win if it got (A and 10).|
    but if both computer and player got A and 10 it will be even no winner.
  
    2- The second case to win when the computer's hand got more than 21, and you chose to quit.|
    
    3- If the computer's hand is 21 or lass and you chose to quit and your hand is lass than the computer's, you will loss.|
    `)
}





