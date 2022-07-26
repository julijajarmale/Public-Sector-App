

function Proposal({proposal}) {


    return (

          <li className="list-item">
            
                <div className="content">
                    <span className="item">{proposal.title}</span>
                    <span className="item">{proposal.sector}</span>
                
                    <span className="item">{proposal.comment}</span>
                </div>
               
            
            
            </li>
        

    );
}

export default Proposal;