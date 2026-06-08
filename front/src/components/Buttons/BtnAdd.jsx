import Button from "../ui/Button.jsx";

function BtnAdd({ onClick, children = "Ajouter", loading = false, type = "button" }) {
  return (
    <Button
      type={type}
      onClick={onClick}
      loading={loading}
      variant="primary"
      className="rounded-full shadow-sm"
    >
      {children}
    </Button>
  );
}

export default BtnAdd;
