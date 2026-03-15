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
            const data = await verifyClaim(claim);
            setResult(data);
        } catch (err) {
            console.error("Verification failed:", err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="relative min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden">

            {/* Background Glow Effects */}
            <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 right-0 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"></div>

            <Navbar />
            <Header />

            <main className="relative z-10 max-w-7xl mx-auto px-6 py-16 space-y-20">

                {/* Claim + Result Section */}
                <section className="flex flex-col items-center gap-12">

                    <div className="w-full max-w-2xl">
                        <ClaimCard
                            claim={claim}
                            setClaim={setClaim}
                            onVerify={handleVerify}
                            loading={loading}
                        />
                    </div>

{result && (
    <div className="w-full max-w-2xl animate-fadeIn">
        <ResultOverview result={result} />
    </div>
)}


                </section>

                {/* Evidence + Chat Section */}
                {result && (
                    <section className="grid grid-cols-1 lg:grid-cols-3 gap-10 animate-fadeIn">

                        <div className="lg:col-span-2">
                            <EvidenceFeed evidence={result.evidence} />
                        </div>

                        <ChatPanel result={result} />

                    </section>
                )}
            </main>
        </div>
    );
}
