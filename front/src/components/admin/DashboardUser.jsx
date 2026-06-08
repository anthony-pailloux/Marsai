import RegisterForm from "./RegisterForm.jsx";
import InviteForm from "./InviteForm.jsx";
import DashboardUserCollapsible from "./DashboardUserCollapsible.jsx";
import DashboardUserDialogs from "./DashboardUserDialogs.jsx";
import DashboardUserTable from "./DashboardUserTable.jsx";
import useDashboardUsers from "../../hooks/useDashboardUsers.js";

function DashboardUser() {
  const {
    loading,
    error,
    success,
    roleFilter,
    setRoleFilter,
    busyId,
    currentUser,
    showAddForm,
    setShowAddForm,
    showInviteForm,
    setShowInviteForm,
    deleteDialogOpen,
    setDeleteDialogOpen,
    userToDelete,
    setUserToDelete,
    roleDialogOpen,
    setRoleDialogOpen,
    pendingRoleChange,
    setPendingRoleChange,
    filtered,
    refresh,
    onChangeRole,
    onDeleteUser,
    showSuccessMessage,
  } = useDashboardUsers();

  function closeDeleteDialog() {
    setDeleteDialogOpen(false);
    setUserToDelete(null);
  }

  function confirmDelete() {
    if (userToDelete) onDeleteUser(userToDelete);
    closeDeleteDialog();
  }

  function closeRoleDialog() {
    setRoleDialogOpen(false);
    setPendingRoleChange(null);
  }

  function confirmRoleChange() {
    if (pendingRoleChange) {
      onChangeRole(pendingRoleChange.userId, pendingRoleChange.newRole);
    }
    closeRoleDialog();
  }

  return (
    <>
      <DashboardUserDialogs
        deleteDialogOpen={deleteDialogOpen}
        onCloseDelete={closeDeleteDialog}
        onConfirmDelete={confirmDelete}
        roleDialogOpen={roleDialogOpen}
        onCloseRole={closeRoleDialog}
        onConfirmRole={confirmRoleChange}
        pendingRoleChange={pendingRoleChange}
      />

      {error && (
        <div className="mb-3 rounded-2xl bg-[#DC2626]/15 px-5 py-3 text-sm font-semibold text-[#DC2626] ring-1 ring-[#DC2626]/25">
          {error}
        </div>
      )}
      {success && (
        <div className="mb-3 rounded-2xl bg-[#1AFF7A]/15 px-5 py-3 text-sm font-semibold text-[#1AFF7A] ring-1 ring-[#1AFF7A]/25">
          {success}
        </div>
      )}

      <DashboardUserCollapsible
        icon="➕"
        title="Ajouter un admin / sélectionneur"
        open={showAddForm}
        onToggle={() => setShowAddForm((prev) => !prev)}
      >
        <RegisterForm
          variant="dashboard"
          selectableRole={true}
          onSuccess={() => {
            setShowAddForm(false);
            refresh();
            showSuccessMessage("Utilisateur créé avec succès.");
          }}
          onCancel={() => setShowAddForm(false)}
        />
      </DashboardUserCollapsible>

      <DashboardUserCollapsible
        icon="✉️"
        title="Inviter un admin / sélectionneur"
        open={showInviteForm}
        onToggle={() => setShowInviteForm((prev) => !prev)}
      >
        <InviteForm
          onSuccess={() => {
            setShowInviteForm(false);
            showSuccessMessage("Invitation envoyée avec succès.");
          }}
          onCancel={() => setShowInviteForm(false)}
        />
      </DashboardUserCollapsible>

      <DashboardUserTable
        loading={loading}
        filtered={filtered}
        roleFilter={roleFilter}
        onRoleFilterChange={setRoleFilter}
        currentUser={currentUser}
        busyId={busyId}
        onRequestRoleChange={(userId, newRole) => {
          setPendingRoleChange({ userId, newRole });
          setRoleDialogOpen(true);
        }}
        onRequestDelete={(userId) => {
          setUserToDelete(userId);
          setDeleteDialogOpen(true);
        }}
      />
    </>
  );
}

export default DashboardUser;
