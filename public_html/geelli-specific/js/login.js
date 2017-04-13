function validateForm() {
    var validation = true;
    var check = document.getElementsByTagName('input');
    for (var i = 0; i < 2 && validation; i++) {
        if (check[i].value === '') {
            alert('Coloque um e-mail e uma senha');
            validation = false;
        }
    }

    var email = document.forms["formularioLogin"]["email"].value;
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(email) && validation) {
        alert('E-mail inválido');
        validation = false;
    }

    return validation;
}

$(document).ready(function() {
    $('#formularioLogin').submit(function(e) {
        var url = "/usuarios/autenticar"; // the script where you handle the form input.
        e.preventDefault();
        if (validateForm()) {
            var jqXHR = jQuery.ajax({
                type: "POST",
                url: url,
                async: true,
                cache: false,
                data: $("#formularioLogin").serialize(), // serializes the form's elements.
                dataType: 'json',
                cache: false,
                timeout: 5000,
                success: function(data) {
                    window.localStorage.setItem('Authorization', data.token);
                    window.location = '/usuarios/meusEventos#main-wrapper';
                },
                error: function() {
                    alert('E-Mail/Senha Inválidos')
                }
            });
            return false; // because we want to submit only through `ajax`, so stopping original form submit.
        }
    });
});