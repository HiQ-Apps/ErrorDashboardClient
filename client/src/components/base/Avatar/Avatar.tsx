import { getInitials } from "shared/utils/parseString";

interface AvatarProps {
  name?: string;
  size?: string;
  avatarColor?: string;
}

const CustomAvatar = ({
  name,
  size = "40px",
  avatarColor = "098585",
}: AvatarProps) => {
  if (!name) {
    return null;
  }

  const initials = getInitials(name);
  //   Implement JIT
  return (
    <div
      style={{
        backgroundColor: avatarColor,
        width: size,
        height: size,
        borderRadius: "50%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        fontSize: "1rem",
        fontWeight: "bold",
      }}
    >
      <div className="h-3/4 flex justify-center text-center text-slate-200 overflow-hidden">
        {initials}
      </div>
    </div>
  );
};

export { CustomAvatar as Avatar };
