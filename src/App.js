import './App.css';

import WelcomePage from './Pages/WelcomePage/welcomePage';
import SideBar from './Components/SideBar/sideBar';
import CustomerInformation from './Pages/CustomerInformation/customerInformation';
import SearchCustomer from './Pages/SearchCustomer/searchCustomer';

const App = () => {
	return (
		<div className="App">
			<SideBar />
			<div className="welcome-page" id="welcome-page">
				<WelcomePage />
			</div>
			<div className="customer-information" id="customer-information">
				<CustomerInformation />
			</div>
			<div className="search-customer" id="search-customer">
				<SearchCustomer />
			</div>
		
		</div>
	);
};

export default App;
