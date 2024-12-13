import { useAuth } from "../context/AuthContext";
import { Box, Typography, Card, CardContent } from "@mui/material";

export default function Account() {
    const { user } = useAuth();

    return (
        <Box sx={{ maxWidth: 600, margin: '0 auto', padding: 2 }}>
            <Typography variant="h4" component="h2" gutterBottom>
                Account Info
            </Typography>
            {user ? (
                <Card variant="outlined">
                    <CardContent>
                        <Typography variant="h6">Personal Information</Typography>
                        <Typography variant="body1" color="textSecondary">
                            <strong>First Name:</strong> {user.account?.name}
                        </Typography>
                        <Typography variant="body1" color="textSecondary">
                            <strong>Email:</strong> {user.account?.email}
                        </Typography>
                    </CardContent>
                </Card>
            ) : (
                <Typography variant="body1" color="textSecondary">
                    No user information available.
                </Typography>
            )}
        </Box>
    );
}
