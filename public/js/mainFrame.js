// var classNames = require('classnames');
var MainFrame = React.createClass({
  getInitialState: function() {
    return null;
  },
  componentDidMount: function() {
    $.fancybox("#username");
    var socket = io.connect();
    socket.on('connect', function() {
      console.log('connected');
    });
    socket.on("unique-message", function(data) {
      console.log(data);
    });
  },
  render: function() {
    return (
      <div className="MainFrame">
        <MainScreen />
        <ScreenBottom data={this.props.data}/>
        <UserName />
      </div>
    );
  }
});
var UserName = React.createClass({
  SendUserName: function(e) {
    console.log($(e).closest("input"));
  },
  render: function() {
    return (
      <div id="username">
        <h1>Please enter your name !</h1>
        <div className="inputbox fancybox">
          <input type="text" placeholder="username"></input>
          <div className="submit" onClick={this.SendUserName}>Submit!</div>
        </div>
      </div>
    );
  }
});
var MainScreen = React.createClass({
  render: function() {
    return (
      <div className="MainScreen">
        <ScreenTop />
        <TowerLeft />
        <TowerRight />
      </div>
    );
  }
});
var ScreenTop = React.createClass({
  render: function() {
    return (
      <div className="ScreenTop"></div>
    );
  }
});
var TowerLeft = React.createClass({
  render: function() {
    return (
      <div className="TowerLeft"></div>
    )
  }
});
var TowerRight = React.createClass({
  render: function() {
    return (
      <div className="TowerRight"></div>
    )
  }
});


var ScreenBottom = React.createClass({
  getInitialState: function() {
    return null
  },
  SendBtnMessage: function(e) {
    console.log(e);
  },
  render: function() {
    var hero_btn = [];
    var self = this;
  this.props.data.forEach(function(e) {
    hero_btn.push(<div className={e.Color+' '+ e.Name+ ' herobtn'} onClick={self.SendBtnMessage}></div>);
  });

    return (
      <div className="ScreenBottom">{hero_btn}</div>
    );
  }
});


var data = [
  {Name: "Ract", Color: "Yellow"},
  {Name: "Triangle", Color: "Blue"},
  {Name: "Circle", Color: "Purple"}
];

React.render(
  // React.createElement('h1', null, 'Hello, world!'),
  <MainFrame data={data}/>,
  document.getElementById('panel')
);
