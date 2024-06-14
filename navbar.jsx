import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom'; // Importa NavLink y useNavigate
import '../estilos/navbar.css'; // Asegúrate de que esta ruta sea correcta

function NavigationBar() {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate(); // Inicializa useNavigate

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  
  const handleNavigateHome = () => {
    navigate('/'); // Redirige a la ruta raíz
  };

  return (
    <nav className="medieval-navbar">
      <ul className="medieval-nav-list">
        <li className="medieval-nav-item">
          <Link to="/characters" className="medieval-nav-link">Personajes</Link>
        </li>
        <li className="medieval-nav-item">
          <Link to="/game" className="medieval-nav-link">Partida</Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavigationBar;
