$(document).ready(function () {
    $("#separador").hide()
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
    let inscricao2 = true

    $.ajax({
        type: "POST",
        url: "/eventos/iiselp/getInscricao",
        data: "userId=" + userId,
        dataType: 'json',
        async: false,
        success: function (data) {
            if (data.msg) {
                $("#evento1").html('');

                let tipoInscricao = "";
                switch (data.msg.tipoInscricao) {
                    case 0:
                        tipoInscricao = "Ouvinte"
                        break;
                    case 1:
                        tipoInscricao = "Apresentação de Trabalho"
                        break;
                }

                $(".eventosInscrito1").html(' <div id="iscritoEvento1"><h3><a href="#">II SELP - Simpósio de Língua Portuguesa</a></h3><p>O GEELLI e o Instituto Federal de Educação, Ciência e Tecnologia de Mato Grosso - Campus Cuiabá têm a satisfação de anunciar o II SELP - Simpósio sobre o Ensino de Língua Portuguesa, com o tema “Literatura, ensino e tecnologias: leitores e leituras no século XXI". O evento será realizado na sede do IFMT - Campus Cuiabá no período de 12 e 13 de junho de 2019, na Sala de Projeções do IFMT Campus Cuiabá "Cel. Octayde Jorge da Silva". O II SELP pretende reunir pesquisadores nacionais e regionais para a realização de conferências, palestras, mesas-redondas e sessões de relatos de experiências. Tem, como público-alvo, professores da área de Língua Portuguesa dos diferentes Campi do IFMT, como também de outras instituições de ensino, como a Universidade Federal de Mato Grosso, a Universidade Estadual de Mato Grosso e escolas públicas da Rede Estadual de Ensino do Estado de Mato Grosso.<br><h3 style="font-size: 14px">Minha Inscrição</h3><b>Modalidade:</b> ' + tipoInscricao + '</ul><br><div id="dadosTrabalho"></div><div id="cancelar"<br><br><li><a style="background-color: #3f48cc" href="/eventos/iiselp/cancelar?userId=' + getUser().id + '"  class="button icon fa-file">Cancelar</a></li><li><a</a></li></div></div><br>');
                inscricao1 = true;
                if (inscricao2) $("#tituloPagina").hide()

                console.log(data.msg)
                if (data.msg.nomeTrabalho != 'undefined') {
                    $("#dadosTrabalho").html(`<li><b>Nome do Trabalho</b>: ${data.msg.nomeTrabalho}</li>`)
                }

                $("#separador").show()
            } else {
                inscricao1 = false;
            }
        }
    });

    // $.ajax({
    //     type: "POST",
    //     url: "/eventos/iiselp-minicurso/getInscricao",
    //     data: "id_usuario=" + userId,
    //     dataType: 'json',
    //     async: false,
    //     success: function (data) {
    //         if (data.msg) {
    //             $("#evento2").html('');

    //             $(".eventosInscrito2").html('<div id="iscritoEvento2"><h3><a href="#">II SELP - Propostas de Minicurso</a></h3><p><p> Dentre as atividades planejadas para o II SELP, haverá um período de 3 horas para de minicursos com o tema “Literatura, ensino e tecnologias: leitores e leituras no século XXI". A realização destes minicursos é aberta à comunidade. Caso tenha interesse, submeta o projeto do seu minicurso para avaliação.</p><h3 style="font-size: 14px">Minha Inscrição</h3><div id="dadosMinicurso"></ul></div><div id="cancelar"<br><br><li><a style="background-color: #3f48cc" href="/eventos/iiselp-minicurso/cancelar?userId=' + getUser().id + '"  class="button icon fa-file">Cancelar</a></li><li><a</a></li></div></div>');
    //             inscricao2 = true;
    //             if (inscricao1) $("#tituloPagina").hide()

    //             if (data.msg.nome_minicurso != 'undefined') {
    //                 $("#dadosMinicurso").html(`<li><b>Nome do Minicurso</b>: ${data.msg.nome_minicurso}</li>`)
    //             }

    //             $("#separador").show()

    //         } else {
    //             inscricao2 = false;
    //         }
    //     }
    // });

    retorno();
}

function janela() {

}