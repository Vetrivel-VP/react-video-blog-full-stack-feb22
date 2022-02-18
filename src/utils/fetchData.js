import {
  collection,
  getDoc,
  getDocs,
  orderBy,
  query,
  where,
  doc,
} from "firebase/firestore";
import { firebaseApp } from "../firebase-config";

export const getAllFeeds = async (fireStoreDb) => {
  const feeds = await getDocs(
    query(collection(fireStoreDb, "videos"), orderBy("id", "desc"))
  );
  return feeds.docs.map((doc) => doc.data());
};

export const categoryFeeds = async (fireStoreDb, categoryId) => {
  const feeds = await getDocs(
    query(
      collection(fireStoreDb, "videos"),
      where("category", "==", categoryId),
      orderBy("id", "desc")
    )
  );
  return feeds.docs.map((doc) => doc.data());
};

export const getSpecificVideo = async (fireStoreDb, videoId) => {
  const videoRef = doc(fireStoreDb, "videos", videoId);
  const videoSnap = await getDoc(videoRef);
  if (videoSnap.exists()) {
    return videoSnap.data();
  } else {
    return "No such document";
  }
};
