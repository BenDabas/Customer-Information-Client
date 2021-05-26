import React from 'react';
import { Link, animateScroll as scroll } from 'react-scroll';

import './sideBar.css';

const SideBar = () => {
	return (
		<div className="sidebar-wrapper">
			<Link
				style={{ fontSize: '17px' }}
				to="welcome-page"
				className="link"
				spy={true}
				smooth={true}
				offset={-52}
				duration={600}
				style={{ padding: '20px' }}
			>
				ראשי
			</Link>
			<Link
				style={{ fontSize: '17px' }}
				to="customer-information"
				className="link"
				spy={true}
				smooth={true}
				offset={-52}
				duration={600}
				style={{ padding: '20px' }}
			>
				יצירת\ עדכון פרטי לקוח
			</Link>

			<Link
				style={{ fontSize: '17px' }}
				to="search-customer"
				className="link"
				spy={true}
				smooth={true}
				offset={-52}
				duration={600}
				style={{ padding: '20px' }}
			>
				חיפוש לקוח
			</Link>
			{/* 
			<a href="welcome-page" className="link">
				ראשי
			</a>
			<a href="customer-information" className="link">
				יצירת עדכון\ פרטי לקוח
			</a>
			<a className="link">חיפוש לקוח</a> */}
		</div>
	);
};

export default SideBar;
