import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Carousel, Container, Row } from 'react-bootstrap';
import { CreditCard, Feather, Truck } from 'react-feather';
import StoreContainer from '../../../components/Shared/StoreContainer';
import LoadingPage from '../../../components/Shared/LoadingPage';
import CardProduct from '../../../components/Shared/CardProduct';
import banner1 from '../../../assets/img/home-banner.jpg';
import banner2 from '../../../assets/img/black-friday-banner.jpg';
import ProductApiService from '../../../services/api/ProductAdminApiService';
import './Home.css';

function Home() {
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [quantityProducts, setQuantityProducts] = useState(4);

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

  const productsList = useMemo(
    () => products.slice(0, quantityProducts),
    [products, quantityProducts]
  );

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
        <LoadingPage />
      ) : (
        <Container className="home-destaque products">
          <h3>Produtos em destaque</h3>
          <Row className="product-list admin">
            {productsList.map((product) => (
              <CardProduct {...product} key={product.id} />
            ))}
          </Row>
          {quantityProducts <= products.length && (
            <Button
              className="loader"
              variant="dark"
              onClick={() => setQuantityProducts(quantityProducts + 4)}
            >
              Carregar mais
            </Button>
          )}
        </Container>
      )}
    </StoreContainer>
  );
}

export default Home;
