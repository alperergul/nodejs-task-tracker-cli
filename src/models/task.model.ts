import { EnumStatusType } from './enums/status-type.enum';

export interface Task {
  id: number;
  description: string;
  status: EnumStatusType;
  createdAt: Date;
  updatedAt: Date;
}
