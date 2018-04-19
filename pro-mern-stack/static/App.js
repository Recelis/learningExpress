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
        return React.createElement(
            'div',
            null,
            ' This is a placeholder for a table of issues'
        );
    }
}

class IssueAdd extends React.Component {
    render() {
        return React.createElement(
            'div',
            null,
            ' This is a placeholder for an Issue Add entry form'
        );
    }
}

ReactDOM.render(React.createElement(IssueList, null), contentNode);