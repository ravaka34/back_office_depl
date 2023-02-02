// import { getPicture } from "./dataPicture";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function DetailsCategory() {
  const { id } = useParams();
  const [category, setCategory] = useState({});
  const [categoryDetails, setCategoryDetails] = useState(null);

  useEffect(() => {
    fetch("http://localhost:9000/category/"+id)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setCategory(data);
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
    fetch("http://localhost:9000/category/"+id+"/details", {
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
                <label htmlFor="reference" className="col-sm-6 col-form-label">
                  Reference :
                </label>
                <div className="col-sm-6">
                  <span id="reference"> {category.reference} </span>
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

          <div className="row form-category">
            {/* Formulaire category deails */}
            <div className="col-md-5">
              <h6>Add category details</h6>
              <form onSubmit={handleSubmit}>
                <div className="form-group row">
                  <label
                    htmlFor="name-details"
                    className="col-sm-6 col-form-label"
                  >
                    Name :
                  </label>
                  <div className="col-sm-6">
                    <input
                      value = {categoryDetails}
                      onChange={(event) => setCategoryDetails(event.target.value)}
                      type="text"
                      className="form-control"
                      id="name-details"
                      placeholder="Name"
                      required
                    />
                  </div>
                </div>
                <div className="row">
                  <input
                    type="submit"
                    className="btn btn-info"
                    value="Create"
                  />
                </div>
              </form>
            </div>

            <div className="col-md-2"></div>

            {/* List category details */}
            <div className="col-md-5">
              <h6>List of category details</h6>
              <table className="table table-bordered table-striped">
                <thead>
                  <tr>
                    <th>Name</th>
                  </tr>
                </thead>
                <tbody>
                  {category.details?.map((categoryDetail, index) => {
                    return (
                      <tr key={index}>
                        <td>{categoryDetail.name}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
