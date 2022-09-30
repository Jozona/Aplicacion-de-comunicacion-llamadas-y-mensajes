import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./UseLocalStorage";
import 'react-toastify/dist/ReactToastify.min.css';
import { toast as toasty } from 'react-toastify';
//import 'react-toastify/dist/ReactToastify.css';
// minified version is also included

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage("user", null);
  const navigate = useNavigate();

  const login = async (data) => {
    await fetch('http://localhost:4000/users/validate', {
      method: 'POST',
      body: JSON.stringify({
         email: data.email,
         password: data.password,
         userId: Math.random().toString(36).slice(2),
      }),
      headers: {
         'Content-type': 'application/json; charset=UTF-8',
      },
   })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 200 || data[0].id > -1){
          setUser(data);
          navigate("/home/start", { replace: true });  
        } else {
          toasty.error('Error: Invalid Credentials',{
            position: toasty.POSITION.TOP_CENTER
          });
      }})
      .catch((err) => {
        toasty.error('Error: Invalid Credentials',{
          position: toasty.POSITION.TOP_CENTER
        });
       console.log(err.message);
      });
  };

  const signup = async (data) => {
    await fetch('http://localhost:4000/users/create', {
      method: 'POST',
      body: JSON.stringify({
         email: data.email,
         password: data.password,
         name: data.name,
         lastname: data.lastname,
         userId: Math.random().toString(36).slice(2),
      }),
      headers: {
         'Content-type': 'application/json; charset=UTF-8',
      },
   })
      .then((response) => response.json())
      .then((data) => {
        console.dir(data);
        if (data.status === 200 || data[0].id > -1){
          setUser(data);
          navigate("/home/start", { replace: true });  
        } else {
          toasty.error('Error: Invalid information',{
            position: toasty.POSITION.TOP_CENTER
          });
      }})
      .catch((err) => {
        toasty.error('Error: Invalid information',{
          position: toasty.POSITION.TOP_CENTER
        });
       console.log(err.message);
      });
  };

  const logout = () => {
    setUser(null);
    navigate("/", { replace: true });
  };

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
      signup
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
