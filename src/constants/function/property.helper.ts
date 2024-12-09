import axios from 'axios';

import { GOOGLE_MAPS_API } from '@/utils/apiKeys';

export const iWant = [
  {
    label: 'Sell',
    child: [
      {
        label: 'Residential',
        child: [
          {
            label: 'Flat',
            child: [],
            key: 'flat',
            active: false,
          },
          {
            label: 'Apartment',
            child: [],
            key: 'apartment',
            active: false,
          },
          {
            label: 'Villa',
            child: [],
            key: 'villa',
            active: false,
          },
          {
            label: 'Farm House',
            child: [],
            key: 'farm-house',
            active: false,
          },
          {
            label: 'Guest House',
            child: [],
            key: 'guest-house',
            active: false,
          },
          {
            label: 'Studio Apartment',
            child: [],
            key: 'studio-apartment',
            active: false,
          },
          {
            label: 'Independent House',
            child: [],
            key: 'independent-house',
            active: false,
          },
        ],
        key: 'residential',
        active: false,
      },
      {
        label: 'Commercial',
        child: [
          {
            label: 'Hospitality',
            child: [
              {
                label: 'Hotel',
                key: 'hotel',
                child: [],
                active: false,
              },
              {
                label: 'Resorts',
                key: 'resorts',
                child: [],
                active: false,
              },
            ],
            key: 'hospatality',
            active: false,
          },
          {
            label: 'Shop_And_Retail',
            child: [
              {
                label: 'Retail',
                key: 'retail',
                child: [],
                active: false,
              },
              {
                label: 'Showroom',
                key: 'showroom',
                child: [],
                active: false,
              },
              {
                label: 'Shopping malls',
                key: 'shopping-malls',
                child: [],
                active: false,
              },
            ],
            key: 'shops-retail',
            active: false,
          },
          {
            label: 'Educational',
            child: [],
            key: 'educational',
            active: false,
          },
          {
            label: 'Office_Space',
            child: [],
            key: 'office-space',
            active: false,
          },
          {
            label: 'Industrial',
            child: [],
            key: 'industrial',
            active: false,
          },
        ],
        key: 'commercial',
        active: false,
      },
      {
        label: 'Land or Plot',
        child: [
          {
            label: 'Residential',
            child: [],
            key: 'residential',
            active: false,
          },
          {
            label: 'Agricultural or farm',
            child: [],
            key: 'agricultural-farm',
            active: false,
          },
          {
            label: 'Industrial',
            child: [],
            key: 'industrial',
            active: false,
          },
          {
            label: 'Institution',
            child: [],
            key: 'institution',
            active: false,
          },
        ],
        key: 'land_plot',
        active: false,
      },
    ],
    key: 'sale',
    active: false,
  },
  {
    label: 'Rent',
    child: [
      {
        label: 'Residential',
        child: [
          {
            label: 'Flat',
            child: [],
            key: 'flat',
            active: false,
          },
          {
            label: 'Apartment',
            child: [],
            key: 'apartment',
            active: false,
          },
          {
            label: 'Villa',
            child: [],
            key: 'villa',
            active: false,
          },
          {
            label: 'Farm House',
            child: [],
            key: 'farm-house',
            active: false,
          },
          {
            label: 'Guest House',
            child: [],
            key: 'guest-house',
            active: false,
          },
          {
            label: 'Studio Apartment',
            child: [],
            key: 'studio-apartment',
            active: false,
          },
          {
            label: 'Independent House',
            child: [],
            key: 'independent-house',
            active: false,
          },
        ],
        key: 'residential',
        active: false,
      },
      {
        label: 'Commercial',
        child: [
          {
            label: 'Hospitality',
            child: [
              {
                label: 'Hotel',
                key: 'hotel',
                child: [],
                active: false,
              },
              {
                label: 'Resorts',
                key: 'resorts',
                child: [],
                active: false,
              },
            ],
            key: 'hospitality',
            active: false,
          },
          {
            label: 'Shop_And_Retail',
            child: [
              {
                label: 'Retail',
                key: 'retail',
                child: [],
                active: false,
              },
              {
                label: 'Showroom',
                key: 'showroom',
                child: [],
                active: false,
              },
              {
                label: 'Shopping malls',
                key: 'shopping-malls',
                child: [],
                active: false,
              },
            ],
            key: 'shop-retail',
            active: false,
          },
          {
            label: 'Educational',
            child: [],
            key: 'educational',
            active: false,
          },
          {
            label: 'Office_Space',
            child: [],
            key: 'office-space',
            active: false,
          },
          {
            label: 'Industrial',
            child: [],
            key: 'industrial',
            active: false,
          },
        ],
        key: 'commercial',
        active: false,
      },
      {
        label: 'Land or Plot',
        child: [
          {
            label: 'Residential',
            child: [],
            key: 'residential',
            active: false,
          },
          {
            label: 'Agricultural or farm',
            child: [],
            key: 'agricultural-farm',
            active: false,
          },
          {
            label: 'Industrial',
            child: [],
            key: 'industrial',
            active: false,
          },
          {
            label: 'Institution',
            child: [],
            key: 'institution',
            active: false,
          },
        ],
        key: 'land/plot',
        active: false,
      },
    ],
    key: 'rent',
    active: false,
  },
  // {
  //   label: "Coliving",
  //   child: [
  //     {
  //       label: "Residential",
  //       child: [
  //         {
  //           label: "Flat",
  //           child: [],
  //           key: "flat",
  //           active: false,
  //         },
  //         {
  //           label: "Studio Apartment",
  //           child: [],
  //           key: "studio-apartment",
  //           active: false,
  //         },
  //         {
  //           label: "Villa",
  //           child: [],
  //           key: "villa",
  //           active: false,
  //         },
  //         {
  //           label: "Apartment",
  //           child: [],
  //           key: "apartment",
  //           active: false,
  //         },
  //         {
  //           label: "Independent House",
  //           child: [],
  //           key: "independent-house",
  //           active: false,
  //         },
  //       ],
  //       key: "residential",
  //       active: false,
  //     },
  //     {
  //       label: "Commercial",
  //       child: [
  //         {
  //           label: "PG",
  //           child: [],
  //           key: "pg",
  //           active: false,
  //         },
  //         {
  //           label: "Coliving space",
  //           child: [],
  //           key: "coliving-space",
  //           active: false,
  //         },
  //         {
  //           label: "Hostel",
  //           child: [],
  //           key: "hostel",
  //           active: false,
  //         },
  //       ],
  //       key: "independent-house",
  //       active: false,
  //     },
  //   ],
  //   key: "coliving",
  //   active: false,
  // },

  {
    label: 'Coliving',
    child: [
      {
        label: 'Flat',
        child: [],
        key: 'flat',
        active: false,
      },
      {
        label: 'Studio Apartment',
        child: [],
        key: 'studio-apartment',
        active: false,
      },
      {
        label: 'Villa',
        child: [],
        key: 'villa',
        active: false,
      },
      {
        label: 'Apartment',
        child: [],
        key: 'apartment',
        active: false,
      },
      {
        label: 'Independent House',
        child: [],
        key: 'independent-house',
        active: false,
      },
      {
        label: 'PG',
        child: [],
        key: 'pg',
        active: false,
      },
      {
        label: 'Coliving space',
        child: [],
        key: 'coliving-space',
        active: false,
      },
      {
        label: 'Hostel',
        child: [],
        key: 'hostel',
        active: false,
      },
    ],
    key: 'coliving',
    active: false,
  },
  {
    label: 'Investment Sharing',
    child: [
      {
        label: 'Residential',
        child: [
          {
            label: 'Flat',
            child: [],
            key: 'flat',
            active: false,
          },
          {
            label: 'Apartment',
            child: [],
            key: 'apartment',
            active: false,
          },
          {
            label: 'Villa',
            child: [],
            key: 'villa',
            active: false,
          },
          {
            label: 'Farm House',
            child: [],
            key: 'farm-house',
            active: false,
          },
          {
            label: 'Guest House',
            child: [],
            key: 'guest-house',
            active: false,
          },
          {
            label: 'Studio Apartment',
            child: [],
            key: 'studio-apartment',
            active: false,
          },
          {
            label: 'Independent House',
            child: [],
            key: 'independent-house',
            active: false,
          },
        ],
        key: 'residential',
        active: false,
      },
      {
        label: 'Commercial',
        child: [
          {
            label: 'Hospitality',
            child: [
              {
                label: 'Hotel',
                key: 'hotel',
                child: [],
                active: false,
              },
              {
                label: 'Resorts',
                key: 'resorts',
                child: [],
                active: false,
              },
            ],
            key: 'hospatality',
            active: false,
          },
          {
            label: 'Shop_And_Retail',
            child: [
              {
                label: 'Retail',
                key: 'retail',
                child: [],
                active: false,
              },
              {
                label: 'Showroom',
                key: 'showroom',
                child: [],
                active: false,
              },
              {
                label: 'Shopping malls',
                key: 'shopping-malls',
                child: [],
                active: false,
              },
            ],
            key: 'shops-retail',
            active: false,
          },
          {
            label: 'Educational',
            child: [],
            key: 'educational',
            active: false,
          },
          {
            label: 'Office_Space',
            child: [],
            key: 'office-space',
            active: false,
          },
          {
            label: 'Industrial',
            child: [],
            key: 'industrial',
            active: false,
          },
        ],
        key: 'commercial',
        active: false,
      },
      {
        label: 'Land or Plot',
        child: [
          {
            label: 'Residential',
            child: [],
            key: 'residential',
            active: false,
          },
          {
            label: 'Agricultural or farm',
            child: [],
            key: 'agricultural-farm',
            active: false,
          },
          {
            label: 'Industrial',
            child: [],
            key: 'industrial',
            active: false,
          },
          {
            label: 'Institution',
            child: [],
            key: 'institution',
            active: false,
          },
        ],
        key: 'land_plot',
        active: false,
      },
    ],
    key: 'investment_sharing ',
    active: false,
  },
  {
    label: 'Property Sharing',
    child: [
      {
        label: 'Residential',
        child: [
          {
            label: 'Flat',
            child: [],
            key: 'flat',
            active: false,
          },
          {
            label: 'Apartment',
            child: [],
            key: 'apartment',
            active: false,
          },
          {
            label: 'Villa',
            child: [],
            key: 'villa',
            active: false,
          },
          {
            label: 'Farm House',
            child: [],
            key: 'farm-house',
            active: false,
          },
          {
            label: 'Guest House',
            child: [],
            key: 'guest-house',
            active: false,
          },
          {
            label: 'Studio Apartment',
            child: [],
            key: 'studio-apartment',
            active: false,
          },
          {
            label: 'Independent House',
            child: [],
            key: 'independent-house',
            active: false,
          },
        ],
        key: 'residential',
        active: false,
      },
      {
        label: 'Commercial',
        child: [
          {
            label: 'Hospitality',
            child: [
              {
                label: 'Hotel',
                key: 'hotel',
                child: [],
                active: false,
              },
              {
                label: 'Resorts',
                key: 'resorts',
                child: [],
                active: false,
              },
            ],
            key: 'hospitality',
            active: false,
          },
          {
            label: 'Shop_And_Retail',
            child: [
              {
                label: 'Retail',
                key: 'retail',
                child: [],
                active: false,
              },
              {
                label: 'Showroom',
                key: 'showroom',
                child: [],
                active: false,
              },
              {
                label: 'Shopping malls',
                key: 'shopping-malls',
                child: [],
                active: false,
              },
            ],
            key: 'shop-retail',
            active: false,
          },
          {
            label: 'Educational',
            child: [],
            key: 'educational',
            active: false,
          },
          {
            label: 'Office_Space',
            child: [],
            key: 'office-space',
            active: false,
          },
          {
            label: 'Industrial',
            child: [],
            key: 'industrial',
            active: false,
          },
        ],
        key: 'commercial',
        active: false,
      },
      {
        label: 'Land or Plot',
        child: [
          {
            label: 'Residential',
            child: [],
            key: 'residential',
            active: false,
          },
          {
            label: 'Agricultural or farm',
            child: [],
            key: 'agricultural-farm',
            active: false,
          },
          {
            label: 'Industrial',
            child: [],
            key: 'industrial',
            active: false,
          },
          {
            label: 'Institution',
            child: [],
            key: 'institution',
            active: false,
          },
        ],
        key: 'land/plot',
        active: false,
      },
    ],
    key: 'property_sharing',
    active: false,
  },
];

