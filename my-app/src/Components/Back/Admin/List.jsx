import { useContext } from "react";
import BackContext from "../BackContext";
import BackProposal from "./Proposal";



function AdminList() {
  const { proposals} = useContext(BackContext);

  return (
    <div className="container list-container">
      <div className="row">
        <div className="col-12 list-form">
          <h2>List of Proposals</h2>
          <div className="list-group">
          <ul className="list-group-item">
            {proposals
              ? proposals.map((proposal) => (
                  <BackProposal key={proposal.id} proposal={proposal}></BackProposal>
                ))
              : null}
          </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminList;