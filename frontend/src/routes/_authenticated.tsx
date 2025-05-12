import { userQueryOptions } from "@/lib/api";
import { isValidUrl } from "@/lib/utils";
import { createFileRoute, Outlet } from "@tanstack/react-router";

const Login = () => {
  const loginUrl = import.meta.env.VITE_URL_LOGIN;
  return (
    <div>
      <p>Please log in to access this page.</p>
      <p>
      {isValidUrl(loginUrl) ? (
        <a href={loginUrl} className="ml-3">
          Login
        </a>
      ) : (
        <p>Invalid Login URL</p>
      )}
      </p>
    </div>
  );
};

const Component = () => {
  const { user } = Route.useRouteContext();
  if (!user) {
    return <Login />;
  }

  return <Outlet />;
};

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async ({ context }) => {
    const queryClient = context.queryClient;

    try {
      const data = await queryClient.fetchQuery(userQueryOptions);
      return data;
    } catch (err) {
      console.error(err);
      return { user: null };
    }
  },
  component: Component,
});
