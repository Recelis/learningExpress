'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _IssueAdd = require('./IssueAdd.js');

var _IssueAdd2 = _interopRequireDefault(_IssueAdd);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var contentNode = document.getElementById('contents');
var continents = ['Africa', 'America', 'Asia', 'Australia', ' Europe'];
var message = continents.map(function (c) {
    return 'Hello ${c}!';
}).join(' ');

var component = React.createElement(
    'p',
    { className: 'myColor' },
    message,
    React.createElement('br', null)
);

var IssueList = function (_React$Component) {
    _inherits(IssueList, _React$Component);

    function IssueList() {
        _classCallCheck(this, IssueList);

        var _this = _possibleConstructorReturn(this, (IssueList.__proto__ || Object.getPrototypeOf(IssueList)).call(this));

        _this.state = {
            issues: []
        };
        _this.createIssue = _this.createIssue.bind(_this);
        return _this;
    }

    _createClass(IssueList, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.loadData();
            // console.log("the hell is happening!");
        }
    }, {
        key: 'loadData',
        value: function loadData() {
            var _this2 = this;

            fetch('/api/issues').then(function (response) {
                if (response.ok) {
                    response.json().then(function (data) {
                        console.log("Total count of records:", data._metadata.total_count);
                        data.records.forEach(function (issue) {
                            issue.created = new Date(issue.created);
                            if (issue.completionDate) issue.completionDate = new Date(issue.completionDate);
                        });
                        _this2.setState({ issues: data.records });
                    });
                } else {
                    response.json().then(function (error) {
                        alert("Failed to fetch issues:" + error.message);
                    });
                }
            }).catch(function (err) {
                console.log(err);
            });
        }
    }, {
        key: 'createIssue',
        value: function createIssue(newIssue) {
            var _this3 = this;

            fetch('/api/issues', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newIssue)
            }).then(function (response) {
                if (response.ok) {
                    response.json().then(function (updatedIssue) {
                        updatedIssue.created = new Date(updatedIssue.created);
                        if (updatedIssue.completionDate) updatedIssue.completionDate = new Date(updatedIssue.completionDate);
                        var newIssues = _this3.state.issues.concat(updatedIssue);
                        _this3.setState({ issues: newIssues });
                    });
                } else {
                    response.json().then(function (error) {
                        alert("Failed to add issue: " + error.message);
                    }).catch(function (err) {
                        alert("Error in sending data to server: " + err.message);
                    });
                }
            });
        }
    }, {
        key: 'render',
        value: function render() {
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
                React.createElement(_IssueAdd2.default, { createIssue: this.createIssue })
            );
        }
    }]);

    return IssueList;
}(React.Component);

var IssueFilter = function (_React$Component2) {
    _inherits(IssueFilter, _React$Component2);

    function IssueFilter() {
        _classCallCheck(this, IssueFilter);

        return _possibleConstructorReturn(this, (IssueFilter.__proto__ || Object.getPrototypeOf(IssueFilter)).apply(this, arguments));
    }

    _createClass(IssueFilter, [{
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                null,
                'This is a placeholder for the Issue Filter.'
            );
        }
    }]);

    return IssueFilter;
}(React.Component);

function IssueTable(props) {
    // when it's not a single expression
    var issueRows = props.issues.map(function (issue) {
        return React.createElement(IssueRow, { key: issue._id, issue: issue });
    });
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

var IssueRow = function IssueRow(props) {
    return (// 2015 arrow function
        React.createElement(
            'tr',
            null,
            React.createElement(
                'td',
                null,
                props.issue._id
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
        )
    );
};

//   IssueRow.propTypes = {
//       issue_id:React.PropTypes.number.isRequired,
//       issue_title:React.PropTypes.string
//   };

var BorderWrap = function (_React$Component3) {
    _inherits(BorderWrap, _React$Component3);

    function BorderWrap() {
        _classCallCheck(this, BorderWrap);

        return _possibleConstructorReturn(this, (BorderWrap.__proto__ || Object.getPrototypeOf(BorderWrap)).apply(this, arguments));
    }

    _createClass(BorderWrap, [{
        key: 'render',
        value: function render() {
            var borderedStyle = { border: "1px solid silver", padding: 6 };
            return React.createElement(
                'div',
                { style: borderedStyle },
                this.props.children
            );
        }
    }]);

    return BorderWrap;
}(React.Component);

ReactDOM.render(React.createElement(IssueList, null), contentNode);