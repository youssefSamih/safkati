import React from 'react';
import {View, Text, ScrollView, Dimensions, Image, FlatList,StyleSheet } from 'react-native';
//import { Actions } from 'react-native-router-flux';
import { SliderBox } from 'react-native-image-slider-box';

import { Card, H2, Input, Button, Icon,Container,Content , Header,Right,Left,Body,Title } from 'native-base';
import {Block} from '../../components';

import { connect } from 'react-redux';
import { infoProject } from '../../redux/actions';

import i18n from '../../i18n/i18n';

const { width, height } = Dimensions.get('window');

 class ProjectDetail extends React.Component {
  static navigationOptions = ({ navigation }) => ({
      header: null,
      
    });
 	componentWillMount(){
    const { navigation } = this.props;
    const project = navigation.getParam('project');
 		this.props.infoProject({id: project.id});
 	}
 	  renderGallery() {
    const images = [
    'https://odis.homeaway.com/odis/listing/82c05ddc-515c-47a0-a78a-d04d2991c761.c10.jpg',
    'https://www.realista.com/wp-content/uploads/2018/11/This-one-of-a-kind-villa-Las-Brisas-for-sale_Realista-Quality-Real-Estate-Marbella-3.jpg',
    'https://odis.homeaway.com/odis/listing/7e04139f-1678-4a69-a9dc-d86be6bd80c6.c10.jpg',
     /* '../../assets/images/plants_1.png',
     //require('../../assets/images/plants_2.png'),
     // require('../../assets/images/plants_3.png'),
      // showing only 3 images, show +6 for the rest
      require('../../assets/images/plants_1.png'),
      //require('../../assets/images/plants_2.png'),
      //require('../../assets/images/plants_3.png'),
      require('../../assets/images/plants_1.png'),
      //require('../../assets/images/plants_2.png'),
      //require('../../assets/images/plants_3.png'),*/
    ];
    return <SliderBox 
    sliderBoxHeight={400}
    images={images}
    circleLoop
    dotColor="#AA2D5A"
     />;
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
      <Container>
      <Header  noRight>
        <Left>
          <Button transparent onPress={() =>  this.props.navigation.goBack()}>
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body>
          <Title>Project</Title>
        </Body>
      </Header>
			<Content >
			{this.renderGallery()}
      <View style={styles.itemProjet}> 
        <H2 style={styles.libelleStyle}>{project.libelle}</H2>
        <Text note numberOfLines={1}>Appartement</Text>
        <Text note numberOfLines={1}>120m - 3Km - Terrasse - parking</Text>
        <View><Text style={styles.prixStyle} >12200 DHs</Text></View>
      </View>
      <View style={{paddingHorizontal:16 * 2,
    paddingVertical:25}}>
			<Text note>
			    {project.description}
			</Text>	
      </View>
      <Block center>
			<Button 
      rounded
			  onPress={() => this.props.navigation.navigate('DeclareClient', { projectId: project.id})}
        >
        <Text style={styles.button}>{i18n.t("Declare client")}</Text>
			</Button>
      </Block>
			</Content>
      </Container>
		);
	}
}
const styles = StyleSheet.create({
  itemProjet:{
    backgroundColor:'#F5F5F5',
    marginBottom:2,
    padding:12,
  },
  itemImg: {
    width:"100%",
    height:"100%",
  },
  libelleStyle:{
    color:'#AA2D5A',
    //fontWeight: '500'
  },
  prixStyle:{
    textAlign: 'right',
    fontWeight: '600',
  },
  button:{
    color:'white',
    padding: 12,
    fontSize:20,
  }
  
});

export default connect(null, { infoProject })(ProjectDetail);
