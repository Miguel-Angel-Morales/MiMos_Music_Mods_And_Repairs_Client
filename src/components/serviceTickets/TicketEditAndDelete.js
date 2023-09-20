import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { fetchIt } from "../../utils/fetchIt"
import { useParams } from "react-router-dom"

export const TicketEditAndDelete = () => {

    
    const [ticket, setTicket] = useState({
        customer: { id: null, user: null }, // Default values based on the API response structure
        instrument: "",
        description: '',
        notes: '',
        date: '',
        modification: false,
        repair: false,
        setup: false,
        priority: false,
    });

    const [instruments, updateInstruments] = useState([]);
    const { ticketId } = useParams();
    const history = useHistory();


    useEffect(() => {
        fetchIt("http://localhost:8000/instruments")
            .then((instrument) => {
                updateInstruments(instrument)
            })
            .catch(() => updateInstruments([]))
    }, []);


    useEffect(() => {
        fetchIt(`http://localhost:8000/servicetickets/${ticketId}`)
            .then((data) => {
                setTicket(data);
            })
            .catch(() => setTicket({}));
    }, [ticketId]);


    const submitEditedTicket = (evt) => {
        evt.preventDefault()

        fetchIt(
            `http://localhost:8000/servicetickets/${ticketId}`,
            { method: "PUT", body: JSON.stringify(ticket) }
        )
            .then(() => history.push("/servicetickets"))
    }


    // Make a fetch for the instruments
    // make sure properties match
    // find out what history.push does
    // You need an instrument const, so that you can update, you will probably need use state so you can update your stuff. 

    return (
        <form className="ticketForm">
            <h2 className="ticketForm__title">Edit Service Ticket</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="instrument">Instrument</label>
                    <select
                        name="instrument"
                        className="form-control"
                        value={ticket.instrument.id} // Use the ID property
                        onChange={(evt) => {
                            const copy = { ...ticket };
                            copy.instrument.id = evt.target.value; // Update the ID property
                            setTicket(copy);
                        }}
                    >
                        <option value="">Select an instrument...</option>
                        {instruments.map((instrument) => (
                            <option
                                key={instrument.id}
                                value={instrument.id}
                            >
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
                            const copy = { ...ticket};
                            copy.date = evt.target.value;
                            setTicket(copy);
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
                                setTicket(copy)
                            }
                        }
                        required autoFocus
                        type="text" id="description"
                        className="form-control"
                        placeholder="What work would you like done?"
                        value={ticket.description}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="modification">Modification:</label>
                    <input
                        type="radio"
                        name="modification"
                        value="true"
                        checked={ticket.modification === true}
                        onChange={(evt) => {
                            const copy = { ...ticket };
                            copy.modification = evt.target.value === 'true';
                            setTicket(copy);
                        }}
                    />
                    <label htmlFor="modification">Yes</label>

                    <input
                        type="radio"
                        name="modification"
                        value="false"
                        checked={ticket.modification === false}
                        onChange={(evt) => {
                            const copy = { ...ticket };
                            copy.modification = evt.target.value === 'true';
                            setTicket(copy);
                        }}
                    />
                    <label htmlFor="modification">No</label>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="repair">Repair:</label>
                    <input
                        type="radio"
                        name="repair"
                        value="true"
                        checked={ticket.repair === true}
                        onChange={(evt) => {
                            const copy = { ...ticket };
                            copy.repair = evt.target.value === 'true';
                            setTicket(copy);
                        }}
                    />
                    <label htmlFor="repair">Yes</label>

                    <input
                        type="radio"
                        name="repair"
                        value="false"
                        checked={ticket.repair === false}
                        onChange={(evt) => {
                            const copy = { ...ticket };
                            copy.repair = evt.target.value === 'true';
                            setTicket(copy);
                        }}
                    />
                    <label htmlFor="repair">No</label>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="setup">Setup:</label>
                    <input
                        type="radio"
                        name="setup"
                        value="true"
                        checked={ticket.setup === true}
                        onChange={(evt) => {
                            const copy = { ...ticket };
                            copy.setup = evt.target.value === 'true';
                            setTicket(copy);
                        }}
                    />
                    <label htmlFor="setup">Yes</label>

                    <input
                        type="radio"
                        name="setup"
                        value="false"
                        checked={ticket.setup === false}
                        onChange={(evt) => {
                            const copy = { ...ticket };
                            copy.setup = evt.target.value === 'true';
                            setTicket(copy);
                        }}
                    />
                    <label htmlFor="setup">No</label>
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="priority">Priority:</label>
                    <input
                        type="radio"
                        name="priority"
                        value="true"
                        checked={ticket.priority === true}
                        onChange={(evt) => {
                            const copy = { ...ticket };
                            copy.priority = evt.target.value === 'true';
                            setTicket(copy);
                        }}
                    />
                    <label htmlFor="priority">Yes</label>

                    <input
                        type="radio"
                        name="priority"
                        value="false"
                        checked={ticket.priority === false}
                        onChange={(evt) => {
                            const copy = { ...ticket };
                            copy.priority = evt.target.value === 'true';
                            setTicket(copy);
                        }}
                    />
                    <label htmlFor="priority">No</label>
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
                                setTicket(copy)
                            }
                        }
                        required autoFocus
                        type="text" 
                        id="notes"
                        className="form-control"
                        placeholder="Notes for our techs"
                        value={ticket.notes}
                    />
                </div>
            </fieldset>
            <button onClick={submitEditedTicket} className="btn btn-primary">
                Submit Ticket
            </button>
        </form>
    )
}