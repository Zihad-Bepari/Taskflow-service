export class Task {
  id: number;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'complete';
  assignedDate: Date;
  dueDate?: Date | null;
  assignedToUserId: number;
  assignedToUserName?: string;
}
