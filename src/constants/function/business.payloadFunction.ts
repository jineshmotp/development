export function BusinessListingPayload(payload: any) {
  const newpayload = {
    business_id: payload?.business_id,
    business_owner: payload?.business_owner,
    name: payload?.name,
    category: payload?.category,
    sub_category: payload?.sub_category,
    event_type: payload?.event_type,
    seating_capacity: isNaN(parseInt(payload?.seating_capacity)) ? 0 : parseInt(payload?.seating_capacity),
    floating_capacity: isNaN(parseInt(payload?.floating_capacity)) ? 0 : parseInt(payload?.floating_capacity),
    aminities: payload?.aminities,
    about: payload?.about,
    gallery: payload?.gallery,
    location: payload?.location,
    address: payload?.address,
    locality: payload?.locality,
    landmark: payload?.landmark,
    city: payload?.city,
    state: payload?.state,
    pincode: payload?.pincode,

    veg_per_plate: isNaN(parseInt(payload?.veg_per_plate)) ? 0 : parseInt(payload?.veg_per_plate),
    non_veg_per_plate: isNaN(parseInt(payload?.non_veg_per_plate)) ? 0 : parseInt(payload?.non_veg_per_plate),
    min_booking_price: isNaN(parseInt(payload?.min_booking_price)) ? 0 : parseInt(payload?.min_booking_price),
    operation_timings: payload?.operation_timings,

    food_type: payload?.food_type,
    cuisine: payload?.cuisine,
    decoration: payload?.decoration,
    alcohol_availability: payload?.alcohol_availability === 'Yes' ? true : false,
    total_no_rooms: isNaN(parseInt(payload?.total_no_rooms)) ? 0 : parseInt(payload?.total_no_rooms),

    // exclusive service

    rate_card: payload?.rate_card,
    brochure: payload?.brochure,
  };

  if (newpayload.gallery === '') {
    delete newpayload.gallery;
  }

  if (newpayload.event_type === undefined) {
    delete newpayload.event_type;
  }

  if (newpayload.aminities === undefined) {
    delete newpayload.aminities;
  }

  if (newpayload.food_type === undefined) {
    delete newpayload.food_type;
  }

  if (newpayload.food_type === undefined) {
    delete newpayload.food_type;
  }

  if (newpayload.cuisine === undefined) {
    delete newpayload.cuisine;
  }

  if (newpayload.decoration === undefined) {
    delete newpayload.decoration;
  }

  if (newpayload.locality === undefined) {
    delete newpayload.locality;
  }

  if (newpayload.rate_card === undefined) {
    delete newpayload.rate_card;
  }

  if (newpayload.brochure === undefined) {
    delete newpayload.brochure;
  }

  return newpayload;
}
