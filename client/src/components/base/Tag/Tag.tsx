import { colorList } from "components/composite";
import { useSelector } from "react-redux";
import { selectIsDark } from "features/darkSlice";

interface TagProps {
  tagKey: string;
  tagValue: string;
  tagColor: string;
}

const Tag = ({ tagKey, tagValue, tagColor }: TagProps) => {
  const isDark = useSelector(selectIsDark);
  let fontColor;
  for (const color of colorList) {
    if (color.background === tagColor) {
      fontColor = color.text;
    }
  }
  return (
    <div className="flex flex-row text-2xs text-overflow justify-center items-center align-center mb-2">
      <p className="border border-slate-500 px-1">{tagKey}</p>
      <p
        className="px-1 border"
        style={{
          backgroundColor: "slate-100",
          borderColor: tagColor ? tagColor : isDark ? "slate-100" : "slate-800",
          color: fontColor ? fontColor : isDark ? "slate-100" : "slate-800",
        }}
      >
        {tagValue}
      </p>
    </div>
  );
};

export default Tag;
