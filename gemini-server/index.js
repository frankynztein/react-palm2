require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());

const { GoogleGenerativeAI } = require("@google/generative-ai");
const apiKey = process.env.API_KEY;
// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(apiKey);

async function run() {
  // For text-only input, use the gemini-pro model
  // const model = genAI.getGenerativeModel({ model: "gemini-pro"});

  // let answer = null;
  // const prompt = "Poema de 20 palabras sobre corgis"

  // const result = await model.generateContent(prompt);
  // const response = await result.response;
  // const text = response.text();
  // console.log(text);
}

// run();

const model = genAI.getGenerativeModel({ model: "gemini-pro"});
let prompt = "Historia de 200 palabras sobre la reina corgi Emma Sofia"

app.post('/api', async (req, res) => {
  prompt = req.body.prompt;
  try {
  
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    res.json(text);
    
  } catch (error) {
    console.error(error)
    res.status(500).send("Error al generar contenido");
  }
})

app.listen(3333, () => console.log('service running'));
