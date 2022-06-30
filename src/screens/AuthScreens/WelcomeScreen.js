import { View, Text } from 'react-native'
import LoginButton from 'src/components/login-signup/LoginButton'
import RegisterButton from 'src/components/login-signup/RegisterButton'
import Logo from 'src/components/login-signup/Logo'
import style from 'src/styles/login-signup/WelcomeStyle'
import Typo from 'src/theme/mainTypo'

// Navigation
import { useNavigation } from "@react-navigation/native";

export default function WelcomeScreen() {
    const navigation = useNavigation();

    const titleText = 'Chào mừng đến với Cashmin! \n'
    const bodyText1 = 'Cashmin sẽ là trợ thủ đắc lực của bạn trong việc ghi chú và quản lý chi tiêu hằng ngày'
    const bodyText2 = 'Đăng ký hoặc đăng nhập để bắt đầu ngay'
    return (
        <View style={style.container}>
            <Logo />
            <Text style={[Typo.h4, style.title]}>{titleText}</Text>
            <Text style={[Typo.body, style.body1]}>{bodyText1}</Text>
            <Text style={[Typo.body, style.body2]}>{bodyText2}</Text>
            <LoginButton onPress={() => navigation.navigate("Login")} />
            <RegisterButton onPress={() => navigation.navigate("Register")} />
        </View>
    )
}