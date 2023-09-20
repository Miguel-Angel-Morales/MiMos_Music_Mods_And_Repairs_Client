import React from "react"
import { TicketHeader } from "./TicketHeader"
import { TicketBody } from "./TicketBody"
import { TicketFooter } from "./TicketFooter"
import { useHistory} from "react-router-dom"
import "./Tickets.css"


export const TicketCard = ({ ticket, toggle }) => {
    
    const history = useHistory();
    
    return <section className={`ticket ${ticket.emergency ? 'emergency' : ''}`}>

        <TicketHeader ticket={ticket} />
        <TicketBody ticket={ticket} toggle={toggle} />
        <TicketFooter ticket={ticket} />
        <button onClick={() => history.push(`/servicetickets/edit/${ticket.id}`)}>Edit</button>

    </section>
}
