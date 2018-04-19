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
            React.createElement(IssueTable, null),
            React.createElement(IssueAdd, null)
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

class IssueTable extends React.Component {
    render() {
        const borderedStyle = { border: "1px solid red", padding: 6 };
        return React.createElement(
            'table',
            { style: { borderCollapse: "collapse" } },
            React.createElement(
                'thead',
                null,
                React.createElement(
                    'tr',
                    null,
                    React.createElement(
                        'th',
                        { style: borderedStyle },
                        'Id'
                    ),
                    React.createElement(
                        'th',
                        { style: borderedStyle },
                        'Title'
                    )
                )
            ),
            React.createElement(
                'tbody',
                null,
                React.createElement(
                    IssueRow,
                    { issue_id: 1 },
                    'Error in console when clicking Add'
                ),
                React.createElement(
                    IssueRow,
                    { issue_id: 2 },
                    'Missing bottom border on panel'
                )
            )
        );
    }
}

class IssueRow extends React.Component {
    render() {
        const borderedStyle = { border: "1px solid silver", padding: 4 };
        return React.createElement(
            'tr',
            null,
            React.createElement(
                'td',
                { style: borderedStyle },
                this.props.issue_id
            ),
            React.createElement(
                'td',
                { style: borderedStyle },
                this.props.children
            )
        );
    }
}

IssueRow.propTypes = {
    issue_id: React.PropTypes.number.isRequired,
    issue_title: React.PropTypes.string
};

class IssueAdd extends React.Component {
    render() {
        return React.createElement(
            'div',
            null,
            ' This is a placeholder for an Issue Add entry form'
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