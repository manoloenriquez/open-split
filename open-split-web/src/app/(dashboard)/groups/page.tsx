import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const dynamic = "force-dynamic";

export default function GroupsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Groups</h2>
          <p className="text-muted-foreground">
            Manage your expense groups and members
          </p>
        </div>
        <Link href="/groups/create">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Group
          </Button>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Placeholder for groups list */}
        <Card className="border-dashed">
          <CardHeader>
            <CardTitle>No Groups Yet</CardTitle>
            <CardDescription>
              Create your first group to start splitting expenses
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/groups/create">
              <Button variant="outline" className="w-full">
                <Plus className="mr-2 h-4 w-4" />
                Create Group
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

