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

// Email form functionality
document.getElementById('submit-button').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent the default form submission and reload of page

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Get values from the form fields
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const topic = document.getElementById('topic').value;
    const content = document.getElementById('email-content').value;

    // Ensure that all fields are filled
    if (!topic) {
        document.getElementById('topic-error').textContent = 'Please enter a topic.';
        document.getElementById('topic').focus();
        return;
    } else {
        document.getElementById('topic-error').textContent = '';
    }
    if (!name) {
        document.getElementById('name-error').textContent = 'Please enter your name.';
        document.getElementById('name').focus();
        return;
    } else {
        document.getElementById('name-error').textContent = '';
    }
    if (!email) {
        document.getElementById('email-error').textContent = 'Please enter your email address.';
        document.getElementById('email').focus();
        return;
    } else {
        document.getElementById('email-error').textContent = '';
    }
    if (!content) {
        document.getElementById('email-content').placeholder = 'Please enter your message.';
        document.getElementById('email-content').focus();
        document.getElementById('email-content').style = ''
        return;
    } else {
        document.getElementById('email-content').placeholder = '';
    }
    // Validate email format
    if (!emailRegex.test(email)) {
        document.getElementById('email-error').textContent = 'Please enter a valid email address.';
        return;
    } else {
        document.getElementById('email-error').textContent = '';
    }


    // You can now use these values to send an email or perform other actions
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Topic:', topic);
    console.log('Content:', content);


});
