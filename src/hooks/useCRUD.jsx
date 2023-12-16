import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import { useAuthValue } from "../context/AuthContext";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  where,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

export const useCRUD = (docCollection, search = null) => {
  const { user } = useAuthValue();
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const collectionRef = collection(db, docCollection);

        let q;

        if (search) {
          q = query(
            collectionRef,
            where("tags", "array-contains", search),
            orderBy("createdAt", "desc")
          );
        } else if (user) {
          q = query(
            collectionRef,
            where("uid", "==", user.uid),
            orderBy("createdAt", "desc")
          );
        } else {
          q = query(collectionRef, orderBy("createdAt", "desc"));
        }

        const unsubscribe = onSnapshot(
          q,
          (querySnapshot) => {
            setDocuments(
              querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
            );
          },
          (error) => {
            console.error("Error fetching documents: ", error);
            setError(error.message);
          }
        );

        setLoading(false);

        return () => unsubscribe();
      } catch (error) {
        console.error("Error fetching documents: ", error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [docCollection, search, user]);

  const addDocument = async (data) => {
    try {
      await addDoc(collection(db, docCollection), data);
    } catch (error) {
      console.error("Error adding document: ", error.message);
      setError(error.message);
    }
  };

  const updateDocument = async (docId, data) => {
    try {
      const docRef = doc(db, docCollection, docId);
      await updateDoc(docRef, data);
    } catch (error) {
      console.error("Error updating document: ", error.message);
      setError(error.message);
    }
  };

  const deleteDocument = async (docId) => {
    try {
      const docRef = doc(db, docCollection, docId);
      await deleteDoc(docRef);
    } catch (error) {
      console.error("Error deleting document: ", error.message);
      setError(error.message);
    }
  };

  return { documents, error, loading, addDocument, updateDocument, deleteDocument };
};

