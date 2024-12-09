export const categoryCardData = [
  {
    label: 'Residential Properties',
    img: require('@/assets/images/customImage/house1.png'),
    // link: ROUTES.ResidentialProperties,
    type: 'Residential',
    propertyType: ['Apartment', 'Flat', 'Studio Apartment', 'Villa', 'Independent House', 'Farm House', 'Guest House'],
  },
  {
    label: 'Coliving Properties',
    img: require('@/assets/images/customImage/friend1.png'),
    // link: ROUTES.ResidentialProperties,
    type: 'Coliving',
    propertyType: [
      'Flat',
      'Studio Apartment',
      'Apartment',
      'Villa',
      'Independent House',
      'PG',
      'Coliving space',
      'Hostel',
    ],
  },
  {
    label: 'Commercial Properties',
    img: require('@/assets/images/customImage/hostel1.png'),
    // link: ROUTES.ResidentialProperties,
    type: 'Commercial',
    propertyType: [
      'Hotels',
      'Resorts',
      'Retail',
      'Showroom',
      'Shopping mall',
      'Educational',
      'Office spaces',
      'Industrial',
      'Land/plot',
    ],
  },
  {
    label: 'Office Space',
    img: require('@/assets/images/customImage/building1.png'),
    // link: ROUTES.ResidentialProperties,
    type: 'Office space',
    propertyType: ['Office spaces'],
  },
  {
    label: 'Land/Plot',
    img: require('@/assets/images/customImage/rail1.png'),
    // link: ROUTES.ResidentialProperties,
    type: 'Land or Plot',
    propertyType: ['Residential', 'Agricultural', 'Industrial', 'Institutional'],
  },
];

export const homeServices = [
  {
    label: 'Exclusive Services',
    img: require('@/assets/images/customImage/es1.png'),
    // link: ROUTES.ExclusiveServicesScreen,
    type: 'creditluk',
  },
  {
    label: 'CreditLuk',
    img: require('@/assets/images/customImage/credit1.png'),
    // link: ROUTES.CreditLukScreen,
    type: 'creditluk',
  },
  {
    label: 'Rentpay',
    img: require('@/assets/images/customImage/rent1.png'),
    // link: ROUTES.RentpayScreen,
    type: 'rentpay',
  },
  {
    label: 'Auctions',
    img: require('@/assets/images/customImage/auction1.png'),
    // link: ROUTES.AuctionScreen,
    type: 'auctions',
  },
  {
    label: 'Rental Agreement',
    img: require('@/assets/images/customImage/aggrement.png'),
    // link: ROUTES.RentalAgreementScreen,
    type: 'rental agreement',
  },
];

export const Constants = {
  androidPlayStoreURL: 'https://play.google.com/store/apps/details?id=com.nearlukapplication',
  iOSAppStoreURL: 'https://apps.apple.com/in/app/nearluk/id1462426643',
};
