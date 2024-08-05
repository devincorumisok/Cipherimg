// script.js

// Encrypt Message Spot
const messageInput = document.getElementById('message-input');
const saveMessageButton = document.getElementById('save-message');
const restartMessageButton = document.getElementById('restart-message');
const imageUpload = document.getElementById('image-upload');
const embedMessageButton = document.getElementById('embed-message');
const downloadImageLink = document.getElementById('download-image');

let message = '';

// Save the message
saveMessageButton.addEventListener('click', () => {
    message = messageInput.value;
    if (message.trim() === '') {
        alert('Please enter a message!');
        return;
    }
    alert('Message saved!');
});

// Restart the message
restartMessageButton.addEventListener('click', () => {
    message = '';
    messageInput.value = '';
    alert('Message cleared!');
});

// Embed the message into the image
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
                if (i * 4 >= data.length) break; // Ensure we don't go out of bounds
                data[i * 4] = message.charCodeAt(i); // Store message character in the red channel
            }
            ctx.putImageData(imageData, 0, 0);

            const newImageUrl = canvas.toDataURL('image/png');
            downloadImageLink.href = newImageUrl;
            downloadImageLink.style.display = 'block';
            downloadImageLink.innerHTML = 'Download Image';
        };
        img.onerror = function () {
            alert('Error loading image!');
        };
        img.src = e.target.result;
    };
    reader.onerror = function () {
        alert('Error reading file!');
    };
    reader.readAsDataURL(file);
});

// Decipher Message Spot
const imageUploadDecipher = document.getElementById('image-upload-decipher');
const decipherMessageButton = document.getElementById('decipher-message');
const decipheredMessageTextArea = document.getElementById('deciphered-message');

// Decode message from the image
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

            try {
                // Decode message
                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                const data = imageData.data;
                let message = '';
                for (let i = 0; i < data.length / 4; i++) {
                    const charCode = data[i * 4];
                    if (charCode > 0 && charCode < 128) { // Only consider printable ASCII characters
                        message += String.fromCharCode(charCode);
                    } else {
                        break; // Stop if we hit non-printable or zero character
                    }
                }
                decipheredMessageTextArea.value = message || 'No message found';
            } catch (error) {
                alert('Error decoding the message: ' + error.message);
            }
        };
        img.onerror = function () {
            alert('Error loading image!');
        };
        img.src = e.target.result;
    };
    reader.onerror = function () {
        alert('Error reading file!');
    };
    reader.readAsDataURL(file);
});