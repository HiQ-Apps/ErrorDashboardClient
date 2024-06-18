import { Tag } from "components/base";
import type { TagType, ShortTagType } from "types/Tag";
import { ScrollArea } from "components/ui/scroll-area";

interface TagManagerContainerProps {
  tags: TagType[] | ShortTagType[];
}

const TagManagerContainer = ({ tags }: TagManagerContainerProps) => {
  if (tags.length === 1) {
    return (
      <div className="rounded-md border">
        {tags.map((tag) => (
          <Tag tag_key={tag.tag_key} tag_value={tag.tag_value} />
        ))}
      </div>
    );
  } else if (tags.length > 1) {
    return (
      <ScrollArea className="h-[50px] whitespace-nowrap rounded-md border">
        {tags.map((tag) => (
          <Tag tag_key={tag.tag_key} tag_value={tag.tag_value} />
        ))}
      </ScrollArea>
    );
  } else {
    return <></>;
  }
};

export default TagManagerContainer;
