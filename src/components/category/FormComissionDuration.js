import { useState } from "react";
import CardError from "../CardError";
import { useNavigate } from "react-router-dom";

export default function FormComissionDuration(props) {
  const category = props.category;

  const [comission, setComission] = useState({ value: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    
    e.preventDefault();
    console.log(comission);
   
    const data = {
      comission: comission
    };
    console.log(data);
    fetch("https://api-production-6a5a.up.railway.app/category/"+category.id+"/comission", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if(data.data){
          // navigate("/categories")
          window.location.href = "/categories";
        }else{
          setError(data.error.message);
        }
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
          <CardError error={error} />
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