export const iWant_builder = [
  {
    label: 'Sell',
    child: [
      {
        label: 'Residential',
        child: [
          {
            label: 'Flat',
            child: [],
            key: 'flat',
            active: false,
          },
          {
            label: 'Apartment',
            child: [],
            key: 'apartment',
            active: false,
          },
          {
            label: 'Villa',
            child: [],
            key: 'villa',
            active: false,
          },
          {
            label: 'Farm House',
            child: [],
            key: 'farm-house',
            active: false,
          },
          {
            label: 'Guest House',
            child: [],
            key: 'guest-house',
            active: false,
          },
          {
            label: 'Studio Apartment',
            child: [],
            key: 'studio-apartment',
            active: false,
          },
          {
            label: 'Independent House',
            child: [],
            key: 'independent-house',
            active: false,
          },
        ],
        key: 'residential',
        active: false,
      },
      {
        label: 'Commercial',
        child: [
          {
            label: 'Hospitality',
            child: [
              {
                label: 'Hotel',
                key: 'hotel',
                child: [],
                active: false,
              },
              {
                label: 'Resorts',
                key: 'resorts',
                child: [],
                active: false,
              },
            ],
            key: 'hospatality',
            active: false,
          },
          {
            label: 'Shop_And_Retail',
            child: [
              {
                label: 'Retail',
                key: 'retail',
                child: [],
                active: false,
              },
              {
                label: 'Showroom',
                key: 'showroom',
                child: [],
                active: false,
              },
              {
                label: 'Shopping malls',
                key: 'shopping-malls',
                child: [],
                active: false,
              },
            ],
            key: 'shops-retail',
            active: false,
          },
          {
            label: 'Educational',
            child: [],
            key: 'educational',
            active: false,
          },
          {
            label: 'Office_Space',
            child: [],
            key: 'office-space',
            active: false,
          },
          {
            label: 'Industrial',
            child: [],
            key: 'industrial',
            active: false,
          },
        ],
        key: 'commercial',
        active: false,
      },
      {
        label: 'Land or Plot',
        child: [
          {
            label: 'Residential',
            child: [],
            key: 'residential',
            active: false,
          },
          {
            label: 'Agricultural or farm',
            child: [],
            key: 'agricultural-farm',
            active: false,
          },
          {
            label: 'Industrial',
            child: [],
            key: 'industrial',
            active: false,
          },
          {
            label: 'Institution',
            child: [],
            key: 'institution',
            active: false,
          },
        ],
        key: 'land_plot',
        active: false,
      },
    ],
    key: 'sale',
    active: false,
  },
  {
    label: 'Rent',
    child: [
      {
        label: 'Residential',
        child: [
          {
            label: 'Flat',
            child: [],
            key: 'flat',
            active: false,
          },
          {
            label: 'Apartment',
            child: [],
            key: 'apartment',
            active: false,
          },
          {
            label: 'Villa',
            child: [],
            key: 'villa',
            active: false,
          },
          {
            label: 'Farm House',
            child: [],
            key: 'farm-house',
            active: false,
          },
          {
            label: 'Guest House',
            child: [],
            key: 'guest-house',
            active: false,
          },
          {
            label: 'Studio Apartment',
            child: [],
            key: 'studio-apartment',
            active: false,
          },
          {
            label: 'Independent House',
            child: [],
            key: 'independent-house',
            active: false,
          },
        ],
        key: 'residential',
        active: false,
      },
      {
        label: 'Commercial',
        child: [
          {
            label: 'Hospitality',
            child: [
              {
                label: 'Hotel',
                key: 'hotel',
                child: [],
                active: false,
              },
              {
                label: 'Resorts',
                key: 'resorts',
                child: [],
                active: false,
              },
            ],
            key: 'hospatality',
            active: false,
          },
          {
            label: 'Shop_And_Retail',
            child: [
              {
                label: 'Retail',
                key: 'retail',
                child: [],
                active: false,
              },
              {
                label: 'Showroom',
                key: 'showroom',
                child: [],
                active: false,
              },
              {
                label: 'Shopping malls',
                key: 'shopping-malls',
                child: [],
                active: false,
              },
            ],
            key: 'shops-retail',
            active: false,
          },
          {
            label: 'Educational',
            child: [],
            key: 'educational',
            active: false,
          },
          {
            label: 'Office_Space',
            child: [],
            key: 'office-space',
            active: false,
          },
          {
            label: 'Industrial',
            child: [],
            key: 'industrial',
            active: false,
          },
        ],
        key: 'commercial',
        active: false,
      },
      {
        label: 'Land or Plot',
        child: [
          {
            label: 'Residential',
            child: [],
            key: 'residential',
            active: false,
          },
          {
            label: 'Agricultural or farm',
            child: [],
            key: 'agricultural-farm',
            active: false,
          },
          {
            label: 'Industrial',
            child: [],
            key: 'industrial',
            active: false,
          },
          {
            label: 'Institution',
            child: [],
            key: 'institution',
            active: false,
          },
        ],
        key: 'land_plot',
        active: false,
      },
    ],
    key: 'rent',
    active: false,
  },
];

export const propertyFurninshig = [
  // {
  //   key: "furnished",
  //   label: "Furnished",
  // },
  // {
  //   key: "semifurnished",
  //   label: "Semi-Furnished",
  // },
  // {
  //   key: "unfurnished",
  //   label: "Unfurnished",
  // },

  {
    label: 'Furnished',
    key: 'furnished',
    active: false,
  },
  {
    label: 'Semi_Furnished',
    key: 'semi_frunished',
    active: false,
  },
  {
    label: 'Unfurnished',
    key: 'un_furnished',
    active: false,
  },
];

export const Coliving_occupance = [
  { label: 'Twin sharing', key: 'twin_sharing', active: false },
  { label: 'Triple sharing', key: 'triple_sharing', active: false },
  { label: 'Four sharing', key: 'four_sharing', active: false },
  { label: 'Four+ sharing', key: 'four_pluse_sharing', active: false },
];

export const propertyEminities = [
  { key: 'swimming_pool', label: 'Swimming Pool', active: false },
  { key: 'gym', label: 'Gym', active: false },
  { key: 'spa', label: 'Spa', active: false },
  { key: 'convenience_store', label: 'Convenience Store', active: false },
  { key: 'visitor_parking', label: 'Visitor Parking', active: false },
  { key: 'kids_play_area', label: 'Kids Play Area', active: false },
  { key: 'badminton_court', label: 'Badminton Court', active: false },
  { key: 'walking_track', label: 'Walking Track', active: false },
  { key: 'park', label: 'Park', active: false },
  { key: 'outdoor_play_area', label: 'Outdoor Play Area', active: false },
  { key: 'table_tennis', label: 'Table Tennis', active: false },
  { key: 'indoor_party_hall', label: 'Indoor Party Hall', active: false },
  { key: 'garden_area', label: 'Garden Area', active: false },
  { key: 'solar_fencing', label: 'Solar Fencing', active: false },
  { key: 'cctv', label: 'CCTV', active: false },
];

export const property_active_list = [
  { key: 'all_properties', label: 'All Properties' },
  { key: 'active_properties', label: 'Active Properties' },
  { key: 'hide_properties', label: 'Hide Properites' },
];

export const coworkingAvailability = [
  {
    key: 'available_from',
    label: 'Available From',
  },
];
export const parkingAvailability = [
  {
    key: 'available',
    label: 'Available',
  },

  {
    key: 'notavailable',
    label: 'N/A',
  },
  // {
  //   key: "available_from",
  //   label: "Available From",
  // },
];

export const parkingAvailability1 = [
  {
    key: 'available',
    label: 'Available',
  },

  {
    key: 'notavailable',
    label: 'N/A',
  },
];

export const propertyAvailability = [
  {
    key: 'ready_to_move',
    label: 'Ready to move',
  },
  {
    key: 'underconstruction',
    label: 'Under construction',
  },
  {
    key: 'possesionby',
    label: 'Possesion By',
  },
];

