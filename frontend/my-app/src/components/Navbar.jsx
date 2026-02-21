export default function Navbar() {
    return (
        <nav className="sticky top-0 z-50 backdrop-blur-2xl bg-slate-950/80 border-b border-white/5">
            <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">

                {/* Logo */}
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-indigo-500/30">
                        AI
                    </div>
                    <span className="text-lg font-semibold tracking-tight text-white">
                        ClaimAI
                    </span>
                </div>

                {/* Center Navigation */}
                <div className="hidden md:flex items-center gap-10 text-sm text-slate-400">
                    <span className="hover:text-white transition cursor-pointer">
                        Dashboard
                    </span>
                    <span className="hover:text-white transition cursor-pointer">
                        Documentation
                    </span>
                    <span className="hover:text-white transition cursor-pointer">
                        API
                    </span>
                </div>

                {/* Right Side */}
                <div className="flex items-center gap-4">

                    <span className="hidden md:inline-flex px-3 py-1 text-xs rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                        Beta
                    </span>

                    <button className="px-4 py-2 text-sm rounded-xl bg-white/5 hover:bg-white/10 transition border border-white/10">
                        Sign In
                    </button>

                </div>
            </div>
        </nav>
    );
}
