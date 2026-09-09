import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "./components/dashboard/Sidebar";
import { useAuth } from "./components/dashboard/AuthContext";
import { Toaster } from "sonner";

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
          <p className="text-sm font-medium text-slate-500">Loading Support Ops Tracker...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <Toaster richColors position="top-right" />
      <Sidebar />
      <main className="ml-64 min-h-screen bg-slate-50">
        <Outlet />
      </main>
    </>
  );
}

export default App;