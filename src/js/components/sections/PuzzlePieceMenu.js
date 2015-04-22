var React = require('react');
var Board = require('./Board.js');

var x;
var y;

var PuzzlePieceMenu = React.createClass({

componentDidMount: function(){

    var content = document.getElementById("content");

	Draggable.create(".troll", {
	    type:"x,y",
	    throwProps:true,
	    bounds: content,
	    onDrag: function(){
	    	console.log('x: ', this.x);
	    	console.log('y: ', this.y);
	    },
	    onDragEnd: function(e){
	    	console.log('done');
	    	var target = e.target;
	    	var x_goal = target.getAttribute('x');
	    	var y_goal = target.getAttribute('y');
	    	var offset = $(target).offset();
	    	console.log('offset.left: ', offset.left);
	    	console.log('offset.top: ', offset.top);
	    	var x_diff = Math.abs(x_goal - offset.left);
	    	var y_diff = Math.abs(y_goal - offset.top);
	    	console.log('x_diff: ', x_diff);
	    	console.log('y_diff: ', y_diff);

	    	if (x_diff < 100 && y_diff < 100) {
	    		console.log('hit target!');
	 	    	TweenLite.to(target, 0.5, { x: x_goal, y: y_goal, onComplete: function(){

	 	    	}})
	    	}
	    }
	});


	},
    
    
    _onClick: function() {
        React.findDOMNode(this.refs.pieceA).style.transform = "translate3d(0px, 0px, 0px)";
        React.findDOMNode(this.refs.pieceB).style.transform = "translate3d(0px, 0px, 0px)";
        React.findDOMNode(this.refs.pieceC).style.transform = "translate3d(0px, 0px, 0px)";
        React.findDOMNode(this.refs.pieceD).style.transform = "translate3d(0px, 0px, 0px)";
        React.findDOMNode(this.refs.pieceE).style.transform = "translate3d(0px, 0px, 0px)";
    },
    

    render: function(){

		return(
			<div className="row">
                <div className="col-md-12">
                    <input type="submit" value="Spill Igjen" id="playAgain" className="form-control" onClick={this._onClick} />
                </div>
                <div className="col-md-12">
                    <img id="troll" x="200" y="200" className="troll" src="./assets/img/Puzzle_A.png" ref="pieceA" />
                    <img id="troll" x="200" y="200" className="troll" src="./assets/img/Puzzle_B.png" ref="pieceB" />
                    <img id="troll" x="200" y="200" className="troll" src="./assets/img/Puzzle_C.png" ref="pieceC" />
                    <img id="troll" x="200" y="200" className="troll" src="./assets/img/Puzzle_D.png" ref="pieceD" />
                    <img id="troll" x="200" y="200" className="troll" src="./assets/img/Puzzle_E.png" ref="pieceE" />
                </div>
			</div>
		);
    }
});

module.exports = PuzzlePieceMenu;