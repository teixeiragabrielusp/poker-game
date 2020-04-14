const inquirer = require('inquirer');

//Função que define a interface de linha de comando
const cliArgs = () => {

    var questions = [{
        type: 'input',
        name: 'nome',
        message: "Qual o nome do usuário?",
        filter: input => {
            return input;
        }
    }, {
        type: 'confirm',
        name: 'opcao',
        message: "Você gostaria de jogar uma partida de poker?"
    }]

    return inquirer.prompt(questions).then(inputs => {

        if (inputs.opcao == false) {
            return console.log(`${inputs.nome} te vejo numa próxima...`);
        }

        return inputs.nome;

    });
}

//Função que retorna o nome escolhido pelo usuário
const nicknameEscolhido = async () => {
    const nickname = await cliArgs();

    try {

        if (nickname == undefined) {

            throw Error;

        } else {

            console.log('Preparando o jogo...');
            return nickname;
        }

    } catch {
        throw Error;
    }
}

module.exports = { nicknameEscolhido };