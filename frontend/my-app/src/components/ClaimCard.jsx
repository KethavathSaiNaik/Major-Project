export default function ClaimCard({ claim, setClaim, onVerify, loading }) {
    return (
        // --- UPDATED CONTAINER CLASSES FOR BETTER VISIBILITY ---
        <div className="relative group bg-white/60 backdrop-blur-2xl border-2 border-purple-200/80 rounded-[2.5rem] p-10 shadow-[0_20px_60px_-15px_rgba(147,51,234,0.15)] ring-1 ring-white/50 transition-all duration-500 hover:shadow-[0_30px_70px_-15px_rgba(147,51,234,0.25)] hover:border-purple-300">
            
            {/* Header Section */}
            <div className="flex items-center justify-between mb-8 gap-4">
                <div className="space-y-1">
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                        Verify a Claim
                    </h2>
                    <p className="text-slate-500 text-sm font-medium">
                        Give us a statement to check its validity using our sources.
                    </p>
                </div>
                
                {/* Modern Status Icon - Purpled */}
                <div className="h-12 w-12 rounded-2xl bg-purple-100/50 border border-purple-200 flex items-center justify-center text-purple-700 shadow-inner group-hover:bg-purple-100 group-hover:scale-105 transition-all">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                    </svg>
                </div>
            </div>

            {/* Input Area */}
            <div className="relative">
                <textarea
                    value={claim}
                    onChange={(e) => setClaim(e.target.value)}
                    placeholder="e.g., The global economy is projected to grow by 3% in 2026."
                    className="w-full h-44 rounded-3xl border-none bg-slate-50/60 p-6 text-slate-900 placeholder-slate-400 outline-none ring-1 ring-purple-200/60 focus:ring-2 focus:ring-purple-500 focus:bg-white/90 transition-all duration-300 resize-none text-lg leading-relaxed shadow-inner"
                />
            </div>

            {/* Footer / Action Section */}
            <div className="flex flex-col sm:flex-row items-center justify-between mt-8 gap-6 pt-2">
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 border border-slate-200 shadow-inner">
                    <div className={`h-2 w-2 rounded-full ${loading ? 'bg-purple-500 animate-pulse' : 'bg-emerald-400'}`} />
                    <span className="text-[11px] font-bold uppercase tracking-widest text-slate-500">
                        {loading ? "Analyzing Sources" : "System Active"}
                    </span>
                </div>
                
                <button
                    onClick={onVerify}
                    disabled={loading || !claim.trim()}
                    className={`
                        relative group overflow-hidden px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-wider transition-all duration-300
                        ${loading || !claim.trim() 
                            ? "bg-slate-200 text-slate-400 cursor-not-allowed" 
                            : "bg-purple-600 text-white shadow-lg shadow-purple-200 hover:bg-purple-700 hover:shadow-xl hover:shadow-purple-300 active:scale-95"
                        }
                    `}
                >
                    <div className="flex items-center gap-3">
                        {loading && (
                            <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                        )}
                        <span>{loading ? "Verifying..." : "Check Claim"}</span>
                    </div>
                </button>
            </div>

        </div>
    );
}