// Toggle password visibility with animation
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

setupPasswordToggle('toggleNewPassword', 'new_password');
setupPasswordToggle('toggleConfirmPassword', 'confirm_password');

// Password strength checker
document.getElementById('new_password').addEventListener('input', function() {
    const password = this.value;
    const strengthBar = document.getElementById('strengthBar');
    const hints = {
        length: document.getElementById('lengthHint'),
        uppercase: document.getElementById('uppercaseHint'),
        number: document.getElementById('numberHint'),
        special: document.getElementById('specialHint')
    };
    
    // Reset all hints
    Object.values(hints).forEach(hint => {
        hint.className = 'fas fa-circle hint-icon';
    });
    
    let strength = 0;
    let totalCriteria = 0;
    
    // Check length
    if (password.length >= 8) {
        strength += 25;
        hints.length.classList.add('hint-valid');
        totalCriteria++;
    }
    
    // Check uppercase letters
    if (/[A-Z]/.test(password)) {
        strength += 25;
        hints.uppercase.classList.add('hint-valid');
        totalCriteria++;
    }
    
    // Check numbers
    if (/\d/.test(password)) {
        strength += 25;
        hints.number.classList.add('hint-valid');
        totalCriteria++;
    }
    
    // Check special characters
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        strength += 25;
        hints.special.classList.add('hint-valid');
        totalCriteria++;
    }
    
    // Update strength bar
    strengthBar.style.width = strength + '%';
    
    // Update strength bar color
    if (strength < 50) {
        strengthBar.style.backgroundColor = var(--error);
    } else if (strength < 75) {
        strengthBar.style.backgroundColor = var(--warning);
    } else {
        strengthBar.style.backgroundColor = var(--success);
    }
    
    // Enable/disable submit button based on criteria
    const submitBtn = document.getElementById('submitBtn');
    submitBtn.disabled = totalCriteria < 3 || password.length < 8;
});

// Confirm password match checker
document.getElementById('confirm_password').addEventListener('input', function() {
    const password = document.getElementById('new_password').value;
    const confirmPassword = this.value;
    const matchHint = document.getElementById('matchHint');
    
    if (confirmPassword.length > 0) {
        matchHint.style.display = 'flex';
        
        if (password === confirmPassword) {
            matchHint.innerHTML = '<i class="fas fa-check-circle hint-icon hint-valid"></i><span>Passwords match</span>';
        } else {
            matchHint.innerHTML = '<i class="fas fa-times-circle hint-icon" style="color: var(--error);"></i><span>Passwords do not match</span>';
        }
    } else {
        matchHint.style.display = 'none';
    }
});

// Form validation with toast notifications
document.getElementById('passwordResetForm').addEventListener('submit', function(e) {
    const password = document.getElementById('new_password').value;
    const confirmPassword = document.getElementById('confirm_password').value;
    
    if (password !== confirmPassword) {
        e.preventDefault();
        showToast('Passwords do not match!', 'error');
        return false;
    }
    
    if (password.length < 8) {
        e.preventDefault();
        showToast('Password must be at least 8 characters long!', 'error');
        return false;
    }
    
    // Check password strength
    const strength = calculatePasswordStrength(password);
    if (strength < 50) {
        e.preventDefault();
        showToast('Please choose a stronger password!', 'error');
        return false;
    }
    
    return true;
});

// Function to calculate password strength
function calculatePasswordStrength(password) {
    let strength = 0;
    
    // Length contributes up to 40%
    strength += Math.min(40, (password.length / 12) * 40);
    
    // Character variety contributes up to 60%
    let varietyScore = 0;
    if (/[A-Z]/.test(password)) varietyScore += 10;
    if (/[a-z]/.test(password)) varietyScore += 10;
    if (/\d/.test(password)) varietyScore += 10;
    if (/[^A-Za-z0-9]/.test(password)) varietyScore += 10;
    
    // Additional points for multiple character types
    const charTypes = [/[A-Z]/, /[a-z]/, /\d/, /[^A-Za-z0-9]/].filter(re => re.test(password)).length;
    varietyScore += (charTypes - 1) * 5;
    
    strength += Math.min(60, varietyScore);
    
    return Math.min(100, strength);
}

// Function to show toast notification
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toast-message');
    
    toast.className = 'toast';
    toast.classList.add(type);
    toastMessage.textContent = message;
    
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            toast.className = 'toast';
        }, 300);
    }, 3000);
}

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
        }, 600);
    });
});