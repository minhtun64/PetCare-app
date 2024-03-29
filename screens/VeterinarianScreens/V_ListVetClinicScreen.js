import {
  TouchableOpacity,
  Button,
  Text,
  StyleSheet,
  View,
  Image,
  ScrollView,
  Dimensions,
} from "react-native";
import React, { useState, useEffect } from "react";
import { database } from "../../firebase";
import { ref, get } from "firebase/database";

export default function V_ListVetClinicScreen({ navigation, route }) {
  const { provinceName, districtName, wardName } = route.params;

  const [clinicData, setData] = useState([]);

  useEffect(() => {
    // Truy van du lieu tu Firebase Realtime Database
    fetchDataFromFirebase();
  }, []);

  const fetchDataFromFirebase = async () => {
    const clinicRef = ref(database, 'clinic');

    const clinicSnapshot = await get(clinicRef);
    const data = clinicSnapshot.val();

    var matchedProvince = [];
    var matchedDistrict = [];
    var matchedWard = [];

    data.forEach((item) => {
      if (item !== undefined) {
        const address = item.address;
        const addressParts = address.split(',');

        const province = addressParts[3].trim();
        const district = addressParts[2].trim();
        const ward = addressParts[1].trim();

        if (province === provinceName) {
          matchedProvince.push(item);
          if (district === districtName) {
            matchedDistrict.push(item);
            if (ward === wardName) {
              matchedWard.push(item);
            }
          }
        }
      }
    });

    if (matchedWard.length != 0) {
      setData(matchedWard);
    } else if (matchedDistrict.length != 0) {
      setData(matchedDistrict);
    } else if (matchedProvince.length != 0) {
      setData(matchedProvince);
    } else {
      setData(data);
    }
  };

  return (
    <View style={styles.wrapping}>
      <View style={[styles.header, styles.row]}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Image
            style={styles.backIcon}
            source={require("../../assets/icons/V_backIconMain.png")}
          ></Image>
        </TouchableOpacity>
        <View style={[styles.headerTitle, styles.row]}>
          <Text style={styles.headerText}>Đặt lịch hẹn</Text>
          {/* <Image style={styles.headerImg} source={require('../../assets/icons/V_bookingVetHeader.png')}></Image> */}
        </View>
      </View>
      <View style={[styles.title, styles.row]}>
        <Image style={styles.titleImg} source={require('../../assets/icons/V_VetClinicLocation.png')}></Image>
        <Text style={styles.titleText}>Các phòng khám ở gần bạn</Text>
      </View>
      <ScrollView style={styles.listClinicCard}>
        {clinicData && clinicData.map(item => <ClinicCard key={item.id} {...item} navigation={navigation} />)}
      </ScrollView>
    </View>
  );
}

