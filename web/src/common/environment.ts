import env from "env-var";

export const API_URI = env.get("API_URI").asString();
