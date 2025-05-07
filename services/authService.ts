// src/services/authService.ts
import api from "./api";
import { LoginRequest } from "@/types/user";
import { RegisterRequest, RegisterResponse } from "@/types/user";

export const login = async (credentials: LoginRequest): Promise<string> => {
  console.log("🔵 Enviando login con body:", credentials);
  const response = await api.post<string>("/users/login", credentials);
  console.log("🟢 Respuesta del backend:", response.data);
  return response.data;
};

export const register = async (data: RegisterRequest): Promise<RegisterResponse> => {
    const response = await api.post("/users/signup", data);
    return response.data;
};