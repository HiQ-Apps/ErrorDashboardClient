import { useEffect, useState } from "react";

export const usePageHeight = () => {
  const [height, setHeight] = useState(() => window.innerHeight - 100);

  useEffect(() => {
    const handleResize = () => setHeight(window.innerHeight - 100);

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return height;
};
