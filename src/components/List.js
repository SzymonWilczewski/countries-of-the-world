import React, { useState, useEffect } from "react";
import Axios from "axios";
import arrowUp from "../others/arrowUp.png";
import arrowDown from "../others/arrowDown.png";

function List({ listOfFav, setListOfFav }) {
    const [apiCountriesList, setApiCountriesList] = useState([]);
    const [list, setList] = useState([]);
    const [addedToFavList, setAddedToFavList] = useState([]);

    const [typeCountry, setTypeCountry] = useState("");
    const [typeCapital, setTypeCapital] = useState("");
    const [selectRegion, setSelectRegion] = useState("");
    const [arrowUpSort, setArrowUpSort] = useState(false);
    const [arrowDownSort, setArrowDownSort] = useState(false);

    const addToFav = () =>
        setListOfFav([
            ...listOfFav,
            ...addedToFavList.reduce(
                (p, c) => [...p, { ...c, fromOurGalaxy: true }],
                []
            ),
        ]);

    const addedToFav = (country) => {
        addedToFavList.includes(country)
            ? setAddedToFavList(addedToFavList.filter((c) => c !== country))
            : setAddedToFavList([...addedToFavList, country]);
    };

    useEffect(() => {
        if (
            typeCountry === "" &&
            typeCapital === "" &&
            selectRegion === "" &&
            arrowUpSort === false &&
            arrowDownSort === false
        )
            setList(apiCountriesList);
    }, [
        typeCountry,
        typeCapital,
        selectRegion,
        arrowUpSort,
        arrowDownSort,
        apiCountriesList,
    ]);

    useEffect(() => {
        setList(
            apiCountriesList.filter((country) =>
                country.name.includes(typeCountry)
            )
        );
    }, [typeCountry, apiCountriesList]);

    useEffect(() => {
        setList(
            apiCountriesList.filter((country) =>
                country.capital.includes(typeCapital)
            )
        );
    }, [typeCapital, apiCountriesList]);

    useEffect(() => {
        setList(
            apiCountriesList.filter((country) =>
                country.region.includes(selectRegion)
            )
        );
    }, [selectRegion, apiCountriesList]);

    const handleArrowUp = () =>
        arrowUpSort === false
            ? setArrowDownSort(false) || setArrowUpSort(true)
            : setArrowUpSort(false);

    const handleArrowDown = () =>
        arrowDownSort === false
            ? setArrowUpSort(false) || setArrowDownSort(true)
            : setArrowDownSort(false);

    useEffect(() => {
        if (arrowUpSort === true)
            setList(
                apiCountriesList
                    .concat()
                    .sort((a, b) => a.population - b.population)
            );
    }, [arrowUpSort, apiCountriesList]);

    useEffect(() => {
        if (arrowDownSort === true)
            setList(
                apiCountriesList
                    .concat()
                    .sort((a, b) => b.population - a.population)
            );
    }, [arrowDownSort, apiCountriesList]);

    useEffect(() => {
        Axios.get(
            "https://restcountries.eu/rest/v2/all?fields=name;capital;region;population;numericCode"
        )
            .then((response) => setApiCountriesList(response.data))
            .catch((error) => console.log(error));
    }, []);

    return (
        <>
            <table id="listOfCountries">
                <thead>
                    <React.Fragment key="header">
                        <tr>
                            <th>COUNTRY</th>
                            <th>CAPITAL</th>
                            <th>REGION</th>
                            <th>POPULATION</th>
                            <th>ADD TO FAV</th>
                        </tr>
                        <tr>
                            <th>
                                <input
                                    type="text"
                                    placeholder="TYPE COUNTRY"
                                    value={typeCountry}
                                    onChange={(e) =>
                                        setTypeCountry(e.target.value)
                                    }
                                />
                            </th>
                            <th>
                                <input
                                    type="text"
                                    placeholder="TYPE CAPITAL"
                                    value={typeCapital}
                                    onChange={(e) =>
                                        setTypeCapital(e.target.value)
                                    }
                                />
                            </th>
                            <th>
                                <select
                                    name="regions"
                                    id="regionSelect"
                                    value={selectRegion}
                                    onChange={(e) =>
                                        setSelectRegion(e.target.value)
                                    }
                                >
                                    <option value="">CHOOSE REGION</option>
                                    <option value="Africa">AFRICA</option>
                                    <option value="Americas">AMERICAS</option>
                                    <option value="Asia">ASIA</option>
                                    <option value="Europe">EUROPE</option>
                                    <option value="Oceania">OCEANIA</option>
                                    <option value="Polar">POLAR</option>
                                </select>
                            </th>
                            <th>
                                <img
                                    src={arrowUp}
                                    alt="arrowUP"
                                    className="arrows"
                                    onClick={() => handleArrowUp()}
                                    role="button"
                                />
                                <img
                                    src={arrowDown}
                                    alt="arrowDown"
                                    className="arrows"
                                    onClick={() => handleArrowDown()}
                                    role="button"
                                />
                            </th>
                            <th>
                                <input
                                    type="submit"
                                    value="SUBMIT"
                                    onClick={() => addToFav()}
                                />
                            </th>
                        </tr>
                    </React.Fragment>
                </thead>

                <tbody>
                    {list.map((country) => (
                        <React.Fragment key={country.numericCode}>
                            <tr>
                                <td>{country.name}</td>
                                <td>{country.capital}</td>
                                <td>{country.region}</td>
                                <td>{country.population}</td>
                                <td>
                                    <input
                                        className="native-hidden buttons"
                                        type="checkbox"
                                        onClick={() => addedToFav(country)}
                                    />
                                </td>
                            </tr>
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
            <div id="footerList">
                Icons made by{" "}
                <a
                    href="https://www.flaticon.com/authors/pixel-perfect"
                    title="Pixel perfect"
                >
                    Pixel perfect
                </a>
                {" and "}
                <a
                    href="https://www.flaticon.com/authors/freepik"
                    title="Freepik"
                >
                    Freepik
                </a>{" "}
                from{" "}
                <a href="https://www.flaticon.com/" title="Flaticon">
                    {" "}
                    www.flaticon.com
                </a>
            </div>
        </>
    );
}

export default List;
