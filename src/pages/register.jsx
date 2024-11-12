// Register.js
import React, { useContext, useState } from "react";

import { Context } from "../store/appContext";
import { Input, Button, Spacer } from "@nextui-org/react";

export default function Register() {
  const { actions } = useContext(Context);
 
  const [user, setUser] = useState({
    name: "",
    username: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const success = await actions.createUser(user.name, user.username, user.password);
      if (success) {
        setUser({ name: "", username: "", password: "" });
       
      } else {
        setError("Failed to create account. Please try again.");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-customBlack">
      <form onSubmit={handleSubmit} className="bg-customGray p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center text-black ">Registro de Super Usuario</h2>
        <div className="flex flex-col gap-4">
          <Input
            label="Nombre"
            name="name"
            value={user.name}
            onChange={handleChange}
            required
          />
          <Input
            label="Username"
            name="username"
            value={user.username}
            onChange={handleChange}
            required
          />
          <Input
            label="Contraseña"
            name="password"
            type="password"
            value={user.password}
            onChange={handleChange}
            required
          />
        </div>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        <Button type="submit" className="mt-6 w-full bg-customGreen" disabled={isLoading}>
          {isLoading ? "Loading..." : "Registrar"}
        </Button>
      </form>
    </div>
  );
}
