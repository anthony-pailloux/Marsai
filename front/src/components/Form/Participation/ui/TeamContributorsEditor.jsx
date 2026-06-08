import { Field, TextInput, Select } from "./Field";
import ContributorRow from "./ContributorRow.jsx";

export default function TeamContributorsEditor({
  t,
  help,
  current,
  contributors,
  updateCurrent,
  addContributor,
  removeContributor,
}) {
  return (
    <div className="mt-8 rounded-2xl bg-neutral-100 p-6 dark:bg-neutral-900">
      <div className="mb-4 flex justify-end">
        <button
          type="button"
          onClick={addContributor}
          className="rounded-full bg-neutral-700 px-6 py-2 text-sm font-semibold text-white"
        >
          {t("team.addCollaborator")}
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        <Field label={t("team.fields.civility.label")} required>
          <Select
            name="gender"
            value={current.gender}
            onChange={updateCurrent}
            className="bg-white text-neutral-900 dark:bg-neutral-800 dark:text-white"
          >
            <option value="Mr">{t("team.fields.civility.mr")}</option>
            <option value="Mrs">{t("team.fields.civility.mrs")}</option>
          </Select>
          <div className={help}>{t("team.fields.civility.help")}</div>
        </Field>

        <Field label={t("team.fields.fullName.label")} required>
          <TextInput
            name="full_name"
            value={current.full_name}
            onChange={updateCurrent}
            placeholder={t("team.fields.fullName.placeholder")}
            className="bg-white text-neutral-900 placeholder:text-neutral-400 dark:bg-neutral-800 dark:text-white dark:placeholder:text-neutral-500"
          />
          <div className={help}>{t("team.fields.fullName.help")}</div>
        </Field>

        <Field label={t("team.fields.profession.label")} required>
          <TextInput
            name="profession"
            value={current.profession}
            onChange={updateCurrent}
            placeholder={t("team.fields.profession.placeholder")}
            className="bg-white text-neutral-900 placeholder:text-neutral-400 dark:bg-neutral-800 dark:text-white dark:placeholder:text-neutral-500"
          />
          <div className={help}>{t("team.fields.profession.help")}</div>
        </Field>

        <Field label={t("team.fields.email.label")} required>
          <TextInput
            name="email"
            value={current.email}
            onChange={updateCurrent}
            placeholder={t("team.fields.email.placeholder")}
            className="bg-white text-neutral-900 placeholder:text-neutral-400 dark:bg-neutral-800 dark:text-white dark:placeholder:text-neutral-500"
          />
          <div className={help}>{t("team.fields.email.help")}</div>
        </Field>
      </div>

      {contributors.length ? (
        <div className="mt-6 space-y-3">
          {contributors.map((c, i) => (
            <ContributorRow
              key={i}
              contributor={c}
              onRemove={() => removeContributor(i)}
              removeLabel={t("team.remove")}
            />
          ))}
        </div>
      ) : (
        <div className="mt-6 text-sm text-neutral-500 dark:text-neutral-300">
          {t("team.empty")}
        </div>
      )}
    </div>
  );
}
