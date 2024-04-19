function flash(type, message) {
    const flashContainer = document.createElement("div")
    flashContainer.classList.add("flash-container")
    document.body.appendChild(flashContainer)
    flashContainer.innerHTML = `<p class="flash ${type} fade-out">${message} <span class="btn-close btn-close-white"></span></p>`
    document.querySelector(".flash .btn-close").addEventListener("click", () => {
        flashContainer.innerHTML = ""
    })
    setTimeout(() => {
        flashContainer.innerHTML = ""
    }, 6000);
}