document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('rsvpForm');
    const successMsg = form.querySelector('.success-msg');
    const submitBtn = form.querySelector('.submit-btn');

    // Mobile number validation pattern
    const mobilePattern = /^[\d-]{10,15}$/;

    // Simple validation function
    function validateField(field) {
        const errorMsg = field.parentElement.querySelector('.error-msg');
        
        if (field.required && !field.value.trim()) {
            errorMsg.textContent = 'This field is required';
            return false;
        }

        if (field.id === 'mobile' && !mobilePattern.test(field.value)) {
            errorMsg.textContent = 'Please enter a valid mobile number (e.g. 123-456-7890)';
            return false;
        }
        
        if (field.id === 'persons' && !field.value) {
            errorMsg.textContent = 'Please select number of persons';
            return false;
        }

        errorMsg.textContent = '';
        return true;
    }

    // Validate on blur
    form.querySelectorAll('input, select').forEach(field => {
        field.addEventListener('blur', () => validateField(field));
    });

    // Form submission
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Validate all fields
        let isValid = true;
        form.querySelectorAll('[required]').forEach(field => {
            if (!validateField(field)) isValid = false;
        });

        if (!isValid) return;

        // Disable button during submission
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Sending...';

        try {
            // Collect and save form data
            const formData = {
                id: Date.now().toString(),
                name: form.querySelector('#name').value,
                mobile: form.querySelector('#mobile').value,
                city: form.querySelector('#city').value,
                attending: form.querySelector('#attending').value,
                persons: form.querySelector('#persons').value,
                timestamp: new Date().toISOString()
            };
            
            // Save to localStorage
            const existingData = localStorage.getItem('wedding_guests');
            const guests = existingData ? JSON.parse(existingData) : [];
            guests.push(formData);
            localStorage.setItem('wedding_guests', JSON.stringify(guests));
            
            // Simulate form submission
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Show success message
            successMsg.style.display = 'flex';
            form.reset();
            
            // Hide success message after 3 seconds
            setTimeout(() => {
                successMsg.style.display = 'none';
            }, 3000);
        } catch (error) {
            alert('There was an error submitting your RSVP. Please try again.');
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send RSVP';
        }
    });

    // Mobile number formatting
    const mobileInput = document.getElementById('mobile');
    mobileInput.addEventListener('input', function() {
        // Remove all non-digit characters
        let numbers = this.value.replace(/\D/g, '');
        
        // Format as 123-456-7890
        if (numbers.length > 3 && numbers.length <= 6) {
            this.value = `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
        } else if (numbers.length > 6) {
            this.value = `${numbers.slice(0, 3)}-${numbers.slice(3, 6)}-${numbers.slice(6, 10)}`;
        }
    });
});
