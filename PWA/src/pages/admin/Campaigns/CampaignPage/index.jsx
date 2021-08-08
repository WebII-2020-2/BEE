// import React from 'react';
// import { Container, Nav } from 'react-bootstrap';
// import AdminContainer from '../../../../components/Admin/Container';
// import ButtonsForm from '../../../../components/Admin/ButtonsForm';
// import { Details, Products, Shipping } from '../../Orders/OrderPage/Tabs';
//
// export default function CampaignPage() {
//   return (
//     <AdminContainer link="vendas">
//       <ButtonsForm
//         path="/admin/vendas/page/1"
//         // handleEdit={handleEdit}
//         // handleSubmit={handleSubmit}
//         // isReadOnly={isReadOnly}
//         // isSaving={isSaving}
//       />
//
//       <Nav variant="tabs" activeKey={tab} className="order-page-admin nav">
//         <Nav.Item>
//           <Nav.Link eventKey="details" onClick={() => setTab('details')}>
//             Informações gerais
//           </Nav.Link>
//         </Nav.Item>
//         <Nav.Item>
//           <Nav.Link eventKey="shipping" onClick={() => setTab('shipping')}>
//             Informações de envio
//           </Nav.Link>
//         </Nav.Item>
//         <Nav.Item>
//           <Nav.Link eventKey="products" onClick={() => setTab('products')}>
//             Lista de produtos
//           </Nav.Link>
//         </Nav.Item>
//       </Nav>
//
//       <Container className="order-page-admin container">
//         {tab === 'details' && (
//           <Details
//             order={order}
//             handleChange={handleChange}
//             isReadOnly={isReadOnly}
//           />
//         )}
//         {tab === 'shipping' && (
//           <Shipping
//             order={order}
//             isReadOnly={isReadOnly}
//             handleChange={handleChange}
//           />
//         )}
//         {tab === 'products' && <Products order={order} />}
//       </Container>
//     </AdminContainer>
//   );
// }
