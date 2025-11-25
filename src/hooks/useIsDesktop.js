const { useState, useEffect } = require("react");

export function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mq = window.matchMedia("(min-width: 1024px)"); // lg breakpoint

    const update = (e) => {
      setIsDesktop(e.matches);
    };

    update(mq);

    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return isDesktop;
}