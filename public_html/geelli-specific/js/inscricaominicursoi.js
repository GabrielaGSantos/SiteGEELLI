function validateForm() {
    var validation = true;

    var modalidade = document.forms["formularioInscricao"]["turno"].value;
    if (modalidade == 'null' && validation) {
        alert('Selecione uma turma');
        validation = false;
    }

    return validation;
}


$(document).ready(function () {
    $('#formularioInscricao').submit(function (e) {
        var url = "/eventos/minicursoi/inscrever";

        e.preventDefault();

        if (validateForm()) {
            var jqXHR = jQuery.ajax({
                type: "POST",
                url: url,
                async: true,
                cache: false,
                data: $("#formularioInscricao").serialize() + "&userId=" + getUser().id + "&userName=" + getUser().nome,
                dataType: 'json',
                cache: false,
                timeout: 5000,
                success: function (data) {
                    window.location = '/usuarios/meusEventos';

                },
                error: function () {
                    alert('Erro ao concluir sua solicitação. Tente novamente.')
                }
            });
            return false;
        }
    });
});