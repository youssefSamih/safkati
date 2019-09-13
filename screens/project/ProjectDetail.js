import React from 'react';
import {View, Text, ScrollView, Dimensions, Image, FlatList,StyleSheet } from 'react-native';
//import { Actions } from 'react-native-router-flux';
import { SliderBox } from 'react-native-image-slider-box';

import { Card, H2, Input, Button, Icon,Container,Content , Header,Right,Left,Body,Title, Spinner } from 'native-base';
import {Block} from '../../components';

import { connect } from 'react-redux';
import { infoProject, initialCurrentProjet } from '../../redux/actions';

import i18n from '../../i18n/i18n';

const { width, height } = Dimensions.get('window');

class ProjectDetail extends React.Component {
  static navigationOptions = ({ navigation }) => ({
      header: null,
    });
 	componentWillMount(){
    const { navigation } = this.props;
    const project = navigation.getParam('project');
    // use project info from the listing until the request http for gettion all the project info is completed
    this.props.initialCurrentProjet(project) ;
 		this.props.infoProject({id: project.id});
 	}
  printPrix(min,max){
    if(min && max){
      return i18n.t('min - max',{min,max});
    }
    if(min){
      return i18n.t('from price',{prix:min});
    }
    return ;

  }
  printTags(tags){
    tags = tags && tags.replace(/,/gi, " - "); 
    return tags;
  }
  
 	  renderGallery() {
    const images = this.props.gallery;
    if(!images){
      return (
        <Block center middle style={{height:height/2.4}}>
        <Spinner />
        </Block>
        );
    }
    return <SliderBox 
    sliderBoxHeight={height/2.4}
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
    
    const project = this.props.project;
    
		return (
      <Container>
      <Header  noRight>
        <Left>
          <Button transparent onPress={() =>  this.props.navigation.goBack()}>
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body>
          <Title>{i18n.t('Projet Detail')}</Title>
        </Body>
      </Header>
			<Content >
			{this.renderGallery()}
      <View style={styles.itemProjet}> 
        <H2 style={styles.libelleStyle}>{project && project.libelle}</H2>
        <Text note numberOfLines={1}>{project && project.type_de_bien}</Text>
        <Text note numberOfLines={1}>{project && this.printTags(project.tags)}</Text>
        <View><Text style={styles.prixStyle} >{project &&  this.printPrix(project.prix_min,project.prix_max)}</Text></View>
      </View>
      <View style={{paddingHorizontal:16 * 2,
    paddingVertical:25}}>
			<Text note>
			    {project && project.description}
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

const mapStateToProps = (state) => {
   /* let {tags} = state.currentProject.project;
    tags = tags && tags.replace(/,/gi, " - "); */
   
  return {
    error: state.currentProject.error,
    loading: state.currentProject.loading,
    project: {...state.currentProject.project},
    gallery: state.currentProject.gallery
  };
};

export default connect(mapStateToProps, { infoProject,initialCurrentProjet })(ProjectDetail);
