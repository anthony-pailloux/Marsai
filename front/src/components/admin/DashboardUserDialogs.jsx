import ConfirmDialog from "../ConfirmDialog.jsx";
import { ROLE_LABELS } from "../../utils/dashboardUserConstants.js";

export default function DashboardUserDialogs({
  deleteDialogOpen,
  onCloseDelete,
  onConfirmDelete,
  roleDialogOpen,
  onCloseRole,
  onConfirmRole,
  pendingRoleChange,
}) {
  return (
    <>
      <ConfirmDialog
        isOpen={deleteDialogOpen}
        onClose={onCloseDelete}
        onConfirm={onConfirmDelete}
        title="Confirmer la suppression"
        message="Êtes-vous sûr de vouloir supprimer cet utilisateur ?"
        confirmLabel="Supprimer"
        confirmVariant="danger"
      />

      <ConfirmDialog
        isOpen={roleDialogOpen}
        onClose={onCloseRole}
        onConfirm={onConfirmRole}
        title="Confirmer le changement de rôle"
        message={
          pendingRoleChange
            ? `Êtes-vous sûr de vouloir changer le rôle en "${ROLE_LABELS[pendingRoleChange.newRole] || pendingRoleChange.newRole}" ?`
            : "Êtes-vous sûr ?"
        }
        confirmLabel="Confirmer"
        confirmVariant="primary"
      />
    </>
  );
}
