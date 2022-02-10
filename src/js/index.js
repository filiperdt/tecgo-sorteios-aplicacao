import {main, path} from './modules/utils.js';
import * as optionsRifa from './modules/Rifa/options.js';
import listCardRifa from './components/Rifa/list-card-rifa.js';

var pathRifa = path + '/rifas';

// INDEX
const fnIndex = () => {
    fnListCardRifa();
};

const fnListCardRifa = () =>
    fetch(pathRifa, optionsRifa.optionsListRifas)
    .then(data => data.json())
    .then(rifas => {
        const tableListTodasRifas = listCardRifa(rifas);
        main.innerHTML = tableListTodasRifas;
    })
    .catch(e => console.log(`Ocorreu um erro. fnListCardRifa: ${e}`));

// INÍCIO
window.addEventListener("load", () => {
    fnIndex();
});