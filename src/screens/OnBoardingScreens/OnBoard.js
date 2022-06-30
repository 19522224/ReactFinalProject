import { Alert, StatusBar } from 'react-native';
import React, { useContext } from 'react';

import { Button, Icon } from 'native-base';
import Onboarding from 'react-native-onboarding-swiper';
import AuthContext from "../../hooks/login-signup/AuthContext";
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
const OnBoard = () => {
  const { setFirstTime } = useContext(AuthContext);
  return (
    <Onboarding
      showDone={true}
      nextLabel='Tiếp theo'
      skipLabel='Bỏ qua'
      onDone={() => setFirstTime(false)}
      onSkip={() => setFirstTime(false)}
      pages={[
        {
          title: 'Xin Chào!',
          subtitle: 'Chào mừng bạn đến với Cashmin!',
          backgroundColor: '#fff',
          image: (
            <FontAwesome name="child" size={70} color="black" />
          ),
        },
        {
          title: 'Quản lý ví và nợ',
          subtitle: 'Bạn có thể quản lý các ví và khoản nợ của mình với các tính năng thêm, xóa, sửa, vv...',
          backgroundColor: '#9FA5AA',
          image: (
            <Entypo name="wallet" size={70} color="white" />
          ),
        },
        {
          title: 'Biểu đồ trực quan',
          subtitle: 'Xem xét tổng quan tình hình thu chi và đưa ra lựa chọn phù hợp',
          backgroundColor: '#508723',
          image: (
            <Entypo name="bar-graph" size={70} color="white" />
          ),
        },
        {
          title: "Đăng nhập hoặc đăng ký để bắt đầu ngay!",
          subtitle: (
            <Button
              size="lg"
              shadow="9"
              
              onPress={() => {
                setFirstTime(false);
              }}
            >
              Được rồi đi thôi!
            </Button>
          ),
          backgroundColor: '#419470',
          image: (
            <Icon name="rocket" type="font-awesome" size={100} color="white" />
          ),
        },
      ]}
    />
  )

}
export default OnBoard;