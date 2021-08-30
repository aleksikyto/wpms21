import React from 'react';
import PropTypes from 'prop-types';
import {Text, StyleSheet, View, TouchableOpacity, Image} from 'react-native';
import {uploadsUrl} from '../utils/variables';

const ListItem = ({singleMedia}) => {
  return (
    <TouchableOpacity style={styles.box}>
      <View style={styles.imageBox}>
        <Image
          style={styles.images}
          source={{
            uri: uploadsUrl + singleMedia.thumbnails?.w160,
          }}
        />
      </View>
      <View style={styles.text}>
        <Text style={styles.title}>{singleMedia.title}</Text>
        <Text style={styles.desc}>{singleMedia.description}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  box: {
    padding: 20,
    backgroundColor: '#2E2F2F',
    flexDirection: 'row',
    marginTop: 10,
  },
  imageBox: {
    flex: 1,
    minHeight: 100,
  },
  images: {
    flex: 1,
    borderBottomLeftRadius: 50,
  },
  text: {
    flex: 1,
    marginLeft: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'white',
  },
  desc: {
    color: 'white',
  },
});

ListItem.propTypes = {
  singleMedia: PropTypes.object.isRequired,
};

export default ListItem;
