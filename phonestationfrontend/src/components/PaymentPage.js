import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import './PaymentPage.css';
import LoadingComponent from "./LoadingComponent";

const PaymentPage = ({ }) => {
    const location = useLocation();
    const navigate = useNavigate();

    const [cardNumber, setCardNumber] = useState("");
    const [ccv, setCCV] = useState("");
    const [expirationDate, setExpirationDate] = useState("");

    if (location.state === null || location.state.selectedService === null) return <LoadingComponent />
    const selectedService = location.state.selectedService;

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    const handleCancel = () => {
        navigate('/services');
    };

    return (
        <div className="payment-page-container">
            <div className="payment-box">
                <h3>Payment for {selectedService.name}</h3>
                <p><b>Price:</b> {selectedService.price}</p>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Card Number</label>
                        <input
                            type="text"
                            value={cardNumber}
                            onChange={e => setCardNumber(e.target.value)}
                            placeholder="1234 5678 9012 3456"
                        />
                    </div>

                    <div className="form-group row">
                        <div className="col">
                            <label>Expiration Date</label>
                            <input
                                type="text"
                                value={expirationDate}
                                onChange={e => setExpirationDate(e.target.value)}
                                placeholder="MM/YY"
                            />
                        </div>

                        <div className="col">
                            <label>CCV</label>
                            <input
                                type="text"
                                value={ccv}
                                onChange={e => setCCV(e.target.value)}
                                placeholder="123"
                            />
                        </div>
                    </div>

                    <button type="submit" className="pay-button">Pay Now</button>
                </form>
            </div>
            <button className="cancel-button" onClick={handleCancel}>Cancel</button>
        </div>
    );
};

export default PaymentPage;
