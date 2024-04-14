const registerForm = document.querySelector("#register-form")
registerForm.firstName.addEventListener("blur", e => {
    const regex = /^[A-Z][a-z]*$/
    if (regex.test(e.target.value)) {
        e.target.parentNode.querySelector(".error-message").innerHTML = "*"
    } else {
        e.target.parentNode.querySelector(".error-message").innerHTML = "First name must start with a capital letter"
    }
})
registerForm.dob.addEventListener("blur", e => {
    const dob = new Date(e.target.value)
    const today = new Date()
    if (dob < today) {
        e.target.parentNode.querySelector(".error-message").innerHTML = "*"
    } else {
        e.target.parentNode.querySelector(".error-message").innerHTML = "Date of birth must be before the current date"
    }
})
registerForm.lastName.addEventListener("blur", e => {
    const regex = /^[A-Z][a-z]*$/
    if (regex.test(e.target.value)) {
        e.target.parentNode.querySelector(".error-message").innerHTML = "*"
    } else {
        e.target.parentNode.querySelector(".error-message").innerHTML = "Last name must start with a capital letter"
    }
})
registerForm.email.addEventListener("blur", e => {
    let regex = /^\w+(-\w+)*@\w+\.\w{2,3}$/
    if (regex.test(e.target.value)) {
        e.target.parentNode.querySelector(".error-message").innerHTML = "*"
    } else {
        e.target.parentNode.querySelector(".error-message").innerHTML = "Email must be in the correct format"
    }
})
registerForm.password.addEventListener("blur", e => {
    let regex = /^(?=.*[A-Za-z])(?=.*[0-9]).{6,}$/
    if (regex.test(e.target.value)) {
        e.target.parentNode.querySelector(".error-message").innerHTML = "*"
    } else {
        e.target.parentNode.querySelector(".error-message").innerHTML = "The password must contain letters, numbers, and be at least 6 characters long."
    }
})
registerForm.confirmedPassword.addEventListener("blur", e => {
    if (e.target.value === registerForm.password.value) {
        e.target.parentNode.querySelector(".error-message").innerHTML = "*"
    } else {
        e.target.parentNode.querySelector(".error-message").innerHTML = "Re-entered password must match the password"
    }
})

function register(user) {
    let users = JSON.parse(localStorage.getItem("users")) || []
    users.push(user)
    localStorage.setItem("users", JSON.stringify(users))
}

function login(user) {
    localStorage.setItem("currentUser", JSON.stringify(user))
}

function showAccount() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser")) || null
    if (currentUser) {
        document.querySelector(".account").innerHTML = `
            <a class="nav-link p-0 dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" href="#">
                <span class="me-2"><i class="fa-solid fa-user text-primary"></i></span>
                ${currentUser.firstName + " " + currentUser.lastName}
            </a>
            <div class="dropdown-menu p-0">
                <div class="px-3 py-2">
                    <a href="#" class="sign-out text-black text-decoration-none text-center">Sign out</a>
                </div>
            </div>
        `
    } else {
        document.querySelector(".account").innerHTML = `
            <a class="nav-link p-0 dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"
                href="#">
                <span class="me-2"><i class="fa-solid fa-user text-primary"></i></span>
                Sign In
            </a>
            <div class="dropdown-menu p-0">
                <div class="sign-in border border-primary px-4 pt-5 pb-3 bg-light text-black"
                    style="min-width: 350px;">
                    <div class="d-flex justify-content-between">
                        <h3>Sign in</h3>
                        <a href="#" class="text-primary">Create an Account</a>
                    </div>
                    <form id="loginForm" class="mb-3">
                        <div class="mb-3">
                            <label for="username" class="form-label">Username or email <span
                                    class="text-danger">*</span></label>
                            <input class="form-control text-black" type="text" id="username"
                                placeholder="Username">
                        </div>
                        <div class="mb-3">
                            <label for="password" class="form-label">Password <span
                                    class="text-danger">*</span></label>
                            <input class="form-control text-black" type="text" id="password"
                                placeholder="Password">
                        </div>
                        <div class="d-grid">
                            <button class="btn btn-primary fw-bold text-uppercase">
                                Login
                                <span class="fa-stack sm-text ms-1" style="margin-bottom: 1px;">
                                    <i class="fas fa-circle fa-stack-2x text-black"></i>
                                    <i class="fas fa-play fa-stack-1x text-primary"></i>
                                </span>
                            </button>
                        </div>
                    </form>
                    <div class="text-end">
                        <p class="text-primary">Lost your password?</p>
                    </div>
                </div>
            </div>
        `
    }
}

registerForm.addEventListener("submit", e => {
    e.preventDefault();
    const isValid = validateForm();
    if (isValid) {
        const firstName = registerForm.firstName.value;
        const lastName = registerForm.lastName.value;
        const gender = registerForm.gender.value;
        const dob = registerForm.dob.value;
        const email = registerForm.email.value;
        const password = registerForm.password.value;
        const user = { firstName, lastName, gender, dob, email, password }

        register(user)

        login(user)

        showAccount();
    }
});

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

document.addEventListener("DOMContentLoaded", () => {
    showAccount()
    const signOutButton = document.querySelector(".sign-out");
    if (signOutButton) {
        signOutButton.addEventListener("click", e => {
            console.log("hello mate")
            localStorage.removeItem("currentUser")
            showAccount()
        });
    } else {
        console.log("hello buddy")
    }
    const loginForm = document.querySelector("#loginForm")
    console.log(loginForm)
    loginForm.addEventListener("submit", e => {
        e.preventDefault();
    })
});
