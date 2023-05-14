import { FC } from "react";
import { useLoaderData } from "react-router-dom";

export interface ILoaderData {
  userName: string;
}

export function dashboardLoader() {
  const userName = localStorage.getItem("userName");
  if (!userName) throw Error("Not found error");
  return { userName };
}

const Dashboard: FC = () => {
  const { userName } = useLoaderData() as ILoaderData;

  return (
    <div>
      <h1>{userName}</h1>
    </div>
  );
};

export default Dashboard;
