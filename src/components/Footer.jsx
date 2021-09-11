//components
import { Navbar, Container } from "react-bootstrap";

//stylesheet
import "./footer-styles.scss";

const Footer = () => {
  return (
    <>
      <Navbar bg="light" className="footer">
        <Container className="justify-content-center">
          <Navbar.Text>
            Made by <a href="https://arghyabiswas.me/">Arghya Biswas</a>.{" "}
            <a href="https://github.com/arghyab0/givemore-web">Github repo</a>.
          </Navbar.Text>
        </Container>
      </Navbar>
    </>
  );
};

export default Footer;
