import * as React from "react";
import { useAuth } from "../Hooks/UseAuth";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import './Login.css';
import { disconnectSocket } from '../SocketService'
import swal from 'sweetalert2';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, storage, db } from "../firebase";



const Login = () => {
  const [err, setErr] = React.useState(false);
  
  const navigate = useNavigate();
  const handleSubmitFirebase = async (e) =>{
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try{
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/chats");
    }catch(err){
      setErr(true);
    }

  }

  const mostrarAlerta = () => {
    swal('Esta cosa pa');
  }

  const { login } = useAuth();
  const [datos, setDatos] = React.useState({
    typeEmailX: '',
    typePasswordX: ''
  })

  const handleInputChange = (event) => {
    // console.log(event.target.name)
    // console.log(event.target.value)
    setDatos({
      ...datos,
      [event.target.name]: event.target.value
    })
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    disconnectSocket();
    login({
      email: datos.typeEmailX,
      password: datos.typePasswordX
    });
  };

  return (
    <section className="vh-100 gradient-custom">
      <ToastContainer />
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-10">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5 h-50">
            <div className="card bg-dark text-white opacity-75 h-50" style={{ borderRadius: '1rem' }} >
              <div className="card-body p-3 text-center h-50">

                <div className="mb-md-2 mt-md-4 pb-5 h-50">
                  <img src="https://cdn.discordapp.com/attachments/976686244526436392/1026732235577098320/logo_sin_letras.png" alt="" style={{width:'90px'}} />
                  <form onSubmit={handleSubmitFirebase} noValidate sx={{ mt: 1 }}>
                     
                    <h2 className="fw-bold mb-2">Inicio de sesión</h2>
                    <p className="text-white-50 mb-5">Por favor, ingresa tu correo y contraseña.</p>

                    <div className="form-outline form-white mb-4">
                      <input type="email" name="typeEmailX" id="typeEmailX" className="form-control form-control-lg" onChange={handleInputChange} />
                      <label className="form-label" htmlFor="typeEmailX">Correo</label>
                    </div>

                    <div className="form-outline form-white mb-4">
                      <input type="password" name="typePasswordX" id="typePasswordX" className="form-control form-control-lg" onChange={handleInputChange} />
                      <label className="form-label" htmlFor="typePasswordX">Contraseña</label>
                    </div>

                    <p className="small mb-0 pb-lg-2"><a className="text-white-50" href="#!">¿Olvidaste tu contraseña?</a></p>

                    <button className="btn btn-outline-light btn-lg px-5" type="submit">Aceptar</button>
                    <div>
                      <p className="mt-5 mb-0">¿No tienes cuenta? <Link to="/signup">Registrarse</Link>
                      </p>
                    </div>
                    {err && <span>Algo salio mal</span>}
                  </form>
                </div>


              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;