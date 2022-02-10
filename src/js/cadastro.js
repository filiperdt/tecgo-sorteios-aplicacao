import {main, path, fnShowIndexTableList, fnRestartShowIndexTableList, fnRemoveElementosComIdsRepetidos, fnRemovePrimeirosElementosComIdsRepetidos} from './modules/utils.js';
import index from './components/main.js';
import * as optionsRifa from './modules/Rifa/options.js';
import listCardRifa from './components/Rifa/list-card-rifa.js';
import listRifa from './components/Rifa/list-rifa.js';
import createRifaForm from './components/Rifa/create-rifa-form.js';
import readRifa from './components/Rifa/read-rifa.js';
import updateRifaForm from './components/Rifa/update-rifa-form.js';

var pathRifa = path + '/rifas';

// INDEX
const fnIndex = () => {
    fnListRifa();
};

const fnListRifa = () =>
    fetch(pathRifa, optionsRifa.optionsListRifas)
    .then(data => data.json())
    .then(rifas => {
        const tableListTodosRifas = listRifa(rifas);
        fnListApolice(tableListTodosRifas);
    })
    .catch(e => console.log(`Ocorreu um erro. fnListRifa: ${e}`));

const fnListApolice = tableListTodosRifas =>
fetch(pathApolice, optionsApolice.optionsListApolices)
.then(data => data.json())
.then(apolices => {
    const tableListTodasApolices = listApolice(apolices);
    fnMontarIndex(tableListTodosRifas, tableListTodasApolices);
})
.catch(e => console.log(`Ocorreu um erro. fnListApolice: ${e}`));

const fnMontarIndex = (tableListTodosRifas, tableListTodasApolices) => {
    main.innerHTML = index(tableListTodosRifas, tableListTodasApolices);
};

// CRUD CLIENTE
// CREATE
const fnCreateRifaForm = () => {
    let divExibir = "divExibirRifa";
    let conteudo = createRifaForm();
    
    exibirDivConteudo(divExibir, conteudo);

    fnRemoveElementosComIdsRepetidos('divFormRifaCreate');
    fnCreateRifaFormAction();
};

const fnCreateRifaFormAction = () => {
    const elemento = document.querySelector('#formRifaCreate');
    
    elemento.addEventListener('submit', evento => {
        evento.preventDefault();
        fnCreateRifaBody();
    });
};

const fnCreateRifaBody = () => {
    const cpf = document.querySelector('#formControlCpfRifaCreate').value;
    const nome = document.querySelector('#formControlNomeRifaCreate').value;
    const cidade = document.querySelector('#formControlCidadeRifaCreate').value;
    const uf = document.querySelector('#formControlUfRifaCreate').value;
    
    const createBody = {
        cpf: cpf,
        nome: nome,
        cidade: cidade,
        uf: uf
    }

    fnCreateRifa(createBody);
};

const fnCreateRifa = createBody => 
    fetch(pathRifa, optionsRifa.optionsCreateRifa(createBody))
    .then(data => data.json())
    .then(rifa => {
        [].forEach.call(document.getElementsByClassName("divMensagemErroRifaCreate"), div => div.style.display = 'none');

        if(rifa.erro){
            gerarMensagensDeErroRifaCreate(rifa);
        }else{
            fnRecarregarListRifa();
        }
    })
    .catch(e => console.log(`Ocorreu um erro. fnCreateRifa: ${e}`));

const fnRecarregarListRifa = () =>
    fetch(pathRifa, optionsRifa.optionsListRifas)
    .then(data => data.json())
    .then(rifas => {
        let divTodosRifas = document.getElementById("todosRifas");
        
        fnFecharDivDeExibicaoRifa();

        divTodosRifas.innerHTML = '';
        divTodosRifas.innerHTML = listRifa(rifas);
    })
    .catch(e => console.log(`Ocorreu um erro. fnRecarregarListRifa: ${e}`));

