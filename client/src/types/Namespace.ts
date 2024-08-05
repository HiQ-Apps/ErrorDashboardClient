export type ShortNamespaceData = {
  id: string;
  serviceName: string;
  environmentType: string;
};

export type CreateNamespaceRequest = {
  serviceName: string;
  environmentType: string;
};

export type NamespaceData = {
  id: string;
  active: boolean;
  serviceName: string;
  environmentType: string;
  clientSecret: string;
  clientId: string;
  createdAt: Date;
  updatedAt: Date;
};

export type UpdateNamespaceRequest = {
  id: string;
  active?: boolean;
  clientId?: string;
  clientSecret?: boolean;
  serviceName?: string;
  environmentType?: string;
};
