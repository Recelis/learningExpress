const contentNode = document.getElementById('contents');
const continents = ['Africa', 'America', 'Asia', 'Australia',' Europe'];
const message = continents.map(c=>'Hello ${c}!').join(' ');

const component = <p className = "myColor">{message}<br/></p>;

const issues =[
    {
        id: 1, status:'Open', owner:'Raven',
        created:new Date('2016-08-15'), effort: 5,completionDate:undefined,
        title:'Error in console when clicking Add',
    },
    {
        id:2, status:'Assigned', owner:'Eddie', 
        created: new Date('2016-08-16'), effort: 14,
        completionDate:new Date('2016-08-30'), 
        title:'Missing bottom border on panel',
    },
];

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
    }
    loadData(){
        setTimeout(()=>{
            this.setState({issues:issues})
        },500);
    }
    createIssue(newIssue){
        const newIssues = this.state.issues.slice();
        newIssue.id = this.state.issues.length+1;
        newIssues.push(newIssue);
        this.setState({issues:newIssues});
    }
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