import React from 'react';
import {View} from 'react-native';
import {StyleSheets} from '../../StyleSheets';
import Info from './Info';
import {User} from '../../icons/index';

// Bileşen
const InfoGuest: React.FC = () => (
  <View style={StyleSheets.flexContainer}>
    <Info
      text="Only for Authenticated Users"
      subtext="Dont be a guest. Create an account"
      renderIcon={User}
    />
  </View>
);

export default InfoGuest;
