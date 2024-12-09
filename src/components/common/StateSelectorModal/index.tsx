import React, { memo, useEffect } from 'react';

import { useDebounce } from '@uidotdev/usehooks';

import RNView from '@/custom/RNView';
import { useLazyGoogleCityAutoCompleteQuery } from '@/redux/login/loginService';

import CommonSearchArea from '../CommonSearchArea';

type CityModalProps = {
  showState?: boolean;
  onPressClose?: () => void;
  setState?: (name: string) => void;
};
const StateSelectorModal: React.FC<CityModalProps> = ({ showState, onPressClose, setState }) => {
  const [searchState, setSearchState] = React.useState('');
  const debouncedSearchState = useDebounce(searchState, 300);
  const [stateSelectorData, { data, status, isLoading }] = useLazyGoogleCityAutoCompleteQuery();
  useEffect(() => {
    if (debouncedSearchState) {
      const payload = { state: searchState };
      const params = new URLSearchParams(payload).toString();
      stateSelectorData(params);
    }
  }, [debouncedSearchState]);
  return (
    <RNView>
      {showState && (
        <CommonSearchArea
          showArea={showState}
          onPressClose={onPressClose}
          setArea={setState}
          setSearchArea={e => {
            setSearchState(e);
          }}
          name="State"
          loading={isLoading}
          data={data}
        />
      )}
    </RNView>
  );
};

export default memo(StateSelectorModal);
