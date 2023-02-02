export default function Modal(props){
    const title = props.title;
    const body = props.body;
    const id = props.id;

    return (
        <div className="modal fade" id= { id }>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">{ title }</h4>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
              { body }
              </div>
            </div>
          </div>
        </div>
      );

}