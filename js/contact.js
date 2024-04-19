const contactForm = document.querySelector(".contact-form")
contactForm.name.addEventListener("blur", e => {
    if (validateContactFormName()) {
        showMessage(e.target, "*")
    } else {
        showMessage(e.target, "Name must start with a capital letter")
    }
})
contactForm.phone.addEventListener("blur", e => {
    if (validateContactFormPhone()) {
        showMessage(e.target, "*")
    } else {
        showMessage(e.target, "Phone number must have 10 digits")
    }
})
contactForm.email.addEventListener("blur", e => {
    if (validateContactFormEmail()) {
        showMessage(e.target, "*")
    } else {
        showMessage(e.target, "Email must be at the right format")
    }
})
contactForm.message.addEventListener("blur", e => {
    if (validateContactFormMessage()) {
        showMessage(e.target, "*")
    } else {
        showMessage(e.target, "Message must be at least 10 characters")
    }
})
contactForm.addEventListener("submit", e => {
    e.preventDefault()
    if (validateContactForm()) {
        flash("success", "Message has been sent")
        contactForm.name.value = ""
        contactForm.phone.value = ""
        contactForm.email.value = ""
        contactForm.message.value = ""
    } else {
        contactForm.name.dispatchEvent(new Event("blur"))
        contactForm.phone.dispatchEvent(new Event("blur"))
        contactForm.email.dispatchEvent(new Event("blur"))
        contactForm.message.dispatchEvent(new Event("blur"))
        flash("error", "Input is invalid please check again")
    }
})
function validateContactFormName() {
    return /^[A-Z][A-Za-z]*$/.test(contactForm.name.value)
}
function validateContactFormPhone() {
    return /^\d{10}$/.test(contactForm.phone.value)
}
function validateContactFormEmail() {
    return /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(contactForm.email.value)
}
function validateContactFormMessage() {
    return /^.{10,}$/.test(contactForm.message.value)
}
function showMessage(field, message) {
    field.parentNode.querySelector(".error-message").innerHTML = message
}
function validateContactForm() {
    return validateContactFormName() && validateContactFormPhone() && validateContactFormEmail() && validateContactFormMessage()
}