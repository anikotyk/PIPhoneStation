import Client from "./Client";

export let isAdmin = async (email, e) => {
    try {
        let res = await fetch("http://localhost:8080/phonestation/is-admin", {
            method: "POST",
            body: JSON.stringify({
                clientEmail: email,
            }),
        });

        if (res.status === 200) {
            let resText = await res.text();
            return resText.valueOf().trim()=="true";
        } else {
            console.log("Some error occurred.");
        }
    } catch (err) {
        console.log(err);
    }
}

export let getAllClients = async (e) => {
    try {
        let res = await fetch("http://localhost:8080/phonestation/get-all-clients", {
            method: "GET"
        });
        if (res.status === 200) {
            let resText = await res.text();
            let jsonObject = JSON.parse(resText);
            return jsonObject;
        } else {
            console.log("Some error occurred");
        }
    } catch (err) {
        console.log(err);
    }
}

export let getClient = async (email, e) => {
    try {
        let res = await fetch("http://localhost:8080/phonestation/get-client", {
            method: "POST",
            body: JSON.stringify({
                clientEmail: email,
            }),
        });

        if (res.status === 200) {
            let resText = await res.text();
            let jsonObject = JSON.parse(resText);
            return Client.from(jsonObject);
        } else {
            console.log("Some error occurred.");
        }
    } catch (err) {
        console.log(err);
    }
}

export let setClientPhone = async (clientId, clientPhone, e) => {
    try {
        let res = await fetch("http://localhost:8080/phonestation/set-client-phone", {
            method: "POST",
            body: JSON.stringify({
                clientId: clientId,
                clientPhone: clientPhone
            }),
        });

        if (res.status === 200) {
            let resText = await res.text();
            let jsonObject = JSON.parse(resText);
            return jsonObject;
        } else {
            console.log("Some error occurred.");
        }
    } catch (err) {
        console.log(err);
    }
}

export let setClientUsername = async (clientId, clientUsername, e) => {
    try {
        let res = await fetch("http://localhost:8080/phonestation/set-client-username", {
            method: "POST",
            body: JSON.stringify({
                clientId: clientId,
                clientUsername: clientUsername
            }),
        });

        if (res.status === 200) {
            let resText = await res.text();
            let jsonObject = JSON.parse(resText);
            return jsonObject;
        } else {
            console.log("Some error occurred.");
        }
    } catch (err) {
        console.log(err);
    }
}

export let onClientVisited = async (clientId, e) => {
    try {
        let res = await fetch("http://localhost:8080/phonestation/on-client-visited", {
            method: "POST",
            body: JSON.stringify({
                clientId: clientId
            }),
        });

        if (res.status === 200) {
            let resText = await res.text();
            let jsonObject = JSON.parse(resText);
            return jsonObject;
        } else {
            console.log("Some error occurred.");
        }
    } catch (err) {
        console.log(err);
    }
}

export let deleteInactiveClients = async ( e) => {
    try {
        let res = await fetch("http://localhost:8080/phonestation/delete-inactive-clients", {
            method: "POST"
        });

        if (res.status === 200) {
            let resText = await res.text();
            let jsonObject = JSON.parse(resText);
            return jsonObject;
        } else {
            console.log("Some error occurred.");
        }
    } catch (err) {
        console.log(err);
    }
}

export let getCountActiveUsersInPeriod = async (e) => {
    try {
        let res = await fetch("http://localhost:8080/phonestation/get-count-active-users-in-period", {
            method: "POST"
        });

        if (res.status === 200) {
            let resText = await res.text();
            let jsonObject = JSON.parse(resText);
            return jsonObject;
        } else {
            console.log("Some error occurred.");
        }
    } catch (err) {
        console.log(err);
    }
}

export let addServiceToClient = async (clientId, serviceId, e) => {
    try {
        let res = await fetch("http://localhost:8080/phonestation/add-service-to-client", {
            method: "POST",
            body: JSON.stringify({
                clientId: clientId,
                serviceId: serviceId
            }),
        });

        if (res.status === 200) {
            let resText = await res.text();
            return resText.valueOf().trim()=="true";
        } else {
            console.log("Some error occurred.");
        }
    } catch (err) {
        console.log(err);
    }
}

