import { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";

const CheckoutForm = ({ price, isLogged, boughtItemName, boughtItemId }) => {
	const stripe = useStripe();
	const elements = useElements();
	const [completed, setCompleted] = useState(false);

	const handleSubmit = async (event) => {
		event.preventDefault();
		const cardElement = elements.getElement(CardElement);

		// j'envoi le token qui permettra ensuite d'identifier l'acheteur

		const stripeResponse = await stripe.createToken(cardElement, {
			name: boughtItemName,
		});

		const stripeToken = stripeResponse.token.id;
		console.log("resp", stripeToken);
		try {
			const response = await axios.post(
				"http://localhost:3000/payment",
				{
					token: stripeToken,
					title: boughtItemName,
					amount: price * 100,
					offer_id: boughtItemId,
					user_token: isLogged,
				},
				{
					headers: {
						Authorization: `Bearer ${isLogged}`,
					},
				}
			);
			console.log("response.data", response.data);
			if (response.data.status === "succeeded") {
				setCompleted(true);
			}
		} catch (error) {
			console.log("error>>>", error);
		}
	};

	return (
		<div className="payment-container">
			{!completed ? (
				<form onSubmit={handleSubmit} className="payment-form">
					<CardElement />
					<button type="submit">Valider</button>
				</form>
			) : (
				<div className="successfull-payment">
					<p>Paiement effectué !</p>
				</div>
			)}
		</div>
	);
};

export default CheckoutForm;
