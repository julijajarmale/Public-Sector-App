import { useContext } from "react";
import FrontContext from "./FrontContext";
import Proposal from "./Proposal";


function List() {
  const { proposals} = useContext(FrontContext);

  return (
    <div className="container list-container">
      <div className="row">
        <div className="col-12 list-form">
          <h2>List of Proposals</h2>
          <div className="list-group">
          <ul className="list-group-item">
            {proposals
              ?  proposals.map((proposal) => ( proposal.approved === 1 ?
                  <Proposal key={proposal.id} proposal={proposal}></Proposal> : null
                ))
              : null}
          </ul>
          <div className="statistic">
        <p> We have {proposals === null ? null : proposals.length} proposals</p>
      </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default List;