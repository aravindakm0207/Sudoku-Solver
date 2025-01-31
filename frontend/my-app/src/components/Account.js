
import { useAuth } from "../context/AuthContext";

export default function Account() {
    const { user } = useAuth();

    return (
        <div>
            <h2>Account Info</h2>
            {user ? (
                <div>
                    <h3>Personal Information</h3>
                    <p><strong> Name:</strong> {user.account?.name}</p>
                    <p><strong>Email:</strong> {user.account?.email}</p>
                </div>
            ) : (
                <p>No user information available.</p>
            )}
        </div>
    );
}
