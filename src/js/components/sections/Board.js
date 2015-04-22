var React = require("react");
var PuzzlePieceMenu = require("./PuzzlePieceMenu.js");
var PuzzleApp = require("./../PuzzleApp");

React.initializeTouchEvents(true);

var Board = React.createClass({

		render: function(){
			return (
				<div className="row">
                    <div className="col-md-12">
                        <img className="puzzleBoard" src="./assets/img/Example.jpg"></img>
                    </div>
				</div>
            );
		}
	});


module.exports = Board;