function copyToClipboard(pChavePixCopiada) {
    var copyText = document.getElementById("chavePix");
    var textArea = document.createElement("textarea");
    textArea.value = copyText.textContent;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("Copy");
    textArea.remove();

    var pChavePixCopiada = document.getElementById(pChavePixCopiada);
    pChavePixCopiada.textContent = 'Copiado!';
}

function changePChavePixCopiada(pChavePixCopiada) {
    var pChavePixCopiada = document.getElementById(pChavePixCopiada);
    pChavePixCopiada.textContent = 'Clique para copiar';
}

function enviarComprovante() {
    var telefone = "553284915355";
    var mensagem = "Te enviarei o comprovante do pagamento da rifa 'Carros envelopados'";
    
    var link = 'https://wa.me/' + telefone + '?text=' + mensagem;
    window.open(link);
}