export type ShortTagType = {
  tag_key: string;
  tag_value: string;
};

export type TagType = {
  id: string;
  tag_key: string;
  tag_value: string;
};

export type CreateTagType = {
  tag_key: string;
  tag_value: string;
  error_id: string;
};
