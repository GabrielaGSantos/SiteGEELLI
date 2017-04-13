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
                    $("#inscricoesRedirect").attr("href", '/usuarios/meusEventos');
                    $("#inscricoesText").html("<b>Minhas Inscrições<b>");
                    $("#nav ul").append("<li> <a id='logout' class='icon fa-arrow-circle-right' href='' onclick=' localStorage.clear(); location.reload();'> <span id = 'inscricoesText'> <b> Logout </b></span></a></li>");
                },
                error: function(data) {
                    alert('error');
                }
            });
        }
    }
});