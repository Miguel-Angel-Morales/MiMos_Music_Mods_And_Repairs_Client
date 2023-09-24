import React from "react";
import { TicketHeader } from "./TicketHeader";
import { TicketBody } from "./TicketBody";
import { TicketFooter } from "./TicketFooter";
import { useHistory } from "react-router-dom";
import { fetchIt } from "../../utils/fetchIt"; // Make sure to import fetchIt
import "./Tickets.css";

export const TicketCard = ({ ticket, toggle }) => {
    const history = useHistory();

    const deleteTicket = () => {
        fetchIt(`http://localhost:8000/servicetickets/${ticket.id}`, {
            method: "DELETE",
        })
            .then(() => history.push("/servicetickets"))
            .catch((error) => console.error("Error deleting ticket:", error));
    };

    return (
        <section className={`ticket ${ticket.emergency ? 'emergency' : ''}`}>
            <TicketHeader ticket={ticket} />
            <TicketBody ticket={ticket} toggle={toggle} />
            <TicketFooter ticket={ticket} />
            <div className="button-container">
                <button className="editButton" onClick={() => history.push(`/servicetickets/edit/${ticket.id}`)}>Edit</button>
                <button className="deleteButton" onClick={deleteTicket}>Delete</button>
            </div>
        </section>
    );
};
