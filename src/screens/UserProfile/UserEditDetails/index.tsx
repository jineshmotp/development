import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';

import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import moment from 'moment';

import DetailSectionHeader from '@/components/common/DetailSectionHeader';
import DetailSectionPart from '@/components/common/DetailSectionPart';
import Divider from '@/components/common/Divider';
import HeaderBar from '@/components/common/HeaderBar';
import SocialMediaElement from '@/components/userprofile/SocialMediaElement';
import AgentBasicInfo from '@/components/userprofileupdate/AgentBasicInfo';
import EditUserContactInfo from '@/components/userprofileupdate/EditUserContactInfo';
import SocialLinksEdit from '@/components/userprofileupdate/SocialLinksEdit';
import UserBasicInfo from '@/components/userprofileupdate/UserBasicInfo';
import UserLookingForUpdate from '@/components/userprofileupdate/UserLookingForUpdate';
import UserOperatingDetails from '@/components/userprofileupdate/UserOperatingDetails';
import UserProjectDetails from '@/components/userprofileupdate/UserProjectDetails';
import UserPropertyUpdate from '@/components/userprofileupdate/UserPropoertyUpdate';
import { isArray } from '@/constants/function/isArray';
import { Container } from '@/custom/Container';
import RNView from '@/custom/RNView';
import { useAppSelector } from '@/hooks/reduxHooks';
import { getUserData } from '@/redux/login/loginReducer';
import {
  useGetBuyerForQuery,
  useGetLookingForDataQuery,
  useGetTenantForQuery,
} from '@/redux/onboarding/onboardingService';
import { RootStackParamList } from '@/routes/RootNavigator';
import { deviceHeight, deviceWidth, px } from '@/utils';

import { styles } from './styles';

