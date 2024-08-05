// script.js

// Encrypt Message Spot
const messageInput = document.getElementById('message-input');
const saveMessageButton = document.getElementById('save-message');
const restartMessageButton = document.getElementById('restart-message');
const imageUpload = document.getElementById('image-upload');
const embedMessageButton = document.getElementById('embed-message');
const downloadImageLink = document.getElementById('download-image');

// Store message
let message = '';

saveMessageButton.addEventListener('click', () => {
    message = messageInput.value;
    alert('Message saved!');
});

restartMessageButton.addEventListener('click', () => {
    message = '';
    messageInput.value = '';
    alert('Message cleared!');
});

embedMessageButton.addEventListener('click', () => {
    if (message === '') {
        alert('Please save a message first!');
        return;
    }

    const file = imageUpload.files[0];
    if (!file) {
        alert('Please upload an image!');
        return;
    }

    const reader = new FileReader();
    reader.onload = function (e) {
        const img = new Image();
        img.onload = function () {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            ctx.font = '20px Arial';
            ctx.fillStyle = 'white';
            ctx.fillText(message, 10, 30); // Position text on image

            const newImageUrl = canvas.toDataURL('image/png');
            downloadImageLink.href = newImageUrl;
            downloadImageLink.style.display = 'block';
            downloadImageLink.innerHTML = 'Download Image';
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
});

// Decipher Message Spot
const imageUploadDecipher = document.getElementById('image-upload-decipher');
const decipherMessageButton = document.getElementById('decipher-message');
const decipheredMessageTextArea = document.getElementById('deciphered-message');

decipherMessageButton.addEventListener('click', () => {
    const file = imageUploadDecipher.files[0];
    if (!file) {
        alert('Please upload an image!');
        return;
    }

    const reader = new FileReader();
    reader.onload = function (e) {
        const img = new Image();
        img.onload = function () {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            
            // For simplicity, the message extraction part is skipped. In a real application,
            // you would need a more sophisticated method to detect and extract the hidden message.
            // This is just a placeholder to demonstrate the process.
            decipheredMessageTextArea.value = 'Message extraction not implemented.';
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
});