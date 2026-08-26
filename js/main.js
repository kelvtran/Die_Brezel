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
