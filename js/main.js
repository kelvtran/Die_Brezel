// Infinite carousel functionality
const carousel = document.querySelector(".carousel-container");

// Get the original carousel items
const originalItems = Array.from(
    carousel.querySelectorAll(".carousel-item-custom")
);

// Clone the items
const firstClones = originalItems.map(item => item.cloneNode(true));
const lastClones = originalItems.map(item => item.cloneNode(true));

// Add clones to the END
firstClones.forEach(clone => {
    carousel.appendChild(clone);
});

// Add clones to the START
lastClones.reverse().forEach(clone => {
    carousel.insertBefore(clone, carousel.firstChild);
});

let isJumping = false;

// Wait for images/layout to load, then start at original images
window.addEventListener("load", () => {
    const originalWidth = getOriginalWidth();

    carousel.scrollLeft = originalWidth;
});

function getOriginalWidth() {
    const items = carousel.querySelectorAll(".carousel-item-custom");

    let width = 0;

    // Calculate width of the first 7 items
    for (let i = 0; i < originalItems.length; i++) {
        width += items[i].offsetWidth;

        const style = getComputedStyle(items[i]);
        width += parseFloat(style.marginLeft);
        width += parseFloat(style.marginRight);
    }

    return width;
}

carousel.addEventListener("scroll", () => {
    if (isJumping) return;

    const originalWidth = getOriginalWidth();

    // If user reaches the cloned section on the left
    if (carousel.scrollLeft < 10) {
        isJumping = true;

        carousel.scrollLeft += originalWidth;

        requestAnimationFrame(() => {
            isJumping = false;
        });
    }

    // If user reaches the cloned section on the right
    else if (carousel.scrollLeft >= originalWidth * 2) {
        isJumping = true;

        carousel.scrollLeft -= originalWidth;

        requestAnimationFrame(() => {
            isJumping = false;
        });
    }
});

const form = document.getElementById('contact-form');
const messageDiv = document.getElementById('form-message');
const submitButton = document.getElementById('submit-button');

// Handle form submission
form.addEventListener('submit', function(event) {
    console.log('🔄 Form submitted - preventing reload');
        
    // Stop page reload
    event.preventDefault();
    event.stopPropagation();
        
    // Show loading state
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';
    messageDiv.style.display = 'none';
        
    // Get form data
    const formData = new FormData(form);
        
    console.log('📤 Sending AJAX request...');
        
    // Send AJAX request
    fetch('send-mail.php', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        console.log('📥 Response received');
        return response.json();
    })
    .then(data => {
        console.log('📨 Data:', data);
            
    // Show message
    messageDiv.style.display = 'block';
            
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
        console.error('❌ Error:', error);
            
        messageDiv.style.display = 'block';
        messageDiv.style.backgroundColor = '#f8d7da';
        messageDiv.style.color = '#721c24';
        messageDiv.style.border = '1px solid #f5c6cb';
        messageDiv.textContent = 'An error occurred. Please try again.';
            
        submitButton.disabled = false;
        submitButton.textContent = 'Submit';
    });
});

