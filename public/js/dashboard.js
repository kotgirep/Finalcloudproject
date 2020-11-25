console.log("entered dashboard");
function signOut() {
    console.log(window.localStorage.getItem('access-token'));
    $.ajax({
        url: "/signout/",
        type: "POST",
        headers: {
            "Content-Type": "application/json",
            "access-token": window.localStorage.getItem('access-token'),
            "refresh-token": window.localStorage.getItem('refresh-token'),
            "id-token": window.localStorage.getItem('id-token'),
        },
        success: function (data) {
            window.location.href = '/';
          },
          error: function (response, msg, error) {
            // TODO: show this on screen.
            console.log("unable to sign-out! please try again!");
            //window.location.href = '/';
          },
    });
  }