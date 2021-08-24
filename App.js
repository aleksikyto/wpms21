import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Platform,
} from 'react-native';
import List from './components/List';


const App = () => {
  return (
    <SafeAreaView style={styles.container}>
       <List/>

     </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? 25 : 0,
  },

});

export default App;
