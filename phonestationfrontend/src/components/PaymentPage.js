import React, { useState } from "react";
import './PaymentPage.css';
import LoadingComponent from "./LoadingComponent";
import MainPage from "./MainPage";
import {addServiceToClient, editService} from "../DBRequests";

const PaymentPage = ({setContent, selectedService, client}) => {
    const [cardNumber, setCardNumber] = useState("");
    const [ccv, setCCV] = useState("");
    const [expirationDate, setExpirationDate] = useState("");

    if (selectedService === null) return <LoadingComponent />

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!isValidCreditCard(cardNumber)){
            alert('Credit Card number is incorrect');
            return;
        }
        if(!isValidExpireDate(expirationDate)){
            alert('Expiration Date is incorrect');
            return;
        }
        if(!isValidCvv(ccv)){
            alert('CVV is incorrect');
            return;
        }

        addServiceToClient(client.id, selectedService.id);
        setTimeout(function() {
            alert('Payment success');
        }, 1);
        setContent(<MainPage setContent={setContent}/>);
    };

    const handleCancel = () => {
        setContent(<MainPage setContent={setContent}/>);
    };

    function isValidCreditCard(cardNumber) {
        const pattern = /^\d{4} \d{4} \d{4} \d{4}$/;
        return pattern.test(cardNumber);
    }

    function isValidExpireDate(expireDate) {
        const pattern = /^(0[1-9]|1[0-2])\/\d{2}$/;
        return pattern.test(expireDate);
    }

    function isValidCvv(cvv) {
        const pattern = /^\d{3}$/;
        return pattern.test(cvv);
    }

    const inputCardNumber = (event) => {
        let input = event.target.value.replace(/\D/g, ''); // Remove non-numeric characters

        // Apply formatting: XXXX XXXX XXXX XXXX (4 digits per group)
        input = input.replace(/(\d{4})(?=\d)/g, '$1 '); // Add space after every 4 digits

        if (input.length > 19) {
            input = input.slice(0, 19);
        }

        event.target.value = input;

        setCardNumber(input)
    }

    const inputExpireDate = (event) => {
        let input = event.target.value.replace(/\D/g, ''); // Remove non-numeric characters

        if (input.length > 4) {
            input = input.slice(0, 4); // Limit input to 4 characters (MMYY)
        }

        // Apply formatting: MM/YY
        if (input.length > 2) {
            input = input.slice(0, 2) + '/' + input.slice(2); // Add '/' after MM
        }

        event.target.value = input;
        setExpirationDate(input)
    }

    const inputCvv = (event) => {
        let input = event.target.value.replace(/\D/g, ''); // Remove non-numeric characters

        if (input.length > 3) {
            input = input.slice(0, 3); // Limit input to 4 characters (MMYY)
        }

        event.target.value = input;
        setCCV(input)
    }

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
                            onChange={e => inputCardNumber(e)}
                            placeholder="1234 5678 9012 3456"
                        />
                    </div>

                    <div className="form-group row">
                        <div className="col">
                            <label>Expiration Date</label>
                            <input
                                type="text"
                                value={expirationDate}
                                onChange={e => inputExpireDate(e)}
                                placeholder="MM/YY"
                            />
                        </div>

                        <div className="col">
                            <label>CCV</label>
                            <input
                                type="text"
                                value={ccv}
                                onChange={e => inputCvv(e)}
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
