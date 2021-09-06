import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {uploadsUrl} from '../utils/variables';
import {Avatar, ListItem as RNEListItem} from 'react-native-elements';

const ListItem = ({singleMedia, navigation}) => {
  return (
    <TouchableOpacity
      style={styles.box}
      onPress={() => {
        navigation.navigate('Single', singleMedia);
      }}
    >
      <RNEListItem>
        <Avatar source={{uri: uploadsUrl + singleMedia.thumbnails?.w160}} />
        <RNEListItem.Content>
          <RNEListItem.Title h4>{singleMedia.title}</RNEListItem.Title>
          <RNEListItem.Subtitle>{singleMedia.description}</RNEListItem.Subtitle>
        </RNEListItem.Content>
        <RNEListItem.Chevron></RNEListItem.Chevron>
      </RNEListItem>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  box: {
    backgroundColor: '#2E2F2F',
    marginTop: 10,
  },
});

ListItem.propTypes = {
  singleMedia: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
};

export default ListItem;
