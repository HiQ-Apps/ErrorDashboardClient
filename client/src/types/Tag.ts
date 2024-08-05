export type TagType = {
  id: string;
  tagKey: string;
  tagValue: string;
  tagColor: string;
};

export type ShortTagType = Omit<TagType, "id">;
export type CreateTagType = ShortTagType & { errorId: string };
