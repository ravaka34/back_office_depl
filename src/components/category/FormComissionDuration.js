import { useState } from "react";

export default function FormComissionDuration(props) {
  const category = props.category;

  const [comission, setComission] = useState({ value: "" });

  const handleSubmit = (e) => {
    
    e.preventDefault();
    console.log(comission);
    const data = {
      comission: comission
    };
    console.log(data);
    fetch("http://localhost:9000/category/"+category.id+"/comission", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        window.location.href = "/categories";
      })
      .catch((error) => {
        //TODO implement error
      });
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <label htmlFor="current-comission"> Current comission </label>
          <span id="current-comission"> {category.comission} % </span>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <label htmlFor="comission" className="col-sm-6 col-form-label">
            Change comission
          </label>
          <input
            type="number"
            value={comission}
            onChange={(e) => setComission(e.target.value)}
            className="col-sm-6"
            id="comission"
          />
        </div>
        <div className="row">
          <button type="submit" className="btn btn-primary">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
