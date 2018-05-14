const contentNode = document.getElementById('contents');
const continents = ['Africa', 'America', 'Asia', 'Australia', ' Europe'];
const message = continents.map(c => 'Hello ${c}!').join(' ');

const component = React.createElement(
    'p',
    { className: 'myColor' },
    message,
    React.createElement('br', null)
);

class IssueList extends React.Component {
    constructor() {
        super();
        this.state = {
            issues: []
        };
        this.createIssue = this.createIssue.bind(this);
    }
    componentDidMount() {
        this.loadData();
        // console.log("the hell is happening!");
    }
    loadData() {
        fetch('/api/issues').then(response => response.json()).then(data => {
            console.log("Total count of records:", data._metadata.total_count);
            data.records.forEach(issue => {
                issue.created = new Date(issue.created);
                if (issue.completionDate) issue.completionDate = new Date(issue.completionDate);
            });
            this.setState({ issues: data.records });
        }).catch(err => {
            console.log(err);
        });
    }
    createIssue(newIssue) {
        fetch('/api/issues', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newIssue)
        }).then(response => {
            if (response.ok) {
                response.json().then(updatedIssue => {
                    updatedIssue.created = new Date(updatedIssue.created);
                    if (updatedIssue.completionDate) updatedIssue.completionDate = new Date(updatedIssue.completionDate);
                    const newIssues = this.state.issues.concat(updatedIssue);
                    this.setState({ issues: newIssues });
                });
            } else {
                response.json().then(error => {
                    alert("Failed to add issue: " + error.message);
                }).catch(err => {
                    alert("Error in sending data to server: " + err.message);
                });
            }
        });
    }
    render() {
        return React.createElement(
            'div',
            null,
            React.createElement(
                'h1',
                null,
                'IssueTracker'
            ),
            React.createElement(IssueFilter, null),
            React.createElement(IssueTable, { issues: this.state.issues }),
            React.createElement(IssueAdd, { createIssue: this.createIssue })
        );
    }
}

class IssueFilter extends React.Component {
    render() {
        return React.createElement(
            'div',
            null,
            'This is a placeholder for the Issue Filter.'
        );
    }
}

function IssueTable(props) {
    // when it's not a single expression
    const issueRows = props.issues.map(issue => React.createElement(IssueRow, { key: issue.id, issue: issue }));
    return React.createElement(
        'table',
        { className: 'bordered-table' },
        React.createElement(
            'thead',
            null,
            React.createElement(
                'tr',
                null,
                React.createElement(
                    'th',
                    null,
                    'Id'
                ),
                React.createElement(
                    'th',
                    null,
                    'Status'
                ),
                React.createElement(
                    'th',
                    null,
                    'Owner'
                ),
                React.createElement(
                    'th',
                    null,
                    'Created'
                ),
                React.createElement(
                    'th',
                    null,
                    'Effort'
                ),
                React.createElement(
                    'th',
                    null,
                    'Completion'
                ),
                React.createElement(
                    'th',
                    null,
                    'Title'
                )
            )
        ),
        React.createElement(
            'tbody',
            null,
            issueRows
        )
    );
}

const IssueRow = props => // 2015 arrow function
React.createElement(
    'tr',
    null,
    React.createElement(
        'td',
        null,
        props.issue.id
    ),
    React.createElement(
        'td',
        null,
        props.issue.status
    ),
    React.createElement(
        'td',
        null,
        props.issue.owner
    ),
    React.createElement(
        'td',
        null,
        props.issue.created.toDateString()
    ),
    React.createElement(
        'td',
        null,
        props.issue.effort
    ),
    React.createElement(
        'td',
        null,
        props.issue.completionDate ? props.issue.completionDate.toDateString() : ""
    ),
    React.createElement(
        'td',
        null,
        props.issue.title
    )
);

//   IssueRow.propTypes = {
//       issue_id:React.PropTypes.number.isRequired,
//       issue_title:React.PropTypes.string
//   };

class IssueAdd extends React.Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(e) {
        e.preventDefault();
        var form = document.forms.issueAdd;
        this.props.createIssue({
            owner: form.owner.value, // not captured in React state, which could have been updated in server as a backup.
            title: form.title.value, // only in browser
            status: "New",
            created: new Date()
        });
        form.owner.value = "";form.title.value = "";
    }
    render() {
        return React.createElement(
            'div',
            null,
            React.createElement(
                'form',
                { name: 'issueAdd', onSubmit: this.handleSubmit },
                React.createElement('input', { type: 'text', name: 'owner', placeholder: 'Owner' }),
                React.createElement('input', { type: 'text', name: 'title', placeholder: 'Title' }),
                React.createElement(
                    'button',
                    null,
                    'Add'
                )
            )
        );
    }
}

class BorderWrap extends React.Component {
    render() {
        const borderedStyle = { border: "1px solid silver", padding: 6 };
        return React.createElement(
            'div',
            { style: borderedStyle },
            this.props.children
        );
    }
}

ReactDOM.render(React.createElement(IssueList, null), contentNode);