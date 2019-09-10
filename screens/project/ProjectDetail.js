import React from 'react';
import {View, Text, ScrollView, Dimensions, Image, FlatList } from 'react-native';
//import { Actions } from 'react-native-router-flux';

import { Card, Input, Button, Icon } from 'native-base';
import {Divider} from '../../components';

import { connect } from 'react-redux';
import { infoProject } from '../../redux/actions';


const { width, height } = Dimensions.get('window');

 class ProjectDetail extends React.Component {
 	componentWillMount(){
    const { navigation } = this.props;
    const project = navigation.getParam('project');
 		this.props.infoProject({id: project.id});
 	}
 	  renderGallery() {
    const images = [
      require('../../assets/images/plants_1.png'),
      require('../../assets/images/plants_2.png'),
      require('../../assets/images/plants_3.png'),
      // showing only 3 images, show +6 for the rest
      require('../../assets/images/plants_1.png'),
      require('../../assets/images/plants_2.png'),
      require('../../assets/images/plants_3.png'),
      require('../../assets/images/plants_1.png'),
      require('../../assets/images/plants_2.png'),
      require('../../assets/images/plants_3.png'),
    ];
    return (
      <FlatList
        horizontal
        pagingEnabled
        scrollEnabled
        showsHorizontalScrollIndicator={false}
        snapToAlignment="center"
        data={images}
        keyExtractor={(item, index) => `${index}`}
        renderItem={({item}) => (
          <Image
            source={item}
            resizeMode="contain"
            style={{ width, height: height / 2.8 }}
          />
        )}
      />
    );
  }
	render(){
    const project = this.props.navigation.getParam('project');
		return (
			<View style={{backgroundColor: 'white'}} >
			<ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
			{this.renderGallery()}
			<View style={{paddingHorizontal:16 * 2,
    paddingVertical:25}}>
    		<Text style={{fontSize: 20,fontWeight: "bold"}}>
			    {project.libelle}
			</Text>	
			<Text style={{fontWeight: "200",color:'gray'}}>
			    {project.description}
			</Text>	
			<Button 
			  containerStyle={{ marginTop: 32, flex: 0 }}
              activeOpacity={0.8}
              title={"Declare Client"}
			  //onPress={() => Actions.declareClient({selectedProject: this.props.project.id})}
        >
			</Button>
    		</View>
			
			</ScrollView>
			</View>
		);
	}
}

export default connect(null, { infoProject })(ProjectDetail);
