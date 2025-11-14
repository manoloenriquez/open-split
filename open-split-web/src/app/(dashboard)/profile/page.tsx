import { createServerClient } from "@/lib/supabase/server";
import { ProfileForm } from "@/components/profile/profile-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const dynamic = "force-dynamic";

async function getProfile() {
  try {
    const supabase = await createServerClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return null;
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    return { user, profile };
  } catch (error) {
    console.error("Error fetching profile:", error);
    return null;
  }
}

export default async function ProfilePage() {
  const data = await getProfile();

  if (!data) {
    return (
      <div className="flex items-center justify-center h-full">
        <p>Not authenticated</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Profile</h2>
        <p className="text-muted-foreground">
          Manage your account settings and payment information
        </p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
            <CardDescription>
              Update your profile details and contact information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ProfileForm user={data.user} profile={data.profile} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payment Information</CardTitle>
            <CardDescription>
              Add your payment details to receive settlements
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Payment information fields are included in the form above
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

