import React from "react";
import world from "../others/world.png";

function Homepage() {
    return (
        <>
            <div id="homepage">
                <p>COUNTRIES OF</p>
                <img src={world} alt="World" id="worldImage" />
                <p>THE WORLD</p>
            </div>
            <div id="footerHomepage">
                Icons made by{" "}
                <a
                    href="https://www.flaticon.com/authors/good-ware"
                    title="Good Ware"
                >
                    Good Ware
                </a>{" "}
                from{" "}
                <a href="https://www.flaticon.com/" title="Flaticon">
                    www.flaticon.com
                </a>
            </div>
        </>
    );
}

export default Homepage;
