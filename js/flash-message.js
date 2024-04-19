function flash(type, message) {
    if (!(document.querySelector(".flash-container"))) {
        const flashContainer = document.createElement("div")
        flashContainer.classList.add("flash-container")
        document.body.appendChild(flashContainer)
    }
    const flashContainer = document.querySelector(".flash-container")
    flashContainer.innerHTML = `<p class="flash ${type} fade-out fw-bold">${message} <span class="btn-close btn-close-white ms-auto"></span></p>`
    document.querySelector(".flash .btn-close").addEventListener("click", () => {
        flashContainer.innerHTML = ""
    })
    setTimeout(() => {
        flashContainer.innerHTML = ""
    }, 6000);
}