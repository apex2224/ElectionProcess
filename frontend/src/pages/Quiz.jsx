import { useState, useEffect } from "react";

const Quiz = () => {
  const [quizData, setQuizData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isChecking, setIsChecking] = useState(false);
  const [score, setScore] = useState(0);
  const [questionCount, setQuestionCount] = useState(1);

  const fetchQuiz = async () => {
    setIsLoading(true);
    setSelectedAnswer(null);
    setIsChecking(false);
    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
      const response = await fetch(`${apiUrl}/api/quiz/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic: "electoral process and voting" }),
      });
      if (response.ok) {
        const data = await response.json();
        setQuizData(data);
      } else {
        console.error("Failed to fetch quiz data");
      }
    } catch (error) {
      console.error("Error connecting to backend", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchQuiz();
  }, []);

  const handleOptionClick = (optionString) => {
    if (isChecking) return;
    setSelectedAnswer(optionString);
  };

  const handleNextQuestion = () => {
    if (!selectedAnswer && !isChecking) return;

    if (!isChecking) {
      setIsChecking(true);
      if (selectedAnswer === quizData.correctAnswer) {
        setScore((prev) => prev + 10);
      }
      return;
    }

    setQuestionCount((prev) => prev + 1);
    fetchQuiz();
  };

  return (
    <div className="selection:bg-secondary/30 min-h-screen">
      <main className="max-w-4xl mx-auto px-6 pt-32 pb-32">
        {/* Editorial Grid Header */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12 items-end">
          <div className="md:col-span-7">
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label text-xs font-bold uppercase tracking-widest mb-4">
              <span className="material-symbols-outlined text-[14px]">
                bolt
              </span>
              Advanced Civics Module
            </div>
            <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-primary leading-tight tracking-tight">
              Sovereign <br />
              Intelligence Quiz
            </h1>
          </div>
          <div className="md:col-span-5 text-right hidden md:block">
            <p className="font-label text-outline text-sm leading-relaxed max-w-[240px] ml-auto">
              Testing your grasp on the intricate mechanisms of the electoral
              process through AI-curated inquiries.
            </p>
          </div>
        </div>

        {/* Progress Intelligence */}
        <div className="mb-10 space-y-3">
          <div className="flex justify-between items-end">
            <span className="font-display font-bold text-lg text-secondary">
              Question {questionCount} of 10
            </span>
            <span className="font-label text-sm text-outline-variant">
              Score: {score} IQ
            </span>
          </div>
          <div className="h-1.5 w-full bg-surface-container-high rounded-full overflow-hidden">
            <div
              className="h-full bg-secondary shadow-[0_0_15px_rgba(240,193,44,0.4)] transition-all duration-500"
              style={{ width: `${(questionCount / 10) * 100}%` }}
            ></div>
          </div>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <span className="material-symbols-outlined text-secondary animate-spin text-5xl mb-4">
              refresh
            </span>
            <p className="text-outline font-headline tracking-widest uppercase text-sm">
              Synthesizing Next Inquiry...
            </p>
          </div>
        ) : (
          quizData && (
            <>
              {/* Hero Question Card */}
              <section className="relative group mb-8">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
                <div className="relative bg-[#001c3a]/80 backdrop-blur-xl rounded-xl overflow-hidden border border-white/10 shadow-2xl">
                  <div className="bg-[#1b3656]/90 px-8 py-6 border-b border-white/5">
                    <h2 className="font-display font-bold text-2xl text-on-surface">
                      Civic Knowledge Protocol
                    </h2>
                  </div>
                  <div className="p-8 md:p-12">
                    <p className="font-body text-xl md:text-2xl text-on-surface-variant leading-relaxed">
                      {quizData.question}
                    </p>
                  </div>
                </div>
              </section>

              {/* Options Asymmetric Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {quizData.options.map((opt, idx) => {
                  const isSelected = selectedAnswer === opt;
                  const isCorrect =
                    isChecking && opt === quizData.correctAnswer;
                  const isWrongSelected =
                    isChecking && isSelected && opt !== quizData.correctAnswer;

                  let btnStyle =
                    "bg-[#1b3656]/40 border-white/10 hover:bg-[#1b3656]/80";
                  if (isCorrect)
                    btnStyle =
                      "bg-green-900/50 border-green-500 shadow-[0_0_15px_rgba(34,197,94,0.3)]";
                  else if (isWrongSelected)
                    btnStyle = "bg-red-900/50 border-red-500";
                  else if (isSelected && !isChecking)
                    btnStyle =
                      "bg-secondary/20 border-secondary shadow-[0_0_10px_rgba(240,193,44,0.2)]";

                  return (
                    <button
                      key={idx}
                      onClick={() => handleOptionClick(opt)}
                      className={`${btnStyle} backdrop-blur-md rounded-xl p-6 text-left border transition-all group shadow-lg ${!isChecking ? "hover:scale-[1.02] active:scale-95" : "cursor-default"}`}
                    >
                      <div className="flex items-start gap-4">
                        <span className="w-8 h-8 shrink-0 rounded-full bg-[#0e2b4b] flex items-center justify-center font-display font-bold text-secondary text-sm">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <p className="font-body font-medium text-on-surface-variant">
                          {opt.substring(3)}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>

              {isChecking && (
                <div className="mt-8 p-6 bg-surface-container-highest rounded-xl border border-secondary/30">
                  <h3 className="text-secondary font-headline font-bold mb-2">
                    Analysis:
                  </h3>
                  <p className="text-on-surface-variant text-sm leading-relaxed">
                    {quizData.explanation}
                  </p>
                </div>
              )}
            </>
          )
        )}

        {/* Actions */}
        <div className="mt-12 flex justify-between items-center gap-6">
          <button className="font-label text-outline hover:text-primary transition-colors flex items-center gap-2 font-bold uppercase tracking-widest text-xs">
            <span className="material-symbols-outlined text-sm">flag</span>
            Report Question
          </button>
          <button
            onClick={handleNextQuestion}
            disabled={isLoading || (!selectedAnswer && !isChecking)}
            className="bg-secondary text-on-secondary font-display font-extrabold px-10 py-5 rounded-full hover:shadow-[0_0_30px_rgba(240,193,44,0.3)] hover:scale-105 active:scale-90 transition-all flex items-center gap-3 disabled:opacity-50 disabled:hover:scale-100 disabled:hover:shadow-none"
          >
            {!isChecking ? "Check Answer" : "Next Question"}
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>
      </main>

      {/* Ambient Light Effects */}
      <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none -z-10"></div>
      <div className="fixed bottom-0 right-1/4 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[100px] pointer-events-none -z-10"></div>
    </div>
  );
};

export default Quiz;
