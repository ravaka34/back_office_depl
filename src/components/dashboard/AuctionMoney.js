import "jquery/dist/jquery.min.js";

import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";

export default function AuctionMoney(props) {
  const moneyAuctions = props.moneyAuctions;

  return (
    <div className="card card-info">
      <div className="card-header">
        <h3 className="card-title">Part de comission collecte</h3>
      </div>
      <div className="card-body">
        <table id="auctionMoney" className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>Auction reference</th>
              <th>Product</th>
              <th>Client winner</th>
              <th>Client owner</th>
              <th>End date</th>
              <th>Client Amount</th>
              <th>Comission Rate</th>
              <th>Comission</th>
            </tr>
          </thead>
          <tbody>
            {moneyAuctions?.map((moneyAuction, index) => {
              return (
                <tr key={index}>
                  <td>{moneyAuction.auction.id}</td>
                  <td>{moneyAuction.auction.productName}</td>
                  <td>{moneyAuction.winningClient.firstName} {moneyAuction.winningClient.lastName}</td>
                  <td>{moneyAuction.ownerClient.firstName} {moneyAuction.ownerClient.lastName}</td>
                  <td>{moneyAuction.endDate}</td>
                  <td>{moneyAuction.clientAmount}</td>
                  <td>{moneyAuction.auction.comission}</td>
                  <td>{moneyAuction.amountComission}</td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr>
            <th>Auction reference</th>
              <th>Product</th>
              <th>Client winner</th>
              <th>Client owner</th>
              <th>End date</th>
              <th>Client Amount</th>
              <th>Comission Rate</th>
              <th>Comission</th>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
