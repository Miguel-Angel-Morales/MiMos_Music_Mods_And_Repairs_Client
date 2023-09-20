import React, { useEffect, useRef, useState } from "react"
import { useHistory } from "react-router-dom"
import "./Login.css"
import { Employee } from "../employees/Employee"

export const EmployeeRegister = (props) => {
    const [employee, setEmployee] = useState({ "account_type": "employee" })
    const [serverFeedback, setFeedback] = useState("")
    const [specialties, updateSpecialties] = useState([]);
    const conflictDialog = useRef()
    const history = useHistory()

    const handleRegister = (e) => {
        e.preventDefault()
        fetch("http://localhost:8000/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(employee)
        })
            .then(res => {
                if (res.status === 200) {
                    return res.json()
                }
                return res.json().then((json) => {
                    throw new Error(JSON.stringify(json))
                });
            })
            .then(createdUser => {
                localStorage.setItem("musicrepairs", JSON.stringify(createdUser))
                history.push("/")
            })
            .catch(error => {
                setFeedback(JSON.parse(error.message).message)
            })
    }

    useEffect(() => {
        if (serverFeedback !== "") {
            conflictDialog.current.showModal()
        }
    }, [serverFeedback])

    const updateEmployee = (evt) => {
        const copy = { ...employee }
        copy[evt.target.id] = evt.target.value
        setEmployee(copy)
    }



useEffect(() => {
    fetch("http://localhost:8000/specialties")
        .then((response) => response.json()) // Parse the response as JSON
        .then((data) => {
            updateSpecialties(data); // Update the specialties array
        })
}, []);



    return (
        <main style={{ textAlign: "center" }}>
            <dialog className="dialog dialog--password" ref={conflictDialog}>
                <div>{serverFeedback}</div>
                <button className="button--close"
                    onClick={e => conflictDialog.current.close()}>Close</button>
            </dialog>

            <form className="form--login" onSubmit={handleRegister}>
                <h1 className="h3 mb-3 font-weight-normal">Welcome to the team</h1>
                <fieldset>
                    <label htmlFor="first_name"> First Name </label>
                    <input onChange={updateEmployee}
                        type="text" id="first_name" className="form-control"
                        placeholder="Enter your first name" required autoFocus />
                </fieldset>
                <fieldset>
                    <label htmlFor="last_name"> Last Name </label>
                    <input onChange={updateEmployee}
                        type="text" id="last_name" className="form-control"
                        placeholder="Enter your last name" required />
                </fieldset>
                <fieldset>
                    <div className="form-control">
                        <label htmlFor="specialty"> Specialty </label>
                        <select
                            name="specialty"
                            className="form-control"
                            value={employee.specialty}
                            onChange={(evt) => {
                                const copy = { ...employee };
                                copy.specialty = evt.target.value;
                                setEmployee(copy); // Update the employee state
                            }}
                        >
                            <option value="">Select specialty</option>
                            {specialties.map((specialty) => (
                                <option key={specialty.id} value={specialty.id}>
                                    {specialty.specialty_name}
                                </option>
                            ))}
                        </select>
                    </div>
                </fieldset>
                <fieldset>
                    <label htmlFor="email"> Email address </label>
                    <input onChange={updateEmployee}
                        type="email"
                        id="email"
                        className="form-control"
                        placeholder="Email address" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="password"> Password </label>
                    <input onChange={updateEmployee}
                        type="password"
                        id="password"
                        className="form-control" required />
                </fieldset>
                <fieldset>
                    <button type="submit"> Register </button>
                </fieldset>
            </form>
        </main>
    )
}

