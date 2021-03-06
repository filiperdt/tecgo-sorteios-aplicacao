let output = '';

const renderCard = rifas => rifas.forEach(rifa => {
    output += `
        <div class="col mb-5">
                <div class="card h-100">
                    <!-- Product price-->
                    <div class="badge bg-dark text-white position-absolute" style="top: 7.7rem; right: 0.3rem">
                        R$${rifa.valor}
                    </div>
                    <!-- Product image--> <!-- A resolução da imagem deve ser 450 x 300 -->
                    <div class="div-card-img d-flex justify-content-center align-items-center">
                        <img class="card-img-top" src="src/storage/img/no-image-medio.png" alt="..." />
                    </div>
                    <!-- Product details-->
                    <div class="card-body p-4">
                        <div class="text-center">
                            <!-- Product name-->
                            <h5 class="fw-bolder">${rifa.titulo}</h5>
                        </div>
                    </div>
                    <!-- Product actions-->
                    <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                        <div class="text-center"><a class="btn btn-outline-dark mt-auto" href="src/item.html?id=${rifa.id}">Escolher número</a></div>
                    </div>
                </div>
            </div>
    `;
});

export default rifas => {
    output = '';

    // Ordem decrescente. Do mais novo para o mais antigo
    rifas.sort((a, b) => a.dataCriacao > b.dataCriacao ? -1 : a.dataCriacao === b.dataCriacao ? 0 : 1);

    output += `
        <div class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
            `;

            renderCard(rifas);

            output += `
        </div>
    `;

    return output;
}