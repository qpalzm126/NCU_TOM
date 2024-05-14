import api from "@/apis/wrapper";
import { UserProfile } from "@/models/users";

export async function getUser() {
  try {
    const response = await api.get("/api/users/me/");
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
