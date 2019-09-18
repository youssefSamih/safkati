import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Table, TableWrapper, Row } from 'react-native-table-component';
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
	Thumbnail,
	H1
} from 'native-base';
import { connect } from 'react-redux';

import i18n from '../../i18n/i18n';
import Enconstruction from '../EnConstuction';
import {Block} from '../../components';
import { theme, params } from '../../constants';
import { fetchCommissions } from '../../redux/actions';


class MesCommissions extends React.Component {
	static navigationOptions = ({ navigation }) => ({
	    title: i18n.t('My commissions title'),
	    drawerLabel: i18n.t('My commissions label'),
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
	    this.state = {
	      tableHead: [i18n.t('Customer name') , i18n.t('Project'),i18n.t('Commission') ],
	      widthArr: [170, 180, 90]
	    }
	  }

	componentWillMount(){
	    this.props.fetchCommissions(this.props.user.id) ;
	 	// this.props.infoProject({id: project.id});
 	} 
	render(){
	    const state = this.state;
	    const tableData = [];
	    this.props.commissions.map((commission, index) => {
	    	tableData.push([commission.nomClient,commission.projet,commission.commission]);
	    });

		return( 
			<Container>
				<Header noRight>
				  <Left>
			          <Button transparent onPress={() =>  this.props.navigation.goBack()}>
			            <Icon name="arrow-back" />
			          </Button>
			      </Left>
				  <Body>
				    <Title>{i18n.t('My commissions title')}</Title>
				  </Body>
				</Header>				
				<Content>
					<Block center padding={18}>
			       		<Thumbnail
			       	  		large
			       	 		style={styles.logoImg}
			          		source={params.app.LOGO} />
			          	<H1 style={{color:theme.colors.primary}}>{i18n.t('My commissions title')}</H1>
			       </Block>

				 	<View style={styles.container}>
				        <ScrollView horizontal={true}>
				          <View>
				            <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
				              <Row data={state.tableHead} widthArr={state.widthArr} style={styles.header} textStyle={styles.textHeader}/>
				            </Table>
				            <ScrollView style={styles.dataWrapper}>
				              <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
				                {
				                  tableData.map((rowData, index) => (
				                    <Row
				                      key={index}
				                      data={rowData}
				                      widthArr={state.widthArr}
				                      style={[styles.row, index%2 && {backgroundColor: '#F7F6E7'}]}
				                      textStyle={styles.text}
				                    />
				                  ))
				                }
				              </Table>
				            </ScrollView>
				          </View>
				        </ScrollView>
				      </View>
				</Content>
			</Container>
		);
	}
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  header: { height: 50, backgroundColor: theme.colors.primary },
  text: { textAlign: 'center', fontWeight: '100' },
  textHeader: { color:'white', textAlign: 'center' },
  dataWrapper: { marginTop: -1 },
  row: { height: 40, backgroundColor: '#E7E6E1' },
  logoImg:{ backgroundColor: '#eee' },
});

const mapStateToProps = (state) => ({
  	user: state.auth.user,
  	commissions: state.monespace.commissions,
});

export default connect(mapStateToProps, {fetchCommissions})(MesCommissions) ;
