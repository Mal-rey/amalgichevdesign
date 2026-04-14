/* -------------------------------------------- */
/* Contact Form Validation */

// Get contact form, the subject, email and message input areas and their respective error spans.
const contactForm = document.getElementById('contactsFormDiv');
const subject = document.getElementById('subject');
const email = document.getElementById('email');
const message = document.getElementById('message');
const formSubjectErrorSpan = document.getElementById('contactFormInput_NoSubjectValueError');
const formEmailErrorSpan = document.getElementById('contactFormInput_NoEmailValueError');
const formMessageErrorSpan = document.getElementById('contactFormInput_NoMessageValueError')

// Remove HTML validators (since if this JavaScript file loads, it will validate over this)
contactForm.noValidate = true;

// Remove CSS classes that would be used alongside the HTML validators'
contactForm.classList.remove('validate');

// If any of the input is wrong, run this.
const showError = (input, errorMessage) => {
    switch(input.id) {
        case 'subject':
            formSubjectErrorSpan.classList.remove('verifiedClass');
            formSubjectErrorSpan.innerText = errorMessage;
            formSubjectErrorSpan.classList.add('errorClass');
            subject.classList.add('error');
            break;
        case 'email':
            formEmailErrorSpan.classList.remove('verifiedClass');
            formEmailErrorSpan.innerText = errorMessage;
            formEmailErrorSpan.classList.add('errorClass');
            email.classList.add('error');
            break;
        case 'message':
            formEmailErrorSpan.classList.remove('verifiedClass');
            formMessageErrorSpan.innerText = errorMessage;
            formMessageErrorSpan.classList.add('errorClass');
            message.classList.add('error');
            break;
    }
}


// If all input fields match, run this.
const showWentThrough = (input, successMessage) => {
    switch(input.id) {
        case 'subject':
            subject.classList.remove('error');
            formSubjectErrorSpan.classList.remove('errorClass');
            formSubjectErrorSpan.innerText = successMessage;
            formSubjectErrorSpan.classList.add('verifiedClass');
            break;
        case 'email':
            email.classList.remove('error');
            formEmailErrorSpan.classList.remove('errorClass');
            formEmailErrorSpan.innerText = successMessage;
            formEmailErrorSpan.classList.add('verifiedClass');
            break;
        case 'message':
            message.classList.remove('error');
            formEmailErrorSpan.classList.remove('errorClass');
            formMessageErrorSpan.innerText = successMessage;
            formMessageErrorSpan.classList.add('verifiedClass');
            break;
    }
}


// Check if the email is valid.
const isEmailValid = (input) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (re.test(input.value.trim())) {
        showWentThrough(input, 'This email is valid!');
    } else {
        showError(input, 'This must be a valid email.');
    }
}

// Check all fields
const checkAllFields = (fieldArr) => {
    fieldArr.forEach((input) => {
        if (input.value.trim() === '') {
            showError(input, `This must be a valid ${(input.id)}.`);
        } else {
            showWentThrough(input, `This ${(input.id)} is valid!`);
        }
    })
}

// Checks if all the fields have been checked off as valid before sending
const areAllFieldsValidToSend = async () => {
    if (formSubjectErrorSpan.classList.contains('verifiedClass') &&
        formEmailErrorSpan.classList.contains('verifiedClass') &&
        formMessageErrorSpan.classList.contains('verifiedClass')) {

            formSubjectErrorSpan.classList.remove('verifiedClass');
            formEmailErrorSpan.classList.remove('verifiedClass');
            formMessageErrorSpan.innerText = '';


            try {

                const formData = {
                    Subject: subject.value,
                    Email: email.value,
                    Message: message.value
                };

                
                const res = await fetch('https://amalgichevdesign.onrender.com/email', {
                    method: 'POST',
                    body: JSON.stringify(formData),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                const data = await res.json();
                
                if (res.ok) {
                    formMessageErrorSpan.classList.remove('errorClass');
                    formMessageErrorSpan.classList.add('verifiedClass');
                    formMessageErrorSpan.innerText = data.message;
                } else {
                    formMessageErrorSpan.classList.remove('verifiedClass');
                    formMessageErrorSpan.classList.add('errorClass');
                    formMessageErrorSpan.innerText = data.message;
                }
            } catch (err) { 
                formMessageErrorSpan.classList.remove('verifiedClass');
                formMessageErrorSpan.classList.add('errorClass');
                formMessageErrorSpan.innerText = 'Error Sending, Try Again!';
            }
    }
}
      

// See if the form has been submitted.
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    formMessageErrorSpan.classList.remove('verifiedClass');

    checkAllFields([subject, email, message]);
    isEmailValid(email);
    areAllFieldsValidToSend();
})