// READ
const fnReadRifa = cpf => {
    cpf = completarZerosEsquerdaCpf(cpf);

    const url = pathRifa + '/' + cpf;
    fetch(url, optionsRifa.optionsReadRifa)
    .then(data => data.json())
    .then(rifa => {
        let divExibir = "divExibirRifa";
        let conteudo = readRifa(rifa);
        
        exibirDivConteudo(divExibir, conteudo);
    })
    .catch(e => console.log(`Ocorreu um erro. fnReadRifa: ${e}`))
};

// UPDATE
const fnUpdateRifaRead = cpf => {
    cpf = completarZerosEsquerdaCpf(cpf);

    const url = pathRifa + '/' + cpf;
    fetch(url, optionsRifa.optionsReadRifa)
    .then(data => data.json())
    .then(rifa => {
        fnUpdateRifaForm(rifa);
    })
    .catch(e => console.log(`Ocorreu um erro. fnUpdateRifaRead: ${e}`));
};

const fnUpdateRifaForm = rifa => {
    let divExibir = "divExibirRifa";
    let conteudo = updateRifaForm(rifa);
    
    exibirDivConteudo(divExibir, conteudo);

    fnRemovePrimeirosElementosComIdsRepetidos('divFormRifaUpdate');

    fnUpdateRifaFormAction(rifa.cpf);
};

const fnUpdateRifaFormAction = cpf => {
    const elemento = document.querySelector('#formRifaUpdate');
    
    elemento.addEventListener('submit', evento => {
        evento.preventDefault();
        fnUpdateRifaBody(cpf);
    });
};

const fnUpdateRifaBody = cpf => {
    const nome = document.querySelector('#formControlNomeRifaUpdate').value;
    const cidade = document.querySelector('#formControlCidadeRifaUpdate').value;
    const uf = document.querySelector('#formControlUfRifaUpdate').value;
    
    const updateBody = {
        nome: nome,
        cidade: cidade,
        uf: uf
    }

    fnUpdateRifa(updateBody, cpf);
};

const fnUpdateRifa = (updateBody, cpf) => {
    const url = pathRifa + '/' + cpf;
    fetch(url, optionsRifa.optionsUpdateRifa(updateBody))
    .then(data => data.json())
    .then(rifa => {
        [].forEach.call(document.getElementsByClassName("divMensagemErroRifaUpdate"), div => div.style.display = 'none');

        if(rifa.erro){
            gerarMensagensDeErroRifaUpdate(rifa);
        }else{
            fnRecarregarListRifa();
        }
    })
    .catch(e => console.log(`Ocorreu um erro. fnUpdateRifa: ${e}`));
}

