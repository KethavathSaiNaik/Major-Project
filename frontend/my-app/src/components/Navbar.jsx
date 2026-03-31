import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/50">
            <div className="max-w-6xl mx-auto px-6 h-16 flex justify-between items-center">

                {/* Logo Section */}
                <Link to="/" className="flex items-center gap-3 group cursor-pointer outline-none">
                    <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 text-white flex items-center justify-center font-black text-xs shadow-lg shadow-indigo-200 transition-transform group-hover:scale-105">
                        AI
                        <div className="absolute inset-0 rounded-xl border border-white/20"></div>
                    </div>
                    <span className="font-bold text-xl tracking-tight text-slate-900">
                        Claim<span className="text-indigo-600">AI</span>
                    </span>
                </Link>

                {/* Navigation Links */}
                <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-500">
                    <Link to="/dashboard" className="text-slate-900 hover:text-indigo-600 transition-colors">
                        Dashboard
                    </Link>
                    
                    {/* Updated 'Documentation' to 'Blueprints' */}
                    <Link to="/documentation" className="hover:text-indigo-600 transition-colors">
                        Blueprints
                    </Link>
                    
                    <Link to="/api-keys" className="hover:text-indigo-600 transition-colors">
                        API Keys
                    </Link>
                    
                    {/* Divider */}
                    <div className="h-4 w-[1px] bg-slate-200"></div>
                    
                    <Link to="/signin" className="text-slate-600 hover:text-slate-900 transition-colors">
                        Sign In
                    </Link>
                </div>
            </div>
        </nav>
    );
}