import api from "@/apis/wrapper";

interface TokenResponse {
  refresh: string;
  access: string;
}

export async function getToken(
  username: string,
  password: string
): Promise<TokenResponse> {
  try {
    const response = await api.post("/api/jwt/create/", {
      username: username,
      password: password,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
