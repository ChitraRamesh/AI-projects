require('dotenv').config(); // Load variables from .env file into process.env

const { OpenAI } = require('openai');
//import OpenAI from 'openai';

/* const openai = new OpenAIAPI({
    apiKey: 'YOUR_OPENAI_API_KEY', // Replace with your OpenAI API key
}); */
const apiKey = process.env.OPENAI_API_KEY;
const openai = new OpenAI({
    apiKey : apiKey 
});


async function getChatGPTResponse(text) {
    try {
  
        //console.log("In chat ", text)
        const completion = await openai.chat.completions.create({
            model:"gpt-3.5-turbo",
            messages: [
                { role: "user", content : '"' + text + '"'}
            ]
        }) 

        //return response.data.choices[0].text.trim();
        console.log(completion.choices[0].message.content)
        return completion.choices[0].message.content

        //return "This is fake message"
    } catch (error) {
        console.error('Error fetching response from ChatGPT:', error);
        return 'Sorry, something went wrong.';
    }
}

module.exports = { getChatGPTResponse };
