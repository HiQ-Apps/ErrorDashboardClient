export type ShortNamespaceData = {
  id: string;
  service_name: string;
  environment_type: string;
};

export type CreateNamespaceRequest = {
  service_name: string;
  environment_type: string;
};

export type NamespaceData = {
  id: string;
  active: boolean;
  service_name: string;
  environment_type: string;
  client_secret: string;
  client_id: string;
  created_at: Date;
  updated_at: Date;
};

export type UpdateNamespaceRequest = {
  id: string;
  active?: boolean;
  client_id?: string;
  client_secret?: boolean;
  service_name?: string;
  environment_type?: string;
};
