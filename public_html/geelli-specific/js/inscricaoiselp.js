function validateForm() {
    var validation = true;

    var modalidade = document.forms["formularioInscricao"]["modalidade"].value;
    if (modalidade == 'null' && validation) {
        alert('Selecione uma modalidade');
        validation = false;
    }

    var nomeTrabalho = document.forms["formularioInscricao"]["nomeTrabalho"].value;
    if (modalidade == '1' && validation && nomeTrabalho == '') {
        alert('Digite o nome do trabalho a ser enviado');
        validation = false;
    }

    var resumo = document.forms["arquivo"]["resumo"].value;
    if (modalidade == '1' && validation && resumo == '') {
        alert('Selecione um arquivo contendo o Resumo');
        validation = false;
    }

    return validation;
}

function hideTrabalhos() {
    $("input[name=nomeTrabalho]").hide();
    $("label[for=nomeTrabalho]").hide();
    $("input[name=resumo]").hide();
    $("label[for=resumo]").hide();
    $("input[name=nomeTrabalho]").val('');
    $("input[name=resumo]").val('');
}

function showTrabalhos() {
    $("input[name=nomeTrabalho]").show();
    $("label[for=nomeTrabalho]").show();
    $("input[name=resumo]").show();
    $("label[for=resumo]").show();
}

$(document).ready(function () {
    hideTrabalhos();
    $("select[name=modalidade]").on('change', function () {
        var optionSelected = $("option:selected", this);
        if (this.value == '1')
            showTrabalhos();
        else
            hideTrabalhos();
    });

    $('#formularioInscricao').submit(function (e) {
        var url = "/eventos/iselp/inscrever";

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

function uploadResumo() {
    $("#arquivo").submit();
}