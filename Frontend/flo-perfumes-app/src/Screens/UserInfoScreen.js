import React, { useEffect, useState } from 'react';
import api from '../api/axiosConfig';
import './UserInfoScreen.css';

const UserInfoScreen = () => {
    const [user, setUser] = useState(null);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const loggedUser = JSON.parse(localStorage.getItem('user'));
                if (loggedUser) {
                    const response = await api.get(`/api/users/${loggedUser.id}`);
                    setUser(response.data);
                }
            } catch (err) {
                console.log(err);
            }
        };

        fetchUserInfo();
    }, []);

    const handlePasswordChange = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            setMessage('Noua parolă nu coincide cu confirmarea.');
            return;
        }

        try {
            const response = await api.put(`/api/users/${user.id}/change-password`, {
                currentPassword,
                newPassword
            });

            if (response.status === 200) {
                setMessage('Parola a fost schimbată cu succes!');
            } else {
                setMessage('A apărut o problemă la schimbarea parolei.');
            }
        } catch (error) {
            setMessage('Eroare la schimbarea parolei.');
        }
    };

    return (
        <div className="user-info-container">
            {user ? (
                <div className="user-card">
                    <div className="card-content">
                        <div className="user-details">
                            <h2>Username: {user.name}</h2>
                            <p><strong>Email:</strong> {user.email}</p>
                        </div>

                        <div className="password-change-section">
                            <form onSubmit={handlePasswordChange} className="password-form">
                                <div className="form-group">
                                    <label>Parola actuală</label>
                                    <input
                                        type="password"
                                        value={currentPassword}
                                        onChange={(e) => setCurrentPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Noua parolă</label>
                                    <input
                                        type="password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Confirmă noua parolă</label>
                                    <input
                                        type="password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <button type="submit" className="change-password-btn">Schimbă parola</button>
                            </form>
                            {message && <p className="message">{message}</p>}
                        </div>
                    </div>
                </div>
            ) : (
                <p>Se încarcă datele utilizatorului...</p>
            )}
        </div>
    );
};

export default UserInfoScreen;
