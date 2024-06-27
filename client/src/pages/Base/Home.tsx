import { useState, useEffect } from "react";
import {
  useTrail,
  useTransition,
  useChain,
  animated,
  useSpringRef,
} from "@react-spring/web";
import { HomeSidebar } from "components/composite";

const data = ["an", "app", "by", "HiQ"];

const Home = () => {
  const [open, setOpen] = useState(false);

  const trailRef = useSpringRef();
  const trail = useTrail(["Error", "Dashboard"].length, {
    ref: trailRef,
    config: { mass: 3, tension: 2000, friction: 150 },
    opacity: open ? 0.9 : 1,
    transform: open
      ? "translate3d(0,-50px,0) scale(0.9)"
      : "translate3d(0,0px,0) scale(1)",
    from: { opacity: 0, transform: "translate3d(0,40px,40px) scale(1.2)" },
  });

  const transRef = useSpringRef();
  const transition = useTransition(open ? data : [], {
    ref: transRef,
    trail: 250,
    from: { opacity: 0, transform: "scale(0.5) rotateY(90deg)" },
    enter: { opacity: 1, transform: "scale(1) rotateY(0deg)" },
    leave: { opacity: 0, transform: "scale(0.5) rotateY(90deg)" },
  });

  useChain([trailRef, transRef], [0, 0.8]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpen(true);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-slate-50 text-slate-900 min-h-screen w-full flex flex-row relative dark:bg-slate-800 dark:text-slate-200">
      <div className="bg-slate-50 w-52 p-4 bg-gray-200 h-screen dark:bg-slate-800">
        <HomeSidebar />
      </div>
      <div
        className="flex-1 p-4 flex justify-center items-center text-black relative"
        style={{ paddingBottom: "100px" }}
      >
        <div className="absolute">
          {trail.map((style, index) => (
            <animated.div
              key={index}
              className="text-7xl font-extrabold text-black dark:text-white rounded-lg p-1 text-shadow-custom-hiq"
              style={style}
            >
              {["Error", "Dashboard"][index]}
            </animated.div>
          ))}
        </div>
        <div className="absolute grid grid-cols-4 gap-2 justify-end ml-16">
          {transition((style, item) => (
            <animated.div
              key={item}
              className="w-16 h-16 bg-white rounded-lg flex items-center justify-center text-black text-xl mt-40 shadow-custom-hiq"
              style={style}
            >
              {item}
            </animated.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
