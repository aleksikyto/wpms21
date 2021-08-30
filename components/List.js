import React from 'react';
import {
  FlatList,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  View,
  Text,
} from 'react-native';
import {useMedia} from '../hooks/ApiHooks';
import ListItem from './ListItem';
import {Settings} from 'react-native-feather';
import PropTypes from 'prop-types';

const image = {
  uri: 'https://cdn.pixabay.com/photo/2015/10/12/15/01/cat-984097_960_720.jpg',
};

const List = ({navigation}) => {
  const {mediaArray} = useMedia();
  console.log('List mediaArray', mediaArray);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBox}>
        <ImageBackground
          source={image}
          resizeMode="cover"
          style={styles.image}
          imageStyle={styles.imageStyles}
        ></ImageBackground>
        <View style={styles.settingsBox}>
          <Settings stroke="white" width={32} height={32} />
        </View>
        <View style={styles.box}>
          <Text style={styles.headerText}>Happy cats</Text>
        </View>
      </View>
      <FlatList
        style={styles.bottomBox}
        data={mediaArray}
        renderItem={({item}) => (
          <ListItem navigation={navigation} singleMedia={item} />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    backgroundColor: '#051014',
  },
  topBox: {
    flexBasis: 300,
  },
  image: {
    flex: 1,
  },
  imageStyles: {
    borderBottomRightRadius: 50,
  },
  box: {
    height: 50,
    width: 250,
    backgroundColor: 'rgba(1, 1, 1, 0.7)',
    position: 'absolute',
    bottom: 20,
    left: 0,
    borderBottomRightRadius: 50,
    borderTopRightRadius: 50,
    shadowRadius: 50,
    shadowColor: 'black',
  },
  headerText: {
    fontSize: 30,
    alignSelf: 'center',
    color: 'white',
  },
  settingsBox: {
    width: 50,
    height: 50,
    position: 'absolute',
    top: 20,
    right: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomBox: {
    flex: 3,
  },
});

List.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default List;
