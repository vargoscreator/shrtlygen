document.querySelector('.form-forgot').addEventListener('click', function() {
    document.querySelectorAll('.userlogin-step').forEach(element => {
        element.classList.remove('active');
    });
    document.querySelector('.userlogin-recover').classList.add('active');
});
document.querySelector('.form-back-login').addEventListener('click', function() {
    document.querySelectorAll('.userlogin-step').forEach(element => {
        element.classList.remove('active');
    });
    document.querySelector('.userlogin-content').classList.add('active');
});



document.addEventListener('DOMContentLoaded', () => {
    const steps = document.querySelectorAll('.userlogin-step');
    const forgotButton = document.querySelector('.form-forgot');
    const formButtonLink = document.querySelector('.form-btn-link');
    const emailSpan = document.querySelector('.userlogin-recover-sent-descr span');

    forgotButton.addEventListener('click', () => {
        steps[0].classList.remove('active');
        steps[1].classList.add('active');
    });

    formButtonLink.addEventListener('click', (e) => {
        e.preventDefault();
        const currentStep = formButtonLink.closest('.userlogin-step');
        const emailInput = currentStep.querySelector('input[type="email"]');
        let isValid = true;

        if (!emailInput.value.trim()) {
            isValid = false;
            emailInput.style.borderColor = 'red';
        } else {
            emailInput.style.borderColor = '';
        }

        if (isValid && currentStep === steps[1]) {
            emailSpan.textContent = emailInput.value;
            
            steps[1].classList.remove('active');
            steps[2].classList.add('active');
        }
    });

    const cancelButton = document.querySelector('.form-back-login');
    if (cancelButton) {
        cancelButton.addEventListener('click', () => {
            steps[1].classList.remove('active');
            steps[0].classList.add('active');
        });
    }
});