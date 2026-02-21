export default function ResultOverview({ result }) {
    const labelMap = {
        SUPPORTS: {
            text: "Supported",
            color: "text-emerald-400",
            bg: "bg-emerald-500/10 border-emerald-500/20",
            bar: "from-emerald-400 to-teal-400",
        },
        REFUTES: {
            text: "Refuted",
            color: "text-rose-400",
            bg: "bg-rose-500/10 border-rose-500/20",
            bar: "from-rose-400 to-pink-400",
        },
        NOT_ENOUGH_INFO: {
            text: "Not Enough Info",
            color: "text-amber-400",
            bg: "bg-amber-500/10 border-amber-500/20",
            bar: "from-amber-400 to-yellow-400",
        },
    };

    const { text, color, bg, bar } = labelMap[result.label];
    const percentage = (result.confidence * 100).toFixed(1);

    return (
        <section className="bg-gradient-to-br from-slate-900/70 to-slate-800/60 backdrop-blur-2xl rounded-3xl border border-white/10 p-8 shadow-2xl shadow-black/40 space-y-8">

            {/* Header */}
            <div className="flex items-center justify-between">

                {/* Verdict Badge */}
                <div className={`px-4 py-2 rounded-full border text-sm font-semibold ${bg} ${color}`}>
                    {text}
                </div>

                {/* Confidence Percentage */}
                <div className="text-right">
                    <p className="text-sm text-slate-400">Confidence</p>
                    <p className="text-3xl font-bold text-white">
                        {percentage}%
                    </p>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
                <div
                    className={`h-3 bg-gradient-to-r ${bar} transition-all duration-700 ease-out`}
                    style={{ width: `${percentage}%` }}
                />
            </div>

        </section>
    );
}
