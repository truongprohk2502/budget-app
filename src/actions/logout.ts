import { redirect } from "react-router-dom";
import { toast } from "react-toastify";

export async function logoutAction() {
  localStorage.removeItem("userName");
  localStorage.removeItem("budgets");
  localStorage.removeItem("expenses");
  toast.success("You've deleted your account!");
  return redirect("/");
}
