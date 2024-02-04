import type { RequestHandler } from "./$types";
import { json } from "@sveltejs/kit";

import { AuthenticationClient } from "forge-server-utils";
import { APS_KEY, APS_SECRET } from "$env/static/private";

const authenticationClient = new AuthenticationClient(APS_KEY, APS_SECRET);

export const GET: RequestHandler = async () => {
  const { access_token, expires_in } = await authenticationClient.authenticate([
    "data:read",
  ]);
    return json({ access_token, expires_in });
};
