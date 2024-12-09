import React from 'react';

import {
  BorewellTypeFilterData,
  CornerTypeFilterData,
  FencingTypeFilterData,
  LandRangeFilter,
  MostFavouriteFilterData,
  PostedTypeFilterData,
  PropertyApprovedTypeFilterData,
  PropertyStatusTypeFilterData,
  PropertyTypeFilter,
  VerifiedTypeFilterData,
} from '../LandBoxes';

type Props = {
  active: string;
  filterDetails: any;
  setFilterDetails: any;
};
const LandRightFilter: React.FC<Props> = ({ active, filterDetails, setFilterDetails }) => {
  switch (active) {
    case 'most_favourite':
      return <MostFavouriteFilterData filterDetails={filterDetails} setFilterDetails={setFilterDetails} />;
    case 'verified':
      return <VerifiedTypeFilterData filterDetails={filterDetails} setFilterDetails={setFilterDetails} />;
    case 'approved_by_rera':
      return <PropertyApprovedTypeFilterData filterDetails={filterDetails} setFilterDetails={setFilterDetails} />;
    case 'corner_property':
      return <CornerTypeFilterData filterDetails={filterDetails} setFilterDetails={setFilterDetails} />;
    case 'boundary_fencing_available':
      return <FencingTypeFilterData filterDetails={filterDetails} setFilterDetails={setFilterDetails} />;
    case 'borwell_available':
      return <BorewellTypeFilterData filterDetails={filterDetails} setFilterDetails={setFilterDetails} />;
    case 'property_for':
      return <PropertyStatusTypeFilterData filterDetails={filterDetails} setFilterDetails={setFilterDetails} />;
    case 'posted_by':
      return <PostedTypeFilterData filterDetails={filterDetails} setFilterDetails={setFilterDetails} />;
    case 'price_range':
      return <LandRangeFilter filterDetails={filterDetails} setFilterDetails={setFilterDetails} />;
    case 'property_type':
      return <PropertyTypeFilter filterDetails={filterDetails} setFilterDetails={setFilterDetails} />;

    default:
      return <></>;
  }
};

export default LandRightFilter;
