
const numeroContador = document.getElementById('contador');


const totalCliques = document.getElementById('total');

const btnClique = document.getElementById('btn-clique');    
const btnLimpar = document.getElementById('btn-Limpar'); 

let contador = 0;     
let recorde = 0;       
let ultimoClique = 0;  

function atualizarTela() {

    numeroContador.textContent = contador;

    totalCliques.textContent = contador;

    btnClique.textContent = `Clique Aqui (${contador})`;

    if (contador > recorde) {
        recorde = contador;
        console.log(`Novo recorde: ${recorde} cliques!`);
    }
    
    numeroContador.style.transform = 'scale(1.2)';
    
    setTimeout(function() {
        numeroContador.style.transform = 'scale(1)';
    }, 150);

    mudarCorNumero();
}

function mudarCorNumero() {
 
    if (contador >= 100) {
        numeroContador.style.color = '#FFD700';  
        numeroContador.style.textShadow = '0 0 10px gold';
    } 

    else if (contador >= 50) {
        numeroContador.style.color = '#FFA500'; 
    } 

    else if (contador >= 20) {
        numeroContador.style.color = '#FF6B6B';  
    } 

    else {
        numeroContador.style.color = 'white';   
        numeroContador.style.textShadow = '2px 2px 8px rgba(0, 0, 0, 0.3)';
    }
}

function aumentarContador() {
  
    const agora = new Date().getTime();
    if (agora - ultimoClique < 100) {
        console.log(' Muito rápido! Espere um pouquinho.');
        return;
    }
    
    ultimoClique = agora; 
    contador = contador + 1;
    console.log(`Contador: ${contador}`);

    atualizarTela();
    
    btnClique.style.backgroundColor = '#5a67d8';
    setTimeout(function() {
        btnClique.style.backgroundColor = ''; 
    }, 100);
    
    mostrarMensagemMotivacional();
}

function resetarContador() {

    const confirmacao = confirm('Tem certeza que deseja voltar o contador para zero?');

    if (confirmacao) {
        contador = 0;

        atualizarTela();

        numeroContador.style.color = '#FF4757';
        setTimeout(function() {
            numeroContador.style.color = 'white';
        }, 500);
o
        alert('Contador de ao zero!');
 
        console.log('Contador limpo');
    } else {

        console.log('Limpeza cancelada pelo usuário');
    }
}

function mostrarMensagemMotivacional() {

    const mensagens = [
        "Bom trabalho!",
        "Continue assim!",
        "Você é incrível!",
        "Mais um!",
        "Fantástico!",
        "Não pare agora!"
    ];

    if (contador > 0 && contador % 5 === 0) {

        const mensagemAleatoria = mensagens[Math.floor(Math.random() * mensagens.length)];

        console.log(`${mensagemAleatoria}`);
ps
    }
}

btnClique.addEventListener('click', aumentarContador);

btnLimpar.addEventListener('click', LimparContador);

document.addEventListener('keydown', function(evento) {

    if (evento.code === 'Space') {
        aumentarContador();

        evento.preventDefault();
    }

    if (evento.code === 'KeyR' && evento.ctrlKey) {
        LimparContador();
        evento.preventDefault();
    }
});

btnClique.addEventListener('touchstart', function(evento) {
    aumentarContador();
    evento.preventDefault(); 
});

function verificarAnimacaoEspecial() {
    if (contador > 0 && contador % 10 === 0) {
        const display = document.querySelector('.display');
        display.classList.add('animacao-especial');

        setTimeout(function() {
            display.classList.remove('animacao-especial');
        }, 1000);
        
        console.log(` ${contador} cliques alcançados!`);
    }
}

const funcaoOriginalAtualizar = atualizarTela;
atualizarTela = function() {
    funcaoOriginalAtualizar();
    verificarAnimacaoEspecial();
};

window.addEventListener('load', function() {
    console.log('Página carregada com sucesso!');
    console.log('Controles disponíveis:');
    console.log('- Clique no botão "Clique Aqui"');
    console.log('Pressione ESPAÇO para clicar');
    console.log('- Ctrl + R para limpar');
    
    atualizarTela();

    numeroContador.style.opacity = '0';
    numeroContador.style.transform = 'scale(0.5)';

    setTimeout(function() {
        numeroContador.style.transition = 'all 0.5s ease';
        numeroContador.style.opacity = '1';
        numeroContador.style.transform = 'scale(1)';
    }, 100);
});

function salvarContador() {
    localStorage.setItem('meuContador', contador.toString());
    localStorage.setItem('meuRecorde', recorde.toString());
}

function carregarContador() {
    const contadorSalvo = localStorage.getItem('meuContador');
    const recordeSalvo = localStorage.getItem('meuRecorde');
    
    if (contadorSalvo) {
        contador = parseInt(contadorSalvo);
    }
    
    if (recordeSalvo) {
        recorde = parseInt(recordeSalvo);
    }
}

const funcaoOriginalAumentar = aumentarContador;
aumentarContador = function() {
    funcaoOriginalAumentar();
    salvarContador();
};

const funcaoOriginalLimpar = LimparContador;
LimparContador = function() {
    funcaoOriginalLimpar();
    salvarContador();
};


carregarContador();
