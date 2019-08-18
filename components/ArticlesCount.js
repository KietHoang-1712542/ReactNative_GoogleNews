import React from 'react'
import {View, Text} from 'react-native'

import Styles from '../Styles'

export default ArticlesCount = (props) => {
  return (
    <View style={Styles.row}>
      <Text style={Styles.label}>Articles Count:</Text>
      <Text style={Styles.info}>{props.count}</Text>
    </View>
  );
};