import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import {
  Button,
  Typography,
  Paper,
  Box,
  CircularProgress,
} from "@mui/material";

const Profile = () => {
  const [user, setUser] = useState<{ email: string } | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/users/profile",
          {
            withCredentials: true,
          }
        );

        setUser(response.data);
      } catch (error) {
        console.error("Ошибка перехода на профиль:", error);
        navigate("/login");
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleLogout = () => {
    Cookies.remove("access_token");
    navigate("/login");
  };

  return (
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Typography variant="h5" color="green" gutterBottom>
          Профиль
        </Typography>
        {user ? (
          <Typography variant="body1">Email: {user.email}</Typography>
        ) : (
          <CircularProgress color="success" sx={{ mt: 2 }} />
        )}
        <Button
          variant="contained"
          color="error"
          onClick={handleLogout}
          sx={{ mt: 3 }}
        >
          Выйти
        </Button>
      </Paper>
    </Box>
  );
};

export default Profile;
