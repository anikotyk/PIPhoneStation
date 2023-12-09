import React, { useState } from "react";
import './PaymentPage.css';
import LoadingComponent from "./LoadingComponent";
import MainPage from "./MainPage";

const PaymentPage = ({setContent, selectedService}) => {
    const [cardNumber, setCardNumber] = useState("");
    const [ccv, setCCV] = useState("");
    const [expirationDate, setExpirationDate] = useState("");

    if (selectedService === null) return <LoadingComponent />

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    const handleCancel = () => {
        setContent(<MainPage setContent={setContent}/>);
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
