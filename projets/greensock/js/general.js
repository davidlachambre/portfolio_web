window.addEventListener("load", function load(e) {

    window.removeEventListener("load", load, false);

    var logo = document.getElementById("logoGreenSock");

    logo.addEventListener("click", function load(e) {

        window.location.reload();
    });

}, false);