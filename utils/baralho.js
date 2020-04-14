function baralhoPoker() {

    let naipes = ['d', 's', 'c', 'h']; //d = ouros; s = espada; c = paus; h = copas
    let cartas = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A']; //T = 10, J = Valete, Q = Dama, K = Rei
    let baralho = [];

    //Define o baralho (carta + naipe)
    for (let i = 0; i < naipes.length; i++) {
        for (let j = 0; j < cartas.length; j++) {
            baralho.push(cartas[j] + naipes[i]);
        }
    }

    //Embaralhar o baralho = randomizar um array
    let currentIndex = baralho.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {

        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = baralho[currentIndex];
        baralho[currentIndex] = baralho[randomIndex];
        baralho[randomIndex] = temporaryValue;
    }

    return baralho;

}

module.exports = baralhoPoker();