import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Offer from "./Pages/Offer";
import Header from "./components/Header";
import Signin from "./Pages/Signin";
import Signup from "./Pages/Signup";
import { useState } from "react";
import Cookies from "js-cookie";
import Publish from "./Pages/Publish";
import Payment from "./Pages/Payment";

function App() {
	const [isLogged, setIsLogged] = useState(Cookies.get("token") || "");
	const [priceMin, setPriceMin] = useState("");
	const [priceMax, setPriceMax] = useState("");
	const [priceAsc, setPriceAsc] = useState(false);
	const [priceDesc, setPriceDesc] = useState(false);
	const [searchWord, setSearchWord] = useState("");

	return (
		<Router>
			<Header
				isLogged={isLogged}
				setIsLogged={setIsLogged}
				priceMin={priceMin}
				setPriceMin={setPriceMin}
				priceMax={priceMax}
				setPriceMax={setPriceMax}
				priceAsc={priceAsc}
				setPriceAsc={setPriceAsc}
				priceDesc={priceDesc}
				setPriceDesc={setPriceDesc}
				searchWord={searchWord}
				setSearchWord={setSearchWord}
			/>
			<Routes>
				<Route
					path="/"
					element={
						<Home
							{...{
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
							}}
						/>
					}
				/>
				<Route
					path="/offer/:id"
					element={<Offer isLogged={isLogged} setIsLogged={setIsLogged} />}
				/>
				<Route
					path="/signup"
					element={<Signup isLogged={isLogged} setIsLogged={setIsLogged} />}
				/>
				<Route
					path="/signin"
					element={<Signin isLogged={isLogged} setIsLogged={setIsLogged} />}
				/>
				<Route
					path="/publish"
					element={<Publish isLogged={isLogged} setIsLogged={setIsLogged} />}
				/>
				<Route
					path="/payment/:id"
					element={<Payment isLogged={isLogged} setIsLogged={setIsLogged} />}
				/>
			</Routes>
		</Router>
	);
}
export default App;
