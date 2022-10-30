import * as React from "react";
import { Link } from "react-router-dom"; 
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Hooks/UseAuth";
import { ToastContainer } from 'react-toastify';
import Form from 'react-bootstrap/Form';
import './Signup.css';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage, db } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, Firestore, setDoc } from "firebase/firestore";

const Signup = () => {
  const [err, setErr] = React.useState(false);
  
  const navigate = useNavigate();

  
  const handleSubmitFirebase = async (e) => {
    e.preventDefault()
    const email = e.target[0].value;
    const password = e.target[1].value;
    const displayName = e.target[2].value;
    const pfp = e.target[3].files[0];

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      
      //Create a unique image name
      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);


      await uploadBytesResumable(storageRef, pfp).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            //Update profile
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            //create user on firestore
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            await setDoc(doc(db, "userChats", res.user.uid), {});
            navigate("/chats");

          } catch (err) {
            console.log(err);
            setErr(true);
            setLoading(false);
          }
        });
      });

    } catch (err) {
      setErr(true);
      console.log(err);
    }


  };

  const { signup } = useAuth();
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
    console.dir(datos);
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    console.dir(datos);
    signup({
      email: datos.typeEmailX,
      password: datos.typePasswordX,
      name: datos.typeNameX,
      lastname: datos.typeLastnameX
    });
  };

  return (
    <section className="vh-100 gradient-custom">
      <ToastContainer />
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-10 col-lg-6 col-xl-5 h-100">
            <div className="card bg-dark text-white opacity-75 h-100" style={{ borderRadius: '1rem' }} >
              <div className="card-body p-3 text-center h-100">

                <div className="mb-md-5 mt-md-8">
                  <img src="https://cdn.discordapp.com/attachments/976686244526436392/1026732235577098320/logo_sin_letras.png" alt="" style={{ width: '90px' }} />
                  <form onSubmit={handleSubmitFirebase} noValidate sx={{ mt: 1 }}>
                    <h2 className="fw-bold mb-1 ">Registrarse</h2>
                    <p className="text-white-50 mb-3">Por favor, ingresa tu informacón.</p>

                    <div className="form-outline form-white mb-1">
                      <input type="email" name="typeEmailX" id="typeEmailX" className="form-control form-control-lg" onChange={handleInputChange} />
                      <label className="form-label" htmlFor="typeEmailX">Correo</label>
                    </div>

                    <div className="form-outline form-white mb-1">
                      <input type="password" name="typePasswordX" id="typePasswordX" className="form-control form-control-lg" onChange={handleInputChange} />
                      <label className="form-label" htmlFor="typePasswordX">Contraseña</label>
                    </div>
                    <div className="form-outline form-white mb-1">
                      <input type="text" name="typeNameX" id="typeNameX" className="form-control form-control-lg" onChange={handleInputChange} />
                      <label className="form-label" htmlFor="typeNameX">Usuario</label>
                    </div>
                    <input required  type="file" id="file" />
                    <label htmlFor="file">
                      <span>Foto de perfil</span>
                    </label>
                    <button className="btn btn-outline-light btn-lg px-5" type="submit">Listo</button>
                    <div>
                      <p className="mb-1 mt-3">¿Ya tienes cuenta? <Link to="/login" >Ingresar</Link>
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

export default Signup;