import { FC } from "react";
import { Outlet, useLoaderData } from "react-router-dom";
import wave from "../assets/wave.svg";
import Navigation from "../components/Navigation";

export interface ILoaderData {
  userName: string | null;
}

export function mainLoader() {
  const userName = localStorage.getItem("userName");
  return { userName };
}

const MainLayout: FC = () => {
  const { userName } = useLoaderData() as ILoaderData;

  return (
    <div className="layout">
      <Navigation userName={userName} />
      <main>
        <Outlet />
      </main>
      <img src={wave} alt="wave" />
    </div>
  );
};
export default MainLayout;
