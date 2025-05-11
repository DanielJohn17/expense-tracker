import { createFileRoute } from "@tanstack/react-router";
import { userQueryOptions } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export const Route = createFileRoute("/profile")({
  component: Profile,
});

function Profile() {
  const { isPending, error, data } = useQuery(userQueryOptions);

  if (isPending) return "Loading...";

  if (error) return "Not logged in" + (error as Error).message;

  return (
    <div className="p-2">
      Hello from Profile!
      <p>Hello {data.user.family_name}</p>
    </div>
  );
}