export const eventSpace = [
  { key: 'resorts', label: 'Resorts' },
  { key: 'banquet_hall', label: 'Banquet Hall' },
  { key: 'lawn', label: 'Lawn' },
  { key: 'function_halls', label: 'Function Halls' },
  { key: 'wedding_venue', label: 'Wedding Venue' },
  { key: 'farm_house', label: 'Farm House' },
  { key: 'resort', label: 'Resort' },
  { key: 'mini_hall', label: 'Mini Hall' },
  { key: 'kalyana_mandapam', label: 'Kalyana Mandapam' },
  { key: 'fort_and_palace', label: 'Fort and Palace' },
  { key: 'convention_hall', label: 'Convention Hall' },
  { key: 'pool_side', label: 'Pool Side' },
  { key: 'roof_top', label: 'Roof Top' },
  { key: '3_star_hotel', label: '3 Star Hotel' },
  { key: '5_star_hotel', label: '5 Star Hotel' },
  { key: '7_star_hotel', label: '7 Star Hotel' },
  { key: 'destination_wedding', label: 'Destination Wedding' },
];

export const eventTypes = [
  { key: 'birthday_parties', label: 'Birthday Parties' },
  { key: 'corporate_parties', label: 'Corporate Parties' },
  { key: 'kids_birthday', label: 'Kids Birthday' },
  { key: 'pre_wedding', label: 'Pre Wedding' },
  { key: 'kitty_parties', label: 'Kitty Parties' },
  { key: 'wedding_anniversaries', label: 'Wedding Anniversaries' },
  {
    key: 'farewell_&_retirement_parties',
    label: 'Farewell & Retirement Parties',
  },
  { key: 'festival_parties', label: 'Festival Parties' },
  { key: 'sweet_sixteen_parties', label: 'Sweet Sixteen Parties' },
];

export const propertyOwnership = [
  {
    label: 'Self Owned',
    key: 'self_owned',
    active: false,
  },
  {
    label: 'On Lease',
    key: 'on_lease',
    active: false,
  },
  {
    label: 'POA',
    key: 'poa',
    active: false,
  },
  {
    label: 'Multiple Owners',
    key: 'multiple_owners',
    active: false,
  },
  {
    label: 'Co-operative Society',
    key: 'co-operative_society',
    active: false,
  },
];

export const propertyOwnership_landorplot = [
  {
    label: 'Self Owned',
    key: 'self_owned',
    active: false,
  },
  {
    label: 'Lease',
    key: 'lease',
    active: false,
  },
  {
    label: 'POA',
    key: 'poa',
    active: false,
  },
  {
    label: 'Multiple Owners',
    key: 'multiple_owners',
    active: false,
  },
  {
    label: 'Bank pleadged',
    key: 'bank_pleadged',
    active: false,
  },
];

export const propertyFeatures = [
  {
    label: 'High Ceiling height',
    key: 'high-ceiling-height',
    active: false,
  },
  {
    label: 'Piped gas',
    key: 'piped-gas',
    active: false,
  },
  {
    label: 'Pet friendly',
    key: 'pet-friendly',
    active: false,
  },
  {
    label: 'False Ceiling Lighting',
    key: 'false-ceiling-lighting',
    active: false,
  },
  {
    label: 'Airy Rooms',
    key: 'airy-rooms',
    active: false,
  },
  {
    label: 'Internet/Wi-Fi connectivity',
    key: 'internet/Wi-Fi-connectivity',
    active: false,
  },
  {
    label: 'Recently Renovated',
    key: 'recently-renovated',
    active: false,
  },
  {
    label: 'Spacious Interiors',
    key: 'spacious-interiors',
    active: false,
  },
  {
    label: 'Water Purifier',
    key: 'water-purifier',
    active: false,
  },
  {
    label: 'Private Garden',
    key: 'private-garden',
    active: false,
  },
  {
    label: 'Natural Light',
    key: 'natural-light',
    active: false,
  },
  {
    label: 'Reserved parking',
    key: 'reserved-parking',
    active: false,
  },
  {
    label: 'Power Backup',
    key: 'power-backup',
    active: false,
  },
  {
    label: 'Visitor Parking',
    key: 'visitor-parking',
    active: false,
  },
  {
    label: 'Lifts',
    key: 'lifts',
    active: false,
  },
  {
    label: 'Rain Water Harvesting',
    key: 'rain-water-harvesting',
    active: false,
  },
  {
    label: 'Wheelchair Accessibility',
    key: 'wheelchair-accessibility',
    active: false,
  },
];

export const propertyFeatures_hospitality = [
  {
    label: 'High Ceiling height',
    key: 'High Ceiling height',
    active: false,
  },
  {
    label: 'Piped gas',
    key: 'piped-gas',
    active: false,
  },
  {
    label: 'Pet friendly',
    key: 'pet-friendly',
    active: false,
  },
  {
    label: 'False Ceiling Lighting',
    key: 'false-ceiling-lighting',
    active: false,
  },
  {
    label: 'Airy Rooms',
    key: 'airy-rooms',
    active: false,
  },
  {
    label: 'Internet/Wi-Fi connectivity',
    key: 'internet/wi-fi-connectivity',
    active: false,
  },
  {
    label: 'Recently Renovated',
    key: 'recently-renovated',
    active: false,
  },
  {
    label: 'Reserved parking',
    key: 'reserved-parking',
    active: false,
  },
  {
    label: 'Power Backup',
    key: 'power-backup',
    active: false,
  },
  {
    label: 'Lifts',
    key: 'lifts',
    active: false,
  },
  {
    label: 'Racks',
    key: 'racks',
    active: false,
  },
  {
    label: 'Storage area',
    key: 'storage-area',
    active: false,
  },
  {
    label: 'Wheelchair Accessibility',
    key: 'wheelchair-accessibility',
    active: false,
  },
  {
    label: 'Centrally Air Conditioned',
    key: 'centrally-air-conditioned',
    active: false,
  },
  {
    label: 'Fire extinguisher',
    key: 'fire-extinguisher',
    active: false,
  },
  {
    label: 'Fire sensors',
    key: 'fire-sensors',
    active: false,
  },
  {
    label: 'Sprinklers',
    key: 'sprinklers',
    active: false,
  },
  {
    label: 'Fire house',
    key: 'fire-house',
    active: false,
  },
  {
    label: 'Emergency exits',
    key: 'emergency-exits',
    active: false,
  },
];

export const propertyFeatures_shopesandretail = [
  {
    label: 'High Ceiling height',
    key: 'high-ceiling-height',
    active: false,
  },
  {
    label: 'Piped gas',
    key: 'piped-gas',
    active: false,
  },
  {
    label: 'Pet friendly',
    key: 'pet-friendly',
    active: false,
  },
  {
    label: 'False Ceiling Lighting',
    key: 'false-ceiling-lighting',
    active: false,
  },
  {
    label: 'Airy Rooms',
    key: 'airy-rooms',
    active: false,
  },
  {
    label: 'Internet/Wi-Fi connectivity',
    key: 'internet/Wi-Fi-connectivity',
    active: false,
  },
  {
    label: 'Recently Renovated',
    key: 'recently-renovated',
    active: false,
  },
  {
    label: 'Reserved parking',
    key: 'reserved-parking',
    active: false,
  },

  {
    label: 'Power Backup',
    key: 'power-backup',
    active: false,
  },

  {
    label: 'Lifts',
    key: 'lifts',
    active: false,
  },

  {
    label: 'Racks',
    key: 'racks',
    active: false,
  },

  {
    label: 'Storage area',
    key: 'storage-area',
    active: false,
  },

  {
    label: 'Wheelchair Accessibility',
    key: 'wheelchair-accessibility',
    active: false,
  },
  {
    label: 'Centrally Air Conditioned',
    key: 'centrally-air-conditioned',
    active: false,
  },
  {
    label: 'Fire extinguisher',
    key: 'fire-extinguisher',
    active: false,
  },
  {
    label: 'Fire sensors',
    key: 'fire-sensors',
    active: false,
  },
  {
    label: 'Sprinklers',
    key: 'sprinklers',
    active: false,
  },
  {
    label: 'Fire house',
    key: 'fire-house',
    active: false,
  },
  {
    label: 'Emergency exits',
    key: 'emergency-exits',
    active: false,
  },
];

export const propertyFeatures_educational = [
  {
    label: 'High Ceiling height',
    key: 'high-ceiling-height',
    active: false,
  },
  {
    label: 'Cricket Playground',
    key: 'cricket-Playground',
    active: false,
  },
  {
    label: 'Indoor games playground',
    key: 'indoor-games-playground',
    active: false,
  },
  {
    label: 'Basketball playground',
    key: 'basketball-playground',
    active: false,
  },
  {
    label: 'Multi purpose playground',
    key: 'multi-purpose-playground',
    active: false,
  },
  {
    label: 'False Ceiling Lighting',
    key: 'false-ceiling-lighting',
    active: false,
  },
  {
    label: 'Airy Rooms',
    key: 'airy-rooms',
    active: false,
  },
  {
    label: 'Internet/Wi-Fi connectivity',
    key: 'internet/Wi-Fi-connectivity',
    active: false,
  },
  {
    label: 'Play area',
    key: 'play-area',
    active: false,
  },
  {
    label: 'Lab rooms',
    key: 'Lab rooms',
    active: false,
  },
  {
    label: 'Waiting area',
    key: 'waiting-area',
    active: false,
  },
  {
    label: 'Power Backup',
    key: 'power-backup',
    active: false,
  },
  {
    label: 'Lifts',
    key: 'Lifts',
    active: false,
  },
  {
    label: 'Racks',
    key: 'Racks',
    active: false,
  },
  {
    label: 'Storage area',
    key: 'storage-area',
    active: false,
  },
  {
    label: 'Wheelchair Accessibility',
    key: 'wheelchair-accessibility',
    active: false,
  },
  {
    label: 'Centrally Air Conditioned',
    key: 'centrally-air-conditioned',
    active: false,
  },
  {
    label: 'Fire extinguisher',
    key: 'fire-extinguisher',
    active: false,
  },
  {
    label: 'Fire sensors',
    key: 'fire-sensors',
    active: false,
  },
  {
    label: 'Sprinklers',
    key: 'sprinklers',
    active: false,
  },
  {
    label: 'Fire house',
    key: 'fire-house',
    active: false,
  },
  {
    label: 'Emergency exits',
    key: 'emergency-exits',
    active: false,
  },
];

