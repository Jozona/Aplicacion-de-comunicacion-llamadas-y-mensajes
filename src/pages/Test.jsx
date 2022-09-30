import React from 'react';
import Container from 'react-bootstrap/Container';
import Carousel from 'react-bootstrap/Carousel';
import { Button } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
import Modal from 'react-bootstrap/Modal';
import Navigation from '../Components/NavigationLayout';

class Test extends React.Component{
  constructor(props) {
    super(props);
    console.dir(props);
    this.state = {
	prop: props,
        cantidadBotones: 0
    };
  }
  componentDidMount() {
  }
  render() {
    return  (
      
        <div>
        <Navigation/>
      <Container fluid>
        <Carousel fade>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://www.tooltyp.com/wp-content/uploads/2014/10/1900x920-8-beneficios-de-usar-imagenes-en-nuestros-sitios-web.jpg"
          alt="First slide"
          width={400}
          height={400}
        />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://d7lju56vlbdri.cloudfront.net/var/ezwebin_site/storage/images/_aliases/img_1col/noticias/solar-orbiter-toma-imagenes-del-sol-como-nunca-antes/9437612-1-esl-MX/Solar-Orbiter-toma-imagenes-del-Sol-como-nunca-antes.jpg"
          alt="Second slide"
          width={400}
          height={400}
        />

        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
          width={400}
          height={400}
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      
    </Carousel>
    </Container>
    <br/>
        <div>
             {this.state.cantidadBotones >= 0 &&
                <Button variant="success" 
                onClick={()=>{ this.setState(
                    {...this.state, cantidadBotones: this.state.cantidadBotones + 1}) }}>
                        Agrega otro boton</Button>
             }
             {([...Array(this.state.cantidadBotones)].map((x, i) =>
                <Button id={i} key={x} variant="secondary" 
onClick={()=>{ console.dir(i); this.setState({...this.state, modalOpen: true, show: true, onHide:() => this.setState({...this.state, show:false})});}}>Boton creado</Button>
              ))}
        </div>
	<div>
	<Spinner animation="border" />;
	{(this.state.modalOpen == true && 
      <Modal
      {...this.state}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Centered Modal</h4>
        <p>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
          dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
          consectetur ac, vestibulum at eros.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={this.state.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>)}
	</div>
    </div>
    )}
}

export default Test;