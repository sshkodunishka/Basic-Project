import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Paper, Box } from "@mui/material";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:3000/api/auth/login",
        { email, password },
        { withCredentials: true }
      );

      navigate("/profile");
    } catch (error) {
      console.error("Ошибка авторизации:", error);
      alert("Ошибка авторизации");
    }
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
        }}
      >
        <Typography variant="h5" color="green" gutterBottom>
          Вход в аккаунт
        </Typography>
        <Box component="form" onSubmit={handleLogin} sx={{ mt: 2, width: "100%" }}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            margin="normal"
          />
          <TextField
            label="Пароль"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            margin="normal"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="success"
            sx={{ mt: 2 }}
          >
            Войти
          </Button>
        </Box>
        <Typography variant="body2" sx={{ mt: 2 }}>
          Нет аккаунта?
        </Typography>
        <Button onClick={() => navigate("/register")} variant="text" color="success">
          Зарегистрироваться
        </Button>
      </Paper>
    </Box>
  );
};

export default Login;
