import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { hourMinuteSecondToMillis, postDatas } from "../../util/util"

// import './dropzone.css';
import  Dropzone  from 'react-dropzone';
import CardError from '../../components/CardError';

export default function FormCategory() {
  const durationNames = ["Minimum", "Maximum"];
  const [selectedFile, setSelectedFile] = useState(null);
  const [base64Picture, setBase64Picture] = useState(null);
  const [name, setName] = useState("");
  const[comission, setComission] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const [durationInputs, setDurationInputs] = useState({
    Minimum: {
      hh: 0,
      mm: 0,
      ss: 0,
    },
    Maximum: {
      hh: 0,
      mm: 0,
      ss: 0,
    },
  });


  const handleDurationChange = (name, type, e) => {
    let values = {};
    Object.assign(values, durationInputs);
    values[name][type] = e.target.value;
    setDurationInputs(values);
  };

  const onDrop = (acceptedFiles) => {
    console.log(acceptedFiles);
    const reader = new FileReader();

    //will be called when the file has been fully loaded
    reader.onload = () => {
      const fileAsDataURL = reader.result;
      setBase64Picture(fileAsDataURL);
      console.log(fileAsDataURL);
    };
    reader.onabort = () => console.log('file reading was aborted');
    reader.onerror = () => console.log('file reading has failed');

    //read the file as a data URL and transform it as base 64 at the same time
    reader.readAsDataURL(acceptedFiles[0]);
    setSelectedFile(acceptedFiles[0])
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
        "name": name,
        "minDuration": hourMinuteSecondToMillis(durationInputs["Minimum"]),
        "maxDuration": hourMinuteSecondToMillis(durationInputs["Maximum"]),
        "picture": base64Picture,
        "comission": comission
    }
    console.log(data);
    const response = await postDatas("https://api-production-6a5a.up.railway.app/category", data);
    if(response.data){
      navigate("/categories");
    }else{
      setError(response.error.message);
      console.log(response.error.message);
    }

  }


  return (
    <div className="card card-info">
      <div className="card-header">
        <h3 className="card-title">Create category</h3>
      </div>
      
      <form className="form-horizontal" onSubmit={handleSubmit} >
        <div className="card-body">
          <div className="form-group row">
            <label htmlFor="name" className="col-sm-3 col-form-label">
              Name
            </label>
            <div className="col-sm-9">
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Name"
                onChange={(event) => setName(event.target.value)}
                required

              />
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="comission" className="col-sm-3 col-form-label">
              Comission
            </label>
            <div className="col-sm-9">
              <input
                type="number"
                className="form-control"
                id="comission"
                onChange={(event) => setComission(event.target.value)}
                placeholder="Comission"
                required
              />
            </div>
          </div>

          {durationNames.map((name) => {
            return (
              <div className="form-group row">
                <label htmlFor={name} className="col-sm-3 col-form-label">
                  {name}
                </label>
                <div className="col-sm-9" id={name}>
                  <div className="row">
                    <input
                      type="number"
                      className="form-control col-sm-2"
                      value={durationInputs[name]["hh"]}
                      placeholder="hh"
                      onChange={(e) => handleDurationChange(name, "hh", e)}
                    />
                    <div className='col-sm-1' style={ {textAlign : "center"} }>:</div>
                    <input
                      type="number"
                      className="form-control col-sm-2"
                      value={durationInputs[name]["mm"]}
                      placeholder="mm"
                      onChange={(e) => handleDurationChange(name, "mm", e)}
                    />
                    <div className='col-sm-1' style={ {textAlign : "center"} }>:</div>
                    <input
                      type="number"
                      className="form-control col-sm-2"
                      value={durationInputs[name]["ss"]}
                      placeholder="ss"
                      onChange={(e) => handleDurationChange(name, "ss", e)}
                    />
                  </div>
                </div>
              </div>
            );
          })}

          <div className="form-group row">
            <label className="col-sm-3 col-form-label">Upload Image</label>
            <div className="col-sm-9 dropzone" >
              <Dropzone onDrop={onDrop} multiple={false} accept="image/*">
                {({ getRootProps, getInputProps }) => (
                  <section>
                    <div {...getRootProps()}>
                      <input {...getInputProps()} />
                      <p>Drag 'n' drop an image here, or click to select an image</p>
                    </div>
                  </section>
                )}
              </Dropzone>
            </div>
          </div>

          { selectedFile && <div className="form-group row">
            <label className="col-sm-3 col-form-label">Selected Image</label>
            <div className="col-sm-9">
              <img src={URL.createObjectURL(selectedFile)} alt="Selected" width="200"/>
            </div>
          </div>}

        </div>
        <CardError error={error} />
        <div className="card-footer">
          <input type="submit" className="btn btn-info" value="Create"/>
        </div>
      </form>
    </div>
  );
}
