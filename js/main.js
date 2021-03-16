function reload() {
    document.location.reload();
};

$(document).ready(function () {
    $(".header__nav-mobile--button").click(function () {
        document.getElementById("header__bars").classList.toggle("display-block");
    });

    $(".header__bars--icon").click(function () {
        document.getElementById("header__bars").classList.toggle("display-block");
    });
    $(".barsClick").click(function () {
        document.getElementById("header__bars").classList.toggle("display-block");
    })
});