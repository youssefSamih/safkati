import React from 'react';
import { Text, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from "expo-linear-gradient";
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
	ListItem,
} from 'native-base';

import i18n from '../../i18n/i18n';
import { params } from '../../constants';

class ClientDeclaredMenu extends React.Component {
	static navigationOptions = () => ({
		title: i18n.t('My clients declared'),
		drawerLabel: i18n.t('My clients declared'),
		drawerIcon: () => (
			<Ionicons
				name="md-menu"
				size={32}
			//onPress={this.props.navigation.openDrawer()}
			/>
		),
	});

	render() {
		return (
			<Container>
				<LinearGradient
					colors={["#f6c552", "#ee813c", "#bf245a"]}
					start={[1.5, 0.6]}
					style={styles.paddHeader}
				>
					<Header transparent noRight>
						<Left>
							<Button transparent onPress={() => this.props.navigation.goBack()}>
								<Icon name="arrow-back" />
							</Button>
						</Left>
						<Body>
							<Title>{i18n.t('My clients declared')}</Title>
						</Body>
					</Header>
				</LinearGradient>
				<Content style={{ marginRight: 0, padding: 20 }}>
					<ListItem onPress={() => this.props.navigation.navigate('ClientsDeclare')} style={styles.borderMenu}>
						<Left>
							<Text>
								{i18n.t('Declared customers')}
							</Text>
						</Left>
						<Right>
							<Icon name="arrow-forward" style={styles.iconColor} />
						</Right>
					</ListItem>
					<ListItem onPress={() => this.props.navigation.navigate('ClientsDeclare', { status_client: params.STATUS_ENCOURS })} style={styles.borderMenu}>
						<Left>
							<Text>
								{i18n.t('Customers to be confirmed')}
							</Text>
						</Left>
						<Right>
							<Icon name="arrow-forward" style={styles.iconColor} />
						</Right>
					</ListItem>
					<ListItem onPress={() => this.props.navigation.navigate('ClientsDeclare', { status_client: params.STATUS_VALID })} style={styles.borderMenu}>
						<Left>
							<Text>
								{i18n.t('Verified customers')}
							</Text>
						</Left>
						<Right>
							<Icon name="arrow-forward" style={styles.iconColor} />
						</Right>
					</ListItem>
					<ListItem onPress={() => this.props.navigation.navigate('ClientsDeclare', { status_client: params.STATUS_ANULER })} style={styles.borderMenu}>
						<Left>
							<Text>
								{i18n.t('Canceled customers')}
							</Text>
						</Left>
						<Right>
							<Icon name="arrow-forward" style={styles.iconColor} />
						</Right>
					</ListItem>
				</Content>
			</Container>
		);
	}
}

const styles = StyleSheet.create({
	paddHeader: {
    marginTop: Platform.OS === "android" ? -25 : -5,
    paddingBottom: Platform.OS === "android" ? 0 : 10
	},
	borderMenu: { borderColor: "#e4a0b1" },
	iconColor: { color: "#e26745" }
})

export default ClientDeclaredMenu;