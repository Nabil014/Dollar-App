/* eslint-disable react/prop-types */

export default function Calculator ({ amount, onChange }) {


  return (
    <div className="w-full">
      <label className="block space-y-0 pb-4 px-4 font-mono text-lg" htmlFor="count">Monto en $ARG</label>
      <input autoFocus value={amount} placeholder="0" onChange={(e) => onChange(e.target.value)} id="count" type="number" className=" p-2 bg-white border-[1px] border-emerald-300 focus:outline-none focus:border-emerald-700 focus:ring-emerald-700 block w-full rounded-full focus:ring-2 font-mono px-5 text-right text-3xl " />
    </div>
  )
}
