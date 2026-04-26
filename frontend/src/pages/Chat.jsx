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
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [showClearModal, setShowClearModal] = useState(false);

  const handleDeleteMessage = (idToDelete) => {
    setMessages((prev) => prev.filter(msg => msg.id !== idToDelete));
  };

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
                  onClick={() => setShowHistoryModal(true)}
                  title="Session History"
                  className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-on-surface-variant transition-colors"
                >
                  <span className="material-symbols-outlined">history</span>
                </button>
                <button 
                  onClick={() => setShowClearModal(true)}
                  title="Clear History"
                  className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-on-surface-variant hover:text-error transition-colors"
                >
                  <span className="material-symbols-outlined">delete_sweep</span>
                </button>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-grow overflow-y-auto p-6 md:p-8 space-y-8 scrollbar-hide bg-surface-container-lowest/50">
              
              {messages.map((msg) => (
                msg.sender === 'ai' ? (
                  <div key={msg.id} className="flex justify-start max-w-[90%] md:max-w-[80%] relative group">
                    <button onClick={() => handleDeleteMessage(msg.id)} className="absolute -top-3 -right-3 opacity-0 group-hover:opacity-100 bg-red-500/80 text-white p-1 rounded-full transition-opacity z-10 hover:bg-red-500 scale-75">
                      <span className="material-symbols-outlined text-sm">close</span>
                    </button>
                    <div className="bg-[#1b3656]/80 backdrop-blur-[24px] border-t border-l border-white/10 p-6 rounded-r-xl rounded-bl-xl shadow-lg w-full">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="px-2 py-0.5 bg-secondary/10 text-secondary text-[10px] font-bold uppercase tracking-tighter rounded">{msg.type || 'System Insight'}</span>
                        <span className="text-[10px] text-outline">{msg.time || 'Just now'}</span>
                      </div>
                      <p className="text-sm leading-relaxed text-on-surface whitespace-pre-wrap">{msg.text}</p>
                    </div>
                  </div>
                ) : (
                  <div key={msg.id} className="flex justify-end ml-auto max-w-[90%] md:max-w-[80%] relative group">
                    <button onClick={() => handleDeleteMessage(msg.id)} className="absolute -top-3 -left-3 opacity-0 group-hover:opacity-100 bg-red-500/80 text-white p-1 rounded-full transition-opacity z-10 hover:bg-red-500 scale-75">
                      <span className="material-symbols-outlined text-sm">close</span>
                    </button>
                    <div className="border border-secondary/50 bg-secondary/5 p-6 rounded-l-xl rounded-br-xl shadow-lg w-full">
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

      {/* History Modal */}
      {showHistoryModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/80 backdrop-blur-md animate-fade-in">
          <div className="bg-surface-container-high border border-white/10 rounded-2xl w-full max-w-md overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] relative">
            <button onClick={() => setShowHistoryModal(false)} className="absolute top-4 right-4 text-outline hover:text-white transition-colors"><span className="material-symbols-outlined">close</span></button>
            <div className="p-6 border-b border-white/5 bg-[#1b3656]/50">
              <h3 className="text-xl font-headline font-bold text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary">history</span>
                Intelligence Archives
              </h3>
              <p className="text-sm text-on-surface-variant mt-1">Review previews of past analytical sessions</p>
            </div>
            <div className="p-2 max-h-[60vh] overflow-y-auto">
              {/* Mock Sessions */}
              <div className="p-4 hover:bg-white/5 cursor-pointer transition-colors border-b border-white/5 flex items-center gap-4 group" onClick={() => { setShowHistoryModal(false); }}>
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  <span className="material-symbols-outlined text-[20px]">chat</span>
                </div>
                <div>
                  <h4 className="text-on-surface font-bold text-sm">Lok Sabha Demographics 2024</h4>
                  <p className="text-outline text-xs">Yesterday • 14 Messages Analyzed</p>
                </div>
              </div>
              <div className="p-4 hover:bg-white/5 cursor-pointer transition-colors border-b border-white/5 flex items-center gap-4 group" onClick={() => { setShowHistoryModal(false); }}>
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  <span className="material-symbols-outlined text-[20px]">security</span>
                </div>
                <div>
                  <h4 className="text-on-surface font-bold text-sm">EVM Security Protocols</h4>
                  <p className="text-outline text-xs">Oct 24 • 8 Messages Analyzed</p>
                </div>
              </div>
              <div className="p-4 hover:bg-white/5 cursor-pointer transition-colors flex items-center gap-4 group" onClick={() => { setShowHistoryModal(false); }}>
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  <span className="material-symbols-outlined text-[20px]">monitoring</span>
                </div>
                <div>
                  <h4 className="text-on-surface font-bold text-sm">Exit Poll Predictive Modeling</h4>
                  <p className="text-outline text-xs">Oct 12 • 22 Messages Analyzed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Clear Chat Modal */}
      {showClearModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/80 backdrop-blur-md animate-fade-in">
          <div className="bg-surface-container-highest border border-error/30 rounded-3xl w-full max-w-sm overflow-hidden shadow-[0_0_50px_rgba(239,68,68,0.15)] text-center p-8 relative">
            <div className="w-20 h-20 bg-error/10 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
              <span className="material-symbols-outlined text-error text-4xl">delete_sweep</span>
            </div>
            <h3 className="text-2xl font-headline font-bold text-on-surface mb-3">Clear Engine Cache?</h3>
            <p className="text-on-surface-variant mb-8 text-sm leading-relaxed">This will permanently purge the current session's analysis data. This action cannot be undone.</p>
            <div className="flex gap-4">
              <button onClick={() => setShowClearModal(false)} className="flex-1 py-3.5 rounded-xl border border-white/10 text-on-surface hover:bg-white/5 transition-colors font-bold text-sm">Cancel</button>
              <button onClick={() => {
                setMessages([{
                  id: 1,
                  sender: 'ai',
                  text: 'Greetings. I am the ElectionIQ Intelligence Engine. I have analyzed 4.2 million data points regarding the upcoming cycles. How can I assist your sovereign decision-making today?',
                  type: 'System Insight',
                  time: 'Just now'
                }]);
                setShowClearModal(false);
              }} className="flex-1 py-3.5 rounded-xl bg-error text-white hover:bg-error/90 transition-all font-bold text-sm shadow-[0_0_20px_rgba(239,68,68,0.4)]">Confirm Purge</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;
