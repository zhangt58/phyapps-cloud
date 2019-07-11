$(function() {
    $(".btn-login-login").click(function() {
        var url  = $(this).data("url");
        var surl = $(this).data("surl"); // redirect to if success
        var op   = $(this).data("op");
        var username = $("#inputUsername").val()
        var password = $("#inputPassword").val()
        var ck_admin = $("#checkAdmin").prop('checked');
        var data = {'username': username, 'password': password,
                    'op': op, 'check_admin': ck_admin};

        // console.log(url);
        // console.log(surl);
        // console.log(data);

        $.ajax({
            type: "POST",
            url: url,
            data: JSON.stringify(data),
            contentType: "application/json; charset=utf-8",
            success: function() {
                $(location).attr('href', surl);
                alert("Login Successfully.");
            },
            error: function() {
                alert("Login Failed, Try Again or Sign Up!");
            },
        });
    });

    $(".btn-login-signup").click(function() {
        var url   = $(this).data("url");
        var surl  = $(this).data("surl"); // redirect to if success
        var op    = $(this).data("op");
        var username = $("#inputUsername").val()
        var password = $("#inputPassword").val()
        var data = {'username': username, 'password': password, "op": op};

        console.log(url);
        console.log(data);

        $.ajax({
            type: "POST",
            url: url,
            data: JSON.stringify(data),
            contentType: "application/json; charset=utf-8",
            success: function(r, status_code) {
                console.log(status_code);
                console.log(r);
                alert("New User " + username +" Signed Up!");
                $(location).attr('href', surl);
            },
            error: function(r) {
                errmsg = JSON.parse(r.responseText)['error'];
                alert(errmsg);
            },
        });
    });
});
