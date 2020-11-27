$(document).ready(function () {
    $.ajax({
        url: "/dashboard",
        type: "POST",
        headers: {
            "Content-Type": "application/json",
            "access-token": window.localStorage.getItem('access-token'),
            "refresh-token": window.localStorage.getItem('refresh-token'),
            "id-token": window.localStorage.getItem('id-token'),
        },
        success: function (data) {
            console.log("entered success in gettoken");
            document.open();
            document.write(data);
            document.close();
          },
          error: function (response, msg, error) {
            console.log("entered error block in gettoken");
            window.location.href = '/';
          },
    });

});