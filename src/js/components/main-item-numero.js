let output = '';

const gerarNumero = (numeros, statusButton, usuarios, qtdeNumerosPorRifaEStatus) => {
    output += `
        <div id="divNumeros">
            `;
        
            gerarDivBotõesStatus(qtdeNumerosPorRifaEStatus);

            gerarDivFormPesquisarNumero();

            gerarDivNumeros(numeros, statusButton, usuarios);

            output += `
        </div>
    `;

    return output;
}

const gerarDivBotõesStatus = (qtdeNumerosPorRifaEStatus) => {
    const qtdeTotal = 10000;
    const qtdeReservado = qtdeNumerosPorRifaEStatus.reservado;
    const qtdePago = qtdeNumerosPorRifaEStatus.pago;
    const qtdeDisponivel = qtdeTotal - qtdeReservado - qtdePago;
    const qtdeMeusNumeros = qtdeNumerosPorRifaEStatus.meu;

    output += `
        <div style="text-align: center;">
            <button id="btnTodosNumeros" type="button" class="btn btn-primary mb-1">
                <span>Todos</span>
                <span><strong>${qtdeTotal}</strong></span>
            </button>
            <button id="btnDisponiveisNumeros" type="button" class="btn btn-secondary mb-1">
                <span>Disponíveis</span>
                <span><strong>${qtdeDisponivel}</strong></span>
            </button>
            <button id="btnReservadosNumeros" type="button" class="btn btn-warning mb-1">
                <span>Reservados</span>
                <span><strong>${qtdeReservado}</strong></span>
            </button>
            <button id="btnPagosNumeros" type="button" class="btn btn-success mb-1">
                <span>Pagos</span>
                <span><strong>${qtdePago}</strong></span>
            </button>
            <button id="btnMeusNumeros" type="button" class="btn btn-light mb-1">
                <span>Meus números</span>
                <span><strong>${qtdeMeusNumeros}</strong></span>
            </button>
        </div>
    `;
}

const gerarDivFormPesquisarNumero = () => {
    output += `
        <!-- <div id="divFormPesquisarNumeroPorTelefoneEmail" class="row align-items-center justify-content-center">
            <form id="formPesquisarNumeroPorTelefoneEmail" style="width: 25rem;">
                <div class="mb-2">
                    <input type="text" class="form-control" id="formControlPesquisarNumeroPorTelefoneEmail" name="formControlPesquisarNumeroPorTelefoneEmail" min=0 placeholder="Pesquisar pelo telefone (com DDD) ou email"></input>
                    <div id="erroPesquisarNumeroPorTelefoneEmail" class="divMensagemErroPesquisarNumeroPorTelefoneEmail"></div>
                </div>
            </form>
            <div>
                <input type="submit" form="formPesquisarNumeroPorTelefoneEmail" class="btn btn-primary" style="display: none" onclick="fnPesquisarNumeroPorTelefoneEmailFormAction()" value="Pesquisar"><!-- Este input é o submit do form, apesar de estar fora dele. Pode ser colocado em qualquer lugar dentro do DOM -->
            <!-- </div>
        </div> --> -->
    `;
}

