import IssueAdd from "./IssueAdd.jsx";
import IssueFilter from "./IssueFilter.jsx";

export default class IssueList extends React.Component{
    constructor(){
        super();
        this.state = {
            issues:[]
        };
        this.createIssue = this.createIssue.bind(this);
    }
    componentDidMount(){
        this.loadData();
        // console.log("the hell is happening!");
    }
    loadData(){
        fetch('/api/issues').then(response=>{
            if (response.ok){
                response.json().then(data=>{
                console.log("Total count of records:",data._metadata.total_count);
                data.records.forEach(issue=>{
                    issue.created= new Date(issue.created);
                    if (issue.completionDate)issue.completionDate = new Date(issue.completionDate);
                });
                this.setState({issues:data.records});
            });
            } else{
                response.json().then(error=>{
                    alert("Failed to fetch issues:" + error.message);
                });
            }
        }).catch(err=>{
                console.log(err);
            });
    }
    createIssue(newIssue){
        fetch('/api/issues',{
            method:'POST',
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(newIssue),
        }).then(response=>{
            if(response.ok){
                response.json().then(updatedIssue=>{
                    updatedIssue.created = new Date(updatedIssue.created);
                    if (updatedIssue.completionDate) updatedIssue.completionDate =new Date(updatedIssue.completionDate);
                    const newIssues = this.state.issues.concat(updatedIssue);
                    this.setState({issues:newIssues});
                })}
                else{
                    response.json().then(error=>{
                        alert("Failed to add issue: " + error.message)
                    }).catch(err=>{
                        alert("Error in sending data to server: "+err.message);
                    });
                }
            }
    )};
    render(){
      return(
        <div>
            <h1>IssueTracker</h1>
            <IssueFilter/>
            <IssueTable issues={this.state.issues}/>
            <IssueAdd createIssue = {this.createIssue}/>
        </div>
      )
    }
  }


  function IssueTable(props){ // when it's not a single expression
    const issueRows = props.issues.map(issue=><IssueRow key={issue._id} issue = {issue}/>);
    return(
        <table className = "bordered-table">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Status</th>
                    <th>Owner</th>
                    <th>Created</th>
                    <th>Effort</th>
                    <th>Completion</th>
                    <th>Title</th>
                </tr>
            </thead>
            <tbody>{issueRows}</tbody>
        </table>
    )
  }

  const IssueRow = (props)=>( // 2015 arrow function
    <tr>
        <td>{props.issue._id}</td>
        <td>{props.issue.status}</td>
        <td>{props.issue.owner}</td>
        <td>{props.issue.created.toDateString()}</td>
        <td>{props.issue.effort}</td>
        <td>{props.issue.completionDate?props.issue.completionDate.toDateString():""}</td>
        <td>{props.issue.title}</td>
    </tr>
)

//   IssueRow.propTypes = {
//       issue_id:React.PropTypes.number.isRequired,
//       issue_title:React.PropTypes.string
//   };

  class BorderWrap extends React.Component{
      render(){
          const borderedStyle = {border:"1px solid silver", padding:6};
          return(
              <div style={borderedStyle}>{this.props.children}</div>
          )
      }
  }