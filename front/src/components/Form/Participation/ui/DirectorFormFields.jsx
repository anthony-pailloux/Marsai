import { Field, TextInput, Select } from "./Field";
import CountryPickerModal from "./CountryPickerModal.jsx";
import { flagUrl } from "./countryUtils.js";
import { typeAdminSection } from "../../../../utils/typography.js";

export default function DirectorFormFields({
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
  inputClass,
  selectClass,
  help,
}) {
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

      <div className="rounded-2xl border border-neutral-200 bg-white p-8 dark:bg-black dark:border-neutral-800">
        <h2 className={`text-center text-blue-600 ${typeAdminSection}`}>
          {t("director.title")}
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          <Field label={t("director.fields.firstName.label")} required>
            <TextInput
              name="name"
              value={form.name}
              onChange={update}
              placeholder={t("director.fields.firstName.placeholder")}
              className={inputClass}
              autoComplete="given-name"
            />
            <div className={help}>{t("director.fields.firstName.help")}</div>
          </Field>

          <Field label={t("director.fields.lastName.label")} required>
            <TextInput
              name="last_name"
              value={form.last_name}
              onChange={update}
              placeholder={t("director.fields.lastName.placeholder")}
              className={inputClass}
              autoComplete="family-name"
            />
            <div className={help}>{t("director.fields.lastName.help")}</div>
          </Field>

          <Field label={t("director.fields.civility.label")} required>
            <Select
              name="gender"
              value={form.gender}
              onChange={update}
              className={selectClass}
            >
              <option value="Mr">{t("director.fields.civility.mr")}</option>
              <option value="Mrs">{t("director.fields.civility.mrs")}</option>
            </Select>
            <div className={help}>{t("director.fields.civility.help")}</div>
          </Field>

          <Field label={t("director.fields.email.label")} required>
            <TextInput
              name="email"
              value={form.email}
              onChange={update}
              placeholder={t("director.fields.email.placeholder")}
              type="email"
              className={inputClass}
              autoComplete="email"
            />
            <div className={help}>{t("director.fields.email.help")}</div>
          </Field>

          <Field label={t("director.fields.birthday.label")} required>
            <TextInput
              name="birthday"
              type="date"
              value={form.birthday}
              onChange={update}
              className={inputClass}
              autoComplete="bday"
            />
            <div className={help}>{t("director.fields.birthday.help")}</div>
            {ageError ? (
              <div className="mt-2 text-sm text-red-600">{ageError}</div>
            ) : null}
          </Field>

          <Field label={t("director.fields.directorCountry.label")} required>
            <Select
              name="director_country"
              value={form.director_country}
              onChange={update}
              disabled={countriesLoading || !!countriesErr}
              className={selectClass}
            >
              <option value="">
                {countriesLoading
                  ? t("director.fields.directorCountry.loading")
                  : countriesErr
                    ? t("director.fields.directorCountry.error")
                    : t("director.fields.directorCountry.choose")}
              </option>

              {countries.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </Select>

            {countriesErr ? (
              <div className="mt-2 text-xs text-red-500">{countriesErr}</div>
            ) : null}

            <div className={help}>
              {t("director.fields.directorCountry.help")}
            </div>
          </Field>

          <Field label={t("director.fields.discovery.label")} required>
            <TextInput
              name="discovery_source"
              value={form.discovery_source}
              onChange={update}
              placeholder={t("director.fields.discovery.placeholder")}
              className={inputClass}
              autoComplete="off"
            />
            <div className={help}>{t("director.fields.discovery.help")}</div>
          </Field>

          <Field label={t("director.fields.address.label")} required>
            <TextInput
              name="address"
              value={form.address}
              onChange={update}
              placeholder={t("director.fields.address.placeholder")}
              className={inputClass}
              autoComplete="street-address"
            />
            <div className={help}>{t("director.fields.address.help")}</div>
          </Field>

          <Field label={t("director.fields.mobile.label")} required>
            <div className="flex w-full items-center gap-3 rounded-2xl bg-neutral-100 px-5 py-4 ring-1 ring-black/5 focus-within:ring-2 focus-within:ring-blue-500/30 dark:bg-neutral-900 dark:ring-white/10">
              <button
                type="button"
                onClick={() => setPhoneOpen(true)}
                className="flex items-center gap-2 rounded-xl bg-white/60 px-3 py-2 text-sm font-semibold text-neutral-900 ring-1 ring-black/5 hover:bg-white dark:bg-white/10 dark:text-white dark:ring-white/10"
                aria-label={t("director.fields.mobile.ariaPickCountry")}
              >
                <img
                  src={flagUrl(phoneCountry.code, 24)}
                  alt=""
                  className="h-4 w-6 rounded-[2px] object-cover"
                  loading="lazy"
                  draggable="false"
                />
                <span className="font-bold">{phoneCountry.dial}</span>
                <span className="text-neutral-500">▾</span>
              </button>

              <input
                value={phoneLocal}
                onChange={(e) => setPhoneLocal(e.target.value)}
                placeholder={t("director.fields.mobile.placeholder")}
                inputMode="tel"
                className={
                  "w-full bg-transparent text-sm outline-none " +
                  "text-neutral-900 placeholder:text-neutral-500 " +
                  "dark:text-white dark:placeholder:text-neutral-400"
                }
                autoComplete="tel"
              />
            </div>

            <div className={help}>
              {t("director.fields.mobile.help", { dial: phoneCountry.dial })}
            </div>
          </Field>

          <Field label={t("director.fields.home.label")}>
            <TextInput
              name="home_number"
              value={form.home_number}
              onChange={update}
              placeholder={t("director.fields.home.placeholder")}
              className={inputClass}
            />
            <div className={help}>{t("director.fields.home.help")}</div>
          </Field>
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
