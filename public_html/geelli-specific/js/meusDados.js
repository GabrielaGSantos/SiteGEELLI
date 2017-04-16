    var user = null;

    $(document).ready(function() {
        $('body').css('display', 'none');
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
                        user = data;
                        //alert(JSON.stringify(data));
                        $('body').css('display', 'block');
                        $("form#dados :input").each(function() {
                            if ($(this).attr('type') != 'submit' && $(this).attr('type') != 'password' && $(this).attr('name') != 'email')
                                $(this).val(data[$(this).attr('name')]); // This is the jquery object of the input, do what you will
                        });
                    },
                    error: function(data) {
                        location.replace('/Login.html');
                    }
                });
            } else location.replace('/Login.html');
        } else location.replace('/Login.html');
    });

    function formatar(mascara, documento) {
        var i = documento.value.length;
        var saida = mascara.substring(0, 1);
        var texto = mascara.substring(i)

        if (texto.substring(0, 1) != saida) {
            documento.value += texto.substring(0, 1);
        }

    }

    function fillField(input, val) {
        if (input.value == "")
            input.value = val;
    };

    function clearField(input, val) {
        if (input.value == val)
            input.value = "";
    };

    function validateForm() {
        var validation = true;
        var check = document.getElementsByTagName('input');
        for (var i = 0; i < 9 && validation; i++) {
            if (check[i].value === '') {
                alert('Todos os campos necessitam ser preenchidos');
                validation = false;
            }
        }

        var estado = document.forms["dados"]["estado"].value;
        if (estado == 'null' && validation) {
            alert('Selecione um Estado');
            validation = false;
        }

        return validation;
    }