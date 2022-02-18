import { collection, getDocs, orderBy, query, where } from "firebase/firestore";

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
