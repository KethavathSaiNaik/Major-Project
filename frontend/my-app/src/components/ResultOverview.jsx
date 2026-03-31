export default function ResultOverview({ result }) {
    // Light-theme friendly badges for the verdict
    const labelMap = {
        SUPPORTS: {
            text: "Supported",
            color: "text-emerald-700",
            bg: "bg-emerald-50 border-emerald-200 shadow-sm",
        },
        REFUTES: {
            text: "Refuted",
            color: "text-rose-700",
            bg: "bg-rose-50 border-rose-200 shadow-sm",
        },
        NOT_ENOUGH_INFO: {
            text: "Not Enough Info",
            color: "text-amber-700",
            bg: "bg-amber-50 border-amber-200 shadow-sm",
        },
    };

    const activeLabel = result?.label?.toUpperCase() || "NOT_ENOUGH_INFO";
    const theme = labelMap[activeLabel] || labelMap.NOT_ENOUGH_INFO;
    
    const rawValue = parseFloat(result?.confidence);
    const validNumber = isNaN(rawValue) ? 0 : rawValue;
    const percentage = validNumber <= 1 ? (validNumber * 100) : validNumber;

    return (
        // MAKE SURE THIS LINE DOES NOT HAVE bg-slate-900
        <section className="space-y-8 w-full">
            <div className="flex items-center justify-between">
                
                <div className={`px-4 py-1.5 rounded-full border text-sm font-bold tracking-wide uppercase ${theme.bg} ${theme.color}`}>
                    {theme.text}
                </div>
                
                <div className="text-right">
                    {/* Changed from text-white to text-slate-800 */}
                    <p className="text-4xl font-black text-slate-800 tracking-tight">
                        {percentage.toFixed(1)}%
                    </p>
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mt-1">
                        Confidence
                    </p>
                </div>
            </div>

            <div className="w-full h-3 bg-purple-100/50 rounded-full overflow-hidden shadow-inner border border-purple-50/50">
                <div
                    className="h-full transition-all duration-1000 ease-out"
                    style={{ 
                        width: `${Math.max(percentage, 2)}%`, 
                        backgroundImage: "linear-gradient(to right, #c084fc, #9333ea)"
                    }} 
                />
            </div>
        </section>
    );
}