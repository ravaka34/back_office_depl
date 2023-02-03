import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import "jquery/dist/jquery.min.js";

import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";

import FormDuration from "../../components/category/FormDuration";
import Modal from "../../components/basic/Modal";
import FormComissionDuration from "../../components/category/FormComissionDuration";
import { getDatas } from "../../util/util";

export default function CategoryList() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getDatas(setCategories, "https://api-production-6a5a.up.railway.app/category");
  }, []);

  return (
      <div className="card card-info">
        <div className="card-header">
          <h3 className="card-title">Categories</h3>
        </div>
        <div className="card-body">
          <table id="example1" className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Duration</th>
                <th>Comission</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => {
                return (
                  <tr key={category.id}>
                    <td>
                      <Link to={"/category/"+category.id}> {category.name} </Link> 
                    </td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-block btn-primary"
                        data-toggle="modal"
                        data-target={"#modal-duration" + category.id}
                      >
                        Duration
                      </button>
                      <Modal
                        title={category.name + " duration"}
                        body={<FormDuration category={category} />}
                        id={"modal-duration" + category.id}
                      />
                    </td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-block btn-primary"
                        data-toggle="modal"
                        data-target={"#modal-comission" + category.id}
                      >
                        Comission
                      </button>
                      <Modal
                        title={category.name + " comission"}
                        body={<FormComissionDuration category={category} />}
                        id={"modal-comission" + category.id}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr>
                <th>Name</th>
                <th>Duration</th>
                <th>Comission</th>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
  );
}
