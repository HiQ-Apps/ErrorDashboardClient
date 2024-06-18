import { getFirstLetterCaps } from "shared/utils/parseString";
import { getRandomColor } from "shared/utils/Profile";

interface AvatarProps {
  name?: string;
  size?: string;
}

const CustomAvatar = ({ name, size = "40px" }: AvatarProps) => {
  if (!name) {
    return null;
  }

  const firstLetter = getFirstLetterCaps(name);
  const color = getRandomColor();
  //   Implement JIT
  return (
    <div
      style={{
        backgroundColor: color,
        width: size,
        height: size,
        borderRadius: "50%",
        display: "inline-block",
        color: "white",
        fontSize: "2rem",
        fontWeight: "bold",
        border: `1px solid ${color}`,
        position: "relative",
      }}
    >
      <div className="absolute top-2 left-2">{firstLetter}</div>
    </div>
  );
};

export { CustomAvatar as Avatar };
