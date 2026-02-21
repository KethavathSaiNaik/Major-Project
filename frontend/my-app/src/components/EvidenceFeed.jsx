export default function EvidenceFeed({ evidence }) {
    return (
        <section className="bg-gradient-to-br from-slate-900/70 to-slate-800/60 backdrop-blur-2xl rounded-3xl border border-white/10 p-8 shadow-2xl shadow-black/40 space-y-8">

            <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold tracking-tight text-white">
                    Supporting Evidence
                </h3>

                <span className="text-sm text-slate-400">
                    {evidence.length} sources found
                </span>
            </div>

            <div className="space-y-6">
                {evidence.map((ev, i) => (
                    <article
                        key={i}
                        className="group bg-black/40 border border-white/10 rounded-2xl p-6 space-y-4 transition-all duration-300 hover:border-indigo-500/40 hover:bg-black/60 hover:shadow-lg hover:shadow-indigo-500/10"
                    >

                        {/* Title */}
                        <h4 className="font-semibold text-white group-hover:text-indigo-300 transition">
                            {ev.title}
                        </h4>

                        {/* Source */}
                        <p className="text-sm text-slate-500">
                            Source: {ev.source}
                        </p>

                        {/* Evidence Sentence */}
                        <blockquote className="relative border-l-4 border-indigo-500 pl-4 text-slate-300 italic leading-relaxed">
                            {ev.sentence_text}
                        </blockquote>

                        {/* Link */}
                        <a
                            href={ev.url}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center text-sm text-indigo-400 hover:text-indigo-300 transition"
                        >
                            View Source
                            <span className="ml-1 group-hover:translate-x-1 transition-transform">
                                →
                            </span>
                        </a>
                    </article>
                ))}
            </div>
        </section>
    );
}
