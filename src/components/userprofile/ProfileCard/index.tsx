import React from 'react';
import { TouchableOpacity } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

import RNImage from '@/custom/RNImage';
import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';

import { styles } from './styles';

type ProfileCardProps = {
  onPress?: any;
  name?: string;
  img?: string;
  create?: boolean;
  agent?: boolean;
};
const ProfileCard: React.FC<ProfileCardProps> = ({ name, img, create, onPress, agent }) => {
  const imgObj = agent ? (
    <RNImage source={require('@/assets/images/userProfile/agent.png')} style={styles.imgAgent} resizeMode="contain" />
  ) : img ? (
    <RNImage
      source={{
        uri: img,
      }}
      style={styles.imgStyle}
    />
  ) : create ? (
    <AntDesign name={'plus'} size={30} color="black" />
  ) : (
    <RNView style={styles.defaultProfile}>
      <RNText style={styles.ownerText}>{name?.slice(0, 1).toUpperCase()}</RNText>
    </RNView>
  );
  return (
    <TouchableOpacity onPress={onPress}>
      <RNView style={styles.containerView}>
        <RNView style={styles.topView}>
          <RNView style={styles.profile}>{imgObj}</RNView>
          <RNView>
            <RNText style={styles.nameStyle}>{name}</RNText>
          </RNView>
        </RNView>
      </RNView>
    </TouchableOpacity>
  );
};

export default ProfileCard;
