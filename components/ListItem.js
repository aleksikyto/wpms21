import React from 'react'
import PropTypes from 'prop-types'
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';

const ListItem = ({singleMedia}) => {
  return (
    <TouchableOpacity style={styles.box}>
    <View style={{flex: 1}}>
      <Image
        style={{flex: 1}}
        source={{uri: singleMedia.thumbnails.w160}}
      />
    </View>
      <View style={styles.text}>
        <Text style={styles.title}>{singleMedia.title}</Text>
        <Text>{singleMedia.description}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  box: {
    padding: 20,
    backgroundColor: 'lightblue',
    flexDirection: 'row',
    marginTop: 10,
  },
  text: {
    flex: 1,
    marginLeft:10,
  },
  title: {
    fontWeight: "bold",
    fontSize:20,
  },
});

ListItem.propTypes = {
  singleMedia: PropTypes.object.isRequired,
}

export default ListItem


