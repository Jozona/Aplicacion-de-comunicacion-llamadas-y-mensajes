import React from 'react';
import { initiateSocket , stompClient , socket } from '../SocketService'

var LoggedIn = function(props) { return <h6><small>Logged in as: </small> <strong>{props.name}</strong></h6>; };
//var UserList = function(props) { return <div>[UserList]</div> };
var UserList = function(props) {
  return <div>
    <h6>User List</h6>
    <ul className="list-unstyled">
      { props.users.map(function(user) { return <li key={user.id}>{user.name}</li> }) }
    </ul>
  </div>;
};

//var MessageList = function(props) { return <div>[MessageList]</div> };
var MessageList = function(props) {
  return <div>
    <h6>Message List</h6>
    <ul className="list-unstyled">
      { props.messages.map(function(message, index) { return <li key={index}>
        {message.type === 'JOIN' ?
        <div>
        <em>{message.sender} Joined </em>
        </div>
        :
        <div>
        <em>{message.sender}: {message.content}</em>
        </div>
        }
      </li> }) }
    </ul>
  </div>;
};

//var NewMessage = function(props) { return <div>[NewMessage]</div>; };
class NewMessage extends React.Component{
  constructor(props){
    super(props);
    this.myRef = React.createRef();
  }
  sendMessage(event) {
    event.preventDefault();
    var name = this.props.name;
    var message = this.myRef.current.value;
    this.props.sendMessage(name, message);
    this.myRef.current.value = '';
  }
  render () {
    return <div className="row">
      <form onSubmit={this.sendMessage.bind(this)}>
        <div className="col-md-10">
          <textarea className="fill" ref={this.myRef} placeholder="Write your message here"></textarea>
        </div>
        <div className="col-md-2">
          <button className="fill">Send</button>
        </div>
      </form>
    </div>;
  }
}

class ChatApp extends React.Component{
  render() {
    //return <div>[ChatApp]</div>;
    return <div className="container">
      <div className="row">
        <div className="col-md-12">
          <LoggedIn name={this.props.name} />
        </div>
        <div className="col-md-4 h300">
          <UserList users={this.props.users} />
        </div>
        <div className="col-md-8 h300">
          <MessageList messages={this.props.messages} />
        </div>
        <div className="col-md-12">
          <NewMessage name={this.props.name} sendMessage={this.props.sendMessage} />
        </div>
      </div>
    </div>
  }
}

class ChatWindow extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
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
    //alert(this.props.sock);
    //this.sendMessage('SYSTEM', 'App mounted');
    if (this.sock === undefined && this.stompClient === undefined){
        initiateSocket(this.state.name, self);
        this.sock = socket
        this.stompClient = stompClient;
    }
    this.sendMessage = function(name, message) {
        stompClient.send("/app/chat.register",
        {},
        JSON.stringify({sender: name, content: message, type: "CHAT"})
    )
      };  //    this.sock.onmessage = function(e) {
        //console.log('message', e.data);
//      self.addMessage(JSON.parse(e.data));
//    };
  }
  render() {
    return <div>
        <ChatApp logout={this.logout} users={this.state.users} messages={this.state.messages} name={this.state.name} sendMessage={this.sendMessage} /> 
    </div>;
  }
}

function Home() {
    return (<p>asdasd</p>);
}

export default ChatWindow;