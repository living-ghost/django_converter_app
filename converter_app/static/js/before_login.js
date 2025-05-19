// Enhanced toggle between forms with animations
function toggleForms(hideId, showId) {
    const hideElement = document.getElementById(hideId);
    const showElement = document.getElementById(showId);
    
    hideElement.style.animation = 'fadeIn 0.4s reverse forwards';
    
    setTimeout(() => {
        hideElement.style.display = 'none';
        showElement.style.display = 'block';
        showElement.style.animation = 'fadeIn 0.6s forwards';
    }, 400);
}

document.getElementById('show_register').addEventListener('click', function (e) {
    e.preventDefault();
    toggleForms('login_box', 'register_box');
});

document.getElementById('show_login').addEventListener('click', function (e) {
    e.preventDefault();
    toggleForms('register_box', 'login_box');
});

document.getElementById('show_reset').addEventListener('click', function (e) {
    e.preventDefault();
    toggleForms('login_box', 'reset_box');
});

document.getElementById('show_login_from_reset').addEventListener('click', function (e) {
    e.preventDefault();
    toggleForms('reset_box', 'login_box');
});

// Enhanced password toggle with animation
function setupPasswordToggle(eyeIconId, inputId) {
    const eyeIcon = document.getElementById(eyeIconId);
    const passwordInput = document.getElementById(inputId);
    
    eyeIcon.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        
        // Animate the eye icon
        eyeIcon.style.transform = 'translateY(-50%) scale(1.2)';
        setTimeout(() => {
            eyeIcon.style.transform = 'translateY(-50%) scale(1)';
        }, 200);
        
        // Toggle eye icon
        eyeIcon.classList.toggle('fa-eye');
        eyeIcon.classList.toggle('fa-eye-slash');
    });
}

setupPasswordToggle('toggleLoginPassword', 'login_password');
setupPasswordToggle('toggleRegPassword', 'register_password');
setupPasswordToggle('toggleRegConfirmPassword', 'register_confirm_password');

// Add hover effect to social buttons
const socialButtons = document.querySelectorAll('.social-btn');
socialButtons.forEach(button => {
    button.addEventListener('mouseenter', function() {
        const icon = this.querySelector('i');
        icon.style.transform = 'scale(1.2)';
    });
    
    button.addEventListener('mouseleave', function() {
        const icon = this.querySelector('i');
        icon.style.transform = 'scale(1)';
    });
});

// Add ripple effect to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const ripple = document.createElement('span');
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 1000);
    });
});

// Add focus effects to form inputs
document.querySelectorAll('.form-group input').forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.querySelector('label').style.color = 'var(--primary)';
    });
    
    input.addEventListener('blur', function() {
        if (!this.value) {
            this.parentElement.querySelector('label').style.color = 'var(--dark)';
        }
    });
});