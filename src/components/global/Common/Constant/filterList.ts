export const filterList = [
  {
    label: 'Most Favourite',
    key: 'most_favourite',
  },
  {
    label: 'Verified',
    key: 'verified',
  },
  {
    label: 'Approved by RERA',
    key: 'approved_by_rera',
  },
  {
    label: 'Showing Results For',
    key: 'property_for',
  },
  {
    label: 'Posted By',
    key: 'posted_by',
  },
  {
    label: 'Price Range',
    key: 'price_range',
  },

  {
    label: 'Property Type',
    key: 'property_type',
  },
  {
    label: 'BHK Type',
    key: 'bhk_type',
  },
  {
    label: 'Transaction Type',
    key: 'transaction_type',
  },
  {
    label: 'Availability',
    key: 'availability',
  },
  {
    label: 'Furnishing Status',
    key: 'furnishing_status',
  },
  {
    label: 'Property Age',
    key: 'age_of_property',
  },
  {
    label: 'Amenities',
    key: 'amenities',
  },
];

export const LandFilterList = [
  {
    label: 'Most Favourite',
    key: 'most_favourite',
  },
  {
    label: 'Verified',
    key: 'verified',
  },
  {
    label: 'Approved by RERA',
    key: 'approved_by_rera',
  },
  {
    label: 'Corner Property',
    key: 'corner_property',
  },
  {
    label: 'Boundary Fencing Available',
    key: 'boundary_fencing_available',
  },
  {
    label: 'Borwell Available',
    key: 'borwell_available',
  },
  {
    label: 'Showing Results For',
    key: 'property_for',
  },
  {
    label: 'Posted By',
    key: 'posted_by',
  },
  {
    label: 'Price Range',
    key: 'price_range',
  },

  {
    label: 'Property Type',
    key: 'property_type',
  },
];

export const ColivingFilterList = [
  {
    label: 'Most Favourite',
    key: 'most_favourite',
  },
  {
    label: 'Verified',
    key: 'verified',
  },
  {
    label: 'Approved by RERA',
    key: 'approved_by_rera',
  },
  {
    label: 'Showing Results For',
    key: 'property_for',
  },
  {
    label: 'Posted By',
    key: 'posted_by',
  },
  {
    label: 'Price Range',
    key: 'price_range',
  },

  {
    label: 'Property Type',
    key: 'property_type',
  },
  {
    label: 'Sharing Type',
    key: 'sharing_type',
  },
  {
    label: 'Attached Washroom',
    key: 'attached_washroom',
  },
  {
    label: 'Gender Preference',
    key: 'gender_preference',
  },
  {
    label: 'Transaction Type',
    key: 'transaction_type',
  },
  {
    label: 'Availability',
    key: 'availability',
  },
  {
    label: 'Furnishing Status',
    key: 'furnishing_status',
  },
  {
    label: 'Property Age',
    key: 'age_of_property',
  },
  {
    label: 'Amenities',
    key: 'amenities',
  },
];
export const CommercialFilterList = [
  {
    label: 'Most Favourite',
    key: 'most_favourite',
  },
  {
    label: 'Verified',
    key: 'verified',
  },
  {
    label: 'Approved by RERA',
    key: 'approved_by_rera',
  },
  {
    label: 'Showing Results For',
    key: 'property_for',
  },
  {
    label: 'Posted By',
    key: 'posted_by',
  },
  {
    label: 'Price Range',
    key: 'price_range',
  },

  {
    label: 'Property Type',
    key: 'property_type',
  },
  {
    label: 'Transaction Type',
    key: 'transaction_type',
  },
  {
    label: 'Availability',
    key: 'availability',
  },
  {
    label: 'Furnishing Status',
    key: 'furnishing_status',
  },
  {
    label: 'Property Age',
    key: 'age_of_property',
  },
  {
    label: 'Amenities',
    key: 'amenities',
  },
];

export const CommercialFilterListFun = (filters: any) => {
  return [
    {
      label: 'Most Favourite',
      key: 'most_favourite',
    },
    {
      label: 'Verified',
      key: 'verified',
    },

    {
      label: 'Approved by RERA',
      key: 'approved_by_rera',
    },
    {
      label: 'Showing Results For',
      key: 'property_for',
    },
    {
      label: 'Posted By',
      key: 'posted_by',
    },
    {
      label: 'Price Range',
      key: 'price_range',
    },

    {
      label: 'Property Type',
      key: 'property_type',
    },
    ...(Array.isArray(filters?.property_type)
      ? filters?.property_type?.some((item: any) => ['Retail', 'Showroom', 'Industrial'].includes(item))
        ? [
            {
              key: 'suitable_for',
              label: 'Suitable For',
            },
          ]
        : []
      : []),
    {
      label: 'Transaction Type',
      key: 'transaction_type',
    },
    {
      label: 'Availability',
      key: 'availability',
    },
    {
      label: 'Furnishing Status',
      key: 'furnishing_status',
    },
    {
      label: 'Property Age',
      key: 'age_of_property',
    },
    {
      label: 'Amenities',
      key: 'amenities',
    },
  ];
};

