import React from 'react';
import {FlatList, View, ScrollView} from 'react-native';
import {connect} from 'react-redux';

import _ from 'lodash';
import { fetchProjects } from '../../redux/actions';
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
	Title } from 'native-base';

class ProjectList extends React.Component{
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
                <Thumbnail square large source={require('../../assets/images/plants_2.png')} />
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
		console.log(' 2 - ',this.props.navigation);
		return (
				<FlatList
					keyExtractor= {(item, index) => index.toString()}
					data={this.props.projects}
					renderItem = {this.renderRow}
				/>
		);
	}
};


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

export default connect(mapStateToProps, {fetchProjects})(ProjectList) ;
