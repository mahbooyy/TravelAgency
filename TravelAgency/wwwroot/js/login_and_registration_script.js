﻿document.addEventListener('DOMContentLoaded', function () {
    function hiddenOpen_Closelick() {
        let x = document.querySelector(".container-login-registration");
        if (x.style.display == "none") {
            x.style.display = "grid";
        }
        else {
            x.style.display = "none";
        }
    }
    document.getElementById("click-to-hide").addEventListener("click", hiddenOpen_Closelick);
    document.querySelector(".overlay").addEventListener("click", hiddenOpen_Closelick)
});

const signInBtn = document.querySelector('.signin-btn');
const signUpBtn = document.querySelector('.signup-btn');
const formBox = document.querySelector('.form-box');
const block = document.querySelector('.block');

if (signInBtn && signUpBtn) {
    signUpBtn.addEventListener('click', function () {
        formBox.classList.add('active');
        block.classList.add('active');
    });

    signInBtn.addEventListener('click', function () {
        formBox.classList.remove('active');
        block.classList.remove('active');
    });
}
const errorContainer = document.getElementById('error-messages-signin');
const form_btn_signin = document.querySelector('.form_btn_signin');
const form_btn_signup = document.querySelector('.form_btn_signup');

if (form_btn_signin) {
    form_btn_signin.addEventListener('click', function () {
        const requestURL = '/Home/Login';

        const errorContainer = document.getElementById('error-messages-signin');

        const form = {
            email: document.querySelector("#signin_email input"),
            password: document.querySelector("#signin_password input")
        }

        const body = {
            email: form.email.value,
            password: form.password.value
        }

        sendRequest('Post', requestURL, body)
            .then(data => {
                cleaningAndClosingForm(form, errorContainer);
                console.log('Успешный ответ', data);
                location.reload()
            })
            .catch(err => {
                displayErrors(err, errorContainer);
                console.log(err);
            });
    });
}

function SendRequest(method, url, body = null) {
    const headers = {
        'Content-Type': 'application/json'
    }
    return fetch(url, {
        method: method,
        body: JSON.stringify(body),
        headers: headers
    }).then(response => {
        if (!response.ok) {
            return response.json().then(errorData => {
                throw errorData; //ошибки для обработки в catch
            });
        }
        return response.json();
    });
}
function displayErrors(errors, errorContainer) {
    errorContainer.innerHTML = '';//Очистка пред ошибок
    errors.forEach(error => {
        const errorMessage = document.createElement('div');
        errorMessage.classList.add('error');
        errorMessage.textContent = error;
        errorContainer.appendChild(errorMessage);
    });
}

function cleaningAndClosingForm(form, errorContainer) {
    errorContainer.innerHTML = '';
    for (const key in form) {
        if (form.hasOwnProperty(key)) {
            form[key].value = '';
        }
    }
    hiddenOpen_CloseClick();
}

if (form_btn_signup) {
    form_btn_signup.addEventListener('click', function () {
        const requestURL = '/Home/Register';

        const errorContainer = document.getElementById('error-messages-signup');

        const form = {
            login: document.querySelector("#signup_login input"),
            email: document.querySelector("#signup_email input"),
            password: document.querySelector("#signup_password input"),
            passwordConfirm: document.querySelector("#signup_confirm_password input")
        }

        const body = {
            login: form.login.value,
            email: form.email.value,
            password: form.password.value,
            passwordConfirm: form.passwordConfirm.value
        }
        sendRequest('Post', requestURL, body)
            .then(data => {
                cleaningAndClosingForm(form, errorContainer);
                console.log('Успешный ответ', data);
            })
            .catch(err => {
                displayErrors(err, errorContainer);
                console.log(err);
            });
    });
}
