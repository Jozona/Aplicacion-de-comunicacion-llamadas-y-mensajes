import React from 'react';
import Container from 'react-bootstrap/Container';
import Carousel from 'react-bootstrap/Carousel';
import { Button } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
import Modal from 'react-bootstrap/Modal';
import Navigation from '../Components/NavigationLayout';
import Cards from '../Components/Cards'
import './Test.css'


class Test extends React.Component{
  constructor(props) {
    super(props);
    console.dir(props);
    this.state = {
	prop: props, 
        cantidadBotones: 0
    };
    document.body.classList.add('Test');
  }
  componentDidMount() {
  }
  render() {
    return  (
      
        <div>
          <Navigation />
          <Container>
          <div className="Test"> 
          <Cards/> 
          </div>
          </Container>
          </div>
    )}
}

export default Test;