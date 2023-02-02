import Modal from "../basic/Modal";

export default function Question(props) {
  const action = props.action;
  const balanceRequest = props.balanceRequest;

  const actionName = action === "3" ? "accept" : "refuse";

  const handleOnClick = () => {
    const data = {
      id: balanceRequest.id,
      state: {
        id: action,
      },
    };
    console.log(data);
    fetch("http://localhost:9000/balance/treat-load-request", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
         window.location.href = "/balance-requests";
      })
      .catch((error) => {
       console.log(error)
      });
  };

  const createBody = () => {
    //accept
    return (
      <div>
        <h6>Are you sure you want to {actionName}?</h6>
        {/* <div className="row"> */}
        <div className="form-group row">
          <label htmlFor="name" className="col-sm-3 col-form-label">
            Client id :
          </label>
          <div className="col-sm-9">
            <span id="name"> {balanceRequest.client.id} </span>
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="name" className="col-sm-3 col-form-label">
            Client name :
          </label>
          <div className="col-sm-9">
            <span id="name"> {balanceRequest.client.firstName} </span>
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="name" className="col-sm-3 col-form-label">
            Amount :
          </label>
          <div className="col-sm-9">
            <span id="name"> {balanceRequest.amount} </span>
          </div>
        </div>
        {/* </div> */}
        <div className="row">
          <div className="col-md-2">
            <button className="btn btn-success btn-lg" onClick={handleOnClick}>
              Yes
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Modal
      title="Balance Request"
      body={createBody()}
      id={"question-" + balanceRequest.id + "" + action}
    />
  );
}
