
import React, { useMemo } from "react";

export default function Results({ loanDetails, costs }) {
  const computed = useMemo(() => {
    const loanAmount = Number(loanDetails.loanAmount) || 0;
    const down = Number(loanDetails.downPayment) || 0;
    const principal = Math.max(0, loanAmount - down);
    const annualRate = Number(loanDetails.interestRate) || 0;
    const years = Number(loanDetails.termYears) || 0;
    const freq = 12;
    const periodicRate = annualRate / 100 / freq;
    const totalPayments = years * freq;

    let payment = 0;
    if (periodicRate === 0) {
      payment = totalPayments > 0 ? principal / totalPayments : 0;
    } else {
      payment = (principal * periodicRate) / (1 - Math.pow(1 + periodicRate, -totalPayments));
    }

    const totalInterest = (payment * totalPayments) - principal;
    const propTaxTotal = (Number(costs.propertyTax) || 0) * years;
    const insuranceTotal = (Number(costs.insurance) || 0) * years;
    const extra = Number(costs.extraPayments) || 0;

    return {
      payment,
      totalInterest,
      principal,
      totalPayments,
      propTaxTotal,
      insuranceTotal,
      extra
    };
  }, [loanDetails, costs]);

  const fmt = (v) => `$${Number(v || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  return (
    <section className="bg-white p-5 rounded-lg shadow-sm">
      <h2 className="text-lg font-medium text-slate-800 mb-4">Results</h2>

      <div className="grid grid-cols-1 gap-3">
        <div className="flex justify-between">
          <div className="text-slate-500">Estimated monthly payment</div>
          <div className="font-medium text-slate-800">{fmt(computed.payment)}</div>
        </div>

        <div className="flex justify-between">
          <div className="text-slate-500">Total interest (approx.)</div>
          <div className="font-medium text-slate-800">{fmt(computed.totalInterest)}</div>
        </div>

        <div className="flex justify-between">
          <div className="text-slate-500">Principal</div>
          <div className="font-medium text-slate-800">{fmt(computed.principal)}</div>
        </div>

        <div className="flex justify-between">
          <div className="text-slate-500">Property tax (total over term)</div>
          <div className="font-medium text-slate-800">{fmt(computed.propTaxTotal)}</div>
        </div>

        <div className="flex justify-between">
          <div className="text-slate-500">Insurance (total over term)</div>
          <div className="font-medium text-slate-800">{fmt(computed.insuranceTotal)}</div>
        </div>
      </div>
    </section>
  );
}
