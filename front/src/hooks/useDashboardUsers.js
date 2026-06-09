import { useEffect, useMemo, useState } from "react";
import {
  getUsers,
  updateUserRole,
  deleteUser,
} from "../services/Admin/Users.api.js";
import { decodeToken } from "../utils/decodeToken.js";
import { ROLE_FILTER_ALL } from "../utils/dashboardUserConstants.js";
import { toast } from "../utils/toast.js";

export default function useDashboardUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [roleFilter, setRoleFilter] = useState(ROLE_FILTER_ALL);
  const [busyId, setBusyId] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showInviteForm, setShowInviteForm] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [roleDialogOpen, setRoleDialogOpen] = useState(false);
  const [pendingRoleChange, setPendingRoleChange] = useState(null);

  async function refresh() {
    try {
      setLoading(true);
      const data = await getUsers();
      setUsers(Array.isArray(data?.users) ? data.users : []);
    } catch (err) {
      toast.error(err?.message || "Erreur de chargement");
    } finally {
      setLoading(false);
    }
  }

  const filtered = useMemo(() => {
    const superadmins = users.filter((user) => user.role === "superadmin");
    const others = users.filter((user) => {
      if (user.role === "superadmin") return false;
      if (roleFilter === ROLE_FILTER_ALL) return true;
      return user.role === roleFilter;
    });

    return [...superadmins, ...others];
  }, [users, roleFilter]);

  useEffect(() => {
    refresh();
    setCurrentUser(decodeToken());
  }, []);

  function showSuccessMessage(message) {
    toast.success(message);
  }

  async function onChangeRole(userId, newRole) {
    setBusyId(userId);
    const previousUsers = [...users];

    setUsers((prev) =>
      prev.map((user) =>
        user.id === userId ? { ...user, role: newRole } : user,
      ),
    );

    try {
      await updateUserRole(userId, newRole);
      showSuccessMessage(`Le rôle a été changé en "${newRole}" avec succès`);
    } catch (err) {
      setUsers(previousUsers);
      toast.error(err?.message || "Erreur lors du changement de rôle");
    } finally {
      setBusyId(null);
    }
  }

  async function onDeleteUser(userId) {
    setBusyId(userId);
    const previousUsers = [...users];
    setUsers((prev) => prev.filter((user) => user.id !== userId));

    try {
      await deleteUser(userId);
      showSuccessMessage("L'utilisateur a été supprimé avec succès");
    } catch (err) {
      setUsers(previousUsers);
      toast.error(err?.message || "Erreur lors de la suppression");
    } finally {
      setBusyId(null);
    }
  }

  return {
    users,
    loading,
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
  };
}
