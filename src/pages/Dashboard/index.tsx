import { FC } from "react";
import { toast } from "react-toastify";
import {
  useLoaderData,
  ActionFunction,
  LoaderFunction,
} from "react-router-dom";
import Intro from "./Intro";
import AddBudgetForm from "./AddBudgetForm";
import { createBudget, delay } from "../../helpers";

export interface ILoaderData {
  userName: string | null;
}

export const dashboardLoader: LoaderFunction = () => {
  const userName = localStorage.getItem("userName");
  return { userName };
};

export const dashboardAction: ActionFunction = async ({ request }) => {
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);

  switch (_action) {
    case "newUser":
      try {
        localStorage.setItem("userName", values.userName as string);
        return toast.success(`Welcome, ${values.userName}`);
      } catch (err) {
        throw new Error("There was a problem creating your account.");
      }
    case "createBudget":
      try {
        await delay(500);
        createBudget({
          name: values.newBudget as string,
          amount: Number(values.newBudgetAmount),
        });
        return toast.success("Budget created!");
      } catch (e) {
        throw new Error("There was a problem creating your budget.");
      }
  }
};

const Dashboard: FC = () => {
  const { userName } = useLoaderData() as ILoaderData;

  return (
    <>
      {userName ? (
        <div className="dashboard">
          <h1>
            Welcome back, <span className="accent">{userName}</span>
          </h1>
          <div className="grid-sm">
            <div className="grid-lg">
              <div className="flex-lg">
                <AddBudgetForm />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Intro />
      )}
    </>
  );
};

export default Dashboard;
