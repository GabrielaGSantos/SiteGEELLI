function validateForm() {
    var validation = true;

    var tipoInscricao = document.forms["formularioInscricao"]["tipoInscricao"].value;
    if (tipoInscricao == 'null' && validation) {
        alert('Selecione uma tipoInscricao');
        validation = false;
    }

    return validation;
}

$(document).ready(function () {
    hideTrabalhos();
    $("select[name=tipoInscricao]").on('change', function () {
        var optionSelected = $("option:selected", this);
    });

    $('#formularioInscricao').submit(function (e) {
        var url = "/eventos/iiselp/inscrever";

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