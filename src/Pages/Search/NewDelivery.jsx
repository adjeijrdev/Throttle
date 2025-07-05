// NewDelivery.js
import React from "react";
import DeliveryForm from "./DeliveryForm";
import './NewDelivery.css';

const NewDelivery = ({ onSearch }) => {
    return ( 
        <div className="new-delivery">
           <DeliveryForm onSearch={onSearch} />
        </div>
     );
};
 
export default NewDelivery;