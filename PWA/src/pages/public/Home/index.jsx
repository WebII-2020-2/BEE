import React from 'react';
import { Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import StoreContainer from '../../../components/Shared/StoreContainer';
import banner1 from '../../../assets/img/home-banner.jpg';
import banner2 from '../../../assets/img/black-friday-banner.jpg';
import './Home.css';

function Home() {
  const carouselItens = [
    {
      title: 'Bem vindo à nossa loja online',
      description:
        'Aproveite todos os nossos produtos com um precinho especial',
      image: banner1,
      link: '',
    },
    {
      title: 'Super descontos de Black Friday',
      description: 'Promoção válida até 23:59 e enquanto durar o estoque',
      image: banner2,
      link: '/promocoes/1',
    },
  ];

  return (
    <StoreContainer title="Página Inicial">
      <Carousel>
        {carouselItens.map((item) => (
          <Carousel.Item className="item-carousel">
            <Link to={item.link}>
              <div
                className="image-carousel"
                style={{ backgroundImage: `url(${item.image})` }}
              >
                {' '}
              </div>
            </Link>
            <Carousel.Caption className="caption-carousel">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </StoreContainer>
  );
}

export default Home;
