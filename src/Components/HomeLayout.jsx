import React from 'react';
import { Navigate, useOutlet } from "react-router-dom";
import { useAuth } from "../Hooks/UseAuth";
import Navigation from "./NavigationLayout";
import swal from 'sweetalert2';

export const HomeLayout = () => {

  const mostrarAlerta=()=>{
    swal('Esta cosa pa');
  }

  const { user } = useAuth();
  const outlet = useOutlet();
  if (!user) {
    return <Navigate to="/" />;
  }

  return (
    <div>
    <Navigation
      />
      {outlet}
    </div>
  );
};


