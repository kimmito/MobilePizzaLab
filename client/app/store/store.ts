import AsyncStorage from '@react-native-async-storage/async-storage'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import {	FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER, persistReducer, persistStore, PersistConfig } from 'redux-persist'
import { cartSlice } from './cart/cart.slice'

const cartReducer = cartSlice.reducer

const persistConfig: PersistConfig<any> = {
	key: 'root',
	storage: AsyncStorage,
	whitelist: ['cart']
}

const rootReducer = combineReducers({
	cart: cartReducer
})

const persistedReducer = persistReducer<TypeRootState>(
	persistConfig,
	rootReducer
)

export const store = configureStore({
	reducer: persistedReducer,
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
			}
		})
})

export const persistor = persistStore(store)
export type TypeRootState = ReturnType<typeof rootReducer>
