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
        tagKey={tags.tagKey}
        tagValue={tags.tagValue}
        tagColor={tags.tagColor}
      ></Tag>
    );
  }

  if (tags.length === 1) {
    return (
      <div className="flex rounded-md border p-2">
        {tags.map((tag, index) => (
          <Tag
            key={index}
            tagKey={tag.tagKey}
            tagValue={tag.tagValue}
            tagColor={tag.tagColor}
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
            tagKey={tag.tagKey}
            tagValue={tag.tagValue}
            tagColor={tag.tagColor}
          />
        ))}
      </ScrollArea>
    );
  } else {
    return <></>;
  }
};

export default TagContainer;
