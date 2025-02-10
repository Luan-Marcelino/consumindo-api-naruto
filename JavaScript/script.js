//Declarando Variáveis no DOM
const seta_direita = document.querySelector('.seta-contador-direta');
const seta_esquerda = document.querySelector('.seta-contador-esquerda');

let input_contador = document.querySelector('.input-contador');
const button_contador = document.querySelector('.button-contador');

const info_vila = document.querySelector('.tela-resposta-vila');
const info_patente = document.querySelector('.tela-resposta-patente');
const info_jutsus = document.querySelector('.tela-resposta-jutsus');
const info_resumo = document.querySelector('.tela-resposta-resumo');
const info_img = document.querySelector('.img-info');


let nome_personagem = document.querySelector('.nome-personagem');

//Consumindo API
async function narutoApiPersonagens(personagem){
    const resposta = await fetch(`https://naruto-br-api.site/characters/${personagem}`);
    if(resposta.status === 200){
    const obj = await resposta.json();
        imprimindo_resposta(obj);
    }else{
        imprimindo_resposta_undefined();
    }
    
    
}


//Funções
function imprimindo_resposta(obj) {

    info_img.src = obj.profile_image;
    nome_personagem.innerHTML = obj.name;
    info_vila.innerHTML = obj.village.name;
    info_patente.innerHTML = obj.rank;

    if(obj.jutsus == ''){
        info_jutsus.innerHTML = 'Não localizada'

    }else{
        info_jutsus.innerHTML = obj.jutsus.map(elemento =>{return elemento.name + '.'});
    }
    
    info_resumo.innerHTML = obj.summary;

}

function imprimindo_resposta_undefined(){
    info_img.src = 'Imagens/naruto-triste.jpg';
    nome_personagem.innerHTML = 'Não localizado';
    info_vila.innerHTML = 'Não localizada';
    info_patente.innerHTML = 'Não localizada';
    info_resumo.innerHTML = 'Não localizado';
    info_jutsus.innerHTML = 'Não localizado';
}

//Listeners dos botões da seta
seta_direita.addEventListener('click', () => {
    input_contador.value++;
    narutoApiPersonagens(input_contador.value);
})

seta_esquerda.addEventListener('click', () => {
     if(input_contador.value > 1){
        input_contador.value--;
        narutoApiPersonagens(input_contador.value);
    }   
})

//Listener do botão que pesquisa o número
button_contador.addEventListener('click', () => {
    narutoApiPersonagens(input_contador.value);
    input_contador.value = '';
})
