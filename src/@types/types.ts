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
  obj: Status[] | User[] | Priority[];
  setNewApplication: (updater: (prev: ModifiedApplication) => ModifiedApplication) => void;
  name: string;
  setVisible: (value: boolean) => void;
};

export type ModifiedApplication = {
  id: number;
  name: string;
  description: string;
  comment: string;
  price: number;
  taskTypeId: number;
  statusId: number;
  priorityId: number;
  serviceId: number;
  resolutionDatePlan: string;
  initiatorId: number;
  executorId: number;
  executorGroupId: number;
};

export type CreateCommentProps = {
  newApplication: ModifiedApplication;
  // onCommentAdded: () => void;
  setNewApplication: React.Dispatch<React.SetStateAction<ModifiedApplication>>;
};

export type NewComment = {
  comment: string;
};

export type CreateApplicationProps = {
  onClose: () => void;
  setActive: (id: number) => void;
};
