import { useState } from 'react';

const ChangePassword = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleChangePassword = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setMessage('New passwords do not match');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/restaurant/chg-password', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ oldPassword, newPassword }),
            });
            const data = await response.json();
            setMessage(data.message);
        } catch (error) {
            setMessage('Error changing password');
        }
    };

    return (
        <div>
            <h2>Change Password</h2>
            <form onSubmit={handleChangePassword}>
                <div>
                    <label>Old Password:</label>
                    <input
                        type="password"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>New Password:</label>
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Confirm New Password:</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Change Password</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default ChangePassword;