export const propertyFeatures_industrial = [
  {
    label: 'High Ceiling height',
    key: 'high-ceiling-height',
    active: false,
  },
  {
    label: 'Indoor games play area',
    key: 'indoor-games-play-area',
    active: false,
  },
  {
    label: 'False Ceiling Lighting',
    key: 'false-ceiling-lighting',
    active: false,
  },
  {
    label: 'Airy Rooms',
    key: 'airy-rooms',
    active: false,
  },
  {
    label: 'Internet/Wi-Fi connectivity',
    key: 'internet-wi-fi-connectivity',
    active: false,
  },
  {
    label: 'Day Care',
    key: 'day-care',
    active: false,
  },
  {
    label: 'Waiting area',
    key: 'waiting-area',
    active: false,
  },
  {
    label: 'Power Backup',
    key: 'power-backup',
    active: false,
  },
  {
    label: 'Lifts',
    key: 'lifts',
    active: false,
  },
  {
    label: 'Locker rooms',
    key: 'locker-rooms',
    active: false,
  },
  {
    label: 'Wheelchair Accessibility',
    key: 'wheelchair-accessibility',
    active: false,
  },
  {
    label: 'Centrally Air Conditioned',
    key: 'centrally-air-conditioned',
    active: false,
  },
  {
    label: 'Fire extinguisher',
    key: 'fire-extinguisher',
    active: false,
  },
  {
    label: 'Fire sensors',
    key: 'fire-sensors',
    active: false,
  },
  {
    label: 'Sprinklers',
    key: 'sprinklers',
    active: false,
  },
  {
    label: 'Fire house',
    key: 'fire-house',
    active: false,
  },
  {
    label: 'Emergency exits',
    key: 'emergency-exits',
    active: false,
  },
];

export const propertyFeatures_sell_officespace = [
  {
    label: 'High Ceiling height',
    key: 'high-ceiling-height',
    active: false,
  },

  {
    label: 'False Ceiling Lighting',
    key: 'false-ceiling-lighting',
    active: false,
  },
  {
    label: 'Airy Rooms',
    key: 'airy-rooms',
    active: false,
  },
  {
    label: 'Internet/Wi-Fi connectivity',
    key: 'internet-wi-fi-connectivity',
    active: false,
  },
  {
    label: 'Waiting area',
    key: 'waiting_area',
    active: false,
  },
  {
    label: 'Power Backup',
    key: 'power-backup',
    active: false,
  },
  {
    label: 'Lifts',
    key: 'lifts',
    active: false,
  },
  {
    label: 'Locker rooms',
    key: 'locker-rooms',
    active: false,
  },
  {
    label: 'Wheelchair Accessibility',
    key: 'wheelchair-accessibility',
    active: false,
  },
  {
    label: 'Centrally Air Conditioned',
    key: 'centrally-air-conditioned',
    active: false,
  },

  {
    label: 'Fire extinguisher',
    key: 'fire-extinguisher',
    active: false,
  },
  {
    label: 'Fire sensors',
    key: 'fire-sensors',
    active: false,
  },
  {
    label: 'Sprinklers',
    key: 'sprinklers',
    active: false,
  },
  {
    label: 'Fire house',
    key: 'fire-house',
    active: false,
  },
  {
    label: 'Emergency exits',
    key: 'emergency-exits',
    active: false,
  },
];

export const propertyFeatures_rent_officespace = [
  {
    label: 'High Ceiling height',
    key: 'high-ceiling-height',
    active: false,
  },

  {
    label: 'Indoor games play area',
    key: 'indoor-games-play-area',
    active: false,
  },

  {
    label: 'False Ceiling Lighting',
    key: 'false-ceiling-lighting',
    active: false,
  },
  {
    label: 'Airy Rooms',
    key: 'airy-rooms',
    active: false,
  },
  {
    label: 'Internet/Wi-Fi connectivity',
    key: 'internet-wi-fi-connectivity',
    active: false,
  },
  {
    label: 'Day Care',
    key: 'day-care',
    active: false,
  },

  {
    label: 'Waiting area',
    key: 'waiting_area',
    active: false,
  },
  {
    label: 'Power Backup',
    key: 'power-backup',
    active: false,
  },
  {
    label: 'Lifts',
    key: 'lifts',
    active: false,
  },
  {
    label: 'Locker rooms',
    key: 'locker-rooms',
    active: false,
  },
  {
    label: 'Wheelchair Accessibility',
    key: 'wheelchair-accessibility',
    active: false,
  },
  {
    label: 'Centrally Air Conditioned',
    key: 'centrally-air-conditioned',
    active: false,
  },

  {
    label: 'Fire extinguisher',
    key: 'fire-extinguisher',
    active: false,
  },
  {
    label: 'Fire sensors',
    key: 'fire-sensors',
    active: false,
  },
  {
    label: 'Sprinklers',
    key: 'sprinklers',
    active: false,
  },
  {
    label: 'Fire house',
    key: 'fire-house',
    active: false,
  },
  {
    label: 'Emergency exits',
    key: 'emergency-exits',
    active: false,
  },
];

export const price_additional_details = [
  { label: 'Price Negotiable', key: 'price_negotiable', active: false },
  { label: 'Currently under Loan', key: 'currently_under_load', active: false },
  { label: 'All inclusive price', key: 'all_inclusinve_price', active: false },
  { label: 'Annual Dues Paid', key: 'annual_dues_paid', active: false },
  { label: 'Tax Excluded', key: 'tax_excluded', active: false },
];

export const societyFeatures = [
  {
    label: 'Maintenance Staff',
    key: 'maintenance-staff',
    active: false,
  },
  {
    label: 'Swimming Pool',
    key: 'swimming-pool',
    active: false,
  },
  {
    label: 'CCTV Surveillance',
    key: 'cctv-surveillance',
    active: false,
  },
  {
    label: 'Children play area',
    key: 'children-play-area',
    active: false,
  },
  {
    label: 'Creche DayCare',
    key: 'creche/day-care',
    active: false,
  },
  {
    label: 'Reading Lounge',
    key: 'reading-lounge',
    active: false,
  },
  {
    label: 'Waiting area',
    key: 'waiting-area',
    active: false,
  },
  {
    label: 'Park/Garden',
    key: 'Park_garden',
    active: false,
  },
  {
    label: 'Jogging Track',
    key: 'Jogging Track',
    active: false,
  },
  {
    label: 'Grocery and general store',
    key: 'grocery-and-general-store',
    active: false,
  },
  {
    label: 'Clubhouse/banquet hall',
    key: 'clubhouse/banquet-hall',
    active: false,
  },
];

export const propertyFoodType = [
  { key: 'vegetarian', label: 'Vegetarian' },
  { key: 'non_vegetarian', label: 'Non Vegetarian' },
  { key: 'outside_food_allowed', label: 'Outside Food Allowed' },
  {
    key: 'food_preparation_facility',
    label: 'Food preparation facility',
  },
  { key: 'food_available_on_order', label: 'Food available on order' },
];

export const token_duration_months = [
  { key: '1', label: '1', value: '1', active: false },
  { key: '2', label: '2', value: '2', active: false },
  { key: '3', label: '3', value: '3', active: false },
  { key: '4', label: '4', value: '4', active: false },
  { key: '5', label: '5', value: '5', active: false },
  { key: '6', label: '6', value: '6', active: false },
  { key: '7', label: '7', value: '7', active: false },
  { key: '8', label: '8', value: '8', active: false },
  { key: '9', label: '9', value: '9', active: false },
  { key: '10', label: '10', value: '10', active: false },
  { key: '11', label: '11', value: '11', active: false },
  { key: '12', label: '12', value: '12', active: false },
];

export const propertyNoiseLevel = [
  { key: 'low', label: 'Low' },
  { key: 'medium', label: 'Medium' },
  { key: 'high', label: 'High' },
];
export const propertyGenderType = [
  { key: 'male', label: 'Male', active: false },
  { key: 'female', label: 'Female', active: false },
  { key: 'other', label: 'Other', active: false },
];
export const propertyFoodPreference = [
  { key: 'veg', label: 'Vegetarian' },
  { key: 'nonveg', label: 'Non-Vegetarian' },
  { key: 'vegan', label: 'Vegan' },
  { key: 'smoking', label: 'Smoking' },
  { key: 'drinking', label: 'Drinking' },
];
export const CoWorkFLexi = [
  { key: 'flexi_desk', label: 'Flexi Desk' },
  { key: 'guranteed_desk', label: 'Gauranteed' },
  { key: 'byod', label: 'Bring Your Own Device' },
];

export const propertyProfessionalDetails = [
  { key: 'it-software', label: 'IT-Software' },
  { key: 'non-it', label: 'Non-IT' },
  { key: 'business', label: 'Business' },
  { key: 'student', label: 'Student' },
  { key: 'other', label: 'Other' },
];

export const propertyBuildingFeatures = [
  { key: 'fitness_centre', label: 'Fitness Centre' },
  { key: 'swimming_pool', label: 'Swimming Pool' },
  { key: 'club_house', label: 'Club House' },
  { key: 'security_personnel', label: 'Security Personnel' },
  { key: 'gated_society', label: 'Gated Society' },
  { key: 'corner_property', label: 'Corner Property' },
  { key: 'pet_friendly', label: 'Pet Friendly' },
  { key: 'park_garden', label: 'Park/Garden' },
  { key: 'pool', label: 'Pool' },
  { key: 'main_road', label: 'Main Road' },
];

export const propertyWaterSources = [
  {
    label: '24/7 Water Supply',
    key: '24/7_water_supply',
    active: false,
  },
  {
    label: 'Tank/Borewell',
    key: 'tank/borewell',
    active: false,
  },
  {
    label: 'Municipal Corporation',
    key: 'municipal_corporation',
    active: false,
  },
];

// Property details for selling commertial showrooms,gym, shoppingmall, shops, workshops, hotel,resturants, commercial land ,industries

