import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { fetchIt } from "../../utils/fetchIt"
import { isStaff } from "../../utils/isStaff"
import { useCondensed } from "./useCondensed"
import { TicketCard } from "./TicketCard"
import "./Tickets.css"

export const TicketList = () => {
    const [active, setActive] = useState("")
    const { toggle, setOriginal, condensed: servicetickets } = useCondensed({ limit: 40, field: "description" })
    const history = useHistory()

    useEffect(() => {
        fetchIt("http://localhost:8000/servicetickets")
            .then((servicetickets) => {
                setOriginal(servicetickets)
            })
            .catch(() => setOriginal([]))
    }, [])

    useEffect(() => {
        const activeTicketCount = servicetickets.filter(t => t.date_completed === null).length
        if (isStaff()) {
            setActive(`There are ${activeTicketCount} open servicetickets`)
        }
        else {
            setActive(`You have ${activeTicketCount} open servicetickets`)
        }
    }, [servicetickets])

    const toShowOrNotToShowTheButton = () => {
        if (isStaff()) {
            return ""
        }
        else {
            return <button className="actions__create"
                onClick={() => history.push("/servicetickets/create")}>Create Ticket</button>
        }
    }

    const filterservicetickets = (status) => {
        fetchIt(`http://localhost:8000/servicetickets?status=${status}`)
            .then((servicetickets) => {
                setOriginal(servicetickets)
            })
            .catch(() => setOriginal([]))
    }

    return <>
        <div>
            <button onClick={() => filterservicetickets("done")}>Show Done</button>
            <button onClick={() => filterservicetickets("all")}>Show All</button>
        </div>
        <div className="actions">{toShowOrNotToShowTheButton()}</div>
        <div className="activeservicetickets">{active}</div>
        <article className="servicetickets">
            { servicetickets.map(ticket => <TicketCard key={`ticket--${ticket.id}`} ticket={ticket} toggle={toggle} />) }
        </article>
    </>
}
