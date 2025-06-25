import React, {useState} from "react";
import './DeliveryForm.css';

const DeliveryForm = ({ onSearch }) => {
   const [formData, setFormData] = useState({
     orderId: '',
     recipient: '',
     vendor: '',
     location: '',
     tpl: '',
     rider: ''
   });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Trigger search on each change (or you can remove this and only search on button click)
        onSearch({
            ...formData,
            [name]: value
        });
    };

    return ( 
        <form>
            <div className="details_title">Enter the needed details and click search</div>
            <div className="new-delivery__controls">
                <div className="new-delivery__control">
                    <label> Order ID </label>
                    <input 
                      type="text"  
                      placeholder="A0M600"
                      name="orderId"
                      value={formData.orderId}
                      onChange={handleChange}
                    />
                </div>
                <div className="new-delivery__control">
                    <label> Recipient </label>
                    <input 
                      type="text"  
                      placeholder="Recipient name"
                      name="recipient"
                      value={formData.recipient}
                      onChange={handleChange}
                    />
                </div>
                <div className="new-delivery__control">
                    <label> Vendor </label>
                    <input 
                      type="text"  
                      placeholder="Vendor name"
                      name="vendor"
                      value={formData.vendor}
                      onChange={handleChange}
                    />
                </div>
                <div className="new-delivery__control">
                    <label> Location </label>
                    <input 
                      type="text"  
                      placeholder="Location"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                    />
                </div>
                <div className="new-delivery__control">
                    <label> 3PL </label>
                    <input 
                      type="text"  
                      placeholder="3PL"
                      name="tpl"
                      value={formData.tpl}
                      onChange={handleChange}
                    />
                </div>
                <div className="new-delivery__control">
                    <label> Rider </label>
                    <input 
                      type="text"  
                      placeholder="Rider name"
                      name="rider"
                      value={formData.rider}
                      onChange={handleChange}
                    />
                </div>
            </div>
        </form>
     );
};
 
export default DeliveryForm;