import React, { useState } from "react";

import DeliveryForm from "./DeliveryForm";
import './NewDelivery.css';

const NewDelivery = (props) => {
    const [isEditing, setIsEditing] = useState(false);
    const saveDeliveryDataHandler = (enteredDeliveryData) => {
        const deliveryData = {
            ...enteredDeliveryData,
            id: Math.random().toString()
        };
        props.onAddDelivery(deliveryData);
        setIsEditing(false);
    };

    const startEditingHandler = () => {
        setIsEditing(true);
    };

    const stopEditingHandler = () =>{
        setIsEditing(false);
    };

    return ( 
        <div className="new-delivery">
           <DeliveryForm 
           onSaveDeliveryData={saveDeliveryDataHandler}
           onCancel={stopEditingHandler}
           />
        </div>
     );
};
 
export default NewDelivery;