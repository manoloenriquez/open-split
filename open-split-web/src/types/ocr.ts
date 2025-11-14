export interface ParsedReceiptItem {
  name: string;
  quantity: number;
  price: number;
  total: number;
}

export interface ParsedReceiptData {
  merchant_name?: string;
  items: ParsedReceiptItem[];
  subtotal?: number;
  tax?: number;
  total: number;
  date?: string;
}

export interface OCRResult {
  success: boolean;
  ocr_text: string;
  parsed_data: ParsedReceiptData;
}

