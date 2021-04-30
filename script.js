const TECLA_ESQUERDA = 37;
const TECLA_DIREITA = 39;
const TECLA_CIMA = 38;
const TECLA_BAIXO = 40;
const TECLA_ESPACO = 32;

let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;
let snake = [];
snake[0] = {
    x: 8 * box,
    y: 8 * box
};
let comida = {
    x: 0, 
    y: 0, 
    redefineComida() {
        do {
            this.x = Math.floor(Math.random() * 15 + 1) * box;
            this.y = Math.floor(Math.random() * 15 + 1) * box;
        } while (this.haConflito());
    },
    haConflito() {
        for (let i = 0; i < snake.length; i++) {
            if (this.x == snake[i].x && this.y == snake[i].y) return true;
        }
        return false;
    }
}
comida.redefineComida();

let direcao = "direita";
let pontos = 0;
let recorde = 0;

function criaBG() {
    context.fillStyle = "lightgreen";
    context.fillRect(0, 0, 16 * box, 16 * box);
}

function criaSnake() {
    for(let i = 0; i < snake.length; i++) {
        context.fillStyle = i == 0 ? "darkgreen" : "green";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

function criaComida() {
    context.fillStyle = "red";
    context.fillRect(comida.x, comida.y, box, box)
}

document.addEventListener('keydown', atualizar);

function atualizar(event) {
    if (event.keyCode == TECLA_ESPACO) {
        if (!jogo) {
            jogo = setInterval(iniciarJogo, 100);
        } else {
            clearInterval(jogo);
            jogo = null;
        }
    }
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

function comeu() {
    if (comida.x == snake[0].x && comida.y == snake[0].y) {
        let newSnake = {
            x: snake[snake.length-1].x,
            y: snake[snake.length-1].y
        }
        snake.push(newSnake);
        comida.redefineComida();
        aumentaPontos();
    }
}

function aumentaPontos() {
    pontos++;
    document.getElementById("pontos").innerHTML = `${pontos} pts`
    if (pontos > recorde) {
        recorde = pontos;
        document.getElementById("recorde").innerHTML = `Recorde: ${recorde} pts`;
    }
}

function fimDeJogo() {
    for(i = 1; i < snake.length; i++) {
        if (snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(jogo);
            jogo = null;
            document.getElementById("alerta").innerHTML = "<span>Fim de jogo!</span><button type='button' id='btn-recarregar' onclick='zeraJogo()'>Jogar novamente</button>"
        }
    }
}

function zeraJogo() {
    snake = [];
    snake[0] = {
        x: 8 * box,
        y: 8 * box
    };
    direcao = "direita";
    pontos = 0;
    document.getElementById("alerta").innerHTML = "";
    document.getElementById("pontos").innerHTML = `${pontos} pts`;
    jogo = setInterval(iniciarJogo, 100);
}

function iniciarJogo() {
    fimDeJogo();
    criaBG();
    criaSnake();
    criaComida();
    comeu();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    switch(direcao) {
        case "cima":
            if (snakeY - box < 0) snakeY = 15 * box;
            else snakeY -= box;
            break;
        case "baixo":
            if (snakeY + box > 15 * box) snakeY = 0;
            else snakeY += box;
            break;
        case "esquerda":
            if (snakeX - box < 0) snakeX = 15 * box;
            else snakeX -= box;
            break;
        case "direita":
            if (snakeX + box > 15 * box) snakeX = 0;
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
console.log(jogo);