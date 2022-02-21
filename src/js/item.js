import {main, path, fnShowIndexTableList, fnRestartShowIndexTableList, fnRemoveElementosComIdsRepetidos, fnRemovePrimeirosElementosComIdsRepetidos} from './modules/utils.js';
import mainItem from './components/main-item.js';
import mainItemPremio from './components/main-item-premio.js';
import mainItemNumero from './components/main-item-numero.js';
import * as optionsRifa from './modules/Rifa/options.js';
// import listRifa from './components/Rifa/list-rifa.js';
// import readRifa from './components/Rifa/read-rifa.js';

import inicializaTooltips from './inicializa-tooltips.js';

var pathRifa = path + '/rifas';
let divRootPremios = document.getElementById("divRootPremios");
let divRootNumeros = document.getElementById("divRootNumeros");

// INDEX
const fnIndex = () => {
    var urlAtual = new URL(location.href);
    var idRifa = urlAtual.searchParams.get("id");

    fnReadRifaIndex(idRifa);
};

const fnReadRifaIndex = idRifa => {
    const url = pathRifa + '/' + idRifa;
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
        fnQtdeNumeroPorStatus(rifa, premios, numeros);
    })
    .catch(e => console.log(`Ocorreu um erro. fnListNumero: ${e}`));
}

const fnQtdeNumeroPorStatus = (rifa, premios, numeros) => {
    const idUsuarioLogado = 2;
    const url = pathRifa + '/find-qtde-numeros-por-rifa-e-status/' + rifa.id + "/" + idUsuarioLogado;
    fetch(url, optionsRifa.optionsGetPadrao)
    .then(data => data.json())
    .then(qtdeNumerosPorRifaEStatus => {
        fnListUsuario(rifa, premios, numeros, qtdeNumerosPorRifaEStatus);
    })
    .catch(e => console.log(`Ocorreu um erro. fnQtdeNumeroPorStatus: ${e}`));
}

const fnListUsuario = (rifa, premios, numeros, qtdeNumerosPorRifaEStatus) => {
    const arrayIdUsuarios = [];
    arrayIdUsuarios.usuarioIds = [...new Set(numeros.map(numero => numero.usuario.id))];

    const url = pathRifa + '/find-usuarios';
    fetch(url, optionsRifa.optionsPostPadrao(arrayIdUsuarios))
    .then(data => data.json())
    .then(usuarios => {
        fnMontarIndex(rifa, premios, numeros, usuarios, qtdeNumerosPorRifaEStatus);
    })
    .catch(e => console.log(`Ocorreu um erro. fnListUsuario: ${e}`));
}

const fnMontarIndex = (rifa, premios, numeros, usuarios, qtdeNumerosPorRifaEStatus) => {
    const statusButton = 'TODOS';
    divRootPremios.innerHTML = mainItemPremio(rifa, premios);
    divRootNumeros.innerHTML = mainItemNumero(numeros, statusButton, usuarios, qtdeNumerosPorRifaEStatus);
    inicializaTooltips();
    managementButtonsStatusNumero();
};

const managementButtonsStatusNumero = () => {
    const btnTodosNumeros = document.querySelector("#btnTodosNumeros");
    const btnDisponiveisNumeros = document.querySelector("#btnDisponiveisNumeros");
    const btnReservadosNumeros = document.querySelector("#btnReservadosNumeros");
    const btnPagosNumeros = document.querySelector("#btnPagosNumeros");
    const btnMeusNumeros = document.querySelector("#btnMeusNumeros");
    
    // btnTodosNumeros.addEventListener('click', fnListNumeroRecarregar('/find-numeros/'));
    // // btnDisponiveisNumeros.addEventListener('click', fnListNumeroRecarregar('/find-numeros-disponiveis/'));
    // btnReservadosNumeros.addEventListener('click', fnListNumeroRecarregar('/find-numeros-status/', 'RESERVADO'));
    // btnPagosNumeros.addEventListener('click', fnListNumeroRecarregar('/find-numeros-status/', 'PAGO'));
    // btnMeusNumeros.addEventListener('click', fnListNumeroRecarregar('/find-numeros-meus/'));

    btnTodosNumeros.addEventListener('click', function() {
        fnListNumeroRecarregar('/find-numeros/', 'TODOS');
    });
    btnDisponiveisNumeros.addEventListener('click', function () {
        fnListNumeroRecarregar('/find-numeros/', 'DISPONIVEL');
    });
    btnReservadosNumeros.addEventListener('click', function() {
        fnListNumeroRecarregar('/find-numeros-status/', 'RESERVADO');
    });
    btnPagosNumeros.addEventListener('click', function() {
        fnListNumeroRecarregar('/find-numeros-status/', 'PAGO');
    });
    btnMeusNumeros.addEventListener('click', function() {
        fnListNumeroRecarregar('/find-numeros-meus/', 'MEU');
    });
};

const fnListNumeroRecarregar = (caminho, statusButton) => {
    var urlAtual = new URL(location.href);
    var idRifa = urlAtual.searchParams.get("id");

    let url = '';

    if(caminho === '/find-numeros/'){
        url = pathRifa + caminho + idRifa;
    } else if(caminho === '/find-numeros-meus/'){
        const idUsuario = 2;

        url = pathRifa + caminho + idRifa + '/' + idUsuario;
    } else{
        url = pathRifa + caminho + idRifa + '/' + statusButton;
    }
    
    fetch(url, optionsRifa.optionsGetPadrao)
    .then(data => data.json())
    .then(numeros => {
        fnQtdeNumerosPorRifaEStatusRecarregar(numeros, statusButton, idRifa);
    })
    .catch(e => console.log(`Ocorreu um erro. fnListNumeroRecarregar: ${e}`));
}

const fnQtdeNumerosPorRifaEStatusRecarregar = (numeros, statusButton, idRifa) => {
    const idUsuarioLogado = 2;
    const url = pathRifa + '/find-qtde-numeros-por-rifa-e-status/' + idRifa + "/" + idUsuarioLogado;
    fetch(url, optionsRifa.optionsGetPadrao)
    .then(data => data.json())
    .then(qtdeNumerosPorRifaEStatus => {
        fnListUsuarioRecarregar(numeros, statusButton, qtdeNumerosPorRifaEStatus);
    })
    .catch(e => console.log(`Ocorreu um erro. fnQtdeNumerosPorRifaEStatusRecarregar: ${e}`));
}

const fnListUsuarioRecarregar = (numeros, statusButton, qtdeNumerosPorRifaEStatus) => {
    const arrayIdUsuarios = [];
    arrayIdUsuarios.usuarioIds = [...new Set(numeros.map(numero => numero.usuario.id))];

    const url = pathRifa + '/find-usuarios';
    fetch(url, optionsRifa.optionsPostPadrao(arrayIdUsuarios))
    .then(data => data.json())
    .then(usuarios => {
        fnMontarIndexRecarregar(numeros, statusButton, usuarios, qtdeNumerosPorRifaEStatus);
    })
    .catch(e => console.log(`Ocorreu um erro. fnListUsuarioRecarregar: ${e}`));
}

const fnMontarIndexRecarregar = (numeros, statusButton, usuarios, qtdeNumerosPorRifaEStatus) => {
    divRootNumeros.innerHTML = '';
    divRootNumeros.innerHTML = mainItemNumero(numeros, statusButton, usuarios, qtdeNumerosPorRifaEStatus);
    fnRemovePrimeirosElementosComIdsRepetidos("divNumeros");
    inicializaTooltips();
    managementButtonsStatusNumero();
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