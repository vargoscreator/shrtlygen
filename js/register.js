document.addEventListener('DOMContentLoaded', () => {
    const steps = document.querySelectorAll('.userlogin-step');
    const continueButtons = document.querySelectorAll('.form-btn, .userlogin-confirm-btn');
    const emailDisplay = document.querySelector('.userlogin-confirm-email');
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const codeInputs = document.querySelectorAll('.userlogin-confirm-inputs input[type="tel"]');

    codeInputs.forEach((input, index) => {
        input.addEventListener('input', (e) => {
            if (e.target.value.length > 1) {
                e.target.value = e.target.value.slice(0, 1);
            }            
            if (e.target.value.length === 1 && index < codeInputs.length - 1) {
                codeInputs[index + 1].focus();
            }
        });
        
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Backspace' && input.value === '' && index > 0) {
                codeInputs[index - 1].focus();
            }
        });
        
        input.addEventListener('paste', (e) => {
            e.preventDefault();
            const pasteData = (e.clipboardData || window.clipboardData).getData('text');
            const digits = pasteData.replace(/\D/g, '').split('').slice(0, codeInputs.length);
            
            digits.forEach((digit, i) => {
                if (codeInputs[i]) {
                    codeInputs[i].value = digit;
                }
            });
            const focusIndex = Math.min(digits.length, codeInputs.length - 1);
            codeInputs[focusIndex].focus();
        });
    });

    continueButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();            
            const currentStep = button.closest('.userlogin-step');
            const inputs = currentStep.querySelectorAll('input[required]');
            let isValid = true;
            if (currentStep === steps[0] || currentStep === steps[2]) {
                inputs.forEach(input => {
                    if (input.type === 'email' && input.id === 'registered-email') {
                        if (!input.value.trim() || !emailPattern.test(input.value)) {
                            isValid = false;
                            input.style.borderColor = 'red';
                        } else {
                            input.style.borderColor = '';
                        }
                    } else if (!input.value.trim() && input.type !== 'checkbox') {
                        isValid = false;
                        input.style.borderColor = 'red';
                    } else if (input.type === 'checkbox' && !input.checked) {
                        isValid = false;
                        input.nextElementSibling.style.borderColor = 'red';
                    } else {
                        input.style.borderColor = '';
                        if (input.type === 'checkbox') {
                            input.nextElementSibling.style.borderColor = '';
                        }
                    }
                });
            }

            if (currentStep === steps[1]) {
                const code = Array.from(codeInputs).map(input => input.value).join('');
                if (code !== '123456') {
                    isValid = false;
                    codeInputs.forEach(input => input.style.borderColor = 'red');
                } else {
                    codeInputs.forEach(input => input.style.borderColor = '');
                }
            }
            if (isValid) {
                const currentIndex = Array.from(steps).indexOf(currentStep);
                const nextIndex = currentIndex + 1;

                if (nextIndex < steps.length) {
                    if (currentIndex === 0) {
                        const emailInput = currentStep.querySelector('#registered-email');
                        emailDisplay.textContent = emailInput.value;
                    }
                    currentStep.classList.remove('active');
                    steps[nextIndex].classList.add('active');
                }
            }
        });
    });
});