import env from "env-var";

console.log("env", process.env);

export const ENV = env.get("REACT_APP_ENV").required().asString();
export const API_URI = env.get("REACT_APP_API_URI").required().asString();