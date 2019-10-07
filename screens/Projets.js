import React from 'react';
import { FlatList, View, StyleSheet, Alert, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { connect } from 'react-redux';

import _ from 'lodash';
import { fetchProjects } from '../redux/actions';
import {
	Container,
	Header,
	Content,
	Left,
	Body,
	Right,
	Button,
	Icon,
	Title,
} from 'native-base';
import { LinearGradient } from "expo-linear-gradient";

import i18n from '../i18n/i18n';

import FadeIn from '../components/Animations/FadIn';
import HeaderSearch from '../components/UI/headerSearch';
import ProjectItem from '../components/UI/ProjectItem';
import { Platform } from '@unimodules/core';


class Projets extends React.Component {
	state = {
		location: null,
		long: null,
		lat: null,
		toogleHeaderSearch: false,
		filter: {
			address: null,
			libelle: null,
			bien: null,
			type_de_bien: null,
			piece: null,
			prix_min: 0
		}
	};
	static navigationOptions = ({ navigation }) => ({
		title: i18n.t('Projets title'),
		drawerLabel: i18n.t('Projets title'),
		header: null,
		drawerIcon: ({ tintColor }) => (
			<Ionicons
				name="md-albums"
				size={25}
			//onPress={this.props.navigation.openDrawer()}
			/>
		),
	});
	findCoordinates = () => {
		navigator.geolocation.getCurrentPosition(
			position => {
				const location = JSON.stringify(position);
				console.log(location);
				this.setState({ location: position, long: position.coords.longitude, lat: position.coords.latitude });

			},
			error => Alert.alert(error.message),
			{ enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
		);
	};
	constructor(props) {
		super(props);
		this.renderRow = this.renderRow.bind(this);
	}
	componentWillMount() {
		this.props.fetchProjects();
		this.findCoordinates();
	}

	printPrix(min, max) {
	    /*if(min && max){
	      return i18n.t('min - max',{min,max});
	    }
	    if(min){
	      return i18n.t('from price',{prix:min});
	    }*/
		if (min) {
			return i18n.t('price dhs', { prix: min });
		}
		return;

	}

	renderRow(project) {
		//return <ProjectItem project={project.item} />
		return (
			<ProjectItem
				project={project}
				navigation={this.props.navigation}
				printPrix={this.printPrix}
			/>
		);
	}

	_toggleHeaderSearch = () => {
		this.setState(prevState => {
			return {
				...prevState,
				toogleHeaderSearch: !this.state.toogleHeaderSearch
			}
		})
	}

	_handleChange = (value, type) => {
		this.setState(prevState => {
			return {
				...prevState,
				filter: {
					...prevState.filter,
					[type]: value
				}
			}
		})
	}

	_showSearchHeader = () => {
		if (this.state.toogleHeaderSearch) {
			return (
				<FadeIn>
					<View style={{ height: 260 }}>
						<HeaderSearch
							choice={this.props.projects}
							onValueChange={this._handleChange}
							filter={this.state.filter}
						/>
					</View>
				</FadeIn>
			)
		}
		return false;
	}

	render() {
		return (
			<Container>
				<LinearGradient
					colors={["#f6c552", "#ee813c", "#bf245a"]}
					start={[1.5, 0.6]}
					style={styles.paddHeader}
				>
					<Header noRight transparent>
						<Left style={styles.headerFlex}>
							<Button transparent onPress={() => this.props.navigation.openDrawer()}>
								<Icon name="menu" />
							</Button>
						</Left>
						<Body style={styles.bodyHeader}>
							<Title>{i18n.t('Projets title')}</Title>
						</Body>
						<Right style={styles.headerFlex}>
							<Button onPress={() => this._toggleHeaderSearch()} transparent>
								<Icon name='ios-search' style={styles.iosColor} />
							</Button>
						</Right>
					</Header>
				</LinearGradient>
				<Content>
					{this._showSearchHeader()}
					<FlatList
						keyExtractor={(item, index) => index.toString()}
						data={this.props.projects}
						renderItem={this.renderRow}
					/>
				</Content>
			</Container>
		);
	}
}

const styles = StyleSheet.create({
	itemProjet: {
		backgroundColor: '#F5F5F5',
		marginBottom: 2,
	},
	itemBlockImg: {

	},
	itemImg: {
		width: "100%",
		height: "100%",
	},
	libelleStyle: {
		color: '#AA2D5A',
		//fontWeight: '500'
	},
	itemBlockContent: {
		padding: 12,
	},
	headerFlex: { flex: 1 },
	bodyHeader: { flex: 0, alignItems: "flex-end" },
	paddHeader: {
		marginTop: Platform.OS === "android" ? -25 : -5, 
		paddingBottom: Platform.OS === "android" ? 0 : 10 
	}
});


const mapStateToProps = state => {
	const projects = _.map(state.projects.projectsList, (val, uid) => {
		let { tags } = val;
		tags = tags && tags.replace(/,/gi, " - ");
		return { ...val, tags };
		//return  {id,libelle,description,lieu,address} ; 
	});

	return {
		user: state.auth.user,
		projects
	}
}
export default connect(mapStateToProps, { fetchProjects })(Projets);
