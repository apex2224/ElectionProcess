import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Eligibility = () => {
  const [formData, setFormData] = useState({
    dob: '',
    citizenship: 'Indian',
    soundMind: true,
    criminalRecord: false
  });
  
  const [result, setResult] = useState(null);

  const checkEligibility = (e) => {
    e.preventDefault();
    
    if (!formData.dob) {
      setResult({
        eligible: false,
        message: "Please enter your Date of Birth."
      });
      return;
    }

    const dobDate = new Date(formData.dob);
    const today = new Date();
    let ageNum = today.getFullYear() - dobDate.getFullYear();
    const m = today.getMonth() - dobDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dobDate.getDate())) {
        ageNum--;
    }
    
    if (isNaN(ageNum) || ageNum < 18) {
      setResult({
        eligible: false,
        message: `You are currently ${ageNum} years old. You must be at least 18 years old to vote.`
      });
      return;
    }
    
    if (formData.citizenship !== 'Indian') {
      setResult({
        eligible: false,
        message: "Only Indian citizens are eligible to vote in Indian elections."
      });
      return;
    }

    if (!formData.soundMind) {
      setResult({
        eligible: false,
        message: "You are currently disqualified under the law."
      });
      return;
    }

    if (formData.criminalRecord) {
      setResult({
        eligible: false,
        message: "Certain criminal convictions may disqualify you from voting. Please consult the Election Commission guidelines."
      });
      return;
    }

    setResult({
      eligible: true,
      message: "Great! You meet the basic criteria to vote. Make sure you are registered in the Electoral Roll and have an EPIC card."
    });
  };

  return (
    <div className="pt-32 pb-20 px-8 min-h-screen">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <span className="material-symbols-outlined text-secondary text-5xl mb-4">verified_user</span>
          <h2 className="text-4xl md:text-5xl font-headline font-black text-on-surface mb-4">Voter Eligibility</h2>
          <p className="text-on-surface-variant max-w-xl mx-auto">
            Check if you meet the constitutional requirements to cast your vote. Our intelligence engine will verify your basic parameters.
          </p>
        </div>

        <div className="bg-surface-container-high rounded-3xl p-8 md:p-12 glass-refraction border border-white/5 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/5 rounded-full blur-[80px] pointer-events-none"></div>
          
          <form onSubmit={checkEligibility} className="relative z-10 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* DOB */}
              <div className="space-y-2">
                <label className="text-sm font-headline text-slate-300 font-bold uppercase tracking-wider">Date of Birth</label>
                <input 
                  type="date" 
                  required
                  max={new Date().toISOString().split("T")[0]}
                  className="w-full bg-surface-variant/40 border border-white/10 rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:border-secondary transition-colors"
                  value={formData.dob}
                  onChange={(e) => setFormData({...formData, dob: e.target.value})}
                />
              </div>

              {/* Citizenship */}
              <div className="space-y-2">
                <label className="text-sm font-headline text-slate-300 font-bold uppercase tracking-wider">Citizenship</label>
                <select 
                  className="w-full bg-surface-variant/40 border border-white/10 rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:border-secondary transition-colors appearance-none cursor-pointer"
                  value={formData.citizenship}
                  onChange={(e) => setFormData({...formData, citizenship: e.target.value})}
                >
                  <option className="bg-[#0a192f]" value="Indian">Indian Citizen</option>
                  <option className="bg-[#0a192f]" value="NRI">Non-Resident Indian (NRI)</option>
                  <option className="bg-[#0a192f]" value="Other">Other / Foreign National</option>
                </select>
              </div>
            </div>

            <div className="space-y-6">
              {/* Sound Mind */}
              <label className="flex items-center gap-4 p-4 rounded-xl border border-white/5 bg-surface-variant/20 cursor-pointer hover:bg-surface-variant/40 transition-colors">
                <input 
                  type="checkbox" 
                  className="w-5 h-5 accent-secondary"
                  checked={formData.soundMind}
                  onChange={(e) => setFormData({...formData, soundMind: e.target.checked})}
                />
                <div>
                  <div className="font-bold text-on-surface">I am of sound mind</div>
                  <div className="text-sm text-on-surface-variant">Not declared otherwise by a competent court</div>
                </div>
              </label>

              {/* Criminal Record */}
              <label className="flex items-center gap-4 p-4 rounded-xl border border-white/5 bg-surface-variant/20 cursor-pointer hover:bg-surface-variant/40 transition-colors">
                <input 
                  type="checkbox" 
                  className="w-5 h-5 accent-secondary"
                  checked={formData.criminalRecord}
                  onChange={(e) => setFormData({...formData, criminalRecord: e.target.checked})}
                />
                <div>
                  <div className="font-bold text-on-surface">I have a criminal conviction</div>
                  <div className="text-sm text-on-surface-variant">Check this if you have been convicted of an election offense or other severe crimes</div>
                </div>
              </label>
            </div>

            <button 
              type="submit" 
              className="w-full bg-secondary text-on-secondary font-bold text-lg py-4 rounded-xl shadow-xl hover:brightness-110 active:scale-[0.98] transition-all uppercase tracking-widest"
            >
              Check Eligibility
            </button>
          </form>

          <AnimatePresence>
            {result && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`mt-8 p-6 rounded-2xl border ${result.eligible ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-rose-500/10 border-rose-500/30'} flex items-start gap-4`}
              >
                <span className={`material-symbols-outlined text-3xl ${result.eligible ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {result.eligible ? 'check_circle' : 'cancel'}
                </span>
                <div>
                  <h4 className={`text-xl font-bold font-headline mb-2 ${result.eligible ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {result.eligible ? 'You Are Eligible!' : 'Not Eligible'}
                  </h4>
                  <p className="text-on-surface-variant leading-relaxed">
                    {result.message}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Eligibility;
