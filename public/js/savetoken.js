$(document).ready(function () {
    console.log("inside save token onload function");
    localStorage.setItem('access-token', $("#accesstoken").val()); 
    localStorage.setItem('refresh-token', $("#refreshtoken").val()); 
    localStorage.setItem('id-token', $("#idtoken").val()); 
    window.location.href = '/dashboard';
});