import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Paper, Box } from "@mui/material";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/api/auth/register", {
        email,
        password,
        firstName,
        lastName,
      });
      alert("Регистрация успешна!");
      navigate("/login");
    } catch (error) {
      console.error("Ошибка регистрации:", error);
      alert("Ошибка регистрации");
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
          Регистрация
        </Typography>
        <Box
          component="form"
          onSubmit={handleRegister}
          sx={{ mt: 2, width: "100%" }}
        >
          <TextField
            label="Имя"
            type="text"
            fullWidth
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            margin="normal"
          />
          <TextField
            label="Фамилия"
            type="text"
            fullWidth
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            margin="normal"
          />
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
            Зарегистрироваться
          </Button>
        </Box>
        <Typography variant="body2" sx={{ mt: 2 }}>
          Уже есть аккаунт?
        </Typography>
        <Button
          onClick={() => navigate("/login")}
          variant="text"
          color="success"
        >
          Войти
        </Button>
      </Paper>
    </Box>
  );
};

export default Register;
