import { useEffect, useState } from "react";
import GetPartnerApi from "../../../services/Partner/GetPartnerApi";
import PartnerUpdate from "../../Form/CMS/Partners/PartnerUpdate";
import deletePartnerApi from "../../../services/Partner/DeletePartnerApi";
import BtnAdd from "../../Buttons/BtnAdd";
import PartnerAdd from "../../Form/CMS/Partners/PartnerAdd";
import ConfirmDialog from "../../ConfirmDialog.jsx";
import { getApiBaseUrl } from "../../../utils/apiBase.js";
import { typeAdminTitle } from "../../../utils/typography.js";
import { toast } from "../../../utils/toast.js";

function PartnersManagement() {
  const [partners, setPartners] = useState([]);
  const [, setLoading] = useState(true);
  const [selectedPartner, setSelectedPartner] = useState(null);
  const [modalType, setModalType] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  function handleCreate() {
    setSelectedPartner(null);
    setModalType("add");
  }

  function handleCloseModal() {
    setSelectedPartner(null);
    setModalType(null);
  }

  async function GetAllPartner() {
    try {
      setLoading(true);
      const res = await GetPartnerApi();
      setPartners(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error(error);
      toast.error("Erreur lors du chargement des partenaires");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    GetAllPartner();
  }, []);

  function handleEdit(partner) {
    setSelectedPartner(partner);
    setModalType("edit");
  }

  function requestDelete(partner) {
    setDeleteTarget(partner);
  }

  async function confirmDelete() {
    if (!deleteTarget) return;

    try {
      await deletePartnerApi(deleteTarget.id);
      setPartners((prev) => prev.filter((p) => p.id !== deleteTarget.id));
      toast.success("Partenaire supprimé");
    } catch (error) {
      console.error(error);
      toast.error("Impossible de supprimer le partenaire");
    } finally {
      setDeleteTarget(null);
    }
  }

  return (
    <section className="w-full">
      <ConfirmDialog
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={confirmDelete}
        title="Supprimer le partenaire"
        message={
          deleteTarget
            ? `Supprimer « ${deleteTarget.name} » ?`
            : ""
        }
        confirmLabel="Supprimer"
        confirmVariant="danger"
      />

      <div className="flex justify-between pr-6">
        <h3 className={typeAdminTitle}>Gestion de nos partnaires</h3>
        <div className="pt-5 flex justify-end">
          <BtnAdd onClick={handleCreate}></BtnAdd>
        </div>
      </div>

      <div className="flex w-full py-10">
        <table className="w-full table-fixed border-separate border-spacing-y-2">
          <thead>
            <tr className="text-left h-20 rounded-xl bg-[#52A3FF]/20 dark:bg-[#52A3FF]/20 border border-black/10 dark:border-white/10">
              <th scope="col" className="w-[25%] px-4 py-2">
                Logo
              </th>
              <th scope="col" className="w-[25%] px-4 py-2">
                Nom
              </th>
              <th scope="col" className="w-[25%] px-4 py-2">
                Lien
              </th>
              <th scope="col" className="w-[20%] px-4 py-2">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {partners.length > 0 &&
              partners.map((p) => (
                <tr
                  key={p.id ?? p.name}
                  className="align-middle rounded-xl bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/10"
                >
                  <td className="px-8 py-3">
                    <img
                      src={`${getApiBaseUrl()}${p.img}`}
                      alt={p.name}
                      className="h-16 w-auto object-contain"
                    />
                  </td>
                  <td className="px-4 py-3 font-medium">{p.name}</td>
                  <td className="px-4 py-3 truncate">
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:underline"
                    >
                      {p.url}
                    </a>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => handleEdit(p)}
                        className="rounded-full border border-neutral-200 bg-white px-4 py-2 text-xs font-bold text-neutral-800 hover:bg-neutral-50 dark:border-white/10 dark:bg-white/5 dark:text-white/80 dark:hover:bg-white/10"
                      >
                        Modifier
                      </button>
                      <button
                        type="button"
                        onClick={() => requestDelete(p)}
                        className="rounded-full border border-red-200 bg-red-50 px-4 py-2 text-xs font-extrabold text-red-700 hover:bg-red-100 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-200 dark:hover:bg-red-500/20"
                      >
                        Supprimer
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        {modalType === "edit" && selectedPartner && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/60 dark:bg-black/70 p-4">
            <div className="relative w-full max-w-3xl rounded-2xl bg-white dark:bg-black border border-white/10 max-h-[90vh] overflow-y-auto">
              <PartnerUpdate
                partner={selectedPartner}
                onClose={handleCloseModal}
                onUpdated={() => {
                  GetAllPartner();
                  handleCloseModal();
                }}
              />
            </div>
          </div>
        )}

        {modalType === "add" && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/60 dark:bg-black/70 p-4">
            <div className="relative w-full max-w-3xl rounded-2xl bg-white dark:bg-black border border-white/10 max-h-[90vh] overflow-y-auto">
              <PartnerAdd
                onClose={handleCloseModal}
                onAdded={() => {
                  GetAllPartner();
                  handleCloseModal();
                }}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default PartnersManagement;
