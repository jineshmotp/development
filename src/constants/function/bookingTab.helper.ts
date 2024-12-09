// ChatScreen;
// ChatBox;
// MyAnalytics;
// MyInvestMentSharing;
// MyBidding;
// MyFavourite;
// MyLeads;
// MyPayments;
// MyPosting;
// PndingVerified;
// MyPersonalINfo

export const TAB_DATA = [
  {
    label: 'Personal Info',
    link: 'MyPersonalINfo',
  },
  {
    label: 'My Properties',
    link: 'MyPosting',
  },
  {
    label: 'My Leads',
    link: 'MyLeads',
  },
  {
    label: 'My Favourite',
    link: 'MyFavourite',
  },
  // {
  //   label: "Investment Sharing",
  //   link: "MyInvestMentSharing",
  // },
  // {
  //   label: "Pending Verified",
  //   link: "PndingVerified",
  // },
  {
    label: 'Chat',
    link: 'ChatScreen',
  },
  // {
  //   label: "Analytics",
  //   link: "MyAnalytics",
  // },
  // {
  //   label: "My Bidding",
  //   link: "MyBidding",
  // },
  {
    label: 'My Booking',
    link: 'MyBooking',
  },
  {
    label: 'Logout',
    link: 'Logout',
  },
];

export const BOOKING_TAB_CATEGORY = [
  {
    key: 'Parking',
    label: 'Parking Spaces',
    active: true,
  },
  {
    key: 'Play Ground',
    label: 'Play Grounds',
    active: false,
  },
  { key: 'Event Space', label: 'Event Spaces', active: false },
  { key: 'Service Apartment', label: 'Service Apartment', active: false },
  {
    key: 'Coworking Space',
    label: 'Co-Working Spaces',
    active: false,
  },
];

export const BOOKING_TAB = [
  {
    key: 'Upcoming',
    label: 'Upcoming',
    active: true,
  },
  {
    key: 'Completed',
    label: 'Completed',
    active: false,
  },
  {
    key: 'Cancelled',
    label: 'Cancelled',
    active: false,
  },
];
