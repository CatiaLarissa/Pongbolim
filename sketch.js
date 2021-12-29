//sons do jogo
let raquetada;
let ponto;
let trilhaSonora;

function preload() {
  trilhaSonora = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
}

function setup() {
  createCanvas(700, 400);
  trilhaSonora.loop();
}

//Variáveis do campo 

let xlinhaVertical = [30, 670];
let ylinhaVertical = 25;
let alturaLinhaVertical = 350;
let comprimentoLinhaVertical = 1;

let ylinhaHorizontal = [25, 375];
let xlinhaHorizontal = 30;
let alturaLinhaHorizontal = 1;
let comprimentoLinhaHorizontal = 640;

let xlinhaCentral = 350;


//Variaveis do gol 

let xgol = [25, 670];
let ygol = 180;
let alturaGol = 70;
let comprimentoGol = 5;

//Variaveis pequena área 

let xpequenaArea = [31, 600];
let ypequenaArea = 140;
let alturapequenaArea = 150;
let comprimentopequenaArea = 70;

//Variaveis grande área 

let xgrandeArea = [31, 570];
let ygrandeArea = 87;
let alturaGrandeArea = 250;
let comprimentoGrandeArea = 100;

// variáveis canto

function canto(){
   stroke(220);
   noFill();;
   arc(30, 25, 25, 25, 0, HALF_PI);
   arc(670, 25, 25, 25, HALF_PI, PI);
   arc(30, 375, 25, 25, PI-3*PI/2, 0);
   arc(670, 375, 25, 25, PI , 2*PI-PI/2);
}

// Variaveis da marcação

let xmarcacao = [65, 350, 635];
let ymarcacao = 215;
let diametro = 5;

// Variaveis do meio de campo

let xmeioCampo = 350;
let ymeioCampo = 215;
let diametroMeioCampo = 80;

// Variaveis do Bola

let xBola = 350;
let yBola = 200;
let diametroBola = 18;
let raio = diametro / 2;

//Movimento do Disco

let velocidadeX = 2;
let velocidadeY = 2;

// Raquetes Jogador
let xRaqueteJogador = [105, 500];
let xRaqueteJogadorVirtual = [205, 600];
let yRaqueteJogador = 150;
let yRaqueteJogadorVirtual = 150;
let alturaRaquete = 90;
let comprimentoRaquete = 5;

let velocidadeV;
let erro = 0;

// Funções

function linhasVerticais(x, y) {
  for (let i = 0; i < xlinhaVertical.length; i = i + 1){
    fill(220);
    noStroke()
    rect(xlinhaVertical[i], ylinhaVertical, comprimentoLinhaVertical, alturaLinhaVertical);
  }
}

function linhasHorizontais(x, y) {
  for (let i = 0; i < ylinhaHorizontal.length; i = i + 1){
    fill(220);
    noStroke()
    rect(xlinhaHorizontal, ylinhaHorizontal[i], comprimentoLinhaHorizontal, alturaLinhaHorizontal);
  }
}

function linhaCentral() {
  fill(220);
  noStroke()
  rect(xlinhaCentral, ylinhaVertical, comprimentoLinhaVertical, alturaLinhaVertical);
}

function gol(x, y) {
  for (let i = 0; i < xgol.length; i = i + 1){
    stroke(220);
    noFill();
    rect(xgol[i], ygol, comprimentoGol, alturaGol);
}
}

function pequenaArea(x, y) {
  for (let i = 0; i < xgol.length; i = i + 1){
    stroke(220);
    noFill();
    rect(xpequenaArea[i], ypequenaArea, comprimentopequenaArea, alturapequenaArea);
}
}

function grandeArea(x, y) {
  for (let i = 0; i < xgol.length; i = i + 1){
    stroke(220);
    noFill();
    rect(xgrandeArea[i], ygrandeArea, comprimentoGrandeArea, alturaGrandeArea);
}
}
function meiaLua(){
  stroke(220);
  noFill();
  arc(130, 215, 70, 100, PI-3*PI/2, PI/2);
  arc(570, 215, 70, 100, PI/2, PI -3*PI/2);
}

function marcacao(x, y) {
  for (let i = 0; i < xmarcacao.length; i = i + 1){
    fill(220);
    circle(xmarcacao[i], ymarcacao, diametro);
  }
}

