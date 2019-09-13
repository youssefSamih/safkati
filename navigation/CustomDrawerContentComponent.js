import React from 'react';
import { AsyncStorage,View,Image,Platform, Dimensions, ScrollView, StyleSheet,TouchableOpacity } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { DrawerNavigatorItems } from 'react-navigation-drawer';
import { Container, Content, Icon, Header, Body,Text } from 'native-base'


const CustomDrawerContentComponent =  (props) => {
  //const user =  await AsyncStorage.getItem('currentUser');
  // console.log("props ",props.nom);
  const userInfo = props.navigation.getParam('userInfo');
  return (
  <ScrollView>
    <SafeAreaView
      style={styles.container}
      forceInset={{ top: 'always', horizontal: 'never' }}
    >
     <Container>
    <Header noShadow style={styles.drawerHeader}>
      <Body style={{flex:1,alignItems:'center'}}>
        <Image
          style={styles.drawerImage}
          source={require('../assets/user-hp.png')} />
          <Text>{userInfo.nom}</Text>
      </Body>
    </Header>
    <Content>
     {/* <DrawerItems {...props} />*/}
      <DrawerNavigatorItems {...props} />
      {/*<TouchableOpacity onPress={() => console.log("log out")}>
          <Text style={{margin: 16,fontWeight: 'bold'}}>Logout</Text>
      </TouchableOpacity>*/}
    </Content>
  </Container>

    </SafeAreaView>
  </ScrollView>
);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	  drawerHeader: {
	    height: 200,
	    backgroundColor: 'white'
	  },
	  drawerImage: {
	    height: 150,
	    width: 150,
	    borderRadius: 75
	  }
});


export default CustomDrawerContentComponent;