export const propertyShowroomDetail = [
  { key: 'pantry_kitchen', label: 'Pantry/Kitchen' },
  { key: 'bare_shell', label: 'Bare Shell' },
  { key: 'servant_room', label: 'Servant Room' },
];

// Property details for selling commertial coldstorage and warehouse
export const propertyadditinalDetails = [
  { label: 'Vapor barriers', key: 'vappor_barriers' },
  { label: 'Refrigeration Systems', key: 'refrigeration_systems' },
  { label: 'Temperature sensors', key: 'temporature_sensors' },
  { label: 'Monitoring devices', key: 'monitoring_devices' },
  {
    label: 'Controlled atmosphere(CA) storage',
    key: 'controlled_atmosphere_ca_storage',
  },
  {
    label: 'Modified atmosphere(MA) storage',
    key: 'modified_atmosphere_ma_storage',
  },
  {
    label: 'Perishable Food Storage',
    key: 'perishable_food_storage',
  },
  {
    label: 'Cold Chain Logistics',
    key: 'cold_chain_logistics',
  },
];

export const rent_duration = [
  { key: 'monthly', label: 'Monthly', value: 'Monthly', active: false },
  { key: 'yearly', label: 'Yearly', value: 'Yearly', active: false },
  { key: 'quaterly', label: 'Quaterly', value: 'Quaterly', active: false },
];

export const propertyColdstorageAdditional = [
  { label: 'Store Room', key: 'store_room' },
  { label: 'Multi cuisine', key: 'multi_cusine' },
  {
    label: 'Food Availability',
    key: 'food_availability',
  },
  {
    label: 'Security Personal',
    key: 'security_personal',
  },
  { label: 'Smoke zone available', key: 'smoke_zone_available' },
  { label: 'Kitchen', key: 'kitchen' },
  {
    label: 'Private dining area',
    key: 'private_dining_area',
  },

  {
    label: 'Valet Parking',
    key: 'valet_parking',
  },
  {
    label: 'Outdoor Project/Screens',
    key: 'outdoor_project_screens',
  },
  {
    label: 'Preservation of Flowers and Plants',
    key: 'preservation_of_flowers_and_plants',
  },
  {
    label: 'Prolonging Shelf Life and Maintaining Freshness',
    key: 'prolonging_shelf_life_and_maintaining_freshness',
  },
  {
    label: 'Inventory Managment and Tracking Systems',
    key: 'invetory_managment_and_tracking_systmes',
  },
  {
    label: 'Automation and Robotics',
    key: 'automation_and_robotics',
  },
  {
    label: 'Fork Lift',
    key: 'fork_lift',
  },
];

export function generateArrayWithStrings(n: any) {
  if (isNaN(n) || n < 1) {
    return [];
  }

  const resultArray = [];

  for (let i = 1; i <= n; i++) {
    resultArray.push(i.toString());
  }
  resultArray.push('Rooftop/Penthouse');
  resultArray.push('Ground');
  return resultArray;
}

export function generateArraywithstrings_number(n: number) {
  if (isNaN(n) || n < 1) {
    return [];
  }

  const result = [];
  for (let i = 1; i <= n; i++) {
    result.push({
      label: `${i}`,
      value: `${i}`,
      key: `${i}`,
    });
  }

  result.push({
    label: 'Rooftop/Penthouse',
    value: 'Rooftop/Penthouse',
    key: 'Rooftop/Penthouse',
  });

  result.push({
    label: 'Ground',
    value: 'Ground',
    key: 'Ground',
  });

  // console.log(result);
  return result;
}

// Example usage:

export const propertBhk = [
  {
    label: '1BHK',
    key: '1bhk',
    active: false,
  },
  {
    label: '2BHK',
    key: '2bhk',
    active: false,
  },
  {
    label: '3BHK',
    key: '3bhk',
    active: false,
  },
  {
    label: '4BHK',
    key: '4bhk',
    active: false,
  },
  {
    label: '4BHK+',
    key: '4bhk+',
    active: false,
  },
];

export const propertBhk_Coliving = [
  {
    label: '1 BHK',
    key: '1 BHK',
  },
  { label: '2 BHK', key: '2 BHK' },
  { label: '3 BHK', key: '3 BHK' },
  { label: '4 BHK', key: '4 BHK' },
  { label: '5 BHK', key: '5 BHK' },
  { label: '5 BHK +', key: '5 BHK +' },
];

export const coliving_types = [
  {
    label: 'Private_room',
    key: 'private_room',
    active: false,
  },
  { label: 'Shared_room', key: 'shared_room', active: false },
];

export const propertBalcony = [
  {
    label: '1',
    key: '1',
    active: false,
  },
  {
    label: '2',
    key: '2',
    active: false,
  },
  {
    label: '3',
    key: '3',
    active: false,
  },
  {
    label: '4',
    key: '4',
    active: false,
  },
  {
    label: '4+',
    key: '4+',
    active: false,
  },
];

export const propertBathroom = [
  {
    label: '1',
    key: '1',
    active: false,
  },
  {
    label: '2',
    key: '2',
    active: false,
  },
  {
    label: '3',
    key: '3',
    active: false,
  },
  {
    label: '4',
    key: '4',
    active: false,
  },
  {
    label: '4+',
    key: '4+',
    active: false,
  },
];

export const lease_months = [
  { label: 'January', key: 'january' },
  { label: 'February', key: 'february' },
  { label: 'March', key: 'march' },
  { label: 'April', key: 'april' },
  { label: 'May', key: 'may' },
  { label: 'June', key: 'june' },
  { label: 'July', key: 'july' },
  { label: 'Augest', key: 'augest' },
  { label: 'September', key: 'September' },
  { label: 'October', key: 'october' },
  { label: 'November', key: 'november' },
  { label: 'December', key: 'december' },
];

export const propertyBeds = ['1 bed', '2 bed', '3 bed', '3 bed'];
export const propertyFloor = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
export const propertyTotalFloor = [1, 2, 3, 4, 5, 6, 7, 8, 9];
export const propertyFurnishedStatus = [
  { label: 'Furnished', key: 'furnished' },
  { label: 'Unfurnished', key: 'unfurnished' },
];
export const propertyFacing = [
  {
    label: 'East',
    value: 'East',
    key: 'east',
    active: false,
  },
  {
    label: 'West',
    value: 'West',
    key: 'west',
    active: false,
  },
  {
    label: 'South',
    value: 'South',
    key: 'south',
    active: false,
  },
  {
    label: 'North',
    value: 'North',
    key: 'north',
    active: false,
  },
  {
    label: 'North-East',
    value: 'North-East',
    key: 'north-east',
    active: false,
  },
  {
    label: 'South-East',
    value: 'South-East',
    key: 'south-east',
    active: false,
  },
  {
    label: 'South-West',
    value: 'South-West',
    key: 'south-west',
    active: false,
  },
  {
    label: 'West-North',
    value: 'West-North',
    key: 'west-north',
    active: false,
  },
];

export const propertyBathroom = [1, 2, 3, 4, 5, 6, 7];

export const propertyAge = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, '10+'];

export const propertyAges = [
  { label: 'Less than a year', key: 'less_than_year' },
  { label: '1', key: '1_year' },
  { label: '2', key: '2' },
  { label: '3', key: '3' },
  { label: '4', key: '4' },
  { label: '5', key: '5' },
  { label: '6', key: '6' },
  { label: '7', key: '7' },
  { label: '8', key: '8' },
  { label: '9', key: '9' },
  { label: '10', key: '10' },
  { label: '10+', key: '10+' },
];

export const propertyBuiltUpArea = ['SQYD', 'SQMTRS', 'SQFT'];
export const propertyRoomArea = [
  { label: 'SQYD', key: 'SQYD' },
  { label: 'SQMTRS', key: 'SQMTRS' },
  { label: 'SQFT', key: 'SQFT' },
];
export const propertyCarpetArea = {
  Sq_ft: 1,
  Sq_yards: 9,
  Acres: 43560,
  Marla: 272.25,
  Cents: 435.6,
  Bigha: 14400,
  Kottah: 720,
  Kanal: 5445,
  Grounds: 2400,
  Ares: 1076.39,
  Biswa: 1440,
  Guntha: 1089,
  Aankadam: 43560,
  Hectares: 107639.1,
  Rood: 10890,
  Chataks: 87120,
  Perch: 272.25,
};

export const propertyAreaUnits = [
  {
    label: 'Sq_ft',
    value: 'Sq_ft',
    key: 'Sq ft',
  },
  {
    label: 'Sq_yards',
    value: 'Sq_yards',
    key: 'Sq yards',
  },
  {
    label: 'Acres',
    value: 'Acres',
    key: 'acres',
  },
  {
    label: 'Marla',
    value: 'Marla',
    key: 'marla',
  },
  {
    label: 'Cents',
    value: 'Cents',
    key: 'cents',
  },
  {
    label: 'Bigha',
    value: 'Bigha',
    key: 'bigha',
  },
  {
    label: 'Kottah',
    value: 'Kottah',
    key: 'kottah',
  },
  {
    label: 'Kanal',
    value: 'Kanal',
    key: 'kanal',
  },
  {
    label: 'Grounds',
    value: 'Grounds',
    key: 'grounds',
  },
  {
    label: 'Ares',
    value: 'Ares',
    key: 'ares',
  },
  {
    label: 'Biswa',
    value: 'Biswa',
    key: 'biswa',
  },
  {
    label: 'Guntha',
    value: 'Guntha',
    key: 'guntha',
  },
  {
    label: 'Aankadam',
    value: 'Aankadam',
    key: 'aankadam',
  },
  {
    label: 'Hectares',
    value: 'Hectares',
    key: 'Hectares',
  },
  {
    label: 'Rood',
    value: 'Rood',
    key: 'rood',
  },
  {
    label: 'Chataks',
    value: 'Chataks',
    key: 'chataks',
  },
  {
    label: 'Perch',
    value: 'Perch',
    key: 'perch',
  },
];

