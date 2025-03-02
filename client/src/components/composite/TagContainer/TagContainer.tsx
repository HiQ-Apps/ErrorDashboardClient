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
      />
    );
  }

  if (tags.length === 1) {
    return (
      <Tag
        tagKey={tags[0].tagKey}
        tagValue={tags[0].tagValue}
        tagColor={tags[0].tagColor}
      />
    );
  } else if (tags.length > 1) {
    return (
      <ScrollArea className="h-[100px] w-full rounded-md dark:bg-slate-900 space-y-4 pb-4">
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
