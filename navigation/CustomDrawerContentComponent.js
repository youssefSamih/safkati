import React from 'react';
import { View,Image,Platform, Dimensions, ScrollView, StyleSheet } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { DrawerNavigatorItems } from 'react-navigation-drawer';
import { Container, Content, Icon, Header, Body,Text } from 'native-base'


const CustomDrawerContentComponent = props => (
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
          <Text>Abderrahim Soumer</Text>
      </Body>
    </Header>
    <Content>
     {/* <DrawerItems {...props} />*/}
      <DrawerNavigatorItems {...props} />
    </Content>


  </Container>

    </SafeAreaView>
  </ScrollView>
);


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