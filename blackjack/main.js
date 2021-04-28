// black jack game in javascript tutorial for best javascript practice !!


let blackjackGame = {
    'you' : {'scoreSpan' : '#your-score', 'div' : '#your-box', 'score':0},
    'dealer' : {'scoreSpan' : '#dealer-score', 'div' : '#dealer-box', 'score':0},
    'cards' : ['2', '3', '4' ,'5','6','7','8','9','10','K','Q','J','A'],
    'cardMap': {'2': 2,'3': 3 ,'4': 4,'5': 5,'6': 6,'7': 7,'8': 8,'9': 9,'10': 10,'K': 10,'Q': 10,'J':  10,'A':[1,11]},
    'wins' : 0,
    'losses' : 0,
    'draws' : 0,
    'isStand': false,
    'turnOVer': false,
    'standOff': true,
}

document.querySelector('#made').addEventListener('click', () => {
    window.location.href= "http://nees.eu5.net";
});


const YOU = blackjackGame['you']
const DEALER = blackjackGame['dealer']


const hitSound = new Audio('sounds/swish.m4a');
const winSound = new Audio('sounds/cash.mp3');
const lossSound = new Audio('sounds/aww.mp3');
const drawSound = new Audio('sounds/draw.mp3');

document.querySelector('#hit-btn').addEventListener('click', blackjackHit);
document.querySelector('#deal-btn').addEventListener('click', blackjackDeal);
document.querySelector('#stand-btn').addEventListener('click', dealerLogic);


function blackjackHit() {
    blackjackGame['standOff'] = true;
    if(blackjackGame['isStand'] === false){
        let card = randomCards();
        showCards(card,YOU);
        updateScore(card,YOU);
        showScore(YOU);
         blackjackGame['standOff'] = false;
       
    }
}

function showCards(card,activePlayer) {

    if(activePlayer['score'] <= 21){
        let cardImage = document.createElement('img');
        cardImage.src = `images/${card}.png`;
        document.querySelector(activePlayer['div']).appendChild(cardImage);
        hitSound.play();
    }
}

function blackjackDeal() {
    // showResult(computeWinner());

    // let winner = computeWinner();
    // showResult(winner);

    if(blackjackGame['turnOVer'] === true){
        
        blackjackGame['isStand'] = false;
        let yourImage = document.querySelector(YOU['div']).querySelectorAll('img');
        let dealerImage = document.querySelector(DEALER['div']).querySelectorAll('img');
    
        for(i=0; i < yourImage.length; i++){
            yourImage[i].remove();
        }
        for(i=0; i < dealerImage.length; i++){
            dealerImage[i].remove();
        }
        YOU['score'] = 0;
        DEALER['score'] = 0;

        document.querySelector('#your-score').textContent = 0;
        document.querySelector('#dealer-score').textContent = 0;
        document.querySelector('#your-score').style.color = 'black';
        document.querySelector('#dealer-score').style.color = 'black';

        blackjackGame['isStand'] = false;
        document.querySelector('#resultText').style.color = 'black';
        document.querySelector('#resultText').textContent = "Let's Play";

        blackjackGame['turnOVer'] = true;
        blackjackGame['standOff'] = true;
    }


}

function randomCards() {
    let randomIndex = Math.floor(Math.random() * 13);
    return blackjackGame['cards'][randomIndex];
};

function updateScore(card,activePlayer){
    if (card === 'A'){
          // if adding 11 keeps me below 21 , add 11 otherwise add 1 
        if(activePlayer['score'] + blackjackGame['cardMap'][card][1] <= 21){
            activePlayer['score'] += blackjackGame['cardMap'][card][1];
        }else {
            activePlayer['score'] += blackjackGame['cardMap'][card][0];
        }

    }else {
        activePlayer['score'] += blackjackGame['cardMap'][card];
    };
    
};

function showScore(activePlayer){

    if( activePlayer['score'] > 21 ){
        document.querySelector(activePlayer['scoreSpan']).textContent = ' BUST !';
        document.querySelector(activePlayer['scoreSpan']).style.color = "red";
        
    }else{
          document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
    };
};

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve,ms));
}


async function dealerLogic() {
    if(blackjackGame['standOff'] === false){
        blackjackGame['isStand'] = true;

        while(DEALER['score'] < 16 && blackjackGame['isStand'] === true){  
            let card = randomCards();
            showCards(card,DEALER);
            updateScore(card,DEALER);
            showScore(DEALER); 
            await sleep(700);
        }
    
        blackjackGame['turnOVer'] = true;
        showResult(computeWinner());
         blackjackGame['standOff'] = true;

    }
   

    
};

/// compute winner and return who just won !

function computeWinner() {
    let winner;

    if(YOU['score'] <= 21){
        // condition : higher score than dealer or when de
        if (YOU['score'] > DEALER['score'] || (DEALER['score'] > 21)){
            winner = YOU;
            blackjackGame['wins']++;
        

        }else if(YOU['score'] < DEALER['score']) {
            winner = DEALER;
            blackjackGame['losses']++;

        }else if ( YOU['score'] === DEALER['score']){
            blackjackGame['draws']++;
            
        }
    }else if ( YOU['score'] > 21 && DEALER['score'] <= 21){
        winner = DEALER;
        blackjackGame['losses']++;
        
    }else if ( YOU['score'] > 21 && DEALER['score'] > 21){
        blackjackGame['draws']++;

    };

    console.log(blackjackGame);
    console.log("winner is ", winner);
    return winner;
};

function showResult(winner){
    let message,messageColor;

    if(blackjackGame['turnOVer'] === true){
        if(winner === YOU){
            document.querySelector('#wins').textContent = blackjackGame['wins'];
            message = ' You won !';
            messageColor = 'green';
            winSound.play();
        }else if ( winner === DEALER){
            document.querySelector('#losses').textContent = blackjackGame['losses'];
            message = ' You lost !';
            messageColor = 'crimson';
            lossSound.play();
        }else {
            document.querySelector('#draws').textContent = blackjackGame['draws'];
            message = ' You Drew';
            messageColor = 'black';
            drawSound.play();
        }
        
        document.querySelector('#resultText').textContent = message;
        document.querySelector('#resultText').style.color = messageColor;

    }

    
}