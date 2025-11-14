"use server";

import { revalidatePath } from "next/cache";
import { createServerClient } from "@/lib/supabase/server";

export async function updateProfile(formData: FormData) {
  const supabase = await createServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Not authenticated" };
  }

  const profileData = {
    id: user.id,
    full_name: formData.get("full_name") as string,
    contact_number: formData.get("contact_number") as string,
    bank_account_name: formData.get("bank_account_name") as string,
    bank_account_number: formData.get("bank_account_number") as string,
    gcash_number: formData.get("gcash_number") as string,
    updated_at: new Date().toISOString(),
  };

  const { error } = await supabase
    .from("profiles")
    .upsert(profileData, { onConflict: "id" });

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/profile");
  return { success: true };
}

export async function uploadProfileImage(formData: FormData) {
  const supabase = await createServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Not authenticated" };
  }

  const file = formData.get("file") as File;
  if (!file) {
    return { error: "No file provided" };
  }

  const fileExt = file.name.split(".").pop();
  const fileName = `${user.id}-${Date.now()}.${fileExt}`;
  const filePath = `profile-images/${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from("avatars")
    .upload(filePath, file, { upsert: true });

  if (uploadError) {
    return { error: uploadError.message };
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from("avatars").getPublicUrl(filePath);

  const { error: updateError } = await supabase
    .from("profiles")
    .update({ profile_image_url: publicUrl, updated_at: new Date().toISOString() })
    .eq("id", user.id);

  if (updateError) {
    return { error: updateError.message };
  }

  revalidatePath("/profile");
  return { success: true, url: publicUrl };
}

export async function uploadInstapayQR(formData: FormData) {
  const supabase = await createServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Not authenticated" };
  }

  const file = formData.get("file") as File;
  if (!file) {
    return { error: "No file provided" };
  }

  const fileExt = file.name.split(".").pop();
  const fileName = `${user.id}-instapay-${Date.now()}.${fileExt}`;
  const filePath = `instapay-qr/${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from("payment-qr")
    .upload(filePath, file, { upsert: true });

  if (uploadError) {
    return { error: uploadError.message };
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from("payment-qr").getPublicUrl(filePath);

  const { error: updateError } = await supabase
    .from("profiles")
    .update({ instapay_qr_url: publicUrl, updated_at: new Date().toISOString() })
    .eq("id", user.id);

  if (updateError) {
    return { error: updateError.message };
  }

  revalidatePath("/profile");
  return { success: true, url: publicUrl };
}

