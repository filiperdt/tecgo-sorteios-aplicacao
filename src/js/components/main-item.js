let output = '';

const gerarSectionProduto = () => {
    output += `
        <!-- Produto section-->
        <section class="py-5">
            <div class="container px-4 px-lg-5 my-5">
                <div class="row gx-4 gx-lg-5 align-items-center">
                    <!-- A resolução da imagem deve ser 600 x 700 -->
                    <div id="divPremios" class="col-md-6">
                    </div>
                </div>
            </div>
        </section>
    `;
}

const gerarSectionNumero = () => {
    output += `
        <section class="py-5 bg-dark">
            <div class="container px-4 px-lg-5 mt-5" style="text-align: center; color: white;">
                <h2><srong>Números</srong></h2>
            </div>
            <div id="divNumeros">
            </div>
        </section>
    `;
}

const gerarTemplate = () => {
    gerarSectionProduto();
    
    gerarSectionNumero();

    return output;
};

export default () => {
    return gerarTemplate();
}

// Passa funções do escopo do módulo para o escopo global
window.gerarSectionProduto = gerarSectionProduto;