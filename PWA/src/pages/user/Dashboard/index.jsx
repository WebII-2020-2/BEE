import React, { useEffect } from 'react';
import { Nav } from 'react-bootstrap';
import { CreditCard, MapPin, Package, User } from 'react-feather';
import { useHistory } from 'react-router-dom';
import StoreContainer from '../../../components/Shared/StoreContainer';
import './Dashboard.css';
import Cards from './pages/Cards';
import Datas from './pages/Datas';

function Dashboard(props) {
  const { match } = props;
  const { page } = match.params;

  const url = '/user/dashboard';
  const history = useHistory();

  useEffect(() => {
    if (!['dados', 'pedidos', 'enderecos', 'cartoes'].includes(page)) {
      history.push(`${url}/dados`);
    }
  });

  return (
    <StoreContainer title="Dashboard">
      <Nav defaultActiveKey={`${url}/${page}`} className="mt-3 nav-dashboard">
        <Nav.Item>
          <Nav.Link
            href={`${url}/pedidos`}
            className="nav-link-dashboard"
            title="Meus pedidos"
          >
            <Package className="mr-2" />
            Meus pedidos
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            href={`${url}/enderecos`}
            className="nav-link-dashboard"
            title="Endereço"
          >
            <MapPin className="mr-2" />
            Endereço
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            href={`${url}/cartoes`}
            className="nav-link-dashboard"
            title="Cartões"
          >
            <CreditCard className="mr-2" />
            Cartões
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            href={`${url}/dados`}
            className="nav-link-dashboard"
            title="Meus dados"
          >
            <User className="mr-2" />
            Meus dados
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <hr />
      {page === 'dados' && <Datas />}
      {page === 'cartoes' && <Cards />}
      {page === 'enderecos' && 'Endereços'}
      {page === 'pedidos' && 'Pedidos'}
    </StoreContainer>
  );
}

export default Dashboard;
