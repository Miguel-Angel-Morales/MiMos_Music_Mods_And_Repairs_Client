import React from "react"
import { isStaff } from "../../utils/isStaff"
import "./Tickets.css"

export const TicketBody = ({ ticket, toggle }) => {

    const showButton = (ticket) => {
        if (ticket.condensed && ticket.canCondense) {
            return <button className="fakeLink" onClick={() => toggle(ticket)} ></button>
        }
        else if (!ticket.condensed && ticket.canCondense) {
            return <button className="fakeLink" onClick={() => toggle(ticket)} ></button>
        }
        return ""
    }

    return <div className="ticket__body">
        <i className="ticket__icon">{ticket.emergency ? "🚑" : ""}</i>
        {
            isStaff()
                ? <div className="ticket__customer">Customer: {ticket?.customer?.full_name}</div>
                : ""
        }

        <div className="ticket__description">
            {showButton(ticket)}
        </div>
    </div>

}
