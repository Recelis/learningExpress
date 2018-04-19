var contentNode = document.getElementById('contents');
var component = React.createElement(
  "h1",
  { className: "myColor" },
  "Hello World ok buddy!"
);
ReactDOM.render(component, contentNode);