const palavraSecreta = "TERMO";
const tentativasMaximas = 6;
let tentativas = 0;

const tabuleiro = document.getElementById("tabuleiro");
const entrada = document.getElementById("entrada");
const enviar = document.getElementById("enviar");
const mensagem = document.getElementById("mensagem");


function criarTabuleiro() {
    for (let i = 0; i < tentativasMaximas * 5; i++) {
        const casa = document.createElement("div");
        casa.classList.add("casa");
        tabuleiro.appendChild(casa);
    }
}


function verificarPalavra() {
    const palavra = entrada.value.toUpperCase();
    if (palavra.length !== 5) {
        mensagem.textContent = "A palavra deve ter 5 letras!";
        return;
    }

    const casas = document.querySelectorAll(".casa");
    const inicio = tentativas * 5;

    for (let i = 0; i < 5; i++) {
        const letra = palavra[i];
        const casa = casas[inicio + i];

        casa.textContent = letra;

        if (letra === palavraSecreta[i]) {
            casa.classList.add("correto");
        } else if (palavraSecreta.includes(letra)) {
            casa.classList.add("parcial");
        } else {
            casa.classList.add("errado");
        }
    }

    tentativas++;

    if (palavra === palavraSecreta) {
        mensagem.textContent = "Parabéns! Você acertou!";
        entrada.disabled = true;
        enviar.disabled = true;
    } else if (tentativas === tentativasMaximas) {
        mensagem.textContent = `Fim de jogo! A palavra era "${palavraSecreta}".`;
        entrada.disabled = true;
        enviar.disabled = true;
    } else {
        mensagem.textContent = `Tentativa ${tentativas} de ${tentativasMaximas}.`;
    }

    entrada.value = "";
}


criarTabuleiro();

enviar.addEventListener("click", verificarPalavra);
entrada.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        verificarPalavra();
    }
});