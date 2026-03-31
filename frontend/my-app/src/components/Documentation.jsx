import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";

export default function Documentation() {
    const [active, setActive] = useState("overview");
    const [progress, setProgress] = useState(0);

    /* =============================
        Scroll + Spy Combined
    ============================== */
    useEffect(() => {
        const sections = Array.from(document.querySelectorAll("section"));

        const handleScroll = () => {
            const totalHeight =
                document.documentElement.scrollHeight -
                document.documentElement.clientHeight;

            if (totalHeight > 0) {
                setProgress((window.scrollY / totalHeight) * 100);
            }

            const scrollY = window.scrollY + 200;
            let current = sections[0]?.id;

            for (const section of sections) {
                if (scrollY >= section.offsetTop) {
                    current = section.id;
                }
            }

            setActive((prev) => (prev !== current ? current : prev));
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll(); 

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    /* =============================
        Smooth Scroll
    ============================== */
    const handleNavClick = (e, id) => {
        e.preventDefault();
        const el = document.getElementById(id);
        if (!el) return;

        setActive(id);
        el.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    };

    const linkClass = (id) =>
        `transition-all px-4 py-2 rounded-xl text-left w-full text-xs font-semibold tracking-tight ${
            active === id
                ? "bg-purple-600 text-white shadow-md shadow-purple-200"
                : "text-slate-500 hover:text-purple-700 hover:bg-purple-50/50"
        }`;

    const sectionsList = [
        ["overview", "Overview"],
        ["pipeline", "System Pipeline"],
        ["models", "Models Used"],
        ["architecture", "Architecture"],
        ["usage", "How to Use"],
        ["limitations", "Limitations"],
    ];

    return (
        <div className="min-h-screen bg-[#FDFCFE] text-slate-900 selection:bg-purple-100 selection:text-purple-900 antialiased font-sans">
            <Navbar />

            {/* Fixed Progress Bar */}
            <div className="fixed top-0 left-0 w-full h-1 bg-purple-50 z-[60]">
                <div
                    className="h-full bg-purple-600 transition-all duration-150"
                    style={{ width: `${progress}%` }}
                />
            </div>

            <div className="max-w-6xl mx-auto px-6 md:px-10 py-12 grid grid-cols-1 lg:grid-cols-4 gap-12">

                {/* Sidebar Column */}
                <aside className="lg:col-span-1">
                    <div className="sticky top-28 bg-white/70 backdrop-blur-xl border border-purple-100/50 rounded-2xl p-5 shadow-[0_4px_20px_rgb(0,0,0,0.03)]">
                        <h3 className="text-[9px] font-bold text-purple-500 uppercase tracking-widest mb-4 px-2">
                            Navigation
                        </h3>

                        <nav className="flex flex-col gap-1">
                            {sectionsList.map(([id, label]) => (
                                <button
                                    key={id}
                                    onClick={(e) => handleNavClick(e, id)}
                                    className={linkClass(id)}
                                >
                                    {label}
                                </button>
                            ))}
                        </nav>
                    </div>
                </aside>

                {/* Main Content Column */}
                <main className="lg:col-span-3 space-y-24">

                    {/* Page Header */}
                    <header className="space-y-4">
                        <div className="inline-flex px-2.5 py-1 rounded-full bg-purple-50 border border-purple-100 text-purple-700 text-[9px] font-bold uppercase tracking-widest">
                            Technical Manual
                        </div>

                        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">
                            Documentation
                        </h1>

                        <p className="text-sm text-slate-500 max-w-2xl font-medium leading-relaxed">
                            Comprehensive technical documentation for the ClaimLens multi-model fact verification system.
                        </p>
                    </header>

                    {/* 01: Overview */}
                    <section id="overview" className="scroll-mt-32 space-y-6 group">
                        <div className="space-y-3">
                            <h2 className="text-2xl font-bold flex items-center gap-3 text-slate-900 group-hover:text-purple-700 transition-colors tracking-tight">
                                <span className="w-8 h-8 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center text-xs font-bold border border-purple-100 shadow-sm">
                                    01
                                </span>
                                Overview
                            </h2>
                            <div className="h-[2px] w-8 bg-purple-200 rounded-full group-hover:w-16 transition-all duration-500"></div>
                        </div>
                        <div className="bg-white/50 border border-purple-50/60 p-6 rounded-2xl shadow-sm">
                            <div className="space-y-3 text-slate-600 text-sm leading-relaxed">
                                <p>
                                    ClaimLens is an AI-powered fact verification platform that evaluates natural language claims using retrieval-augmented multi-model reasoning.
                                </p>
                                <p>
                                    By combining dense retrieval with ensemble NLI verification, the system improves factual reliability and reduces single-model bias.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* 02: Pipeline */}
                    <section id="pipeline" className="scroll-mt-32 space-y-6 group">
                        <div className="space-y-3">
                            <h2 className="text-2xl font-bold flex items-center gap-3 text-slate-900 group-hover:text-purple-700 transition-colors tracking-tight">
                                <span className="w-8 h-8 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center text-xs font-bold border border-purple-100 shadow-sm">
                                    02
                                </span>
                                System Pipeline
                            </h2>
                            <div className="h-[2px] w-8 bg-purple-200 rounded-full group-hover:w-16 transition-all duration-500"></div>
                        </div>
                        <div className="bg-white/50 border border-purple-50/60 p-6 rounded-2xl shadow-sm">
                            <ul className="space-y-2 text-slate-600 text-sm leading-relaxed list-disc list-inside">
                                <li>Claim preprocessing and normalization</li>
                                <li>Dense semantic retrieval</li>
                                <li>Evidence sentence extraction</li>
                                <li>Multi-model NLI verification</li>
                                <li>Verdict aggregation</li>
                                <li>Explanation generation</li>
                            </ul>
                        </div>
                    </section>

                    {/* 03: Models Used */}
                    <section id="models" className="scroll-mt-32 space-y-6 group">
                        <div className="space-y-3">
                            <h2 className="text-2xl font-bold flex items-center gap-3 text-slate-900 group-hover:text-purple-700 transition-colors tracking-tight">
                                <span className="w-8 h-8 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center text-xs font-bold border border-purple-100 shadow-sm">
                                    03
                                </span>
                                Models Used
                            </h2>
                            <div className="h-[2px] w-8 bg-purple-200 rounded-full group-hover:w-16 transition-all duration-500"></div>
                        </div>
                        <div className="grid md:grid-cols-3 gap-4">
                            <div className="bg-white border border-purple-50 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
                                <h4 className="font-semibold mb-1.5 text-sm text-slate-900">DeBERTa-v3 Large</h4>
                                <p className="text-xs text-slate-500 leading-relaxed">High-accuracy primary verifier.</p>
                            </div>
                            <div className="bg-white border border-purple-50 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
                                <h4 className="font-semibold mb-1.5 text-sm text-slate-900">DeBERTa-v3 Base</h4>
                                <p className="text-xs text-slate-500 leading-relaxed">Lightweight verifier for ensemble diversity.</p>
                            </div>
                            <div className="bg-white border border-purple-50 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
                                <h4 className="font-semibold mb-1.5 text-sm text-slate-900">RoBERTa Verifier</h4>
                                <p className="text-xs text-slate-500 leading-relaxed">Secondary robustness verifier.</p>
                            </div>
                        </div>
                    </section>

                    {/* 04: Architecture */}
                    <section id="architecture" className="scroll-mt-32 space-y-6 group">
                        <div className="space-y-3">
                            <h2 className="text-2xl font-bold flex items-center gap-3 text-slate-900 group-hover:text-purple-700 transition-colors tracking-tight">
                                <span className="w-8 h-8 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center text-xs font-bold border border-purple-100 shadow-sm">
                                    04
                                </span>
                                Architecture
                            </h2>
                            <div className="h-[2px] w-8 bg-purple-200 rounded-full group-hover:w-16 transition-all duration-500"></div>
                        </div>
                        <div className="bg-white/50 border border-purple-50/60 p-6 rounded-2xl shadow-sm">
                            <p className="text-slate-600 text-sm leading-relaxed">
                                ClaimLens follows a modular retrieval-augmented verification pipeline enabling independent upgrades of retriever and verifier components.
                            </p>
                        </div>
                    </section>

                    {/* 05: How to Use */}
                    <section id="usage" className="scroll-mt-32 space-y-6 group">
                        <div className="space-y-3">
                            <h2 className="text-2xl font-bold flex items-center gap-3 text-slate-900 group-hover:text-purple-700 transition-colors tracking-tight">
                                <span className="w-8 h-8 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center text-xs font-bold border border-purple-100 shadow-sm">
                                    05
                                </span>
                                How to Use
                            </h2>
                            <div className="h-[2px] w-8 bg-purple-200 rounded-full group-hover:w-16 transition-all duration-500"></div>
                        </div>
                        <div className="bg-white/50 border border-purple-50/60 p-6 rounded-2xl shadow-sm">
                            <ol className="space-y-2 text-slate-600 text-sm leading-relaxed list-decimal list-inside marker:text-purple-600 marker:font-semibold">
                                <li>Enter a factual claim.</li>
                                <li>Submit for verification.</li>
                                <li>Review evidence.</li>
                                <li>Check the AI verdict.</li>
                                <li>Inspect model agreement.</li>
                            </ol>
                        </div>
                    </section>

                    {/* 06: Limitations */}
                    <section id="limitations" className="scroll-mt-32 space-y-6 group">
                        <div className="space-y-3">
                            <h2 className="text-2xl font-bold flex items-center gap-3 text-slate-900 group-hover:text-purple-700 transition-colors tracking-tight">
                                <span className="w-8 h-8 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center text-xs font-bold border border-purple-100 shadow-sm">
                                    06
                                </span>
                                Limitations
                            </h2>
                            <div className="h-[2px] w-8 bg-purple-200 rounded-full group-hover:w-16 transition-all duration-500"></div>
                        </div>
                        <div className="bg-white/50 border border-purple-50/60 p-6 rounded-2xl shadow-sm">
                            <p className="text-slate-600 text-sm leading-relaxed">
                                While the system is highly capable, its output quality is limited by the scope of available retrieval sources. Users should exercise caution when evaluating emerging news cycles or vague assertions.
                            </p>
                        </div>
                    </section>

                    <footer className="pt-12 border-t border-purple-50 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                        ClaimLens © {new Date().getFullYear()} • Research Prototype
                    </footer>

                </main>
            </div>
        </div>
    );
}