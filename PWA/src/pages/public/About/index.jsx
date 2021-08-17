import React from 'react';
import { Container, Image } from 'react-bootstrap';
import StoreContainer from '../../../components/Shared/StoreContainer';
import './About.css';

function Sobre() {
  const userImages = {
    aldeir: 'https://avatars.githubusercontent.com/u/47931404?v=4',
    claudio: 'https://avatars1.githubusercontent.com/u/30199497?v=4',
    marcio: 'https://avatars1.githubusercontent.com/u/43766556?v=4',
    mateus: 'https://avatars.githubusercontent.com/u/61122185?v=4',
  };

  const DevCard = (props) => {
    const { image } = props;
    return <Image src={image} alt="ok mo" className="dev-card" />;
  };

  return (
    <StoreContainer title="Sobre">
      <Container className="products-container">
        <div className="category-info">
          <h1>Sobre</h1>
          <hr />
        </div>
        <h2>O Projeto</h2>
        <p className="text-justify">
          O sistema BEE (Business Enterprise E-commerce) é um projeto
          desenvolvido para a matéria de Laboratório de Programação Web 2 do
          curso de Análise e Desenvolvimento de Sistemas. Ele tem o intuito de
          ser um sistema de e-commerce com a parte do administrador, que
          gerencia os produtos, categorias, promoções, banners e vendas, além de
          conseguir gerar um relatório mensal. Na parte do cliente, ele é capaz
          de visualizar os produtos, gerenciar seus dados, cartões e endereços,
          realizar uma compra e visualizar os detalhes dos pedidos efetuados.
        </p>

        <div>
          <a
            className="link-about"
            href="https://github.com/WebII-2020-2/BEE"
            target="_blank"
            rel="noreferrer"
          >
            Repositório do projeto no gitHub
          </a>
          <br />
          <a
            className="link-about mb-2"
            href="https://www.figma.com/file/9XUhANzTUsepjryBKGDBi0/BEE?node-id=0%3A1"
            target="_blank"
            rel="noreferrer"
          >
            Identidade visual e protótipo no Figma
          </a>
        </div>

        <h2>O Desenvolvimento</h2>
        <h2>O Time</h2>
        <DevCard image={userImages.marcio} />
      </Container>
    </StoreContainer>
  );
}

export default Sobre;
