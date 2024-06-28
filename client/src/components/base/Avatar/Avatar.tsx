import { getInitials } from "shared/utils/parseString";
import { colorList } from "components/composite";

interface AvatarProps {
  name?: string;
  size?: "sm" | "md" | "lg";
  avatarColor?: string;
}

const avatarStyleMap = {
  sm: { dimensions: "30px", fontSize: "1rem", maxHeight: "" },
  md: { dimensions: "60px", fontSize: "2rem" },
  lg: { dimensions: "120px", fontSize: "3rem" },
};

const CustomAvatar = ({
  name,
  size = "sm",
  avatarColor = "098585",
}: AvatarProps) => {
  if (!name) {
    return null;
  }

  const initials = getInitials(name);
  const textColor = colorList.find((color) => color.background === avatarColor);
  const dimensions = avatarStyleMap[size]["dimensions"];
  const fontSize = avatarStyleMap[size]["fontSize"];
  //   Implement JIT
  return (
    <div
      style={{
        backgroundColor: avatarColor,
        width: dimensions,
        height: dimensions,
        borderRadius: "50%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: textColor?.text || "white",
        fontSize: fontSize,
        fontWeight: "bold",
      }}
    >
      <div
        style={{
          display: "flex",
          overflow: "hidden",
        }}
      >
        {initials}
      </div>
    </div>
  );
};

export { CustomAvatar as Avatar };
