/**
 * API client for FastAPI backend
 * ONLY used for OCR and AI parsing operations
 * All other operations should use Supabase
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export interface OCRResponse {
  success: boolean;
  ocr_text: string;
  parsed_data: {
    merchant_name?: string;
    items: Array<{
      name: string;
      quantity: number;
      price: number;
      total: number;
    }>;
    subtotal?: number;
    tax?: number;
    total: number;
    date?: string;
  };
}

export async function parseReceipt(file: File): Promise<OCRResponse> {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API_BASE_URL}/ocr/parse`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to parse receipt");
  }

  return response.json();
}

