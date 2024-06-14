import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
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
      <header className="main-header container-fluid">
        <div className="row align-items-center">
          <div className="col-3 logo-container">
            <img src={logo} alt="Logo" className="logo" />
          </div>
          <nav className="col-6 main-nav">
            <ul className="nav justify-content-center">
              <li className="nav-item"><a className="nav-link" href="#quemsomos">Quem somos</a></li>
              <li className="nav-item"><a className="nav-link" href="#servicos">Serviços</a></li>
              <li className="nav-item"><a className="nav-link" href="#colaboradores">Colaboradores</a></li>
              <li className="nav-item"><a className="nav-link" href="#galeria">Galeria</a></li>
              <li className="nav-item"><a className="nav-link" href="#avaliacoes">Avaliações</a></li>
            </ul>
          </nav>
          <div className="col-3 text-end">
            <div className="social-icons d-inline-block">
              <a href="#"><img src={instagramIcon} alt="Instagram" /></a>
              <a href="#"><img src={facebookIcon} alt="Facebook" /></a>
            </div>
            <div className="auth-buttons d-inline-block ms-3">
              <Link to="/login" className="btn btn-light login-button">Login</Link>
              <Link to="/cadastro" className="btn btn-light signup-button">Cadastro</Link>
            </div>
          </div>
        </div>
      </header>
      <div className="main-content">
        <div className="main-banner">
          <img src={banner} alt="Banner" className="img-fluid" />
          <Link to="/agendamento" className="btn btn-primary main-cta">AGENTE AGORA E MUDE SEU VISUAL</Link>
        </div>
        <section className="about-section container mt-5" id="quemsomos">
          <h2 className="text-center">Quem somos?</h2>
          <div className="row mt-4">
            <div className="col-md-6 about-text">
              <p>Desde 2012, a Barbearia Laguna é o lugar dos cria que mandam no visual, no meu vide de quebrada, com um atendimento de primeira. Mais que uma barbearia, a gente é a banca onde a tradição e a modernidade se trombam pra te oferecer o melhor!</p>
              <p>Nossa missão desde o início é oferecer aos clientes mais do que só um corte de cabelo ou barba. A gente quer que você se sinta em casa, curtindo um momento assistido um filme e cuidado com você mesmo.</p>
              <p>Com uma equipe de barbeiros brabo e produtos top de linha, a gente garante que você vai sair daqui não só com o visual na régua, mas também com o autoestima lá em cima.</p>
              <p>Acreditamos que um corte bem feito faz toda a diferença. Por isso, nossos barbeiros são selecionados pelo pique e pela dedicação a atender cada cliente de forma única, ligada nas suas necessidades e desejos.</p>
              <Link to="/agendamento">
                <button className="btn btn-primary about-cta">AGENTE AQUI</button>
              </Link>
            </div>
            <div className="col-md-6 about-image">
              <img src={aboutImage} alt="Barbearia Laguna" className="img-fluid rounded" />
            </div>
          </div>
        </section>
        <section className="services-section container mt-5" id="servicos">
          <h2 className="text-center">Serviços</h2>
          <div className="row mt-4">
            <div className="col-md-4 text-center service-card">
              <img src={corteIcon} alt="Corte" className="img-fluid rounded-circle" />
              <h3>CORTE</h3>
              <p>Domine seu estilo com um corte sob medida.</p>
            </div>
            <div className="col-md-4 text-center service-card">
              <img src={barbaIcon} alt="Barba" className="img-fluid rounded-circle" />
              <h3>BARBA</h3>
              <p>Cultive uma barba única e expressiva.</p>
            </div>
            <div className="col-md-4 text-center service-card">
              <img src={sobrancelhaIcon} alt="Sobrancelha" className="img-fluid rounded-circle" />
              <h3>SOBRANCELHA</h3>
              <p>Sobrancelhas na régua para um olhar marcante.</p>
            </div>
          </div>
        </section>
        <section className="gallery-section container mt-5" id="galeria">
          <h2 className="text-center">Galeria</h2>
          <div className="row mt-4">
            <div className="col-md-4 gallery-item">
              <img src={gallery1} alt="Galeria 1" className="img-fluid rounded" />
            </div>
            <div className="col-md-4 gallery-item">
              <img src={gallery2} alt="Galeria 2" className="img-fluid rounded" />
            </div>
            <div className="col-md-4 gallery-item">
              <img src={gallery3} alt="Galeria 3" className="img-fluid rounded" />
            </div>
            <div className="col-md-4 gallery-item">
              <img src={gallery4} alt="Galeria 4" className="img-fluid rounded" />
            </div>
            <div className="col-md-4 gallery-item">
              <img src={gallery5} alt="Galeria 5" className="img-fluid rounded" />
            </div>
          </div>
          <div className="text-center gallery-instagram mt-4">
            <h3>Veja mais dos nossos trampos no nosso Instagram</h3>
            <a href="https://instagram.com"><img src={instagramIcon} alt="Instagram" className="img-fluid" /></a>
          </div>
        </section>
        <section className="reviews-section container mt-5" id="avaliacoes">
          <h2 className="text-center">Avaliações</h2>
          <div className="text-center review-content mt-4">
            <div className="stars">
              <img src={starIcon} alt="Estrela" className="star mx-1" />
              <img src={starIcon} alt="Estrela" className="star mx-1" />
              <img src={starIcon} alt="Estrela" className="star mx-1" />
              <img src={starIcon} alt="Estrela" className="star mx-1" />
              <img src={starIcon} alt="Estrela" className="star mx-1" />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Main;
