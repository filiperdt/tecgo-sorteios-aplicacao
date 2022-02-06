var indexTableList = 1;

export const main = document.querySelector("#root");

export const path = 'http://localhost:8080/tecgo-sorteios';

export const fnShowIndexTableList = () => {
    return indexTableList++;
}

export const fnRestartShowIndexTableList = () => {
    indexTableList = 1;
    return indexTableList;
}

// Quando clica no botão 'Voltar' em qualquer página, o conteúdo da página de destino é duplicado. Esta função elimina esta duplicação
export const fnRemoveElementosComIdsRepetidos = id => {
    var ids = document.querySelectorAll('#' + id), // Obtém uma collection de elementos com o mesmo id
        len = ids.length,
        n;
    
    if (len < 2) {return;}

    for (n = 1; n < len; n++) {
        if (ids[n]) {
            ids[n].parentElement.removeChild(ids[n]);
        }
    }
}

export const fnRemovePrimeirosElementosComIdsRepetidos = id => {
    var ids = document.querySelectorAll('#' + id), // Obtém uma collection de elementos com o mesmo id
        len = ids.length,
        n;
    
    if (len < 2) {return;}

    for (n = 0; n < len - 1; n++) {
        if (ids[0]) {
            ids[n].parentElement.removeChild(ids[n]);
        }
    }
}