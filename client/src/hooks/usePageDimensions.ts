import { useEffect, useState } from "react";

export const usePageDimensions = () => {
  const [height, setHeight] = useState(() => window.innerHeight - 100);
  const [width, setWidth] = useState(() => window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setHeight(window.innerHeight - 100);
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return { height, width };
};
