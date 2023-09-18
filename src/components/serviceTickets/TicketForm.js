import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { fetchIt } from "../../utils/fetchIt"

export const TicketForm = () => {

    const [ticket, updateTicket] = useState({
        customer: "",
        employee: "",
        instrument: "",
        description: "",
        notes: "",
        date: "",
        modification: false,
        repair: false,
        setup: false,
        priority: false,
    });

    const [instruments, updateInstruments] = useState([]);
    const history = useHistory();


    useEffect(() => {
        chooseInstruments();
    }, []);

    const chooseInstruments = () => {
        fetchIt("http://localhost:8000/instruments")
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json(); // Parse response as JSON
            })
            .then((data) => {
                // Log the response data and update the instruments state
                console.log("Instruments data:", data);
                updateInstruments(data);
            })
            .catch((error) => {
                console.error("Error fetching instruments:", error);
            });
    };


    const submitTicket = (evt) => {
        evt.preventDefault()

        fetchIt(
            "http://localhost:8000/servicetickets",
            { method: "POST", body: JSON.stringify(ticket) }
        )
            .then(() => history.push("/servicetickets"))
    }


    // Make a fetch for the instruments
    // make sure properties match
    // find out what history.push does
    // You need an instrument const, so that you can update, you will probably need use state so you can update your stuff. 

    return (
        <form className="ticketForm">
            <h2 className="ticketForm__title">New Service Ticket</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="instrument">Instrument</label>
                    <select
                        name="instrument"
                        className="form-control"
                        value={ticket.instrument}
                        onChange={(evt) => {
                            const copy = { ...ticket };
                            copy.instrument = evt.target.value;
                            updateTicket(copy);
                        }}
                    >
                        <option value="">Select an instrument...</option>
                        {instruments.map((instrument) => (
                            <option key={instrument.id} value={instrument.id}>
                                {instrument.instrument_name}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="date">Date: </label>
                    <input
                        type="date"
                        name="date"
                        required
                        autoFocus
                        className="form-control"
                        value={ticket.date}
                        onChange={(evt) => {
                            const copy = { ...ticket };
                            copy.date = evt.target.value;
                            updateTicket(copy);
                        }}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <input
                        onChange={
                            (evt) => {
                                const copy = { ...ticket }
                                copy.description = evt.target.value
                                updateTicket(copy)
                            }
                        }
                        required autoFocus
                        type="text" id="description"
                        className="form-control"
                        placeholder="What work would you like done?"
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Modification:</label>
                    <input
                        onChange={
                            (evt) => {
                                const copy = { ...ticket }
                                copy.modification = evt.target.checked
                                updateTicket(copy)
                            }
                        }
                        type="checkbox" />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Repair:</label>
                    <input
                        onChange={
                            (evt) => {
                                const copy = { ...ticket }
                                copy.repair = evt.target.checked
                                updateTicket(copy)
                            }
                        }
                        type="checkbox" />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Setup:</label>
                    <input
                        onChange={
                            (evt) => {
                                const copy = { ...ticket }
                                copy.setup = evt.target.checked
                                updateTicket(copy)
                            }
                        }
                        type="checkbox" />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Priority:</label>
                    <input
                        onChange={
                            (evt) => {
                                const copy = { ...ticket }
                                copy.priority = evt.target.checked
                                updateTicket(copy)
                            }
                        }
                        type="checkbox" />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="notes">Notes:</label>
                    <input
                        onChange={
                            (evt) => {
                                const copy = { ...ticket }
                                copy.notes = evt.target.value
                                updateTicket(copy)
                            }
                        }
                        required autoFocus
                        type="text" id="notes"
                        className="form-control"
                        placeholder="Notes for our techs"
                    />
                </div>
            </fieldset>
            <button onClick={submitTicket} className="btn btn-primary">
                Submit Ticket
            </button>
        </form>
    )
}