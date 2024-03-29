import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Dimensions, Image, StyleSheet, View, Text } from "react-native";
// import { getCountSeenNoti } from "../components/utils";
import { useNavigation } from "@react-navigation/native";
import * as Font from "expo-font";
import WelcomeScreen from "../screens/WelcomeScreen";
import SignInScreen from "../screens/SignInScreen";
import SignUpScreen from "../screens/SignUpScreen";
import FirstOwnerInfoScreen from "../screens/FirstOwnerInfoScreen";
import FirstPetInfoScreen from "../screens/FirstPetInfoScreen";
import { useEffect, useState, React, useContext } from "react";
import { onValue, ref, push, set, get } from "firebase/database";
import { database } from "../firebase";
import { UserContext } from "../UserIdContext";
import C_HomeScreen from "../screens/CommunityScreens/C_HomeScreen";
import C_StatusScreen from "../screens/CommunityScreens/C_StatusScreen";
import C_StatusLikedListScreen from "../screens/CommunityScreens/C_StatusLikedListScreen";
import C_StatusPostingScreen from "../screens/CommunityScreens/C_StatusPostingScreen";
import C_SearchScreen from "../screens/CommunityScreens/C_SearchScreen";
import C_ProfileScreen from "../screens/CommunityScreens/C_ProfileScreen";
import C_FollowingListScreen from "../screens/CommunityScreens/C_FollowingListScreen";
import C_FollowedListScreen from "../screens/CommunityScreens/C_FollowedListScreen";

import H_NoteScreen from "../screens/HealthScreens/H_NoteScreen";
import H_DetailNote from "../screens/HealthScreens/H_DetailNote";
import H_UpdateNote from "../screens/HealthScreens/H_UpdateNote";
import H_AddNote from "../screens/HealthScreens/H_AddNote";
import H_HandBook from "../screens/HealthScreens/H_HandBook";
import H_DetailHandBook from "../screens/HealthScreens/H_DetailHandBook";

import V_LocationScreen from "../screens/VeterinarianScreens/V_LocationScreen";
import V_ListVetClinicScreen from "../screens/VeterinarianScreens/V_ListVetClinicScreen";
import V_BookingVetScreen from "../screens/VeterinarianScreens/V_BookingVetScreen";
import V_BookingSuccessScreen from "../screens/VeterinarianScreens/V_BookingSuccessScreen";
import V_ListAppointmentScreen from "../screens/VeterinarianScreens/V_ListAppointmentScreen";
import V_OriginScreen from "../screens/VeterinarianScreens/V_OriginScreen";

import M_ChatListScreen from "../screens/MessageScreens/M_ChatListScreen";
import M_ChatItemScreen from "../screens/MessageScreens/M_ChatItemScreen";

import N_ListScreen from "../screens/NotificationScreens/N_ListScreen";

import S_OptionScreen from "../screens/SettingScreens/S_OptionScreen";
import T_SignInScreen from "../screens/T_SignInScreen";

const Stack = createStackNavigator();
function StackNavigator() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="T_SignIn" component={T_SignInScreen} />
            <Stack.Screen name="HomeTabs" component={MyTabs} />
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="SignIn" component={SignInScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
            <Stack.Screen name="FirstOwnerInfo" component={FirstOwnerInfoScreen} />
            <Stack.Screen name="FirstPetInfo" component={FirstPetInfoScreen} />
            {/* <Stack.Screen name="HomeTabs" component={MyTabs} /> */}
        </Stack.Navigator>
    );
}

const MainNavigator = () => {
    return (
        <NavigationContainer>
            <StackNavigator></StackNavigator>
        </NavigationContainer>
    );
};

const CommunityStack = createStackNavigator();
function CommunityStackNavigator() {
    return (
        <CommunityStack.Navigator screenOptions={{ headerShown: false }}>
            <CommunityStack.Screen name="C_Home" component={C_HomeScreen} />
            <CommunityStack.Screen name="C_Status" component={C_StatusScreen} />
            <CommunityStack.Screen name="C_StatusLikedList" component={C_StatusLikedListScreen} />
            <CommunityStack.Screen name="C_StatusPosting" component={C_StatusPostingScreen} />
            <CommunityStack.Screen name="C_Search" component={C_SearchScreen} />
            <CommunityStack.Screen name="C_Profile" component={C_ProfileScreen} />

            <CommunityStack.Screen name="C_FollowingList" component={C_FollowingListScreen} />
            <CommunityStack.Screen name="C_FollowedList" component={C_FollowedListScreen} />
        </CommunityStack.Navigator>
    );
}

