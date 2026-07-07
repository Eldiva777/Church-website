import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Route, Switch, Router as WouterRouter, Redirect } from 'wouter';
import Login from '@/pages/admin/Login';
import Dashboard from '@/pages/admin/Dashboard';

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/admin/login" component={Login} />
      <Route path="/admin/dashboard" component={Dashboard} />
      {/* Redirect root to admin login for now */}
      <Route path="/">
        <Redirect to="/admin/login" />
      </Route>
      <Route>
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <p className="text-gray-500">Page not found.</p>
        </div>
      </Route>
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
        <Router />
      </WouterRouter>
    </QueryClientProvider>
  );
}

export default App;
