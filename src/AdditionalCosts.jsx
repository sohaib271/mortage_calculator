
export default function AdditionalCosts({ data, setData }) {
  const onChange = (key, value) => setData(prev => ({ ...prev, [key]: value }));

  return (
    <section className="bg-white p-5 rounded-lg shadow-sm">
      <h2 className="text-lg font-medium text-slate-800 mb-4">Additional Costs</h2>

      <div className="grid grid-cols-1 gap-4">
        <label>
          <div className="text-sm text-slate-500">Property Tax (annual $)</div>
          <input
            value={data.propertyTax}
            onChange={(e) => onChange("propertyTax", e.target.value)}
            className="mt-1 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-300"
            placeholder="e.g., 2500"
          />
        </label>

        <label>
          <div className="text-sm text-slate-500">Home Insurance (annual $)</div>
          <input
            value={data.insurance}
            onChange={(e) => onChange("insurance", e.target.value)}
            className="mt-1 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-300"
            placeholder="e.g., 1000"
          />
        </label>

        <label>
          <div className="text-sm text-slate-500">Extra monthly payments (optional)</div>
          <input
            value={data.extraPayments}
            onChange={(e) => onChange("extraPayments", e.target.value)}
            className="mt-1 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-300"
            placeholder="e.g., 100"
          />
        </label>
      </div>
    </section>
  );
}
