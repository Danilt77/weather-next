import { useEffect } from "react";
import "../styles/global.css";

export default function App({ Component }) {
  useEffect(() => {
    document.body.classList.add("bg-slate-950");
  }, []);
  return (
    <>
      <Component />
    </>
  );
}
