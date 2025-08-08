document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
        const contactForm = document.getElementById('contact-form');
        const sendButton = document.getElementById('send-button');
        const formMessage = document.getElementById('form-message');

        if (!contactForm || !sendButton || !formMessage) {
            console.error('One or more form elements not found');
            return;
        }

        emailjs.init("oNpNMILr_rMsCUS4A");

        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            sendButton.disabled = true;
            sendButton.textContent = 'Sending...';
            formMessage.textContent = '';
            formMessage.className = 'form-message';

            emailjs.sendForm('service_rh3qfnu', 'template_f1gkh96', this)
                .then(function(response) {
                    console.log('SUCCESS!', response.status, response.text);
                    formMessage.textContent = 'Message sent successfully!';
                    formMessage.className = 'form-message success';
                    contactForm.reset();
                }, function(error) {
                    console.error('FAILED...', error);
                    formMessage.textContent = 'Failed to send message. Please try again later.';
                    formMessage.className = 'form-message error';
                })
                .finally(() => {
                    sendButton.disabled = false;
                    sendButton.textContent = 'Send Message';
                    
                    setTimeout(() => {
                        formMessage.textContent = '';
                        formMessage.className = 'form-message';
                    }, 5000);
                });
        });
    }, 1000); 
});
