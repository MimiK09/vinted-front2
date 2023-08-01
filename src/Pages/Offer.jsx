import "./Offer.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
library.add(faSpinner);


const Offer = ({ isLogged, setIsLogged }) => {
	const params = useParams();
	console.log("params", params);
	const navigate = useNavigate();

	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const fetchData = async () => {
		try {
			const response = await axios.get(
				`http://localhost:3000/offer/${params.id}`
			);
			const offre = response.data;
			setData(offre);
			setIsLoading(true);
		} catch (error) {
			console.log(error.response); // contrairement au error.message d'express
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	const handlePay = (id_offre) => {
		if (isLogged) {
			navigate(`/payment/${id_offre}`);
		} else {
			navigate(`/signin`);
		}
	};

	return isLoading ? (
		<main className="offer-container">
			<div className="offer-carroussel-image">
				<div className="offer-container-image">
					<img
						src={data.product_pictures[0]}
						alt={data.product_name}
					/>
				</div>
			</div>
			<div className="offer-description-container">
				<div className="offer-description">
					<div>
						<p className="price">{data.product_price}€</p>
						<div className="offer-description-details">
							<div>
								<p>MARQUE</p>
								<p>
									{data.product_details[0].MARQUE
										? data.product_details[0].MARQUE
										: " "}
								</p>
							</div>
							<div>
								<p>TAILLE</p>
								<p>
									{data.product_details[1].TAILLE
										? data.product_details[1].TAILLE
										: " "}
								</p>
							</div>
							<div>
								<p>ETAT</p>
								<p>
									{data.product_details[2].ÉTAT
										? data.product_details[2].ÉTAT
										: " "}
								</p>
							</div>
							<div>
								<p>COULEUR</p>
								<p>
									{data.product_details[3].COULEUR
										? data.product_details[3].COULEUR
										: " "}
								</p>
							</div>
							<div>
								<p>EMPLACEMENT</p>
								<p>
									{data.product_details[4].EMPLACEMENT
										? data.product_details[4].EMPLACEMENT
										: " "}
								</p>
							</div>
						</div>
					</div>
					<div className="separator"></div>
					<div>
						<p className="name">{data.product_name}</p>
						<p>{data.product_description}</p>
						<div>
							<div></div>
							<p>{data.owner.account.username}</p>
						</div>
					</div>
					<button onClick={() => handlePay(data._id)}>Acheter</button>
				</div>
			</div>
		</main>
	) : (
		<div className="charging-element"><FontAwesomeIcon icon={faSpinner} /><p>En cours de chargement</p></div>
	);
};

export default Offer;
