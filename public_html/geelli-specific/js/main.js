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
                    $("#inscricoesLine").append("<ul><li><a class='icon fa-black-tie' href='/usuarios/meusEventos'> Minhas Inscrições</a></li><!--<li><a class='icon fa-vcard' href='/usuarios/meusDados'> Informações Pessoais</a></li></ul>-->")
                    $("#navUl").append("<li> <a id='logout' class='icon fa-arrow-circle-right' href='javascript:{localStorage.clear(); location.reload();}''> <span id = 'inscricoesText'> <b> Logout </b></span></a></li>");
                    // uma soluçao triste esse href = javascript, mas nao encontrei nada melhor
                },
                error: function(data) {
                    //alert(JSON.stringify(data));
                }
            });
        }
    }

    $('#sendMessage').submit(function(e) {
        var url = "/mensagens/enviarMensagem"; // the script where you handle the form input.
        e.preventDefault();
        if (validateForm()) {
            var jqXHR = jQuery.ajax({
                type: "POST",
                url: url,
                async: true,
                cache: false,
                data: $("#sendMessage").serialize(), // serializes the form's elements.
                dataType: 'json',
                cache: false,
                timeout: 5000,
                success: function(data) {
                    alert('Mensagem enviada com sucesso');
                    window.location.reload();
                }
            });
            return false; // because we want to submit only through `ajax`, so stopping original form submit.
        }
    });
});

function validateForm() {
    var validation = true;
    var nome = document.forms["sendMessage"]["nome"].value;
    if (nome == '') {
        alert('Digite seu nome');
        validation = false;
    }

    var email = document.forms["sendMessage"]["email"].value;
    var re =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(email) && validation) {
        alert('E-mail inválido');
        validation = false;
    }

    var mensagem = document.forms["sendMessage"]["mensagem"].value;
    if (mensagem == '') {
        alert('Digite uma mensagem');
        validation = false;
    }

    return validation;
}