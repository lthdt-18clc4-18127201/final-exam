import "./App.css";
import Home from "./components/Home.js";
import Login from "./components/Auth/Login.js";
import Register from "./components/Auth/Register.js";
import About from "./components/About.js";
import Nav from "./components/Nav.js";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
// import "bootstrap/dist/js/bootstrap.bundle.min.js";

function App() {
  const user = useSelector((state) => state.user.user);

  return (
    <div className="App">
      <Nav />
      <Container>
        {/* <main className="container"> */}
        <Routes>
          {/* <Route exact path="/" element={!user ? <Login /> : <Home />} /> */}
          <Route exact path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />
        </Routes>
        {/* </main> */}
      </Container>
    </div>
  );
}

export default App;
