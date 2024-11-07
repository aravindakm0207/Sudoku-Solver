import { useAuth } from "../context/AuthContext";


export default function Account() {
    const { user } = useAuth();
    
    return (
        <div>
            <h2>Account Info</h2>
            {user && (
                <>
                    <p>First Name - {user.account?.firstname}</p>
                    <p>Last Name - {user.account?.lastname}</p>
                    <p>Email - {user.account?.email}</p>
                  
                </>
            )}
        </div>
    );
}