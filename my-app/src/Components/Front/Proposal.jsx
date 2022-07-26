
function Proposal({proposal}) {


    return (

          <li className="list-item">
            
                <div className="content">
                    <b className="item">{proposal.title}</b>
                    <span className="item">{proposal.sector}</span>
                    <span className="item">{proposal.muni}</span>
                    <span className="item">{proposal.comment}</span>
                </div>
               
            
            
            </li>
        

    );
}

export default Proposal;