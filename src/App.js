import { Container, Col, Row } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import FreeComponent from "./FreeComponent";
import AuthComponent from "./AuthComponent";
import Account from "./Account";

import ProtectedRoutes from "./ProtectedRoutes";

const protectedRoutes = [
  {
    id: 1,
    path: "",
    component: AuthComponent,
    props: {},
  },
];

function App() {
  return (
    <>
      <Container>
        <Row>
          <Col className="text-center">
            <h1>React Authentication System</h1>

            <section id="navigation">
              <a href="/">Home</a>
              <a href="/free">Free Component</a>
              <a href="/auth">Auth Component</a>
            </section>
          </Col>
        </Row>
        <Routes>
          <Route exact path="/" element={<Account />} />
          <Route exact path="/free" element={<FreeComponent />} />


            <Route path="/auth">
              {protectedRoutes.map((route) => (
                <Route
                  key={route.id}
                  path={route.path}
                  element={
                    <ProtectedRoutes>
                      <route.component {...route.props} />
                    </ProtectedRoutes>
                  }
                />
              ))}
            </Route>
        </Routes>
      </Container>
    </>
  );
}

export default App;
