import React from "react";
import Alert from "@mui/material/Alert";
import AlertTitle from '@mui/material/AlertTitle';

export default function CustomAlert({message, title="Success" ,severity="success"}) {
  return (
    <Alert variant="filled" severity={severity} style={{position:"absolute", top:"15px", left:"30%", width:"90rem",height:"10rem"}}>
  <AlertTitle >{title}</AlertTitle>
  {message}
</Alert>
  );
}
