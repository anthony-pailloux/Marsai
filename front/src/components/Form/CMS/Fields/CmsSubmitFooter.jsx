import BtnSubmitForm from "../../../Buttons/BtnSubmitForm.jsx";

const DEFAULT_BTN_CLASS =
  "flex h-[53px] items-center justify-center gap-[13px] rounded-[5px] border border-[#DBE3E6] bg-white px-[21px] py-[10px] dark:border-[rgba(0,0,0,0.11)] dark:bg-[#333]";

export default function CmsSubmitFooter({
  submitLoading,
  children = "Mettre à jour",
  btnClassName = DEFAULT_BTN_CLASS,
  wrapperClassName = "flex w-full flex-col items-center gap-3",
}) {
  return (
    <div className={wrapperClassName}>
      <BtnSubmitForm loading={submitLoading} className={btnClassName}>
        {children}
      </BtnSubmitForm>
    </div>
  );
}
