var React = require("react");
var PuzzlePieceMenu = require("./PuzzlePieceMenu.js");
var PuzzleApp = require("./../PuzzleApp");

React.initializeTouchEvents(true);

var Board = React.createClass({

		render: function(){
			return (
				<div>Hello there
					<PuzzlePieceMenu position={this.props.position} clickHandler={this.props.onClick} onDragHandler={this.props.onDrag} dragHandler={this.props.onDragStart} onDragEndHandler={this.props.onDragEnd} />
				</div>
				);
		}
	});


module.exports = Board;