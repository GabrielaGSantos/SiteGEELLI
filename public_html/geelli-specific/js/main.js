$(document).ready(function() {
    if (window.localStorage) {
        if (localStorage["Authorization"] != null) {
            $.ajax({
                type: "GET",
                url: "/usuarios/getUser",
                dataType: 'json',
                async: false,
                headers: {
                    "Authorization": localStorage["Authorization"]
                },
                success: function(data) {
                    $("#inscricoesRedirect").attr("href", '#');
                    $("#inscricoesText").html("<b>Meus Dados<b>");
                    $("#inscricoesLine").append("<ul><li><a class='icon fa-black-tie' href='/usuarios/meusEventos'> Minhas Inscrições</a></li><li><a class='icon fa-vcard' href='/usuarios/meusDados'> Informações Pessoais</a></li></ul>")
                    $("#navUl").append("<li> <a id='logout' class='icon fa-arrow-circle-right' href='' onclick=' localStorage.clear(); location.reload();'> <span id = 'inscricoesText'> <b> Logout </b></span></a></li>");
                },
                error: function(data) {
                    //alert(JSON.stringify(data));
                }
            });
        }
    }
});