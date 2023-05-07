export interface BoardSchema {
  id?: string;
  title: string;
  content: string;
  created_at?: Date;
  updated_at?: Date;
  user_id?: string;
  user_name?: string;
}
