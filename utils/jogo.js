const baralhoPoker = require('./baralho');
const Ranker = require('handranker');
const { nicknameEscolhido } = require('../cli/cli');

//Definindo variáveis
let vencedor = [];
let carta = [];
let cartasMesa = [];
let cartasJ1 = [];
let objJ1 = {};
let cartasJ2 = [];
let objJ2 = {};
let jogo = [];
let i = 0;

const jogadoresSelecionados = async () => {

    try {
        const jogadorSelec = await nicknameEscolhido();
        return [jogadorSelec, 'PokerBot'];

    } catch (err) {
        throw console.log('O Dealer encerrou a mesa...');
    }
}

const pokerJogo = async () => {

    try {
        const jogadores = await jogadoresSelecionados();

        //Define as cartas dos jogadores
        for (i = 0; i < 4; i++) {
            carta[i] = baralhoPoker.pop();
        }
        cartasJ1 = [carta[0], carta[1]];
        cartasJ2 = [carta[2], carta[3]];

        //Define as cartas da mesa
        for (i = 0; i < 4; i++) {
            cartasMesa[i] = baralhoPoker.pop();
        }
        cartasMesa.push(cartasMesa[0]);

        //Define os jogadores e suas respectivas cartas
        objJ1 = { id: jogadores[0], cards: cartasJ1 };
        objJ2 = { id: jogadores[1], cards: cartasJ2 };

        jogo = [objJ1, objJ2];

        //Resultados do jogo utilizando módulo (handranker)
        let resultados = Ranker.orderHands(jogo, cartasMesa);
        vencedor = resultados[0][0];

        return { jogadores, cartasJ1, cartasJ2, cartasMesa, vencedor };

    } catch {
        throw console.log('O baralho foi guardado...')
    }
}

const pokerOutput = async () => {

    try {
        const { jogadores, cartasJ1, cartasJ2, cartasMesa, vencedor } = await pokerJogo();

        //Prints
        console.log('');
        console.log('-----------POKER GAMER-----------');
        console.log('');
        console.log('***EMBARALHANDO...***');
        setTimeout(function () { console.log('***DISTRIBUINDO CARTAS...***') }, 1000)
        setTimeout(function () { console.log('') }, 1001);

        setTimeout(function () { console.log(`${jogadores[0]} você tem as seguintes cartas: ${cartasJ1}`) }, 2000);
        setTimeout(function () { console.log(`As cartas da mesa dadas pelo dealer foram:  ${cartasMesa}`) }, 2500);
        setTimeout(function () { console.log('') }, 2501);

        setTimeout(function () { console.log('***FAÇAM SUAS APOSTAS****') }, 2510);
        setTimeout(function () { console.log(`${jogadores[0]} apostou 1000 fichas`) }, 3500);
        setTimeout(function () { console.log(`${jogadores[1]} cobriu a aposta`) }, 4000);
        setTimeout(function () { console.log('') }, 4001);

        setTimeout(function () { console.log(`O jogador ${jogadores[1]} tinha as seguintes cartas: ${cartasJ2}`); }, 5000);
        setTimeout(function () { console.log(`O jogador vencedor foi o ${vencedor.id} com um(a) ${vencedor.description}`); }, 6000);
        setTimeout(function () {
            if (vencedor.id == jogadores[0]) {
                console.log('Parabéns você venceu!!!');
            } else {
                console.log('Que pena você perdeu, tente novamente!');
            }
        }, 6500);

    } catch {
        console.log('Jogo encerrado!');
    }
}

module.exports = pokerOutput();