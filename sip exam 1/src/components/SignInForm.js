import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useHistory from react-router-dom

export default function SignupForm() {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
 
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // sending post query
        fetch('http://localhost:4000/api/signin/verify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
        .then((response) => response.json())
        .then((data) => {
            // console.log(data);
            if (data.message === 'Sign-in successful') {
                // getting user data and jwt token
                const user = data.user;
                const jwtToken = data.token;

                // setting data to local storage
                localStorage.setItem('user', user);
                localStorage.setItem('jwtToken', jwtToken);
                // Navigate to the home page upon successful sign-in
                navigate('/');
            } else {
                setError('Invalid username or password. Please try again.');
            }
        })
        .catch((error) => {
            console.error(error);
            alert("An error occurred, please try again later.");
        });
    }

    return (
        <div>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} className="form-control" required />
                </div>

                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} className="form-control" required />
                </div>
                <button type="submit" className="btn btn-primary">Sign In</button>
            </form>
        </div>
    );
}
