//board
let board;
const boardWidth = 750;
const boardHeight = 250;
let c;


//dino
const dinoWidth = 88;
const dinoHeight = 94;
const dinoX = 50;
const dinoY = boardHeight - dinoHeight;
let dinoImg;

let dino = {
    x: dinoX,
    y: dinoY,
    width: dinoWidth,
    height: dinoHeight
};

//phisics, system
let velocityX = -8; // cactus moving left speed
let velocityY = 0;
let gravity = 0.4;

let gameOver = false;
let score = 0;

//jump dino
function moveDino(e) {
    if (gameOver) {
        return;
    }

    if ((e.code == "Space" || e.code == "ArrowUp") && dino.y == dinoY) {//if dino is on the ground and press space or arrowup
        //jump
        velocityY = -10;
    }
}


//cactus
let cactusArray = [];

const cactus1Width = 34;
const cactus2Width = 69;
const cactus3Width = 102;

const cactusHeight = 70;
const cactusX = 700;
const cactusY = boardHeight - cactusHeight;

let cactus1Img;
let cactus2Img;
let cactus3Img;

//placeCactus
function placeCactus() {
    if (gameOver) {
        return;
    }

    //place cactus
    let cactus = {
        img: null,
        x: cactusX,
        y: cactusY,
        width: null,
        height: cactusHeight
    }

    let placeCactusChance = Math.random();

    if (placeCactusChance > .90) { //10%
        cactus.img = cactus3Img;
        cactus.width = cactus3Width;
        cactusArray.push(cactus);
    }
    else if (placeCactusChance > .70) { //20%
        cactus.img = cactus2Img;
        cactus.width = cactus2Width;
        cactusArray.push(cactus);
    }
    else if (placeCactusChance > .40) { //30%
        cactus.img = cactus1Img;
        cactus.width = cactus1Width;
        cactusArray.push(cactus);
    }

    if (cactusArray.length > 3) {
        cactusArray.shift();//remove 1st element from the array
    }
}



//onload
window.onload = function () {
    //board
    board = document.getElementById('board');
    board.height = boardHeight;
    board.width = boardWidth;

    c = board.getContext("2d");

    //score
    c.fillStyle="black";
    c.font="20px courier"

    dinoImg = new Image();
    dinoImg.src = "./img/dino.png";
    dinoImg.onload = function () {
        c.drawImage(dinoImg, dino.x, dino.y, dino.width, dino.height);
    }

    cactus1Img = new Image();
    cactus1Img.src = "./img/cactus1.png"

    cactus2Img = new Image();
    cactus2Img.src = "./img/cactus2.png"

    cactus3Img = new Image();
    cactus3Img.src = "./img/cactus3.png"
    requestAnimationFrame(update);
    setInterval(placeCactus, 1000); //1000 milliseconds = 1 second
    document.addEventListener("keydown", moveDino);
}

//update
function update() {
    if (gameOver) {
        return;
    }

    c.clearRect(0, 0, board.width, board.height);
    requestAnimationFrame(update);

    //phsics
    velocityY += gravity;

    //dino
    dino.y = Math.min(dino.y + velocityY, dinoY); //땅 아래로 안 가게 => 땅좌표와 속도적용 좌표중 더 위의 있는 것 선택
    c.drawImage(dinoImg, dino.x, dino.y, dino.width, dino.height);

    //cactus
    for (let i = 0; i < cactusArray.length; i++) {
        let cactus = cactusArray[i];
        cactus.x += velocityX;
        c.drawImage(cactus.img, cactus.x, cactus.y, cactus.width, cactus.height);
        if (detectCollision(cactus, dino)) {
            gameOver = true;
            dinoImg.src = "./img/dino-dead.png";
            dinoImg.onload = function () {
                c.drawImage(dinoImg, dino.x, dino.y, dino.width, dino.height);
            }
            // +)다시하기 버튼 만들기
        }
    }
    //score, speed
    score++;
    c.fillText(score, 5, 20)
    if ((score % 500) == 0) {
        velocityX -= 1; //스코어가 500점이 늘 때마다 속도가 1씩 빨라짐
    }
}

function detectCollision(a, b) {
    return b.x - a.width + 20 < a.x &&
        a.x < b.x + b.width - 20 &&
        b.y - a.height + 20 < a.y &&
        a.y < b.y + b.height - 20
}


// 이해 못한 부분들
// function(e) 이게 대체 뭔뜻이고
// e.code 이건 또 뭐임?
// 이벤트 너무 어렵네
// 엄마 7800점


//만들어야 할 것

//죽으면 가운데 다시하기 버튼이 생기고
//그 버튼을 누르면 게임 초기화

//
// function reset() {}