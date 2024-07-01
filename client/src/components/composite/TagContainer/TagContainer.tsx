import { Tag } from "components/base";
import type { ShortTagType } from "types/Tag";
import { ScrollArea } from "components/ui/scroll-area";

interface TagContainerProps {
  tags: ShortTagType[] | ShortTagType;
}

const TagContainer = ({ tags }: TagContainerProps) => {
  if (!Array.isArray(tags)) {
    return (
      <Tag
        tag_key={tags.tag_key}
        tag_value={tags.tag_value}
        tag_color={tags.tag_color}
      ></Tag>
    );
  }

  if (tags.length === 1) {
    return (
      <div className="flex rounded-md border p-2">
        {tags.map((tag, index) => (
          <Tag
            key={index}
            tag_key={tag.tag_key}
            tag_value={tag.tag_value}
            tag_color={tag.tag_color}
          />
        ))}
      </div>
    );
  } else if (tags.length > 1) {
    return (
      <ScrollArea className="h-[100px] w-full whitespace-nowrap rounded-md dark:bg-slate-900">
        {tags.map((tag, index) => (
          <Tag
            key={index}
            tag_key={tag.tag_key}
            tag_value={tag.tag_value}
            tag_color={tag.tag_color}
          />
        ))}
      </ScrollArea>
    );
  } else {
    return <></>;
  }
};

export default TagContainer;
