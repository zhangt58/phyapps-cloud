$(function() {
    $('.nav-logout').click(function(e){
        e.preventDefault();
        var url = $(this).data("url");

        console.log(url);

        $.ajax({
            type: "PUT",
            url: url,
            success: function() {
                alert("Logout");
                location.reload();
            },
            error: function() {
                alert("Logout Error");
            },
        });
    });
});
