import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="border-b border-white/10 bg-slate-950/70 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div>
          <Link to="/" className="text-lg font-semibold tracking-tight text-white">
            Food Product Explorer
          </Link>
          <p className="text-xs text-slate-400">Nutrition search workspace</p>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
