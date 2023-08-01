import axios from "axios";
import { useState, useEffect } from "react";
// import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
// import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";
const stripePromise = loadStripe(
	"pk_test_51HCObyDVswqktOkX6VVcoA7V2sjOJCUB4FBt3EOiAdSz5vWudpWxwcSY8z2feWXBq6lwMgAb5IVZZ1p84ntLq03H00LDVc2RwP"
);

const Payment = ({isLogged, setIsLogged}) => {
	const params = useParams();
	const [price, setPrice] = useState("");
    const [boughtItemId, setBoughtItemId] = useState("");
	const [boughtItemName, setBoughtItemName] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const fetchData = async () => {
		try {
			const response = await axios.get(
				`http://localhost:3000/offer/${params.id}`
			);
			const priceToPay = response.data.product_price;
			const boughtName = response.data.product_name;
            const boughtID = response.data._id;
			setPrice(priceToPay);
            setBoughtItemId(boughtID);
			setBoughtItemName(boughtName)
			setIsLoading(true);
		} catch (error) {
			console.log(error.response); // contrairement au error.message d'express
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<main>
			{isLoading ? (
				<div>
					<Elements stripe={stripePromise}>
						<CheckoutForm price={price} isLogged={isLogged} boughtItemId={boughtItemId} boughtItemName={boughtItemName}/>
					</Elements>
				</div>
			) : (
				<div className="charging-element"><p>En cours de chargement</p></div>
			)}
		</main>
	);
};

export default Payment;
