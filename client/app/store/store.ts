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
