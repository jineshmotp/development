import React from 'react';

import {
  AmenitiesFilter,
  AvailabilityTypeFilter,
  ColivingRangeFilter,
  FurnishingTypeFilter,
  GenderFilter,
  MostFavouriteFilterData,
  PostedTypeFilterData,
  PropertyAgeFilter,
  PropertyApprovedTypeFilterData,
  PropertyStatusTypeFilterData,
  PropertyTypeFilter,
  SharingTypeFilter,
  TransactionTypeFilter,
  VerifiedTypeFilterData,
  WashroomFilter,
} from '../ColivingBoxes';

type Props = {
  active: string;
  filterDetails: any;
  setFilterDetails: any;
};
const ColivingRightFilter: React.FC<Props> = ({ active, filterDetails, setFilterDetails }) => {
  switch (active) {
    case 'most_favourite':
      return <MostFavouriteFilterData filterDetails={filterDetails} setFilterDetails={setFilterDetails} />;
    case 'verified':
      return <VerifiedTypeFilterData filterDetails={filterDetails} setFilterDetails={setFilterDetails} />;
    case 'approved_by_rera':
      return <PropertyApprovedTypeFilterData filterDetails={filterDetails} setFilterDetails={setFilterDetails} />;
    case 'property_for':
      return <PropertyStatusTypeFilterData filterDetails={filterDetails} setFilterDetails={setFilterDetails} />;
    case 'posted_by':
      return <PostedTypeFilterData filterDetails={filterDetails} setFilterDetails={setFilterDetails} />;
    case 'price_range':
      return <ColivingRangeFilter filterDetails={filterDetails} setFilterDetails={setFilterDetails} />;
    case 'property_type':
      return <PropertyTypeFilter filterDetails={filterDetails} setFilterDetails={setFilterDetails} />;
    case 'sharing_type':
      return <SharingTypeFilter filterDetails={filterDetails} setFilterDetails={setFilterDetails} />;
    case 'attached_washroom':
      return <WashroomFilter filterDetails={filterDetails} setFilterDetails={setFilterDetails} />;
    case 'gender_preference':
      return <GenderFilter filterDetails={filterDetails} setFilterDetails={setFilterDetails} />;
    case 'transaction_type':
      return <TransactionTypeFilter filterDetails={filterDetails} setFilterDetails={setFilterDetails} />;
    case 'availability':
      return <AvailabilityTypeFilter filterDetails={filterDetails} setFilterDetails={setFilterDetails} />;
    case 'furnishing_status':
      return <FurnishingTypeFilter filterDetails={filterDetails} setFilterDetails={setFilterDetails} />;
    case 'age_of_property':
      return <PropertyAgeFilter filterDetails={filterDetails} setFilterDetails={setFilterDetails} />;

    case 'amenities':
      return <AmenitiesFilter filterDetails={filterDetails} setFilterDetails={setFilterDetails} />;

    default:
      return <></>;
  }
};

export default ColivingRightFilter;
