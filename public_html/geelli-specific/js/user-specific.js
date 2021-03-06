var user = 'null';

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
                    $('body').css('display', 'block');
                    user = data;
                },
                error: function(data) {
                    location.replace('/usuarios/login');
                }
            });
        } else location.replace('/usuarios/login');
    } else location.replace('/usuarios/login');
});

function getUser() {
    return user;
}