import 'react-native-gesture-handler';
import React from 'react'

// Redux
import { Provider } from 'react-redux'
import store from './redux/store'

// React Navigation
import { NavigationContainer } from '@react-navigation/native';

//Routes
import Routes from './Routes'


const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Routes />
      </NavigationContainer>
    </Provider>
  )
}

const mapStateToProps = (state) => {

}
export default App
