import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import i18n from '../i18n/i18n';

import {Block} from '../components';
import { theme, params } from '../constants';
import { 
	Container, 
	Content,
	Footer, 
	Left, 
	Body, 
	Right, 
	Button, 
	Text,
	H1,
	Card,
	Label,
	Input,
	CheckBox,
	Item,
	Form,
	Grid,
	Row,
	Col,
	FooterTab
} from 'native-base';


class SignUp extends React.Component {
	render(){
		return( 
			<Container>
				<Content>
					<Block center>
			       		<Image
			       	 		style={styles.logoImg}
			          		source={params.app.LOGO} />
			          	<H1>{i18n.t('Become partner',{ appName: params.app.name })}</H1>
			       </Block>
			       <Block center>
			       <Card style={{width:'90%'}} bordred>
						 <Form>
				            <Item inlineLabel>
				              <Label>{i18n.t('Last Name *')}</Label>
				              <Input />
				            </Item>
				            <Item inlineLabel >
				              <Label>{i18n.t('First Name *')}</Label>
				              <Input />
				            </Item>
				            <Item inlineLabel >
				              <Label>{i18n.t('Adress *')}</Label>
				              <Input />
				            </Item>
				            <Item inlineLabel >
				              <Label>{i18n.t('CIN *')}</Label>
				              <Input />
				            </Item>
				            <Item inlineLabel >
				              <Label>{i18n.t('phone *')}</Label>
				              <Input />
				            </Item>
				            <Item inlineLabel >
				              <Label>{i18n.t('entrepreneur *')}</Label>
				              <CheckBox
				              //checked={this.state.checkbox2}
				              //onPress={() => this.toggleSwitch2()}
				            />
				            </Item>
				            <Item inlineLabel >
				              <Label>{i18n.t('Enter your password *')}</Label>
				              <Input secureTextEntry />
				            </Item>
				            <Item inlineLabel >
				              <Label>{i18n.t('Comfirm your password *')}</Label>
				              <Input secureTextEntry />
				            </Item>
				            <Item inlineLabel >
				              <Label>{i18n.t('Accept CGU')}</Label>
				              <CheckBox
					              //checked={this.state.checkbox2}
					              //onPress={() => this.toggleSwitch2()}
					            />
				            </Item>
				          </Form>
					</Card>
					</Block>
				</Content>
				<Footer style={{padding:3}}>
				<FooterTab>
					<Grid>
		          <Col size={1}>
		          	<Right>
			          <Image
			          	style={styles.faceImg}
				        source={params.app.LOGO} />
			        </Right>
			       </Col>
		          <Col size={3}>
		            <Row>
		            <Text style={{color:'white'}}>Votre Interlocuteur</Text>
		            </Row>
		            <Row>
		            <Text style={{color:'white'}}> 060000000009 / test@gmail.com </Text>
		            </Row>
		          </Col>
		        </Grid>
		        </FooterTab>
				</Footer>
			</Container>
		);
	}
}

const styles = StyleSheet.create({
	container:{
		flex: 1,
	},
	logoImg:{
		height: 150,
	    width: 150,
	    backgroundColor: '#eee',
	    borderRadius: 100,
	},
	faceImg: {
		height: 50,
	    width: 50,
	    backgroundColor: '#eee',
	    borderRadius: 100,
	}
});

export default SignUp ;