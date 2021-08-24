import React from 'react';
import {FlatList} from 'react-native';
import {useMedia} from '../hooks/ApiHooks';
import ListItem from './ListItem';

const List = (props) => {
  const {mediaArray} = useMedia();
  console.log('List rivi 15', mediaArray);
  return (
    <FlatList
      data={mediaArray}
      renderItem={({item}) => <ListItem singleMedia={item} />}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

export default List;
