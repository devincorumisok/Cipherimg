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

            // Encode message
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imageData.data;
            for (let i = 0; i < message.length; i++) {
                data[i * 4] = message.charCodeAt(i); // Encode message character as pixel value
            }
            ctx.putImageData(imageData, 0, 0);

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

            // Decode message
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imageData.data;
            let message = '';
            for (let i = 0; i < data.length / 4; i++) {
                const charCode = data[i * 4];
                if (charCode !== 0) {
                    message += String.fromCharCode(charCode);
                }
            }
            decipheredMessageTextArea.value = message || 'No message found';
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
});