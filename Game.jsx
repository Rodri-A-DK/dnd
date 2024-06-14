import React, { useState } from 'react';
import Dice from './Dice';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { createProdia } from 'prodia';
import '../estilos/game.css';

const API_KEY = 'AIzaSyAX0tv_7PHObd7YHq5Y_9PPP7C0QZCdmpw'; // Reemplaza con tu clave API de Google

const genAI = new GoogleGenerativeAI(API_KEY);

function Game({ characters }) {
  const [diceResult, setDiceResult] = useState(null);
  const [userInput, setUserInput] = useState('');
  const [messageHistory, setMessageHistory] = useState([]);
  const [image, setImage] = useState(null);

  const rollDice = () => {
    const result = Math.floor(Math.random() * 20) + 1;
    setDiceResult(result);
  };

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleSend = async () => {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" });

    try {
      const prompt = messageHistory.join('\n'); // Utilizamos todo el historial para proporcionar contexto
      const result = await model.generateContent(prompt + '\n' + userInput); // Añadimos la nueva entrada del usuario al contexto
      const response = await result.response;
      const aiMessage = await response.text();

      setMessageHistory([...messageHistory, aiMessage]); // Agregamos el mensaje generado al historial
      // updateDisplayedMessages([...messageHistory, aiMessage]); // No está claro qué hace esta función, supondré que actualiza el estado de los mensajes mostrados
    } catch (error) {
      console.error('Error al generar contenido:', error);
    }
  };

  const handleGenerateImage = async () => {
    try {
      const prodia = createProdia({
        apiKey: '11d70842-1cb4-49d9-9038-7ead6aba771e', // Reemplaza con tu clave API de Prodia
      });

      const job = await prodia.generate({
        prompt: messageHistory.join('\n'), // Generamos la imagen a partir de todo el historial de mensajes
      });

      const { imageUrl, status } = await prodia.wait(job);

      if (status === 'succeeded') {
        setImage(imageUrl);
      } else {
        console.error('Error al generar la imagen:', status);
      }
    } catch (error) {
      console.error('Error al generar imagen:', error);
    }
  };

  return (
    <div className="medieval-game-container">
      <h2 className="medieval-title">Partida de Dungeons & Dragons</h2>
      <div className="medieval-container">
        <div className="message-container medieval-box">
          {messageHistory.map((message, index) => (
            <div key={index}>{message}</div>
          ))}
        </div>
        <div className="image-container medieval-box">
          {image && <img src={image} alt="Generated Scenario" />}
        </div>
        <textarea
          id="user-input"
          value={userInput}
          onChange={handleInputChange}
          placeholder="Ingresa tu texto..."
          className="medieval-textarea"
        />
        <button onClick={handleSend} className="medieval-button">Enviar</button>
        <button onClick={handleGenerateImage} className="medieval-button">Mostrar Imagen</button>
        <Dice rollDice={rollDice} diceResult={diceResult} />
      </div>
    </div>
  );
}

export default Game;
