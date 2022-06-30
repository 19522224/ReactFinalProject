import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import AuthContext from "../login-signup/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const DataContext = createContext({});

const defaultProfile = { fullName: "", phoneNumber: "", birthday: "" };

const defaultSettings = {
    language: 'Tiếng việt',
    dateFormat: 'dd/mm/yyyy',
    currency: 'VND',
    hideMoney: true,
    reminder: false,
    weekStart: 1,
    monthStart: 1,
    yearStart: 1
};
const defaultLimits = {
    daily: {
        isActive: false
    },
    weekly: {
        isActive: false
    },
    monthly: {
        isActive: false
    }
}
const defaultCategories = [
    { id: 1, name: 'Chung', icon: 'apps' },
    { id: 2, name: 'Ăn uống', icon: 'fast-food' },
    { id: 3, name: 'Thuê nhà', icon: 'home' },
    { id: 4, name: 'Điện nước', icon: 'bulb' },
    { id: 5, name: 'Đi lại', icon: 'bicycle' },
    { id: 6, name: 'Sửa chữa', icon: 'build' },
    { id: 7, name: 'Mua sắm', icon: 'basket' },
    { id: 8, name: 'Tiết kiệm', icon: 'analytics' },
    { id: 9, name: 'Dự phòng', icon: 'alert' },
]

export const DataProvider = ({ children }) => {
    const [profile, changeProfile] = useState(defaultProfile);
    const [settings, changeSettings] = useState(defaultSettings);
    const [limits, changeLimits] = useState(defaultLimits);
    const [wallets, changeWallets] = useState([]);
    const [debits, changeDebits] = useState([]);
    const [categories, changeCategories] = useState(defaultCategories);
    const [username, changeUsername] = useState("");
    const [solveDebit, setSolveDebit] = useState(null);

    const setUsername = async (value) => {
        changeUsername(value);
        try { await AsyncStorage.setItem('username', JSON.stringify(value)); }
        catch (err) { console.log(err); }
    }

    const setProfile = async (value) => {
        changeProfile(value);
        try { await AsyncStorage.setItem('profile', JSON.stringify(value)); }
        catch (err) { console.log(err); }
    }

    const setSettings = async (value) => {
        changeSettings(value);
        try { await AsyncStorage.setItem('settings', JSON.stringify(value)); }
        catch (err) { console.log(err); }
    }

    const setLimits = async (value) => {
        changeLimits(value);
        try { await AsyncStorage.setItem('limits', JSON.stringify(value)); }
        catch (err) { console.log(err); }
    }

    const setWallets = async (value) => {
        changeWallets(value);
        try { await AsyncStorage.setItem('wallets', JSON.stringify(value)); }
        catch (err) { console.log(err); }
    }

    const setDebits = async (value) => {
        changeDebits(value);
        try { await AsyncStorage.setItem('debits', JSON.stringify(value)); }
        catch (err) { console.log(err); }
    }

    const setCategories = async (value) => {
        changeCategories(value);
        try { await AsyncStorage.setItem('categories', JSON.stringify(value)); }
        catch (err) { console.log(err); }
    }

    const { token } = useContext(AuthContext);

    useEffect(async () => {
        if (token != null) {
            if (await AsyncStorage.getItem('profile') == null) {
                // fetch data
                try {
                    const res = await axios.get("/users/user-info", {
                        headers: {
                            Authorization: "Bearer " + token,
                        },
                    });
                    setUsername(res.data.username);
                    setProfile(res.data.profile);
                    setSettings(res.data.settings);
                    setLimits(res.data.limits);
                    setWallets(res.data.wallets);
                    setDebits(res.data.debits);
                    setCategories(res.data.categories);
                }
                catch (err) {
                    // outdated token
                    if (err.response.status == 403) setAuth(false);
                    else {
                        // no network
                        setUsername("");
                        setProfile(defaultProfile);
                        setSettings(defaultSettings);
                        setLimits(defaultLimits);
                        setWallets([]);
                        setDebits([]);
                        setCategories(defaultCategories);
                    }
                }

            }
            else { // get data from local storage
                changeUsername(JSON.parse(await AsyncStorage.getItem('username')));
                changeProfile(JSON.parse(await AsyncStorage.getItem('profile')));
                changeSettings(JSON.parse(await AsyncStorage.getItem('settings')));
                changeLimits(JSON.parse(await AsyncStorage.getItem('limits')));
                changeWallets(JSON.parse(await AsyncStorage.getItem('wallets')));
                changeDebits(JSON.parse(await AsyncStorage.getItem('debits')));
                changeCategories(JSON.parse(await AsyncStorage.getItem('categories')));
            }
        }
    }, [token]);

    return (
        <DataContext.Provider
            value={{
                username,
                setUsername,
                profile,
                setProfile,
                settings,
                setSettings,
                limits,
                setLimits,
                wallets,
                setWallets,
                debits,
                setDebits,
                categories,
                setCategories,
                solveDebit,
                setSolveDebit
            }}
        >
            {children}
        </DataContext.Provider>
    );
};

export default DataContext;
