// Valida o formulário
function validateForm() {
    var validation = true;

    // Primeiro verifica se todos os campos de texto estão preenchidos
    var check = document.getElementsByTagName('input');
    for (var i = 0; i < 10 && validation; i++) {
        if (check[i].value === '') {
            alert('Todos os campos necessitam ser preenchidos');
            validation = false;
        }
    }

    // Depois verifica se o Estado não é nulo
    var estado = document.forms["formularioCadastro"]["estado"].value;
    if (estado == 'null' && validation) {
        alert('Selecione um Estado');
        validation = false;
    }

    // Verifica se o e-mail é válido
    var email = document.forms["formularioCadastro"]["email"].value;
    var re =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(email) && validation) {
        alert('E-mail inválido');
        validation = false;
    }

    // Verifica se a senha e a confirmação de senha são iguais
    var senha = document.forms["formularioCadastro"]["senha"].value;
    var confirmacaoSenha = document.forms["formularioCadastro"]["confirmacaoSenha"].value;
    if (senha != confirmacaoSenha && validation) {
        alert('As senhas digitadas são diferentes');
        validation = false;
    }

    // Verifica se a senha têm pelo menos 6 caracteres
    if (senha.length < 6 && validation) {
        alert('A senha precisa ter pelo menos 6 caracteres');
        validation = false;
    }

    return validation;
}


function formatar(mascara, documento) {
    var i = documento.value.length;
    var saida = mascara.substring(0, 1);
    var texto = mascara.substring(i)

    if (texto.substring(0, 1) != saida) {
        documento.value += texto.substring(0, 1);
    }
}

$(document).ready(function() {
    // AJAX que envia as informações do Cadastro
    $('#formularioCadastro').submit(function(e) {
        var url = "/usuarios/registrar";

        e.preventDefault();

        if (validateForm()) {
            var jqXHR = jQuery.ajax({
                type: "POST",
                url: url,
                async: true,
                cache: false,
                data: $("#formularioCadastro").serialize(),
                dataType: 'json',
                cache: false,
                timeout: 5000,
                complete: function() {
                    window.location = '/usuarios/login';
                },
                success: function(data) {
                    window.location = '/usuarios/login';
                },
                error: function() {
                    alert('Usuário já cadastrado')
                }
            });
            return false;
        }
    });
});