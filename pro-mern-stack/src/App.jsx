import IssueList from "./IssueList.jsx"; 

const contentNode = document.getElementById('contents');
const continents = ['Africa', 'America', 'Asia', 'Australia',' Europe'];
const message = continents.map(c=>'Hello ${c}!').join(' ');


const component = <p className = "myColor">{message}<br/></p>;



ReactDOM.render(<IssueList/>, contentNode);