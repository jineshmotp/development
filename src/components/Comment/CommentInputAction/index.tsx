import React from 'react';
import { TouchableOpacity } from 'react-native';

import RNImage from '@/custom/RNImage';
import RNView from '@/custom/RNView';

import { styles } from './styles';

type Props = {
  replyComment?: string;
  onPressSmily?: () => void;
  onPressSubmit?: () => void;
  onPressReplySubmit?: () => void;
};

const CommentInputAction: React.FC<Props> = ({ replyComment, onPressSmily, onPressSubmit, onPressReplySubmit }) => {
  return (
    <RNView style={styles.topView}>
      {/* <TouchableOpacity onPress={onPressSmily}>
        <RNImage source={require('@/assets/images/property/smily.png')} style={styles.imgstyle1} />
      </TouchableOpacity> */}
      {replyComment ? (
        <TouchableOpacity onPress={onPressReplySubmit}>
          <RNImage source={require('@/assets/images/property/rightarrow.png')} style={styles.rightArrow} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={{ opacity: 0.3 }}>
          <RNImage source={require('@/assets/images/property/rightarrow.png')} style={styles.rightArrow} />
        </TouchableOpacity>
      )}
    </RNView>
  );
};

export default CommentInputAction;
