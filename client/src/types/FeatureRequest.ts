export type FeatureRequest = {
  id: number;
  title: string;
  description: string;
  status: string;
  createdAt: string;
};

export type CreateFeatureRequest = Pick<
  FeatureRequest,
  "title" | "description"
>;
