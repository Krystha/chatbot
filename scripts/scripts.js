document.getElementById('send-button').addEventListener('click', sendMessage);

function sendMessage() {
    const userInput = document.getElementById('user-input').value;
    if (userInput.trim() === '') return;

    addMessage('User', userInput);
    document.getElementById('user-input').value = '';

    // Mostrar el indicador de "escribiendo"
    addMessage('Chatbot', 'Escribiendo...');
    
    // Lógica para enviar los datos al servidor
    fetch('http://localhost/chatbot/process_feedback.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: userInput })
    })
    .then(response => response.json())
    .then(data => {
        // Reemplazar el mensaje de "escribiendo" con la respuesta del chatbot
        const lastMessage = document.getElementById('messages').lastChild;
        lastMessage.textContent = 'Chatbot: ' + data.reply;
    })
    .catch(error => {
        console.error('Error:', error);
        const lastMessage = document.getElementById('messages').lastChild;
        lastMessage.textContent = 'Chatbot: Hubo un error al procesar tu mensaje.';
    });
}

function addMessage(sender, text) {
    const messageContainer = document.createElement('div');
    messageContainer.classList.add(sender === 'User' ? 'user-message' : 'chatbot-message');
    messageContainer.textContent = `${sender}: ${text}`;
    document.getElementById('messages').appendChild(messageContainer);
}
