import axios from "axios";
import { LoginRequest, LoginResponse } from '@/types/user';

const API_URL = "http://ec2-3-87-201-29.compute-1.amazonaws.com:3000/users";

export const login = async (credentials: LoginRequest): Promise<string> => {
    console.log("🔵 Enviando login con body:", credentials);
    const response = await axios.post<string>(`${API_URL}/login`, credentials);
    console.log("🟢 Respuesta del backend:", response.data);
    return response.data;
}