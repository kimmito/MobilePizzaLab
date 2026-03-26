import { StripeProvider } from '@stripe/stripe-react-native'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Navigation from 'app/navigation/Navigation'
import { registerRootComponent } from 'expo'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import Toast from 'react-native-toast-message'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import AuthProvider from '@/providers/auth/AuthProvider'

import { persistor, store } from '@/store/store'

import './global.css'

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false
		}
	}
})

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<Provider store={store}>
				<PersistGate persistor={persistor} loading={null}>
					<AuthProvider>
						<SafeAreaProvider>
							<StripeProvider publishableKey={process.env.STRIPE_KEY || ''}>
								<Navigation />
							</StripeProvider>
						</SafeAreaProvider>
						<StatusBar style='light' />
						<Toast />
					</AuthProvider>
				</PersistGate>
			</Provider>
		</QueryClientProvider>
	)
}

registerRootComponent(App)
