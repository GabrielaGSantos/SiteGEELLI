$(document).ready(function () {
    botao(function () {
        jQuery(document).ready(function ($) {
            //open popup
            $('.cd-popup-trigger').on('click', function (event) {
                event.preventDefault();
                $('.cd-popup').addClass('is-visible');
            });

            //close popup
            $('.cd-popup').on('click', function (event) {
                if ($(event.target).is('.cd-popup-close') || $(event.target).is('.cd-popup')) {
                    event.preventDefault();
                    $(this).removeClass('is-visible');
                }
            });
            //close popup when clicking the esc keyboard button
            $(document).keyup(function (event) {
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
        url: "/eventos/xipoesiapedepassagem/getInscricao",
        data: "userId=" + userId,
        dataType: 'json',
        async: false,
        success: function (data) {
            if (data.msg) {
                $("#evento1").html('<p>Nenhum evento disponível</p><br>');
                console.log(data.msg.descricao)
                let modalidade = "";
                switch(data.msg.id_modalidade) {
                    case 1:
                        modalidade = "Música"
                    break;
                    case 2:
                        modalidade = "Declamação"
                    break;
                    case 3:
                        modalidade = "Performance"
                    break;
                    case 4:
                        modalidade = "Teatro"
                    break;
                    case 5:
                        modalidade = "Outro"
                    break;
                }
                console.log(modalidade)
                $(".eventosInscritor").html(' <div id="iscritoEvento1"><h3><a href="#">XI Sarau Lítero-Musical - A Poesia Pé-De Passagem</a></h3><p><b>Modalidade:</b> '+modalidade+'<br><b>Descrição ou Título da Apresentação:</b> ' + data.msg.descricao+' </p><ul class="actions"><li><a href="/eventos/xipoesiapedepassagem/cancelar?userId=' + getUser().id +'"  class="button icon fa-file">Cancelar</a></li><li><a</a></li></ul></div');

            }
        }
    });
    retorno();
}

function janela() {

}