import React, { useEffect } from "react";

import "jquery/dist/jquery.min.js";

import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";

export default function AuctionMoney(props) {
  const moneyAuctionsCats = props.moneyAuctionCats;

  useEffect(() => {
    // $(function () {
    //   $("#category").DataTable({
    //     responsive: true,
    //     lengthChange: false,
    //     autoWidth: false,
    //   });
    // });
  });

  return (
    <div className="card card-info">
      <div className="card-header">
        <h3 className="card-title">Part de comission collecte par category</h3>
      </div>
      <div className="card-body">
        <table id="category" className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>Category name</th>
              <th>Reference</th>
              <th>Total comission</th>
            </tr>
          </thead>
          <tbody>
            {moneyAuctionsCats?.map((category, index) => {
              return (
                <tr key={index}>
                  <td>{category.name}</td>
                  <td>{category.reference}</td>
                  <td>{category.totalComission}</td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr>
                <th>Category name</th>
              <th>Reference</th>
              <th>Total comission</th>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
