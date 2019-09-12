

import React from 'react';
import {FlatList, View, ScrollView} from 'react-native';
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
	Left, 
	Body, 
	Right, 
	Button,
	Icon, 
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
		 return ( <ListItem thumbnail key={project.index}
		 	onPress = {() => {
            /* 1. Navigate to the Details route with params */
            this.props.navigation.navigate('ProjectDetail', { project: project.item});
          }}>
              <Left>
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
              </Right>
            </ListItem> );
		
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
