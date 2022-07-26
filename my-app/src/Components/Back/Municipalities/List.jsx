import { useContext } from "react";
import BackContext from "../BackContext";
import Muni from "./Muni";

function List() {
  const { municipalities } = useContext(BackContext);

  return (
    <div className="container list-container">
      <div className="row">
        <div className="col-12 list-form">
          <h2>List of municipalities</h2>
          <div className="list-group">
          <ul className="list-group-item">
            {municipalities
              ? municipalities.map((muni) => (
                  <Muni key={muni.id} muni={muni}></Muni>
                ))
              : null}
          </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default List;