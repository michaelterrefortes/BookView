import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveSearch = async (newSearchTerm) => {
  try {
    const existing = await AsyncStorage.getItem("@recent_searches");
    let searches = existing ? JSON.parse(existing) : [];

    // Avoid duplicates and limit to 10 recent searches
    searches = searches.filter((item) => item !== newSearchTerm);
    searches.unshift(newSearchTerm); // Add to the front
    //if (searches.length > 10) searches.pop();

    await AsyncStorage.setItem("@recent_searches", JSON.stringify(searches));
  } catch (error) {
    console.error("Error saving search:", error);
  }
};

export const deleteSpecificSearch = async (indexToRemove) => {
  try {
    const existing = await AsyncStorage.getItem("@recent_searches");
    if (existing) {
      let searches = JSON.parse(existing);
      searches.splice(indexToRemove, 1); // Remove by index

      await AsyncStorage.setItem("@recent_searches", JSON.stringify(searches));
    }
  } catch (error) {
    console.error("Error deleting search:", error);
  }
};

export const clearRecentSearches = async () => {
  try {
    await AsyncStorage.removeItem("@recent_searches");
  } catch (error) {
    console.error("Error clearing recent searches:", error);
  }
};

export const clearAllAppData = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    await AsyncStorage.multiRemove(keys);
  } catch (error) {
    console.error("Error clearing app data:", error);
  }
};
