import { useContext } from "react";
import BackContext from "../BackContext";
import Sector from "./Sector";


function SectorsList() {
  const { sectors } = useContext(BackContext);

  return (
    <div className="container list-container">
      <div className="row">
      <div className="col-12 list-form">
          <h2>List of Sectors</h2>
          <div className="list-group">
          <ul className="list-group-item">
            {sectors
              ? sectors.map((sector) => (
                  <Sector key={sector.id} sector={sector}></Sector>
                ))
              : null}
          </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SectorsList;
