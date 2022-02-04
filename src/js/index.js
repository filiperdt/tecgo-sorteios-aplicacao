import index from './components/main.js';
import listRifa from './components/Rifa/list-card-rifa.js';

const main = document.querySelector("#root");

// INDEX
const fnIndex = () => {
    main.innerHTML = listRifa();
};



// INÍCIO
window.addEventListener("load", () => {
    fnIndex();
});