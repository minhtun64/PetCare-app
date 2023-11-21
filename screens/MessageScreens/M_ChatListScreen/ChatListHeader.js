import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  Image,
  TextInput,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { database } from "../../../firebase";
import { ref, onValue, off } from "firebase/database";
import { UserContext } from "../../../UserIdContext";

export default function ChatListHeader() {
  const myUserId = useContext(UserContext).userId;
  const [myUserAvatar, setMyUserAvatar] = useState(null);

  useEffect(() => {
    let userRef = ref(database, `user/${myUserId}`);

    onValue(userRef, (snapshot) => {
      let data = snapshot.val();
      setMyUserAvatar(data.avatar);
    });

    return () => off(onValue);
  }, [myUserId]);

  return (
    <View style={[styles.heading]}>
      <View style={[styles.titleRow, styles.row]}>
        <View style={styles.userAvatarContainer}>
          <Image style={styles.userAvatar} source={{ uri: myUserAvatar }} />
        </View>
        <View style={styles.title}>
          <Text style={styles.titleText}>Tin nhắn</Text>
          <Image
            style={styles.titleIcon}
            source={require("../../../assets/icons/mess-title-icon.png")}
          />
        </View>
      </View>

      <TouchableOpacity style={[styles.searchBtn, styles.row]}>
        <Image
          style={styles.searchIcon}
          source={require("../../../assets/icons/search.png")}
        />
        <TextInput
          style={styles.searchTextInput}
          placeholder="Tìm kiếm"
        ></TextInput>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(252, 172, 158, 0.5)',
    backgroundColor: "#FDDAD4",
    paddingHorizontal: 16,
  },
  row: {
    flexDirection: "row",
  },
  userAvatarContainer: {
    position: "absolute",
    bottom: 0,
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginTop: "9%",
    marginLeft: "auto",
    marginRight: "auto",
  },
  title: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  titleText: {
    marginLeft: 10,
    fontSize: 18,
    fontFamily: "lexend-medium",
    color: "#A51A29",
    marginTop: 16,
  },
  titleIcon: {
    width: 32,
    height: 32,
    marginTop: 8,
  },
  searchBtn: {
    width: "100%",
    borderRadius: 16,
    backgroundColor: "#ffffff",
    paddingHorizontal: 10,
    paddingVertical: 3,
    marginTop: 22,
    marginBottom: 16,
  },
  searchIcon: {
    width: 26,
    height: 26,
  },
  searchTextInput: {
    width: "100%",
    fontSize: 14,
    fontFamily: "lexend-light",
    lineHeight: 1.5,
    color: "#7C7C7C",
    marginLeft: 8,
  },
});