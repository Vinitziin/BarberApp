import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/Main.css';
import logo from '../assets/images/logo.png';
import banner from '../assets/images/banner.jpg';
import aboutImage from '../assets/images/about.png';
import instagramIcon from '../assets/images/instagram.png';
import facebookIcon from '../assets/images/facebook.png';
import corteIcon from '../assets/images/corte.jpg';
import barbaIcon from '../assets/images/barba.jpg';
import sobrancelhaIcon from '../assets/images/sobrancelha.jpg';
import gallery1 from '../assets/images/gallery1.png';
import gallery2 from '../assets/images/gallery2.png';
import gallery3 from '../assets/images/gallery3.png';
import gallery4 from '../assets/images/gallery4.png';
import gallery5 from '../assets/images/gallery5.png';
import starIcon from '../assets/images/star.png';

function Main() {
  return (
    <div className="main-container">
      <header className="main-header">
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo" />
        </div>
        <nav className="main-nav">
          <ul>
            <li><a href="#quemsomos">Quem somos</a></li>
            <li><a href="#servicos">Serviços</a></li>
            <li><a href="#colaboradores">Colaboradores</a></li>
            <li><a href="#galeria">Galeria</a></li>
            <li><a href="#avaliacoes">Avaliações</a></li>
          </ul>
        </nav>
        <div className="social-icons">
          <a href="#"><img src={instagramIcon} alt="Instagram" /></a>
          <a href="#"><img src={facebookIcon} alt="Facebook" /></a>
        </div>
        <div className="auth-buttons">
          <Link to="/login" className="login-button">Login</Link>
          <Link to="/cadastro" className="signup-button">Cadastro</Link>
        </div>
      </header>
      <div className="main-content">
        <div className="main-banner">
          <img src={banner} alt="Banner" className="main-banner-image" />
          <Link to="/agendamento" className="main-cta">AGENTE AGORA E MUDE SEU VISUAL</Link>
        </div>
        <section className="about-section" id="quemsomos">
          <h2>Quem somos?</h2>
          <div className="about-content">
            <div className="about-text">
              <p>
                Desde 2012, a Barbearia Laguna é o lugar dos cria que mandam no visual, no meu vide de quebrada, com um atendimento de primeira. Mais que uma barbearia, a gente é a banca onde a tradição e a modernidade se trombam pra te oferecer o melhor!
              </p>
              <p>
                Nossa missão desde o início é oferecer aos clientes mais do que só um corte de cabelo ou barba. A gente quer que você se sinta em casa, curtindo um momento assistido um filme e cuidado com você mesmo.
              </p>
              <p>
                Com uma equipe de barbeiros brabo e produtos top de linha, a gente garante que você vai sair daqui não só com o visual na régua, mas também com o autoestima lá em cima.
              </p>
              <p>
                Acreditamos que um corte bem feito faz toda a diferença. Por isso, nossos barbeiros são selecionados pelo pique e pela dedicação a atender cada cliente de forma única, ligada nas suas necessidades e desejos.
              </p>
              <button className="about-cta">AGENTE AQUI</button>
            </div>
            <div className="about-image">
              <img src={aboutImage} alt="Barbearia Laguna" />
            </div>
          </div>
        </section>
        <section className="services-section" id="servicos">
          <h2>Serviços</h2>
          <div className="services-content">
            <div className="service-card">
              <img src={corteIcon} alt="Corte" />
              <h3>CORTE</h3>
              <p>Domine seu estilo com um corte sob medida.</p>
            </div>
            <div className="service-card">
              <img src={barbaIcon} alt="Barba" />
              <h3>BARBA</h3>
              <p>Cultive uma barba única e expressiva.</p>
            </div>
            <div className="service-card">
              <img src={sobrancelhaIcon} alt="Sobrancelha" />
              <h3>SOBRANCELHA</h3>
              <p>Sobrancelhas na régua para um olhar marcante.</p>
            </div>
          </div>
        </section>
        <section className="gallery-section" id="galeria">
          <h2>Galeria</h2>
          <div className="gallery-content">
            <div className="gallery-item">
              <img src={gallery1} alt="Galeria 1" />
            </div>
            <div className="gallery-item">
              <img src={gallery2} alt="Galeria 2" />
            </div>
            <div className="gallery-item">
              <img src={gallery3} alt="Galeria 3" />
            </div>
            <div className="gallery-item">
              <img src={gallery4} alt="Galeria 4" />
            </div>
            <div className="gallery-item">
              <img src={gallery5} alt="Galeria 5" />
            </div>
          </div>
          <div className="gallery-instagram">
            <h3>Veja mais dos nossos trampos no nosso Instagram</h3>
            <a href="https://instagram.com"><img src={instagramIcon} alt="Instagram" /></a>
          </div>
        </section>
        <section className="reviews-section" id="avaliacoes">
          <h2>Avaliações</h2>
          <div className="review-content">
            <div className="stars">
              <img src={starIcon} alt="Estrela" className="star"/>
              <img src={starIcon} alt="Estrela" className="star"/>
              <img src={starIcon} alt="Estrela" className="star"/>
              <img src={starIcon} alt="Estrela" className="star"/>
              <img src={starIcon} alt="Estrela" className="star"/>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Main;
