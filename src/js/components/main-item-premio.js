let output = '';
let cont = 1;

const gerarProduto = (rifa, premios) => {
    const dataHorarioSorteio = rifa.dataSorteio.split('T');

    const dataSorteio = dataHorarioSorteio[0];
    const arrayDataHorarioSorteio = dataHorarioSorteio[1].split(':');
    
    const horaSorteio = arrayDataHorarioSorteio[0];
    const minutosSorteio = arrayDataHorarioSorteio[1];

    output += `
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
    `;

    return output;
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

export default (rifa, premios) => {
    return gerarProduto(rifa, premios);
}

// Passa funções do escopo do módulo para o escopo global
window.imgErro = imgErro;