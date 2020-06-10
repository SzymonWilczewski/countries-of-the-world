import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import arrowUp from "../others/arrowUp.png";
import arrowDown from "../others/arrowDown.png";

function Favourites({ listOfFav, setDetailsId }) {
    const [localList, setLocalList] = useState([]);
    const [list, setList] = useState([]);

    const [typeCountry, setTypeCountry] = useState("");
    const [typeCapital, setTypeCapital] = useState("");
    const [selectRegion, setSelectRegion] = useState("");
    const [arrowUpSort, setArrowUpSort] = useState(false);
    const [arrowDownSort, setArrowDownSort] = useState(false);

    useEffect(() => {
        if (
            typeCountry === "" &&
            typeCapital === "" &&
            selectRegion === "" &&
            arrowUpSort === false &&
            arrowDownSort === false
        )
            setList(localList);
    }, [
        typeCountry,
        typeCapital,
        selectRegion,
        arrowUpSort,
        arrowDownSort,
        localList,
    ]);

    useEffect(() => {
        setList(
            localList.filter((country) => country.name.includes(typeCountry))
        );
    }, [typeCountry, localList]);

    useEffect(() => {
        setList(
            localList.filter((country) => country.capital.includes(typeCapital))
        );
    }, [typeCapital, localList]);

    useEffect(() => {
        setList(
            localList.filter((country) => country.region.includes(selectRegion))
        );
    }, [selectRegion, localList]);

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
                localList.concat().sort((a, b) => a.population - b.population)
            );
    }, [arrowUpSort, localList]);

    useEffect(() => {
        if (arrowDownSort === true)
            setList(
                localList.concat().sort((a, b) => b.population - a.population)
            );
    }, [arrowDownSort, localList]);

    useEffect(() => {
        localStorage.setItem("favCountriesList", JSON.stringify(listOfFav));
        setLocalList(JSON.parse(localStorage.getItem("favCountriesList")));
    }, [listOfFav]);

    return (
        <>
            <h2 className="galaxyHeaders">FROM OUR GALAXY</h2>
            <table className="listOfFavourites">
                <thead>
                    <React.Fragment key="header">
                        <tr>
                            <th>COUNTRY</th>
                            <th>CAPITAL</th>
                            <th>REGION</th>
                            <th>POPULATION</th>
                            <th>SHOW MORE</th>
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
                            <th></th>
                        </tr>
                    </React.Fragment>
                </thead>

                <tbody>
                    {list
                        .filter((country) => country.fromOurGalaxy === true)
                        .map((country) => (
                            <React.Fragment key={country.numericCode}>
                                <tr>
                                    <td>{country.name}</td>
                                    <td>{country.capital}</td>
                                    <td>{country.region}</td>
                                    <td>{country.population}</td>
                                    <td>
                                        <Link to="/details">
                                            <button
                                                className="showMoreButton"
                                                onClick={() =>
                                                    setDetailsId(
                                                        country.numericCode
                                                    )
                                                }
                                            >
                                                SHOW MORE
                                            </button>
                                        </Link>
                                    </td>
                                </tr>
                            </React.Fragment>
                        ))}
                </tbody>
            </table>

            <h2 className="galaxyHeaders">FROM OTHER GALAXY</h2>
            <table className="listOfFavourites">
                <thead>
                    <React.Fragment key="header">
                        <tr>
                            <th>COUNTRY</th>
                            <th>CAPITAL</th>
                            <th>REGION</th>
                            <th>POPULATION</th>
                            <th>SHOW MORE</th>
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
                            <th></th>
                        </tr>
                    </React.Fragment>
                </thead>

                <tbody>
                    {list
                        .filter((country) => country.fromOurGalaxy === false)
                        .map((country) => (
                            <React.Fragment key={country.numericCode}>
                                <tr>
                                    <td>{country.name}</td>
                                    <td>{country.capital}</td>
                                    <td>{country.region}</td>
                                    <td>{country.population}</td>
                                    <td>
                                        <Link to="/details">
                                            <button
                                                className="showMoreButton"
                                                onClick={() =>
                                                    setDetailsId(
                                                        country.numericCode
                                                    )
                                                }
                                            >
                                                SHOW MORE
                                            </button>
                                        </Link>
                                    </td>
                                </tr>
                            </React.Fragment>
                        ))}
                </tbody>
            </table>
        </>
    );
}

export default Favourites;
