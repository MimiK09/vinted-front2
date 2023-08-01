import { useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import "./Publish.css";

const Publish = ({ isLogged, setIsLogged }) => {
	// const [picture, setPicture] = useState({});
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [brand, setBrand] = useState("");
	const [size, setSize] = useState("");
	const [color, setColor] = useState("");
	const [condition, setCondition] = useState("");
	const [place, setPlace] = useState("");
	const [price, setPrice] = useState(0);
	const [exchange, setExchange] = useState(false);
	const [errorSubmit, setErrorSubmit] = useState(false);

	// PLUSIEURS IMAGES
	const [picture, setPicture] = useState([]);
	const handleImageChange = (event) => {
		const uploadedPictures = event.target.files;
		const newPictures = [...picture];
		for (let i = 0; i < uploadedPictures.length; i++) {
			newPictures.push(uploadedPictures[i]);
			console.log(
				"je suis dans la boucle for ->",
				" itération",
				i,
				" compo",
				newPictures
			);
		}
		setPicture(newPictures);
	};

	const handleSubmit = async (event) => {
		console.log("picture", picture);
		event.preventDefault();
		if (
			title &&
			description &&
			brand &&
			size &&
			color &&
			condition &&
			place &&
			price &&
			picture
		) {
			setErrorSubmit(false);
			try {
				const formData = new FormData();
				formData.append("title", title);
				formData.append("description", description);
				formData.append("price", price);
				formData.append("brand", brand);
				formData.append("condition", condition);
				formData.append("city", place);
				formData.append("size", size);
				formData.append("color", color);
				for (let i = 0; i < picture.length; i++) {
					formData.append("picture", picture[i]);
				}
				console.log("formData", formData);
				const sentData = await axios.post(
					"http://localhost:3000/offer/publish",
					formData,
					{
						headers: {
							Authorization: `Bearer ${isLogged}`,
							"Content-Type": "multipart/form-data",
						},
					}
				);
				console.log("je passe ici 2", sentData);
			} catch (error) {
				console.log("error>>>", error);
			}
		} else {
			setErrorSubmit(true);
		}
	};

	return isLogged ? (
		<div className="publish-large">
			<main className="container container-publish">
				<h2>Vends ton article</h2>

				<form onSubmit={handleSubmit}>
					<div className="bloc-offer-publish">
						<div className="form-input">
							<label htmlFor="offerPicture">Ajoute une photo</label>
							<input
								type="file"
								multiple
								name="offerPicture"
								id="offerPicture"
								placeholder="Uploader l'image"
								onChange={handleImageChange}
							/>
						</div>
					</div>
					<div className="bloc-offer-publish">
						<div className="form-input">
							<label htmlFor="title">Titre</label>
							<input
								type="text"
								name="title"
								id="title"
								placeholder="ex : Chemise Sézanne Verte"
								onChange={(event) => {
									setTitle(event.target.value);
								}}
								value={title}
							/>
						</div>
						<div className="form-input">
							<label htmlFor="description">Décris ton article</label>
							<input
								type="text"
								name="description"
								id="description"
								placeholder="ex : porté quelques fois, taille correctement"
								onChange={(event) => {
									setDescription(event.target.value);
								}}
								value={description}
							/>
						</div>
					</div>

					<div className="bloc-offer-publish">
						<div className="form-input">
							<label htmlFor="brand">Marque</label>
							<input
								type="text"
								name="brand"
								id="brand"
								placeholder="ex : Sézanne"
								onChange={(event) => {
									setBrand(event.target.value);
								}}
								value={brand}
							/>
						</div>
						<div className="form-input">
							<label htmlFor="size">Taille</label>
							<input
								type="text"
								name="size"
								id="size"
								placeholder="ex : ex : L / 42"
								onChange={(event) => {
									setSize(event.target.value);
								}}
								value={size}
							/>
						</div>
						<div className="form-input">
							<label htmlFor="color">Couleur</label>
							<input
								type="text"
								name="color"
								id="color"
								placeholder="ex : Verte"
								onChange={(event) => {
									setColor(event.target.value);
								}}
								value={color}
							/>
						</div>
						<div className="form-input">
							<label htmlFor="condition">Etat</label>
							<input
								type="text"
								name="condition"
								id="condition"
								placeholder="ex : neuf avec étiquette"
								onChange={(event) => {
									setCondition(event.target.value);
								}}
								value={condition}
							/>
						</div>
						<div className="form-input">
							<label htmlFor="place">Lieu</label>
							<input
								type="text"
								name="place"
								id="place"
								placeholder="ex : Chemise Sézanne Verte"
								onChange={(event) => {
									setPlace(event.target.value);
								}}
								value={place}
							/>
						</div>
					</div>
					<div className="bloc-offer-publish">
						<div className="form-input">
							<label htmlFor="price">Prix</label>
							<input
								type="number"
								name="price"
								id="price"
								placeholder="0,00€"
								onChange={(event) => {
									setPrice(event.target.value);
								}}
								value={price}
							/>
						</div>
						<div className="form-input">
							<label htmlFor="exchange">
								Je suis interessé(e) par les échanges
							</label>
							<input
								type="checkbox"
								name="exchange"
								id="exchange"
								onChange={() => {
									setExchange(!exchange);
								}}
							/>
						</div>
					</div>
					<button>Valider</button>
				</form>
				{errorSubmit ? (
					<div className="error-message">Il manque des données</div>
				) : (
					<></>
				)}
			</main>
		</div>
	) : (
		<Navigate to="/Signin" />
	);
};

export default Publish;