const ClinicCard = (prop) => {
  return (
    <View style={[styles.clinicCard, styles.row]}>
      <View style={{
        // add shadows for Android only
        elevation: 6,

        // add shadows for iOS only
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,

        // fitting view with image
        width: 68,
        height: 68,
        borderRadius: 40,
        marginRight: 8,
      }}>
        <Image style={styles.clinicImg} source={{ uri: prop.avatar }}></Image>
      </View>
      {/* 
        Clinic Info
        */}
      <View style={styles.clinicInfo}>
        <Text style={styles.name}>{prop.name}</Text>
        <Text style={styles.agency}>Cơ sở {prop.version}</Text>
        <View style={[styles.address, styles.row]}>
          <Image style={styles.addressIcon} source={require('../../assets/icons/V_clinic-location.png')}></Image>
          <Text style={styles.addressText}>{prop.address}</Text>
        </View>
        <View style={[styles.numOfFollowers, styles.row]}>
          <Image style={styles.followerIcon} source={require('../../assets/icons/V_followers.png')}></Image>
          <Text style={styles.followerNumber}>{prop.followers}</Text>
          <Text style={styles.followerText}> Người theo dõi</Text>
        </View>
        <View style={styles.row}>
          {/* chat with clinic button */}
          <TouchableOpacity style={[styles.chatBtn, styles.row]}>
            <Image style={styles.iconBtn} source={require('../../assets/icons/V_message-icon.png')}></Image>
          </TouchableOpacity>
          {/* booking vet button */}
          <TouchableOpacity
            style={[styles.bookingBtn, styles.row]}
            onPress={() => {
              const clinicId = prop.id;
              const clinicName = prop.name;
              const clinicAgency = prop.version;
              const clinicAddress = prop.address;
              const clinicAvatar = prop.avatar;
              prop.navigation.navigate("V_BookingVet", { clinicId, clinicName, clinicAgency, clinicAddress, clinicAvatar })
            }}
          >
            <Text style={styles.textBookingBtn}>Đặt lịch khám</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapping: {
    height: '100%',
    backgroundColor: '#FFFFFF',
  },
  row: {
    flexDirection: 'row',
  },
  header: {
    width: '100%',
    marginTop: '10%',
  },
  backBtn: {
    resizeMode: 'contain',
    padding: 16,
    marginHorizontal: '3%',
  },
  title: {
    backgroundColor: '#FFF6F6',
  },
  titleImg: {
    width: 28,
    height: 28,
    marginLeft: 24,
    marginRight: 4,
  },
  titleText: {
    width: '72%',
    fontSize: 15,
    fontFamily: 'lexend-semibold',
    color: '#FFFFFF',
    backgroundColor: '#F5817E',
    borderRadius: 12,
    paddingVertical: 4,
    paddingLeft: 8,
  },
  headerTitle: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    marginRight: '12%',
    marginTop: 8,
  },
  headerText: {
    color: '#A51A29',
    fontSize: 18,
    alignSelf: 'center',
    fontFamily: 'lexend-bold',
    paddingBottom: 8,
  },
  headerImg: {
    width: '6%',
    marginLeft: 6,
    resizeMode: 'contain',
    justifyContent: 'flex-start',
  },
  listClinicCard: {
    marginTop: 8,
    marginBottom: Dimensions.get("window").height * 0.1,
  },
  clinicCard: {
    width: '84%',
    alignSelf: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#F5817E',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 12,
    paddingTop: 6,
    paddingBottom: 12,
    paddingHorizontal: 8,

    // add shadows for Android only
    elevation: 8,
    // add shadows for iOS only
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
  },
  clinicInfo: {
    width: '88%',
    marginLeft: '1%',
  },
  clinicImg: {
    width: 68,
    height: 68,
    borderRadius: 64,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  name: {
    color: '#39A3C0',
    fontSize: 16,
    fontFamily: 'lexend-regular',
    marginBottom: 4,
  },
  agency: {
    color: '#39A3C0',
    fontSize: 15,
    fontFamily: 'lexend-regular',
    marginBottom: 4,
  },
  address: {
    width: '80%',
  },
  addressIcon: {
    width: 18,
    height: 18,
    marginTop: 4,
    resizeMode: 'contain',
  },
  addressText: {
    fontSize: 14,
    fontFamily: 'lexend-regular',
    color: '#3b3b3b',
    marginLeft: 6,
  },
  numOfFollowers: {
    width: '80%',
    alignItems: 'flex-end',
    marginBottom: 12,
  },
  followerIcon: {
    width: 16,
    height: 16,
    marginTop: 4,
    marginBottom: 3,
  },
  followerNumber: {
    fontSize: 14,
    fontFamily: 'lexend-regular',
    color: '#3b3b3b',
    marginLeft: 6,
    marginBottom: 0,
  },
  followerText: {
    color: '#3b3b3b',
    marginBottom: 0,
  },
  chatBtn: {
    borderColor: '#A51A29',
    borderWidth: 1,
    padding: 8,
    borderRadius: 4,
    marginRight: 8,
    marginLeft: '6%',
  },
  bookingBtn: {
    width: '56%',
    justifyContent: 'center',
    backgroundColor: '#A51A29',
    borderColor: '#E02D33',
    borderWidth: 1,
    paddingVertical: 8,
    borderRadius: 8,
  },
  iconBtn: {
    width: 24,
    height: 18,
  },
  textBookingBtn: {
    fontSize: 13,
    fontFamily: 'lexend-semibold',
    color: '#FFFFFF',
    marginLeft: 6,
  }
});
