import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // lưu vào localStorage
import authReducer from "./authSlice";
import movieReducer from "./movieSlice";
const rootReducer = combineReducers({
  auth: authReducer,
  movie: movieReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth,movie"], // chỉ lưu slice auth
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // cần để redux-persist không warning
    }),
});

export const persistor = persistStore(store);
export default store;
