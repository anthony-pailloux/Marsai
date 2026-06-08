import CountryPickerModal from "./CountryPickerModal.jsx";
import DirectorIdentityFields from "./DirectorIdentityFields.jsx";
import DirectorContactFields from "./DirectorContactFields.jsx";
import { typeAdminSection } from "../../../../utils/typography.js";

export default function DirectorFormFields(props) {
  const {
    t,
    phoneOpen,
    setPhoneOpen,
    phoneCountries,
    phoneCountry,
    setPhoneCountry,
    canSubmit,
  } = props;

  return (
    <>
      <CountryPickerModal
        open={phoneOpen}
        onClose={() => setPhoneOpen(false)}
        countries={phoneCountries}
        onPick={(c) => {
          setPhoneCountry(c);
          setPhoneOpen(false);
        }}
      />

      <div className="rounded-2xl border border-neutral-200 bg-white p-8 dark:border-neutral-800 dark:bg-black">
        <h2 className={`text-center text-blue-600 ${typeAdminSection}`}>
          {t("director.title")}
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          <DirectorIdentityFields {...props} />
          <DirectorContactFields {...props} />
        </div>

        <div className="mt-10 flex justify-center">
          <button
            type="submit"
            disabled={!canSubmit}
            className="inline-flex items-center gap-3 rounded-xl bg-[#E07830] px-10 py-3 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40"
          >
            {t("director.next")} <span aria-hidden>→</span>
          </button>
        </div>
      </div>
    </>
  );
}
