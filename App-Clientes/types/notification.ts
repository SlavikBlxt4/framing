export type Notification = {
  id: number;
  user: {
    id: number;
    name?: string;
  };
  title: string;
  message: string;
  type?: string | null;
  read: boolean;
  createdAt: string; 
};