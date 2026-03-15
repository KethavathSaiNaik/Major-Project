import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";

export default function Documentation() {
    const [active, setActive] = useState("overview");
    const [progress, setProgress] = useState(0);

    /* =============================
        Scroll Progress
    ============================== */
    useEffect(() => {
        const handleScroll = () => {
            const totalHeight =
                document.documentElement.scrollHeight -
                document.documentElement.clientHeight;

            if (totalHeight === 0) return;
            setProgress((window.scrollY / totalHeight) * 100);
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    /* =============================
        🔥 Optimized Scroll Spy
    ============================== */
    useEffect(() => {
        const sections = Array.from(document.querySelectorAll("section"));

        const handleSpy = () => {
            // 160px offset to trigger the highlight slightly before 
            // the section hits the top of the viewport
            const scrollY = window.scrollY + 160;

            let current = sections[0]?.id;

            for (const section of sections) {
                if (scrollY >= section.offsetTop) {
                    current = section.id;
                }
            }

            setActive((prev) => (prev !== current ? current : prev));
        };

        window.addEventListener("scroll", handleSpy);
        handleSpy();

        return () => window.removeEventListener("scroll", handleSpy);
    }, []);

    /* =============================
        Smooth Scroll Logic
    ============================== */
    const handleNavClick = (e, id) => {
        e.preventDefault();

        const el = document.getElementById(id);
        if (!el) return;

        // Set active immediately for snappy UI feel
        setActive(id);

        // scrollIntoView respects your "scroll-mt-32" CSS class
        el.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    };

    const linkClass = (id) =>
        `transition px-3 py-2 rounded-lg text-left w-full ${active === id
            ? "bg-indigo-500/25 text-indigo-300 font-medium"
            : "text-slate-400 hover:text-white hover:bg-white/5"
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
        <div className="min-h-screen bg-slate-950 text-white">
            <Navbar />

            {/* Progress bar */}
            <div className="fixed top-0 left-0 w-full h-[2px] bg-white/5 z-50">
                <div
                    className="h-full bg-indigo-500 transition-all duration-150"
                    style={{ width: `${progress}%` }}
                />
            </div>

            <div className="max-w-7xl mx-auto px-6 md:px-10 py-12 grid grid-cols-1 lg:grid-cols-4 gap-12">
                {/* Sidebar */}
                <aside className="lg:col-span-1">
                    <div className="sticky top-24 bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl">
                        <h3 className="text-sm font-semibold text-slate-300 mb-4 tracking-wide">
                            Documentation
                        </h3>

                        <nav className="flex flex-col gap-2 text-sm">
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

                {/* Main Content */}
                <main className="lg:col-span-3 space-y-28">
                    {/* Header */}
                    <div className="space-y-4">
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                            ClaimLens Documentation
                        </h1>
                        <p className="text-slate-400 max-w-2xl">
                            Comprehensive technical documentation for the
                            ClaimLens multi-model fact verification system.
                        </p>
                    </div>

                    {/* Overview */}
                    <section id="overview" className="scroll-mt-32 space-y-4">
                        <h2 className="text-2xl font-semibold text-indigo-400">
                            🔍 Overview
                        </h2>
                        <p className="text-slate-300 leading-relaxed">
                            ClaimLens is an AI-powered fact verification platform
                            that evaluates natural language claims using
                            retrieval-augmented multi-model reasoning.
                        </p>
                        <p className="text-slate-300 leading-relaxed">
                            By combining dense retrieval with ensemble NLI
                            verification, the system improves factual reliability
                            and reduces single-model bias.
                        </p>
                    </section>

                    {/* Pipeline */}
                    <section id="pipeline" className="scroll-mt-32 space-y-6">
                        <h2 className="text-2xl font-semibold text-indigo-400">
                            System Pipeline
                        </h2>
                        <div className="bg-slate-900/60 border border-white/10 rounded-2xl p-6">
                            <ul className="space-y-3 text-slate-300 list-disc list-inside">
                                <li>Claim preprocessing and normalization</li>
                                <li>Dense semantic retrieval</li>
                                <li>Evidence sentence extraction</li>
                                <li>Multi-model NLI verification</li>
                                <li>Verdict aggregation</li>
                                <li>Explanation generation</li>
                            </ul>
                        </div>
                    </section>

                    {/* Models */}
                    <section id="models" className="scroll-mt-32 space-y-6">
                        <h2 className="text-2xl font-semibold text-indigo-400">
                            Models Used
                        </h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="bg-slate-900/60 border border-white/10 rounded-2xl p-6">
                                <h4 className="font-semibold mb-2 text-lg text-white">DeBERTa-v3 Large</h4>
                                <p className="text-sm text-slate-400">High-accuracy primary verifier.</p>
                            </div>
                            <div className="bg-slate-900/60 border border-white/10 rounded-2xl p-6">
                                <h4 className="font-semibold mb-2 text-lg text-white">DeBERTa-v3 Base</h4>
                                <p className="text-sm text-slate-400">Lightweight verifier for ensemble diversity.</p>
                            </div>
                            <div className="bg-slate-900/60 border border-white/10 rounded-2xl p-6">
                                <h4 className="font-semibold mb-2 text-lg text-white">RoBERTa Verifier</h4>
                                <p className="text-sm text-slate-400">Secondary robustness verifier.</p>
                            </div>
                        </div>
                    </section>

                    {/* Architecture */}
                    <section id="architecture" className="scroll-mt-32 space-y-4">
                        <h2 className="text-2xl font-semibold text-indigo-400">
                            Architecture
                        </h2>
                        <p className="text-slate-300 leading-relaxed">
                            ClaimLens follows a modular retrieval-augmented
                            verification pipeline enabling independent upgrades of
                            retriever and verifier components.
                        </p>
                    </section>

                    {/* Usage */}
                    <section id="usage" className="scroll-mt-32 space-y-4">
                        <h2 className="text-2xl font-semibold text-indigo-400">
                            How to Use
                        </h2>
                        <ol className="space-y-3 text-slate-300 list-decimal list-inside">
                            <li>Enter a factual claim.</li>
                            <li>Submit for verification.</li>
                            <li>Review evidence.</li>
                            <li>Check the AI verdict.</li>
                            <li>Inspect model agreement.</li>
                        </ol>
                    </section>

                    {/* Limitations */}
                    <section id="limitations" className="scroll-mt-32 space-y-4">
                        <h2 className="text-2xl font-semibold text-indigo-400">
                            Limitations
                        </h2>
                        <p className="text-slate-300 leading-relaxed">
                            While the system is highly capable, its output quality is limited by the scope of available retrieval sources. Users should exercise caution when evaluating emerging news cycles or vague assertions.
                        </p>
                    </section>

                    <div className="pt-10 border-t border-white/10 text-sm text-slate-500">
                        ClaimLens © {new Date().getFullYear()} • Research Prototype
                    </div>
                </main>
            </div>
        </div>
    );
}