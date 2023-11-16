document.addEventListener('DOMContentLoaded', () => {
    const textForm = document.getElementById('textForm');
    const outputText = document.getElementById('outputText');
    const outputChat = document.getElementById('outputChat');
    const historyList = document.getElementById('historyList');
    
    textForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = new FormData(textForm);
        const text = formData.get('text');
        
        
        const response = await fetch('/reverse', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({ text }),
        });

        const data = await response.json();
        outputText.textContent = data.reversedText;
        
        // ChatGPT Response
        const chatResponse = await fetch('/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({ text }),
        });
        const chatData = await chatResponse.json();
        outputChat.textContent = `ChatGPT: ${chatData.chatGPTResponse}`;
       

        // Fetch and update history
        console.log(" call update")
        updateHistory();
    });

   /*  async function updateHistory() {
        const response = await fetch('/history');
        const historyData = await response.json();

        // Clear previous history
        historyList.innerHTML = '';

        // Add new history items
        historyData.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `Input: ${item.input}, Output: ${item.output}`;
            historyList.appendChild(li);
        });
    } */

    async function updateHistory() {
        try {
            console.log("update")
            const response = await fetch('/history');
            const historyData = await response.json();
            
            const historyList = document.getElementById('historyList');
            historyList.innerHTML = ''; // Clear previous history
    
            historyData.forEach(item => {
                const li = document.createElement('li');
                li.textContent = `Input: ${item.input}, Output: ${item.output}`;
                historyList.appendChild(li);
            });
        } catch (error) {
            console.error('Error updating history:', error);
        }
    }
    

    // Initial history load
    updateHistory();
});
