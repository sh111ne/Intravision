export type Tag = {
  id: number;
  name: string;
};

export type Comment = {
  comment: string;
  createdAt: string;
  fieldName: null;
  id: number;
  lifetimeType: number;
  newFieldValue: null;
  oldFieldValue: null;
  userName: string;
};

export type Task = {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  price: number;
  taskTypeId: number;
  taskTypeName: string;
  statusId: number;
  statusName: string;
  statusRgb: string;
  priorityId: number;
  priorityName: string;
  serviceId: number;
  serviceName: string;
  resolutionDatePlan: string;
  tags: Tag[];
  initiatorId: number;
  initiatorName: string;
  lifetimeItems?: Comment[];
  executorId: number;
  executorName: string;
  executorGroupId: number;
  executorGroupName: string;
};

export type Status = {
  rgb: string;
  id: number;
  name: string;
};

export type Priority = {
  rgb: string;
  id: number;
  name: string;
};

export type User = {
  id: number;
  name: string;
};

export type NewApplication = {
  name: string;
  description: string;
};

export type SelectModalProps = {
  obj: { id: number; name: string; rgb?: string }[];
};
