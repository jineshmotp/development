const staticData = {
    1: {
        // heading: 'User Type',
        // label: 'I Am',
        heading: 'Tell Us About Yourself',
        label: "I'm in the Market as a...",
        apiKey: 'user_type',
        data: [
            { key: 'Buyer', label: 'Buyer' },
            { key: 'Tenant', label: 'Tenant' },
            { key: 'Owner', label: 'Owner' },
            { key: 'Agent', label: 'Agent' }
        ]
    },
    1.1: {
        // heading: 'Listing Preferences',
        // label: 'List Property For',
        heading: "What Are You Looking to Do?",
        label: "I Want to List a Property...",
        apiKey: 'property_preference',
        data: [
            { key: 'Sell', label: 'Sell' },
            { key: 'Rent', label: 'Rent/ Lease' },
            // { key: 'Coliving', label: 'Co-living' },
        ]
    },
    2: {
        // heading: 'Property Preferences',
        // label: 'Interested In',
        heading: "Explore Your Property Interests",
        label: "I'm Interested in...",
        apiKey: 'intreseted_property',
        data: [
            { key: 'Residential', label: 'Residential' },
            { key: 'Commercial', label: 'Commercial' },
            { key: 'Land or Plot', label: 'Land / Plot' },
            { key: 'Coliving', label: 'Co-living' },
        ]
    },
    3: {
        // heading: 'Property Type',
        // label: 'Type of Property',
        heading: "Choose Your Ideal Property Type",
        label: "I'm Looking For a...",
        apiKey: 'intreseted_sub_property',
        data: []
    },
    4: {
        // heading: 'Referral Source',
        // label: 'How Did You Hear About Us?',
        heading: "How Did You Hear About Us?",
        label: "I Discovered Nearluk Through...",
        apiKey: 'found_via',
        data: [
            { key: 'Search Engine', label: 'Search Engine( Google, Yahoo etc..)' },
            { key: 'Recommended by', label: 'Recommended By Family/Friends' },
            { key: 'Socia Media', label: 'Social Media' },
            { key: 'Reffered by', label: 'Referred By' },
        ]
    },
}

const PropertyTypes = {
    "Residential": [
        { key: 'Flat', label: 'Flat' },
        { key: 'Studio Apartment', label: 'Studio Apartment' },
        { key: 'Apartment', label: 'Apartment' },
        { key: 'Villa', label: 'Villa' },
        { key: 'Independent House', label: 'Independent House' },
        { key: 'Farm House', label: 'Farm House' },
        { key: 'Guest House', label: 'Guest House' }
    ],
    "Commercial": [
        { key: 'Hotel', label: 'Hotels' },
        { key: 'Resorts', label: 'Resorts' },
        { key: 'Retail', label: 'Retail' },
        { key: 'Showroom', label: 'Showrooms' },
        { key: 'Shopping malls', label: 'Shopping malls' },
        { key: 'Educational', label: 'Educational/Institute' },
        { key: 'Office_Space', label: 'Office spaces' },
        { key: 'Industrial', label: 'Industrial' },
    ],
    "Land or Plot": [
        { key: 'Residential', label: 'Residential Plot' },
        { key: 'Agricultural or farm', label: 'Agricultural / Farm' },
        { key: 'Industrial', label: 'Industrial Plot' },
        { key: 'Institutional', label: 'Institutional Plot' },
    ],
    "Coliving": [
        { key: 'PG', label: 'PG' },
        { key: 'Coliving space', label: 'Co-living space' },
        { key: 'Hostel', label: 'Hostels' },
        { key: 'Shared_room', label: 'Sharing rooms' },
    ]
}

export enum Source {
    Search_Engine = 'Search Engine',
    Recommended_by = 'Recommended by',
    Socia_Media = 'Socia Media',
    Reffered_by = 'Reffered by',
}

export { staticData, PropertyTypes };