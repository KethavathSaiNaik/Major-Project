export default function ConfidenceBar({ confidence, verdict }) {
    // 1. Force conversion and handle edge cases (like null or strings)
    const rawValue = parseFloat(confidence);
    
    // 2. Logic Guard: If it's not a number, default to 0
    const cleanValue = isNaN(rawValue) ? 0 : rawValue;

    // 3. Robust Auto-detect: 
    // If value is between 0.0 and 1.1, assume it's a decimal (e.g., 0.92 -> 92%)
    // If value is > 1.1, assume it's already a percentage (e.g., 92 -> 92%)
    const percentage = cleanValue <= 1.1 ? cleanValue * 100 : cleanValue;

    return (
        <div className="w-full max-w-md">
            <div className="bg-[#1e293b] rounded-[2rem] p-6 shadow-xl space-y-4 border border-white/5">
                
                <div className="flex justify-between items-start">
                    {/* Dynamic Badge */}
                    <div className="px-4 py-1.5 rounded-full bg-[#10B981]/10 border border-[#10B981]/30 text-[#10B981] text-xs font-bold uppercase tracking-wider">
                        {verdict || "Supported"}
                    </div>

                    <div className="text-right">
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                            Confidence
                        </p>
                        <p className="text-3xl font-black text-white tabular-nums">
                            {percentage.toFixed(1)}%
                        </p>
                    </div>
                </div>

                {/* The Bar - Ensuring width is always a valid string */}
                <div className="w-full h-2.5 bg-slate-900/60 rounded-full overflow-hidden border border-white/5">
                    <div
                        className="h-full bg-[#10B981] transition-all duration-1000 ease-out shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                        style={{ width: `${Math.min(Math.max(percentage, 0), 100)}%` }}
                    />
                </div>
            </div>
        </div>
    );
}