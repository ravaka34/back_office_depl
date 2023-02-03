// import { getPicture } from "./dataPicture";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function DetailsCategory() {
  const { id } = useParams();
  const [category, setCategory] = useState({});
  const [categoryDetails, setCategoryDetails] = useState(null);

  useEffect(() => {
    fetch("https://api-production-6a5a.up.railway.app/category/"+id)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setCategory(data.data);
      })
      .catch((error) => {
        //TODO implement error
        console.error(error);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      name: categoryDetails
    };
    fetch("https://api-production-6a5a.up.railway.app/category/"+id+"/details", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
          let values = {};
          Object.assign(values, category);
          values.details.push({
            name : categoryDetails
          })
          setCategory(values);       
      })
      .catch((error) => {
        console.error(error);
      });
  };


  return (
    <>
      <div className="card card-info">
        <div className="card-header">
          <h3 className="card-title">Category Details</h3>
        </div>
        <div className="card-body">
          <div className="row category-details">
            <div className="col-md-5">
              <img
                src={category?.picture}
                alt="category"
                className="img-fluid"
              />
            </div>
            <div className="col-md-2"></div>
            <div className="col-md-5">
              <h6>Important details :</h6>
              <div className="form-group row">
                <label htmlFor="name" className="col-sm-6 col-form-label">
                  Name :
                </label>
                <div className="col-sm-6">
                  <span id="name"> {category.name} </span>
                </div>
              </div>

              <div className="form-group row">
                <label htmlFor="comission" className="col-sm-6 col-form-label">
                  Comission :
                </label>
                <div className="col-sm-6">
                  <span id="comission"> {category.comission} % </span>
                </div>
              </div>

              <div className="form-group row">
                <label
                  htmlFor="min_duration"
                  className="col-sm-6 col-form-label"
                >
                  Minimum Duration :
                </label>
                <div className="col-sm-6">
                  <span id="min_duration"> {category.name} </span>
                </div>
              </div>

              <div className="form-group row">
                <label
                  htmlFor="max_duration"
                  className="col-sm-6 col-form-label"
                >
                  Maximum Duration :
                </label>
                <div className="col-sm-6">
                  <span id="max_duration"> {category.name} </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
