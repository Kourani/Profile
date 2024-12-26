
import './Navigation.css';

import React, {useState, useRef} from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import ProfileButton from './ProfileButton';

import { logout } from "../../store/session";



function Navigation({ isLoaded }){

	const dispatch = useDispatch();
	const history = useHistory();



	const handleLogout = (e) => {
		e.preventDefault();
		dispatch(logout());
	
		history.push('/')
	  };

	

	return (
		<div className='NavBar'>
			<div className='NavCartHome'>
				<div className='barLinks'>
					<NavLink className='Home' exact to="/">
						<div className='navaImage'>
						{<img src='../../../images/nava.png' alt='image'/>}
						{ 
							<div 
								className='navaFont'>Malak Kourani
							</div> 
						}
						</div>
					</NavLink>

				</div>
			</div>
		</div>
	);
}

export default Navigation;
