import React, { useEffect, useState, useCallback } from "react"
import { useHistory, useParams } from "react-router-dom"
import { fetchIt } from "../../utils/fetchIt"
import { isStaff } from "../../utils/isStaff"

export const Ticket = () => {
    const [ticket, loadTicket] = useState({})
    const [employees, syncEmployees] = useState([])
    const { ticketId } = useParams()
    const history = useHistory()

    const fetchTicket = useCallback(() => {
        return fetchIt(`http://localhost:8000/servicetickets/${ticketId}`)
            .then(loadTicket)
            .catch(() => loadTicket({}))
    }, [ticketId])

    useEffect(
        () => {
            fetchTicket()
        },
        [ticketId, fetchTicket]
    )

    useEffect(
        () => {
            fetchIt("http://localhost:8000/employees")
                .then(syncEmployees)
                .catch(() => syncEmployees([]))
        }, []
    )

    const updateTicket = (evt) => {
        const updatedTicket = { ...ticket, employee: parseInt(evt.target.value) }

        fetchIt(
            `http://localhost:8000/servicetickets/${ticketId}`,
            {
                method: "PUT",
                body: JSON.stringify(updatedTicket)
            }
        ).then(fetchTicket)
    }



    const employeePicker = (ticket) => {
        if (isStaff()) {
            return <div className="ticket__employee">Assigned to {" "}
                <select
                    value={ticket?.employee?.id}
                    onChange={updateTicket}>
                    <option value="0">Choose...</option>
                    {
                        employees.map(e => <option key={`employee--${e.id}`} value={e.id}>{e.full_name}</option>)
                    }
                </select>
            </div>
        }
        else {
            return <div className="ticket__employee">Assigned to {ticket?.employee?.full_name ?? "no one"}</div>
        }
    }

    return (
        <>
        </>
    )
}
