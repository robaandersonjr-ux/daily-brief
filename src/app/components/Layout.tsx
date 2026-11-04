import { Outlet, Link, useLocation, useNavigate } from "react-router";
import { Logo } from "./Logo";
import { Plus } from "lucide-react";

export function Layout() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background relative">
      <header className="border-b border-white/10">
        <div className="max-w-md mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/dashboard" className="flex items-center gap-3">
            <Logo size="sm" />
            <div>
              <div className="text-[16px] text-white tracking-[0.04em] leading-tight">
                <span className="font-light text-white/70">daily </span>
                <span className="font-normal text-[#5271FF]">brief</span>
              </div>
            </div>
          </Link>
        </div>
      </header>
      
      <main className="max-w-md mx-auto px-6 py-8 pb-24">
        <Outlet />
      </main>

      {/* Floating Action Button */}
      {location.pathname === "/dashboard" && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 max-w-md w-full px-6 pointer-events-none">
          <div className="flex justify-end pointer-events-auto">
            <button
              onClick={() => navigate("/intentions")}
              className="size-14 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-105 active:scale-95"
              style={{ backgroundColor: '#AD4E14' }}
            >
              <Plus className="size-6 text-white" strokeWidth={2} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}