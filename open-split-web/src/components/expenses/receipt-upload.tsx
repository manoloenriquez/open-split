"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Loader2, Upload, Image as ImageIcon } from "lucide-react";
import Image from "next/image";

export function ReceiptUpload() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const router = useRouter();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file");
      return;
    }

    setLoading(true);
    setError(null);

    // Placeholder - will implement FastAPI OCR call later
    setTimeout(() => {
      setLoading(false);
      // In the real implementation, this would:
      // 1. Upload to FastAPI /ocr/parse endpoint
      // 2. Receive parsed data
      // 3. Populate form with extracted items
      // 4. Allow user to edit and save
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <Label htmlFor="receipt">Receipt Image</Label>
        <div className="flex items-center justify-center w-full">
          <label
            htmlFor="receipt"
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer hover:bg-accent transition-colors"
          >
            {preview ? (
              <div className="relative w-full h-full">
                <Image
                  src={preview}
                  alt="Receipt preview"
                  fill
                  className="object-contain p-4"
                />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-12 h-12 mb-4 text-muted-foreground" />
                <p className="mb-2 text-sm text-muted-foreground">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-muted-foreground">
                  PNG, JPG or JPEG (MAX. 10MB)
                </p>
              </div>
            )}
            <input
              id="receipt"
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
              disabled={loading}
            />
          </label>
        </div>
      </div>

      {preview && (
        <div className="space-y-4">
          <div className="rounded-lg bg-muted p-4">
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <ImageIcon className="h-4 w-4" />
              Preview
            </h3>
            <p className="text-sm text-muted-foreground">
              File: {file?.name}
            </p>
            <p className="text-sm text-muted-foreground">
              Size: {((file?.size || 0) / 1024).toFixed(2)} KB
            </p>
          </div>

          {error && (
            <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">
              {error}
            </div>
          )}

          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setPreview(null);
                setFile(null);
              }}
              disabled={loading}
            >
              Clear
            </Button>
            <Button onClick={handleUpload} disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {loading ? "Processing..." : "Upload & Parse"}
            </Button>
          </div>
        </div>
      )}

      {loading && (
        <div className="rounded-lg border bg-card p-6 text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-sm font-medium">Processing receipt...</p>
          <p className="text-xs text-muted-foreground mt-1">
            AI is extracting items and amounts
          </p>
        </div>
      )}
    </div>
  );
}

