

import React from 'react';
import {FlatList, View, ScrollView, Image, TouchableWithoutFeedback, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import {connect} from 'react-redux';

import _ from 'lodash';
import { fetchProjects } from '../redux/actions';
import { 
	Container, 
	Header, 
	Content, 
	List, 
	ListItem, 
	Thumbnail, 
	Text, 
	H2, 
	Left, 
	Body, 
	Right, 
	Button,
	Icon, 
	Grid,
	Row,
	Col,
	Title,
	Item,
	Picker
} from 'native-base';

import i18n from '../i18n/i18n';


class Projets extends React.Component {
	state = {
	    location: null,
	    long: null,
	    lat: null,
	  };
	static navigationOptions = ({ navigation }) => ({
	    title: i18n.t('Projets title'),
	    drawerLabel: i18n.t('Projets title'),
	    header: null,
	    drawerIcon: ({ tintColor }) => (
	      <Ionicons
				name="md-menu"
				size={32}
				//onPress={this.props.navigation.openDrawer()}
				/>
	    ),
	  });
	  findCoordinates = () => {
	    navigator.geolocation.getCurrentPosition(
	      position => {
	        const location = JSON.stringify(position);
	        console.log(location);
	        this.setState({ location:position, long: position.coords.longitude, lat: position.coords.latitude });

	      },
	      error => Alert.alert(error.message),
	      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
	    );
	  };
	constructor(props) {
	    super(props);
	    this.renderRow = this.renderRow.bind(this);
	}
	componentWillMount(){
		this.props.fetchProjects();
		this.findCoordinates();
	}

	printPrix(min,max){
	    /*if(min && max){
	      return i18n.t('min - max',{min,max});
	    }
	    if(min){
	      return i18n.t('from price',{prix:min});
	    }*/
	    if(min){
	    	return i18n.t('price dhs',{prix:min}) ;
	    }
	    return ;

	  }

	renderRow(project){
		//return <ProjectItem project={project.item} />
		 return ( <TouchableWithoutFeedback  key={project.index}
		 	onPress = {() => {
            /* 1. Navigate to the Details route with params */
            this.props.navigation.navigate('ProjectDetail', { project: project.item});
          }}>
          <Grid>
          <Row style={styles.itemProjet}>
	          <Col size={1} style={styles.itemBlockImg}> 
	          	<Image style={styles.itemImg} source={{uri: project.item.cover}} />
	          </Col>
	          <Col size={2} style={styles.itemBlockContent}> 
	          	<H2 style={styles.libelleStyle}>{project.item.libelle}</H2>
	          	<Text note numberOfLines={1}>{project.item.type_de_bien}</Text>
	          	<Text note numberOfLines={2}>{project.item.tags}</Text>
	          	<H2>{this.printPrix(project.item.prix_min,project.item.prix_max) /*&& i18n.t('from price',{prix:project.item.prix_min})*/}</H2>

	          </Col>
          </Row>
          </Grid>
              {/*<Left>
                <Thumbnail square large source={require('../assets/images/plants_2.png')} />
              </Left>
              <Body>
                <Text>{project.item.libelle}</Text>
                <Text note numberOfLines={1}>{project.item.lieu}</Text>
              </Body>
              <Right>
                <Button transparent>
                  <Text>View</Text>
                </Button>
              </Right>*/}
            </TouchableWithoutFeedback> );
		
	}
	render(){
		return( 
			<Container>
				<Header noRight>
		          <Left>
		            <Button transparent onPress={() =>  this.props.navigation.openDrawer()}>
		              <Icon name="menu" />
		            </Button>
		          </Left>
		          <Body>
		            <Title>{i18n.t('Projets title')}</Title>
		          </Body>
		        </Header>				
				<Content>
				 	<FlatList
						keyExtractor= {(item, index) => index.toString()}
						data={this.props.projects}
						renderItem = {this.renderRow}
					/>
				</Content>
			</Container>
		);
	}
}

const styles = StyleSheet.create({
	itemProjet:{
		backgroundColor:'#F5F5F5',
		marginBottom:2,
	},
	itemBlockImg: {
		
	},
	itemImg: {
		width:"100%",
		height:"100%",
	},
	libelleStyle:{
		color:'#AA2D5A',
		//fontWeight: '500'
	},
	itemBlockContent: {
		padding:12,
	}
});


const mapStateToProps = state =>{
	
	const projects = _.map(state.projects.projectsList, (val, uid) => {
		let {tags} = val;
		tags = tags && tags.replace(/,/gi, " - "); 
		return {...val, tags};
		//return  {id,libelle,description,lieu,address} ; 
	});

	return { 
		user: state.auth.user,
		projects
	}
}
export default connect(mapStateToProps, {fetchProjects})(Projets) ;

//export default Projets ;
