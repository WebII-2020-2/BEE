import React from 'react';
import { Container, Image } from 'react-bootstrap';
import { GitHub, Linkedin, Mail } from 'react-feather';
import StoreContainer from '../../../components/Shared/StoreContainer';
import './About.css';

const devDataBack = [
  {
    name: 'Aldeir Nohan',
    image: 'https://avatars.githubusercontent.com/u/47931404?v=4',
    role: 'Desenvolvedor Back-end',
    email: 'aldeir_nohan03@live.com',
    github: 'https://github.com/aldeirnohan',
    linkedin:
      'https://linkedin.com/in/aldeir-norran-carvalho-de-souza-62b909152',
  },
  {
    name: 'Cláudio Henrique',
    image: 'https://avatars1.githubusercontent.com/u/30199497?v=4',
    role: 'Desenvolvedor Back-end',
    email: 'claudio.henrique.fdasilva@gmail.com',
    github: 'https://github.com/claudiohenriquefds',
    linkedin: 'https://linkedin.com/in/claudio-henrique-a3119a134',
  },
];

const devDataFront = [
  {
    name: 'Marcio Samuel',
    image: 'https://avatars1.githubusercontent.com/u/43766556?v=4',
    role: 'Desenvolvedor Front-end',
    email: 'marciosamuel12@gmail.com',
    github: 'https://github.com/marciosamuel',
    linkedin: 'https://linkedin.com/in/marciosamuel',
  },
  {
    name: 'Mateus Gomes',
    image: 'https://avatars.githubusercontent.com/u/61122185?v=4',
    role: 'Desenvolvedor Front-end',
    email: 'mateu.gs1999@gmail.com',
    github: 'https://github.com/mateusgs29',
    linkedin: 'https://linkedin.com/in/mateus-gs',
  },
];

function Sobre() {
  const DevCard = (props) => {
    const { name, image, role, email, github, linkedin } = props;
    return (
      <div className="card-dev">
        <Image src={image} alt={`foto do ${name}`} />
        <div className="card-info">
          <h3>{name}</h3>
          <h5>{role}</h5>
          <hr />
          <ul>
            <li>
              <a
                href={`mailto:${email}`}
                title={email}
                className="link-about"
                target="_blank"
                rel="noreferrer"
              >
                <Mail /> Email
              </a>
            </li>
            <li>
              <a
                href={linkedin}
                title={linkedin}
                className="link-about"
                target="_blank"
                rel="noreferrer"
              >
                <Linkedin /> Linkedin
              </a>
            </li>
            <li>
              <a
                href={github}
                title={github}
                className="link-about"
                target="_blank"
                rel="noreferrer"
              >
                <GitHub /> Github
              </a>
            </li>
          </ul>
        </div>
      </div>
    );
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

        <div className="mb-3">
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
            className="link-about"
            href="https://www.figma.com/file/9XUhANzTUsepjryBKGDBi0/BEE?node-id=0%3A1"
            target="_blank"
            rel="noreferrer"
          >
            Identidade visual e protótipo no Figma
          </a>
        </div>
        <h2>O Desenvolvimento</h2>
        <p>
          A parte do back-end do projeto foi construída no modelo de API REST e
          arquitetura MVC. Para isso, foram utilizados o framework Laravel e a
          persistência dos dados feita com a ajuda do MySQL e Google Cloud.
        </p>
        <p>
          O front-end foi foi produzido em forma de SPA com a biblioteca
          React.JS e o framework Bootstrap. Para consumo dos dados da API foi
          utilizado o Axios e Redux para persistência de dados pela aplicação.
          Também foram utilizadas bibliotecas de validação e CPF e Cartão de
          Crédito, além de consulta de endereço por CEP.
        </p>
        <p>
          Para o deploy e testes, utilizou-se o Heroku para a API e o Vercel
          para preview da SPA. O git e Github auxiliou no versionamento e
          compartilhamento de código juntamente com o gitflow.
        </p>
        <p>
          A metodologia de desenvolvimento utilizada foi a Kanban juntamente com
          o quadro do Trello, no quadro foram dispostos os cards com as tarefas
          a serem feitas e atribuídas a seus respectivos responsáves, podendo
          acompanhar o andamento de cada fase do projeto.
        </p>
        <h2>O Time</h2>
        <Container className="dev-info">
          {devDataBack.map((dev) => (
            <DevCard {...dev} key={dev.name} />
          ))}
        </Container>
        <Container className="dev-info">
          {devDataFront.map((dev) => (
            <DevCard {...dev} key={dev.name} />
          ))}
        </Container>
      </Container>
    </StoreContainer>
  );
}

export default Sobre;
