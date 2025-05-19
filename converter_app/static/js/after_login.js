// Enhanced logout functionality with ripple effect
document.getElementById('logout-btn').addEventListener('click', function(e) {
    if (!confirm('Are you sure you want to logout?')) {
        e.preventDefault();
    } else {
        // Add ripple effect
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
    }
});

// Quick actions buttons with ripple effect
document.querySelectorAll('.action-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        const action = this.querySelector('span').textContent;
        
        // Add ripple effect
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
        
        showToast(`${action} action would be performed here`, 'warning');
    });
});

// Upgrade storage button
document.getElementById('upgrade-storage').addEventListener('click', function(e) {
    showToast('Storage upgrade options would be shown here', 'warning');
});

// Animate storage progress bar on page load
document.addEventListener('DOMContentLoaded', () => {
    const progressBar = document.querySelector('.storage-progress');
    setTimeout(() => {
        progressBar.style.width = '30%';
    }, 500);
});

// Make sidebar sections collapsible
document.querySelectorAll('.sidebar-section h3').forEach(header => {
    header.addEventListener('click', function() {
        const content = this.nextElementSibling;
        if (content.style.maxHeight) {
            content.style.maxHeight = null;
            content.style.opacity = '1';
        } else {
            content.style.maxHeight = content.scrollHeight + 'px';
            content.style.opacity = '0.9';
        }
    });
});