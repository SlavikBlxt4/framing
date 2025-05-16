import api from "./api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import { LoginRequest, TokenPayload } from "@/types/user";
import { PhotographerProfile } from "@/types/user";

export async function login ({email, password }: LoginRequest): Promise<string> {
    const response = await api.post("/users/login", { email, password });
    console.log("Respuesta del servidor:", response.data);

    const token = response.data;

    if (!token) {
    throw new Error("No se recibió token en la respuesta");
    }

    const decoded = jwtDecode<TokenPayload>(token);
    if (decoded.role !== "PHOTOGRAPHER") {
        throw new Error("Solo los fotógrafos pueden iniciar sesión en esta aplicación");
    }

    await AsyncStorage.setItem("token", token);

    const profileResponse = await api.get<PhotographerProfile>("/users/me/photographer-profile");
    const photographer = profileResponse.data;
    console.log("Perfil del fotógrafo: ", photographer);

    return token;
}