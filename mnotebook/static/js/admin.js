$(function() {
    // delete admin
    $(".btn-del-admin").click(function() {
        var nickname = $(this).data('nickname');
        var url = $(this).data('url');
        var data = {'nickname': nickname};
        $.ajax({
            type: "DELETE",
            url: url,
            data: JSON.stringify(data),
            contentType: "application/json; charset=utf-8",
            success: function() {
                alert("Admin Deleted");
                location.reload();
            },
            error: function() {
                alert("Delete Failed");
            }
        });
    });

    // edit admin
    $(".btn-edit-admin").click(function () {
        var nickname = $(this).data('nickname');
        var email = $(this).data('email');
        var url = $(this).data('url');
        $(".modal-body #nickname").val(nickname);
        $(".modal-body #email").val(email);
    });

    // submit update admin
    $(".submit-update-admin").click(function() {
        var nickname = $(".modal-body #nickname").val();
        var password = $(".modal-body #password").val();
        var email    = $(".modal-body #email").val();
        var data = {'nickname': nickname, 'password': password,
                    'email': email};
        var url = $(".btn-edit-admin").data('url');
        $.ajax({
            type: "PUT",
            url: url,
            data: JSON.stringify(data),
            contentType: "application/json; charset=utf-8",
            success: function() {
                alert("Admin Updated");
                location.reload();
            },
            error: function() {
                alert("Update Failed");
            }
        });
    });

    // submit create admin
    $(".submit-create-admin").click(function() {
        var nickname = $(".modal-body #new_nickname").val();
        var password = $(".modal-body #new_password").val();
        var email    = $(".modal-body #new_email").val();
        var url  = $(".open-create-admin").data('url');
        var data = {'nickname': nickname, 'password': password,
                    'email': email};
        $.ajax({
            type: "POST",
            url: url,
            data: JSON.stringify(data),
            contentType: "application/json; charset=utf-8",
            success: function() {
                alert("Admin Created");
                location.reload();
            },
            error: function() {
                alert("Create Failed");
            }
        });
    });
});