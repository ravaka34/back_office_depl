import {
  hourMinuteSecondToMillis,
  millisToHourMinuteSecond,
} from "../../util/util";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CardError from "../CardError";

export default function FormDuration(props) {
  const category = props.category;
  const inputName = ["min", "max"];
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [inputs, setInputs] = useState({
    min: {
      hh: 0,
      mm: 0,
      ss: 0,
    },
    max: {
      hh: 0,
      mm: 0,
      ss: 0,
    },
  });

  let current = {};
  current["min"] = millisToHourMinuteSecond(category.minDuration);
  current["max"] = millisToHourMinuteSecond(category.maxDuration);

  const handleChange = (name, type, e) => {
    let values = {};
    Object.assign(values, inputs);
    values[name][type] = e.target.value;
    setInputs(values);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const millisMin = hourMinuteSecondToMillis(inputs["min"]);
    const millisMax = hourMinuteSecondToMillis(inputs["max"]);
    if (millisMin > millisMax) {
      window.alert("Min duration must be less than max duration");
    }
    const data = {
      minDuration: millisMin,
      maxDuration: millisMax,
    };
    console.log(data);
    fetch("https://api-production-6a5a.up.railway.app/category/" + category.id + "/duration", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((response) => response.json())
      .then((data) => {
        if(data.data){
          console.log("navigate");
          window.location.href = "/categories";
          // navigate("/categories");
        }else{
          setError(data.error.message);
        }
      })
  };

  return (
    <div className="container">
      <div className="row">
        {inputName.map((name) => {
          return (
            <div className="col-sm">
              <label htmlFor={"current-" + name}> Current {name} </label>{" "}
              <span id={"current-" + name}>
                {" "}
                {current[name]["hours"] +
                  ":" +
                  current[name]["minutes"] +
                  ":" +
                  current[name]["seconds"]}{" "}
              </span>
            </div>
          );
        })}
        <br />
      </div>
      <form onSubmit={handleSubmit}>
        {inputName.map((name) => {
          return (
            <div className="row">
              <label htmlFor={name} className="col-sm-6 col-form-label">
                Change {name}
              </label>
              <div className="col-sm-6" id={name}>
                <div className="row">
                  <input
                    type="number"
                    className="form-control col-sm"
                    value={inputs[name]["hh"]}
                    placeholder="hh"
                    onChange={(e) => handleChange(name, "hh", e)}
                  />{" "}
                  :{" "}
                  <input
                    type="number"
                    className="form-control col-sm"
                    value={inputs[name]["mm"]}
                    placeholder="mm"
                    onChange={(e) => handleChange(name, "mm", e)}
                  />{" "}
                  :{" "}
                  <input
                    type="number"
                    className="form-control col-sm"
                    value={inputs[name]["ss"]}
                    placeholder="ss"
                    onChange={(e) => handleChange(name, "ss", e)}
                  />
                </div>
              </div>
            </div>
          );
        })}
        <div className="row">
          <CardError error={error} />
        </div>
        <div className="row">
          <input
            type="submit"
            value="Save changes"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}
