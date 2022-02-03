$(function () {
    $('[data-toggle="tooltip"]').tooltip({html:true})
})

// Inicializa e traduz o DataTable
$(document).ready(function() {
    $('.datatablesSimple').DataTable( {
        "language": {
            "url": "https://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Portuguese-Brasil.json"
        }
    } );
} );