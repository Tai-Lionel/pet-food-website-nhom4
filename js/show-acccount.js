showAccount()
function showAccount() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser")) || null
    if (currentUser) {
        document.querySelector(".account").innerHTML = `
            <a class="nav-link p-0 dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" href="#">
                <span class="me-2"><i class="fa-solid fa-user text-primary"></i></span>
                ${currentUser.firstName + " " + currentUser.lastName}
            </a>
            <div class="dropdown-menu p-0" style="min-width: 0 !important">
                <div class="py-2 px-3">
                    <a href="#" class="sign-out text-black text-decoration-none text-center">Sign out</a>
                </div>
            </div>
        `
        const signOut = document.querySelector(".sign-out")
        if (signOut) {
            document.querySelector(".sign-out").addEventListener("click", e => {
                document.body.style.cursor = "wait"
                setTimeout(() => {
                    localStorage.removeItem("currentUser")
                    showAccount()
                    flash("success", `Signed out successfully`)
                    document.body.style.cursor = "default"
                }, 2000);
            })
        }
    } else {
        document.querySelector(".account").innerHTML = `
            <a class="nav-link p-0 dropdown-toggle not-sign-in" data-bs-toggle="dropdown" aria-expanded="false"
                href="#">
                <span class="me-2"><i class="fa-solid fa-user text-primary"></i></span>
                Sign In
            </a>
            <div class="dropdown-menu not-sign-in p-0">
                <div class="sign-in border border-primary px-4 pt-5 pb-3 bg-light text-black"
                    style="min-width: 400px;">
                    <div class="d-flex justify-content-between mb-2">
                        <h3>Sign in</h3>
                        <a href="register.html" class="text-primary">Create an Account</a>
                    </div>
                    <div class="authentication-message">
                        <div class="px-3 py-4 bg-danger text-white fw-bold mb-3">
                            Email or password is incorrect
                        </div>
                    </div>
                    <form id="loginForm" class="mb-3">
                        <div class="mb-4">
                            <label for="email" class="form-label">Email<span
                                    class="text-danger">*</span></label>
                            <input class="form-control text-black" type="text" id="email" name="email"
                                placeholder="Email">
                            <small class="error-message"></small>
                        </div>
                        <div class="mb-4">
                            <label for="password" class="form-label">Password <span
                                    class="text-danger">*</span></label>
                            <input class="form-control text-black" type="password" id="password" name="password"
                                placeholder="Password">
                            <small class="error-message"></small>
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
        // click issue
        $(function () {

            $('.navbar-nav-2 .dropdown-toggle.not-sign-in').on('click', function (event) {
                $('navbar-nav-2 .dropdown-menu.not-sign-in').slideToggle();
                event.stopPropagation();
            });

            $('.navbar-nav-2 .dropdown-menu.not-sign-in').on('click', function (event) {
                event.stopPropagation();
            });

            $(window).on('click', function () {
                $('.navbar-nav-2 .dropdown-menu.not-sign-in').slideUp();
            });

        });
        const loginForm = document.querySelector("#loginForm")
        if (loginForm) {
            loginForm.email.addEventListener("blur", e => {
                if (isEmailValid()) {
                    showMessage(e.target, "*")
                } else {
                    showMessage(e.target, "Email must be in the correct format")
                }
            })
            loginForm.password.addEventListener("blur", e => {
                if (isPasswordValid()) {
                    showMessage(e.target, "*")
                } else {
                    showMessage(e.target, "The password must contain letters, numbers and at least 6 characters.")
                }
            })
            loginForm.addEventListener("submit", e => {
                e.preventDefault()
                if (isLoginFormValid()) {
                    const email = loginForm.email.value
                    const password = loginForm.password.value
                    const users = JSON.parse(localStorage.getItem("users")) || []
                    for (let user of users) {
                        if (user.email === email && user.password === password) {
                            document.body.style.cursor = "wait"
                            e.target.style.cusor = "wait"
                            e.target.querySelector("button").style.cursor = "wait"
                            setTimeout(() => {
                                document.querySelector(".authentication-message").style.display = "none"
                                localStorage.setItem("currentUser", JSON.stringify(user))
                                showAccount()
                                flash("success", `Welcome back ${user.firstName} ${user.lastName}`)
                                document.body.style.cursor = "default"
                                e.target.style.cusor = "default"
                                e.target.querySelector("button").style.cursor = "default"
                            }, 3000);
                            return
                        }
                    }
                    document.querySelector(".authentication-message").style.display = "block"
                } else {
                    loginForm.email.dispatchEvent(new Event("blur"))
                    loginForm.password.dispatchEvent(new Event("blur"))
                }
            })

            function isEmailValid() {
                const email = loginForm.email.value;
                let regex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
                return regex.test(email);
            }

            function isPasswordValid() {
                const password = loginForm.password.value;
                let regex = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;
                return regex.test(password);
            }

            function showMessage(field, message) {
                field.parentNode.querySelector(".error-message").innerHTML = message
            }

            function isLoginFormValid() {
                const emailValid = isEmailValid()
                const passwordValid = isPasswordValid()
                return emailValid && passwordValid
            }
        }
    }
}