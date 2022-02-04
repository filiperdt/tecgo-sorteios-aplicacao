// INDEX
const fnIndex = () => {
    let output = '';
    const main = document.querySelector("#root");

    output += `
        <div class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
            <div id="cartao1" class="col mb-5">
                <div class="card h-100">
                    <!-- Product price-->
                    <div class="badge bg-dark text-white position-absolute" style="top: 7.7rem; right: 0.3rem">
                        R$50,00
                    </div>
                    <!-- Product image--> <!-- A resolução da imagem deve ser 450 x 300 -->
                    <div class="div-card-img d-flex justify-content-center align-items-center">
                        <img class="card-img-top" src="src/storage/img/no-image-medio.png" alt="..." />
                    </div>
                    <!-- Product details-->
                    <div class="card-body p-4">
                        <div class="text-center">
                            <!-- Product name-->
                            <h5 class="fw-bolder">Carros envelopados!!!</h5>
                        </div>
                    </div>
                    <!-- Product actions-->
                    <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                        <div class="text-center"><a class="btn btn-outline-dark mt-auto" href="#">Escolher número</a></div>
                    </div>
                </div>
            </div>
            <div id="cartao2" class="col mb-5">
                <div class="card h-100">
                    <!-- Product price-->
                    <div class="badge bg-dark text-white position-absolute" style="top: 7.7rem; right: 0.3rem">
                        R$30,00
                    </div>
                    <!-- Product image--> <!-- A resolução da imagem deve ser 450 x 300 -->
                    <div class="div-card-img d-flex justify-content-center align-items-center">
                        <img class="card-img-top" src="src/storage/img/no-image-medio.png" alt="..." />
                    </div>
                    <!-- Product details-->
                    <div class="card-body p-4">
                        <div class="text-center">
                            <!-- Product name-->
                            <h5 class="fw-bolder">Corsa doc. ok</h5>
                        </div>
                    </div>
                    <!-- Product actions-->
                    <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                        <div class="text-center"><a class="btn btn-outline-dark mt-auto" href="#">Escolher número</a></div>
                    </div>
                </div>
            </div>
            <div id="cartao3" class="col mb-5">
                <div class="card h-100">
                    <!-- Product price-->
                    <div class="badge bg-dark text-white position-absolute" style="top: 7.7rem; right: 0.3rem">
                        R$15,00
                    </div>
                    <!-- Product image--> <!-- A resolução da imagem deve ser 450 x 300 -->
                    <div class="div-card-img d-flex justify-content-center align-items-center">
                        <img class="card-img-top" src="src/storage/img/no-image-medio.png" alt="..." />
                    </div>
                    <!-- Product details-->
                    <div class="card-body p-4">
                        <div class="text-center">
                            <!-- Product name-->
                            <h5 class="fw-bolder">Celta único dono</h5>
                        </div>
                    </div>
                    <!-- Product actions-->
                    <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                        <div class="text-center"><a class="btn btn-outline-dark mt-auto" href="#">Escolher número</a></div>
                    </div>
                </div>
            </div>
            <div id="cartao4" class="col mb-5">
                <div class="card h-100">
                    <!-- Product price-->
                    <div class="badge bg-dark text-white position-absolute" style="top: 7.7rem; right: 0.3rem">
                        R$15,00
                    </div>
                    <!-- Product image--> <!-- A resolução da imagem deve ser 450 x 300 -->
                    <div class="div-card-img d-flex justify-content-center align-items-center">
                        <img class="card-img-top" src="src/storage/img/no-image-medio.png" alt="..." />
                    </div>
                    <!-- Product details-->
                    <div class="card-body p-4">
                        <div class="text-center">
                            <!-- Product name-->
                            <h5 class="fw-bolder">Vectra único dono</h5>
                        </div>
                    </div>
                    <!-- Product actions-->
                    <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                        <div class="text-center"><a class="btn btn-outline-dark mt-auto" href="#">Escolher número</a></div>
                    </div>
                </div>
            </div>
        </div>
    `

    main.innerHTML = output;
};

// INÍCIO
window.addEventListener("load", () => {
    fnIndex();
});