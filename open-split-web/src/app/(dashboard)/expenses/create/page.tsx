import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreateExpenseForm } from "@/components/expenses/create-expense-form";
import { ReceiptUpload } from "@/components/expenses/receipt-upload";

export const dynamic = "force-dynamic";

export default function CreateExpensePage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Add Expense</h2>
        <p className="text-muted-foreground">
          Create a new expense manually or upload a receipt
        </p>
      </div>

      <Tabs defaultValue="manual" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="manual">Manual Entry</TabsTrigger>
          <TabsTrigger value="receipt">Upload Receipt</TabsTrigger>
        </TabsList>
        
        <TabsContent value="manual">
          <Card>
            <CardHeader>
              <CardTitle>Expense Details</CardTitle>
              <CardDescription>
                Enter the expense information manually
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CreateExpenseForm />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="receipt">
          <Card>
            <CardHeader>
              <CardTitle>Receipt Upload</CardTitle>
              <CardDescription>
                Upload a receipt and let AI extract the details
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ReceiptUpload />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

