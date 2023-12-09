import LoadingComponent from "./LoadingComponent";
import {useState} from "react";
import {
    addService,
    getAllClientsWithActiveServices
} from "../DBRequests";
import {format} from "date-fns";
import {deleteInactiveClients} from "../DBRequests";
import React from "react";
import {Table, TableBody, TableRow, TableCell} from '@material-ui/core';

function GetUsersList(allClients) {
    const listUsers = allClients.map(client => {
            let elem = <li className="list-group-item">
                <div className="d-flex justify-content-between align-items-center">
                    <div>
                        <div className="d-flex flex-client-info">
                            <div className="fw-bold">{client.username}</div>

                        </div>
                        <div className="text-muted">{client.email}</div>
                        <div className="text-muted">{client.phonenumber.toString()}</div>
                        <div className="text-muted">{format(client.lastVisitDate, 'dd.MM.yyyy').toString()}</div>
                    </div>
                </div>
            </li>;

            return elem;
        }
    );

    return listUsers;
}

function GetUsersTable(allClientsWithActiveServices) {

    if (allClientsWithActiveServices != null) {
        const userTableData = Object.keys(allClientsWithActiveServices).map((clientKey) => {
            if (allClientsWithActiveServices.hasOwnProperty(clientKey)) {
                const servicesArray = allClientsWithActiveServices[clientKey];

                let tariffs = "";
                let services = "";
                let price = 0;

                servicesArray.forEach((service, index) => {
                    console.log("service", service);
                    if (service.isTariff) {
                        tariffs += service.name;
                        /*if (index < servicesArray.length - 1) {
                            tariffs += ', ';
                        }*/
                    }
                    else {
                        services += service.name;
                        if (index < servicesArray.length - 1) {
                            services += ', ';
                        }
                    }
                    price += service.price;

                });

                if (tariffs == "")
                    tariffs = "-";
                if (services == "")
                    services = "-";

                let elem =
                    <TableRow
                        key={12345}
                        sx={{'&:last-child td, &:last-child th': {border: 0}}}
                    >
                        <TableCell component="th" scope="row">
                            {clientKey.match(/username=([^,]*)/)[1]}
                        </TableCell>
                        <TableCell align="center">{clientKey.match(/phonenumber=([^,]*)/)[1]}</TableCell>
                        <TableCell align="center">{clientKey.match(/email=([^,]*)/)[1]}</TableCell>
                        <TableCell align="center">{clientKey.match(/lastVisitDate=([^)]*)/)[1]}</TableCell>
                        <TableCell align="center">{tariffs}</TableCell>
                        <TableCell align="center">{services}</TableCell>
                        <TableCell align="center">{price}</TableCell>
                    </TableRow>
                return elem;
            }
        });
        return userTableData;
    }
}

const handleDeleteInactiveClients = async () => {
    try {
        const response = await deleteInactiveClients();
        if (response) {
            alert("Inactive clients successfully deleted");
            window.location.reload();
        }
        else
            alert("An error occurred while adding a service");

    } catch (error) {
        console.error('Error:', error);
    }
};

function openModal() {
    document.getElementById('myModalConfirm').style.display = 'block';
}

function closeModal() {
    document.getElementById('myModalConfirm').style.display = 'none';
}

function AddService() {
    const nameService = document.getElementById("name_input").value;
    const priceService = document.getElementById("price_input").value;
    const isTariff = document.getElementById("is_tariff").checked;
    const descriptionService = document.getElementById("description_input").value;
    if (addService(priceService, nameService, descriptionService, isTariff)) {
        alert("Service added successfully");
        closeModal();
        // Reset the input values to empty strings
        document.getElementById("name_input").value = "";
        document.getElementById("price_input").value = "";
        document.getElementById("is_tariff").checked = false;
        document.getElementById("description_input").value = "";
    }
    else
        alert("An error occurred while adding a service");
}

const AdminPage = () => {
    let [allClientsWithActiveServices, setAllClientsWithActiveServices] = useState(null);

    if (allClientsWithActiveServices == null) {
        getAllClientsWithActiveServices().then(r => {
            let clientServiceMapping = r;
            setAllClientsWithActiveServices(clientServiceMapping);
        });
    }

    if (allClientsWithActiveServices == null) return <LoadingComponent/>
    const usersTable = GetUsersTable(allClientsWithActiveServices);

    return (
        <div>

            <h3>
                <center>Admin Page</center>
            </h3>
            <div className="container">
                <div className="row justify-content-end">
                    <div className="col-2" style={{display: 'flex', alignItems: 'center'}}>
                        <button type="button" class="btn btn-dark" onClick={() => handleDeleteInactiveClients()}>Delete Inactive
                            Clients
                        </button>
                    </div>
                    <div className="col-2" style={{display: 'flex', alignItems: 'center'}}>
                        <button className="btn btn-primary" onClick={() => openModal()}>Add New Service</button>
                    </div>
                </div>
            </div>
            <h3>
                <center>Clients</center>
            </h3>
            <Table class="table table-striped table-hover" sx={{minWidth: 650}} aria-label="simple table">
                <TableRow>
                    <TableCell><b>Username</b></TableCell>
                    <TableCell align="center"><b>Phone number</b></TableCell>
                    <TableCell align="center"><b>Email</b></TableCell>
                    <TableCell align="center"><b>Date of last visit</b></TableCell>
                    <TableCell align="center"><b>Current tariff</b></TableCell>
                    <TableCell align="center"><b>Services</b></TableCell>
                    <TableCell align="center"><b>Price</b></TableCell>
                </TableRow>
                <TableBody>
                    {usersTable}
                </TableBody>
            </Table>

            <div>

                <div id="myModalConfirm" className="modal">
                    <div className="modal-content center-text">
                        <span class="close right-text" onClick={() => closeModal()}>&times;</span>
                        <h3>
                            <center>Add Service</center>
                        </h3>
                        <form>
                            <div className="form-group m-2" align="left">
                                <label htmlFor="name_input">Name</label>
                                <input type="text" className="form-control" id="name_input" placeholder="Enter name" />
                            </div>
                            <div className="form-group m-2" align="left">
                                <label htmlFor="price_input">Price</label>
                                <input type="number" className="form-control" id="price_input" placeholder="Enter price" />
                            </div>
                            <div className="form-check m-2 mx-lg-3" align="left">
                                <input type="checkbox" className="form-check-input" id="is_tariff" />
                                <label className="form-check-label" htmlFor="is_tariff">Is Tariff?</label>
                            </div>
                            <div className="form-group m-2" align="left">
                                <label htmlFor="description_input">Description</label>
                                <input type="text" className="form-control" id="description_input" placeholder="Enter description" />
                            </div>
                            <button type="button" className="btn btn-primary m-2" onClick={() => AddService()}>Add Service</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminPage;