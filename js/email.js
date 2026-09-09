const form = document.getElementById('contact-form');
const messageDiv = document.getElementById('form-message');
const submitButton = document.getElementById('submit-button');

// Handle form submission
form.addEventListener('submit', function(event) {
        
    // Stop page reload
    event.preventDefault();
    event.stopPropagation();
        
    // Show loading state
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';
        
    // Get form data
    const formData = new FormData(form);
        
    // Send AJAX request
    fetch('send-mail.php', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        return response.json();
    })
    .then(data => {
            
        // Show message
            
            if (data.success) {
                messageDiv.style.backgroundColor = '#d4edda';
                messageDiv.style.color = '#155724';
                messageDiv.style.border = '1px solid #c3e6cb';
                messageDiv.textContent = data.message;
                form.reset(); // Clear form
            } else {
                messageDiv.style.backgroundColor = '#f8d7da';
                messageDiv.style.color = '#721c24';
                messageDiv.style.border = '1px solid #f5c6cb';
                messageDiv.textContent = data.message;
            }
            
        submitButton.disabled = false;
        submitButton.textContent = 'Submit';
    })
    .catch(error => {
        messageDiv.style.backgroundColor = '#f8d7da';
        messageDiv.style.color = '#721c24';
        messageDiv.style.border = '1px solid #f5c6cb';
        messageDiv.textContent = 'An error occurred. Please try again.';
            
        submitButton.disabled = false;
        submitButton.textContent = 'Submit';
    });
});