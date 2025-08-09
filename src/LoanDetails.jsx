
import React from "react";

export default function LoanDetails({ data, setData }) {
  const onChange = (key, value) => {
    setData(prev => ({ ...prev, [key]: value }));
  };

  return (
    <section className="bg-white p-5 rounded-lg shadow-sm">
      <h2 className="text-lg font-medium text-slate-800 mb-4">Loan Details</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <label className="block">
          <div className="text-sm text-slate-500">Loan Amount ($)</div>
          <input
            name="loanAmount"
            inputMode="numeric"
            value={data.loanAmount}
            onChange={(e) => onChange("loanAmount", e.target.value)}
            className="mt-1 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-300"
            placeholder="e.g., 250000"
          />
        </label>

        <label className="block">
          <div className="text-sm text-slate-500">Down Payment ($)</div>
          <input
            name="downPayment"
            inputMode="numeric"
            value={data.downPayment}
            onChange={(e) => onChange("downPayment", e.target.value)}
            className="mt-1 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-300"
            placeholder="e.g., 50000"
          />
        </label>

        <label className="block">
          <div className="text-sm text-slate-500">Interest Rate (% per year)</div>
          <input
            name="interestRate"
            inputMode="decimal"
            value={data.interestRate}
            onChange={(e) => onChange("interestRate", e.target.value)}
            className="mt-1 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-300"
            placeholder="e.g., 3.5"
          />
        </label>

        <label className="block">
          <div className="text-sm text-slate-500">Term (years)</div>
          <input
            name="termYears"
            inputMode="numeric"
            value={data.termYears}
            onChange={(e) => onChange("termYears", e.target.value)}
            className="mt-1 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-300"
            placeholder="e.g., 30"
          />
        </label>

        <label className="block sm:col-span-2">
          <div className="text-sm text-slate-500">Mortgage Type</div>
          <select
            value={data.mortgageType}
            onChange={(e) => onChange("mortgageType", e.target.value)}
            className="mt-1 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-300"
          >
            <option value="fixed">Fixed-rate</option>
            <option value="arm">Adjustable-rate (ARM)</option>
            <option value="interest-only">Interest-only</option>
          </select>
        </label>
      </div>
    </section>
  );
}
