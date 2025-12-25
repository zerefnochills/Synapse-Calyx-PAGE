
import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, AlertCircle } from 'lucide-react';
import OpenAI from 'openai';

// NOTE: In production, this key should be secured in a backend proxy.
// For this demo/client-side app, we use an env var or placeholder.
// Users must add VITE_OPENAI_API_KEY to their .env file.
const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

const openai = API_KEY ? new OpenAI({
    apiKey: API_KEY,
    dangerouslyAllowBrowser: true // Required for client-side use
}) : null;

const SYSTEM_PROMPT = `
You are the Synapse Assistant, the digital concierge for Synapse Calyx.
Synapse Calyx is a digital laboratory fusing creative intelligence with code.
We specialize in:
1. Identity: Strategic branding systems.
2. Digital: Web & application development (React, Next.js, WebGL).
3. Motion: Visual storytelling.
4. Intelligence: AI automation pipelines.

Tone: Minimalist, Professional, Futuristic, Concise.
Goal: Guide users to our services (#services), portfolio (#work), or contact info (#social, enquiry@synapse.cx).
Do not answer general knowledge questions unrelated to our domain.
If asked about pricing, say "Every project is unique. Contact us for a bespoke estimate."
`;

const SynapseAI = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, text: "Hello. I am the Synapse Assistant. How can I guide your digital evolution?", sender: 'bot' }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = useCallback(async () => {
        if (!input.trim()) return;

        const userMessage = { id: Date.now(), text: input, sender: 'user' };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsTyping(true);

        try {
            if (!openai) {
                // Fallback / Mock Logic if no Key
                setTimeout(() => {
                    let responseText = "I am currently operating in limited mode (No Neural Link / API Key detected).";
                    const lowerInput = userMessage.text.toLowerCase();

                    if (lowerInput.includes('hello') || lowerInput.includes('hi')) responseText = "Greetings. How may I assist?";
                    else if (lowerInput.includes('service')) responseText = "We offer Identity, Digital, Motion, and Intelligence services.";
                    else if (lowerInput.includes('contact')) responseText = "Reach us at enquiry@synapse.cx.";
                    else responseText = "Please configure my Neural Link (API Key) to unlock full intelligence. For now, check our Works section.";

                    setMessages(prev => [...prev, { id: Date.now() + 1, text: responseText, sender: 'bot' }]);
                    setIsTyping(false);
                }, 1000);
                return;
            }

            // Real API Call
            const completion = await openai.chat.completions.create({
                messages: [
                    { role: "system", content: SYSTEM_PROMPT },
                    ...messages.map(m => ({ role: m.sender === 'user' ? 'user' : 'assistant', content: m.text })),
                    { role: "user", content: input }
                ],
                model: "gpt-3.5-turbo",
            });

            const botText = completion.choices[0].message.content;
            setMessages(prev => [...prev, { id: Date.now() + 1, text: botText, sender: 'bot' }]);

        } catch (error) {
            console.error("Neural Link Failure:", error);
            setMessages(prev => [...prev, {
                id: Date.now() + 1,
                text: "Neural Link disrupted. Please try again later.",
                sender: 'bot'
            }]);
        } finally {
            setIsTyping(false);
        }
    }, [messages, input]);

    const handleKeyPress = useCallback((e) => {
        if (e.key === 'Enter') handleSend();
    }, [handleSend]);

    const toggleOpen = useCallback(() => {
        setIsOpen(prev => !prev);
    }, []);

    return (
        <>
            <motion.button
                onClick={toggleOpen}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="fixed bottom-6 right-6 z-40 p-4 rounded-full bg-white text-black hover:bg-white/90 transition-colors shadow-2xl min-w-[56px] min-h-[56px] flex items-center justify-center"
            >
                <div className="relative z-10 font-bold">
                    <MessageSquare size={24} fill="currentColor" />
                </div>
                {!API_KEY && (
                    <div className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border border-black transform translate-x-1/2 -translate-y-1/2"></div>
                )}
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="fixed bottom-20 md:bottom-24 right-4 md:right-6 z-50 w-[calc(100vw-2rem)] max-w-[380px] md:w-96 bg-black border border-white/20 shadow-2xl overflow-hidden rounded-2xl flex flex-col h-[min(500px,calc(100vh-140px))]"
                    >
                        {/* Header */}
                        <div className="p-4 bg-white/5 border-b border-white/10 flex justify-between items-center shrink-0">
                            <div className="flex items-center gap-3">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${API_KEY ? 'bg-white/10' : 'bg-red-500/20'}`}>
                                    <Bot size={16} className="text-white" />
                                </div>
                                <div>
                                    <span className="font-bold text-white text-sm block">Synapse Assistant</span>
                                    <span className="text-[10px] text-white/50 uppercase tracking-wider flex items-center gap-1">
                                        <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${API_KEY ? 'bg-green-500' : 'bg-red-500'}`}></span>
                                        {API_KEY ? 'Neural Link Active' : 'Offline Mode'}
                                    </span>
                                </div>
                            </div>
                            <button onClick={toggleOpen} className="text-white/50 hover:text-white transition-colors">
                                <X size={18} />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {messages.map((msg) => (
                                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${msg.sender === 'user'
                                        ? 'bg-white text-black rounded-tr-none'
                                        : 'bg-white/10 text-white/90 rounded-tl-none'
                                        }`}>
                                        {msg.text}
                                    </div>
                                </div>
                            ))}
                            {isTyping && (
                                <div className="flex justify-start">
                                    <div className="bg-white/5 p-3 rounded-2xl rounded-tl-none flex gap-1">
                                        <span className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce"></span>
                                        <span className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce delay-100"></span>
                                        <span className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce delay-200"></span>
                                    </div>
                                </div>
                            )}
                            {!API_KEY && (
                                <div className="flex justify-center mt-4">
                                    <div className="bg-red-500/10 border border-red-500/20 text-red-200 text-xs p-2 rounded text-center flex items-center gap-2">
                                        <AlertCircle size={12} />
                                        <span>Add VITE_OPENAI_API_KEY to .env</span>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <div className="p-3 border-t border-white/10 flex gap-2 shrink-0 bg-black">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Type a message..."
                                className="flex-grow bg-white/5 text-sm text-white px-4 py-2 rounded-xl focus:outline-none focus:bg-white/10 transition-colors placeholder:text-white/30"
                            />
                            <button
                                onClick={handleSend}
                                disabled={!input.trim()}
                                className="p-2 rounded-xl bg-white text-black hover:bg-white/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                <Send size={18} />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default SynapseAI;
