import React from 'react';
import PropTypes from 'prop-types';
import {uploadsUrl} from '../utils/variables';
import {Text, Card, ListItem} from 'react-native-elements';

const Single = ({route}) => {
  const {params} = route;
  return (
    <Card>
      <Card.Image
        style={{width: 300, height: 300}}
        source={{uri: uploadsUrl + params.filename}}
      />
      <Card.Divider />
      <Text h1>{params.title}</Text>
      <ListItem>
        <Text>{params.description}</Text>
      </ListItem>
    </Card>
  );
};

Single.propTypes = {
  route: PropTypes.object.isRequired,
};

export default Single;
