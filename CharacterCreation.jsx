import React, { useState } from 'react';
import '../estilos/characterCreation.css';

function CharacterCreation({ characters, onCreateCharacter, onDeleteCharacter }) {
  const [name, setName] = useState('');
  const [stats, setStats] = useState({ strength: 0, dexterity: 0, constitution: 0 });

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStats((prevStats) => ({
      ...prevStats,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    const newCharacter = { name, stats };
    onCreateCharacter(newCharacter);
    setName('');
    setStats({ strength: 0, dexterity: 0, constitution: 0 });
  };

  const generateRandomStats = () => {
    setStats({
      strength: Math.floor(Math.random() * 20) + 1,
      dexterity: Math.floor(Math.random() * 20) + 1,
      constitution: Math.floor(Math.random() * 20) + 1,
    });
  };

  return (
    <div className="medieval-character-container">
      <h2 className="medieval-title">Crear Personaje</h2>
      <input
        type="text"
        placeholder="Nombre del personaje"
        value={name}
        onChange={handleNameChange}
        className="medieval-input"
      />
      <input
        type="number"
        name="strength"
        placeholder="Fuerza"
        value={stats.strength}
        onChange={handleChange}
        className="medieval-input"
      />
      <input
        type="number"
        name="dexterity"
        placeholder="Destreza"
        value={stats.dexterity}
        onChange={handleChange}
        className="medieval-input"
      />
      <input
        type="number"
        name="constitution"
        placeholder="Constitución"
        value={stats.constitution}
        onChange={handleChange}
        className="medieval-input"
      />
      <button onClick={generateRandomStats} className="medieval-button">Generar Estadísticas</button>
      <button onClick={handleSubmit} className="medieval-button">Crear Personaje</button>

      {/* Lista de personajes */}
      <div className="character-list">
        <h3>Mis Personajes</h3>
        {characters.length === 0 ? <p>No hay personajes creados.</p> : null}
        {characters.map((character, index) => (
          <div key={index} className="character-item">
            <p>{character.name}</p>
            <button onClick={() => onDeleteCharacter(index)}>Borrar</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CharacterCreation;
