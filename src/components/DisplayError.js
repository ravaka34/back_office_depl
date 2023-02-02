export default function DisplayError(props){
    return (
        <div className="alert alert-danger alert-dismissible">
          <button
            type="button"
            className="close"
            data-dismiss="alert"
            aria-hidden="true"
          >
            ×
          </button>
          {props.error}
        </div>
    )
}