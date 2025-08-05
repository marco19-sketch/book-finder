import { useEffect } from "react";

const useGoogleAnalytics = () => {
  useEffect(() => {
    const loadGA = () => {
      const script = document.createElement("script");
      script.src = "https://www.googletagmanager.com/gtag/js?id=G-D34GJLZCBE";
      script.async = true;
      document.head.appendChild(script);

      script.onload = () => {
        window.dataLayer = window.dataLayer || [];
        function gtag() {
          window.dataLayer.push(arguments);
        }
        gtag("js", new Date());
        gtag("config", "G-D34GJLZCBE");
      };
    };

    // Option 1: Load GA after user interacts
    const onFirstInteraction = () => {
      loadGA();
      window.removeEventListener("click", onFirstInteraction);
      window.removeEventListener("scroll", onFirstInteraction);
    };

    window.addEventListener("click", onFirstInteraction);
    window.addEventListener("scroll", onFirstInteraction);

    // Option 2: Or simply after full load
    // window.addEventListener("load", loadGA);
  }, []);
};

export default useGoogleAnalytics;
