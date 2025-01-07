function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

document.getElementById('contact-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (name === '' || email === '' || message === '') {
        alert('Please fill out all fields.');
        return;
    }

    if (!validateEmail(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    // Kirim email menggunakan EmailJS dengan template yang sesuai
    const templateParams = {
        to_name: 'bramasetio',
        email: email,
        name: name,
        message: message
    };

    emailjs.send("service_yuzpfnl", "template_7frlw6a", templateParams, "E5IibMRg2oZwbneWj")
    .then(function(response) {
        alert('Message sent successfully!');
        console.log('SUCCESS!', response.status, response.text);
        document.getElementById('contact-form').reset();
    }, function(error) {
        alert('Failed to send message. Please try again later.');
        console.log('FAILED...', error);
    });
});