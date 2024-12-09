import React, { memo, useEffect } from 'react';

import { useDebounce } from '@uidotdev/usehooks';

import RNView from '@/custom/RNView';
import { useLazyGoogleCityAutoCompleteQuery } from '@/redux/login/loginService';

import CommonSearchArea from '../CommonSearchArea';

type CityModalProps = {
  showCity?: boolean;
  onPressClose?: () => void;
  setCity?: (name: string) => void;
};

const CitySelectorModal: React.FC<CityModalProps> = ({ showCity, onPressClose, setCity }) => {
  const [searchCity, setSearchCity] = React.useState('');
  const debouncedSearchTerm = useDebounce(searchCity, 300);
  const [citySelectorData, { data, status, isLoading }] = useLazyGoogleCityAutoCompleteQuery();
  useEffect(() => {
    if (debouncedSearchTerm) {
      const payload = { city: searchCity };
      const params = new URLSearchParams(payload).toString();
      citySelectorData(params);
    }
  }, [debouncedSearchTerm]);
  return (
    <RNView>
      {showCity && (
        <CommonSearchArea
          showArea={showCity}
          onPressClose={onPressClose}
          setArea={setCity}
          setSearchArea={e => {
            setSearchCity(e);
          }}
          name={'City'}
          loading={isLoading}
          data={data}
        />
      )}
    </RNView>
  );
};

export default memo(CitySelectorModal);
