import {
  TouchableOpacity,
  Button,
  Text,
  StyleSheet,
  View,
  Image,
  ImageBackground,
  ScrollView,
  Animated,
  Modal,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
import React, {
  Component,
  useEffect,
  useState,
  useLayoutEffect,
  useRef,
  useContext,
} from "react";
import {
  useNavigation,
  useScrollToTop,
  useRoute,
} from "@react-navigation/native";
import * as Font from "expo-font";
import moment from "moment";

import { useSwipe } from "../../hooks/useSwipe";
import { UserContext } from "../../UserIdContext";

import { database } from "../../firebase";
import { onValue, ref, get, set, push, remove } from "firebase/database";

export default function C_FollowedListScreen({ navigation }) {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [isFollowed, setIsFollowed] = useState(false);
  const myUserId = useContext(UserContext).userId;

  const route = useRoute();
  const [followedUsers, setFollowedUsers] = useState(
    route?.params?.followerUsers || []
  );

  const { onTouchStart, onTouchEnd } = useSwipe(onSwipeLeft, onSwipeRight, 6);

  function onSwipeLeft() {
    //navigation.goBack();
  }

  function onSwipeRight() {
    navigation.goBack();
  }

  useEffect(() => {
    const loadFont = async () => {
      await Font.loadAsync({
        "lexend-black": require("../../assets/fonts/Lexend/static/Lexend-Black.ttf"),
        "lexend-bold": require("../../assets/fonts/Lexend/static/Lexend-Bold.ttf"),
        "lexend-extrabold": require("../../assets/fonts/Lexend/static/Lexend-ExtraBold.ttf"),
        "lexend-extralight": require("../../assets/fonts/Lexend/static/Lexend-ExtraLight.ttf"),
        "lexend-light": require("../../assets/fonts/Lexend/static/Lexend-Light.ttf"),
        "lexend-medium": require("../../assets/fonts/Lexend/static/Lexend-Medium.ttf"),
        "lexend-regular": require("../../assets/fonts/Lexend/static/Lexend-Regular.ttf"),
        "lexend-semibold": require("../../assets/fonts/Lexend/static/Lexend-SemiBold.ttf"),
        "lexend-thin": require("../../assets/fonts/Lexend/static/Lexend-Thin.ttf"),
        "SF-Pro-Display": require("../../assets/fonts/SF-Pro-Display/SF-Pro-Display-Regular.otf"),
      });
      setFontLoaded(true);
    };

    loadFont();
  }, []);

  const fetchData = async () => {
    // Sắp xếp lại danh sách followedUsers
    const sortedFollowedUsers = followedUsers.sort((a, b) => {
      if (a.userId.toString() === myUserId) {
        return -1; // Đưa tài khoản của bạn lên đầu danh sách
      } else if (b.userId.toString() === myUserId) {
        return 1; // Đưa tài khoản của bạn lên đầu danh sách
      } else {
        return 0; // Giữ nguyên vị trí của các người dùng khác
      }
    });

    const getFollowedUsersInfo = async (followedUsers) => {
      const usersInfo = await Promise.all(
        followedUsers.map(async (user) => {
          const userId = user.userId.toString();
          const userRef = ref(database, `user/${userId}`);
          const userSnapshot = await get(userRef);
          const userData = userSnapshot.val();
          const followRef = ref(database, `follow/${myUserId}/${userId}`);
          const followSnapshot = await get(followRef);
          const isFollowed = !!followSnapshot.exists();
          return {
            userId: userId,
            userName: userData.name,
            userAvatar: userData.avatar,
            userIntro: userData.intro,
            isFollowed: isFollowed,
          };
        })
      );
      return usersInfo;
    };

    const followedUsersInfo = await getFollowedUsersInfo(sortedFollowedUsers);
    const updatedFollowedUsers = sortedFollowedUsers.map((user) => {
      const userId = user.userId.toString();
      const userInfo = followedUsersInfo.find((info) => info.userId === userId);
      return {
        userId: userId,
        userName: userInfo.userName,
        userAvatar: userInfo.userAvatar,
        userIntro: userInfo.userIntro,
        isFollowed: userInfo.isFollowed,
      };
    });
    setFollowedUsers(updatedFollowedUsers);
  };
  fetchData();
  useEffect(() => {
    fetchData();
  }, []);

  // XỬ LÝ CÁC THAO TÁC QUẸT MÀN HÌNH
  const panResponder = useSwipe(
    () => {
      // console.log("swiped left")
    },
    () => navigation.goBack(),
    () => {
      // console.log("swiped up")
    },
    () => {
      // console.log("swiped down")
    }
  );

  if (!fontLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      {/* heading */}
      <View style={styles.heading}></View>
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        {...panResponder.panHandlers}
      >
        {/* Nút quay lại */}
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            style={styles.back}
            source={require("../../assets/icons/back.png")}
          ></Image>
        </TouchableOpacity>
        <View style={styles.newsfeed}>
          <View style={styles.row2}>
            <Text style={styles.text}>Người theo dõi</Text>
          </View>

          <View style={styles.account_list}>
            {/* NỘI DUNG NGƯỜI DÙNG */}
            {followedUsers.map((user) => (
              <View style={styles.row} key={user.userId}>
                <View style={styles.row3}>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("C_Profile", {
                        userId: user.userId,
                      })
                    }
                  >
                    {/* Ảnh đại diện người dùng */}
                    <Image
                      style={styles.avatar60}
                      source={{ uri: user.userAvatar }}
                    ></Image>
                  </TouchableOpacity>
                  <View>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("C_Profile", {
                          userId: user.userId,
                        })
                      }
                    >
                      {/* Tên người dùng */}
                      <Text style={styles.account_name}>{user.userName}</Text>
                    </TouchableOpacity>
                    {/* Tiểu sử người dùng */}
                    <Text style={styles.account_bio}>{user.userIntro}</Text>
                  </View>
                </View>

                {/* Tùy chọn Follow */}
                {user.userId !== myUserId &&
                  (user.isFollowed ? (
                    <TouchableOpacity style={styles.followed_button}>
                      <Text style={styles.followed_text}>Đang theo dõi</Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity style={styles.follow_button}>
                      <Text style={styles.follow_text}>Theo dõi</Text>
                    </TouchableOpacity>
                  ))}
              </View>
            ))}
            {/* NỘI DUNG NGƯỜI DÙNG */}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "90%",
    backgroundColor: "#FFF6F6",
  },
  heading: {
    width: "100%",
    height: "5%",
  },
  content: {
    flex: 1,
  },
  back: {
    width: 34,
    height: 30,
    marginLeft: 12,
    marginTop: 8,
  },

  row: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: 8,
  },
  row2: {
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingTop: 10,
    paddingBottom: 4,
    alignItems: "center",
  },
  row3: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    color: "#A51A29",
    fontFamily: "lexend-medium",
    marginLeft: "6%",
    marginTop: -48,
  },
  newsfeed: {
    // backgroundColor: "black",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  account_list: {
    backgroundColor: "#ffffff",
    width: "90%",
    //height: 352,
    alignItems: "center",
    borderRadius: 12,
    marginTop: 12,
    marginBottom: 12,
    paddingTop: 12,
    paddingBottom: 12,
  },
  avatar60: {
    width: 60,
    height: 60,
    margin: 8,
    borderRadius: 50,
  },
  account_name: {
    fontSize: 14,
    color: "#8F1928",
    fontFamily: "lexend-semibold",
  },
  account_bio: {
    fontSize: 12,
    color: "#000000",
    fontFamily: "lexend-light",
  },
  follow_button: {
    backgroundColor: "#8F1928",
    borderRadius: 12,
    width: 114,
    height: 28,
    justifyContent: "center", // căn giữa theo chiều dọc
    alignItems: "center", // căn giữa theo chiều ngang
  },
  follow_text: {
    fontSize: 14,
    color: "#ffffff",
    fontFamily: "lexend-medium",
    //marginLeft: "6%",
    //marginTop: -48,
  },
  followed_button: {
    backgroundColor: "#ffffff",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#8F1928",
    borderRadius: 12,
    width: 114,
    height: 28,
    justifyContent: "center", // căn giữa theo chiều dọc
    alignItems: "center", // căn giữa theo chiều ngang
  },
  followed_text: {
    fontSize: 14,
    color: "#8F1928",
    fontFamily: "lexend-medium",
    //marginLeft: "6%",
    //marginTop: -48,
  },
});
