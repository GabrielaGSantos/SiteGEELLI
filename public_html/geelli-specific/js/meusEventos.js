$(document).ready(function() {
    botao(function() {
        jQuery(document).ready(function($) {
            //open popup
            $('.cd-popup-trigger').on('click', function(event) {
                event.preventDefault();
                $('.cd-popup').addClass('is-visible');
            });

            //close popup
            $('.cd-popup').on('click', function(event) {
                if ($(event.target).is('.cd-popup-close') || $(event.target).is('.cd-popup')) {
                    event.preventDefault();
                    $(this).removeClass('is-visible');
                }
            });
            //close popup when clicking the esc keyboard button
            $(document).keyup(function(event) {
                if (event.which == '27') {
                    $('.cd-popup').removeClass('is-visible');
                }
            });
        });
    });

});

function botao(retorno) {
    var userId = getUser().id;
    $.ajax({
        type: "POST",
        url: "/eventos/iselp/getInscricao",
        data: "userId=" + userId,
        dataType: 'json',
        async: false,
        success: function(data) {
            if (data.msg) {
                $("#evento1").html('<p>Nenhum evento disponível</p><br>');
                $(".eventosInscritor").html(' <div id="iscritoEvento1"><h3><a href="artigos/1a Circular - I SELP - IFMT.pdf">O Grupo de Estudos em Ensino de Línguas e Literatura - GEELLI e o Instituto Federal de Educação, Ciência e Tecnologia de Mato Grosso - Campus Cuiabá tem a satisfação de anunciar sucesso do I SELP - Simpósio sobre o Ensino de Língua Portuguesa, com o tema "Língua e Linguagens: mediação e construção de saberes para a docência na educação profissional. O evento foi realizado na sede do IFMT - Campus Cuiabá no período de 22 a 24 de junho de 2017, na Sala de Projeções do IFMT Campus Cuiabá Cel. Octayde Jorge da Silva. O GEELLI agradece a presença e participação de todos</p><ul class="actions"><li><a"class="button">Evento Concluído</a></li><li><a</a></li></ul></div>');

            }
        }
    });
    retorno();
}

function janela() {

}