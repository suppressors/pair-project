var score = 0;
var cardList = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "last"
]
var cardSet
var board = [];
var rows = 6;
var columns = 4;
var card1Selected
var card2Selected
let score1 = 0;
let score2 = 0;
let p1Turn = true;

window.onload = function() {
    shuffleCards();
    startGame();
}
// shuffles the cards so they are always in random order
function shuffleCards() { 
    cardSet = cardList.concat(cardList); //duplicates card so theres two to match.
    for (let i = 0; i < cardList.length; i++) {
        let j = Math.floor(Math.random() * cardSet.length);

        let temp = cardSet[i];
        cardSet[i] = cardSet[j];
        cardSet[j] = temp;
    }
    // starts the game by pushing the images into the container and giving them set positions
}
function startGame() {
    for (let r = 0; r < rows; r++) { // sets the cards out in a grid and puts the images in those spots
        let row = [];
        for (let c = 0; c < columns; c++){
            let cardImg = cardSet.pop();
            row.push(cardImg);
            let card = document.createElement("img");
            card.id = r.toString() + "-" + c.toString();
            card.src = cardImg + ".jpg";
            card.classList.add("card");
            document.getElementById("board").append(card);
            card.addEventListener("click", selectCard);  // allows you to click the cards and flip them
            whosTurn();

            

        }
        board.push(row);
     }
     setTimeout(hideCards, 0)
    // hides cards at start of game
}
function hideCards(){
    for (let r = 0; r < rows; r++){
        for (let c = 0; c < columns; c++){
            let card = document.getElementById(r.toString() + "-" + c.toString());
            card.src = "back.png"; // all cards are set to be the back facing image by default
        }
    }
    //selects the card and makes it so you cant select the same card
}
function selectCard() {
    if (this.src.includes("back")) {
        if(!card1Selected){
            card1Selected = this;
            let coords = card1Selected.id.split("-");
            let r = parseInt(coords[0]);
            let c = parseInt(coords[1]);
            card1Selected.src = board[r][c] + ".jpg";
            
            
        }
        else if (!card2Selected && this != card1Selected){
            card2Selected = this;
            let coords = card2Selected.id.split("-");
            let r = parseInt(coords[0]);
            let c = parseInt(coords[1]);
            

            card2Selected.src = board[r][c] + ".jpg";
            setTimeout(checkCards, 1000);
        }
    }
    // checks if cards selected are the same if they are increase score
}
function checkCards() {
    
    if (card1Selected.src != card2Selected.src) {
        card1Selected.src = "back.png";
        card2Selected.src = "back.png";
        if (p1Turn){
            p1Turn = false;
        }                       // if it is player ones turn and it is not a match 
                                // it will set it to player 2s turn
        else if (!p1Turn){
            p1Turn = true;
        }
        card1Selected = null
        card2Selected = null
        
    }
    else if (card1Selected.src == card2Selected.src) {
        card1Selected = null
        card2Selected = null
        
        
        if (p1Turn) {                      // if cards match it will give score based on whos turn it was
            score1 +=1;
            document.getElementById("score1").innerText = score1;
        }
        else {
            score2 +=1;
            document.getElementById("score2").innerText = score2;
        }
    
      // then it sets the selected cards back to null so its ready for new selections
    }
    whosTurn();
    whoWon();
}
// resets shuffles and restarts game
function reset() {
    columns = 0;
    rows = 0;
    cardList = [];
    i = 0;
    j = 0;
    shuffleCards();
    startGame();

    
    score1 = 0;
    score2 = 0;
}
// checks whos turn it is and displays it so you know whos turn it is
function whosTurn() {
    
    if (p1Turn == false){
    turn1 = "2";
    }
    else{
        turn1 = "1";
    }
    document.getElementById("turn").innerText = turn1;
}
function whoWon() {          // checks who won and whoever has the greater score wins and a pop up shows
    if (score1 + score2 >= 12){
        if (score1 > score2){
            window.alert("Player 1 Won! Press reset to try again");
        }
        else if(score2 > score1){
            window.alert("Player 2 Won! Press reset to try again");
        }
        else{
            window.alert("It's a Tie! Press reset to try again");
        }

    }

}