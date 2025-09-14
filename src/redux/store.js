import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import authReducer from "./authSlice";

// gộp reducer (sau này có nhiều slice thì gom vào đây)
const rootReducer = combineReducers({
  auth: authReducer,
});

// cấu hình persist
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"], // chỉ lưu auth
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// tạo store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // fix warning với redux-persist
    }),
});

// tạo persistor
export const persistor = persistStore(store);

export default store;
