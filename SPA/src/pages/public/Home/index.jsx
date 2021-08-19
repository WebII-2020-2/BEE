import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Carousel, Container, Row } from 'react-bootstrap';
import { CreditCard, Feather, Truck } from 'react-feather';
import StoreContainer from '../../../components/Shared/StoreContainer';
import LoadingPage from '../../../components/Shared/LoadingPage';
import CardProduct from '../../../components/Shared/CardProduct';
import ProductApiService from '../../../services/api/ProductApiService';
import CampaignApiService from '../../../services/api/CampaignApiService';
import './Home.css';

const Home = () => {
  const [banners, setBanners] = useState([]);
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadingBanners, setLoadingBanners] = useState(true);
  const [quantityProducts, setQuantityProducts] = useState(4);

  const getProducts = async () => {
    setLoadingProducts(true);
    try {
      const resp = await ProductApiService.getBest()
        .then((r) => r.data)
        .catch((r) => {
          throw r.response.data.error;
        });

      if (resp.success) {
        setProducts(resp.data);
      }
    } catch (err) {
      console.error(`ERRO ${err.code}: ${err.error_message}`);
    } finally {
      setLoadingProducts(false);
    }
  };

  const getBanners = async () => {
    setLoadingBanners(true);
    try {
      const resp = await CampaignApiService.getAll()
        .then((r) => r.data)
        .catch((r) => {
          throw r.response.data.error;
        });
      if (resp.success) {
        setBanners(
          resp.data.map((ban) => ({
            ...ban,
            link: ban.products.length ? `/campanhas/${ban.id}` : undefined,
          }))
        );
      }
    } catch (err) {
      console.error(`ERRO ${err.code}: ${err.error_message}`);
    } finally {
      setLoadingBanners(false);
    }
  };

  const productsList = useMemo(
    () => products.slice(0, quantityProducts),
    [products, quantityProducts]
  );

  useEffect(() => {
    getBanners();
    getProducts();
  }, []);

  if (loadingProducts || loadingBanners)
    return (
      <StoreContainer title="Carregando Página Inicial">
        <LoadingPage />
      </StoreContainer>
    );

  return (
    <StoreContainer title="Página Inicial">
      <Carousel>
        {banners.map(
          (item) =>
            item.active && (
              <Carousel.Item className="item-carousel" key={item.id}>
                {item.link ? (
                  <Link to={item.link}>
                    <div
                      className="image-carousel"
                      style={{ backgroundImage: `url(${item.image})` }}
                    >
                      {' '}
                    </div>
                  </Link>
                ) : (
                  <div
                    className="image-carousel"
                    style={{ backgroundImage: `url(${item.image})` }}
                  >
                    {' '}
                  </div>
                )}
                <Carousel.Caption className="caption-carousel">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </Carousel.Caption>
              </Carousel.Item>
            )
        )}
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
    </StoreContainer>
  );
};

export default Home;
