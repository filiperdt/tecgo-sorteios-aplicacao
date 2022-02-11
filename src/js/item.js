import {main, path, fnShowIndexTableList, fnRestartShowIndexTableList, fnRemoveElementosComIdsRepetidos, fnRemovePrimeirosElementosComIdsRepetidos} from './modules/utils.js';
import index from './components/main-item.js';
import * as optionsRifa from './modules/Rifa/options.js';
// import listRifa from './components/Rifa/list-rifa.js';
// import readRifa from './components/Rifa/read-rifa.js';

var pathRifa = path + '/rifas';

// INDEX
const fnIndex = () => {
    var urlAtual = new URL(location.href);

    var id = urlAtual.searchParams.get("id");

    fnReadRifaIndex(id);
};

const fnReadRifaIndex = id => {
    const url = pathRifa + '/' + id;
    fetch(url, optionsRifa.optionsReadRifa)
    .then(data => data.json())
    .then(rifa => {
        fnListPremio(rifa);
    })
    .catch(e => console.log(`Ocorreu um erro. fnReadRifaIndex: ${e}`))
};

const fnListPremio = rifa => {
    const url = pathRifa + '/find-premios/' + rifa.id;
    fetch(url, optionsRifa.optionsGetPadrao)
    .then(data => data.json())
    .then(premios => {
        fnListNumero(rifa, premios);
    })
    .catch(e => console.log(`Ocorreu um erro. fnListPremio: ${e}`));
}

const fnListNumero = (rifa, premios) => {
    const url = pathRifa + '/find-numeros/' + rifa.id;
    fetch(url, optionsRifa.optionsGetPadrao)
    .then(data => data.json())
    .then(numeros => {
        fnMontarIndex(rifa, premios, numeros);
    })
    .catch(e => console.log(`Ocorreu um erro. fnListNumero: ${e}`));
}

const fnMontarIndex = (rifa, premios, numeros) => {
    main.innerHTML = index(rifa, premios, numeros);
};

// // CRUD CLIENTE
// // READ
// const fnReadRifa = cpf => {
//     cpf = completarZerosEsquerdaCpf(cpf);

//     const url = pathRifa + '/' + cpf;
//     fetch(url, optionsRifa.optionsReadRifa)
//     .then(data => data.json())
//     .then(rifa => {
//         let divExibir = "divExibirRifa";
//         let conteudo = readRifa(rifa);
        
//         exibirDivConteudo(divExibir, conteudo);
//     })
//     .catch(e => console.log(`Ocorreu um erro. fnReadRifa: ${e}`))
// };


// // PESQUISAR NÚMERO DA APÓLICE
// const fnPesquisarApoliceFormAction = () => {
//     const elemento = document.querySelector('#formApolicePesquisarNumero');
    
//     elemento.addEventListener('submit', evento => {
//         evento.preventDefault();
//         fnPesquisarApoliceBody();
//     });
// };

// const fnPesquisarApoliceBody = () => {
//     const numero = document.querySelector('#formControlNumeroApolicePesquisar').value;

//     fnPesquisarApolice(numero);
// };

// const fnPesquisarApolice = numero => {
//     const url = pathApolice + '/consultar-por-numero/' + numero;
//     fetch(url, optionsApolice.optionsGetPadrao)
//     .then(data => data.json())
//     .then(apolice => {
//         [].forEach.call(document.getElementsByClassName("divMensagemErroApolicePesquisarNumero"), div => div.style.display = 'none');

//         if(apolice.erro){
//             gerarMensagensDeErroPesquisaNumero(apolice);
//         }else{
//             let divExibir = "divExibirApolice";
//             let conteudo = `<strong>Apólice encontrada pelo número:</strong><br>` + readApolice(apolice);
            
//             exibirDivConteudo(divExibir, conteudo);
//         }
//     })
//     .catch(e => console.log(`Ocorreu um erro. fnPesquisarApolice: ${e}`));
// }

// INÍCIO
window.addEventListener("load", () => {
    fnIndex();
});

// // Passa funções do escopo do módulo para o escopo global
// window.fnReadRifa = fnReadRifa;
// window.fnReadApolice = fnReadApolice;
// window.fnShowIndexTableList = fnShowIndexTableList;
// window.fnRestartShowIndexTableList = fnRestartShowIndexTableList;
// window.fnPesquisarApoliceFormAction = fnPesquisarApoliceFormAction;