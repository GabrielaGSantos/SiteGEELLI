function validateForm() {
    var validation = true;

    var modalidade = document.forms["formularioInscricao"]["modalidade"].value;
    if (modalidade == 'null' && validation) {
        alert('Selecione uma modalidade');
        validation = false;
    }

    var nomeTrabalho = document.forms["formularioInscricao"]["nomeTrabalho"].value;
    if (modalidade == '1' && validation && nomeTrabalho == '') {
        alert('Digite o nome do trabalho a ser apresentado');
        validation = false;
    }

    return validation;
}


$(document).ready(function () {
    $('#formularioInscricao').submit(function (e) {
        var url = "/eventos/xipoesiapedepassagem/inscrever";

        e.preventDefault();
        
        if (validateForm()) {
            var jqXHR = jQuery.ajax({
                type: "POST",
                url: url,
                async: true,
                cache: false,
                data: $("#formularioInscricao").serialize() + "&userId=" + getUser().id+ "&userName=" + getUser().nome,
                dataType: 'json',
                cache: false,
                timeout: 5000,
                success: function (data) {
                    var modalidade = document.forms["formularioInscricao"]["modalidade"].value;
                    if (modalidade == '1') {
                        uploadResumo();
                    } else {
                        window.location = '/usuarios/meusEventos';
                    }
                },
                error: function () {
                    alert('Erro ao concluir sua solicitação. Tente novamente.')
                }
            });
            return false;
        }
    });
});