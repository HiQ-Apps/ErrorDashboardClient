import { Tag } from "components/base";
import type { ShortTagType } from "types/Tag";
import { ScrollArea } from "components/ui/scroll-area";

interface TagContainerProps {
  tags: ShortTagType[];
}

const TagContainer = ({ tags }: TagContainerProps) => {
  if (tags.length === 1) {
    return (
      <div className="rounded-md border">
        {tags.map((tag) => (
          <Tag
            key={tag.tag_key}
            tag_key={tag.tag_key}
            tag_value={tag.tag_value}
          />
        ))}
      </div>
    );
  } else if (tags.length > 1) {
    return (
      <ScrollArea className="h-[50px] whitespace-nowrap rounded-md border">
        {tags.map((tag) => (
          <Tag
            key={tag.tag_key}
            tag_key={tag.tag_key}
            tag_value={tag.tag_value}
          />
        ))}
      </ScrollArea>
    );
  } else {
    return <></>;
  }
};

export default TagContainer;
