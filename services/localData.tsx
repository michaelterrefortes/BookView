import AsyncStorage from "@react-native-async-storage/async-storage";

// 1. Storing an Object
export const storeBook = async (workId, title, author, cover) => {
  try {
    const value = await AsyncStorage.getItem("@saved");
    if (value !== null) {
      // Data exists
      //console.log(value);

      // 1. Get item
      const jsonValue = await AsyncStorage.getItem("@saved");

      // 2. Parse the item
      const existingList = JSON.parse(jsonValue);

      console.log("Items in storage", existingList);

      // 3. Append the new item

      existingList.works[workId] = {
        key: workId,
        title: title,
        author: author,
        cover: cover,
      };
      const jsonNewValue = JSON.stringify(existingList);
      await AsyncStorage.setItem("@saved", jsonNewValue);
      console.log("Book", workId, "saved, storage is:", existingList);

      return { saved: true };
    } else {
      // Data does not exist (null)
      //console.log("Item not found");
      const jsonValue = JSON.stringify({
        works: {
          [workId]: {
            key: workId,
            title: title,
            author: author,
            cover: cover,
          },
        },
      });
      await AsyncStorage.setItem("@saved", jsonValue);
      console.log("Book", workId, "saved, storage is:", jsonValue);
      return { saved: true };
    }
  } catch (e) {
    // saving error
    console.error("Error saving book:", e);

    return { saved: false };
  }
};

// 2. Get Book
export const getBook = async (workId) => {
  try {
    const value = await AsyncStorage.getItem("@saved");
    if (value !== null) {
      // Data exists
      //console.log(value);

      // 1. Get item
      const jsonValue = await AsyncStorage.getItem("@saved");

      // 2. Parse the item
      const existingList = JSON.parse(jsonValue);

      console.log("Items in storage", existingList);

      // 3. Append the new item

      if (existingList.works[workId]) {
        return { saved: true };
      } else {
        return { saved: false };
      }
    } else {
      // Data does not exist (null)
      //console.log("Item not found");

      return { saved: false };
    }
  } catch (e) {
    // saving error
    console.error("Error getting book:", e);

    return { saved: false };
  }
};

// 3. Removing Data
export const removeBook = async (workId) => {
  try {
    //await AsyncStorage.removeItem("@saved");

    const value = await AsyncStorage.getItem("@saved");
    if (value !== null) {
      // Data exists
      //console.log(value);

      // 1. Get item
      const jsonValue = await AsyncStorage.getItem("@saved");

      // 2. Parse the item
      const existingList = JSON.parse(jsonValue);

      // 3. Remove the item

      delete existingList.works[workId];

      const jsonNewValue = JSON.stringify(existingList);
      await AsyncStorage.setItem("@saved", jsonNewValue);
      console.log("Book", workId, "removed, current storage is:", jsonNewValue);

      return { removed: true };
    } else {
      // Data does not exist (null)

      return { removed: true };
    }
  } catch (e) {
    // remove error
    console.error("Error removing book:", e);
    return { removed: false };
  }
};

// 4. Clearing All Storage
export const clearAll = async () => {
  try {
    await AsyncStorage.clear();

    console.log("Cleared storage");
  } catch (e) {
    // clear error
    console.error("Error clearing storage:", e);
  }
};

// 5. Get all books
export const getAllBooks = async () => {
  try {
    //await AsyncStorage.removeItem("@saved");

    const value = await AsyncStorage.getItem("@saved");
    if (value !== null) {
      // Data exists
      //console.log(value);

      // 1. Get item
      const jsonValue = await AsyncStorage.getItem("@saved");

      // 2. Parse the item
      const existingList = JSON.parse(jsonValue);

      return existingList;
    } else {
      // Data does not exist (null)

      return { works: {} };
    }
  } catch (e) {
    // remove error
    console.error("Error retrieving book:", e);
    return { response: false };
  }
};
