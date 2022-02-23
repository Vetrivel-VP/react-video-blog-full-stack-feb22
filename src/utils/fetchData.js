import {
  collection,
  getDoc,
  getDocs,
  orderBy,
  query,
  where,
  doc,
  deleteDoc,
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

export const recommendedFeed = async (fireStoreDb, categoryId, videoId) => {
  const feeds = await getDocs(
    query(
      collection(fireStoreDb, "videos"),
      where("category", "==", categoryId),
      where("id", "!=", videoId),
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

export const getUserInfo = async (fireStoreDb, userId) => {
  const userRef = doc(fireStoreDb, "users", userId);
  const userSnap = await getDoc(userRef);
  if (userSnap.exists()) {
    return userSnap.data();
  } else {
    return "No such Document";
  }
};

export const userCreatedVideos = async (fireStoreDb, userId) => {
  const feeds = await getDocs(
    query(
      collection(fireStoreDb, "videos"),
      where("userId", "==", userId),
      orderBy("id", "desc")
    )
  );
  return feeds.docs.map((doc) => doc.data());
};

export const deleteVideo = async (fireStoreDb, videoId) => {
  await deleteDoc(doc(fireStoreDb, "videos", videoId));
};
