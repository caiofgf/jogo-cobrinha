const TECLA_ESQUERDA = 37;
const TECLA_DIREITA = 39;
const TECLA_CIMA = 38;
const TECLA_BAIXO = 40;

let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;
let snake = [];
snake[0] = {
    x: 8 * box,
    y: 8 * box
};
let direcao = "direita";

function criarBG() {
    context.fillStyle = "lightgreen";
    context.fillRect(0, 0, 16 * box, 16 * box);
}

function criarSnake() {
    for(let i = 0; i < snake.length; i++) {
        context.fillStyle = "green";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

document.addEventListener('keydown', atualizar);

function atualizar(event) {
    if(snake.length > 1) {
        if(event.keyCode == TECLA_ESQUERDA && direcao != "direita") direcao = "esquerda";
        else if (event.keyCode == TECLA_DIREITA && direcao != "esquerda") direcao = "direita";
        else if (event.keyCode == TECLA_CIMA && direcao != "baixo") direcao = "cima";
        else if (event.keyCode == TECLA_BAIXO && direcao != "cima") direcao = "baixo";
    } else {
        switch (event.keyCode) {
            case TECLA_ESQUERDA:
                direcao = "esquerda";
                break;
            case TECLA_DIREITA:
                direcao = "direita";
                break;
            case TECLA_CIMA:
                direcao = "cima";
                break;
            case TECLA_BAIXO:
                direcao = "baixo";
                break;    
        }
    }
}

function iniciarJogo() {
    criarBG();
    criarSnake();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    switch(direcao) {
        case "cima":
            if (snakeY - box < 0) snakeY = 15 * box;
            else snakeY -= box;
            break;
        case "baixo":
            if (snakeY + box > 16 * box) snakeY = 0;
            else snakeY += box;
            break;
        case "esquerda":
            if (snakeX - box < 0) snakeX = 15 * box;
            else snakeX -= box;
            break;
        case "direita":
            if (snakeX + box > 16 * box) snakeX = 0;
            else snakeX += box;
            break;
    }

    snake.pop();
    snake.unshift({
        x: snakeX,
        y: snakeY
    })
}

let jogo = setInterval(iniciarJogo, 100);