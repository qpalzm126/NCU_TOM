import api from "@/apis/wrapper";
import { UserProfile } from "@/models/users";

export async function getUser(access_token: string) {
  try {
    const response = await api.get("/api/users/me/", {
      headers: {
        Authorization: `JWT ${access_token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
