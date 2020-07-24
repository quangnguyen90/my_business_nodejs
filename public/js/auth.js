// Login
function login() {
    $.ajax({
        url: '/auth/login',
        type: 'POST',
        data: {
            username: $('#username').val(),
            password: $('#password').val()
        }
    })
    .then(data => {
        setCookie('token', data.token, 1);
        window.location.href = "/home";
    })
    .catch(err => {
        console.log('API Error')
    })
}

$('#btnHomeEdit').click(function() {
    var token = getCookie('token');
    $.ajax({
        url: '/edit',
        type: 'POST',
        headers: {
            token: token
        }
    })
    .then(data => {
        console.log(data);
    })
    .catch(err => {
        console.log('Server Error')
    })
});

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
        c = c.substring(1);
    }
        if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
    }
    }
    return "";
}