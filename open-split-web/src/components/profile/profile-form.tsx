"use client";

import { useState } from "react";
import { User } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Upload } from "lucide-react";
import { updateProfile, uploadProfileImage, uploadInstapayQR } from "@/app/(dashboard)/profile/actions";
import { UserProfile } from "@/types/user";

interface ProfileFormProps {
  user: User;
  profile: UserProfile | null;
}

export function ProfileForm({ user, profile }: ProfileFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    const formData = new FormData(e.currentTarget);

    try {
      const result = await updateProfile(formData);
      if (result?.error) {
        setError(result.error);
      } else {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const result = await uploadProfileImage(formData);
      if (result?.error) {
        setError(result.error);
      } else {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      }
    } catch (err) {
      setError("Failed to upload image");
    } finally {
      setLoading(false);
    }
  };

  const handleQRUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const result = await uploadInstapayQR(formData);
      if (result?.error) {
        setError(result.error);
      } else {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      }
    } catch (err) {
      setError("Failed to upload QR code");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={user.email || ""}
            disabled
            className="bg-muted"
          />
          <p className="text-xs text-muted-foreground">
            Email cannot be changed
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="full_name">Full Name</Label>
          <Input
            id="full_name"
            name="full_name"
            type="text"
            defaultValue={profile?.full_name || user.user_metadata?.full_name || ""}
            disabled={loading}
            placeholder="Your full name"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="contact_number">Contact Number</Label>
          <Input
            id="contact_number"
            name="contact_number"
            type="tel"
            defaultValue={profile?.contact_number || ""}
            disabled={loading}
            placeholder="+63 XXX XXX XXXX"
          />
        </div>

        <div className="border-t pt-4 space-y-4">
          <h3 className="text-sm font-semibold">Bank Information</h3>
          
          <div className="space-y-2">
            <Label htmlFor="bank_account_name">Bank Account Name</Label>
            <Input
              id="bank_account_name"
              name="bank_account_name"
              type="text"
              defaultValue={profile?.bank_account_name || ""}
              disabled={loading}
              placeholder="Name on bank account"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bank_account_number">Bank Account Number</Label>
            <Input
              id="bank_account_number"
              name="bank_account_number"
              type="text"
              defaultValue={profile?.bank_account_number || ""}
              disabled={loading}
              placeholder="1234567890"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="gcash_number">GCash Number</Label>
            <Input
              id="gcash_number"
              name="gcash_number"
              type="tel"
              defaultValue={profile?.gcash_number || ""}
              disabled={loading}
              placeholder="+63 XXX XXX XXXX"
            />
          </div>
        </div>

        <div className="border-t pt-4 space-y-4">
          <h3 className="text-sm font-semibold">Images & QR Codes</h3>
          
          <div className="space-y-2">
            <Label htmlFor="profile_image">Profile Image</Label>
            <div className="flex items-center gap-2">
              <Input
                id="profile_image"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={loading}
                className="flex-1"
              />
              <Button type="button" variant="outline" size="icon" disabled>
                <Upload className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="instapay_qr">InstaPay QR Code</Label>
            <div className="flex items-center gap-2">
              <Input
                id="instapay_qr"
                type="file"
                accept="image/*"
                onChange={handleQRUpload}
                disabled={loading}
                className="flex-1"
              />
              <Button type="button" variant="outline" size="icon" disabled>
                <Upload className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {error && (
        <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {success && (
        <div className="rounded-md bg-green-500/15 p-3 text-sm text-green-600">
          Profile updated successfully!
        </div>
      )}

      <Button type="submit" disabled={loading}>
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Save Changes
      </Button>
    </form>
  );
}

