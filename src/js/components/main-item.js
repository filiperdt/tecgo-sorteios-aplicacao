let output = '';
let cont = 1;

const gerarSectionProduto = (rifa, premios) => {
    const dataHorarioSorteio = rifa.dataSorteio.split('T');

    const dataSorteio = dataHorarioSorteio[0];
    const arrayDataHorarioSorteio = dataHorarioSorteio[1].split(':');
    
    const horaSorteio = arrayDataHorarioSorteio[0];
    const minutosSorteio = arrayDataHorarioSorteio[1];

    output += `
        <!-- Produto section-->
        <section class="py-5">
            <div class="container px-4 px-lg-5 my-5">
                <div class="row gx-4 gx-lg-5 align-items-center">
                    <!-- A resolução da imagem deve ser 600 x 700 -->
                    <div class="col-md-6">
                        `;

                        gerarCarrossel(premios);
                        
                        output += `
                    </div>
                    <div class="col-md-6">
                        <h1 class="display-5 fw-bolder">${rifa.titulo}</h1>
                        <div class="fs-5 mb-5">
                            <p>R$${rifa.valor}</p>
                            <p>Data do sorteio: ${dataSorteio}, às ${horaSorteio}h${minutosSorteio}</p>
                        </div>
                        `;

                        listarPremios(premios);

                        output += `
                    </div>
                </div>
            </div>
        </section>
    `;
}

const gerarCarrossel = premios => {
    output += `
        <div id="carouselPremio" class="carousel slide card-img-top" data-bs-ride="carousel">
            <div class="carousel-indicators">
                `;
                
                gerarIndicadores(premios);
                
                output += `
            </div>
            <div style="height: 92%;">
                <div class="carousel-inner">
                    `;
                    
                    gerarItemCarrossel(premios);
                    
                    output += `
                </div>
                `;
                
                if(premios.length > 1){
                    output += `
                        <button class="carousel-control-prev" type="button" data-bs-target="#carouselPremio" data-bs-slide="prev">
                            <span class="carousel-control-prev-icon carousel-control-icon" aria-hidden="true"></span>
                        </button>
                        <button class="carousel-control-next" type="button" data-bs-target="#carouselPremio" data-bs-slide="next">
                            <span class="carousel-control-next-icon carousel-control-icon" aria-hidden="true"></span>
                        </button>
                    `;
                }
                
                output += `
            </div>
        </div>
    `;
}

const gerarIndicadores = premios => {
    cont = 1;

    if(premios.length > 0){
        premios.forEach(() => {
            if(cont == 1){
                output += `
                    <button type="button" data-bs-target="#carouselPremio" data-bs-slide-to="${cont - 1}" class="active" aria-current="true" aria-label="Slide ${cont}"></button>
                `;
            }else{
                output += `
                    <button type="button" data-bs-target="#carouselPremio" data-bs-slide-to="${cont - 1}" aria-label="Slide ${cont}"></button>
                `;
            }
            cont++;
        });
    } else{
        output += `
            <button type="button" data-bs-target="#carouselPremio" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
        `;
    }
}

const gerarItemCarrossel = premios => {
    cont = 1;
    
    if(premios.length > 0){
        premios.forEach(premio => {
            if(cont == 1){
                output += `
                    <div class="carousel-item active">
                `;
            }else{
                output += `
                    <div class="carousel-item">
                `;
            }
            
            output += `
                    <div class="parent d-flex justify-content-center">
                        <div class="badge bg-dark text-white position-absolute badge-premio">
                            ${cont}º Prêmio
                        </div>
                        <img id="imgPremio${premio.id}" class="d-block" src="storage/img/${premio.foto}" onerror="imgErro('imgPremio${premio.id}')" style="max-height: 100em;" alt="...">
                    </div>
                </div>
            `;

            cont++;
        });
    } else{
        output += `
            <div class="carousel-item active">
                <div class="parent d-flex justify-content-center">
                    <img class="d-block w-100" src="storage/img/no-image-grande.png" style="max-height: 100em;" alt="...">
                </div>
            </div>
        `;
    }
}

function imgErro(imgPremioId){
    let img = document.getElementById(imgPremioId);
    img.className = "d-block w-100";
    img.src = "storage/img/no-image-grande.png";
    img.style.maxHeight = "100em";
    img.setAttribute.alt = "...";
} 

const listarPremios = premios => {
    cont = 1;

    if(premios.length > 0){
        premios.forEach(premio => {
            output += `
                <p class="lead"><strong>${cont}º Prêmio:</strong> ${premio.nome} • ${premio.descricao}</p>
                <hr>
            `;
            cont++;
        });
    } else{
        output += `
            <p class="lead"><strong><em>Nenhum prêmio cadastrado</em></strong></p>
        `;
    }
}

const gerarSectionNumero = numeros => {
    output += `
        <section class="py-5 bg-dark">
            <div class="container px-4 px-lg-5 mt-5" style="text-align: center; color: white;">
                <h2><srong>Números</srong></h2>
            </div>
            <div style="text-align: center;">
                <button type="button" class="btn btn-primary mb-1" onClick=''>
                    <span>Todos</span>
                    <span><strong>10000</strong></span>
                </button>
                <button type="button" class="btn btn-secondary mb-1" onClick=''>
                    <span>Disponíveis</span>
                    <span><strong>8500</strong></span>
                </button>
                <button type="button" class="btn btn-warning mb-1" onClick=''>
                    <span>Reservados</span>
                    <span><strong>1000</strong></span>
                </button>
                <button type="button" class="btn btn-success mb-1" onClick=''>
                    <span>Pagos</span>
                    <span><strong>500</strong></span>
                </button>
                <button type="button" class="btn btn-light mb-1" onClick=''>
                    <span>Meus números</span>
                    <span><strong>14</strong></span>
                </button>
            </div>
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
            <div class="flex-wrap m-4 d-flex" id="numbers-list" style="margin: 1.5rem 3.5rem !important;">
                <div class="numbers flex-wrap d-flex">
                    <span data-bs-toggle="modal" data-bs-target="#modalNumeroDisponivel">
                        <button type="button" id="00000" class="btn-sm btn-secondary btn-numero" data-bs-toggle="tooltip" title="00000 • Disponível">00000</button>
                    </span>
                </div>
            </div>
        </section>
    `;
}

const gerarTemplate = (rifa, premios, numeros) => {
    gerarSectionProduto(rifa, premios);
    
    gerarSectionNumero(numeros);

    return output;
};

export default (rifa, premios, numeros) => {
    return gerarTemplate(rifa, premios, numeros);
}

// Passa funções do escopo do módulo para o escopo global
window.imgErro = imgErro;