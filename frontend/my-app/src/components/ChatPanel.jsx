import { useState, useRef, useEffect } from "react";
import { askChat } from "../api/chatApi";

export default function ChatPanel({ result }) {
    const [question, setQuestion] = useState("");
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const chatEndRef = useRef(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    async function handleAsk() {
        if (!question.trim() || loading) return;

        const userMessage = question;

        setMessages(prev => [
            ...prev,
            { role: "user", text: userMessage },
        ]);

        setQuestion("");
        setLoading(true);

        try {
            const res = await askChat({
                query_id: result.query_id,
                question: userMessage,
                label: result.label,
                confidence: result.confidence,
            });

            setMessages(prev => [
                ...prev,
                { role: "ai", text: res.answer },
            ]);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <aside className="bg-gradient-to-br from-slate-900/70 to-slate-800/60 backdrop-blur-2xl rounded-3xl border border-white/10 p-6 shadow-2xl shadow-black/40 flex flex-col h-[600px]">

            {/* Header */}
            <div className="flex items-center justify-between mb-5">
                <div>
                    <h3 className="text-lg font-semibold text-white">
                        AI Explainability
                    </h3>
                    <p className="text-xs text-slate-400">
                        Ask why this verdict was generated
                    </p>
                </div>

                <div className="px-3 py-1 text-xs rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                    Assistant
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 space-y-4 overflow-y-auto pr-2 mb-4">

                {messages.map((m, i) => (
                    <div
                        key={i}
                        className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                        <div
                            className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed transition-all
                            ${m.role === "user"
                                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
                                : "bg-black/40 border border-white/10 text-slate-300"
                            }`}
                        >
                            {m.role === "ai" && (
                                <div className="text-xs font-semibold text-indigo-400 mb-1">
                                    AI Assistant
                                </div>
                            )}
                            {m.text}
                        </div>
                    </div>
                ))}

                {loading && (
                    <div className="flex justify-start">
                        <div className="bg-black/40 border border-white/10 rounded-2xl px-4 py-3 text-sm text-slate-400">
                            <span className="animate-pulse">AI is typing...</span>
                        </div>
                    </div>
                )}

                <div ref={chatEndRef} />
            </div>

            {/* Input */}
            <div className="flex gap-3">
                <input
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleAsk()}
                    placeholder="Ask why this decision was made..."
                    className="flex-1 bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none text-slate-100 focus:ring-2 focus:ring-indigo-500/60 transition"
                />
                <button
                    onClick={handleAsk}
                    disabled={loading}
                    className={`px-5 py-3 rounded-xl font-medium text-white transition-all
                    ${loading
                        ? "bg-indigo-600/50 cursor-not-allowed"
                        : "bg-indigo-600 hover:bg-indigo-500 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-500/40 active:scale-95"
                    }`}
                >
                    Ask
                </button>
            </div>

        </aside>
    );
}
