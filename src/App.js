import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Homepage from "./components/Homepage";
import List from "./components/List";
import Favourites from "./components/Favourites";
import Form from "./components/Form";
import Details from "./components/Details";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";

function App() {
    const [listOfFav, setListOfFav] = useState([]);
    const [detailsId, setDetailsId] = useState("");

    return (
        <Router>
            <Navbar />
            <Route path="/" exact component={Homepage} />
            <Route
                path="/list"
                render={(props) => (
                    <List
                        {...props}
                        listOfFav={listOfFav}
                        setListOfFav={setListOfFav}
                    />
                )}
            />
            <Route
                path="/favourites"
                render={(props) => (
                    <Favourites
                        {...props}
                        listOfFav={listOfFav}
                        setDetailsId={setDetailsId}
                    />
                )}
            />
            <Route
                path="/form"
                render={(props) => (
                    <Form
                        {...props}
                        listOfFav={listOfFav}
                        setListOfFav={setListOfFav}
                    />
                )}
            />
            <Route
                path="/details"
                render={(props) => <Details {...props} detailsId={detailsId} />}
            />
        </Router>
    );
}

export default App;
