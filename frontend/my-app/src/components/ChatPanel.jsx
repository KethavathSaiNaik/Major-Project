import { useState, useRef, useEffect } from "react";
import { askChat } from "../api/chatApi";

export default function ChatPanel({ result }) {
    const [question, setQuestion] = useState("");
    const [messages, setMessages] = useState([
        { role: "ai", text: "I've analyzed the evidence. Do you have any questions about the verdict or the sources used?" }
    ]);
    const [loading, setLoading] = useState(false);
    const chatEndRef = useRef(null);

    // Auto-scroll to bottom when messages update
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    async function handleAsk() {
        if (!question.trim() || loading) return;

        const userMessage = question;
        setMessages(prev => [...prev, { role: "user", text: userMessage }]);
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
            console.error("Chat Error:", err);
            setMessages(prev => [
                ...prev,
                { role: "ai", text: "Sorry, I encountered an error. Please try again." },
            ]);
        } finally {
            setLoading(false);
        }
    }

    return (
        <aside className="bg-white/70 backdrop-blur-2xl rounded-[2.5rem] border border-violet-100 p-8 shadow-[0_32px_64px_-16px_rgba(79,70,229,0.05)] flex flex-col h-[600px] transition-all">

            {/* Header */}
            <div className="flex items-center justify-between mb-6 border-b border-violet-50 pb-4">
                <div>
                    <h3 className="text-xl font-black text-slate-900 tracking-tight">
                        AI Assistant
                    </h3>
                    <p className="text-xs font-bold text-purple-500 uppercase tracking-widest mt-1">
                        Explainability Mode
                    </p>
                </div>
                <div className="h-10 w-10 rounded-xl bg-purple-100 flex items-center justify-center text-purple-600 shadow-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                        <path d="M8.25 4.5a3.75 3.75 0 1 1 7.5 0v8.25a3.75 3.75 0 1 1-7.5 0V4.5Z" />
                        <path d="M6 10.5a.75.75 0 0 1 .75.75v1.5a5.25 5.25 0 1 0 10.5 0v-1.5a.75.75 0 0 1 1.5 0v1.5a6.751 6.751 0 0 1-6 6.709v2.291h3a.75.75 0 0 1 0 1.5h-7.5a.75.75 0 0 1 0-1.5h3v-2.291a6.751 6.751 0 0 1-6-6.709v-1.5A.75.75 0 0 1 6 10.5Z" />
                    </svg>
                </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 space-y-5 overflow-y-auto pr-2 mb-6 scrollbar-thin scrollbar-thumb-violet-100 scrollbar-track-transparent">
                {messages.map((m, i) => (
                    <div
                        key={i}
                        className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                        <div
                            className={`max-w-[85%] rounded-2xl px-5 py-3 text-sm leading-relaxed shadow-sm transition-all
                            ${m.role === "user"
                                ? "bg-purple-600 text-white rounded-tr-none shadow-purple-200"
                                : "bg-violet-50 border border-violet-100 text-slate-700 rounded-tl-none"
                            }`}
                        >
                            {m.role === "ai" && (
                                <div className="text-[10px] font-black text-purple-500 uppercase tracking-tighter mb-1">
                                    AI Insight
                                </div>
                            )}
                            {m.text}
                        </div>
                    </div>
                ))}

                {loading && (
                    <div className="flex justify-start">
                        <div className="bg-violet-50 border border-violet-100 rounded-2xl rounded-tl-none px-5 py-3 text-sm text-purple-400">
                            <span className="flex gap-1">
                                <span className="animate-bounce inline-block">.</span>
                                <span className="animate-bounce inline-block [animation-delay:0.2s]">.</span>
                                <span className="animate-bounce inline-block [animation-delay:0.4s]">.</span>
                            </span>
                        </div>
                    </div>
                )}
                <div ref={chatEndRef} />
            </div>

            {/* Input Section */}
            <div className="flex gap-3 pt-2">
                <input
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleAsk()}
                    placeholder="Ask about the evidence..."
                    className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3.5 text-sm outline-none text-slate-800 placeholder-slate-400 focus:ring-2 focus:ring-purple-500/30 focus:bg-white transition-all shadow-inner"
                />
                <button
                    onClick={handleAsk}
                    disabled={loading || !question.trim()}
                    className={`px-6 py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest text-white transition-all
                    ${loading || !question.trim()
                        ? "bg-slate-200 cursor-not-allowed text-slate-400"
                        : "bg-purple-600 hover:bg-purple-700 hover:-translate-y-0.5 shadow-lg shadow-purple-100 active:scale-95"
                    }`}
                >
                    Send
                </button>
            </div>
        </aside>
    );
}