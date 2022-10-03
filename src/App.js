import React from 'react';
import { Route, Routes , Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Perfil from './pages/Perfil';
import Test from './pages/Test';
import Chats from './pages/Chats';
import { useAuth } from "./Hooks/UseAuth";
import { HomeLayout } from './Components/HomeLayout';
import 'bootstrap/dist/css/bootstrap.min.css';
import swal from 'sweetalert2';

function App() {

  const mostrarAlerta=()=>{
    swal('Esta cosa pa');
  }

  const { user } = useAuth();
  const funcionPrueba = ()=>{
    console.dir("Fuera del componente");
  }
  return (
    <Routes>
      <Route path="/" element={<Login />}/>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/test" element={<Test />} />
      <Route path="/Chats" element={<Chats />} />

      <Route path="/home" element={<HomeLayout login={user}/>}>
        <Route path="start" element={<Home login={user}/>} />
        <Route path="perfil" element={<Perfil login={user} funcion={funcionPrueba}/>} />
        <Route path="settings" element={<Home login={user}/>} />
      </Route>

      <Route
        path="*"
        element={<Navigate to="/" />}
      />
        </Routes>
  );
}

export default App;