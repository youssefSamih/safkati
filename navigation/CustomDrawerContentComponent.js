import React from 'react';
import { View,Image,Platform, Dimensions, ScrollView, StyleSheet,Text } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { DrawerNavigatorItems } from 'react-navigation-drawer';


const CustomDrawerContentComponent = props => (
  <ScrollView>
    <SafeAreaView
      style={styles.container}
      forceInset={{ top: 'always', horizontal: 'never' }}
    >
     <View style={styles.topLinks}>
		<View style={styles.profile}>
			<View style={styles.imgView}>
				<Image style={styles.img} source={require('../assets/user-hp.png')} />
			</View>
			<View style={styles.profileText}>
				<Text style={styles.name}>Abderrahim soumer</Text>
			</View>
		</View>
	</View>

      <DrawerNavigatorItems {...props} />

    </SafeAreaView>
  </ScrollView>
);


const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	scroller: {
		flex: 1,
	},
	profile: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		paddingTop: 25,
		borderBottomWidth: 1,
		borderBottomColor: '#777777',
	},
	profileText: {
		flex: 3,
		flexDirection: 'column',
		justifyContent: 'center',
	},
	name: {
		fontSize: 20,
		paddingBottom: 5,
		color: 'white',
		textAlign: 'left',
	},
	imgView: {
		flex: 1,
		paddingLeft: 20,
		paddingRight: 20,
	},
	img: {
		height: 70,
		width: 70,
		borderRadius: 50,
	},
	topLinks:{
		height: 160,
		backgroundColor: 'black',
	},
	bottomLinks: {
		flex: 1,
		backgroundColor: 'white',
		paddingTop: 10,
		paddingBottom: 450,
	},
	link: {
		flex: 1,
		fontSize: 20,
		padding: 6,
		paddingLeft: 14,
		margin: 5,
		textAlign: 'left',
	},
	footer: {
		height: 50,
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: 'white',
		borderTopWidth: 1,
		borderTopColor: 'lightgray'
	},
	version: {
		flex: 1, 
		textAlign: 'right',
		marginRight: 20,
		color: 'gray'
	},
	description: {
		flex: 1, 
		marginLeft: 20,
		fontSize: 16,
	}
});


export default CustomDrawerContentComponent;