function meioCampo(){
  stroke(220);
  noFill();
  circle(xmeioCampo, ymeioCampo, diametroMeioCampo);

}

//Variavel uso da biblioteca

let colidiu = true;

// Placar

let pontosJogador = 0;
let pontosVirtual = 0;

//Funções

function bola() {
  fill(220)
  circle(xBola, yBola, diametroBola);
}

function mostraRaqueteJogador(){
  for (let i = 0; i < xRaqueteJogador.length; i = i + 1){
    fill(255, 204, 0);
    rect(xRaqueteJogador[i], yRaqueteJogador, comprimentoRaquete, alturaRaquete);
  }
}

function mostraRaqueteJogadorVirtual(){
  for (let i = 0; i < xRaqueteJogadorVirtual.length; i = i + 1){
    fill(127,255,212);
    rect(xRaqueteJogadorVirtual[i], yRaqueteJogadorVirtual, comprimentoRaquete, alturaRaquete);
  }
}
function movimentoBola() {
  xBola += velocidadeX;
  yBola += velocidadeY;
}

function posicaoInicialBola(){
  xBola = 350;
  yBola = 200;
}

function movimentoRaqueteJogador() {
  if (keyIsDown(87)) {
    yRaqueteJogador -= 10;
  }
  if (keyIsDown(83)) {
    yRaqueteJogador += 10;
  }
}

function movimentoRaqueteJogadorVirtual() {
  if (keyIsDown(UP_ARROW)) {
    yRaqueteJogadorVirtual -= 10;
  }
  if (keyIsDown(DOWN_ARROW)) {
    yRaqueteJogadorVirtual += 10;
  }
}



function colisaoBordaBola() {
  if (xBola + raio > 670 || xBola - raio < 30) {
    velocidadeX *= -1;
  }
  if (yBola + raio > 375 || yBola - raio < 25) {
    velocidadeY *= -1;
  }
}


function colisaoBolaRaqueteJogador() {
  for (let i = 0; i < xRaqueteJogador.length; i = i + 1){
    colidiu = collideRectCircle(
    xRaqueteJogador[i],
    yRaqueteJogador,
    comprimentoRaquete,
    alturaRaquete,
    xBola,
    yBola,
    raio
  );
  if (colidiu) {
    velocidadeX *= -1;
    raquetada.play();
  } 
  }  
}

function colisaoBolaRaqueteJogadorVirtual() {
  for (let i = 0; i < xRaqueteJogadorVirtual.length; i = i + 1){
    colidiu = collideRectCircle(
    xRaqueteJogadorVirtual[i],
    yRaqueteJogadorVirtual,
    comprimentoRaquete,
    alturaRaquete,
    xBola,
    yBola,
    raio
  );
  if (colidiu) {
    velocidadeX *= -1;
    raquetada.play();
  } 
  }  
}

function Placar() {
  stroke(255);
  textAlign(CENTER);
  textSize(16);
  fill(color(220, 20, 60));
  rect(150, 10, 40, 20);
  fill(255);
  text(pontosJogador, 170, 26);
  fill(color(220, 20, 60));
  rect(450, 10, 40, 20);
  fill(255);
  text(pontosVirtual, 470, 26);
}

function Pontuacao() {
  if (xBola > 667 && yBola >= 170 && yBola <= 250) {
    pontosJogador += 1;
    if (pontosJogador){
      posicaoInicialBola();
      ponto.play();
    }
  }
  if (xBola <35 && yBola >= 170 && yBola <= 250) {
    pontosVirtual += 1;
    if (pontosJogador){
      posicaoInicialBola();
      ponto.play();
    }
  }
}

function draw() {
  background(0,128,0);
  linhasVerticais();
  linhasHorizontais();
  linhaCentral();
  gol();
  pequenaArea();
  grandeArea();
  canto();
  meiaLua();
  marcacao();
  meioCampo();
  bola();
  movimentoBola();
  colisaoBordaBola();
  mostraRaqueteJogador();
  mostraRaqueteJogadorVirtual();
  colisaoBolaRaqueteJogador();
  colisaoBolaRaqueteJogadorVirtual();
  movimentoRaqueteJogador();
  movimentoRaqueteJogadorVirtual();
  Placar();
  Pontuacao();
}

