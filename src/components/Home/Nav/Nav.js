import React from "react";

import "./Nav.css";
import { withRouter } from "react-router-dom";
import SignupPopup from "../SignupPopUp/SignupPopUp";
import { Menu, Dropdown, Button } from "antd";

class HomeNav extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loginPopup: false,
			showSignup: false,
			data: {
				id: 0,
				name: "",
				email: "",
				role_id: 0,
				avatar: "",
			},
		};
	}

	toggleSignupPopup = () => {
		this.setState({
			showSignup: !this.state.showSignup,
		});
	};

	render() {
		let token = localStorage.getItem("token");
		let { data } = this.state;
		let { history } = this.props;

		const userActions = (
			<Menu>
				<Menu.Item
					onClick={() => {
						history.push("/upgrade");
					}}
				>
					Upgrade
        </Menu.Item>
				<Menu.Item
					onClick={() => {
						history.push("/settings");
					}}
				>
					Setting
        </Menu.Item>
				<Menu.Item
					onClick={() => {
						history.push("/");
						localStorage.clear();
					}}
				>
					Log out
        </Menu.Item>
			</Menu>
		);
		return (
			<div className="home-nav-container">
				<div className="logo">
					<img
						className="big-logo"
						src={require("../../../utils/images/logo.png")}
						alt="quiz-icon"
					/>
				</div>
				<div className="button-group">
					{token ? (
						<Dropdown
							overlay={userActions}
							placement="bottomRight"
							trigger={["click"]}
						>
							<Button style={{ top: 0 }}>
								<div className="login-user">
									<span className="user-ava">
										<img
											alt="ava"
											src={
												data.avatar
													? data.avatar
													: require("../images/default-ava.png")
											}
											className="mr-1"
										/>
									</span>
									{data.email}
								</div>
							</Button>
						</Dropdown>
					) : (
							<div>
								{/* <button className="b-log-in" onClick={this.togglePopup}>
									Login
              </button> */}
								<button className="b-sign-up mt-1" onClick={this.toggleSignupPopup}>
									Sign up
              </button>
							</div>
						)}
				</div>

				{this.state.showSignup ? (
					<SignupPopup togglePopup={this.toggleSignupPopup} />
				) : null}
			</div>
		);
	}
}

export default (withRouter(HomeNav));
