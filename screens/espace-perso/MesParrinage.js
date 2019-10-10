import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { connect } from 'react-redux';
import Moment from 'moment';

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
	Text,
	Card,
	ListItem,
	H1,
	H2,
	Thumbnail,
	Grid,
	Row,
	Col,
	Separator
} from 'native-base';

import i18n from '../../i18n/i18n';
import Enconstruction from '../EnConstuction';
import { theme, params } from '../../constants';
import { Block } from '../../components';
import { fetchParrainage } from '../../redux/actions';


class MesParrinage extends React.Component {
	static navigationOptions = ({ navigation }) => ({
		title: i18n.t('My referrals title'),
		drawerLabel: i18n.t('My referrals label'),
		drawerIcon: ({ tintColor }) => (
			<Ionicons
				name="md-menu"
				size={32}
			//onPress={this.props.navigation.openDrawer()}
			/>
		),
	});

	componentWillMount() {
		this.props.fetchParrainage(this.props.user.id);
		// this.props.infoProject({id: project.id});
	}

	renderRow(row) {
		//console.log(row);
		return (
			/*<ListItem>
			<Body>
						<Text>{row.item.nom +" "+row.item.prenom}</Text>
						<Text note>{Moment(row.item.date_creation).format('DD/MM/Y')}</Text>
				</Body>
				</ListItem>*/
			<Card style={styles.cardStyle}>
				<Grid>
					<Row style={styles.cardRow}>
						<Col>
							<H2>{i18n.t('Name')} :</H2>
						</Col>
						<Col>
							<H2 style={{ color: theme.colors.primary }}>{row.item.nom + " " + row.item.prenom}</H2>
						</Col>
					</Row>
					<Row style={styles.cardRow}>
						<Col>
							<H2>{i18n.t('Created in')} :</H2>
						</Col>
						<Col>
							<H2 style={{ color: theme.colors.primary }}>{Moment(row.item.date_creation).format('DD/MM/Y')}</H2>
						</Col>
					</Row>
					<Row style={styles.cardRow}>
						<Col>
							<H2>{i18n.t('Email')} :</H2>
						</Col>
						<Col>
							<H2 style={{ color: theme.colors.primary }}>{row.item.email}</H2>
						</Col>
					</Row>
					<Row style={[styles.cardRow, styles.cardRowLast]}>
						<Col>
							<H2>{i18n.t('phone')} :</H2>
						</Col>
						<Col>
							<H2 style={{ color: theme.colors.primary }}>{row.item.phone}</H2>
						</Col>
					</Row>

				</Grid>
			</Card>
		);
	}
	render() {
		return (
			<Container>
				<Header noRight>
					<Left>
						<Button transparent onPress={() => this.props.navigation.goBack()}>
							<Icon name={ I18nManager.isRTL ? "arrow-forward" : "arrow-back" } />
						</Button>
					</Left>
					<Body>
						<Title>{i18n.t('My referrals title')}</Title>
					</Body>
				</Header>
				<Content>
					<Block center padding={18}>
						<Thumbnail
							large
							style={styles.logoImg}
							source={params.app.LOGO} />
						<H1 style={{ color: theme.colors.primary }}>{i18n.t('My referrals')}</H1>
					</Block>
					<Separator bordered style={{ backgroundColor: 'white', borderColor: 'white' }} />
					<FlatList
						keyExtractor={(item, index) => index.toString()}
						data={this.props.mes_parraines}
						renderItem={this.renderRow.bind(this)}
					/>
				</Content>
			</Container>
		);
	}
}

const styles = StyleSheet.create({
	cardStyle: {
		padding: 18,
		marginLeft: 20,
		marginRight: 20,
		borderRadius: 10,
	},
	logoImg: {
		backgroundColor: '#eee',
	},
	cardRow: {
		paddingTop: 10,
		paddingBottom: 10,
		borderBottomWidth: 1,
		borderBottomColor: '#eee',
	},
	cardRowLast: {
		borderBottomWidth: 0,
	},
});

const mapStateToProps = (state) => ({
	user: state.auth.user,
	mes_parraines: state.monespace.mes_parraines,
});

export default connect(mapStateToProps, { fetchParrainage })(MesParrinage);