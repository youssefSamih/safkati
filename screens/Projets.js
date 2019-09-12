

import React from 'react';
import {FlatList, View, ScrollView,Image,TouchableWithoutFeedback  } from 'react-native';
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
	Title
} from 'native-base';

class Projets extends React.Component {

	static navigationOptions = ({ navigation }) => ({
	    title: "Projets",
	    drawerLabel: 'Projets',
	    header: null,
	    drawerIcon: ({ tintColor }) => (
	      <Ionicons
				name="md-menu"
				size={32}
				//onPress={this.props.navigation.openDrawer()}
				/>
	    ),
	  });

	constructor(props) {
	    super(props);
	    this.renderRow = this.renderRow.bind(this);
	}
	componentWillMount(){
		this.props.fetchProjects();
	}
	renderRow(project){
		//return <ProjectItem project={project.item} />
		 return ( <TouchableWithoutFeedback  key={project.index}
		 	onPress = {() => {
            /* 1. Navigate to the Details route with params */
            this.props.navigation.navigate('ProjectDetail', { project: project.item});
          }}>
          <View style={styles.itemProjet}>
	          <View style={styles.itemBlockImg}> 
	          	<Image style={styles.itemImg} source={require('../assets/images/plants_2.png')} />
	          </View>
	          <View style={styles.itemBlockContent}> 
	          	<H2 style={{color:'#AA2D5A'}}>{project.item.libelle}</H2>
	          	<Text note numberOfLines={1}>Appartement</Text>
	          	<Text note numberOfLines={1}>120m - 3Km</Text>
	          	<Text note numberOfLines={1}>Terrasse - parking</Text>
	          	<H2 >12200 DHs</H2>

	          </View>
          </View>
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
		            <Title>Project</Title>
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

const styles = {
	itemProjet:{
		flex:1,
		flexDirection:'row',
		backgroundColor:'#F5F5F5',
		marginBottom:2,
	},
	itemBlockImg: {
		
	},
	itemImg: {
		width:150,
		height:150,
	},
	itemBlockContent: {
		padding:12,
	}
}


const mapStateToProps = state =>{
	
	const projects = _.map(state.projects.projectsList, (val, uid) => {
		const {id,libelle,description,lieu,address} = val
		return  {id,libelle,description,lieu,address} ; 
	});

	return { 
		user: state.auth.user,
		projects
	}
}
export default connect(mapStateToProps, {fetchProjects})(Projets) ;

//export default Projets ;
