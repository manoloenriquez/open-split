export type SplitMode = "equal" | "percentage" | "amount" | "item";

export interface ExpenseItem {
  id?: string;
  name: string;
  quantity: number;
  price: number;
  total: number;
  assigned_to?: string[];
}

export interface ExpenseSplit {
  user_id: string;
  amount: number;
  percentage?: number;
  items?: string[];
}

export interface Expense {
  id: string;
  group_id?: string;
  created_by: string;
  description: string;
  notes?: string;
  total_amount: number;
  date: string;
  receipt_url?: string;
  ocr_text?: string;
  parsed_items?: ExpenseItem[];
  split_mode: SplitMode;
  splits: ExpenseSplit[];
  created_at: string;
  updated_at: string;
}

