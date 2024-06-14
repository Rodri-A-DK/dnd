import React, { useEffect, useState } from 'react';
import '../estilos/dice.css'; // Asegúrate de que esta ruta sea correcta
import diceimage from '../imagenes/dice.png';





function Dice({ rollDice, diceResult }) {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (diceResult !== null) {
      setAnimate(true);
      const timer = setTimeout(() => {
        setAnimate(false);
      }, 1200); // Duración de la animación
      return () => clearTimeout(timer);
    }
  }, [diceResult]);

  return (
    <div className="dice-container">
      <button onClick={rollDice} className="dice-button">Tirar Dado</button>
      <div className={`dice-image ${animate ? 'roll' : ''}`}>
        {animate ? (
          <img src={diceimage} alt="Dado rodando" className="dice-face" />
        ) : (
          diceResult && <div className="dice-result-text">{diceResult}</div>
        )}
      </div>
    </div>
  );
}

export default Dice;
