import { colorList } from "components/composite";

interface TagProps {
  tagKey: string;
  tagValue: string;
  tagColor: string;
}

const Tag = ({ tagKey, tagValue, tagColor }: TagProps) => {
  let fontColor;
  for (const color of colorList) {
    if (color.background === tagColor) {
      fontColor = color.text;
    }
  }
  return (
    <div
      className="my-1 mx-6 text-slate-900 flex text-2xs py-1 border border-slate-600 justify-center text-center text-balance align-center items-center rounded-full dark:text-slate-900"
      style={{ backgroundColor: tagColor, color: fontColor }}
    >
      {tagKey}: {tagValue}
    </div>
  );
};

export default Tag;
