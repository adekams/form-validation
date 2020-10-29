const signupForm = document.getElementById('signupForm')
const loginForm = document.getElementById('loginForm')
const email = document.getElementById('email')
const loginEmail = document.getElementById('loginEmail')
const password = document.getElementById('password')
const password1 = document.getElementById('password1')
const confirmPassword = document.getElementById('password2')
const firstName = document.getElementById('firstname')
const lastName = document.getElementById('lastname')

const error = document.getElementsByName('small')


signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let isFirstnameValid = checkFirstname();
    let isLastnameValid = checkLastname();
    let isEmailValid = checkEmail();
    let isPasswordValid = checkPassword();
    let isConfirmPasswordValid = checkConfirmPassword();

    let isSignupFormValid = isFirstnameValid && isLastnameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid
    
    
    // if(isSignupFormValid) {
    //     showLoader()
    // }
});


// disable button until all input fields are filled
const buttonState= () => {
    let d  = document, [inputs, btn] = [
        d.querySelectorAll('input'),
        d.querySelector('.btn')
    ]
    btn.disabled = true
    btn.classList.toggle('bg-grey')

    for (i=0; i < inputs.length; i++) {
        inputs[i].addEventListener('input', () => {
            let values = []
            inputs.forEach(input => values.push(input.value))
            btn.disabled = values.includes('')
        })

    }

}
buttonState()


const isRequired = value =>  value === '' ? false : true;

// const isBetween = (length, min, max) => length < min || length > max ? false : true;

//email is valid
const isValidEmail = email => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}


//names must not contain numbers
const isName = name => {
    const re = /^([^0-9]*)$/
    return re.test(name)
}

// password contains atleast 1 from a-z, A-Z, number and special character 
const isPasswordSecure = password => {
    const re = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    return re.test(password)
}

const showError = (input, output) => {
    const formField = input.parentElement;
    const formInput = input
    formInput.classList.remove('success');
    formInput.classList.add('error');

    const error = formField.querySelector('small')
    error.textContent = output;
}

const showSuccess = input => {
    const formField = input.parentElement;
    const formInput = input
    formInput.classList.remove('error');
    formInput.classList.add('success');

    const error = formField.querySelector('small')
    error.textContent = '';
}

const checkFirstname = () => {
    let valid = false;
    const name = firstName.value.trim()
    if (!isRequired(name)) {
        showError(firstName, 'First Name cannot be blank.');
    }
    else if (!isName(name)) {
        showError(firstName, 'First name may contain any characters except number')
    }
    else {
        showSuccess(firstName);
        valid = true;
    }
    return valid
}

const checkLastname = () => {
    let valid = false;
    const name = lastName.value.trim()
    if (!isRequired(name)) {
        showError(lastName, 'Last Name cannot be blank.');
    }
    else if (!isName(name)) {
        showError(lastName, 'Last name may contain any characters except number')
    }
    else {
        showSuccess(lastName);
        valid = true;
    }
    return valid
}

const checkEmail = () => {
    let valid = false;
    const mail = email.value.trim()
    if (!isRequired(mail)) {
        showError(email, 'Email cannot be blank.');
    }
    else if (!isValidEmail(mail)) {
        showError(email, 'Please provide a valid email')
    }
    else {
        showSuccess(email);
        valid = true;
    }
    return valid
}

const checkPassword = () => {
    let valid = false;
    const password = password1.value.trim()
    if (!isRequired(password)) {
        showError(password1, 'Password cannot be blank.');
    }
    else if (!isPasswordSecure(password)) {
        showError(password1, 'Password must have at least 8 characters, containing atleast 1 character from a-z, A-Z, 0-9 or !@#$%^&*')
    }
    else {
        showSuccess(password1);
        valid = true;
    }
    return valid
}

const checkConfirmPassword = () => {
    let valid = false;
    const password = password1.value.trim();
    const password2 = confirmPassword.value.trim();

    if (!isRequired(password2)) {
        showError(confirmPassword, 'Confirm password cannot be blank.');
    }
    else if (password !== password2) {
        showError(confirmPassword, 'Confirm password does not match password')
    }
    else {
        showSuccess(confirmPassword);
        valid = true;
    }
    return valid
}

//stimulate loader for 2 sec
const showLoader = () => {
    let loader = document.getElementById('loader')
    let btn = document.getElementById('signup-btn')

    btn.addEventListener('click', () => {
        show = function() {
        btn.style.display= 'none'
        loader.style.display = 'block';
        
        setTimeout(hide, 2000);
    };
    hide = function() {
        loader.style.display = 'none';
        btn.style.display = 'block';
    }
    })
    
};

