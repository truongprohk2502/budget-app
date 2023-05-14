import { redirect } from "react-router-dom";

export async function logoutAction() {
  localStorage.removeItem("userName");
  return redirect("/");
}
