import { auth } from "@/auth";
async function refreshToken(refreshToken: string) {
  const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/jwt/refresh", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      refresh: refreshToken,
    }),
  });
  const data = await res.json();
  console.log({ data });

  return data.accessToken;
}

export async function AuthGetApi(url: string) {
  const session = await auth();
  if (!session || !session.user) {
    return null;
  }

  let res = await fetch(process.env.NEXT_PUBLIC_API_URL + url, {
    method: "GET",
    headers: {
      Authorization: `JWT ${session?.user.accessToken}`,
    },
  });

  if (res.status == 401) {
    if (session)
      session.user.accessToken = await refreshToken(
        session?.user.refreshToken ?? ""
      );

    res = await fetch(process.env.NEXT_PUBLIC_API_URL + url, {
      method: "GET",
      headers: {
        Authorization: `JWT ${session?.user.accessToken}`,
      },
    });
    return await res.json();
  }

  return await res.json();
}
