import React from "react";
import { useFormik } from "formik";

const validate = (values) => {
    const errors = {};
    if (!values.name) {
        errors.name = "Required";
    } else if (values.name.length < 3) {
        errors.name = "Name too short";
    } else if (values.name.length > 50) {
        errors.name = "Name too long";
    } else if (/^[a-z].*/.test(values.name)) {
        errors.name = "Must start with capitalized letter";
    } else if (/\d/.test(values.name)) {
        errors.name = "Cannot contain numbers";
    } else if (/\W|_/.test(values.name)) {
        errors.name = "Cannot contain special characters";
    }

    if (values.capital.length < 3 && values.capital.length > 0) {
        errors.capital = "Name too short";
    } else if (values.capital.length > 50) {
        errors.capital = "Name too long";
    } else if (/^[a-z].*/.test(values.capital)) {
        errors.capital = "Must start with capitalized letter";
    } else if (/\d/.test(values.capital)) {
        errors.capital = "Cannot contain numbers";
    } else if (/\W|_/.test(values.capital)) {
        errors.capital = "Cannot contain special characters";
    }

    if (!values.region) {
        errors.region = "Required";
    }

    if (!values.population) {
        errors.population = "Required";
    } else if (!parseInt(values.population)) {
        errors.population = "Must be a number";
    }

    if (!values.numericCode) {
        errors.numericCode = "Required";
    } else if (!parseInt(values.numericCode)) {
        errors.numericCode = "Must be a number";
    }

    return errors;
};

function Form({ listOfFav, setListOfFav }) {
    const formik = useFormik({
        initialValues: {
            name: "",
            capital: "",
            region: "",
            population: "",
            numericCode: "",
            fromOurGalaxy: false,
        },
        validate,
        onSubmit: (values, { resetForm }) => {
            setListOfFav([
                ...listOfFav,
                {
                    name: values.name,
                    capital: values.capital,
                    region: values.region,
                    population: parseInt(values.population),
                    numericCode: parseInt(values.numericCode),
                    fromOurGalaxy: values.fromOurGalaxy,
                },
            ]);
            alert("Submitted");
            resetForm({});
        },
    });
    return (
        <form onSubmit={formik.handleSubmit} id="formik">
            <input
                name="name"
                placeholder="TYPE NAME"
                onChange={formik.handleChange}
                value={formik.values.name}
            />
            {formik.errors.name ? <div>{formik.errors.name}</div> : null}
            <br />
            <input
                name="capital"
                placeholder="TYPE CAPITAL"
                onChange={formik.handleChange}
                value={formik.values.capital}
            />
            {formik.errors.capital ? <div>{formik.errors.capital}</div> : null}
            <br />
            <select
                name="region"
                value={formik.values.region}
                onChange={formik.handleChange}
            >
                <option value="">CHOOSE REGION</option>
                <option value="Africa">AFRICA</option>
                <option value="Americas">AMERICAS</option>
                <option value="Asia">ASIA</option>
                <option value="Europe">EUROPE</option>
                <option value="Oceania">OCEANIA</option>
                <option value="Polar">POLAR</option>
            </select>
            {formik.errors.region ? <div>{formik.errors.region}</div> : null}
            <br />
            <input
                name="population"
                placeholder="TYPE POPULATION"
                onChange={formik.handleChange}
                value={formik.values.population}
            />
            {formik.errors.population ? (
                <div>{formik.errors.population}</div>
            ) : null}
            <br />
            <input
                name="numericCode"
                placeholder="TYPE NUMERIC CODE"
                onChange={formik.handleChange}
                value={formik.values.numericCode}
            />
            {formik.errors.numericCode ? (
                <div>{formik.errors.numericCode}</div>
            ) : null}
            <br />
            <label>
                <input
                    type="checkbox"
                    name="fromOurGalaxy"
                    checked={formik.values.fromOurGalaxy}
                    onChange={() =>
                        formik.setFieldValue(
                            "fromOurGalaxy",
                            !formik.values.fromOurGalaxy
                        )
                    }
                />
                FROM OUR GALAXY?
            </label>
            <br />
            <button type="submit">SUBMIT</button>
            <button onClick={formik.handleReset}>RESET</button>
        </form>
    );
}

export default Form;
