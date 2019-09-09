import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import i18n from '../i18n/i18n';
import { 
	Container, 
	Content, 
	Header,
	Footer, 
	Left, 
	Body, 
	Right, 
	Button, 
	Icon, 
	Title,
	Text,
	Form,
	Item,
	Label,
	IconNB,
	Input

} from 'native-base';

import {Block, Divider} from '../components';
import { theme, params } from '../constants';


class Login extends React.Component {
	render(){
		return( 
			
			<Container style={styles.container}>
	        <Content padder bordered>
	        <Block padding={[0, theme.sizes.base * 2]}>
		       <Divider />
		        <Block middle >
			        <Block center>
			       	<Image
			       	 style={styles.logoImg}
			          source={params.app.LOGO} />
			       </Block>
		          <Form style={{paddingTop: 20}}>
		              <Label style={styles.labelText}>{i18n.t('Username')} </Label>
		            <Item rounded error>
		              <Input />
		              <IconNB name="ios-close-circle" />
		            </Item>
		              <Label style={styles.labelText}>{i18n.t('Password')}</Label>
		            <Item rounded>
		              <Input secureTextEntry />
		            </Item>
		          </Form>
		          <Button transparent  onPress={() => this.props.navigation.navigate('Forgot')}>
		              <Text>
		                {i18n.t('Forgot your password?')}
		              </Text>
		           </Button>
		         </Block>
		         <Block center>
			        <Button rounded>
			           <Text>{i18n.t('Log in')}</Text>
			        </Button>
			        <Button transparent>
			           <Text>{i18n.t('Create an account')}</Text>
			        </Button>
		         </Block>
	         </Block>
	        </Content>
	        
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
	header: {
		backgroundColor: "#AA2D5A"
	},
	labelText:{
		fontSize: 18,
		padding: 10,
	}
});
export default Login ;