import React from 'react';

import moment from 'moment';

import Divider from '@/components/common/Divider';
import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';
import { useAppSelector } from '@/hooks/reduxHooks';
import { getUserData } from '@/redux/login/loginReducer';
import { deviceWidth, px } from '@/utils';

import { styles } from './styles';

interface PropertyAreaProps {
  details?: any;
}

const PropertyOwnerPostDetails: React.FC<PropertyAreaProps> = ({ details }) => {
  const selectedUserData = useAppSelector(getUserData);

  // console.log(' details : ', details);

  return (
    <RNView>
      <RNView style={styles.containerViewStyle}>
        {/* <RNView>
          <RNText style={styles.selectionHeader}>Ownder Details</RNText>
        </RNView> */}

        <RNView style={styles.selectionView}>
          <RNView style={styles.selectionSubView}>
            <RNView style={styles.ownerView}>
              <RNText style={styles.LabelText}>Posted By</RNText>
              <RNText style={styles.LabelText}>
                Member Since {moment(selectedUserData?.createdAt).format('DD-MM-YYYY')}
              </RNText>
            </RNView>

            <RNView style={{ marginVertical: 5 }}>
              {details?.business_id === null ? (
                <RNText style={styles.ownerTestStyle}>
                  {details?.posted_by?.fname
                    ? details?.posted_by?.fname
                        ?.toUpperCase()
                        .toLowerCase()
                        .replace(/(^\w)/, c => c.toUpperCase())
                    : 'NA'}{' '}
                  {details?.posted_by?.lname
                    ? details?.posted_by?.lname
                        ?.toUpperCase()
                        .toLowerCase()
                        .replace(/(^\w)/, c => c.toUpperCase())
                    : 'NA'}
                </RNText>
              ) : (
                <RNText style={styles.ownerTestStyle}>
                  {details?.property?.business_info?.name
                    ?.toUpperCase()
                    .toLowerCase()
                    .replace(/(^\w)/, c => c.toUpperCase())}
                </RNText>
              )}
            </RNView>
          </RNView>
        </RNView>

        <Divider
          borderColor="#D9D6D6"
          dividerWidth={deviceWidth}
          style={{
            marginVertical: px(10),
          }}
        />
      </RNView>
    </RNView>
  );
};

export default PropertyOwnerPostDetails;
