export type ShortTagType = {
  tag_key: string;
  tag_value: string;
  tag_color: string;
};

export type TagType = {
  id: string;
  tag_key: string;
  tag_value: string;
  tag_color: string;
};

export type CreateTagType = {
  tag_key: string;
  tag_value: string;
  tag_color: string;
  error_id: string;
};
