$(function() {
    $("a.nblink").attr("href", function(i) {
        token = $(this).data('token');
        return $(this).attr('href') + '?token=' + token;
    })
})