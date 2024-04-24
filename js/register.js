// event listener
const registerForm = document.querySelector("#register-form")
registerForm.firstName.addEventListener("blur", e => {
    if (validateFirstName()) {
        showMessage(e.target, "*")
    } else {
        showMessage(e.target, "First name must start with a capital letter")
    }
})
registerForm.lastName.addEventListener("blur", e => {
    if (validateLastName()) {
        showMessage(e.target, "*")
    } else {
        showMessage(e.target, "Last name must start with a capital letter")
    }
})
registerForm.dob.addEventListener("blur", e => {
    if (validateDOB()) {
        showMessage(e.target, "*")
    } else {
        showMessage(e.target, "Date of birth must be before the current date")
    }
})
registerForm.email.addEventListener("blur", e => {
    if (validateEmail()) {
        showMessage(e.target, "*")
    } else {
        showMessage(e.target, "Email must be in the correct format")
    }
})
registerForm.password.addEventListener("blur", e => {
    if (validatePassword()) {
        showMessage(e.target, "*")
    } else {
        showMessage(e.target, "The password must contain letters, numbers, and be at least 6 characters long.")
    }
})
registerForm.confirmedPassword.addEventListener("blur", e => {
    if (validateConfirmPassword()) {
        showMessage(e.target, "*")
    } else {
        showMessage(e.target, "Re-entered password must match the password")
    }
})

registerForm.addEventListener("submit", e => {
    e.preventDefault();
    if (validateForm()) {
        const firstName = registerForm.firstName.value;
        const lastName = registerForm.lastName.value;
        const gender = registerForm.gender.value;
        const dob = registerForm.dob.value;
        const email = registerForm.email.value;
        const password = registerForm.password.value;
        const newUser = { firstName, lastName, gender, dob, email, password }
        if (register(newUser)) {
            document.body.style.cursor = "wait"
            e.target.querySelector("button").style.cursor = "wait"
            setTimeout(() => {
                localStorage.setItem("currentUser", JSON.stringify(newUser))
                showAccount()
                window.location.href = "home.html"
                localStorage.setItem("flash", JSON.stringify({ "type": "success", "message": `Welcome to Gopet ${newUser.firstName} ${newUser.lastName}` }))
                document.body.style.cursor = "default"
                e.target.querySelector("button").style.cursor = "default"
            }, 3000);
        } else {
            flash("error", "This email has already been registered")
            registerForm.email.focus()
        }
    } else {
        flash("error", "Input is not valid please check again")
    }
});

// helper functions
function validateFirstName() {
    const firstName = registerForm.firstName.value;
    const regex = /^[A-Z][a-z]*$/;
    return regex.test(firstName);
}

function validateLastName() {
    const lastName = registerForm.lastName.value;
    const regex = /^[A-Z][a-z]*$/;
    return regex.test(lastName);
}

function validateEmail() {
    const email = registerForm.email.value;
    let regex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    return regex.test(email);
}

function validatePassword() {
    const password = registerForm.password.value;
    let regex = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;
    return regex.test(password);
}

function validateConfirmPassword() {
    const confirmPassword = registerForm.confirmedPassword.value;
    const password = registerForm.password.value;
    return confirmPassword === password;
}

function validateDOB() {
    const dob = new Date(registerForm.dob.value);
    const today = new Date();
    return dob < today;
}

function showMessage(field, message) {
    field.parentNode.querySelector(".error-message").innerHTML = message
}

function validateForm() {
    const firstNameValid = validateFirstName();
    const lastNameValid = validateLastName();
    const emailValid = validateEmail();
    const passwordValid = validatePassword();
    const confirmPasswordValid = validateConfirmPassword();
    const dobValid = validateDOB();

    if (!firstNameValid) registerForm.firstName.dispatchEvent(new Event('blur'));
    if (!lastNameValid) registerForm.lastName.dispatchEvent(new Event('blur'));
    if (!emailValid) registerForm.email.dispatchEvent(new Event('blur'));
    if (!passwordValid) registerForm.password.dispatchEvent(new Event('blur'));
    if (!confirmPasswordValid) registerForm.confirmedPassword.dispatchEvent(new Event('blur'));
    if (!dobValid) registerForm.dob.dispatchEvent(new Event('blur'));

    return firstNameValid && lastNameValid && emailValid && passwordValid && confirmPasswordValid && dobValid;
}

function register(newUser) {
    let users = JSON.parse(localStorage.getItem("users")) || []
    for (let user of users) {
        if (user.email === newUser.email) {
            return false;
        }
    }
    users.push(newUser)
    localStorage.setItem("users", JSON.stringify(users))
    return true
}