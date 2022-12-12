import { useEffect } from "react";
import { signOutHandler } from "../firebase";

export const useOnPageLeave = () => {
  useEffect(() => {
    window.onbeforeunload = () => signOutHandler();

    window.addEventListener("unload", (event) => {
      const type = event.type;
      if (type === "click") {
        return;
      }
      event.preventDefault();

      signOutHandler();
    });

    return () => {
      document.removeEventListener("unload", signOutHandler);
    };
  });
};