export const propertyReadUnits = {
  ft: 2,
  Sq_ft: 1,
  Sq_yards: 9,
  Acres: 43560,
  Marla: 272.25,
  Cents: 435.6,
  Bigha: 14400,
  Kottah: 720,
  Kanal: 5445,
  Grounds: 2400,
  Ares: 1076.39,
  Biswa: 1440,
  Guntha: 1089,
  Aankadam: 43560,
  Hectares: 107639.1,
  Rood: 10890,
  Chataks: 87120,
  Perch: 272.25,
};

export const propertyFurnishishing = [
  'Sofa',
  'Table',
  'Lamp',
  'Coffee Table',
  'Book Shelf',
  'Bed',
  'Night Stand with lamp',
  'Dressing Table',
  'Desk',
  'Dining Table',
  'Dining Chairs',
  'Bath-Tub',
  'Waste Bucket',
  'Utensils',
  'Dishes',
  'Glassware',
  '',
];

export const furnishingItems = [
  { key: 'lights', label: 'Lights', count: 0 },
  { key: 'fans', label: 'Fans', count: 0 },
  { key: 'air_conditioner', label: 'Air Conditioner', count: 0 },
  { key: 'tv', label: 'TV', count: 0 },
  { key: 'beds', label: 'Beds', count: 0 },
  { key: 'wardrobe', label: 'Wardrobe', count: 0 },
  { key: 'geyser', label: 'Geyser', count: 0 },
  { key: 'modular_kitchen', label: 'Modular Kitchen', count: 0 },
  { key: 'dining_table', label: 'Dining Table', count: 0 },
  { key: 'stove', label: 'Stove', count: 0 },
  { key: 'fridge', label: 'Fridge', count: 0 },
  { key: 'water_purifier', label: 'Water Purifier', count: 0 },
  { key: 'sofa', label: 'Sofa', count: 0 },
  { key: 'washing_machine', label: 'Washing Machine', count: 0 },
  { key: 'microwave', label: 'Microwave', count: 0 },
  { key: 'chimney', label: 'Chimney', count: 0 },
  { key: 'exhaust_fan', label: 'Exhaust Fan', count: 0 },
  { key: 'curtains', label: 'Curtains', count: 0 },
  { key: 'mattress', label: 'Mattress', count: 0 },
  { key: 'fall_ceiling', label: 'Fall Ceiling', count: 0 },
];

export const beveragesDetails = [
  { label: 'Beverage available on order', key: 'beverage_available_on_order' },
  { label: 'OutSide Beverage Allowed', key: 'outside_beverage_allowed' },
  { label: 'Smoking Allowed', key: 'smoking_allowed' },
];

export const propertyDecoration = [
  { label: 'In House decoration', key: 'in_house_decoration' },
  { label: 'Out side decoration Allowed', key: 'out_side_decoration_allowed' },
];

export const propertyDJ = [
  { label: 'In House DJ', key: 'in_house_dJ' },
  { label: 'Outside DJ Allowed', key: 'outside_dj_allowed' },
];
export const propertyPhotoshoot = [
  { label: 'In house Photoshoot', key: 'in_house_photoshoot' },
  { label: 'Outside Photoshoot Allowed', key: 'outside_photoshoot_allowed' },
];

export const propertyExtras = [
  { label: 'Pooja Room', key: 'pooja_room', active: false },
  { label: 'Servant Room', key: 'servant_room', active: false },
  { label: 'Study Room', key: 'study_room', active: false },
  { label: 'Store Room', key: 'store_room', active: false },
  // { label: "Locker Room", key: "locker_room" },
];

export const propertyRequestCallback = [
  { label: 'Immediate Purchase', key: 'immediate_purchase', active: false },
  { label: 'Investment', key: 'investment', active: false },
  { label: 'Site Visit', key: 'site_visit', active: false },
];

export const transaction_type = [
  {
    label: 'New',
    key: 'new',
    child: [
      {
        label: 'Ready_to_occupy',
        key: 'ready_to_occupy',
        child: [],
        active: false,
      },
      {
        label: 'Under_construction',
        key: 'under_construction',
        child: [
          {
            label: 'Ready for posession by',
            key: 'ready_for_posession_by',
            child: [],
            active: false,
          },
        ],
        active: false,
      },
      {
        label: 'Bareshell',
        key: 'bareshell',
        child: [],
        active: false,
      },
    ],
    active: false,
  },
  { label: 'Pre_owned', key: 'preowned', child: [], active: false },
];

export const retails_details = [
  { label: 'Department stores', key: 'department_stores', active: false },
  {
    label: 'Grocery & Supermarkets',
    key: 'grocery_and_supermarket',
    active: false,
  },
  {
    label: 'Boutiques/clothing stores',
    key: 'botiques_clothing_stores',
    active: false,
  },
  { label: 'Shoe store', key: 'shoe_stores', active: false },
  { label: 'Accessory stores', key: 'accessory_stores', active: false },
  { label: 'Homeware', key: 'home_ware', active: false },
  { label: 'Bookstore', key: 'Bookstore', active: false },
  { label: 'Cosmetic', key: 'cosmetic', active: false },
  { label: 'Electronics', key: 'electronics', active: false },
];

export const industrial_details = [
  {
    label: 'Vehicle manufacturing',
    key: 'vehicle-manufacturing',
    active: false,
  },
  {
    label: 'Textile manufacturing',
    key: 'textile-manufacturing',
    active: false,
  },
  {
    label: 'Electronics manufacturing',
    key: 'electronics-manufacturing',
    active: false,
  },
  {
    label: 'Warehousing',
    key: 'warehousing',
    active: false,
  },
  {
    label: 'Distribution centers',
    key: 'distribution-centers',
    active: false,
  },
  {
    label: 'Logistics center',
    key: 'logistics-center',
    active: false,
  },
  {
    label: 'Research & Development',
    key: 'Research & Development',
    active: false,
  },
  {
    label: 'Power generation',
    key: 'power-generation',
    active: false,
  },
  {
    label: 'Oil & Gas',
    key: 'oil&gas',
    active: false,
  },
  {
    label: 'Food & beverages',
    key: 'food&beverages',
    active: false,
  },
  {
    label: 'Cosmetic',
    key: 'cosmetic',
    active: false,
  },
  {
    label: 'Furniture manufacturing',
    key: 'furniture-manufacturing',
    active: false,
  },
  {
    label: 'Tiles manufacturing',
    key: 'tiles-manufacturing',
    active: false,
  },
  {
    label: 'Other Enter value',
    key: 'other-enter-value',
    active: false,
  },
];

export const showroom_details = [
  { label: 'Vehicle showroom', key: 'vehicle_showroom', active: false },
  { label: 'Furniture showroom', key: 'furniture_showroom', active: false },
  {
    label: 'Kitchen & bath ware showroom',
    key: 'kitchen_and_bath_ware_showroom',
    active: false,
  },
  {
    label: 'Electronics and Appliance Showrooms',
    key: 'electronics_and_appliance_showrooms',
    active: false,
  },
  { label: 'Homedecor showroom', key: 'home_decor_showroom', active: false },
  { label: 'Jewelry showroom', key: 'jewelry_showroom', active: false },
  { label: 'Art Galeries', key: 'art_galeries', active: false },
];

export const transaction_typeForParking = [
  { label: 'Book Days ', key: 'book days' },
  { label: 'Book Hourly', key: 'book_hourly' },
  { label: 'Book Monthly', key: 'book_monthly' },
];

// export const property_vehicle_parking = [
//   { label: "Open Parking ", key: "open_parking" },
//   { label: "CLosed Parking", key: "closed_parking" },
// ];

export const types_of_parking = [
  { label: 'Open Parking ', key: 'open_parking' },
  { label: 'CLosed Parking', key: 'closed_parking' },
];
export const types_of_parking_property = [
  { label: 'Car Parking', key: 'car_parking' },
  { label: 'Visitor Parking', key: 'visitor_parking' },
];

export const decisioncheck_yesno = [
  { label: 'Yes', key: 'yes' },
  { label: 'No', key: 'no' },
];

export const types_of_washroom = [
  { label: 'Yes', key: 'yes', active: false },
  { label: 'No', key: 'no', active: false },
  { label: 'Shared Washrooms', key: 'shared', active: false },
];

export const types_of_washroom_coliving = [
  { label: 'Attached', key: 'attached', active: false },
  { label: 'Sharing', key: 'sharing', active: false },
];

export const playground_booking_type = [
  { label: 'Per Hour ', key: 'per_hr' },
  { label: 'Per Day', key: 'per_day' },
  { label: 'Per Month', key: 'per_month' },
  { label: 'Monthly Coaching', key: 'monthly_coaching' },
];

export const propertyFloorTypes = [
  {
    label: 'Marble',
    value: 'Marble',
    key: 'marble',
  },
  {
    label: 'Concrete',
    value: 'Concrete',
    key: 'concrete',
  },
  {
    label: 'Granite',
    value: 'Granite',
    key: 'granite',
  },
  {
    label: 'Ceramic',
    value: 'Ceramic',
    key: 'ceramic',
  },
  {
    label: 'Vinyl',
    value: 'Vinyl',
    key: 'vinyl',
  },
  {
    label: 'Wood',
    value: 'Wood',
    key: 'wood',
  },
  {
    label: 'Vitrified',
    value: 'Vitrified',
    key: 'vitrified',
  },
  {
    label: 'Spartex',
    value: 'Spartex',
    key: 'spartex',
  },
  {
    label: 'IPS Finish',
    value: 'IPS Finish',
    key: 'ips_finish',
  },
  {
    label: 'Other',
    value: 'Other',
    key: 'other',
  },
];
export const proximityFeatures = [
  { key: 'close_to_school', label: 'Close to School', active: false },
  { key: 'close_to_hospital', label: 'Close to Hospital', active: false },
  {
    key: 'close_to_metro_station',
    label: 'Close to Metro Station',
    active: false,
  },
  { key: 'close_to_airport', label: 'Close to Airport', active: false },
  { key: 'close_to_school', label: 'Close to School', active: false },
  { key: 'close_to_mall', label: 'Close to Mall', active: false },
  { key: 'close_to_it_offices', label: 'Close to IT offices', active: false },
  { key: 'close_to_highway', label: 'Close to Highway', active: false },
];

