const contentNode = document.getElementById('contents');
const continents = ['Africa', 'America', 'Asia', 'Australia',' Europe'];
const message = continents.map(c=>'Hello ${c}!').join(' ');

const component = <p className = "myColor">{message}<br/></p>;
class IssueList extends React.Component{
    render(){
      return(
        <div>
            <h1>IssueTracker</h1>
            <IssueFilter/>
            <IssueTable/>
            <IssueAdd/>
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

  class IssueTable extends React.Component{
      render(){
          return(
              <div> This is a placeholder for a table of issues</div>
          )
      }
  }

  class IssueAdd extends React.Component{
      render(){
          return(
              <div> This is a placeholder for an Issue Add entry form</div>
          )
      }
  }

ReactDOM.render(<IssueList/>, contentNode);