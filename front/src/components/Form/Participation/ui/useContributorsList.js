import { useState } from "react";

const STORAGE_KEY = "contributors";
const EMPTY_CONTRIBUTOR = {
  gender: "Mr",
  full_name: "",
  profession: "",
  email: "",
};

function readContributors() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

function saveContributors(list) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

/** Gère la liste des collaborateurs (état + localStorage). */
export default function useContributorsList() {
  const [current, setCurrent] = useState({ ...EMPTY_CONTRIBUTOR });
  const [contributors, setContributors] = useState(readContributors);

  function updateCurrent(e) {
    const { name, value } = e.target;
    setCurrent((c) => ({ ...c, [name]: value }));
  }

  function addContributor() {
    const ok =
      current.full_name.trim() &&
      current.profession.trim() &&
      current.email.trim();
    if (!ok) return;

    const next = [...contributors, current];
    setContributors(next);
    saveContributors(next);
    setCurrent({ ...EMPTY_CONTRIBUTOR });
  }

  function removeContributor(index) {
    const next = contributors.filter((_, i) => i !== index);
    setContributors(next);
    saveContributors(next);
  }

  return {
    current,
    contributors,
    updateCurrent,
    addContributor,
    removeContributor,
  };
}
