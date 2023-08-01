import "./Header.css"
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import logo from "../assets/logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
library.add(faMagnifyingGlass);

const Header = ({
	isLogged,
	setIsLogged,
	priceMin,
	setPriceMin,
	priceMax,
	setPriceMax,
	priceAsc,
	setPriceAsc,
	priceDesc,
	setPriceDesc,
	searchWord,
	setSearchWord,
}) => {
	return (
		<header>
			<div className="container container-header">
				<Link to="/">
					<img src={logo} alt="logo-vinted" />
				</Link>
				<form>
					<div className="searchBar">
						<FontAwesomeIcon icon={faMagnifyingGlass} className="icon" />
						<input
							type="text"
							placeholder="Rechercher des articles"
							onChange={(event) => {
								setSearchWord(event.target.value);
							}}
							value={searchWord}
						></input>
					</div>
					<div className="filter-sort-prices">
						<div className="filters">
							<input
								type="number"
								placeholder="prix-min"
								onChange={(event) => {
									console.log("event", event.target.value);
									setPriceMin(event.target.value);
								}}
								value={priceMin}
							></input>
							<input
								type="number"
								placeholder="prix-max"
								onChange={(event) => {
									setPriceMax(event.target.value);
								}}
								value={priceMax}
							></input>
						</div>
						<div className="sort-by">
							<div>
								<p>Prix croissant</p>
								<input
									type="radio"
									name="tri"
									onClick={() => {
										setPriceDesc(false);
										setPriceAsc(true);
									}}
								></input>
							</div>
							<div>
								<p>Sans tri</p>
								<input
									type="radio"
									name="tri"
									onClick={() => {
										setPriceDesc(false);
										setPriceAsc(false);
									}}
								></input>
							</div>
							<div>
								<p>Prix décroissant</p>
								<input
									type="radio"
									name="tri"
									onClick={() => {
										setPriceDesc(true);
										setPriceAsc(false);
									}}
								></input>
							</div>
						</div>
					</div>
				</form>
				{!isLogged ? (
					<div className="inscription-connexion">
						<Link to="/signup">
							<button>S'inscrire</button>
						</Link>
						<Link to="/signin">
							<button>Se connecter</button>
						</Link>
					</div>
				) : (
					<div className="inscription-connexion">
						<button
							className="inactive"
							onClick={() => {
								setIsLogged("");
								Cookies.remove("token");
							}}
						>
							Se déconnecter
						</button>
					</div>
				)}
				<Link to="/Publish">
					<button>Vends tes articles</button>
				</Link>
			</div>
		</header>
	);
};

export default Header;
