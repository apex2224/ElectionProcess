import { useState } from 'react';

const Chat = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: 'Greetings. I am the ElectionIQ Intelligence Engine. I have analyzed 4.2 million data points regarding the upcoming cycles. How can I assist your sovereign decision-making today?',
      type: 'System Insight',
      time: 'Just now'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now(),
      sender: 'user',
      text: inputValue
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage.text })
      });

      const data = await response.json();
      
      if (response.ok) {
        setMessages((prev) => [...prev, {
          id: Date.now() + 1,
          sender: 'ai',
          text: data.reply,
          type: 'Deep Analysis',
          time: 'Just now'
        }]);
      } else {
        console.error('API Error:', data.error);
        setMessages((prev) => [...prev, {
          id: Date.now() + 1,
          sender: 'ai',
          text: 'Communication error. Please ensure the Intelligence Engine backend is online.',
          type: 'System Alert',
          time: 'Just now'
        }]);
      }
    } catch (error) {
      console.error('Fetch Error:', error);
      setMessages((prev) => [...prev, {
        id: Date.now() + 1,
        sender: 'ai',
        text: 'Connection failed. The backend service is currently unreachable.',
        type: 'System Alert',
        time: 'Just now'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="selection:bg-secondary/30 min-h-screen">
      <main className="min-h-screen pt-32 pb-32 md:pb-12 editorial-gradient overflow-x-hidden max-w-screen-2xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Sidebar */}
          <aside className="hidden lg:block lg:col-span-3 space-y-6 sticky top-32">
            <div className="p-8 bg-surface-container-low rounded-xl border-l-4 border-secondary">
              <p className="text-secondary font-headline font-bold text-xs uppercase tracking-widest mb-2">Live Status</p>
              <h3 className="text-xl font-bold text-on-surface mb-4 leading-tight">Electoral Integrity Engine</h3>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                <span className="text-sm font-medium text-on-surface-variant">Systems Operational</span>
              </div>
              <div className="space-y-3 pt-4 border-t border-white/5">
                <div className="flex justify-between text-xs">
                  <span className="text-outline">Data Nodes</span>
                  <span className="text-on-surface font-bold">14,209</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-outline">Latency</span>
                  <span className="text-on-surface font-bold">42ms</span>
                </div>
              </div>
            </div>
            
            <div className="p-6 bg-surface-variant/20 rounded-xl backdrop-blur-sm border border-white/5">
              <h4 className="text-sm font-bold text-primary mb-4 uppercase tracking-tighter">Trending Queries</h4>
              <ul className="space-y-3">
                <li><a className="text-xs text-on-surface-variant hover:text-secondary transition-colors italic cursor-pointer">"Swing state demographic shifts 2024"</a></li>
                <li><a className="text-xs text-on-surface-variant hover:text-secondary transition-colors italic cursor-pointer">"Impact of AI on voter sentiment"</a></li>
                <li><a className="text-xs text-on-surface-variant hover:text-secondary transition-colors italic cursor-pointer">"Historical exit poll accuracy"</a></li>
              </ul>
            </div>
          </aside>

          {/* Main Chat Area */}
          <section className="lg:col-span-9 flex flex-col h-[calc(100vh-14rem)] relative rounded-xl border border-white/10 overflow-hidden shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between p-6 bg-[#1b3656]/80 backdrop-blur-[24px] z-10 border-b border-white/10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary-container flex items-center justify-center border border-primary/20">
                  <span className="material-symbols-outlined text-secondary">psychology</span>
                </div>
                <div>
                  <h2 className="text-xl md:text-2xl font-black font-headline tracking-tight text-on-surface">Election Intelligence AI</h2>
                  <p className="text-[10px] md:text-xs text-outline uppercase tracking-widest font-bold">The Sovereign Intelligence Advisor</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => alert("Engine settings are managed by the Sovereign Administrator.")}
                  title="Settings"
                  className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-on-surface-variant transition-colors"
                >
                  <span className="material-symbols-outlined">settings</span>
                </button>
                <button 
                  onClick={() => {
                    if(window.confirm("Clear chat history?")) {
                      setMessages([{
                        id: 1,
                        sender: 'ai',
                        text: 'Greetings. I am the ElectionIQ Intelligence Engine. I have analyzed 4.2 million data points regarding the upcoming cycles. How can I assist your sovereign decision-making today?',
                        type: 'System Insight',
                        time: 'Just now'
                      }]);
                    }
                  }}
                  title="Clear History"
                  className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-on-surface-variant transition-colors"
                >
                  <span className="material-symbols-outlined">delete_sweep</span>
                </button>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-grow overflow-y-auto p-6 md:p-8 space-y-8 scrollbar-hide bg-surface-container-lowest/50">
              
              {messages.map((msg) => (
                msg.sender === 'ai' ? (
                  <div key={msg.id} className="flex justify-start max-w-[90%] md:max-w-[80%]">
                    <div className="bg-[#1b3656]/80 backdrop-blur-[24px] border-t border-l border-white/10 p-6 rounded-r-xl rounded-bl-xl shadow-lg">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="px-2 py-0.5 bg-secondary/10 text-secondary text-[10px] font-bold uppercase tracking-tighter rounded">{msg.type || 'System Insight'}</span>
                        <span className="text-[10px] text-outline">{msg.time || 'Just now'}</span>
                      </div>
                      <p className="text-sm leading-relaxed text-on-surface whitespace-pre-wrap">{msg.text}</p>
                    </div>
                  </div>
                ) : (
                  <div key={msg.id} className="flex justify-end ml-auto max-w-[90%] md:max-w-[80%]">
                    <div className="border border-secondary/50 bg-secondary/5 p-6 rounded-l-xl rounded-br-xl shadow-lg">
                      <p className="text-sm leading-relaxed text-on-surface whitespace-pre-wrap">{msg.text}</p>
                    </div>
                  </div>
                )
              ))}
              
              {isLoading && (
                <div className="flex justify-start max-w-[90%] md:max-w-[80%] animate-pulse">
                  <div className="bg-[#1b3656]/80 backdrop-blur-[24px] border-t border-l border-white/10 p-6 rounded-r-xl rounded-bl-xl shadow-lg">
                    <p className="text-sm leading-relaxed text-on-surface italic">Synthesizing intelligence...</p>
                  </div>
                </div>
              )}

            </div>

            {/* Input Area */}
            <div className="p-4 md:p-6 bg-[#1b3656]/80 backdrop-blur-[24px] rounded-b-xl border-t border-white/10 relative z-20">
              <div className="flex items-center gap-2 md:gap-4 bg-surface-container-lowest/80 p-2 pl-4 md:pl-6 rounded-full border border-white/5 shadow-inner">
                <button 
                  onClick={() => alert("File upload is temporarily restricted for security clearance.")}
                  title="Attach File"
                  className="text-outline hover:text-secondary transition-colors hidden sm:block"
                >
                  <span className="material-symbols-outlined">attach_file</span>
                </button>
                <input 
                  className="bg-transparent border-none focus:ring-0 text-sm md:text-base text-on-surface flex-grow py-2 md:py-3 placeholder:text-outline/50 outline-none" 
                  placeholder="Query the intelligence engine..." 
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyPress}
                  disabled={isLoading}
                />
                <button 
                  onClick={handleSendMessage}
                  disabled={isLoading || !inputValue.trim()}
                  className="flex items-center justify-center bg-secondary text-on-secondary px-4 md:px-6 py-2 md:py-3 rounded-full font-black uppercase text-[10px] tracking-widest hover:brightness-110 transition-all active:scale-95 disabled:opacity-50"
                >
                  <span className="hidden sm:inline">Send</span>
                  <span className="material-symbols-outlined sm:ml-2 text-sm">send</span>
                </button>
              </div>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
};

export default Chat;
