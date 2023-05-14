import { FC } from "react";
import {
  useLoaderData,
  ActionFunction,
  LoaderFunction,
} from "react-router-dom";
import Intro from "./Intro";
import { toast } from "react-toastify";

export interface ILoaderData {
  userName: string | null;
}

export const dashboardLoader: LoaderFunction = () => {
  const userName = localStorage.getItem("userName");
  return { userName };
};

export const dashboardAction: ActionFunction = async ({ request }) => {
  const data = await request.formData();
  const userName = data.get("userName") as string;
  try {
    localStorage.setItem("userName", userName);
    return toast.success(`Welcome, ${userName}`);
  } catch (err) {
    throw new Error("There was a problem creating your account.");
  }
};

const Dashboard: FC = () => {
  const { userName } = useLoaderData() as ILoaderData;

  return <>{userName ? <p>{userName}</p> : <Intro />}</>;
};

export default Dashboard;
