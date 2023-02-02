import React, { useEffect } from "react";

import { useState } from "react";

import "jquery/dist/jquery.min.js";

import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";
import Question from "../components/balance-request/Question";

export default function BalanceRequest() {
  const [balanceRequests, setBalanceRequests] = useState();

  useEffect(() => {
    // $(function () {
    //   $("#example1").DataTable({
    //     responsive: true,
    //     lengthChange: false,
    //     autoWidth: false,
    //   });
    // });

    fetch("http://localhost:9000/balance/load-request")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setBalanceRequests(data);
      })
      .catch((error) => {
        //TODO implement error
        console.error(error);
      });
  }, []);

  

  const renderStatus = (status) => {
    if (status === 30)
      return <span className="badge badge-success">Accepted</span>;
    else if (status === 20)
      return <span className="badge badge-warning">In progress</span>;
    else return <span className="badge badge-danger">Refuse</span>;
  };

  const renderOptionButtons = (balanceRequest) => {
    if (balanceRequest.state.id === 20) {
      return (
        <>
          <td>
            <div className="row">
              <div className="col-sm-3">
                <button
                  className="btn btn-success btn-sm"
                  data-toggle="modal"
                  data-target={"#question-" + balanceRequest.id+""+30}
                >
                  Accept
                </button>
                <Question balanceRequest={balanceRequest} action="30" />
              </div>
              <div className="col-sm-1"></div>
              <div className="col-sm-3">
                <button
                  className="btn btn-danger btn-sm"
                  data-toggle="modal"
                  data-target={"#question-" + balanceRequest.id+""+10}
                >
                  Refuse
                </button>
                <Question balanceRequest={balanceRequest} action="10" />
              </div>
            </div>
          </td>
        </>
      );
    } else {
      return (
        <>
          <td></td>
        </>
      );
    }
  };

  return (
    <div className="card card-info">
      <div className="card-header">
        <h3 className="card-title">Balance load request</h3>
      </div>
      <div className="card-body">
        <table id="example1" className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>Client id</th>
              <th>Name</th>
              <th>Amount</th>
              <th>Request date</th>
              <th>Treatment date</th>
              <th>Contact</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {balanceRequests?.map((balanceRequest) => {
              return (
                <tr key={balanceRequest.id}>
                  <td>{balanceRequest.client.id}</td>
                  <td>{balanceRequest.client.firstName}</td>
                  <td>{balanceRequest.amount}</td>
                  <td>{balanceRequest.requestDate}</td>
                  <td>{balanceRequest.treatmentDate}</td>
                  <td>{balanceRequest.contact}</td>
                  <td>{renderStatus(balanceRequest.state.id)}</td>
                  {renderOptionButtons(balanceRequest)}
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr>
              <th>Client id</th>
              <th>Name</th>
              <th>Amount</th>
              <th>Request date</th>
              <th>Treatment date</th>
              <th>Contact</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
