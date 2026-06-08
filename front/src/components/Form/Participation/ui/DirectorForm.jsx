import useDirectorForm from "../../../../hooks/useDirectorForm.js";
import DirectorFormFields from "./DirectorFormFields.jsx";

export default function DirectorForm({ onNext }) {
  const {
    t,
    form,
    update,
    countries,
    phoneCountries,
    countriesLoading,
    countriesErr,
    phoneOpen,
    setPhoneOpen,
    phoneCountry,
    setPhoneCountry,
    phoneLocal,
    setPhoneLocal,
    ageError,
    canSubmit,
    submit,
  } = useDirectorForm(onNext);

  const inputClass =
    "bg-neutral-100 text-neutral-900 placeholder:text-neutral-400 " +
    "focus:bg-neutral-100 focus:text-neutral-900 " +
    "dark:bg-neutral-900 dark:text-white dark:placeholder:text-neutral-400 " +
    "dark:focus:bg-neutral-900 dark:focus:text-white " +
    "[&:-webkit-autofill]:shadow-[0_0_0px_1000px_rgb(245,245,245)_inset] " +
    "[&:-webkit-autofill]:[-webkit-text-fill-color:rgb(17,24,39)] " +
    "dark:[&:-webkit-autofill]:shadow-[0_0_0px_1000px_rgb(11,11,15)_inset] " +
    "dark:[&:-webkit-autofill]:[-webkit-text-fill-color:rgb(255,255,255)]";

  const selectClass =
    "bg-neutral-100 text-neutral-900 " +
    "focus:bg-neutral-100 focus:text-neutral-900 " +
    "dark:bg-neutral-900 dark:text-white " +
    "dark:focus:bg-neutral-900 dark:focus:text-white";

  const help = "mt-2 text-xs italic text-neutral-500 dark:text-neutral-300";

  return (
    <form onSubmit={submit} className="w-full">
      <DirectorFormFields
        t={t}
        form={form}
        update={update}
        countries={countries}
        phoneCountries={phoneCountries}
        countriesLoading={countriesLoading}
        countriesErr={countriesErr}
        phoneOpen={phoneOpen}
        setPhoneOpen={setPhoneOpen}
        phoneCountry={phoneCountry}
        setPhoneCountry={setPhoneCountry}
        phoneLocal={phoneLocal}
        setPhoneLocal={setPhoneLocal}
        ageError={ageError}
        canSubmit={canSubmit}
        inputClass={inputClass}
        selectClass={selectClass}
        help={help}
      />
    </form>
  );
}
