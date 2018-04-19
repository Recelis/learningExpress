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
        const borderedStyle = {border:"1px solid red", padding:6};
        return(
            <table style={{borderCollapse:"collapse"}}>
                <thead>
                    <tr>
                        <th style={borderedStyle}>Id</th>
                        <th style ={borderedStyle}>Title</th>
                    </tr>
                </thead>
                <tbody>
                    <IssueRow issue_id = {1}>Error in console when clicking Add</IssueRow>
                    <IssueRow issue_id = {2}>Missing bottom border on panel</IssueRow>
                </tbody>
            </table>
        )
      }
  }

  class IssueRow extends React.Component{
      render(){
          const borderedStyle = {border:"1px solid silver", padding:4};
          return(
                <tr>
                    <td style = {borderedStyle}>{this.props.issue_id}</td>
                    <td style = {borderedStyle}>{this.props.children}</td>
                </tr>
          )
      }
  }

  IssueRow.propTypes = {
      issue_id:React.PropTypes.number.isRequired,
      issue_title:React.PropTypes.string
  };

  class IssueAdd extends React.Component{
      render(){
          return(
              <div> This is a placeholder for an Issue Add entry form</div>
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