const gerarDivNumeros = (numeros, statusButton, usuarios) => {
    const qtdeTotal = 10000;
    const statusButtonCapitalizado = capitalizar(statusButton);

    output += `
        <div class="flex-wrap m-4 d-flex" id="numbers-list" style="margin: 1.5rem 3.5rem !important;">
            <div class="numbers flex-wrap d-flex">
                `;
                
                [...Array(qtdeTotal).keys()].forEach(numeroQtdeTotal => {
                    const numeroComZerosEsquerda = adicionarZerosEsquerda(numeroQtdeTotal);

                    let indexNumero = numeros.map(numeroAtual => numeroAtual.numero).indexOf(numeroComZerosEsquerda);

                    if(indexNumero !== -1){
                        const numero = numeros[indexNumero];

                        const usuario = usuarios.filter(usuarioAtual => usuarioAtual.id === numero.usuario.id)[0];

                        const telefoneOcultado = usuario.telefone.length === 13?
                            substituiIntervalo(usuario.telefone, 4, 9, '****-') : substituiIntervalo(usuario.telefone, 3, 8, '****-');
                        
                        const sobrenomeOcultado = ' ' + usuario.sobrenome.charAt(0) + '.';

                        const statusCapitalizado = capitalizar(numero.status);

                        if(statusCapitalizado === "Reservado" && (statusButtonCapitalizado === "Reservado" || statusButtonCapitalizado === "Todos")){
                            output += `
                                <button type="button" id="${numeroComZerosEsquerda}" class="btn-sm btn-warning btn-numero" data-bs-toggle="tooltip" data-bs-html="true" data-bs-trigger="hover" data-bs-name="${usuario.nome+sobrenomeOcultado}" data-bs-phone="${telefoneOcultado}" title="${numeroComZerosEsquerda} • ${usuario.nome+sobrenomeOcultado} • ${statusCapitalizado}<br><hr>${telefoneOcultado}">
                                    ${numeroComZerosEsquerda}
                                </button>
                            `;
                        } else if(statusCapitalizado === "Pago" && (statusButtonCapitalizado === "Pago" || statusButtonCapitalizado === "Todos")){
                            output += `
                                <button type="button" id="${numeroComZerosEsquerda}" class="btn-sm btn-success btn-numero" data-bs-toggle="tooltip" data-bs-html="true" data-bs-trigger="hover" data-bs-name="${usuario.nome+sobrenomeOcultado}" data-bs-phone="${telefoneOcultado}" title="${numeroComZerosEsquerda} • ${usuario.nome+sobrenomeOcultado} • ${statusCapitalizado}<br><hr>${telefoneOcultado}">
                                    ${numeroComZerosEsquerda}
                                </button>
                            `;
                        } else if(statusButtonCapitalizado === "Meu"){
                            output += `
                                <button type="button" id="${numeroComZerosEsquerda}" class="btn-sm btn-light btn-numero" data-bs-toggle="tooltip" data-bs-html="true" data-bs-trigger="hover" data-bs-name="${usuario.nome+sobrenomeOcultado}" data-bs-phone="${telefoneOcultado}" title="${numeroComZerosEsquerda} • ${usuario.nome+sobrenomeOcultado} • ${statusCapitalizado}<br><hr>${telefoneOcultado}">
                                    ${numeroComZerosEsquerda}
                                </button>
                            `;
                        }
                    } else if(statusButtonCapitalizado === "Todos"){
                        output += `
                            
                                <button type="button" id="${numeroComZerosEsquerda}" class="btn-sm btn-secondary btn-numero" data-bs-toggle="tooltip" data-bs-html="true" data-bs-trigger="hover" data-bs-teste="Foi testado" title="${numeroComZerosEsquerda} • Disponível" onclick="exibirModalNumeroDisponivel('${numeroComZerosEsquerda}')">
                                    ${numeroComZerosEsquerda}
                                </button>
                            
                        `;
                    }
                });

                output += `
            </div>
        </div>
    `;
}

const adicionarZerosEsquerda = numero => {
    let counter = 0;
    
    while(numero.toString().length < 6){
        numero = '0' + numero;
        counter++;
    }

    return numero;
}

function substituiIntervalo(str, inicio, fim, substituto) {
    return str.substring(0, inicio) + substituto + str.substring(fim);
}

const capitalizar = str => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

const exibirModalNumeroDisponivel = numero => {
    const modalNumeroDisponivel = document.getElementById("modalNumeroDisponivel");
    
    modalNumeroDisponivel.innerHTML = `
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modalNumeroDisponivelLabel">Reservar cupom</h5>
                    <!-- <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button> -->
                </div>
                <div class="modal-body">
                    <p>Número: <span>${numero}</span><br>
                    Status: <span>Disponível</span></p>
                    <br>
                    <p style="color: rgb(134, 0, 0);">Se este cupom não for pago em até <span>1 dia</span>, esta reserva poderá ser cancelada.</p>
                </div>
                <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                <button type="button" class="btn btn-primary">Reservar</button>
                </div>
            </div>
        </div>
    `;

    $('#modalNumeroDisponivel').modal('show');
}

export default (numeros, statusButton, usuarios, qtdeNumerosPorRifaEStatus) => {
    return gerarNumero(numeros, statusButton, usuarios, qtdeNumerosPorRifaEStatus);
}

// Passa funções do escopo do módulo para o escopo global
window.exibirModalNumeroDisponivel = exibirModalNumeroDisponivel;