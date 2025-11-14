import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const dynamic = "force-dynamic";

export default function ExpensesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Expenses</h2>
          <p className="text-muted-foreground">
            Track and manage all your expenses
          </p>
        </div>
        <Link href="/expenses/create">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Expense
          </Button>
        </Link>
      </div>

      <div className="grid gap-4">
        {/* Placeholder for expenses list */}
        <Card className="border-dashed">
          <CardHeader>
            <CardTitle>No Expenses Yet</CardTitle>
            <CardDescription>
              Create your first expense or upload a receipt
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Link href="/expenses/create">
                <Button variant="outline">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Manually
                </Button>
              </Link>
              <Link href="/expenses/create">
                <Button>
                  Upload Receipt
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

