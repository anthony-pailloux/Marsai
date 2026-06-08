import { Field, TextInput, TextArea } from "../Participation/ui/Field";
import BtnSubmitForm from "../../Buttons/BtnSubmitForm";
import { useTranslation } from "react-i18next";

function FaqFieldError({ field, formErrors, t }) {
    const errors = formErrors.filter((e) => e.field === field);

    return (
        <>
            {errors.map((e, i) => {
                if (e.message.startsWith("faq.")) {
                    return <p key={i} className="text-red-700">{t(e.message, { ns: "zodErrors" })}</p>;
                }
                return <p key={i} className="text-red-700">{e.message}</p>;
            })}
        </>
    );
}

function FaqForm({ faq, onChange, onSubmit, onDelete, loading, isEdit = false, formErrors=[] }) {
    const { t } = useTranslation(["faq", "zodErrors"]);

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                onSubmit(faq);
            }}
            className={`m-2 w-full ${
                isEdit ? "m-2 w-full max-w-[650px] rounded-[32px]" : "max-w-[900px]"
            } rounded-[32px] border border-black/10 bg-white/5 shadow-[0_15px_25px_-12px_rgba(0,0,0,0.25)] flex flex-col justify-center gap-[20px] p-4 md:p-[40px]`}
        >
            <Field label={t("form.label.display_order")}>
                <TextInput
                    name="display_order"
                    type="number"
                    value={faq.display_order}
                    onChange={(e) => onChange(faq.id, "display_order", Number(e.target.value))}
                />
            </Field>
            {/* Affichage de l erreur zod dans le back */}
            <FaqFieldError field="display_order" formErrors={formErrors} t={t} />

            <Field label={t("form.label.question_fr")}>
                <TextArea
                    name="question_fr"
                    value={faq.question_fr}
                    onChange={(e) => onChange(faq.id, "question_fr", e.target.value)}
                    rows={4}
                />
            </Field>
            {/* Affichage de l erreur zod dans le back */}
            <FaqFieldError field="question_fr" formErrors={formErrors} t={t} />

            <Field label={t("form.label.question_en")}>
                <TextArea
                    name="question_en"
                    value={faq.question_en}
                    onChange={(e) => onChange(faq.id, "question_en", e.target.value)}
                    rows={4}
                />
            </Field>
            {/* Affichage de l erreur zod dans le back */}
            <FaqFieldError field="question_en" formErrors={formErrors} t={t} />

            <Field label={t("form.label.answer_fr")}>
                <TextArea
                    name="answer_fr"
                    value={faq.answer_fr}
                    onChange={(e) => onChange(faq.id, "answer_fr", e.target.value)}
                    rows={4}
                />
            </Field>
            {/* Affichage de l erreur zod dans le back */}
            <FaqFieldError field="answer_fr" formErrors={formErrors} t={t} />

            <Field label={t("form.label.answer_en")}>
                <TextArea
                    name="answer_en"
                    value={faq.answer_en}
                    onChange={(e) => onChange(faq.id, "answer_en", e.target.value)}
                    rows={4}
                />
            </Field>
            {/* Affichage de l erreur zod dans le back */}
            <FaqFieldError field="answer_en" formErrors={formErrors} t={t} />


            <div className="flex gap-4 flex-wrap justify-center">
                <BtnSubmitForm loading={loading} disabled={loading} variant="submit">
                    {isEdit ? t("form.button.update") : t("form.button.add")}
                </BtnSubmitForm>

                {isEdit && onDelete && (
                    <BtnSubmitForm
                        loading={loading}
                        disabled={loading}
                        type="button"
                        variant="danger"
                        onClick={() => onDelete(faq.id)}
                    >
                        {t("form.button.delete")}
                    </BtnSubmitForm>
                )}
            </div>
        </form>
    );
}

export default FaqForm;
