const contentNode = document.getElementById('contents');
const continents = ['Africa', 'America', 'Asia', 'Australia',' Europe'];
const message = continents.map(c=>'Hello ${c}!').join(' ');

const component = <p className = "myColor">{message}<br/></p>;

class IssueList extends React.Component{
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
        fetch('/api/issues').then(response=>response.json()).then(data=>{
            console.log("Total count of records:",data._metadata.total_count);
            data.records.forEach(issue=>{
                issue.created= new Date(issue.created);
                if (issue.completionDate)issue.completionDate = new Date(issue.completionDate);
            });
            this.setState({issues:data.records});
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

  class IssueFilter extends React.Component{
      render(){
            return(
                <div>This is a placeholder for the Issue Filter.</div>
            )
      }
  }

  function IssueTable(props){ // when it's not a single expression
    const issueRows = props.issues.map(issue=><IssueRow key={issue.id} issue = {issue}/>);
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
        <td>{props.issue.id}</td>
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

  class IssueAdd extends React.Component{
      constructor(){
          super();
          this.handleSubmit = this.handleSubmit.bind(this);
      }
      handleSubmit(e){
          e.preventDefault();
          var form = document.forms.issueAdd;
          this.props.createIssue({
              owner:form.owner.value,// not captured in React state, which could have been updated in server as a backup.
              title:form.title.value,// only in browser
              status:"New",
              created: new Date,
          });
          form.owner.value = ""; form.title.value="";
      }
      render(){
          return(
              <div> 
                  <form name="issueAdd" onSubmit={this.handleSubmit}>
                    <input type="text" name="owner" placeholder="Owner"/>
                    <input type="text" name="title" placeholder="Title"/>
                    <button>Add</button>
                  </form>
              </div>
          )
      }
  }

  class BorderWrap extends React.Component{
      render(){
          const borderedStyle = {border:"1px solid silver", padding:6};
          return(
              <div style={borderedStyle}>{this.props.children}</div>
          )
      }
  }

ReactDOM.render(<IssueList/>, contentNode);