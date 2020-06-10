import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useFormik } from "formik";

function Details({ detailsId }) {
    const [localList, setLocalList] = useState([]);
    const [country, setCountry] = useState({});

    useEffect(() => {
        setLocalList(JSON.parse(localStorage.getItem("favCountriesList")));
    }, [detailsId]);

    useEffect(() => {
        const localCountry = localList.find(
            (country) => country.numericCode === detailsId
        );
        if (localCountry !== undefined) {
            if (localCountry.fromOurGalaxy === true) {
                Axios.get(
                    `https://restcountries.eu/rest/v2/name/${localCountry.name}`
                )
                    .then((response) => setCountry(response.data[0]))
                    .catch((error) => console.log(error));
            } else {
                setCountry(localCountry);
            }
        }
    }, [localList, detailsId]);

    const formik = useFormik({
        initialValues: {
            name: country.name,
            alpha3Code: country.alpha3Code,
            capital: country.capital,
            region: country.region,
            subregion: country.subregion,
            population: country.population,
            timezones: country.timezones,
            borders: country.borders,
            flag: country.flag,
        },
        onSubmit: (values) => {
            setCountry({
                name: values.name,
                alpha3Code: values.alpha3Code,
                capital: values.capital,
                region: values.region,
                subregion: values.subregion,
                population: values.population,
                flag: values.flag,
            });
        },
    });

    const resetCountry = () => {
        setCountry({
            name: "",
            alpha3Code: "",
            capital: "",
            region: "",
            subregion: "",
            borders: "",
            flag: "",
        });
    };

    return (
        <>
            <div id="details">
                <h1>{country.name}</h1>
                {country.flag ? (
                    <img id="detailsFlag" src={country.flag} alt="flag" />
                ) : null}
                {country.capital ? <div>Capital: {country.capital}</div> : null}
                {country.region ? <div>Region : {country.region}</div> : null}
                {country.subregion ? (
                    <div>Subregion : {country.subregion}</div>
                ) : null}
                {country.population ? (
                    <div>Population : {country.population}</div>
                ) : null}
                {country.alpha3Code ? (
                    <div>Alpha code : {country.alpha3Code}</div>
                ) : null}
            </div>
            <div id="detailsFormik">
                <form onSubmit={formik.handleSubmit}>
                    <input
                        name={"name"}
                        placeholder="TYPE NAME"
                        onChange={formik.handleChange}
                        value={formik.values.name}
                    />
                    <br />
                    <input
                        name={"capital"}
                        placeholder="TYPE CAPITAL"
                        onChange={formik.handleChange}
                        value={formik.values.capital}
                    />
                    <br />
                    <input
                        name={"region"}
                        placeholder="TYPE REGION"
                        onChange={formik.handleChange}
                        value={formik.values.region}
                    />
                    <br />
                    <input
                        name={"subregion"}
                        placeholder="TYPE SUBREGION"
                        onChange={formik.handleChange}
                        value={formik.values.subregion}
                    />
                    <br />
                    <input
                        name={"population"}
                        placeholder="TYPE POPULATION"
                        onChange={formik.handleChange}
                        value={formik.values.population}
                    />
                    <br />
                    <input
                        name={"flag"}
                        placeholder="TYPE FLAG URL"
                        onChange={formik.handleChange}
                        value={formik.values.flag}
                    />
                    <br />
                    <input
                        name={"alpha3Code"}
                        placeholder="TYPE ALPHA CODE"
                        onChange={formik.handleChange}
                        value={formik.values.alpha3Code}
                    />
                    <br />
                    <button type="submit">CHANGE DATA</button>
                    <button type="button" onClick={resetCountry}>
                        DELETE DATA
                    </button>
                </form>
            </div>
        </>
    );
}

export default Details;
