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
    })
    .catch(err => {
        console.log('API Error')
    })
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}