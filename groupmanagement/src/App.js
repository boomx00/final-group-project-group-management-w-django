import 'react-native-gesture-handler';
import React from 'react'

// Redux
import { Provider } from 'react-redux'
import store from './redux/store'
const { dispatch } = store

// Redux-Actions
import { logoutAction } from './redux/slices/authSlices'

// React Navigation
import { NavigationContainer } from '@react-navigation/native';

// Routes
import Routes from './Routes'
import { Provider as PaperProvider } from 'react-native-paper'
import * as RootNavigation from './middleware/RootNavigation'

// Axios
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';

axios.defaults.baseURL = "http://10.10.10.124:3002/api/v1/"

axios.interceptors.request.use(async (request) => {

  const token = await AsyncStorage.getItem('token')
  request.headers = {
    ...request.headers,
    'x-access-token': token
  }

  return request
}, (error) => {
  return Promise.reject(error)
})

axios.interceptors.response.use(async (response) => {
  if (response.data.status == 401 || response.data.STATUS == "AUTH_UNAUTORIZED_TOKEN") {
    dispatch(logoutAction())
    return response
  } else {
    return response
  }
}, (error) => {
  return Promise.reject(error)
})

const App = () => {
  return (
    <Provider store={store}>
      <PaperProvider>
        <NavigationContainer>
          <Routes />
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  )
}

export default App
