import React, { useState } from 'react'
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { API_ENDPOINT } from '../../config';
import { useDispatch } from 'react-redux'
import { clientAdded } from '../../state/slices/clientsSlice'

const AddClient = (props) => {
    const [inputs, setInputs] = useState({ firstName: '', surname: '', email: '', country: '', owner: '' })

    const dispatch = useDispatch()

    const handleInput = e => setInputs({ ...inputs, [e.target.name]: e.target.value })

    const isStateSet = () => {
        let isStateSet = true
        const stateKeys = Object.keys(inputs)
        stateKeys.forEach(sk => inputs[sk] ? null : isStateSet = false)

        return isStateSet
    }

    const saveClient = async (client) => {
        // await axios.post(`${API_ENDPOINT}/client`, client)
        // save client

    }

    const clearInputs = () => setInputs({
        firstName: "",
        surname: "",
        email: "",
        country: "",
        owner: ""
    })

    const addClient = () => {
        if (isStateSet()) {
            const client = {
                name: `${inputs.firstName} ${inputs.surname}`,
                email: inputs.email,
                firstContact: new Date(),
                owner: inputs.owner,
                country: inputs.country
            }
            console.log(addClient)
            // saveClient(client)
            dispatch(clientAdded(client))
            clearInputs()
            props.showSnackbar("Added")
        } else {
            props.showSnackbar("Not added")
        }
    }

    return (
        <div id="create-action">
            <h4>ADD CLIENT</h4>

            <div id="input-fields">


                <TextField
                    className="standard-name"
                    label="First Name"
                    name="firstName"
                    value={inputs.firstName} onChange={handleInput}
                    margin="none"
                />

                <TextField
                    className="standard-name"
                    label="Surname"
                    name="surname"
                    value={inputs.surname} onChange={handleInput}
                    margin="none"
                />

                <TextField
                    className="standard-name"
                    label="Email"
                    name="email"
                    value={inputs.email} onChange={handleInput}
                    margin="none"
                />

                <TextField
                    className="standard-name"
                    label="Country"
                    name="country"
                    value={inputs.country} onChange={handleInput}
                    margin="none"
                />

                <TextField
                    className="standard-name"
                    label="Owner"
                    name="owner" value={inputs.owner} onChange={handleInput}
                    margin="none"
                />

                <Button id="add-client-btn" onClick={addClient} variant="contained" color="primary">Add New Client</Button>

            </div>
        </div>
    )
}

export default AddClient