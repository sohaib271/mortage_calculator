import React, { useState, useMemo } from "react";
import LoanDetails from "./LoanDetails";
import AdditionalCosts from "./AdditionalCosts";
import Results from "./Results";

export default function App() {
  const [step, setStep] = useState(1);

  const [loanDetails, setLoanDetails] = useState({
    loanAmount: "",
    downPayment: "",
    interestRate: "",
    termYears: "",
    mortgageType: "fixed",
  });

  const [costs, setCosts] = useState({
    propertyTax: "",
    insurance: "",
    extraPayments: "",
  });
  const isLoanDetailsValid = useMemo(() => {
    const loan = Number(loanDetails.loanAmount);
    const dp = Number(loanDetails.downPayment || 0);
    const rate = Number(loanDetails.interestRate);
    const years = Number(loanDetails.termYears);
    return (
      loan > 0 &&
      dp >= 0 &&
      loan > dp &&
      rate >= 0 &&
      years >= 1
    );
  }, [loanDetails]);

  const isCostsValid = useMemo(() => {
   
    const { propertyTax, insurance, extraPayments } = costs;
    const allNums = [propertyTax, insurance, extraPayments].every(
      (v) => v === "" || !Number.isNaN(Number(v))
    );
    return allNums;
  }, [costs]);

  const handleNext = () => {
    if (step === 1 && !isLoanDetailsValid) return;
    if (step === 2 && !isCostsValid) return;
    setStep((s) => Math.min(4, s + 1));
  };

  const handlePrev = () => setStep((s) => Math.max(1, s - 1));

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 flex items-center justify-center p-6">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-md overflow-hidden">
        <div className="md:flex">
        
          <main className="w-full md:w-2/3 p-6">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-semibold text-slate-800">Mortgage Calculator</h1>
              <div className="text-sm text-slate-500">Step {step} / 3</div>
            </div>

            <div className="space-y-6">
              {step === 1 && (
                <LoanDetails data={loanDetails} setData={setLoanDetails} />
              )}

              {step === 2 && (
                <AdditionalCosts data={costs} setData={setCosts} />
              )}

              {step === 3 && (
                <Results loanDetails={loanDetails} costs={costs} />
              )}
            </div>

            <div className="mt-6 flex items-center gap-3">
              <button
                onClick={handlePrev}
                disabled={step === 1}
                className={`px-4 py-2 rounded-lg border ${
                  step === 1
                    ? "text-slate-400 border-slate-200 bg-slate-50 cursor-not-allowed"
                    : "text-slate-700 border-slate-200 bg-white hover:shadow"
                }`}
              >
                ← Back
              </button>

              {step < 3 && (
                <button
                  onClick={handleNext}
                  disabled={(step === 1 && !isLoanDetailsValid) || (step === 2 && !isCostsValid)}
                  className={`ml-auto px-5 py-2 rounded-lg text-white font-medium ${
                    (step === 1 && !isLoanDetailsValid) || (step === 2 && !isCostsValid)
                      ? "bg-slate-300 cursor-not-allowed"
                      : "bg-indigo-600 hover:bg-indigo-700"
                  }`}
                >
                  Next →
                </button>
              )}

              {step === 3 && (
                <button
                  onClick={() => { setStep(1); }}
                  className="ml-auto px-5 py-2 rounded-lg text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Start Over
                </button>
              )}
            </div>
          </main>

          <aside className="hidden md:block md:w-1/3 p-6 bg-gradient-to-b from-white to-indigo-50">
            <div className="rounded-lg p-4 bg-white shadow">
              <h3 className="text-sm font-medium text-slate-700 mb-3">Quick Summary</h3>

              <div className="text-sm text-slate-600 space-y-2">
                <div>
                  <div className="text-xs text-slate-400">Loan Amount</div>
                  <div className="font-medium text-slate-800">${loanDetails.loanAmount || "—"}</div>
                </div>

                <div>
                  <div className="text-xs text-slate-400">Down Payment</div>
                  <div className="font-medium text-slate-800">${loanDetails.downPayment || "—"}</div>
                </div>

                <div>
                  <div className="text-xs text-slate-400">Interest Rate</div>
                  <div className="font-medium text-slate-800">{loanDetails.interestRate ? `${loanDetails.interestRate}%` : "—"}</div>
                </div>

                <div>
                  <div className="text-xs text-slate-400">Term</div>
                  <div className="font-medium text-slate-800">{loanDetails.termYears ? `${loanDetails.termYears} yrs` : "—"}</div>
                </div>

                <div className="pt-3 border-t border-slate-100">
                  <div className="text-xs text-slate-400">Property Tax</div>
                  <div className="font-medium text-slate-800">${costs.propertyTax || "—"}</div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
