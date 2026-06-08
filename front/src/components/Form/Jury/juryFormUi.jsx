export function JuryFormField({ label, required, children }) {
  return (
    <div>
      <div className="text-sm font-semibold text-neutral-800 dark:text-white/85">
        {label} {required ? <span className="text-orange-500">*</span> : null}
      </div>
      <div className="mt-2">{children}</div>
    </div>
  );
}

const inputClass =
  "w-full rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 outline-none focus:ring-2 focus:ring-blue-500/25 dark:border-white/10 dark:bg-white/5 dark:text-white/90 dark:placeholder:text-white/35";

export function JuryFormInput(props) {
  return <input {...props} className={inputClass} />;
}

export function JuryFormTextarea(props) {
  return (
    <textarea {...props} rows={props.rows ?? 4} className={inputClass} />
  );
}
