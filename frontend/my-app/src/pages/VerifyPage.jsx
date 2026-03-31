import { useState } from "react";
import { verifyClaim } from "../api/verifyApi";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import ClaimCard from "../components/ClaimCard";
import ResultOverview from "../components/ResultOverview";
import EvidenceFeed from "../components/EvidenceFeed";
import ChatPanel from "../components/ChatPanel";

export default function VerifyPage() {
    const [claim, setClaim] = useState("");
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    async function handleVerify() {
        if (!claim.trim()) return;
        setLoading(true);
        setResult(null);

        try {
            const response = await verifyClaim(claim);
            
            // --- DATA NORMALIZATION ---
            // This ensures "result" always has label, confidence, and evidence
            // regardless of API nesting.
            const normalizedData = {
                label: response.label || response.result?.label || "NOT_ENOUGH_INFO",
                confidence: response.confidence ?? response.result?.confidence ?? 0,
                evidence: response.evidence || response.result?.evidence || [],
                query_id: response.query_id || "N/A"
            };

            setResult(normalizedData);
        } catch (error) {
            console.error("Verification failed:", error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="relative min-h-screen bg-[#faf8ff] text-slate-900 font-sans selection:bg-indigo-100">
            
            {/* BACKGROUND GLOWS */}
            <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-[20%] w-[60%] h-[50%] rounded-full bg-violet-100/60 blur-[130px]" />
                <div className="absolute top-[10%] -right-[10%] w-[50%] h-[60%] rounded-full bg-purple-100/50 blur-[120px]" />
            </div>

            <Navbar />
            
            <main className="relative max-w-7xl mx-auto px-6 pt-12 pb-24">
                <Header />

                {/* INPUT SECTION */}
                <div className="mt-12 flex justify-center">
                    <div className="w-full max-w-3xl">
                        <ClaimCard
                            claim={claim}
                            setClaim={setClaim}
                            onVerify={handleVerify}
                            loading={loading}
                        />
                    </div>
                </div>

                {/* LOADING STATE */}
                {loading && (
                    <div className="mt-16 max-w-3xl mx-auto space-y-6 animate-pulse">
                        <div className="h-64 bg-violet-100/30 rounded-[2rem] border border-violet-100" />
                        <div className="h-32 bg-violet-100/30 rounded-[2rem] border border-violet-100" />
                    </div>
                )}

                {/* RESULTS SECTION */}
                {result && !loading && (
                    <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start transition-all duration-1000">
                        
                        {/* LEFT COLUMN: Result + Evidence */}
                        <div className="lg:col-span-7 space-y-10">
                            
                            {/* The Result Card with Gradient Border */}
                            <section className="relative p-[2px] rounded-[2.5rem] bg-gradient-to-br from-violet-400 to-indigo-500 shadow-2xl shadow-indigo-200/50">
                                {/* ✨ Fixed: Pure white background here ✨ */}
                                <div className="bg-white rounded-[2.45rem] p-8">
                                    <ResultOverview result={result} />
                                </div>
                            </section>

                            <div className="pl-2">
                                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-8 flex items-center gap-4">
                                    <span className="w-12 h-[1px] bg-slate-200"></span>
                                    Verified Sources
                                </h3>
                                <EvidenceFeed evidence={result.evidence} />
                            </div>
                        </div>

                        {/* RIGHT COLUMN: Chat Sidebar */}
                        <aside className="lg:col-span-5 lg:sticky lg:top-24">
                            <div className="rounded-[2.5rem] overflow-hidden border border-violet-200 bg-white/70 backdrop-blur-2xl shadow-xl shadow-indigo-100/30">
                                <ChatPanel result={result} />
                            </div>
                        </aside>

                    </div>
                )}
            </main>
        </div>
    );
}