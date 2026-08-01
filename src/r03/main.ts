import "./styles.css";
import { R03Experience } from "./R03Experience";

const root = document.querySelector<HTMLElement>("#app");

if (root === null) {
  throw new Error("R03 application root was not found.");
}

const experience = new R03Experience(root);
void experience.start();

if ("serviceWorker" in navigator && import.meta.env.PROD) {
  window.addEventListener("load", () => {
    void navigator.serviceWorker.register(`${import.meta.env.BASE_URL}sw.js`);
  });
}

if (import.meta.hot !== undefined) {
  import.meta.hot.dispose(() => experience.destroy());
}
