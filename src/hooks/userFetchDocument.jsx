import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import { doc, getDoc } from "firebase/firestore";

export const useFetchDocument = (docCollection, id) => {
  const [document, setDocument] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    const fetchDocument = async () => {
      setLoading(true);

      try {
        const documentRef = doc(db, docCollection, id);
        const documentSnapshot = await getDoc(documentRef);

        if (documentSnapshot.exists()) {
          setDocument(documentSnapshot.data());
        } else {
          setError("Documento não encontrado.");
        }
      } catch (error) {
        console.error(error.message);
        setError(error.message);
      }

      setLoading(false);
    };

    fetchDocument();
  }, [docCollection, id]);

  return {
    document,
    loading,
    error,
  };
};