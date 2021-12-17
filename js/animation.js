// Shrinks navbar onscroll
var nav = document.getElementById("nav-wrapper");
window.addEventListener("scroll", () => {
    if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
        nav.classList.add("shrink-nav");
    } else {
        nav.classList.remove("shrink-nav");

    }
})

// To top button
var mybutton = document.getElementById("to-top");

window.onscroll = function () { scrollFunction() };

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        mybutton.style.display = "block";
    } else {
        // To hide button when not on top
        mybutton.style.display = "none";
    }
}

function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}
