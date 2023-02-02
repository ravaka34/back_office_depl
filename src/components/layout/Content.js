import ContentHeader from "./ContentHeader";

export default function Content(props){
    return (
        <div className="content-wrapper">
            <ContentHeader />
            {/* Main content */}
            <div className="content">
                <div className="container-fluid"> { props.body } </div>
            </div>
        </div>
    )

}