import React from 'react';
import { ImageBackground, StyleSheet, Platform, Dimensions, PixelRatio } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { DrawerNavigatorItems } from 'react-navigation-drawer';
import { Container, Content, Header, Body, Text, Left, Button, Icon, Right } from 'native-base';
import { LinearGradient } from "expo-linear-gradient";
import { params } from '../constants';


const scale = Dimensions.get("window").width / 200   ;
const actuatedNormalize = (size) => {
  let newSize = size * scale
  if (Platform.OS === 'ios') {
  return Math.round(PixelRatio.roundToNearestPixel(newSize))
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2
  }
}

const CustomDrawerContentComponent = (props) => {
  const userInfo = props.navigation.getParam('userInfo');
  return (
    <SafeAreaView
      style={styles.container}
      forceInset={{ horizontal: 'never' }}
    >
      <Container style={{ paddingTop: -80, position: "relative" }}>
        <ImageBackground source={params.app.FACE} style={{}}>
          <LinearGradient
            colors={["#f6c552", "#ee813c", "#bf245a"]}
            start={[1.5, 0.6]}
            style={styles.gradientFormStyle}
          >
            <Header transparent noShadow style={styles.drawerHeader}>
              <Left style={styles.leftRightHeaderStyle}>
                <Button transparent onPress={() => props.navigation.closeDrawer()}>
                  <Icon name="md-close" style={{ fontSize: 30, color: "#fff" }} />
                </Button>
              </Left>
              <Body style={{ flex: 1, alignItems: 'center' }} noRight>
                <ImageBackground
                  style={styles.drawerImage}
                  source={params.app.FACE}>
                    <LinearGradient
                      colors={["#f6c552", "#ee813c", "#bf245a"]}
                      start={[1.5, 0.6]}
                      style={styles.principalIcon}
                    >
                      <Icon name="ios-camera" style={{ color: "#fff", fontSize: 20 }} />
                    </LinearGradient>
                </ImageBackground>
                <Text style={styles.userNameStyle}>{userInfo.nom} {userInfo.prenom}</Text>
              </Body>
              <Right style={styles.leftRightHeaderStyle}>
                <Button transparent onPress={() => props.navigation.navigate('Compte')}>
                  <Icon name="md-settings" style={{ fontSize: 30, color: "#fff" }} />
                </Button>
              </Right>
            </Header>
          </LinearGradient>
        </ImageBackground>
        <Content>
          <DrawerNavigatorItems {...props} />
        </Content>
      </Container>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  drawerHeader: {
    height: 200,
  },
  drawerImage: {
    height: 100,
    width: 100,
    borderRadius: 75
  },
  gradientFormStyle: {
		opacity: .8,
		paddingBottom: 30,
		paddingTop: 30
 },
 leftRightHeaderStyle: { flex: 1, top: -100 },
 principalIcon: {
    borderRadius: Platform.OS === 'android' ? 105 : 15,
    padding: 6,
    justifyContent: "center",
    alignItems: 'center',
    width: 30,
    height: 30,
    top: 60,
    left: 75
  },
  userNameStyle: {
    fontWeight: "bold", 
    color: "#fff", 
    fontSize: actuatedNormalize(12), 
    width: "200%", 
    textAlign: "center" 
  }
});


export default CustomDrawerContentComponent;