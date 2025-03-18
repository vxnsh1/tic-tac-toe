let boxes = document.querySelectorAll('.box');
let reset = document.querySelector('.reset');
let newGameBtn = document.querySelector('.new-game');
let msgContainer = document.querySelector('.msg-container');
let msg = document.querySelector('.msg');

let turn0 = false;
let count = 0;

const winPatterns = [
    [0, 1, 2], // Top row
    [3, 4, 5], // Middle row
    [6, 7, 8], // Bottom row
    [0, 3, 6], // Left column
    [1, 4, 7], // Middle column
    [2, 5, 8], // Right column
    [0, 4, 8], // Diagonal from top-left to bottom-right
    [2, 4, 6]  // Diagonal from top-right to bottom-left
];

const disableBoxes = () =>{
    for(let box of boxes) {
        box.disabled = true;
    }
}

const enableBoxes = () =>{
    for(let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
}

const disableReset = () => {
    reset.disabled = true;
}

const enableReset = () => {
    reset.disabled = false;
}

const showWinner = (winner) => {
    msg.innerText = `Congratulations! The Winner  is ${winner}`;
    msgContainer.classList.remove('hidden');
    disableBoxes();
    disableReset();
    count = 0;
}

boxes.forEach((box) => {
    box.addEventListener('click', () => {
        if(turn0){
            box.innerText = 'O';
            turn0 = false;
        }
        else{
            box.innerText = 'X';
            turn0 = true;
        }
        
        box.disabled = true;
        count++;
        checkWinner();
    });
});

const showDraw = () =>{
    msg.innerText = "No one Won, it is a Draw!"
    msgContainer.classList.remove('hidden');
    disableBoxes();
    disableReset();
}

const checkWinner = () => {
    for( let pattern of winPatterns){
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;

        if(pos1 != "" && pos2 != "" && pos3 != ""){
            if(pos1 === pos2 && pos2 === pos3){
                console.log('winner', pos1);
                showWinner(pos1);
            }
        }
    }
    
    if(count === 9){
            showDraw();
        }
}

const resetGame = () =>{
    turn0 = true;
    enableBoxes();
    msgContainer.classList.add('hidden');
    enableReset();
}

newGameBtn.addEventListener("click", resetGame);
reset.addEventListener("click", resetGame);