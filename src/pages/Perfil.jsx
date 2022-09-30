import React from 'react';
import Container from 'react-bootstrap/Container';
import Carousel from 'react-bootstrap/Carousel';

class Perfil extends React.Component{
  constructor(props) {
    super(props);
    console.dir(props);
    this.state = {
      funcion: props.funcion,
      users: [],
      messages: [],
      loggedIn: false,
      name: props.login[0].name + " " + props.login[0].lastname,
      messageId: 0,
      userId: 0,
      username: props.login[0].email,
    };
    this.login = this.handleLogin.bind(this);
  }
  //login(name) {
  handleLogin(name) {
      this.setState({ ...this.state, loggedIn: true });
  }
  logout() {
    this.setState({ loggedIn: false, name: '' });
  }
  /* NB: Moved to constructor, so that self reference can be used instead of this
  sendMessage(name, message) {
    this.props.sock.send(JSON.stringify({name: name, message: message}));
  } */
  getMessageId() {
    var id = this.state.messageId - 1;
    this.setState({ ...this.state, messageId: id });
    return id;
  }
  addMessage(payload) {
    var message = payload !== undefined ? (payload.body !== undefined ? JSON.parse(payload.body) : {}) : {};
    message.id = message.id || this.getMessageId();
    this.setState({ ...this.state, messages: this.state.messages.concat(message) });
    this.addUser(message.sender);
  }
  getUserId() {
    var id = this.state.userId - 1;
    this.setState({userId: id});
    return id;
  }
  addUser(name) {
    if(name !== undefined && !this.state.users.some(function(user) { return user.name === name; }))
      this.setState({ users: this.state.users.concat({ id: this.getUserId(), name: name }) });
    // else console.log('User already exists: ' + name);
  }
  sendMessage = function(name, message) {
    this.stompClient.send("/app/chat.register",
    {},
    JSON.stringify({sender: name, content: message, type: "CHAT"})
)
  };
componentDidMount() {
    var self = this;
  }
  render() {
    return <div>
      <Container fluid>
        <Carousel fade>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://www.tooltyp.com/wp-content/uploads/2014/10/1900x920-8-beneficios-de-usar-imagenes-en-nuestros-sitios-web.jpg"
          alt="First slide"
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
        </div>
  }
}

export default Perfil;