const HealthStack = createStackNavigator();
function HealthStackNavigator() {
    return (
        <HealthStack.Navigator screenOptions={{ headerShown: false }}>
            {/* <HealthStack.Screen name="Noti" component={PushNotification} /> */}
            <HealthStack.Screen name="H_Note" component={H_NoteScreen} />
            <HealthStack.Screen name="H_DetailNote" component={H_DetailNote} />
            <HealthStack.Screen name="H_UpdateNote" component={H_UpdateNote} />
            <HealthStack.Screen name="H_AddNote" component={H_AddNote} options={{ animationEnabled: false }} />
            <HealthStack.Screen name="H_HandBook" component={H_HandBook} options={{ animationEnabled: false }} />
            <HealthStack.Screen name="H_DetailHandBook" component={H_DetailHandBook} />
        </HealthStack.Navigator>
    );
}

const VeterinarianStack = createStackNavigator();
function VeterinarianStackNavigator() {
    return (
        <VeterinarianStack.Navigator screenOptions={{ headerShown: false }}>
            <VeterinarianStack.Screen name="V_Origin" component={V_OriginScreen} />
            <VeterinarianStack.Screen name="V_Location" component={V_LocationScreen} />
            <VeterinarianStack.Screen name="V_ListVetClinic" component={V_ListVetClinicScreen} />
            <VeterinarianStack.Screen name="V_BookingVet" component={V_BookingVetScreen} />
            <VeterinarianStack.Screen name="V_BookingSuccess" component={V_BookingSuccessScreen} />
            <VeterinarianStack.Screen name="V_ListAppointment" component={V_ListAppointmentScreen} />
        </VeterinarianStack.Navigator>
    );
}

const MessageStack = createStackNavigator();
function MessageStackNavigator() {
  return (
    <MessageStack.Navigator screenOptions={{ headerShown: false }}>
      <MessageStack.Screen name="M_List" component={M_ChatListScreen} />
      <MessageStack.Screen name="M_Chat" component={M_ChatItemScreen} />
    </MessageStack.Navigator>
  );
}

const NotificationStack = createStackNavigator();
function NotificationStackNavigator() {
    return (
        <NotificationStack.Navigator screenOptions={{ headerShown: false }}>
            <NotificationStack.Screen name="N_List" component={N_ListScreen} />
        </NotificationStack.Navigator>
    );
}

const SettingStack = createStackNavigator();
function SettingStackNavigator() {
    return (
        <SettingStack.Navigator screenOptions={{ headerShown: false }}>
            <SettingStack.Screen name="S_Option" component={S_OptionScreen} />
        </SettingStack.Navigator>
    );
}