export let removeServiceFromClient = async (clientId, serviceId, e) => {
    try {
        let res = await fetch("http://localhost:8080/phonestation/remove-service-from-client", {
            method: "POST",
            body: JSON.stringify({
                clientId: clientId,
                serviceId: serviceId
            }),
        });

        if (res.status === 200) {
            let resText = await res.text();
            return resText.valueOf().trim()=="true";
        } else {
            console.log("Some error occurred.");
        }
    } catch (err) {
        console.log(err);
    }
}

export let getAllClientActiveServices = async (clientId, e) => {
    try {
        let res = await fetch("http://localhost:8080/phonestation/get-all-client-active-services", {
            method: "POST",
            body: JSON.stringify({
                clientId: clientId,
            }),
        });

        if (res.status === 200) {
            let resText = await res.text();
            let jsonObject = JSON.parse(resText);
            return jsonObject;
        } else {
            console.log("Some error occurred.");
        }
    } catch (err) {
        console.log(err);
    }
}

export let addClientPayment = async (clientId, serviceId, e) => {
    try {
        let res = await fetch("http://localhost:8080/phonestation/add-client-payment", {
            method: "POST",
            body: JSON.stringify({
                clientId: clientId,
                serviceId: serviceId
            }),
        });

        if (res.status === 200) {
            let resText = await res.text();
            return resText.valueOf().trim()=="true";
        } else {
            console.log("Some error occurred.");
        }
    } catch (err) {
        console.log(err);
    }
}

export let getAllClientPayments = async (clientId, e) => {
    try {
        let res = await fetch("http://localhost:8080/phonestation/get-all-client-payments", {
            method: "POST",
            body: JSON.stringify({
                clientId: clientId,
            }),
        });

        if (res.status === 200) {
            let resText = await res.text();
            let jsonObject = JSON.parse(resText);
            return jsonObject;
        } else {
            console.log("Some error occurred.");
        }
    } catch (err) {
        console.log(err);
    }
}

export let getAllPaymentsInPeriod = async (daysCount, e) => {
    try {
        let res = await fetch("http://localhost:8080/phonestation/get-all-payments-in-period", {
            method: "POST",
            body: JSON.stringify({
                daysCount: daysCount,
            }),
        });

        if (res.status === 200) {
            let resText = await res.text();
            let jsonObject = JSON.parse(resText);
            return jsonObject;
        } else {
            console.log("Some error occurred.");
        }
    } catch (err) {
        console.log(err);
    }
}

export let getAllServices = async (e) => {
    try {
        let res = await fetch("http://localhost:8080/phonestation/get-all-services", {
            method: "GET"
        });
        if (res.status === 200) {
            let resText = await res.text();
            let jsonObject = JSON.parse(resText);
            return jsonObject;
        } else {
            console.log("Some error occurred");
        }
    } catch (err) {
        console.log(err);
    }
}

export let addService = async (price, name, description, isTariff, e) => {
    try {
        let res = await fetch("http://localhost:8080/phonestation/add-service", {
            method: "POST",
            body: JSON.stringify({
                price: price,
                name: name,
                description: description,
                isTariff: isTariff,
            }),
        });

        if (res.status === 200) {
            let resText = await res.text();
            return resText.valueOf().trim()=="true";
        } else {
            console.log("Some error occurred.");
        }
    } catch (err) {
        console.log(err);
    }
}

export let deleteService = async (serviceId, e) => {
    try {
        let res = await fetch("http://localhost:8080/phonestation/delete-service", {
            method: "POST",
            body: JSON.stringify({
                serviceId: serviceId
            }),
        });

        if (res.status === 200) {
            let resText = await res.text();
            return resText.valueOf().trim()=="true";
        } else {
            console.log("Some error occurred.");
        }
    } catch (err) {
        console.log(err);
    }
}

export let editService = async (serviceId, price, name, description, isTariff, e) => {
    try {
        let res = await fetch("http://localhost:8080/phonestation/edit-service", {
            method: "POST",
            body: JSON.stringify({
                serviceId: serviceId,
                price: price,
                name: name,
                description: description,
                isTariff: isTariff,
            }),
        });

        if (res.status === 200) {
            let resText = await res.text();
            return resText.valueOf().trim()=="true";
        } else {
            console.log("Some error occurred.");
        }
    } catch (err) {
        console.log(err);
    }
}