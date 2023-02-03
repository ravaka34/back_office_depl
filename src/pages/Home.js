import { useState, useEffect } from "react";
import AuctionMoney from "../components/dashboard/AuctionMoney";
import AuctionMoneyCategory from "../components/dashboard/AuctionMoneyCategory";


export default function Home() {
  const [dashBoard, setDashBoard] = useState({
    moneyAuctions : [],
  });
  const admin = JSON.parse(localStorage.getItem("admin"));
  console.log(admin);

  useEffect(() => {
    fetch("https://api-production-6a5a.up.railway.app/administrator/dashboard?id="+admin.adminId+"&token="+admin.token)
      .then((response) => response.json())
      .then((data) => {
        if(data.error){
          window.location.href = "/login/1";
        }
        console.log(data);
        setDashBoard(data.data);
      })
      .catch((error) => {
        //TODO implement error
        console.error(error);
      });
  }, []);

  return (
    <div className="flex-container">
      <div className="row">
        <h3>Somme commission collecte : {dashBoard.totalComission} Ar </h3>
      </div>
      
        <AuctionMoney moneyAuctions={dashBoard.moneyAuctions} />
        <AuctionMoneyCategory moneyAuctionCats= { dashBoard.moneyAuctionCats } />
      
    </div>
  )
}