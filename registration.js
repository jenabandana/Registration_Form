import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Table, Form, Button, Alert } from 'react-bootstrap';

const Applogin = () => {
    const [users, setUsers] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [dob, setDOB] = useState('');
    const [city, setCity] = useState('');
    const [pincode, setPincode] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleRegister = (e) => {
        e.preventDefault();
        setErrorMessage('');

        // Check if age is greater than 18
        const today = new Date();
        const dobDate = new Date(dob);
        const age = today.getFullYear() - dobDate.getFullYear();
        if (age < 18) {
            setErrorMessage('You must be at least 18 years old to register.');
            return;
        }

        // Check if email is unique
        if (users.some((user) => user.email === email)) {
            setErrorMessage('Email is already registered.');
            return;
        }

        // Validate pincode
        if (pincode.length !== 6 || !/^\d+$/.test(pincode)) {
            setErrorMessage('Pincode must be a 6-digit number.');
            return;
        }

        // All validations pass, register user
        const newUser = {
            id: uuidv4(),
            name,
            email,
            dob,
            city,
            pincode,
        };
        setUsers([...users, newUser]);
        setName('');
        setEmail('');
        setDOB('');
        setCity('');
        setPincode('');
    };

    const handleSearch = (e) => {
        const query = e.target.value;
        const filteredUsers = users.filter((user) =>
            user.name.toLowerCase().includes(query.toLowerCase())
        );
        setUsers(filteredUsers);
    };

    return (
        <div className="container d-flex mt-4">

            <div className='row justify-content-center'>

                <div className='col-6 p-4'>
                    <Form onSubmit={handleRegister}>
                        <h2 className='text-center'>User Registration</h2>
                        <Form.Group controlId="name">
                            <Form.Label>Name:</Form.Label>
                            <Form.Control
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="email">
                            <Form.Label>Email:</Form.Label>
                            <Form.Control
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="dob">
                            <Form.Label>DOB:</Form.Label>
                            <Form.Control
                                type="date"
                                value={dob}
                                onChange={(e) => setDOB(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="city">
                            <Form.Label>City:</Form.Label>
                            <Form.Control
                                as="select"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                required >

                                <option value="">Select City</option>
                                <option value="Bengaluru">Bengaluru</option>
                                <option value="Hydrabad">Hydrabad</option>
                                <option value="Kolkata">Kolkata</option>
                                <option value="Gujurat">Gujurat</option>
                                <option value="Gurgram">Gurgram</option>
                            </Form.Control>

                        </Form.Group>
                        <Form.Group controlId="pincode">
                            <Form.Label>Pincode:</Form.Label>
                            <Form.Control
                                type="number"
                                value={pincode}
                                onChange={(e) => setPincode(e.target.value)}
                                required
                                pattern="[0-9]{6}"
                            />
                        </Form.Group>
                        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
                        <Button type="submit" variant="primary" className='btn'>
                            Register
                        </Button>
                    </Form>
                </div>
                <hr />

                <div className='col-6 p-4'>
                    <Form.Group controlId="search">
                        <h2 className='text-center'>User List</h2>
                        <Form.Label>Search by Name:</Form.Label>
                        <Form.Control
                            type="text"
                            onChange={handleSearch}
                            placeholder="search..."
                        />
                    </Form.Group>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>DOB</th>
                                <th>City</th>
                                <th>Pincode</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id}>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.dob}</td>
                                    <td>{user.city}</td>
                                    <td>{user.pincode}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </div>

        </div>
    );
};

export default Applogin;