export const CombinedFilterList = [
  {
    label: 'Most Favourite',
    key: 'most_favourite',
  },
  {
    label: 'Verified',
    key: 'verified',
  },
  {
    label: 'Approved by RERA',
    key: 'approved_by_rera',
  },
  {
    label: 'Showing Results For',
    key: 'property_for',
  },
  {
    label: 'Posted By',
    key: 'posted_by',
  },
  {
    label: 'Price Range',
    key: 'price_range',
  },

  {
    label: 'Property Type',
    key: 'property_type',
  },
  {
    label: 'BHK Type',
    key: 'bhk_type',
  },
  {
    label: 'Transaction Type',
    key: 'transaction_type',
  },
  {
    label: 'Availability',
    key: 'availability',
  },
  {
    label: 'Furnishing Status',
    key: 'furnishing_status',
  },
  {
    label: 'Property Age',
    key: 'age_of_property',
  },
  {
    label: 'Amenities',
    key: 'amenities',
  },
];
export const CombinedFilterListFun = (filters: any) => {
  return [
    {
      label: 'Most Favourite',
      key: 'most_favourite',
    },
    {
      label: 'Verified',
      key: 'verified',
    },

    {
      label: 'Approved by RERA',
      key: 'approved_by_rera',
    },
    {
      label: 'Showing Results For',
      key: 'property_for',
    },
    {
      label: 'Posted By',
      key: 'posted_by',
    },
    {
      label: 'Price Range',
      key: 'price_range',
    },

    {
      label: 'Property Type',
      key: 'property_type',
    },
    ...(Array.isArray(filters?.property_type)
      ? filters?.property_type?.some((item: any) => ['Retail', 'Showroom', 'Industrial'].includes(item))
        ? [
            {
              key: 'suitable_for',
              label: 'Suitable For',
            },
          ]
        : []
      : []),
    {
      label: 'Transaction Type',
      key: 'transaction_type',
    },
    {
      label: 'Availability',
      key: 'availability',
    },
    {
      label: 'BHK Type',
      key: 'bhk_type',
    },
    {
      label: 'Furnishing Status',
      key: 'furnishing_status',
    },
    {
      label: 'Property Age',
      key: 'age_of_property',
    },
    {
      label: 'Amenities',
      key: 'amenities',
    },
  ];
};

export const NearuFilterList = [
  {
    label: 'Most Favourite',
    key: 'most_favourite',
  },
  {
    label: 'Verified',
    key: 'verified',
  },
  {
    label: 'Approved by RERA',
    key: 'approved_by_rera',
  },
  {
    label: 'Showing Results For',
    key: 'property_for',
  },
  {
    label: 'Posted By',
    key: 'posted_by',
  },
  {
    label: 'Price Range',
    key: 'price_range',
  },

  {
    label: 'Property Type',
    key: 'property_type',
  },
  {
    label: 'BHK Type',
    key: 'bhk_type',
  },
  {
    label: 'Sharing Type',
    key: 'sharing_type',
  },
  {
    label: 'Attached Washroom',
    key: 'attached_washroom',
  },
  {
    label: 'Gender Preference',
    key: 'gender_preference',
  },
  {
    label: 'Transaction Type',
    key: 'transaction_type',
  },
  {
    label: 'Availability',
    key: 'availability',
  },
  {
    label: 'Furnishing Status',
    key: 'furnishing_status',
  },
  {
    label: 'Property Age',
    key: 'age_of_property',
  },
  {
    label: 'Amenities',
    key: 'amenities',
  },
];
export const NearuFilterListFun = (filters: any) => {
  return [
    {
      label: 'Most Favourite',
      key: 'most_favourite',
    },
    {
      label: 'Verified',
      key: 'verified',
    },

    {
      label: 'Approved by RERA',
      key: 'approved_by_rera',
    },
    {
      label: 'Distance',
      key: 'distance',
    },
    // {
    //   label: 'Showing Results For',
    //   key: 'property_for',
    // },
    {
      label: 'Posted By',
      key: 'posted_by',
    },
    {
      label: 'Price Range',
      key: 'price_range',
    },

    // {
    //   label: 'Property Type',
    //   key: 'property_type',
    // },
    // ...(Array.isArray(filters?.property_type)
    //   ? filters?.property_type?.some((item: any) => ['Retail', 'Showroom', 'Industrial'].includes(item))
    //     ? [
    //         {
    //           key: 'suitable_for',
    //           label: 'Suitable For',
    //         },
    //       ]
    //     : []
    //   : []),
    {
      label: 'Sharing Type',
      key: 'sharing_type',
    },
    {
      label: 'Attached Washroom',
      key: 'attached_washroom',
    },
    {
      label: 'Gender Preference',
      key: 'gender_preference',
    },
    {
      label: 'Transaction Type',
      key: 'transaction_type',
    },
    {
      label: 'Availability',
      key: 'availability',
    },
    {
      label: 'Furnishing Status',
      key: 'furnishing_status',
    },
    {
      label: 'Property Age',
      key: 'age_of_property',
    },
    {
      label: 'Amenities',
      key: 'amenities',
    },
  ];
};
