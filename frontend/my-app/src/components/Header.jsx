export default function Header() {
    return (
        <header className="relative z-10">
            <div className="max-w-7xl mx-auto px-6 pt-20 pb-16 text-center">

                {/* Tagline Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 text-sm rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                    🧠 AI-Powered Fact Intelligence
                </div>

                {/* Main Heading */}
                <h1 className="text-5xl md:text-6xl font-bold tracking-tight leading-tight bg-gradient-to-r from-white via-indigo-200 to-purple-300 bg-clip-text text-transparent">
                    Verify Claims With
                    <br />
                    Evidence-Based AI
                </h1>

                {/* Subtext */}
                <p className="mt-6 text-lg text-slate-400 max-w-3xl mx-auto leading-relaxed">
                    Our system retrieves relevant evidence and applies
                    advanced Natural Language Inference models to determine
                    whether a claim is supported, refuted, or inconclusive.
                </p>

            </div>
        </header>
    );
}
