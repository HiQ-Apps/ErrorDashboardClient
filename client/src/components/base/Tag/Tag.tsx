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
    <div>
      <span className="text-2xs">
        <p>{tagKey}:</p>
        <p
          className="flex flex-row"
          style={{ borderColor: tagColor, color: fontColor }}
        >
          {tagValue}
        </p>
      </span>
    </div>
  );
};

export default Tag;
