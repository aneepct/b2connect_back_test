const axios = require("axios");

const getIpInfo = async (req, res) => {
	try {
		const data = await axios({
			method: "GET",
			url: `https://ipinfo.io/${req.body.ip}/geo`,
		});
		res.json({ success: true, data: data.data });
	} catch (error) {
		res.status(400).json({ error: true });
	}
};

const getPopulationInfo = async (req, res) => {
	try {
		const config = {
			method: "GET",
			headers: {
				"x-rapidapi-host": "world-population.p.rapidapi.com",
				"x-rapidapi-key": process.env.POPULATION_API_KEY,
			},
			url: "https://world-population.p.rapidapi.com/population",
			params: { country_name: "India" },
		};
		const countries = [
			"United Arab Emirates",
			"India",
			"China",
			"United Kingdom",
			"Pakistan",
		];
		const promises = countries.map((name) => {
			return axios({ ...config, params: { country_name: name } });
		});
		const responses = await Promise.all(promises);
		const populationInfo = responses.map((response) => {
			return {
				country: response.data.body.country_name,
				population: response.data.body.population,
			};
		});
		res.json({ status: "success", data: populationInfo });
	} catch (error) {
		res.status(400).json({ status: "errror", errors: error });
	}
};

const getExchangeRate = async (req, res) => {

	var options = {
		method: 'GET',
		url: `https://api.xchangeapi.com/json/chart/${req.params.currency}USD/${req.params.period}`,
		headers: {
			'api-key': process.env.CURRENCY_API_KEY
		}
	};

	try {
		let currencyRes = [];
		const currencyResHistory = await axios(options);
		for (const [key, value] of Object.entries(currencyResHistory.data)) {
			// value.length = 4
			// value.splice(0, 0, new Date(key*1000).toLocaleString());
			console.log(value);
			currencyRes.push([new Date(key*1000).toLocaleString(), value[3]]);
		}
		currencyRes.splice(0, 0, ['Day', '']);
		res.json({ success: true, data: currencyRes });
	} catch (error) {
		res.status(400).json({ error: true });
	}
};

const getWeatherDetail = async (req, res) => {
	try {
		if (!req.body.ip)
			return res.status(400).json({
				error: true,
				errors: { ip: "Ip address required." },
			});
		const data = await axios({
			method: "GET",
			url: `https://api.weatherapi.com/v1/forecast.json`,
			params: {
				key: process.env.WEATHER_API_KEY,
				q: req.body.ip,
			},
		});
		res.json({ success: true, data: data.data });
	} catch (error) {
		res.status(400).json({ error: true });
	}
};

module.exports = {
	getIpInfo,
	getPopulationInfo,
	getExchangeRate,
	getWeatherDetail,
};
