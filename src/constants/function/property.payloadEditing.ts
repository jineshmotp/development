export function ProperyListing_PayloadGenerator(payload: any) {
  if (payload.iwant === 'Sell' && payload.property_type === 'Residential') {
    let newpayload = {
      iwant: payload.iwant,
      property_name: payload.property_name,
      property_type: payload.property_type,
      property_sub_type: payload.property_sub_type,
      posted_by: payload.property_owner,
      floor_no: payload.floor_no,
      total_floors: isNaN(parseInt(payload.total_floors)) ? 0 : parseInt(payload.total_floors),

      transaction_type: payload.transaction_type,
      transaction_type_new: payload.transaction_type_new,
      ready_for_possession_by: payload.ready_for_possession_by,
      bhk: payload.bhk,
      pooja_rooms: payload.pooja_rooms,
      servant_rooms: payload.servant_rooms,
      study_rooms: payload.study_rooms,
      store_rooms: payload.store_rooms,
      bathrooms: payload.bathrooms,
      balconies: payload.balconies,
      furnishing_status: payload.furnishing_status,
      furnishing_items: payload.furnishing_items,
      property_age: payload.property_age,
      property_facing: payload.property_facing,
      property_area: isNaN(parseInt(payload.property_area)) ? 0 : parseInt(payload.property_area),
      property_area_units: payload.property_area_units,
      carpet_area: isNaN(parseInt(payload.carpet_area)) ? 0 : parseInt(payload.carpet_area),
      carpet_area_units: payload.carpet_area_units,
      undivided_share: isNaN(parseInt(payload.undivided_share)) ? 0 : parseInt(payload.undivided_share),
      undivided_share_units: payload.undivided_share_units,
      floor_types: payload.floor_types,
      property_features: payload.property_features,
      gated_community: payload.gated_community,
      water_source: payload.water_source,
      wheeler_2_parking: payload.wheeler_2_parking,
      wheeler_4_parking: payload.wheeler_4_parking,
      visitor_parking: payload.visitor_parking,
      ownership: payload.ownership,
      existing_gallery: payload.existing_gallery,
      new_gallery: payload.new_gallery,
      // gallery: payload.gallery,
      locality: payload.locality,
      city: payload.city,
      block_no: payload.block_no,
      landmark: payload.landmark,
      state: payload.state,
      pincode: payload.pincode,
      country: payload.country,
      location: payload.location,
      road_street_no: payload.road_street_no,
      society_features: payload.society_features,
      property_description: payload.property_description,
      property_price: isNaN(parseInt(payload.property_price)) ? 0 : parseInt(payload.property_price),
      property_price_per_unit: isNaN(parseInt(payload.property_price_per_unit))
        ? 0
        : parseInt(payload.property_price_per_unit),

      maintenance_price: isNaN(parseInt(payload.maintenance_price)) ? 0 : parseInt(payload.maintenance_price),
      token_amount: isNaN(parseInt(payload.token_amount)) ? 0 : parseInt(payload.token_amount),
      is_price_negotiable: payload.is_price_negotiable,
      is_currently_under_loan: payload.is_currently_under_loan,
      is_all_inclusive_price: payload.is_all_inclusive_price,
      is_annual_dues_paid: payload.is_annual_dues_paid,
      is_tax_excluded: payload.is_tax_excluded,
      property_documents: payload.property_documents,
      rera_number: payload.rera_number ? payload.rera_number : null,
      is_rera_verified: payload.is_rera_verified,
      additional_contact_details: payload.additional_contact_details,
    };

    if (newpayload.additional_contact_details === '') {
      delete newpayload.additional_contact_details;
    }

    if (newpayload.floor_types === '') {
      delete newpayload.floor_types;
    }
    if (newpayload.transaction_type === 'Pre_owned') {
      delete newpayload.transaction_type_new;
    }

    if (newpayload.ready_for_possession_by === '') {
      delete newpayload.ready_for_possession_by;
    }

    if (newpayload.society_features === '') {
      delete newpayload.society_features;
    }

    if (newpayload.water_source === '') {
      delete newpayload.water_source;
    }

    if (newpayload.property_features === '') {
      delete newpayload.property_features;
    }

    if (newpayload.furnishing_status === '') {
      delete newpayload.furnishing_status;
    }

    if (newpayload.furnishing_items === '') {
      delete newpayload.furnishing_items;
    }

    return newpayload;
  }

  if (payload.iwant === 'Sell' && payload.property_sub_type === 'Hospitality') {
    let newpayload = {
      iwant: payload.iwant,
      property_name: payload.property_name,
      property_type: payload.property_type,
      property_sub_type: payload.property_sub_type,
      posted_by: payload.property_owner,
      hospitality_type: payload.hospitality_type,
      transaction_type: payload.transaction_type,
      transaction_type_new: payload.transaction_type_new,
      ready_for_possession_by: payload.ready_for_possession_by,
      is_multi_level: payload.is_multi_level,
      level_count: isNaN(parseInt(payload.level_count)) ? 0 : parseInt(payload.level_count),
      floor_no: payload.floor_no,
      total_floors: isNaN(parseInt(payload.total_floors)) ? 0 : parseInt(payload.total_floors),
      property_area: isNaN(parseInt(payload.property_area)) ? 0 : parseInt(payload.property_area),
      property_area_units: payload.property_area_units,
      carpet_area: isNaN(parseInt(payload.carpet_area)) ? 0 : parseInt(payload.carpet_area),
      carpet_area_units: payload.carpet_area_units,
      undivided_share: isNaN(parseInt(payload.undivided_share)) ? 0 : parseInt(payload.undivided_share),
      undivided_share_units: payload.undivided_share_units,
      floor_types: payload.floor_types,
      kitchen_area_available: payload.kitchen_area_available,
      dining_area_available: payload.dining_area_available,
      property_age: payload.property_age,
      property_facing: payload.property_facing,
      furnishing_status: payload.furnishing_status,
      furnishing_items: payload.furnishing_items,
      property_features: payload.property_features,
      water_source: payload.water_source,
      wheeler_2_parking: payload.wheeler_2_parking,
      wheeler_4_parking: payload.wheeler_4_parking,
      visitor_parking: payload.visitor_parking,
      ownership: payload.ownership,
      existing_gallery: payload.existing_gallery,
      new_gallery: payload.new_gallery,
      // gallery: payload.gallery,
      locality: payload.locality,
      city: payload.city,
      block_no: payload.block_no,
      landmark: payload.landmark,
      state: payload.state,
      pincode: payload.pincode,
      country: payload.country,
      location: payload.location,
      road_street_no: payload.road_street_no,
      property_description: payload.property_description,
      property_price: isNaN(parseInt(payload.property_price)) ? 0 : parseInt(payload.property_price),
      property_price_per_unit: isNaN(parseInt(payload.property_price_per_unit))
        ? 0
        : parseInt(payload.property_price_per_unit),
      property_documents: payload.property_documents,
      rera_number: payload.rera_number ? payload.rera_number : null,
      is_rera_verified: payload.is_rera_verified,
      additional_contact_details: payload.additional_contact_details,
    };

    if (newpayload.additional_contact_details === '') {
      delete newpayload.additional_contact_details;
    }

    if (newpayload.floor_types === '') {
      delete newpayload.floor_types;
    }
    if (newpayload.ready_for_possession_by === '') {
      delete newpayload.ready_for_possession_by;
    }

    if (newpayload.transaction_type === 'Pre_owned') {
      delete newpayload.transaction_type_new;
    }

    if (newpayload.water_source === '') {
      delete newpayload.water_source;
    }

    if (newpayload.property_features === '') {
      delete newpayload.property_features;
    }

    if (newpayload.furnishing_status === '') {
      delete newpayload.furnishing_status;
    }

    if (newpayload.furnishing_items === '') {
      delete newpayload.furnishing_items;
    }

    return newpayload;
  }

  if (payload.iwant === 'Sell' && payload.property_sub_type === 'Shop_And_Retail') {
    let newpayload = {
      iwant: payload.iwant,
      property_name: payload.property_name,
      property_type: payload.property_type,
      property_sub_type: payload.property_sub_type,
      posted_by: payload.property_owner,
      shop_retail_type: payload.shop_retail_type,
      type_of_retail: payload.type_of_retail,
      type_of_showroom: payload.type_of_showroom,
      transaction_type: payload.transaction_type,
      transaction_type_new: payload.transaction_type_new,
      ready_for_possession_by: payload.ready_for_possession_by,
      total_floors: isNaN(parseInt(payload.total_floors)) ? 0 : parseInt(payload.total_floors),
      floor_no: payload.floor_no,
      is_multi_level: payload.is_multi_level,
      level_count: isNaN(parseInt(payload.level_count)) ? 0 : parseInt(payload.level_count),
      units_on_floor: isNaN(parseInt(payload.units_on_floor)) ? 0 : parseInt(payload.units_on_floor),
      property_area: isNaN(parseInt(payload.property_area)) ? 0 : parseInt(payload.property_area),
      property_area_units: payload.property_area_units,
      carpet_area: isNaN(parseInt(payload.carpet_area)) ? 0 : parseInt(payload.carpet_area),
      carpet_area_units: payload.carpet_area_units,
      undivided_share: isNaN(parseInt(payload.undivided_share)) ? 0 : parseInt(payload.undivided_share),
      undivided_share_units: payload.undivided_share_units,
      floor_types: payload.floor_types,
      kitchen_area_available: payload.kitchen_area_available,
      dining_area_available: payload.dining_area_available,
      property_age: payload.property_age,
      property_facing: payload.property_facing,
      property_features: payload.property_features,
      water_source: payload.water_source,
      wheeler_2_parking: payload.wheeler_2_parking,
      wheeler_4_parking: payload.wheeler_4_parking,
      visitor_parking: payload.visitor_parking,
      ownership: payload.ownership,
      existing_gallery: payload.existing_gallery,
      new_gallery: payload.new_gallery,
      // gallery: payload.gallery,
      locality: payload.locality,
      city: payload.city,
      block_no: payload.block_no,
      landmark: payload.landmark,
      state: payload.state,
      pincode: payload.pincode,
      country: payload.country,
      location: payload.location,
      road_street_no: payload.road_street_no,
      property_description: payload.property_description,
      property_price: isNaN(parseInt(payload.property_price)) ? 0 : parseInt(payload.property_price),
      property_price_per_unit: isNaN(parseInt(payload.property_price_per_unit))
        ? 0
        : parseInt(payload.property_price_per_unit),
      property_documents: payload.property_documents,
      rera_number: payload.rera_number ? payload.rera_number : null,
      is_rera_verified: payload.is_rera_verified,
      additional_contact_details: payload.additional_contact_details,
    };

    if (newpayload.type_of_retail === '') {
      delete newpayload.type_of_retail;
    }

    if (newpayload.type_of_showroom === '') {
      delete newpayload.type_of_showroom;
    }

    if (newpayload.additional_contact_details === '') {
      delete newpayload.additional_contact_details;
    }

    if (newpayload.floor_types === '') {
      delete newpayload.floor_types;
    }
    if (newpayload.ready_for_possession_by === '') {
      delete newpayload.ready_for_possession_by;
    }

    if (newpayload.transaction_type === 'Pre_owned') {
      delete newpayload.transaction_type_new;
    }

    if (newpayload.water_source === '') {
      delete newpayload.water_source;
    }

    if (newpayload.property_features === '') {
      delete newpayload.property_features;
    }

    return newpayload;
  }

  if (payload.iwant === 'Sell' && payload.property_sub_type === 'Educational') {
    let newpayload = {
      iwant: payload.iwant,
      property_name: payload.property_name,
      property_type: payload.property_type,
      property_sub_type: payload.property_sub_type,
      posted_by: payload.property_owner,
      transaction_type: payload.transaction_type,
      transaction_type_new: payload.transaction_type_new,
      ready_for_possession_by: payload.ready_for_possession_by,
      total_floors: isNaN(parseInt(payload.total_floors)) ? 0 : parseInt(payload.total_floors),
      floor_no: payload.floor_no,
      is_multi_level: payload.is_multi_level,
      level_count: isNaN(parseInt(payload.level_count)) ? 0 : parseInt(payload.level_count),
      total_units_of_floors: isNaN(parseInt(payload.total_units_of_floors))
        ? 0
        : parseInt(payload.total_units_of_floors),
      property_area: isNaN(parseInt(payload.property_area)) ? 0 : parseInt(payload.property_area),
      property_area_units: payload.property_area_units,
      carpet_area: isNaN(parseInt(payload.carpet_area)) ? 0 : parseInt(payload.carpet_area),
      carpet_area_units: payload.carpet_area_units,
      undivided_share: isNaN(parseInt(payload.undivided_share)) ? 0 : parseInt(payload.undivided_share),
      undivided_share_units: payload.undivided_share_units,
      floor_types: payload.floor_types,
      kitchen_area_available: payload.kitchen_area_available,
      dining_area_available: payload.dining_area_available,
      property_age: payload.property_age,
      property_facing: payload.property_facing,
      property_features: payload.property_features,
      water_source: payload.water_source,
      wheeler_2_parking: payload.wheeler_2_parking,
      wheeler_4_parking: payload.wheeler_4_parking,
      visitor_parking: payload.visitor_parking,
      ownership: payload.ownership,
      existing_gallery: payload.existing_gallery,
      new_gallery: payload.new_gallery,
      // gallery: payload.gallery,
      locality: payload.locality,
      city: payload.city,
      block_no: payload.block_no,
      landmark: payload.landmark,
      state: payload.state,
      pincode: payload.pincode,
      country: payload.country,
      location: payload.location,
      road_street_no: payload.road_street_no,
      property_description: payload.property_description,
      property_price: isNaN(parseInt(payload.property_price)) ? 0 : parseInt(payload.property_price),
      property_price_per_unit: isNaN(parseInt(payload.property_price_per_unit))
        ? 0
        : parseInt(payload.property_price_per_unit),
      property_documents: payload.property_documents,
      rera_number: payload.rera_number ? payload.rera_number : null,
      is_rera_verified: payload.is_rera_verified,
      additional_contact_details: payload.additional_contact_details,
    };

    if (newpayload.additional_contact_details === '') {
      delete newpayload.additional_contact_details;
    }
    if (newpayload.floor_types === '') {
      delete newpayload.floor_types;
    }
    if (newpayload.ready_for_possession_by === '') {
      delete newpayload.ready_for_possession_by;
    }

    if (newpayload.transaction_type === 'Pre_owned') {
      delete newpayload.transaction_type_new;
    }

    if (newpayload.water_source === '') {
      delete newpayload.water_source;
    }

    if (newpayload.property_features === '') {
      delete newpayload.property_features;
    }

    return newpayload;
  }

  if (payload.iwant === 'Sell' && payload.property_sub_type === 'Office_Space') {
    let newpayload = {
      iwant: payload.iwant,
      property_name: payload.property_name,
      property_type: payload.property_type,
      property_sub_type: payload.property_sub_type,
      posted_by: payload.property_owner,
      transaction_type: payload.transaction_type,
      transaction_type_new: payload.transaction_type_new,
      ready_for_possession_by: payload.ready_for_possession_by,
      total_floors: isNaN(parseInt(payload.total_floors)) ? 0 : parseInt(payload.total_floors),
      floor_no: payload.floor_no,
      is_multi_level: payload.is_multi_level,
      level_count: isNaN(parseInt(payload.level_count)) ? 0 : parseInt(payload.level_count),
      total_units_of_floors: isNaN(parseInt(payload.total_units_of_floors))
        ? 0
        : parseInt(payload.total_units_of_floors),
      conference_hall_available: payload.conference_hall_available,
      conference_hall_count: isNaN(parseInt(payload.conference_hall_count))
        ? 0
        : parseInt(payload.conference_hall_count),
      private_cabin_available: payload.private_cabin_available,
      private_cabin_count: isNaN(parseInt(payload.private_cabin_count)) ? 0 : parseInt(payload.private_cabin_count),
      pantry: payload.pantry,
      property_area: isNaN(parseInt(payload.property_area)) ? 0 : parseInt(payload.property_area),
      property_area_units: payload.property_area_units,
      carpet_area: isNaN(parseInt(payload.carpet_area)) ? 0 : parseInt(payload.carpet_area),
      carpet_area_units: payload.carpet_area_units,
      undivided_share: isNaN(parseInt(payload.undivided_share)) ? 0 : parseInt(payload.undivided_share),
      undivided_share_units: payload.undivided_share_units,
      washroom: payload.washroom,
      property_age: payload.property_age,
      floor_types: payload.floor_types,
      property_facing: payload.property_facing,
      property_features: payload.property_features,
      water_source: payload.water_source,
      wheeler_2_parking: payload.wheeler_2_parking,
      wheeler_4_parking: payload.wheeler_4_parking,
      visitor_parking: payload.visitor_parking,
      ownership: payload.ownership,
      existing_gallery: payload.existing_gallery,
      new_gallery: payload.new_gallery,
      // gallery: payload.gallery,
      locality: payload.locality,
      city: payload.city,
      block_no: payload.block_no,
      landmark: payload.landmark,
      state: payload.state,
      pincode: payload.pincode,
      country: payload.country,
      location: payload.location,
      road_street_no: payload.road_street_no,
      property_description: payload.property_description,
      property_price: isNaN(parseInt(payload.property_price)) ? 0 : parseInt(payload.property_price),
      property_price_per_unit: isNaN(parseInt(payload.property_price_per_unit))
        ? 0
        : parseInt(payload.property_price_per_unit),
      property_documents: payload.property_documents,
      rera_number: payload.rera_number ? payload.rera_number : null,
      is_rera_verified: payload.is_rera_verified,
      additional_contact_details: payload.additional_contact_details,
    };

    if (newpayload.additional_contact_details === '') {
      delete newpayload.additional_contact_details;
    }
    if (newpayload.floor_types === '') {
      delete newpayload.floor_types;
    }
    if (newpayload.ready_for_possession_by === '') {
      delete newpayload.ready_for_possession_by;
    }

    if (newpayload.transaction_type === 'Pre_owned') {
      delete newpayload.transaction_type_new;
    }

    if (newpayload.water_source === '') {
      delete newpayload.water_source;
    }

    if (newpayload.property_features === '') {
      delete newpayload.property_features;
    }

    return newpayload;
  }

  if (payload.iwant === 'Sell' && payload.property_sub_type === 'Industrial' && property_type !== 'Land or Plot') {
    let newpayload = {
      iwant: payload.iwant,
      property_name: payload.property_name,
      property_type: payload.property_type,
      property_sub_type: payload.property_sub_type,
      posted_by: payload.property_owner,
      industry_type: payload.industry_type,
      transaction_type: payload.transaction_type,
      transaction_type_new: payload.transaction_type_new,
      ready_for_possession_by: payload.ready_for_possession_by,
      total_floors: isNaN(parseInt(payload.total_floors)) ? 0 : parseInt(payload.total_floors),
      floor_no: payload.floor_no,
      units_on_floor: isNaN(parseInt(payload.units_on_floor)) ? 0 : parseInt(payload.units_on_floor),
      property_area: isNaN(parseInt(payload.property_area)) ? 0 : parseInt(payload.property_area),
      property_area_units: payload.property_area_units,
      carpet_area: isNaN(parseInt(payload.carpet_area)) ? 0 : parseInt(payload.carpet_area),
      carpet_area_units: payload.carpet_area_units,
      undivided_share: isNaN(parseInt(payload.undivided_share)) ? 0 : parseInt(payload.undivided_share),
      undivided_share_units: payload.undivided_share_units,
      floor_types: payload.floor_types,
      kitchen_area_available: payload.kitchen_area_available,
      dining_area_available: payload.dining_area_available,
      property_age: payload.property_age,
      property_facing: payload.property_facing,
      property_features: payload.property_features,
      water_source: payload.water_source,
      wheeler_2_parking: payload.wheeler_2_parking,
      wheeler_4_parking: payload.wheeler_4_parking,
      visitor_parking: payload.visitor_parking,
      ownership: payload.ownership,
      existing_gallery: payload.existing_gallery,
      new_gallery: payload.new_gallery,
      // gallery: payload.gallery,
      locality: payload.locality,
      city: payload.city,
      block_no: payload.block_no,
      landmark: payload.landmark,
      state: payload.state,
      pincode: payload.pincode,
      country: payload.country,
      location: payload.location,
      road_street_no: payload.road_street_no,
      property_description: payload.property_description,
      property_price: isNaN(parseInt(payload.property_price)) ? 0 : parseInt(payload.property_price),
      property_price_per_unit: isNaN(parseInt(payload.property_price_per_unit))
        ? 0
        : parseInt(payload.property_price_per_unit),
      property_documents: payload.property_documents,
      rera_number: payload.rera_number ? payload.rera_number : null,
      is_rera_verified: payload.is_rera_verified,
      additional_contact_details: payload.additional_contact_details,
    };

    if (newpayload.additional_contact_details === '') {
      delete newpayload.additional_contact_details;
    }
    if (newpayload.floor_types === '') {
      delete newpayload.floor_types;
    }
    if (newpayload.ready_for_possession_by === '') {
      delete newpayload.ready_for_possession_by;
    }

    if (newpayload.transaction_type === 'Pre_owned') {
      delete newpayload.transaction_type_new;
    }

    if (newpayload.water_source === '') {
      delete newpayload.water_source;
    }

    if (newpayload.property_features === '') {
      delete newpayload.property_features;
    }

    return newpayload;
  }

  if (payload.iwant === 'Sell' && payload.property_type === 'Land or Plot') {
    let newpayload = {
      iwant: payload.iwant,
      property_name: payload.property_name,
      property_type: payload.property_type,
      property_sub_type: payload.property_sub_type,
      gated_community: payload.gated_community,
      society_features: payload.society_features,
      property_area: isNaN(parseInt(payload.property_area)) ? 0 : parseInt(payload.property_area),
      property_area_units: payload.property_area_units,
      posted_by: payload.property_owner,
      property_facing: payload.property_facing,
      corner_property: payload.corner_property,
      front_facing_road_width: isNaN(parseInt(payload.front_facing_road_width))
        ? 0
        : parseInt(payload.front_facing_road_width),
      front_facing_road_width_unit: payload.front_facing_road_width_unit,
      side_facing_road_width: isNaN(parseInt(payload.side_facing_road_width))
        ? 0
        : parseInt(payload.side_facing_road_width),
      side_facing_road_width_unit: payload.side_facing_road_width_unit,
      boundary_fencing: payload.boundary_fencing,
      borewell: payload.borewell,
      ownership: payload.ownership,
      existing_gallery: payload.existing_gallery,
      new_gallery: payload.new_gallery,
      // gallery: payload.gallery,
      locality: payload.locality,
      city: payload.city,
      block_no: payload.block_no,
      landmark: payload.landmark,
      state: payload.state,
      pincode: payload.pincode,
      country: payload.country,
      location: payload.location,
      road_street_no: payload.road_street_no,
      property_description: payload.property_description,
      property_price: isNaN(parseInt(payload.property_price)) ? 0 : parseInt(payload.property_price),
      property_price_per_unit: isNaN(parseInt(payload.property_price_per_unit))
        ? 0
        : parseInt(payload.property_price_per_unit),
      property_documents: payload.property_documents,
      rera_number: payload.rera_number ? payload.rera_number : null,
      is_rera_verified: payload.is_rera_verified,
      dtcp_number: payload.dtcp_number ? payload.dtcp_number : null,
      is_dtcp_verified: payload.is_dtcp_verified,
      additional_contact_details: payload.additional_contact_details,
    };

    if (newpayload.additional_contact_details === '') {
      delete newpayload.additional_contact_details;
    }

    if (newpayload.society_features === '') {
      delete newpayload.society_features;
    }
    return newpayload;
  }

  if (payload.iwant === 'Rent' && payload.property_type === 'Residential') {
    let newpayload = {
      iwant: payload.iwant,
      property_name: payload.property_name,
      property_type: payload.property_type,
      property_sub_type: payload.property_sub_type,
      posted_by: payload.property_owner,
      floor_no: payload.floor_no,
      total_floors: isNaN(parseInt(payload.total_floors)) ? 0 : parseInt(payload.total_floors),
      transaction_type: payload.transaction_type,
      transaction_type_new: payload.transaction_type_new,
      ready_for_possession_by: payload.ready_for_possession_by,
      bhk: payload.bhk,
      pooja_rooms: payload.pooja_rooms,
      servant_rooms: payload.servant_rooms,
      study_rooms: payload.study_rooms,
      store_rooms: payload.store_rooms,
      bathrooms: payload.bathrooms,
      balconies: payload.balconies,
      furnishing_status: payload.furnishing_status,
      furnishing_items: payload.furnishing_items,
      property_age: payload.property_age,
      property_facing: payload.property_facing,
      property_area: isNaN(parseInt(payload.property_area)) ? 0 : parseInt(payload.property_area),
      property_area_units: payload.property_area_units,
      carpet_area: isNaN(parseInt(payload.carpet_area)) ? 0 : parseInt(payload.carpet_area),
      carpet_area_units: payload.carpet_area_units,
      undivided_share: isNaN(parseInt(payload.undivided_share)) ? 0 : parseInt(payload.undivided_share),
      undivided_share_units: payload.undivided_share_units,
      floor_types: payload.floor_types,
      property_features: payload.property_features,
      gated_community: payload.gated_community,
      society_features: payload.society_features,
      water_source: payload.water_source,
      wheeler_2_parking: payload.wheeler_2_parking,
      wheeler_4_parking: payload.wheeler_4_parking,
      visitor_parking: payload.visitor_parking,
      ownership: payload.ownership,
      existing_gallery: payload.existing_gallery,
      new_gallery: payload.new_gallery,
      // gallery: payload.gallery,
      locality: payload.locality,
      city: payload.city,
      block_no: payload.block_no,
      landmark: payload.landmark,
      state: payload.state,
      pincode: payload.pincode,
      country: payload.country,
      location: payload.location,
      road_street_no: payload.road_street_no,
      property_description: payload.property_description,
      rented_time: payload.rented_time,
      rent_amount: isNaN(parseInt(payload.rent_amount)) ? 0 : parseInt(payload.rent_amount),
      token_amount: isNaN(parseInt(payload.token_amount)) ? 0 : parseInt(payload.token_amount),
      token_amount_of_duration: payload.token_amount_of_duration,
      include_power_bill_charges: payload.include_power_bill_charges,
      include_water_bill_charges: payload.include_water_bill_charges,
      is_rent_agreement: payload.is_rent_agreement,
      agreement_duration_month: isNaN(parseInt(payload.agreement_duration_month))
        ? 0
        : parseInt(payload.agreement_duration_month),
      is_notice_period: payload.is_notice_period,
      notice_duration_month: isNaN(parseInt(payload.notice_duration_month))
        ? 0
        : parseInt(payload.notice_duration_month),
      property_documents: payload.property_documents,
      rera_number: payload.rera_number ? payload.rera_number : null,
      is_rera_verified: payload.is_rera_verified,
      additional_contact_details: payload.additional_contact_details,
    };

    if (newpayload.additional_contact_details === '') {
      delete newpayload.additional_contact_details;
    }

    if (newpayload.floor_types === '') {
      delete newpayload.floor_types;
    }
    if (newpayload.ready_for_possession_by === '') {
      delete newpayload.ready_for_possession_by;
    }

    if (newpayload.transaction_type === 'Pre_owned') {
      delete newpayload.transaction_type_new;
    }

    if (newpayload.society_features === '') {
      delete newpayload.society_features;
    }

    if (newpayload.water_source === '') {
      delete newpayload.water_source;
    }

    if (newpayload.property_features === '') {
      delete newpayload.property_features;
    }

    if (newpayload.furnishing_status === '') {
      delete newpayload.furnishing_status;
    }

    if (newpayload.furnishing_items === '') {
      delete newpayload.furnishing_items;
    }

    if (newpayload.furnishing_items === '') {
      delete newpayload.furnishing_items;
    }

    return newpayload;
  }

  if (payload.iwant === 'Rent' && payload.property_sub_type === 'Hospitality') {
    let newpayload = {
      iwant: payload.iwant,
      property_name: payload.property_name,
      property_type: payload.property_type,
      property_sub_type: payload.property_sub_type,
      posted_by: payload.property_owner,
      hospitality_type: payload.hospitality_type,
      transaction_type: payload.transaction_type,
      transaction_type_new: payload.transaction_type_new,
      ready_for_possession_by: payload.ready_for_possession_by,
      is_multi_level: payload.is_multi_level,
      level_count: isNaN(parseInt(payload.level_count)) ? 0 : parseInt(payload.level_count),
      total_rooms_on_level: isNaN(parseInt(payload.total_rooms_on_level)) ? 0 : parseInt(payload.total_rooms_on_level),
      total_floors: isNaN(parseInt(payload.total_floors)) ? 0 : parseInt(payload.total_floors),
      floor_no: payload.floor_no,
      property_area: isNaN(parseInt(payload.property_area)) ? 0 : parseInt(payload.property_area),
      property_area_units: payload.property_area_units,
      carpet_area: isNaN(parseInt(payload.carpet_area)) ? 0 : parseInt(payload.carpet_area),
      carpet_area_units: payload.carpet_area_units,
      undivided_share: isNaN(parseInt(payload.undivided_share)) ? 0 : parseInt(payload.undivided_share),
      undivided_share_units: payload.undivided_share_units,
      floor_types: payload.floor_types,
      kitchen_area_available: payload.kitchen_area_available,
      dining_area_available: payload.dining_area_available,
      property_age: payload.property_age,
      property_facing: payload.property_facing,
      property_features: payload.property_features,
      water_source: payload.water_source,
      wheeler_2_parking: payload.wheeler_2_parking,
      wheeler_4_parking: payload.wheeler_4_parking,
      visitor_parking: payload.visitor_parking,
      ownership: payload.ownership,
      existing_gallery: payload.existing_gallery,
      new_gallery: payload.new_gallery,
      // gallery: payload.gallery,
      locality: payload.locality,
      city: payload.city,
      block_no: payload.block_no,
      landmark: payload.landmark,
      state: payload.state,
      pincode: payload.pincode,
      country: payload.country,
      location: payload.location,
      road_street_no: payload.road_street_no,
      property_description: payload.property_description,
      rented_time: payload.rented_time,
      rent_amount: isNaN(parseInt(payload.rent_amount)) ? 0 : parseInt(payload.rent_amount),
      token_amount: isNaN(parseInt(payload.token_amount)) ? 0 : parseInt(payload.token_amount),
      token_amount_of_duration: payload.token_amount_of_duration,
      include_power_bill_charges: payload.include_power_bill_charges,
      include_water_bill_charges: payload.include_water_bill_charges,
      is_rent_agreement: payload.is_rent_agreement,
      agreement_duration_month: isNaN(parseInt(payload.agreement_duration_month))
        ? 0
        : parseInt(payload.agreement_duration_month),
      is_notice_period: payload.is_notice_period,
      notice_duration_month: isNaN(parseInt(payload.notice_duration_month))
        ? 0
        : parseInt(payload.notice_duration_month),
      property_documents: payload.property_documents,
      rera_number: payload.rera_number ? payload.rera_number : null,
      is_rera_verified: payload.is_rera_verified,
      additional_contact_details: payload.additional_contact_details,
    };

    if (newpayload.additional_contact_details === '') {
      delete newpayload.additional_contact_details;
    }

    if (newpayload.floor_types === '') {
      delete newpayload.floor_types;
    }
    if (newpayload.ready_for_possession_by === '') {
      delete newpayload.ready_for_possession_by;
    }
    if (newpayload.transaction_type === 'Pre_owned') {
      delete newpayload.transaction_type_new;
    }

    if (newpayload.water_source === '') {
      delete newpayload.water_source;
    }

    if (newpayload.property_features === '') {
      delete newpayload.property_features;
    }

    return newpayload;
  }

  if (payload.iwant === 'Rent' && payload.property_sub_type === 'Shop_And_Retail') {
    let newpayload = {
      iwant: payload.iwant,
      property_name: payload.property_name,
      property_type: payload.property_type,
      property_sub_type: payload.property_sub_type,
      posted_by: payload.property_owner,
      shop_retail_type: payload.shop_retail_type,
      type_of_retail: payload.type_of_retail,
      type_of_showroom: payload.type_of_showroom,
      transaction_type: payload.transaction_type,
      transaction_type_new: payload.transaction_type_new,
      ready_for_possession_by: payload.ready_for_possession_by,
      total_floors: isNaN(parseInt(payload.total_floors)) ? 0 : parseInt(payload.total_floors),
      floor_no: payload.floor_no,
      level_count: isNaN(parseInt(payload.level_count)) ? 0 : parseInt(payload.level_count),
      units_on_floor: isNaN(parseInt(payload.units_on_floor)) ? 0 : parseInt(payload.units_on_floor),
      property_area: isNaN(parseInt(payload.property_area)) ? 0 : parseInt(payload.property_area),
      property_area_units: payload.property_area_units,
      carpet_area: isNaN(parseInt(payload.carpet_area)) ? 0 : parseInt(payload.carpet_area),
      carpet_area_units: payload.carpet_area_units,
      undivided_share: isNaN(parseInt(payload.undivided_share)) ? 0 : parseInt(payload.undivided_share),
      undivided_share_units: payload.undivided_share_units,
      floor_types: payload.floor_types,
      kitchen_area_available: payload.kitchen_area_available,
      dining_area_available: payload.dining_area_available,
      property_age: payload.property_age,
      property_facing: payload.property_facing,
      property_features: payload.property_features,
      water_source: payload.water_source,
      wheeler_2_parking: payload.wheeler_2_parking,
      wheeler_4_parking: payload.wheeler_4_parking,
      visitor_parking: payload.visitor_parking,
      ownership: payload.ownership,
      existing_gallery: payload.existing_gallery,
      new_gallery: payload.new_gallery,
      // gallery: payload.gallery,
      locality: payload.locality,
      city: payload.city,
      block_no: payload.block_no,
      landmark: payload.landmark,
      state: payload.state,
      pincode: payload.pincode,
      country: payload.country,
      location: payload.location,
      road_street_no: payload.road_street_no,
      property_description: payload.property_description,
      rented_time: payload.rented_time,
      rent_amount: isNaN(parseInt(payload.rent_amount)) ? 0 : parseInt(payload.rent_amount),
      token_amount: isNaN(parseInt(payload.token_amount)) ? 0 : parseInt(payload.token_amount),
      token_amount_of_duration: payload.token_amount_of_duration,
      include_power_bill_charges: payload.include_power_bill_charges,
      include_water_bill_charges: payload.include_water_bill_charges,
      is_rent_agreement: payload.is_rent_agreement,
      agreement_duration_month: isNaN(parseInt(payload.agreement_duration_month))
        ? 0
        : parseInt(payload.agreement_duration_month),
      is_notice_period: payload.is_notice_period,
      notice_duration_month: isNaN(parseInt(payload.notice_duration_month))
        ? 0
        : parseInt(payload.notice_duration_month),
      property_documents: payload.property_documents,
      rera_number: payload.rera_number ? payload.rera_number : null,
      is_rera_verified: payload.is_rera_verified,
      additional_contact_details: payload.additional_contact_details,
    };

    if (newpayload.additional_contact_details === '') {
      delete newpayload.additional_contact_details;
    }

    if (newpayload.type_of_retail === '') {
      delete newpayload.type_of_retail;
    }

    if (newpayload.type_of_showroom === '') {
      delete newpayload.type_of_showroom;
    }

    if (newpayload.floor_types === '') {
      delete newpayload.floor_types;
    }
    if (newpayload.ready_for_possession_by === '') {
      delete newpayload.ready_for_possession_by;
    }

    if (newpayload.transaction_type === 'Pre_owned') {
      delete newpayload.transaction_type_new;
    }

    if (newpayload.water_source === '') {
      delete newpayload.water_source;
    }

    if (newpayload.property_features === '') {
      delete newpayload.property_features;
    }

    return newpayload;
  }

  if (payload.iwant === 'Rent' && payload.property_sub_type === 'Educational') {
    let newpayload = {
      iwant: payload.iwant,
      property_name: payload.property_name,
      property_type: payload.property_type,
      property_sub_type: payload.property_sub_type,
      posted_by: payload.property_owner,
      transaction_type: payload.transaction_type,
      transaction_type_new: payload.transaction_type_new,
      ready_for_possession_by: payload.ready_for_possession_by,
      total_floors: isNaN(parseInt(payload.total_floors)) ? 0 : parseInt(payload.total_floors),
      floor_no: payload.floor_no,
      total_units_of_floors: isNaN(parseInt(payload.total_units_of_floors))
        ? 0
        : parseInt(payload.total_units_of_floors),
      property_area: isNaN(parseInt(payload.property_area)) ? 0 : parseInt(payload.property_area),
      property_area_units: payload.property_area_units,
      carpet_area: isNaN(parseInt(payload.carpet_area)) ? 0 : parseInt(payload.carpet_area),
      carpet_area_units: payload.carpet_area_units,
      undivided_share: isNaN(parseInt(payload.undivided_share)) ? 0 : parseInt(payload.undivided_share),
      undivided_share_units: payload.undivided_share_units,
      floor_types: payload.floor_types,
      kitchen_area_available: payload.kitchen_area_available,
      dining_area_available: payload.dining_area_available,
      property_age: payload.property_age,
      property_facing: payload.property_facing,
      property_features: payload.property_features,
      water_source: payload.water_source,
      wheeler_2_parking: payload.wheeler_2_parking,
      wheeler_4_parking: payload.wheeler_4_parking,
      visitor_parking: payload.visitor_parking,
      ownership: payload.ownership,
      existing_gallery: payload.existing_gallery,
      new_gallery: payload.new_gallery,
      // gallery: payload.gallery,
      locality: payload.locality,
      city: payload.city,
      block_no: payload.block_no,
      landmark: payload.landmark,
      state: payload.state,
      pincode: payload.pincode,
      country: payload.country,
      location: payload.location,
      road_street_no: payload.road_street_no,
      property_description: payload.property_description,
      rented_time: payload.rented_time,
      rent_amount: isNaN(parseInt(payload.rent_amount)) ? 0 : parseInt(payload.rent_amount),
      token_amount: isNaN(parseInt(payload.token_amount)) ? 0 : parseInt(payload.token_amount),
      token_amount_of_duration: payload.token_amount_of_duration,
      include_power_bill_charges: payload.include_power_bill_charges,
      include_water_bill_charges: payload.include_water_bill_charges,
      is_rent_agreement: payload.is_rent_agreement,
      agreement_duration_month: isNaN(parseInt(payload.agreement_duration_month))
        ? 0
        : parseInt(payload.agreement_duration_month),
      is_notice_period: payload.is_notice_period,
      notice_duration_month: isNaN(parseInt(payload.notice_duration_month))
        ? 0
        : parseInt(payload.notice_duration_month),
      property_documents: payload.property_documents,
      rera_number: payload.rera_number ? payload.rera_number : null,
      is_rera_verified: payload.is_rera_verified,
      additional_contact_details: payload.additional_contact_details,
    };

    if (newpayload.additional_contact_details === '') {
      delete newpayload.additional_contact_details;
    }
    if (newpayload.floor_types === '') {
      delete newpayload.floor_types;
    }
    if (newpayload.ready_for_possession_by === '') {
      delete newpayload.ready_for_possession_by;
    }

    if (newpayload.transaction_type === 'Pre_owned') {
      delete newpayload.transaction_type_new;
    }

    if (newpayload.water_source === '') {
      delete newpayload.water_source;
    }

    if (newpayload.property_features === '') {
      delete newpayload.property_features;
    }

    return newpayload;
  }

  if (payload.iwant === 'Rent' && payload.property_sub_type === 'Office_Space') {
    let newpayload = {
      iwant: payload.iwant,
      property_name: payload.property_name,
      property_type: payload.property_type,
      property_sub_type: payload.property_sub_type,
      posted_by: payload.property_owner,
      transaction_type: payload.transaction_type,
      transaction_type_new: payload.transaction_type_new,
      ready_for_possession_by: payload.ready_for_possession_by,
      total_floors: isNaN(parseInt(payload.total_floors)) ? 0 : parseInt(payload.total_floors),
      floor_no: payload.floor_no,
      is_multi_level: payload.is_multi_level,
      total_units_of_floors: isNaN(parseInt(payload.total_units_of_floors))
        ? 0
        : parseInt(payload.total_units_of_floors),
      conference_hall_available: payload.conference_hall_available,
      conference_hall_count: isNaN(parseInt(payload.conference_hall_count))
        ? 0
        : parseInt(payload.conference_hall_count),
      private_cabin_available: payload.private_cabin_available,
      private_cabin_count: isNaN(parseInt(payload.private_cabin_count)) ? 0 : parseInt(payload.private_cabin_count),
      property_area: isNaN(parseInt(payload.property_area)) ? 0 : parseInt(payload.property_area),
      property_area_units: payload.property_area_units,
      carpet_area: isNaN(parseInt(payload.carpet_area)) ? 0 : parseInt(payload.carpet_area),
      carpet_area_units: payload.carpet_area_units,
      undivided_share: isNaN(parseInt(payload.undivided_share)) ? 0 : parseInt(payload.undivided_share),
      undivided_share_units: payload.undivided_share_units,
      floor_types: payload.floor_types,
      pantry: payload.pantry,
      washroom: payload.washroom,
      property_age: payload.property_age,
      property_facing: payload.property_facing,
      property_features: payload.property_features,
      water_source: payload.water_source,
      wheeler_2_parking: payload.wheeler_2_parking,
      wheeler_4_parking: payload.wheeler_4_parking,
      visitor_parking: payload.visitor_parking,
      ownership: payload.ownership,
      existing_gallery: payload.existing_gallery,
      new_gallery: payload.new_gallery,
      // gallery: payload.gallery,
      locality: payload.locality,
      city: payload.city,
      block_no: payload.block_no,
      landmark: payload.landmark,
      state: payload.state,
      pincode: payload.pincode,
      country: payload.country,
      location: payload.location,
      road_street_no: payload.road_street_no,
      property_description: payload.property_description,
      rented_time: payload.rented_time,
      rent_amount: isNaN(parseInt(payload.rent_amount)) ? 0 : parseInt(payload.rent_amount),
      token_amount: isNaN(parseInt(payload.token_amount)) ? 0 : parseInt(payload.token_amount),
      token_amount_of_duration: payload.token_amount_of_duration,
      include_power_bill_charges: payload.include_power_bill_charges,
      include_water_bill_charges: payload.include_water_bill_charges,
      is_rent_agreement: payload.is_rent_agreement,
      agreement_duration_month: isNaN(parseInt(payload.agreement_duration_month))
        ? 0
        : parseInt(payload.agreement_duration_month),
      is_notice_period: payload.is_notice_period,
      notice_duration_month: isNaN(parseInt(payload.notice_duration_month))
        ? 0
        : parseInt(payload.notice_duration_month),
      property_documents: payload.property_documents,
      rera_number: payload.rera_number ? payload.rera_number : null,
      is_rera_verified: payload.is_rera_verified,
      additional_contact_details: payload.additional_contact_details,
    };

    if (newpayload.additional_contact_details === '') {
      delete newpayload.additional_contact_details;
    }
    if (newpayload.floor_types === '') {
      delete newpayload.floor_types;
    }
    if (newpayload.ready_for_possession_by === '') {
      delete newpayload.ready_for_possession_by;
    }

    if (newpayload.transaction_type === 'Pre_owned') {
      delete newpayload.transaction_type_new;
    }

    if (newpayload.water_source === '') {
      delete newpayload.water_source;
    }

    if (newpayload.property_features === '') {
      delete newpayload.property_features;
    }

    return newpayload;
  }

  if (
    payload.iwant === 'Rent' &&
    payload.property_sub_type === 'Industrial' &&
    payload.property_type !== 'Land or Plot'
  ) {
    let newpayload = {
      iwant: payload.iwant,
      property_name: payload.property_name,
      property_type: payload.property_type,
      property_sub_type: payload.property_sub_type,
      posted_by: payload.property_owner,
      industry_type: payload.industry_type,
      transaction_type: payload.transaction_type,
      transaction_type_new: payload.transaction_type_new,
      ready_for_possession_by: payload.ready_for_possession_by,
      total_floors: isNaN(parseInt(payload.total_floors)) ? 0 : parseInt(payload.total_floors),
      floor_no: payload.floor_no,
      units_on_floor: isNaN(parseInt(payload.units_on_floor)) ? 0 : parseInt(payload.units_on_floor),
      property_area: isNaN(parseInt(payload.property_area)) ? 0 : parseInt(payload.property_area),
      property_area_units: payload.property_area_units,
      carpet_area: isNaN(parseInt(payload.carpet_area)) ? 0 : parseInt(payload.carpet_area),
      carpet_area_units: payload.carpet_area_units,
      undivided_share: isNaN(parseInt(payload.undivided_share)) ? 0 : parseInt(payload.undivided_share),
      undivided_share_units: payload.undivided_share_units,
      floor_types: payload.floor_types,
      kitchen_area_available: payload.kitchen_area_available,
      dining_area_available: payload.dining_area_available,
      property_age: payload.property_age,
      property_facing: payload.property_facing,
      property_features: payload.property_features,
      water_source: payload.water_source,
      wheeler_2_parking: payload.wheeler_2_parking,
      wheeler_4_parking: payload.wheeler_4_parking,
      visitor_parking: payload.visitor_parking,
      ownership: payload.ownership,
      existing_gallery: payload.existing_gallery,
      new_gallery: payload.new_gallery,
      // gallery: payload.gallery,
      locality: payload.locality,
      city: payload.city,
      block_no: payload.block_no,
      landmark: payload.landmark,
      state: payload.state,
      pincode: payload.pincode,
      country: payload.country,
      location: payload.location,
      road_street_no: payload.road_street_no,
      property_description: payload.property_description,
      rented_time: payload.rented_time,
      rent_amount: isNaN(parseInt(payload.rent_amount)) ? 0 : parseInt(payload.rent_amount),
      token_amount: isNaN(parseInt(payload.token_amount)) ? 0 : parseInt(payload.token_amount),
      token_amount_of_duration: payload.token_amount_of_duration,
      include_power_bill_charges: payload.include_power_bill_charges,
      include_water_bill_charges: payload.include_water_bill_charges,
      is_rent_agreement: payload.is_rent_agreement,
      agreement_duration_month: isNaN(parseInt(payload.agreement_duration_month))
        ? 0
        : parseInt(payload.agreement_duration_month),
      is_notice_period: payload.is_notice_period,
      notice_duration_month: isNaN(parseInt(payload.notice_duration_month))
        ? 0
        : parseInt(payload.notice_duration_month),
      property_documents: payload.property_documents,
      rera_number: payload.rera_number ? payload.rera_number : null,
      is_rera_verified: payload.is_rera_verified,
      additional_contact_details: payload.additional_contact_details,
    };

    if (newpayload.additional_contact_details === '') {
      delete newpayload.additional_contact_details;
    }

    if (newpayload.floor_types === '') {
      delete newpayload.floor_types;
    }
    if (newpayload.ready_for_possession_by === '') {
      delete newpayload.ready_for_possession_by;
    }

    if (newpayload.transaction_type === 'Pre_owned') {
      delete newpayload.transaction_type_new;
    }

    if (newpayload.water_source === '') {
      delete newpayload.water_source;
    }

    if (newpayload.property_features === '') {
      delete newpayload.property_features;
    }

    return newpayload;
  }

  if (payload.iwant === 'Rent' && payload.property_type === 'Land or Plot') {
    let newpayload = {
      iwant: payload.iwant,
      property_name: payload.property_name,
      property_type: payload.property_type,
      property_sub_type: payload.property_sub_type,
      posted_by: payload.property_owner,
      gated_community: payload.gated_community,
      society_features: payload.society_features,
      property_area: isNaN(parseInt(payload.property_area)) ? 0 : parseInt(payload.property_area),
      property_area_units: payload.property_area_units,
      property_facing: payload.property_facing,
      corner_property: payload.corner_property,
      front_facing_road_width: isNaN(parseInt(payload.front_facing_road_width))
        ? 0
        : parseInt(payload.front_facing_road_width),
      front_facing_road_width_unit: payload.front_facing_road_width_unit,
      side_facing_road_width: isNaN(parseInt(payload.side_facing_road_width))
        ? 0
        : parseInt(payload.side_facing_road_width),
      side_facing_road_width_unit: payload.side_facing_road_width_unit,
      boundary_fencing: payload.boundary_fencing,
      borewell: payload.borewell,
      ownership: payload.ownership,
      existing_gallery: payload.existing_gallery,
      new_gallery: payload.new_gallery,
      // gallery: payload.gallery,
      locality: payload.locality,
      city: payload.city,
      block_no: payload.block_no,
      landmark: payload.landmark,
      state: payload.state,
      pincode: payload.pincode,
      country: payload.country,
      location: payload.location,
      road_street_no: payload.road_street_no,
      property_description: payload.property_description,
      rented_time: payload.rented_time,
      rent_amount: isNaN(parseInt(payload.rent_amount)) ? 0 : parseInt(payload.rent_amount),
      token_amount: isNaN(parseInt(payload.token_amount)) ? 0 : parseInt(payload.token_amount),
      token_amount_of_duration: payload.token_amount_of_duration,
      include_power_bill_charges: payload.include_power_bill_charges,
      include_water_bill_charges: payload.include_water_bill_charges,
      is_rent_agreement: payload.is_rent_agreement,
      agreement_duration_month: isNaN(parseInt(payload.agreement_duration_month))
        ? 0
        : parseInt(payload.agreement_duration_month),
      is_notice_period: payload.is_notice_period,
      notice_duration_month: isNaN(parseInt(payload.notice_duration_month))
        ? 0
        : parseInt(payload.notice_duration_month),
      property_documents: payload.property_documents,
      dtcp_number: payload.dtcp_number ? payload.dtcp_number : null,
      is_dtcp_verified: payload.is_dtcp_verified,
      additional_contact_details: payload.additional_contact_details,
    };

    if (newpayload.additional_contact_details === '') {
      delete newpayload.additional_contact_details;
    }

    if (newpayload.society_features === '') {
      delete newpayload.society_features;
    }
    return newpayload;
  }

  if (payload.iwant === 'Coliving') {
    let newpayload = {
      iwant: payload.iwant,
      property_name: payload.property_name,
      property_type: 'Coliving',

      property_sub_type: payload.property_sub_type,
      posted_by: payload.property_owner,
      total_floors: isNaN(parseInt(payload.total_floors)) ? 0 : parseInt(payload.total_floors),
      floor_no: payload.floor_no,
      bhk: payload.bhk,
      washroom: payload.washroom,
      property_features: payload.property_features,
      coliving_type: payload.coliving_type,
      occupancy: payload.occupancy,
      gender_preference: payload.gender_preference,
      existing_gallery: payload.existing_gallery,
      new_gallery: payload.new_gallery,
      // gallery: payload.gallery,
      property_description: payload.property_description,
      locality: payload.locality,
      city: payload.city,
      block_no: payload.block_no,
      landmark: payload.landmark,
      state: payload.state,
      pincode: payload.pincode,
      country: payload.country,
      location: payload.location,
      road_street_no: payload.road_street_no,
      rented_time: payload.rented_time,
      rent_amount: isNaN(parseInt(payload.rent_amount)) ? 0 : parseInt(payload.rent_amount),
      token_amount: isNaN(parseInt(payload.token_amount)) ? 0 : parseInt(payload.token_amount),
      token_amount_of_duration: payload.token_amount_of_duration,
      include_power_bill_charges: payload.include_power_bill_charges,
      include_water_bill_charges: payload.include_water_bill_charges,
      is_rent_agreement: payload.is_rent_agreement,
      agreement_duration_month: isNaN(parseInt(payload.agreement_duration_month))
        ? 0
        : parseInt(payload.agreement_duration_month),
      is_notice_period: payload.is_notice_period,
      notice_duration_month: isNaN(parseInt(payload.notice_duration_month))
        ? 0
        : parseInt(payload.notice_duration_month),
      property_documents: payload.property_documents,
      rera_number: payload.rera_number ? payload.rera_number : null,
      is_rera_verified: payload.is_rera_verified,
      additional_contact_details: payload.additional_contact_details,
    };

    if (newpayload.occupancy === '') {
      delete newpayload.occupancy;
    }

    if (newpayload.washroom === '') {
      delete newpayload.washroom;
    }

    if (newpayload.additional_contact_details === '') {
      delete newpayload.additional_contact_details;
    }

    if (newpayload.property_features === '') {
      delete newpayload.property_features;
    }

    return newpayload;
  }
}
