const express = require('express');
const bodyParser = require('body-parser');
const { getChatGPTResponse } = require('./chatgpt'); // Import the ChatGPT functionality


const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

let history = [];

app.post('/reverse', (req, res) => {
    const inputText = req.body.text;
    const reversedText = inputText.split('').reverse().join('');

    history.push({ input: inputText, output: reversedText });

    res.json({ reversedText });
});


app.post('/chat', async (req, res) => {
    const inputText = req.body.text;

    const chatGPTResponse = await getChatGPTResponse(inputText);
    //console.log(chatGPTResponse);
    history.push({ input: inputText, output: chatGPTResponse });

    res.json({ chatGPTResponse });
});



app.get('/history', (req, res) => {
    res.json(history);
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
