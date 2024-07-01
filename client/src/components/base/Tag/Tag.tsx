import { colorList } from "components/composite";

interface TagProps {
  tag_key: string;
  tag_value: string;
  tag_color: string;
}

const Tag = ({ tag_key, tag_value, tag_color }: TagProps) => {
  let font_color;
  for (const color of colorList) {
    if (color.background === tag_color) {
      font_color = color.text;
    }
  }
  return (
    <div
      className="my-1 mx-6 text-slate-900 flex text-2xs py-1 border border-slate-600 justify-center text-center text-balance align-center items-center rounded-full dark:text-slate-900"
      style={{ backgroundColor: tag_color, color: font_color }}
    >
      {tag_key}: {tag_value}
    </div>
  );
};

export default Tag;