export const highlightsDatas = [
  {
    key: 'metro_stations',
    label: 'Metro Stations',
    active: false,
    // img: require('../../../assets/images/property/metro.png'),
  },

  {
    key: 'bus_stations',
    label: 'Bus stations',
    active: false,
    // img: require('../../../assets/images/property/bus.png'),
  },
  {
    key: 'train_station',
    label: 'train_station',
    active: false,
    // img: require('../../../assets/images/property/train.png'),
  },
  {
    key: 'hospitals',
    label: 'Hospitals',
    active: false,
    // img: require('../../../assets/images/property/hospital.png'),
  },
  {
    key: 'schools',
    label: 'Schools',
    active: false,
    // img: require('../../../assets/images/property/school.png'),
  },
];

export const propertyDocuments = [
  { key: 'property_plan', label: 'Property Plan or layout', uploaded: false },
  { key: 'sale_deed', label: 'Sale Deed', uploaded: false },

  {
    key: 'market_value_certificate',
    label: 'Market Value Certificate',
    uploaded: false,
  },
  { key: 'latest_ec', label: 'Latest EC', uploaded: false },
  { key: 'property_tax', label: 'Property Tax', uploaded: false },
  // { key: 'owner_aadhar_card', label: 'Owner Aadhar Card', uploaded: false },
  // { key: 'owner_pan_card', label: 'Owner Pan Card', uploaded: false },
];

export const propertyDocumentsForLease = [
  { key: 'property_plan', label: 'Property Plan or layout', uploaded: false },
  { key: 'sale_deed', label: 'Sale Deed', uploaded: false },

  {
    key: 'market_value_certificate',
    label: 'Market Value Certificate',
    uploaded: false,
  },
  { key: 'EC', label: 'ec', uploaded: false },
  // { key: 'owner_aadhar_card', label: 'Owner Aadhar Card', uploaded: false },
  // { key: 'owner_pan_card', label: 'Owner Pan Card', uploaded: false },
];

export const propertyDocumentsForHospitality = [
  { key: 'property_plan', label: 'Property Plan or layout', uploaded: false },
  { key: 'sale_deed', label: 'Sale Deed', uploaded: false },

  {
    key: 'market_value_certificate',
    label: 'Market Value Certificate',
    uploaded: false,
  },
  { key: 'latest_ec', label: 'Latest EC', uploaded: false },
  { key: 'property_tax', label: 'Property Tax', uploaded: false },
  // { key: 'owner_aadhar_card', label: 'Owner Aadhar Card', uploaded: false },
  // { key: 'owner_pan_card', label: 'Owner Pan Card', uploaded: false },
];

export const propertyDocumentsForSelling = [
  { key: 'property_plan', label: 'Property Plan or layout', uploaded: false },
  { key: 'sale_deed', label: 'Sale Deed', uploaded: false },

  {
    key: 'market_value_certificate',
    label: 'Market Value Certificate',
    uploaded: false,
  },
];

export const propertyPlanDocument = [{ key: 'property_plan', label: 'Property Plan', uploaded: false }];

export const gatedOptions = [
  { label: 'Yes', value: 'yes' },
  { label: 'No', value: 'no' },
];

export const parkingAmeneties = [
  { label: 'Maintenance Staff', key: 'maintenance_staff' },
  { label: 'Power Backup', key: 'power_backup' },
  { label: 'Security/ Fire alarm', key: 'security/_fire_alarm' },
  { label: 'Visitor Parking', key: 'visitor_parking' },
  { label: 'Washing Service', key: 'washing_service' },
  { label: 'Internet/Wi-Fi connectivity', key: 'internet/wi-fi_connectivity' },
  { label: 'CCTV', key: 'cctv' },
  { label: 'Pantry', key: 'pantry' },
  { label: 'Water Purifier', key: 'water_purifier' },
  { label: 'Washrooms', key: 'washrooms' },
  {
    label: 'Charging ports (For Electric cars/Bike)',
    key: 'charging_ports_(for_electric_cars/bike)',
  },
  { label: 'Tyre Deflate facility', key: 'tyre_deflate_facility' },
  { label: 'Air Pressure Checking', key: 'air_pressure_checking' },
];

export const playGroundAmenities = [
  { label: 'Maintenance Staff', key: 'maintenance_staff' },
  { label: 'Drinking water', key: 'drinking_water' },
  { label: 'Power Backup', key: 'power_backup' },
  { label: 'Security/ Fire alarm', key: 'security/_fire_alarm' },
  { label: 'Lifts', key: 'lifts' },
  { label: 'Lockers', key: 'lockers' },
  { label: 'Kits available', key: 'kits_available' },
  { label: 'Flood Lights', key: 'flood_lights' },
  { label: 'Artificial Turf', key: 'artificial_turf' },
  { label: 'Refreshments', key: 'refreshments' },
  { label: 'Swimming pool', key: 'swimming_pool' },
  { label: 'CCTV Surveillance', key: 'cctv_surveillance' },
];

export const playGroundFeatures = [
  { label: 'Internet/Wi-Fi connectivity', key: 'internet/wi-fi_connectivity' },
  { label: 'Central AC', key: 'central_ac' },
  { label: 'Water Purifier', key: 'water_purifier' },
  { label: 'Recently Renovated', key: 'recently_renovated' },
];

export const eventSpaceAmenities = [
  { label: 'Maintenance Staff', key: 'maintenance_staff' },
  { label: 'Water Storage', key: 'water_storage' },
  { label: 'Power Backup', key: 'power_backup' },
  { label: 'Security/ Fire alarm', key: 'security/_fire_alarm' },
  { label: 'Intercom Facilities', key: 'intercom_facilities' },
  { label: 'Lifts', key: 'lifts' },
  { label: 'Internet/Wi-Fi connectivity', key: 'internet/wi-fi_connectivity' },
  { label: 'Water Purifier', key: 'water_purifier' },
  { label: 'Recently Renovated', key: 'recently_renovated' },
  { label: 'Private Garden', key: 'private_garden' },
  { label: 'Spacious Interiors', key: 'spacious_interiors' },
  { label: 'Piped Gas', key: 'piped_gas' },
  { label: 'Wash rooms', key: 'wash_rooms' },
  { label: 'Air Conditioning', key: 'air_conditioning' },
];

export const commercialShowroomAmenities = [
  { label: 'Maintenance Staff', key: 'maintenance_staff' },
  { label: 'Water Storage', key: 'water_storage' },
  { label: 'Power Backup', key: 'power_backup' },
  { label: 'Security/ Fire alarm', key: 'security/_fire_alarm' },
  { label: 'Intercom Facilities', key: 'intercom_facilities' },
  { label: 'Lifts', key: 'lifts' },
  { label: 'Internet/Wi-Fi connectivity', key: 'internet/wi-fi_connectivity' },
  { label: 'Water Purifier', key: 'water_purifier' },
  { label: 'Recently Renovated', key: 'recently_renovated' },
  { label: 'Private Garden', key: 'private_garden' },
  { label: 'Spacious Interiors', key: 'spacious_interiors' },
  { label: 'Piped Gas', key: 'piped_gas' },
  { label: 'Wash rooms', key: 'wash_rooms' },
  { label: 'Air Conditioning', key: 'air_conditioning' },
];

export const commercialShowroomFeatures = [
  { label: 'Fire Extinguisher', key: 'fire_extinguisher' },
  { label: 'Housekeeping', key: 'housekeeping' },
  { label: 'CCTV Surveillance', key: 'cctv_surveillance' },
  { label: 'Emergency exits', key: 'emergency_exits' },
  {
    label: 'Internet/Wi-Fi connectivity',
    key: 'internet_/_wi_fi_connectivity',
  },
  { label: 'Access controls', key: 'access_controls' },
  { label: 'HVAC systems', key: 'hvac_systems' },
  { label: 'Central AC', key: 'central_ac' },
  { label: 'Water Purifier', key: 'water_purifier' },
  { label: 'Recently Renovated', key: 'recently_renovated' },
];

export const hostelsRoomAmenities = [
  { label: 'AC', key: 'ac' },
  { label: 'TV', key: 'tv' },
  { label: 'Fan', key: 'fan' },
  { label: 'Lights', key: 'lights' },
  { label: 'Beds With Mattress', key: 'beds_with_mattress' },
  { label: 'Wardrobe', key: 'wardrobe' },
  { label: 'Geyser', key: 'geyser' },
  { label: 'Induction Stove', key: 'induction_stove' },
  { label: 'Fridge', key: 'fridge' },
  { label: 'Work Table and Chairs', key: 'work_table_and_chairs' },
  { label: 'Intercom Facilities', key: 'intercom_facilities' },
  { label: 'Guest Chair', key: 'guest_chair' },
];

export const hostelsRoomFeatures = [
  { label: 'False Ceiling Lighting', key: 'false_ceiling_lighting' },
  {
    label: 'Maintenance Staff / Cleaning Staff',
    key: 'maintenance_staff_/_cleaning_staff',
  },
  { label: 'Internet/Wi-Fi connectivity', key: 'internet/wi-fi_connectivity' },
  { label: 'Power Backup', key: 'power_backup' },
  { label: 'Water Purifier', key: 'water_purifier' },
  { label: 'Recently Renovated', key: 'recently_renovated' },
  { label: 'Security/ Fire alarm', key: 'security/_fire_alarm' },
  { label: 'Natural Light', key: 'natural_light' },
  { label: 'Spacious Interiors', key: 'spacious_interiors' },
  { label: 'Lifts', key: 'lifts' },
  { label: 'Game Zone', key: 'game_zone' },
  { label: 'Washing Machine', key: 'washing_machine' },
  { label: 'Modular Common kitchen', key: 'modular_common_kitchen' },
  { label: 'Microwave', key: 'microwave' },
  { label: 'Dining Table', key: 'dining_table' },
  { label: 'CCTV', key: 'cctv' },
  { label: 'Stove With Gas', key: 'stove_with_gas' },
  { label: 'Fitness Centre', key: 'fitness_centre' },
  { label: 'Pet Friendly', key: 'pet_friendly' },
];