const UserEditDetails = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<RootStackParamList, 'USER_EDIT_DETAILS'>>();
  const [isInfoVisible, setIsInfoVisible] = useState<boolean>(false);
  const [isAgentInfoVisible, setIsAgentInfoVisible] = useState<boolean>(false);
  const [isSocialModal, setIsSocialModal] = useState<boolean>(false);
  const [isOpenContact, setIsOpenContact] = useState<boolean>(false);
  const [screenName, setScreenName] = useState<string>('Contact Info');
  const selectedData = useAppSelector(getUserData);
  const [isProjectDetails, setIsProjectDetails] = useState(false);
  const [isOperatingDetails, setOperatingDetails] = useState(false);
  const [isLookingFor, setIsLookingFor] = useState(false);
  const [isPropertyUpdate, setIsPropertyUpdate] = useState(false);

  const { data: lookingData } = useGetLookingForDataQuery({});
  const { data: tenantData } = useGetTenantForQuery({});
  const { data: buyerData } = useGetBuyerForQuery({});

  const [allItems, setAllItems] = useState([]);

  // console.log('selectedData++++++++++++++++', selectedData);

  const convertDate = strDate => {
    const date = new Date(strDate);
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    const suffixes = ['th', 'st', 'nd', 'rd'];
    let day = date.getDate();
    let suffix = suffixes[0];
    if (day % 10 >= 1 && day % 10 <= 3 && (day < 10 || day > 20)) {
      suffix = suffixes[day % 10];
    }
    const formattedDate = `${months[date.getMonth()]} ${day}${suffix}, ${date.getFullYear()}`;

    return formattedDate;
  };

  useEffect(() => {
    const renderData = (subRole: string) => {
      if (selectedData?.role === 'USER') {
        switch (subRole) {
          case 'OWNER':
            return lookingData?.data;

          case 'TENANT':
            return tenantData?.data;

          case 'BUYER':
            return buyerData?.data;

          default:
            return [];
        }
      }
    };

    const values = renderData(selectedData?.user_sub_role);

    // console.log('data of of flatlist', JSON.stringify(renderData(selectedData?.user_sub_role)));

    // Set initial values from Redux state if available
    setAllItems(values);
  }, []);

  return (
    <Container isTab={false} backgroundColor="white" hasHeader={true}>
      <HeaderBar
        label="Edit Details"
        // backIcon={<Entypo name="chevron-thin-left" size={20} color="black" />}
        backPress={() => navigation.goBack()}
      />
      <ScrollView
        contentContainerStyle={styles.contentContainerStyle}
        style={styles.scrollStyle}
        showsVerticalScrollIndicator={false}
        // ref={ref}
      >
        <RNView style={styles.sectionContainer}>
          {/* <DetailSectionHeader
            Heading={"Intro"}
            btnText={data?.intro ? "Edit" : ""}
            editBtnFunction={() => {
              navigation.navigate("EditIntroScreen", data);
            }}
          /> */}
          {/* <RNView
            style={{
              justifyContent: "center",
              alignItems: "center",
              padding: 10,
            }}
          >
            {data?.intro ? (
              <Text style={styles.editTextStyle}>{data.intro}</Text>
            ) : (
              <Text
                onPress={() => navigation.navigate("EditIntroScreen", data)}
                style={styles.editTextStyle}
              >
                Describe yourself...
              </Text>
            )}
          </RNView> */}
          {/* <Divider
            borderColor="#D9D6D6"
            dividerWidth={deviceWidth}
            style={{
              marginTop: 10,
            }}
          /> */}

          {/* ==============LOCATION START================ */}

          <DetailSectionHeader Heading={'Location'} btnText={''} editBtnFunction={() => {}} />

          <DetailSectionPart
            iconName={'location'}
            lable={selectedData?.city ? selectedData?.city : 'Add Current City'}
            sublable={selectedData?.city ? 'City' : ''}
            editBtn={selectedData?.city ? true : false}
            editIcon={selectedData?.city ? true : false}
            editFunction={() => {
              setScreenName('City');
              setIsOpenContact(true);
            }}
          />
          <Divider
            borderColor="#D9D6D6"
            dividerWidth={deviceWidth}
            style={
              {
                // marginVertical: 10,
              }
            }
          />
          <DetailSectionPart
            iconName={'location'}
            lable={selectedData?.state ? selectedData.state : 'Add State'}
            sublable={selectedData?.state ? 'State' : ''}
            editBtn={selectedData?.state ? true : false}
            editIcon={selectedData?.state ? true : false}
            editFunction={() => {
              setScreenName('State');
              setIsOpenContact(true);
            }}
          />
          {/* <Divider
            borderColor="#D9D6D6"
            dividerWidth={deviceWidth}
            style={
              {
                // marginVertical: 10,
              }
            }
          />
          <DetailSectionPart
            iconName={'location'}
            lable={selectedData?.country ? selectedData.country : 'Add Country'}
            sublable={selectedData?.country ? 'Country' : ''}
            editBtn={selectedData?.country ? true : false}
            editIcon={selectedData?.country ? true : false}
            editFunction={() => {
              setScreenName('Country');
              setIsOpenContact(true);
            }}
          /> */}

          {/*=============== CONTACT INFO============== */}

          {/* <DetailSectionHeader Heading={'Contact Info'} btnText={''} editBtnFunction={() => {}} />
          <DetailSectionPart
            iconName={'mobile'}
            lable={selectedData?.mobile_no ? selectedData.mobile_no : 'Add Mobile Number'}
            sublable={selectedData?.mobile_no ? 'Mobile Number' : ''}
            editBtn={false}
            editIcon={false}
            editFunction={() => {
              // navigation.navigate("EditUserMobileNumber", selectedData);
            }}
            verifed={true}
          /> */}
          <Divider
            borderColor="#D9D6D6"
            dividerWidth={deviceWidth}
            style={
              {
                // marginVertical: 10,
              }
            }
          />
          <DetailSectionPart
            iconName={'Email'}
            lable={selectedData?.email ? selectedData.email : 'Add Email'}
            sublable={selectedData?.email ? 'Email' : ''}
            editBtn={selectedData?.email ? true : false}
            editIcon={selectedData?.email ? true : false}
            editFunction={() => {
              navigation.navigate('EDIT_USER_EMAIL');
            }}
            verifed={selectedData?.isVerifiedEmail}
          />
          <Divider
            borderColor="#D9D6D6"
            dividerWidth={deviceWidth}
            style={
              {
                // marginVertical: 10,
              }
            }
          />
          <DetailSectionPart
            iconName={'web'}
            lable={selectedData?.website ? selectedData.website : 'Add Website'}
            sublable={selectedData?.website ? 'Website' : ''}
            editBtn={selectedData?.website ? true : false}
            editIcon={selectedData?.website ? true : false}
            editFunction={() => {
              setScreenName('Website');
              setIsOpenContact(true);
            }}
          />
          <Divider
            borderColor="#D9D6D6"
            dividerWidth={deviceWidth}
            style={
              {
                // marginVertical: 10,
              }
            }
          />
          <DetailSectionPart
            iconName={'location'}
            lable={
              selectedData?.address_lane1
                ? `${selectedData.address_lane1}, ${selectedData.address_lane2}`
                : 'Add Complete Address'
            }
            sublable={selectedData?.address_lane1 ? 'Address' : ''}
            editBtn={selectedData?.address_lane1 ? true : false}
            editIcon={selectedData?.address_lane1 ? true : false}
            editFunction={() => {
              setScreenName('Address');
              setIsOpenContact(true);
            }}
          />
          <Divider
            borderColor="#D9D6D6"
            dividerWidth={deviceWidth}
            style={
              {
                // marginVertical: 10,
              }
            }
          />
          <DetailSectionPart
            iconName={'location'}
            lable={selectedData?.pincode ? selectedData.pincode : 'Add Pincode'}
            sublable={selectedData?.pincode ? 'Pincode' : ''}
            editBtn={selectedData?.pincode ? true : false}
            editIcon={selectedData?.pincode ? true : false}
            editFunction={() => {
              setScreenName('Pincode');
              setIsOpenContact(true);
            }}
          />
          {/*=============== BASIC INFO============== */}

          <DetailSectionHeader
            Heading={'Basic Info'}
            btnText={'Edit'}
            editBtnFunction={() => {
              setIsInfoVisible(true);
            }}
          />
          <DetailSectionPart
            iconName={'user'}
            lable={selectedData?.fname ? `${selectedData.fname} ${selectedData.lname}` : 'Add Full Name'}
            sublable={selectedData?.fname ? 'Full Name' : ''}
            editBtn={false}
            editIcon={false}
            editFunction={() => {
              setIsInfoVisible(true);
            }}
            labelCapitalise={true}
          />
          <Divider
            borderColor="#D9D6D6"
            dividerWidth={deviceWidth}
            style={
              {
                // marginVertical: 10,
              }
            }
          />
          <DetailSectionPart
            iconName={'user'}
            lable={selectedData?.bio ? `${selectedData.bio}` : 'Add Full Name'}
            sublable={selectedData?.bio ? 'Bio' : ''}
            editBtn={false}
            editIcon={false}
            editFunction={() => {
              setIsInfoVisible(true);
            }}
            labelCapitalise={true}
          />
          <Divider
            borderColor="#D9D6D6"
            dividerWidth={deviceWidth}
            style={
              {
                // marginVertical: 10,
              }
            }
          />
          {selectedData?.role === 'BUILDER' || selectedData?.role === 'AGENT' ? (
            <>
              <DetailSectionPart
                iconName={'user'}
                lable={selectedData?.company_name ? selectedData.company_name : 'Add Gender'}
                sublable={selectedData?.company_name ? 'Company Name' : ''}
                editBtn={false}
                editIcon={false}
                editFunction={() => {
                  setIsInfoVisible(true);
                }}
              />
              <Divider
                borderColor="#D9D6D6"
                dividerWidth={deviceWidth}
                style={
                  {
                    // marginVertical: 10,
                  }
                }
              />
            </>
          ) : (
            <></>
          )}

          {selectedData?.role === 'BUILDER' || selectedData?.role === 'AGENT' ? (
            <></>
          ) : (
            <>
              <DetailSectionPart
                iconName={'user'}
                lable={selectedData?.gender ? selectedData.gender : 'Add Gender'}
                sublable={selectedData?.gender ? 'Gender' : ''}
                editBtn={false}
                editIcon={false}
                editFunction={() => {
                  setIsInfoVisible(true);
                }}
              />
              <Divider
                borderColor="#D9D6D6"
                dividerWidth={deviceWidth}
                style={
                  {
                    // marginVertical: 10,
                  }
                }
              />

              <DetailSectionPart
                iconName={'birthday'}
                lable={
                  selectedData?.dob
                    ? selectedData?.dob?.length > 11
                      ? moment(selectedData?.dob).format('MM-DD-YYYY')
                      : moment(moment(selectedData?.dob, 'MM-DD-YYYY').toISOString()).format('MM-DD-YYYY')
                    : 'Add Date Of Birth'
                }
                sublable={selectedData?.dob ? 'Date of birth' : ''}
                editBtn={false}
                editIcon={false}
                editFunction={() => {
                  setIsInfoVisible(true);
                }}
              />
              <Divider
                borderColor="#D9D6D6"
                dividerWidth={deviceWidth}
                style={
                  {
                    // marginVertical: 10,
                  }
                }
              />
            </>
          )}

          {/*============= BUILDER INFO =========== */}
          {selectedData?.role === 'BUILDER' || selectedData?.role === 'AGENT' ? (
            <>
              {selectedData?.languages?.length > 0 && (
                <>
                  <DetailSectionPart
                    iconName={'Email'}
                    lable={selectedData?.languages ? selectedData?.languages.join(', ') : 'Add Languages'}
                    sublable={selectedData?.languages ? 'Languages' : ''}
                  />
                  <Divider
                    borderColor="#D9D6D6"
                    dividerWidth={deviceWidth}
                    style={
                      {
                        // marginVertical: 10,
                      }
                    }
                  />
                </>
              )}
              {selectedData?.rera_id && (
                <>
                  <DetailSectionPart
                    iconName={'mobile'}
                    lable={selectedData?.rera_id ? selectedData.rera_id : 'Add Rear ID'}
                    sublable={selectedData?.rera_id ? 'Rear ID' : ''}
                  />
                  <Divider
                    borderColor="#D9D6D6"
                    dividerWidth={deviceWidth}
                    style={
                      {
                        // marginVertical: 10,
                      }
                    }
                  />
                </>
              )}

              {/* ===============PROJECT DETAILS START==============*/}

              {selectedData?.role === 'BUILDER' || selectedData?.role === 'AGENT' ? (
                <>
                  {selectedData?.deal_property_type?.length > 0 && (
                    <DetailSectionHeader
                      Heading={'Project Details'}
                      btnText={'Edit'}
                      editBtnFunction={() => {
                        // console.log('cjeoing on thtee selected detaols', JSON.stringify(selectedData));

                        setIsProjectDetails(!isProjectDetails);
                      }}
                    />
                  )}

                  {selectedData?.role === 'AGENT' ? (
                    selectedData?.AGENT?.deal_transaction_type && (
                      <>
                        <DetailSectionPart
                          iconName={'mobile'}
                          lable={
                            selectedData?.AGENT?.deal_transaction_type?.length > 0
                              ? selectedData?.AGENT?.deal_transaction_type?.join(', ')
                              : 'Add Transaction Type'
                          }
                          sublable={
                            selectedData?.AGENT?.deal_transaction_type?.length > 0 ? 'Deal Transaction Type' : ''
                          }
                        />
                        <Divider
                          borderColor="#D9D6D6"
                          dividerWidth={deviceWidth}
                          style={
                            {
                              // marginVertical: 10,
                            }
                          }
                        />
                      </>
                    )
                  ) : (
                    <></>
                  )}

                  {selectedData?.BUILDER?.builder_type?.length > 0 && (
                    <>
                      <DetailSectionPart
                        iconName={'mobile'}
                        lable={
                          selectedData?.BUILDER?.builder_type?.length > 0
                            ? selectedData?.BUILDER?.builder_type?.join(', ')
                            : 'Add Property Type'
                        }
                        sublable={selectedData?.BUILDER?.builder_type?.length > 0 ? 'Building Type' : ''}
                      />
                      <Divider
                        borderColor="#D9D6D6"
                        dividerWidth={deviceWidth}
                        style={
                          {
                            // marginVertical: 10,
                          }
                        }
                      />
                    </>
                  )}
                  {selectedData?.deal_property_type?.length > 0 && (
                    <>
                      <DetailSectionPart
                        iconName={'location'}
                        lable={
                          selectedData?.deal_property_type?.length > 0
                            ? selectedData?.deal_property_type?.join(', ')
                            : 'Add Property Type'
                        }
                        sublable={selectedData?.deal_property_type?.length > 0 ? 'Dealing Property Type' : ''}
                      />
                    </>
                  )}

                  {/* ===============OPERATING CITIES START==============*/}
                  {selectedData?.operating_location?.length > 0 && (
                    <DetailSectionHeader
                      Heading={'Operating Cities & Areas'}
                      btnText={'Edit'}
                      editBtnFunction={() => {
                        setOperatingDetails(true);
                      }}
                    />
                  )}

                  {selectedData?.operating_location?.length > 0 && (
                    <>
                      {selectedData?.operating_location?.length > 0 ? (
                        selectedData?.operating_location?.map(item => {
                          return (
                            <>
                              <DetailSectionPart
                                iconName={'mobile'}
                                lable={selectedData?.operating_location?.length > 0 ? item?.city : 'Add Property Type'}
                                sublable={selectedData?.operating_location?.length > 0 ? 'Operating City' : ''}
                              />
                              <Divider
                                borderColor="#D9D6D6"
                                dividerWidth={deviceWidth}
                                style={
                                  {
                                    // marginVertical: 10,
                                  }
                                }
                              />
                              {item?.locality?.length > 0 ? (
                                <>
                                  <DetailSectionPart
                                    iconName={'location'}
                                    lable={
                                      item?.locality?.length > 0 ? item?.locality?.join(', ') : 'Add Property Type'
                                    }
                                    sublable={item?.locality?.length > 0 ? 'Operating Location' : ''}
                                  />
                                  <Divider
                                    borderColor="#D9D6D6"
                                    dividerWidth={deviceWidth}
                                    style={
                                      {
                                        // marginVertical: 10,
                                      }
                                    }
                                  />
                                </>
                              ) : (
                                <></>
                              )}
                            </>
                          );
                        })
                      ) : (
                        <></>
                      )}
                    </>
                    // <>
                    //   <DetailSectionPart
                    //     iconName={'mobile'}
                    //     lable={
                    //       selectedData?.operating_location?.length > 0
                    //         ? selectedData?.operating_location[0]?.city
                    //         : 'Add Property Type'
                    //     }
                    //     sublable={selectedData?.operating_location?.length > 0 ? 'Operating City' : ''}
                    //   />
                    //   <Divider
                    //     borderColor="#D9D6D6"
                    //     dividerWidth={deviceWidth}
                    //     style={
                    //       {
                    //         // marginVertical: 10,
                    //       }
                    //     }
                    //   />
                    //   {selectedData?.operating_location[0]?.locality?.length > 0 ? (
                    //     <>
                    //       <DetailSectionPart
                    //         iconName={'location'}
                    //         lable={
                    //           selectedData?.operating_location[0]?.locality?.length > 0
                    //             ? selectedData?.operating_location[0]?.locality[0]
                    //             : 'Add Property Type'
                    //         }
                    //         sublable={
                    //           selectedData?.operating_location[0]?.locality?.length > 0 ? 'Operating Location' : ''
                    //         }
                    //       />
                    //     </>
                    //   ) : (
                    //     <></>
                    //   )}
                    //   {/* ===================OPERATING DAYS====================== */}
                    // </>
                  )}
                </>
              ) : (
                <></>
              )}

              {selectedData?.operating_since && (
                <>
                  <DetailSectionPart
                    iconName={'location'}
                    lable={
                      selectedData?.operating_since ? convertDate(selectedData?.operating_since) : 'Add operating date'
                    }
                    sublable={selectedData?.operating_since ? 'Operating Since' : ''}
                  />
                </>
              )}
            </>
          ) : (
            <></>
          )}

          {selectedData?.role == 'USER' ? (
            <>
              {selectedData?.looking_for?.length > 0 ? (
                <>
                  <DetailSectionHeader
                    btnText={'Edit'}
                    editBtnFunction={() => {
                      console.log('selected details', JSON.stringify(selectedData));
                      setIsLookingFor(true);
                      // setIsProjectDetails(!isProjectDetails);
                    }}
                    Heading={'Looking for'}
                  />
                  <DetailSectionPart
                    iconName={'mobile'}
                    lable={
                      selectedData?.looking_for?.length > 0
                        ? selectedData?.looking_for?.join(', ')
                        : 'Add Transaction Type'
                    }
                    sublable={selectedData?.looking_for?.length > 0 ? 'Looking for' : ''}
                  />
                  <Divider
                    borderColor="#D9D6D6"
                    dividerWidth={deviceWidth}
                    style={
                      {
                        // marginVertical: 10,
                      }
                    }
                  />
                </>
              ) : (
                <></>
              )}
              {selectedData?.property_preference?.length > 0 ? (
                <>
                  <DetailSectionHeader
                    btnText={'Edit'}
                    editBtnFunction={() => {
                      console.log('selected details', JSON.stringify(selectedData));
                      setIsPropertyUpdate(true);
                      // setIsProjectDetails(!isProjectDetails);
                    }}
                    Heading={'Property Details'}
                  />
                  <DetailSectionPart
                    iconName={'mobile'}
                    lable={
                      selectedData?.property_preference?.length > 0
                        ? selectedData?.property_preference?.join(', ')
                        : 'Add Transaction Type'
                    }
                    sublable={selectedData?.property_preference?.length > 0 ? 'Property Preference' : ''}
                  />
                  <Divider
                    borderColor="#D9D6D6"
                    dividerWidth={deviceWidth}
                    style={
                      {
                        // marginVertical: 10,
                      }
                    }
                  />
                </>
              ) : (
                <></>
              )}
            </>
          ) : (
            <></>
          )}

          {/*=============== AGENT INFO============== */}

          {selectedData?.agent_data?.company_name ||
          selectedData?.agent_data?.intro ||
          selectedData?.agent_data?.operating_since ? (
            <DetailSectionHeader
              Heading={'Agent Info'}
              btnText={'Edit'}
              editBtnFunction={() => {
                setIsAgentInfoVisible(true);
              }}
            />
          ) : (
            <RNView></RNView>
          )}

          {selectedData?.agent_data?.company_name ? (
            <>
              <DetailSectionPart
                iconName={'user'}
                lable={
                  selectedData?.agent_data?.company_name
                    ? `${selectedData?.agent_data?.company_name}`
                    : 'Add Company Name'
                }
                sublable={selectedData?.agent_data?.company_name ? 'Agency/Company name' : ''}
                editBtn={false}
                editIcon={false}
                editFunction={() => {
                  setIsAgentInfoVisible(true);
                }}
                labelCapitalise={true}
              />
              <Divider
                borderColor="#D9D6D6"
                dividerWidth={deviceWidth}
                style={
                  {
                    // marginVertical: 10,
                  }
                }
              />
            </>
          ) : (
            <RNView></RNView>
          )}
          {selectedData?.agent_data?.intro ? (
            <>
              <DetailSectionPart
                iconName={'user'}
                lable={selectedData?.agent_data?.intro ? `${selectedData?.agent_data?.intro}` : 'Add Description'}
                sublable={selectedData?.agent_data?.intro ? 'Description' : ''}
                editBtn={false}
                editIcon={false}
                editFunction={() => {
                  setIsAgentInfoVisible(true);
                }}
                labelCapitalise={true}
              />
              <Divider
                borderColor="#D9D6D6"
                dividerWidth={deviceWidth}
                style={
                  {
                    // marginVertical: 10,
                  }
                }
              />
            </>
          ) : (
            <RNView></RNView>
          )}
          {selectedData?.agent_data?.operating_since ? (
            <DetailSectionPart
              iconName={'user'}
              lable={
                selectedData?.agent_data?.operating_since
                  ? `${new Date(selectedData?.agent_data?.operating_since).getFullYear()}`
                  : 'Add Operating Since'
              }
              sublable={selectedData?.agent_data?.operating_since ? 'Operating Since' : ''}
              editBtn={false}
              editIcon={false}
              editFunction={() => {
                isAgentInfoVisible(true);
              }}
              labelCapitalise={true}
            />
          ) : (
            <RNView></RNView>
          )}

          <DetailSectionHeader
            Heading={'Social media links'}
            btnText={'Edit'}
            editBtnFunction={() => {
              setIsSocialModal(true);
            }}
          />
          {isArray(selectedData?.social_media) ? (
            <RNView style={{ paddingVertical: 10 }}>
              {selectedData?.social_media?.map((item, ind) => {
                return <SocialMediaElement key={ind} platform={item?.key} acc_name={item?.value} />;
              })}
            </RNView>
          ) : (
            <DetailSectionPart
              iconName={'high-school'}
              lable={isArray(selectedData?.social_media) ? selectedData?.social_media : 'Add social links'}
              sublable={isArray(selectedData?.social_media) ? 'Social link' : ''}
              editBtn={false}
              editIcon={false}
              editFunction={() => {
                setIsSocialModal(true);
              }}
            />
          )}
          <Divider
            borderColor="#D9D6D6"
            dividerWidth={deviceWidth}
            style={
              {
                // marginVertical: 10,
              }
            }
          />
          {/* <DetailSectionHeader
            Heading={"Following"}
            btnText={"See all"}
            editBtnFunction={() => {
              navigation.navigate("Userfollowerlist");
            }}
          />
          <RNView style={styles.sectionDetailPart}>
            <RNView style={{ width: deviceWidth / 1.09 }}>
              {[
                "Xavier Properties",
                "Aparna Constructions",
                "Suvarna Construction",
              ].map((item, ind) => {
                return (
                  <RNView key={ind}>
                    <RNView
                      style={{
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        marginVertical: 5,
                      }}
                    >
                      <Image
                        style={styles.followImg}
                        source={require("../../../../../assets/images/customImage/dummy.png")}
                      />
                      <Text style={styles.followerText}>{item}</Text>
                    </RNView>
                    <Divider
                      borderColor="#D9D6D6"
                      dividerWidth={deviceWidth}
                      style={
                        {
                          // marginVertical: 10,
                        }
                      }
                    />
                  </RNView>
                );
              })}
            </RNView>
          </RNView> */}

          {/* <DetailSectionHeader Heading={"Location"} btnText={""} editBtnFunction={()=>{}} /> */}

          {/* =================CONTACT DETAIL END HERE================== */}

          {/* <RNView style={styles.separator} /> */}
        </RNView>
      </ScrollView>
      {/* USER BASIC INFO MODAL */}
      <UserBasicInfo
        isVisible={isInfoVisible}
        onPressClose={() => setIsInfoVisible(!isInfoVisible)}
        userData={selectedData}
      />
      {/* PROJECT DETAILS MODAL */}
      <UserProjectDetails
        isVisible={isProjectDetails}
        onPressClose={() => {
          setIsProjectDetails(false);
        }}
        userData={selectedData}
      />
      {/* LOOKING FOR */}
      <UserLookingForUpdate
        isVisible={isLookingFor}
        lookingForList={allItems}
        onPressClose={() => {
          setIsLookingFor(false);
        }}
        responseList={selectedData?.looking_for}
        userData={selectedData}
      />
      {/* PROPERTY DETAILS */}
      {selectedData?.property_preference?.length > 0 ? (
        <UserPropertyUpdate
          isVisible={isPropertyUpdate}
          onPressClose={() => {
            setIsPropertyUpdate(false);
          }}
          responseList={selectedData?.property_preference}
          userData={selectedData}
        />
      ) : (
        <></>
      )}
      {/* OPERATING CITIES AND AREAS */}
      <UserOperatingDetails
        isVisible={isOperatingDetails}
        operatingListData={selectedData}
        onPressClose={() => {
          setOperatingDetails(false);
        }}
      />
      <AgentBasicInfo
        isVisible={isAgentInfoVisible}
        onPressClose={() => setIsInfoVisible(!isInfoVisible)}
        userData={selectedData}
      />
      {/* SOCIAL LINK MODAL */}
      <SocialLinksEdit
        isVisible={isSocialModal}
        onPressClose={() => setIsSocialModal(!isSocialModal)}
        userInfoData={selectedData?.social_media ? selectedData?.social_media : []}
      />

      {/* CONTACT INFO */}
      <EditUserContactInfo
        screenName={screenName}
        data={selectedData}
        isVisible={isOpenContact}
        onPressClose={() => setIsOpenContact(!isOpenContact)}
      />
    </Container>
  );
};

export default UserEditDetails;
