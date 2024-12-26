
import "./SignupForm.css";

import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import { signUp } from "../../../store/session";

import Information from "../Information";
import LoginFormModal from "../LoginFormModal";
import OpenModalButton from "../../OpenModalButton";


import { NavLink } from "react-router-dom/cjs/react-router-dom.min";

function SignupFormModal() {

	const dispatch = useDispatch();
	const ulRef = useRef()

	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState([]);

	const { closeModal } = useModal();
	const [showMenu, setShowMenu] = useState(false);

	const closeMenu = (e) => {
        if (!ulRef.current.contains(e.target)) {
          setShowMenu(false);
        }
    };


	const handleSubmit = async (e) => {
		e.preventDefault();
		if (password === confirmPassword) {
			const data = await dispatch(signUp(username, email, password));

			if (data) {
				setErrors(data);
			} else {
				closeModal();
			}
		} else {
			setErrors({"password":"Confirm Password field must be the same as the Password field"});
		}
	};


	function toLogin(){
		return(
			<OpenModalButton
				buttonText="Login"
				onItemClick={closeMenu}
				modalComponent={<LoginFormModal/>}
			/>
		)
    }

	function toQuote(){
		return(
			<OpenModalButton
				buttonText="Get Quote"
				onItemClick={closeMenu}
				modalComponent={<Information/>}
			/>
		)
    }

	return (
		<>


			<form className='signUpModalForm' onSubmit={handleSubmit}>
				<div className="signUpDiv">
					<h1>Sign Up</h1>

					<label>
						<div>Email</div>
						<input
							type="text"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
					</label>

					<div className="errors">{errors?.email ? errors?.email : null}</div>

					<label>
						<div>Username</div>
						<input
							type="text"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							required
						/>
					</label>

					<div className="errors">{errors?.username ? errors?.username : null}</div>

					<label>
						<div>Password</div>
						<input
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
					</label>

					<label>
						<div>Confirm Password</div>
						<input
							type="password"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							required
						/>
					</label>

					<div className="errors">{errors?.password ? errors?.password : null}</div>
					<button className='Buttons' type="submit">Sign Up</button>

					<div className='signUpLogin'>
						<div>Already have an account ?</div>
						<NavLink onClick={()=>{closeModal()}} className='sPageLogin' exact to='/login'>login</NavLink>
					</div>
				</div>

			</form>

			

			
		</>
	);
}

export default SignupFormModal;
