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
    let inscricao1 = undefined;
    let inscricao2 = undefined;
    $.ajax({
        type: "POST",
        url: "/eventos/xipoesiapedepassagem/getInscricao",
        data: "userId=" + userId,
        dataType: 'json',
        async: false,
        success: function (data) {
            if (data.msg) {
                $("#evento1").html('');
                console.log(data.msg.descricao)
                let modalidade = "";
                switch (data.msg.id_modalidade) {
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
                $(".eventosInscrito1").html(' <div id="iscritoEvento1"><h3><a href="#">XI Sarau Lítero-Musical - A Poesia Pé-De Passagem</a></h3><p>O Grupo de Estudos em Ensino de Línguas e Literatura - GEELLI e o Instituto Federal de Educação, Ciência e Tecnologia de Mato Grosso - Campus Cuiabá tem a satisfação de anunciar o XI SARAU LÍTERO-MUSICAL - A POESIA PÉ-DE PASSAGEM no dia 08 de junho, na Sala de Projeções do IFMT- Campus Cuiabá, a partir das 17h. Trata-se de um evento em que a arte será abordada numa perspectiva diversificada, abrangendo a literatura por meio de declamação de poesias, música, performance, e a arte plástica será desenvolvida através da mostra de obras produzidas durante as aulas de arte-educação.<br><h3 style="font-size: 14px">Minha Inscrição</h3><b>Modalidade:</b> ' + modalidade + '<br><b>Descrição ou Título da Apresentação:</b> ' + data.msg.descricao + ' </p><ul class="actions"><li><a href="/eventos/xipoesiapedepassagem/cancelar?userId=' + getUser().id + '"  class="button icon fa-file">Cancelar</a></li><li><a</a></li></ul></div');
                inscricao1 = true;
            } else {
                inscricao1 = false;
            }
            $.ajax({
                type: "POST",
                url: "/eventos/minicursoi/getInscricao",
                data: "userId=" + userId,
                dataType: 'json',
                async: false,
                success: function (data) {
                    if (data.msg) {
                        $("#evento2").html('');
                        let turno;

                        if (data.msg.turno == "M")
                            turno = "09h00 às 11h00"
                        else
                            turno = "14h00 às 16h00"

                        console.log(data)
                        $(".eventosInscrito2").html('<div id="iscritoEvento2"><h3><a href="#">Oficina "ENCENANDO A POESIA" - XI Sarau Lítero-Musical</a></h3><p><strong style="color:#636967">Data da oficina: </strong> 04 de junho de 2018 (2ª feira)<br><strong style="color:#636967"> Turno: </strong> ' + turno + '</p><ul class="actions"><li><a href="/eventos/minicursoi/cancelar?userId=' + getUser().id + '"  class="button icon fa-file">Cancelar</a></li><li><a</a></li></ul></div');
                        inscricao2 = true;
                    } else {
                        inscricao2 = false;
                    }
                    if (inscricao1 && inscricao2) {
                        $("#separador").html("<hr style='border-color: grey; border-width: 1px;'></hr>")
                        $("#evento1").html('Nenhuma Inscrição Disponível');
                    }
                }
            });
        }
    });

    retorno();
}

function janela() {

}