import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Carousel, Container, Spinner } from 'react-bootstrap';
import { CreditCard, Feather, Truck } from 'react-feather';
import StoreContainer from '../../../components/Shared/StoreContainer';
import banner1 from '../../../assets/img/home-banner.jpg';
import banner2 from '../../../assets/img/black-friday-banner.jpg';
import './Home.css';
import ProductApiService from '../../../services/api/ProductAdminApiService';

function Home() {
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  const getProducts = async () => {
    setLoadingProducts(true);
    try {
      const resp = await ProductApiService.getBest()
        .then((r) => r.data)
        .catch((r) => r.response.data);

      if (resp.success) {
        setProducts(resp.data);
      } else {
        throw resp.error;
      }
    } catch (err) {
      console.error(`ERRO ${err.code}: ${err.error_message}`);
    } finally {
      setLoadingProducts(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const carouselItens = [
    {
      id: 0,
      title: 'Bem vindo à nossa loja online',
      description:
        'Aproveite todos os nossos produtos com um precinho especial',
      image: banner1,
      link: '',
    },
    {
      id: 1,
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
          <Carousel.Item className="item-carousel" key={item.id}>
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

      <Container className="home-destaque info">
        <div className="info-item">
          <Truck aria-label="icone de caminhão" />
          <p>
            <strong>Frete Grátis</strong>
            <br />
            Apenas Norte e Nordeste
          </p>
        </div>
        <div className="info-item">
          <CreditCard aria-label="icone de cartão" />
          <p>
            <strong>Parcele em até 6x</strong>
            <br />
            Para compras acima de R$ 99,00
          </p>
        </div>
        <div className="info-item">
          <Feather aria-label="icone de pena" />
          <p>
            <strong>Produtos 100% naturias</strong>
            <br />
            Com selo de aprovação da organic best
          </p>
        </div>
      </Container>
      <hr className="home-destaque separator" />
      {loadingProducts ? (
        <Spinner
          variant="secondary"
          animation="border"
          style={{ height: 64, width: 64, alignSelf: 'center', margin: '1rem' }}
        />
      ) : (
        <h1 style={{ alignSelf: 'center', margin: '1rem' }}>
          Produtos encontrados: {products.length}
        </h1>
      )}
    </StoreContainer>
  );
}

export default Home;
