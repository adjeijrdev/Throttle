import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store/store.js";
import { Toaster } from "react-hot-toast";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <Toaster position="top-center" reverseOrder={false} 
      toastOptions={{
    className: '',
    style: {
    
      padding: '16px',
      width:"500px",
   
    },
  }}/>

      <App />
    </Provider>
  </StrictMode>
);
