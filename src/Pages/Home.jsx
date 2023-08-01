// import { Link } from "react-router-dom";
import "./Home.css"
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import imagebanner from "../assets/banner-vinted.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
library.add(faSpinner);

const Home = ({
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
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	let api = "http://localhost:3000/offers";

	if (priceMin || priceMax || priceAsc || priceDesc || searchWord) {
		api = api + `?`;
	}

	if (searchWord) {
		api = api + `title=${searchWord}`;
	}

	if (priceMin) {
		api = api + `&priceMin=${priceMin}`;
	}

	if (priceMax) {
		api = api + `&priceMax=${priceMax}`;
	}

	if (priceAsc) {
		api = api + `&sort=price-asc`;
	}

	if (priceDesc) {
		api = api + `&sort=price-desc`;
	}

	console.log("api", api);

	const fetchData = async () => {
		try {
			const response = await axios.get(api);
			const offers = response.data.offers;
			console.log("offers", offers)
			setData(offers);
			setIsLoading(true);
		} catch (error) {
			console.log(error.response); // contrairement au error.message d'express
		}
	};

	useEffect(() => {
		fetchData();
	}, [priceMin, priceMax, priceAsc, priceDesc, searchWord]);

	const truncatedText = (string) => {
		return string.slice(0, 30) + "...";
	};

	return isLoading ? (
		<>
			<div className="hero-banner-container">
				<img src={imagebanner} alt="faire tri dans placard" />
				<div className="cadre">
					<div>
						<p>Prêts à faire du tri dans vos placards ?</p>
						<button>Commencer à vendre</button>
					</div>
				</div>
			</div>

			<main className="container container-home">
				{data.map((element) => {
					return (
						<div key={element._id} className="tuile">
							<Link to={`/offer/${element._id}`}>
								<div className="title-tuile">
									<p>{truncatedText(element.product_name)}</p>
								</div>
								<div className="details-tuile">
									<div className="container-image-tuile">
										<img
											src={element.product_image}
											alt={element.product_name}
										/>
									</div>
									<p className="price">{element.product_price}€</p>
									<p>{element.product_details[1].TAILLE}</p>
									<p>{element.product_details[0].MARQUE}</p>
								</div>
							</Link>
						</div>
					);
				})}
			</main>
		</>
	) : (
		<div className="charging-element">
			<FontAwesomeIcon icon={faSpinner} />
			<p>En cours de chargement</p>
		</div>
	);
};

export default Home;
