import React, { useState } from 'react';
import { json } from 'react-router-dom';

export default function SignupForm() {
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        gender: '',
        username: '',
        password: '',
        email: '',
        phone: '',
        location: ''
    });

    const [isDone, setIsDone] = useState(false);
    const [errors, setErrors] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        //checking if no fileds are empty
        if (
            !formData.name ||
            !formData.age ||
            !formData.gender ||
            !formData.username ||
            !formData.password ||
            !formData.email ||
            !formData.phone ||
            !formData.location
        ) {
            alert("Please fill in all the required fields.");
        } else if (formData <= 0) {
            alert("Age cannot be less than 1");
        } else if (formData.username.length < 6) {
            alert("Username must be atleast 6 characters");
        } else if (formData.password.length < 6) {
            alert("Password must be atleast 10 chacter long.");
        } else {
        // sending post query
        fetch('http://localhost:4000/api/users/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            if (data._id) {
                setIsDone(true);
            } else if (data.errors) {
                alert(data.errors.map((errors) => errors.msg))
            } else {
                alert("Registration failed, please try again.");
            }
        })
        .catch((error) => {
            console.error(error);
            alert("An error occured, please try after some time.");
        });
    }
    }

    return (
        <div>
            {isDone ? (
            <div>
<h1 className='text-center'>Thank You</h1>
<p className='text-center'>You are successfuly registered, please go back to home page to login</p>
</div>
            ) : (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="form-control" required />
            </div>
            <div className="mb-3">
                <label htmlFor="age" className="form-label">Age</label>
                <input type="number" id="age" name="age" value={formData.age} onChange={handleChange} className="form-control" required />
            </div>
            <div className="mb-3">
                <label className="form-label">Gender</label>
                <div>
                    <label>
                        <input
                            type="radio"
                            name="gender"
                            value="male"
                            checked={formData.gender === 'male'}
                            onChange={handleChange}
                        />{' '}
                        Male
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="gender"
                            value="female"
                            checked={formData.gender === 'female'}
                            onChange={handleChange}
                        />{' '}
                        Female
                    </label>
                </div>
            </div>
            <div className="mb-3">
                <label htmlFor="username" className="form-label">Username</label>
                <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} className="form-control" required />
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} className="form-control" required />
            </div>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="form-control" required />
            </div>
            <div className="mb-3">
                <label htmlFor="phone" className="form-label">Phone</label>
                <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} className="form-control" required />
            </div>
            <div className="mb-3">
                <label htmlFor="location" className="form-label">Location</label>
                <input type="text" id="location" name="location" value={formData.location} onChange={handleChange} className="form-control" required />
            </div>

            <button type="submit" className="btn btn-primary">Sign Up</button>
        </form>
        )}

        </div>
    );
}