// DELETE
const fnDeleteRifa = cpf => {
    cpf = completarZerosEsquerdaCpf(cpf);
    
    const confirma = confirm(`Deseja realmente excluir o registro CPF ${cpf}?`);
    if(confirma){
        const url = pathRifa + '/' + cpf;
        return fetch(url, optionsRifa.optionsDeleteRifa)
        .then(data => data.json())
        .then(rifa => {
            alert((JSON.stringify(rifa.message, null, 4)).replace(/"/g, ''));
            fnRecarregarListRifa();
        })
        .catch(e => console.log(`Ocorreu um erro. fnDeleteRifa: ${e}`))
    }
};

// CRUD APÓLICE
// CREATE
const fnCreateApoliceForm = () => {
    let divExibir = "divExibirApolice";
    let conteudo = createApoliceForm();
    
    exibirDivConteudo(divExibir, conteudo);

    fnRemoveElementosComIdsRepetidos('divFormApoliceCreate');
    fnCreateApoliceFormAction();
};

const fnCreateApoliceFormAction = () => {
    const elemento = document.querySelector('#formApoliceCreate');
    
    elemento.addEventListener('submit', evento => {
        evento.preventDefault();
        fnCreateApoliceBody();
    });
};

const fnCreateApoliceBody = () => {
    const rifa = document.querySelector('#formControlRifaApoliceCreate').value;
    const placaVeiculo = document.querySelector('#formControlPlacaVeiculoApoliceCreate').value;
    const valor = document.querySelector('#formControlValorApoliceCreate').value;
    const fimVigencia = document.querySelector('#formControlFimVigenciaApoliceCreate').value;
    
    const createBody = {
        rifa: rifa,
        placaVeiculo: placaVeiculo,
        valor: valor,
        fimVigencia: fimVigencia
    }

    fnCreateApolice(createBody);
};

const fnCreateApolice = createBody => {
    fetch(pathApolice, optionsApolice.optionsCreateApolice(createBody))
    .then(data => data.json())
    .then(apolice => {
        [].forEach.call(document.getElementsByClassName("divMensagemErroApoliceCreate"), div => div.style.display = 'none');

        if(apolice.erro){
            gerarMensagensDeErroApoliceCreate(apolice);
        }else{
            fnRecarregarListApolice();
        }
    })
    .catch(e => console.log(`Ocorreu um erro. fnCreateApolice: ${e}`));
}

const fnRecarregarListApolice = () =>
    fetch(pathApolice, optionsApolice.optionsListApolices)
    .then(data => data.json())
    .then(apolices => {
        let divTodasApolices = document.getElementById("todasApolices");
        
        fnFecharDivDeExibicaoApolice();

        divTodasApolices.innerHTML = '';
        divTodasApolices.innerHTML = listApolice(apolices);
    })
    .catch(e => console.log(`Ocorreu um erro. fnRecarregarListApolice: ${e}`));

// READ
const fnReadApolice = numero => {
    const url = pathApolice + '/' + numero;
    fetch(url, optionsApolice.optionsReadApolice)
    .then(data => data.json())
    .then(apolice => {
        let divExibir = "divExibirApolice";
        let conteudo = readApolice(apolice);
        
        exibirDivConteudo(divExibir, conteudo);
    })
    .catch(e => console.log(`Ocorreu um erro. fnReadApolice: ${e}`))
};

// UPDATE
const fnUpdateApoliceRead = numero => {
    const url = pathApolice + '/' + numero;
    fetch(url, optionsApolice.optionsReadApolice)
    .then(data => data.json())
    .then(apolice => {
        fnUpdateApoliceForm(apolice);
    })
    .catch(e => console.log(`Ocorreu um erro. fnUpdateApoliceRead: ${e}`));
};

const fnUpdateApoliceForm = apolice => {
    let divExibir = "divExibirApolice";
    let conteudo = updateApoliceForm(apolice);
    
    exibirDivConteudo(divExibir, conteudo);

    fnRemovePrimeirosElementosComIdsRepetidos('divFormApoliceUpdate');

    fnUpdateApoliceFormAction(apolice.numero);
};

const fnUpdateApoliceFormAction = numero => {
    const elemento = document.querySelector('#formApoliceUpdate');
    
    elemento.addEventListener('submit', evento => {
        evento.preventDefault();
        fnUpdateApoliceBody(numero);
    });
};

const fnUpdateApoliceBody = numero => {
    const rifa = document.querySelector('#formControlRifaApoliceUpdate').value;
    const placaVeiculo = document.querySelector('#formControlPlacaVeiculoApoliceUpdate').value;
    const valor = document.querySelector('#formControlValorApoliceUpdate').value;
    const fimVigencia = document.querySelector('#formControlFimVigenciaApoliceUpdate').value;
    
    const updateBody = {
        rifa: rifa,
        placaVeiculo: placaVeiculo,
        valor: valor,
        fimVigencia: fimVigencia
    }

    fnUpdateApolice(updateBody, numero);
};

const fnUpdateApolice = (updateBody, numero) => {
    const url = pathApolice + '/' + numero;
    fetch(url, optionsApolice.optionsUpdateApolice(updateBody))
    .then(data => data.json())
    .then(apolice => {
        [].forEach.call(document.getElementsByClassName("divMensagemErroApoliceUpdate"), div => div.style.display = 'none');

        if(apolice.erro){
            gerarMensagensDeErroApoliceUpdate(apolice);
        }else{
            fnRecarregarListApolice();
        }
    })
    .catch(e => console.log(`Ocorreu um erro. fnUpdateApolice: ${e}`));
}

// DELETE
const fnDeleteApolice = numero => {
    const confirma = confirm(`Deseja realmente excluir o registro #${numero}?`);
    if(confirma){
        const url = pathApolice + '/' + numero;
        return fetch(url, optionsApolice.optionsDeleteApolice)
        .then(data => data.json())
        .then(apolice => {
            alert((JSON.stringify(apolice.message, null, 4)).replace(/"/g, ''));
            fnRecarregarListApolice();
        })
        .catch(e => console.log(`Ocorreu um erro. fnDeleteApolice: ${e}`))
    }
};

// PESQUISAR NÚMERO DA APÓLICE
const fnPesquisarApoliceFormAction = () => {
    const elemento = document.querySelector('#formApolicePesquisarNumero');
    
    elemento.addEventListener('submit', evento => {
        evento.preventDefault();
        fnPesquisarApoliceBody();
    });
};

const fnPesquisarApoliceBody = () => {
    const numero = document.querySelector('#formControlNumeroApolicePesquisar').value;

    fnPesquisarApolice(numero);
};

const fnPesquisarApolice = numero => {
    const url = pathApolice + '/consultar-por-numero/' + numero;
    fetch(url, optionsApolice.optionsGetPadrao)
    .then(data => data.json())
    .then(apolice => {
        [].forEach.call(document.getElementsByClassName("divMensagemErroApolicePesquisarNumero"), div => div.style.display = 'none');

        if(apolice.erro){
            gerarMensagensDeErroPesquisaNumero(apolice);
        }else{
            let divExibir = "divExibirApolice";
            let conteudo = `<strong>Apólice encontrada pelo número:</strong><br>` + readApolice(apolice);
            
            exibirDivConteudo(divExibir, conteudo);
        }
    })
    .catch(e => console.log(`Ocorreu um erro. fnPesquisarApolice: ${e}`));
}

// GERAR MENSAGENS DE ERRO
const gerarMensagensDeErroRifaCreate = rifa => {
    let paragraphClass = '';
    let divExibir = '';

    paragraphClass = rifa.erro === true? 'erro-mensagem' : 'sucesso-mensagem';

    if(rifa.cpf){
        divExibir = "erroCpfRifaCreate";
        
        exibirDivMensagemErro(divExibir, paragraphClass, rifa.cpf);
    }
    if(rifa.nome){
        divExibir = "erroNomeRifaCreate";
        
        exibirDivMensagemErro(divExibir, paragraphClass, rifa.nome);
    }
    if(rifa.cidade){
        divExibir = "erroCidadeRifaCreate";
        
        exibirDivMensagemErro(divExibir, paragraphClass, rifa.cidade);
    }
    if(rifa.uf){
        divExibir = "erroUfRifaCreate";
        
        exibirDivMensagemErro(divExibir, paragraphClass, rifa.uf);
    }
}

const gerarMensagensDeErroRifaUpdate = rifa => {
    let paragraphClass = '';
    let divExibir = '';

    paragraphClass = rifa.erro === true? 'erro-mensagem' : 'sucesso-mensagem';

    if(rifa.cpf){
        divExibir = "erroCpfRifaUpdate";
        
        exibirDivMensagemErro(divExibir, paragraphClass, rifa.cpf);
    }
    if(rifa.nome){
        divExibir = "erroNomeRifaUpdate";
        
        exibirDivMensagemErro(divExibir, paragraphClass, rifa.nome);
    }
    if(rifa.cidade){
        divExibir = "erroCidadeRifaUpdate";
        
        exibirDivMensagemErro(divExibir, paragraphClass, rifa.cidade);
    }
    if(rifa.uf){
        divExibir = "erroUfRifaUpdate";
        
        exibirDivMensagemErro(divExibir, paragraphClass, rifa.uf);
    }
}

const gerarMensagensDeErroApoliceCreate = apolice => {
    let paragraphClass = '';
    let divExibir = '';

    paragraphClass = apolice.erro === true? 'erro-mensagem' : 'sucesso-mensagem';

    if(apolice.rifa){
        divExibir = "erroRifaApoliceCreate";
        
        exibirDivMensagemErro(divExibir, paragraphClass, apolice.rifa);
    }
    if(apolice.placaVeiculo){
        divExibir = "erroPlacaVeiculoApoliceCreate";
        
        exibirDivMensagemErro(divExibir, paragraphClass, apolice.placaVeiculo);
    }
    if(apolice.valor){
        divExibir = "erroValorApoliceCreate";
        
        exibirDivMensagemErro(divExibir, paragraphClass, apolice.valor);
    }
    if(apolice.fimVigencia){
        divExibir = "erroFimVigenciaApoliceCreate";
        
        exibirDivMensagemErro(divExibir, paragraphClass, apolice.fimVigencia);
    }
}

const gerarMensagensDeErroApoliceUpdate = apolice => {
    let paragraphClass = '';
    let divExibir = '';

    paragraphClass = apolice.erro === true? 'erro-mensagem' : 'sucesso-mensagem';

    if(apolice.rifa){
        divExibir = "erroRifaApoliceUpdate";
        
        exibirDivMensagemErro(divExibir, paragraphClass, apolice.rifa);
    }
    if(apolice.placaVeiculo){
        divExibir = "erroPlacaVeiculoApoliceUpdate";
        
        exibirDivMensagemErro(divExibir, paragraphClass, apolice.placaVeiculo);
    }
    if(apolice.valor){
        divExibir = "erroValorApoliceUpdate";
        
        exibirDivMensagemErro(divExibir, paragraphClass, apolice.valor);
    }
    if(apolice.fimVigencia){
        divExibir = "erroFimVigenciaApoliceUpdate";
        
        exibirDivMensagemErro(divExibir, paragraphClass, apolice.fimVigencia);
    }
}

const gerarMensagensDeErroPesquisaNumero = apolice => {
    let paragraphClass = '';
    let divExibir = '';

    paragraphClass = apolice.erro === true? 'erro-mensagem' : 'sucesso-mensagem';

    if(apolice.numero){
        divExibir = "erroApolicePesquisarNumero";
        
        exibirDivMensagemErro(divExibir, paragraphClass, apolice.numero);
    }
}

// FUNÇÕES GERAIS

const exibirDivConteudo = (nomeDivExibir, conteudo) => {
    let divExibir = document.getElementById(nomeDivExibir);
        
    divExibir.innerHTML = '';
    divExibir.innerHTML = conteudo;
    divExibir.style.display = "inline";
}

const exibirDivMensagemErro = (nomeDivExibir, paragraphClass, conteudo) => {
    let divExibir = document.getElementById(nomeDivExibir);
        
    divExibir.innerHTML = `<p class=${paragraphClass}>${conteudo}</p>`;
    divExibir.style.display = "inline";
}

const completarZerosEsquerdaCpf = cpf => {
    cpf = cpf.toString();
    
    while(cpf.length < 11){
        cpf = '0' + cpf;
    }

    return cpf;
}

// INÍCIO
window.addEventListener("load", () => {
    fnIndex();
});

// Passa funções do escopo do módulo para o escopo global
window.fnCreateRifaForm = fnCreateRifaForm;
window.fnCreateApoliceForm = fnCreateApoliceForm;
window.fnReadRifa = fnReadRifa;
window.fnReadApolice = fnReadApolice;
window.fnUpdateRifaRead = fnUpdateRifaRead;
window.fnUpdateApoliceRead = fnUpdateApoliceRead;
window.fnDeleteRifa = fnDeleteRifa;
window.fnDeleteApolice = fnDeleteApolice;
window.fnShowIndexTableList = fnShowIndexTableList;
window.fnRestartShowIndexTableList = fnRestartShowIndexTableList;
window.fnFecharDivDeExibicaoRifa = fnFecharDivDeExibicaoRifa;
window.fnFecharDivDeExibicaoApolice = fnFecharDivDeExibicaoApolice;
window.fnFormatarMoeda = fnFormatarMoeda;
window.fnPesquisarApoliceFormAction = fnPesquisarApoliceFormAction;