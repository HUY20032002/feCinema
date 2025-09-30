import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // lưu vào localStorage
import authReducer from "./authSlice";
import movieReducer from "./movieSlice";
import cinemaReducer from "./cinemaSlice";
import roomReducer from "./roomSlice";
import showtimeReducer from "./showtimeSlice";
const rootReducer = combineReducers({
  auth: authReducer,
  cinema: cinemaReducer,
  movie: movieReducer,
  room: roomReducer,
  showtime: showtimeReducer,
});

const persistConfig = {
  key: "root_v2",
  storage,
  whitelist: ["auth", "movie", "cinema", "room", "showtime"], // chỉ lưu slice auth
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
