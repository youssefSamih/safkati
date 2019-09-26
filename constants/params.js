const app = {
LOGO: require('../assets/logo.png'),
name:"SAFKATI",
FACE:require('../assets/user-hp.png'),
};
const status = {
	valid: require('../assets/icons/status_valid.png'),
	client_interest: require('../assets/icons/client_interest.png'),
	pris_rdv: require('../assets/icons/pris_rdv.png'),
	sav: require('../assets/icons/sav.png'),
	scv: require('../assets/icons/scv.png'),
	status_rdv: require('../assets/icons/status_rdv.png')
};

const STATUS_VALID = 0;
const STATUS_ENCOURS = 1;
const STATUS_ANULER = 2;
const CLIENT_INTEREST = 2;
const CLIENT_NOINTEREST = 2;
export {
	app,
	status,
	STATUS_VALID,
	STATUS_ENCOURS,
	STATUS_ANULER,
	CLIENT_INTEREST,
	CLIENT_NOINTEREST
}