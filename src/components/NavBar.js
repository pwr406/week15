import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

//simple nav bar that is really just the title of the app.
function NavBar() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container className='justify-content-center'>
        <Navbar.Brand><h1>SAMPLE CRUD APP</h1></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
    
      </Container>
    </Navbar>
  );
}

export default NavBar;