export default function EvidenceFeed({ evidence }) {
    return (
        <section className="bg-white/70 backdrop-blur-xl rounded-[2.5rem] border border-purple-100 p-8 shadow-[0_20px_50px_rgba(124,58,237,0.05)] space-y-10">
            
            {/* Header Area */}
            <div className="flex items-center justify-between border-b border-purple-50 pb-6">
                <div className="space-y-1">
                    <h3 className="text-2xl font-black tracking-tight text-slate-900">
                        Supporting Evidence
                    </h3>
                    <p className="text-xs font-bold text-purple-400 uppercase tracking-widest">
                        Verified Sources
                    </p>
                </div>

                <div className="flex items-center gap-2 bg-purple-50 px-4 py-2 rounded-full border border-purple-100">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
                    </span>
                    <span className="text-sm font-black text-purple-700">
                        {evidence.length} Sources
                    </span>
                </div>
            </div>

            {/* Evidence List */}
            <div className="space-y-8">
                {evidence.map((ev, i) => (
                    <article
                        key={i}
                        className="group relative bg-white border border-purple-50 rounded-[2rem] p-8 transition-all duration-500 hover:border-purple-300 hover:shadow-xl hover:shadow-purple-100/50 hover:-translate-y-1"
                    >
                        {/* Source Badge */}
                        <div className="mb-4 inline-flex items-center px-3 py-1 rounded-lg bg-slate-50 border border-slate-100 text-[10px] font-black text-slate-500 uppercase tracking-tighter">
                            Ref: {ev.source}
                        </div>

                        {/* Title */}
                        <h4 className="text-xl font-bold text-slate-900 group-hover:text-purple-600 transition-colors mb-4">
                            {ev.title}
                        </h4>

                        {/* Evidence Sentence Quote */}
                        <div className="relative mb-6">
                            <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 to-indigo-400 rounded-full" />
                            <blockquote className="pl-4 text-slate-600 italic leading-relaxed text-lg">
                                "{ev.sentence_text}"
                            </blockquote>
                        </div>

                        {/* Footer / Link */}
                        <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                            <span className="text-[11px] font-medium text-slate-400 font-mono italic">
                                Scanned by ClaimLens AI
                            </span>
                            
                            <a
                                href={ev.url}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-2 text-sm font-bold text-purple-600 hover:text-indigo-600 transition-colors"
                            >
                                Investigate Source
                                <span className="p-1 rounded-full bg-purple-50 group-hover:bg-purple-600 group-hover:text-white transition-all">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </span>
                            </a>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}