export const coworkingSpaceAmeneties = [
  { label: 'Maintenance Staff', key: 'maintenance_staff' },
  { label: 'High-speed Internet/Wifi', key: 'high-speed_internet/wifi' },
  { label: 'Tea, Coffee', key: 'tea_coffee' },
  { label: 'Wellness room', key: 'wellness_room' },
  { label: 'Network Support', key: 'network_support' },
  { label: 'Game lounge', key: 'game_lounge' },
  { label: 'Separate Restroom', key: 'separate_restroom' },
  { label: 'Pantry Area', key: 'pantry_area' },
  { label: 'Meeting/Conference Rooms', key: 'meeting/conference_rooms' },
  { label: 'Dedicated Phone Booth', key: 'dedicated_phone_booth' },
  {
    label: 'Event Space (Mention seating capacity)',
    key: 'event_space_mention_seating_capacity',
  },
  {
    label: 'Centralised Air Conditioners',
    key: 'centralised_air_conditioners',
  },
  { label: 'Power slots', key: 'power_slots' },
  { label: 'Power Backup Generator', key: 'power_backup_generator' },
  { label: 'Lift/Elevator', key: 'lift/elevator' },
  { label: 'Metro Connectivity', key: 'metro_connectivity' },
  { label: 'Storage Space', key: 'storage_space' },
  {
    label: 'Breakout & Recreational Area',
    key: 'breakout_&amp;_recreational_area',
  },
  { label: 'Lounge Area', key: 'lounge_area' },
  { label: 'Fitness Centre', key: 'fitness_centre' },
  { label: 'Security/ Fire alarm', key: 'security/fire_alarm' },
  { label: 'Visitor Parking', key: 'visitor_parking' },
  { label: 'Intercom Facilities', key: 'intercom_facilities' },
  { label: 'Smoke Zone', key: 'smoke_zone' },
  { label: 'Single Seater', key: 'single_seater' },
  {
    label: 'Meeting & Conference Rooms',
    key: 'meeting_&amp;_conference_rooms',
  },
  { label: 'Phone Booth', key: 'phone_booth' },
];

export const FlatmateAmenities = [
  { label: 'Maintenance Staff', key: 'maintenance_staff' },
  { label: 'Water Storage', key: 'water_storage' },
  { label: 'Power Backup', key: 'power_backup' },
  { label: 'Security/ Fire alarm', key: 'security/_fire_alarm' },
  { label: 'Visitor Parking', key: 'visitor_parking' },
  { label: 'Vastu Compliant', key: 'vastu_compliant' },
  { label: 'Park', key: 'park' },
  { label: 'Intercom Facilities', key: 'intercom_facilities' },
  { label: 'Lifts', key: 'lifts' },
];

// export function isValidURL(url: string) {
//   const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
//   return urlPattern.test(url);
// }

export function isValidURL(urlString) {
  const pattern = new RegExp(
    '^(https?:\\/\\/)?' + // optional protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$',
    'i'
  ); // fragment locator
  return !!pattern.test(urlString);
}

export function formatNumberWithNotation(num: any) {
  if (isNaN(num) || num < 0) {
    return ' ';
  }
  if (num < 1000) {
    return num;
  } else if (num < 100000) {
    return (num / 1000).toFixed(1) + 'k';
  } else if (num < 10000000) {
    return (num / 100000).toFixed(1) + ' L';
  } else {
    return (num / 10000000).toFixed(1) + ' Cr';
  }
}

export function formatNumberWithNoCurrency(num: any,value:any) {
  if (isNaN(num) || num < 0) {
    return ' ';
  }
  if (format(num,value) < 1000) {
    return (format(num,value)).toFixed(1) + ' ₹';
  } else if (format(num,value) < 100000) {
    return (format(num,value)/ 1000).toFixed(1) + ' k';
  } else if (format(num,value) < 10000000) {
    return (format(num,value)/ 100000).toFixed(1) + ' L';
  } else {
    return (format(num,value)/ 10000000).toFixed(1)+ ' Cr';
  }
}

function format(num:any,val:any){
  return num*(val/100)
}

export function formatNumberWithComma(num) {
  // console.log('formatNumberWithComma function error: ', num);

  if (isNaN(num) || num < 0 || num === '' || num === null) {
    return '--';
  }

  let rounded_number = (Math.round(num * 100) / 100).toString();

  // If there are trailing zeros, remove them
  if (rounded_number.indexOf('.') !== -1) {
    rounded_number = rounded_number.replace(/\.?0+$/, '');
  }

  const numStr = rounded_number.toString();

  if (num < 1000) {
    return '₹ ' + numStr;
  } else if (num < 100000) {
    const thousands = numStr.slice(0, -3);
    const remainder = numStr.slice(-3);
    return '₹ ' + thousands + ',' + remainder + '';
  } else if (num < 10000000) {
    const lakhs = numStr.slice(0, -5);
    const remainder = numStr.slice(-5);
    return '₹ ' + lakhs + ',' + remainder + ' ';
  } else {
    const crores = numStr.slice(0, -7);
    const remainder = numStr.slice(-7);
    return '₹ ' + crores + ',' + remainder + ' ';
  }
}

export function imagevideoextention(urivalue: any) {
  // VERIFY FUNCTUIN FOR IMAGES EXTENTIONS

  const temp = /[^\s]+(.*?).(jpg|jpeg|png|gif|JPG|JPEG|PNG|GIF)$/.test(urivalue);
  if (temp) {
    return true;
  } else {
    return false;
  }
}

export function updation_val(iwantval: string, proptype: string, propsubtype: string) {
  let className;

  if ((iwantval == 'Rent' || iwantval == 'Sell') && proptype == 'Commercial') {
    className = `Update_${iwantval}_${proptype}_${propsubtype}`;
  } else if ((iwantval == 'Rent' || iwantval == 'Sell') && (proptype == 'Residential' || proptype == 'LandPlot')) {
    className = `Update_${iwantval}_${proptype}`;
  } else if (iwantval == 'Coliving') {
    className = `Update_${iwantval}`;
  }

  return className;
}

export function areaunitremoveunder(areavalue: any) {
  // VERIFY FUNCTUIN FOR IMAGES EXTENTIONS

  if (areavalue === 'Sq_yards') {
    return 'Sq yards';
  } else if (areavalue === 'Sq_ft') {
    return 'Sq ft';
  } else {
    return areavalue;
  }
}

export function changingUnderScore(val: any) {
  // VERIFY FUNCTUIN FOR IMAGES EXTENTIONS

  switch (val) {
    case 'Shop_And_Retail':
      return 'Shop And Retail';

    case 'Office_Space':
      return 'Office Space';

    case 'Pre_owned':
      return 'Pre owned';

    case 'Ready_to_occupy':
      return 'Ready to occupy';

    case 'Under_construction':
      return 'Under Construction';

    case 'Private_room':
      return 'Private Room';

    case 'Shared_room':
      return 'Shared Room';

    case 'Semi_Furnished':
      return 'Semi Furnished';

    case 'Sq_yards':
      return 'Sq yards';

    case 'Sq_ft':
      return 'Sq ft';

    default:
      return val;
  }
}

export function locationdataCorrection(locationData: any) {
  //const locationd = locationData.split(',');
  // console.log(' value-> ', locationData);
  //console.log(' location length : ------->', locationd.length);
  // if (locationData.location >= 3) {
}
export function isEmpty(obj: object) {
  return Object.keys(obj).length === 0;
}

export async function locationresult(latitude: number, longitude: number) {
  const fetchAddressDetailsFromPincode = async (
    formattedAddress: string,
    pincode: string,
    latitude: number,
    longitude: number,
    addressComponents: any
  ) => {
    try {
      const url = `https://maps.googleapis.com/maps/api/geocode/json?components=postal_code:${pincode}&key=${GOOGLE_MAPS_API}`;
      const response = await axios.get(url);

      if (response.data.results.length > 0) {
        const addressDetails = response.data.results[0].formatted_address;
        // console.log(' formated add --', addressComponents?.results[0].formatted_address);

        let data = addressDetails.split(',');

        const trimmedData = data.map(item => item.trim());

        let location_length = trimmedData.length;

        const localityval = trimmedData.toString();

        const country = trimmedData[location_length - 1];

        const statePin = trimmedData[location_length - 2];

        let dataStatePin = statePin.split(' ');

        const state = dataStatePin[0];

        const pincode = dataStatePin[dataStatePin.length - 1];

        let location = [latitude, longitude];

        const city = trimmedData[location_length - 3];

        let returndata = {
          country: country,
          state: state,
          city: city,
          locality: localityval,
          pincode: pincode,
          location: location,
          completeAddr: localityval,
          formatedAddr: addressComponents?.results[0].formatted_address,
        };

        return returndata;
      } else {
        return 'Address not found';
      }
    } catch (error) {
      console.error('Error fetching address details:', error.response);
      return 'Error fetching address details';
    }
  };

  const fetchNearbyPlaces = async (latitude: number, longitude: number) => {
    try {
      const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_MAPS_API}`;
      const response = await axios.get(url);
      if (response.data.results.length > 0) {
        const addressComponents = response.data.results[0].address_components;

        const formattedAddress = addressComponents.map(component => component.long_name).join(', ');

        let addr = formattedAddress.split(', ');

        // console.log('adds components -->', response.data.results[0].address_components);
        return fetchAddressDetailsFromPincode(
          formattedAddress,
          addr[addr.length - 1],
          latitude,
          longitude,
          response.data
        );
      } else {
        return 'Address not found';
      }
    } catch (error) {
      console.error('Error fetching address:', error?.response);
      return 'Error fetching address';
    }
  };

  return await fetchNearbyPlaces(latitude, longitude);
}

export function uniqueIdCreation(createDate: any, idval: string) {
  let uniqeid;

  const timestamp = createDate;
  const date = new Date(timestamp);

  // Get day, month, and year
  const day = String(date.getUTCDate()).padStart(2, '0');
  const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-based, so add 1
  const year = date.getUTCFullYear();

  // Format the date string
  const formattedDate = `${day}${month}${year}`;

  const idString = idval;

  // Use a regular expression to find all sequences of four digits
  const lastFourDigits = idString?.match(/\d+/g)?.join('').slice(-4);

  // console.log('val--', lastFourDigits);

  uniqeid = `${formattedDate}${lastFourDigits}`;
  // console.log('val--', formattedDate);

  return uniqeid;
}
