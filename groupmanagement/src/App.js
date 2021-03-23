import 'react-native-gesture-handler';
import React from 'react'

// Redux
import { Provider } from 'react-redux'
import store from './redux/store'

// React Navigation
import { NavigationContainer } from '@react-navigation/native';

//Routes
import Routes from './Routes'

import { Provider as PaperProvider } from 'react-native-paper'


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
