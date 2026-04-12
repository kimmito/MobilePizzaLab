import { RouteProp, useRoute } from '@react-navigation/native'

import { TypeRootStackParamList } from '../navigation/navigation.types'

const useTypedRoute = <N extends keyof TypeRootStackParamList>() =>
	useRoute<RouteProp<TypeRootStackParamList, N>>()

export default useTypedRoute
