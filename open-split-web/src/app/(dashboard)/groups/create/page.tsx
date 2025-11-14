import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CreateGroupForm } from "@/components/groups/create-group-form";

export const dynamic = "force-dynamic";

export default function CreateGroupPage() {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Create a Group</h2>
        <p className="text-muted-foreground">
          Start a new expense group and invite members
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Group Details</CardTitle>
          <CardDescription>
            Enter the details for your new expense group
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CreateGroupForm />
        </CardContent>
      </Card>
    </div>
  );
}

