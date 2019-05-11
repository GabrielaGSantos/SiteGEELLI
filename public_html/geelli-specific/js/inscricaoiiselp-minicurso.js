function validateForm() {
    var validation = true;

    var nomeTrabalho = document.forms["formularioInscricao"]["nome_minicurso"].value;
    if (validation && nomeTrabalho == '') {
        alert('Digite o nome do trabalho a ser enviado');
        validation = false;
    }

    var resumo = document.forms["arquivo"]["resumo"].value;
    if (validation && resumo == '') {
        alert('Selecione um arquivo contendo o projeto');
        validation = false;
    }

    return validation;
}

$(document).ready(function () {
    $('#formularioInscricao').submit(function (e) {
        var url = "/eventos/iiselp-minicurso/inscrever";

        e.preventDefault();
        
        $("#arquivo").submit(function (eventObj) {
            $('<input />').attr('type', 'hidden')
                .attr('name', "userId")
                .attr('value', getUser().id)
                .appendTo('#arquivo');
            return true;
        });

        if (validateForm()) {
            var jqXHR = jQuery.ajax({
                type: "POST",
                url: url,
                async: true,
                cache: false,
                data: $("#formularioInscricao").serialize() + "&id_usuario=" + getUser().id,
                dataType: 'json',
                cache: false,
                timeout: 5000,
                success: function (data) {                    
                        uploadResumo();
                },
                error: function () {
                    alert('Erro ao concluir sua solicitação. Tente novamente.')
                }
            });
            return false;
        }
    });
});

function uploadResumo() {
    $("#arquivo").submit();
}