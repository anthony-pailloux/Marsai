import { Field, TextInput, Select } from "./Field";
import { flagUrl } from "./countryUtils.js";

export default function DirectorContactFields({
  t,
  form,
  update,
  countries,
  countriesLoading,
  countriesErr,
  phoneOpen,
  setPhoneOpen,
  phoneCountry,
  setPhoneCountry,
  phoneLocal,
  setPhoneLocal,
  inputClass,
  selectClass,
  help,
}) {
  return (
    <>
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
        <div className={help}>{t("director.fields.directorCountry.help")}</div>
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
            className="w-full bg-transparent text-sm text-neutral-900 outline-none placeholder:text-neutral-500 dark:text-white dark:placeholder:text-neutral-400"
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
    </>
  );
}
