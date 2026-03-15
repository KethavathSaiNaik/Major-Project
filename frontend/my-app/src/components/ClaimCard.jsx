export default function ClaimCard({ claim, setClaim, onVerify, loading }) {
    return (
        <section className="relative group bg-gradient-to-br from-slate-900/70 to-slate-800/60 backdrop-blur-2xl rounded-3xl border border-white/10 p-8 shadow-2xl shadow-black/40 transition-all duration-300 hover:shadow-indigo-500/10">

            {/* Subtle glow background */}
            <div className="absolute inset-0 rounded-3xl bg-indigo-500/5 opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none" />

            <div className="relative space-y-6">

                {/* Heading */}
                <div className="space-y-1">
                    <h2 className="text-xl font-semibold text-white tracking-tight">
                        Verify a Claim
                    </h2>
                    <p className="text-sm text-slate-400">
                        Enter a factual statement to validate using AI-powered evidence retrieval.
                    </p>
                </div>

                {/* Textarea */}
                <div className="relative">
                    <textarea
                        value={claim}
                        onChange={(e) => setClaim(e.target.value)}
                        placeholder="Example: India won the 2024 T20 World Cup."
                        className="w-full h-36 rounded-2xl bg-black/40 border border-white/10 p-5 text-slate-100 placeholder-slate-500 outline-none resize-none transition-all duration-300 focus:ring-2 focus:ring-indigo-500/70 focus:border-indigo-500/50 focus:bg-black/60"
                    />

                    {/* Character Count (Optional but professional touch) */}
                    <div className="absolute bottom-3 right-4 text-xs text-slate-500">
                        {claim.length} characters
                    </div>
                </div>

                {/* Button */}
                <div className="flex justify-end">
                    <button
                        onClick={onVerify}
                        disabled={loading || !claim.trim()}
                        className={`px-7 py-3 rounded-2xl font-medium text-white transition-all duration-300
                        ${loading || !claim.trim()
                                ? "bg-indigo-600/50 cursor-not-allowed"
                                : "bg-indigo-600 hover:bg-indigo-500 hover:-translate-y-1 hover:shadow-lg hover:shadow-indigo-500/40 active:scale-95"
                            }`}
                    >
                        {loading ? (
                            <span className="flex items-center gap-2">
                                <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                                Verifying...
                            </span>
                        ) : (
                            "Verify Claim"
                        )}
                    </button>
                </div>

            </div>
        </section>
    );
}
