document.addEventListener("scroll", () => {
    const navbar = document.querySelector(".navbar");
    if (window.scrollY > 50) {
        navbar.classList.add("navbar-scroll-effect");
    } else {
        navbar.classList.remove("navbar-scroll-effect");
    }
})
