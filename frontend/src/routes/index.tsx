import { createFileRoute } from '@tanstack/react-router';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { api } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';

export const Route = createFileRoute('/')({
  component: Index,
});

const getTotoalSpent = async () => {
  const res = await api.expenses['total-spent'].$get();

  if (!res.ok) {
    throw new Error('Server Error');
  }
  const data = await res.json();
  return data;
};

function Index() {
  const { isPending, error, data } = useQuery({
    queryKey: ['get-total-spent'],
    queryFn: getTotoalSpent,
  });

  if (error) return 'An error has occurred: ' + (error as Error).message;

  return (
    <Card className="w-[350px] m-auto">
      <CardHeader>
        <CardTitle>Total Spent</CardTitle>
        <CardDescription>The total amount you've spent</CardDescription>
      </CardHeader>
      <CardContent>{isPending ? '...' : data.total}</CardContent>
    </Card>
  );
}
