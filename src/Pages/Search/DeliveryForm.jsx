import React, {useState} from "react";

import './DeliveryForm.css';

const DeliveryForm = (props) => {
   const [enteredTitle,setEnteredTitle]= useState('');
   const [enteredVendor,setEnteredVendor]= useState('');
   const [enteredname,setEnteredname]= useState('');
   const [enteredRecipient,setEnteredRecipient]= useState('');
   const [enteredLocation,setEnteredLocation]= useState('');
   


    const titleChangeHandler = (event) => {
        setEnteredTitle(event.target.value);
    };

    const vendorChangeHandler = (event) => {
        setEnteredVendor(event.target.value);
    };
    const nameChangeHandler = (event) => {
        setEnteredname(event.target.value);
    };
    const recipientChangeHandler = (event) => {
        setEnteredRecipient(event.target.value);
    };
    const locationChangeHandler = (event) => {
        setEnteredLocation(event.target.value);
    };
    const submitHandler = (event) => {
       event.preventDefault(); 

       const deliveryData = {
         title: enteredTitle, 
         vendor: enteredVendor,
         name: enteredname,
         recipient: enteredRecipient,
         location: enteredLocation,
         
       };
       props.onSaveDeliveryData(deliveryData);
       setEnteredTitle('');
       setEnteredVendor('');
       setEnteredname('');
       setEnteredRecipient('');
       setEnteredLocation('');
    };

    return ( 
        <form onSubmit={submitHandler}>
            <div className="details_title">Enter the needed details and search</div>
            <div className="new-delivery__controls">
                <div className="new-delivery__control">
                    <label> Order ID </label>
                    <input type="text" 
                    value={enteredTitle}
                     onChange={titleChangeHandler}/>
                </div>
                <div className="new-delivery__control">
                    <label> 3PL </label>
                    <input type="text" 
                    value={enteredname}
                     onChange={nameChangeHandler}/>
                </div>
                <div className="new-delivery__control">
                    <label> Recipient </label>
                    <input type="text" 
                    value={enteredRecipient}
                     onChange={recipientChangeHandler}/>
                </div>

                <div className="new-delivery__control">
                    <label> Location </label>
                    <input type="text" 
                    value={enteredLocation}
                     onChange={locationChangeHandler}/>
                </div>

                <div className="new-delivery__control">
                    <label> Vendor </label>
                    <input type="text" 
                    value={enteredVendor}
                     onChange={vendorChangeHandler}/>
                </div>
                 
            </div>

        </form>
     );
};
 
export default DeliveryForm;