const Tab = createBottomTabNavigator();
function MyTabs() {
    const userID = useContext(UserContext).userId;
    const [notiCount, setNotiCount] = useState(0);
    const getCountSeenNoti = (userId) => {
        const notiRef = ref(database, "notification");
        let seenCount = 0; // Sử dụng biến khác để lưu giá trị seenCount
        onValue(notiRef, (snapshot) => {
            const notisData = snapshot.val();
            if (notisData) {
                const notis = Object.entries(notisData)
                    .map(([notiID, noti]) => {
                        if (noti.receiver == userId) {
                            return { notiID, ...noti };
                        }
                    })
                    .filter((noti) => noti); // Lọc bỏ các giá trị undefined
                seenCount = notis.filter((noti) => noti.seen == 0).length;
            }
            setNotiCount(seenCount);
            console.log(notiCount);
        }); // Trả về giá trị của seenCount
    };
    useEffect(() => {
        getCountSeenNoti(userID);
    }, []);

    return (
        <Tab.Navigator
            screenOptions={{
                tabBarShowLabel: false,
                // tabBarLabelStyle: [
                //   {
                //     fontSize: 12,
                //     marginBottom: 6,
                //   },
                // ],
                tabBarHideOnKeyboard: true,
                headerShown: false,
                tabBarStyle: [
                    {
                        display: "flex",
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        elevation: 0,
                        backgroundColor: "#ffffff",
                        borderRadius: 0,
                        height: Dimensions.get("window").height * 0.1,
                        ...styles.shadow,
                    },
                    null,
                ],
            }}
        >
            <Tab.Screen
                name="CommunityStack"
                component={CommunityStackNavigator}
                options={{
                    tabBarLabel: "Cộng đồng",
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: "center", justifyContent: "center" }}>
                            {focused && <Image style={styles.tabIcon} resizeMode="contain" source={require("../assets/icons/community-active.png")}></Image>}
                            {!focused && <Image style={styles.tabIcon} resizeMode="contain" source={require("../assets/icons/community-inactive.png")}></Image>}
                        </View>
                    ),
                }}
            />
            <Tab.Screen
                name="HealthStack"
                component={HealthStackNavigator}
                options={{
                    tabBarLabel: "Sức khỏe",
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: "center", justifyContent: "center" }}>
                            {focused && <Image style={styles.tabIcon} resizeMode="contain" source={require("../assets/icons/health-active.png")}></Image>}
                            {!focused && <Image style={styles.tabIcon} resizeMode="contain" source={require("../assets/icons/health-inactive.png")}></Image>}
                        </View>
                    ),
                }}
            />
            <Tab.Screen
                name="VeterinarianStack"
                component={VeterinarianStackNavigator}
                options={{
                    tabBarLabel: "Thú y",
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: "center", justifyContent: "center" }}>
                            {focused && <Image style={styles.tabIcon} resizeMode="contain" source={require("../assets/icons/veterinarian-active.png")}></Image>}
                            {!focused && <Image style={styles.tabIcon} resizeMode="contain" source={require("../assets/icons/veterinarian-inactive.png")}></Image>}
                        </View>
                    ),
                }}
            />
            <Tab.Screen
                name="MessageStack"
                component={MessageStackNavigator}
                options={{
                    tabBarLabel: "Tin nhắn",
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: "center", justifyContent: "center" }}>
                            {focused && <Image style={styles.tabIcon} resizeMode="contain" source={require("../assets/icons/message-active.png")}></Image>}
                            {!focused && <Image style={styles.tabIcon} resizeMode="contain" source={require("../assets/icons/message-inactive.png")}></Image>}
                        </View>
                    ),
                }}
            />
            <Tab.Screen
                name="NotificationStack"
                component={NotificationStackNavigator}
                options={{
                    tabBarLabel: "Thông báo",
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: "center", justifyContent: "center" }}>
                            {focused && <Image style={styles.tabIcon} resizeMode="contain" source={require("../assets/icons/notification-active.png")}></Image>}

                            {!focused && notiCount > 0 && (
                                <View>
                                    <View style={styles.containerNumber}>
                                        <Text style={styles.number}>{notiCount}</Text>
                                    </View>
                                    <Image style={styles.tabIcon} resizeMode="contain" source={require("../assets/icons/notification-inactive.png")}></Image>
                                </View>
                            )}
                            {!focused && notiCount == 0 && <Image style={styles.tabIcon} resizeMode="contain" source={require("../assets/icons/notification-inactive.png")} />}
                        </View>
                    ),
                }}
            />
            <Tab.Screen
                name="SettingStack"
                component={SettingStackNavigator}
                options={{
                    tabBarLabel: "Cài đặt",
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: "center", justifyContent: "center" }}>
                            {focused && <Image style={styles.tabIcon} resizeMode="contain" source={require("../assets/icons/setting-active.png")}></Image>}
                            {!focused && <Image style={styles.tabIcon} resizeMode="contain" source={require("../assets/icons/setting-inactive.png")}></Image>}
                        </View>
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

export default MainNavigator;

const styles = StyleSheet.create({
    tabIcon: {
        width: Dimensions.get("window").width * 0.08,
        height: Dimensions.get("window").height * 0.08,
    },
    containerNumber: {
        position: "absolute",
        zIndex: 10000,
        top: 5,
        right: 2,
    },
    number: {
        fontFamily: "lexend-medium",
        fontSize: 13,
        fontWeight: "bold",
        color: "#F90808",
    },
});
