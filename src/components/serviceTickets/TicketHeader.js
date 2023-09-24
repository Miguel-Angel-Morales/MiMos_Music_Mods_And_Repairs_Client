import React from "react";
import { Link } from "react-router-dom";
import "./Tickets.css";

export const TicketHeader = ({ ticket }) => {
    return (
        <header className="ticket__header">
            <div className="ticket__customer">
                <Link to={`/servicetickets/${ticket.id}`}>Ticket #{ticket.id}</Link>
            </div>
            <div className="ticket__instrument">
                Instrument: {ticket.instrument.instrument_name}
            </div>
            <div className="ticket__date">
                Date: {ticket.date}
            </div>
            <div className="ticket__description">
                Description: {ticket.description}
            </div>
            <div className="ticket__modification">
                Modification: {ticket.modification ? "Yes" : "No"}
            </div>
            <div className="ticket__repair">
                Repair: {ticket.repair ? "Yes" : "No"}
            </div>
            <div className="ticket__setup">
                Setup: {ticket.setup ? "Yes" : "No"}
            </div>
            <div className="ticket__priority">
                Priority: {ticket.priority ? "Yes" : "No"}
            </div>
            <div className="ticket__notes">
                Notes: {ticket.notes}
            </div>
        </header>
    );
};
