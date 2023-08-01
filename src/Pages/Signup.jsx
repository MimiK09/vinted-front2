// import { useParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "./Sign-in-up.css";

const Signup = (props) => {
	const { isLogged, setIsLogged } = props;
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [ageMajority, setAgeMajority] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const navigate = useNavigate();

	const handleSubmit = async (event) => {
		event.preventDefault();
		console.log("evênement envoyé", { username, email, password, ageMajority });
		if (!username || !email || !password) {
			setErrorMessage("anomalie");
		} else if (!ageMajority) {
			setErrorMessage("anomalie checkbox");
		} else {
			try {
				const response = await axios.post(
					"http://localhost:3000/user/signup",
					{ username, email, password, ageMajority }
				);
				const token = response.data.token;
				// Sauvegarde du token dans les cookies
				Cookies.set("token", token, { expires: 7 });
				// je réinitialise data
				setUsername("");
				setEmail("");
				setPassword("");
				setAgeMajority(false);
				setIsLogged(token);
				navigate("/");
			} catch (error) {
				console.log(error.response); // contrairement au error.message d'express
			}
		}
	};

	return (
		<main className="container signinup-container">
			<h2>S'inscrire</h2>
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					placeholder="username"
					name="username"
					onChange={(event) => {
						setUsername(event.target.value);
					}}
					value={username}
				></input>
				<input
					type="email"
					placeholder="email"
					name="email"
					onChange={(event) => {
						setEmail(event.target.value);
					}}
					value={email}
				></input>
				<input
					type="password"
					placeholder="password"
					name="password"
					onChange={(event) => {
						setPassword(event.target.value);
					}}
					value={password}
				></input>
				<div className="signinup-checkbox">
					<div>
						<input
							type="checkbox"
							name="newsletter"
							onClick={(event) => {
								setAgeMajority(event.target.checked);
							}}
							value={ageMajority}
						></input>
					</div>
					<div>
					<p>
						En m'inscrivant, je confirme avoir lu et accepté les termes et
						conditions de confidentialité sur Vinted. Je confirme avoir au moins
						18 ans.
					</p></div>
				</div>
				<button>S'inscrire</button>
				{errorMessage ? <div className="error-message"><p>{errorMessage}</p></div> : ""}
			</form>

			<Link to="/signin">
				<p>Tu as déjà un compte ? Connecte-toi</p>
			</Link>
		</main>
	);
};

export default Signup;
