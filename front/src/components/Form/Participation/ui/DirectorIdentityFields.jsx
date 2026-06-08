import { Field, TextInput, Select } from "./Field";

export default function DirectorIdentityFields({
  t,
  form,
  update,
  ageError,
  inputClass,
  selectClass,
  help,
}) {
  return (
    <>
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
    </>
  );
}
