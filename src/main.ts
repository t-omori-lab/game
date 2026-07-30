import "./styles.css";
import { startGame } from "./app/startGame";

const root = document.querySelector<HTMLElement>("#app");

if (root === null) {
  throw new Error("Application root was not found.");
}

startGame(root);

if ("serviceWorker" in navigator && import.meta.env.PROD) {
  window.addEventListener("load", () => {
    void navigator.serviceWorker.register("./sw.js");
  });
}
