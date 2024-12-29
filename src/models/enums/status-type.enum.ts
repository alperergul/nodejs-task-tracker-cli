export enum EnumStatusType {
  TODO = 0,
  IN_PROGRESS = 1,
  DONE = 2,
}

export const EnumStatusMessages: Record<EnumStatusType, string> = {
  [EnumStatusType.TODO]: 'To Do ',
  [EnumStatusType.IN_PROGRESS]: 'In Progress',
  [EnumStatusType.DONE]: 'Done',
};
