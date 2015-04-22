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
	    	console.log('y: ', this.y)
	    },
	    onDragEnd: function(e){
	    	x = this.x;
	    	y = this.y;
	    	var target = e.target;
	    	var x_goal = target.getAttribute('x');
	    	var y_goal = target.getAttribute('y');
	    	var x_diff = Math.abs(x_goal - x);
	    	var y_diff = Math.abs(y_goal - y);
	    	if (x_diff < 100 && y_diff < 100) {
	    		console.log('hit target!');
	 	    	TweenLite.to(target, 0.5, {x: x_goal,y: y_goal, onComplete: function(){
	 	    		console.log('completed');
	 	    	}})
	    	}
	    }
	});


	},
    
    _onClick: function() {
        
        y = 0;
        
    },

    render: function(){
		console.log("this.props:", this.props);
		var position = this.props.position;
		console.log('position props: ', position);

		var imgStyle = {
			"transform": "translate(" + this.props.position.x + "px, " + this.props.position.y +"px) translateZ(0) scale(1.0, 1.0)",
			"webkit-transform": "translate(" + this.props.position.x + "px, " + this.props.position.y +"px)",
			position: 'relative',
			opacity: 1
		};

		return(

			<div className="row" style={imgStyle} >
                <div className="col-md-6">
                    <input type="submit" value="Play again" className="playAgain" onClick={this._onClick} />
                </div>
                <div className="col-md-12">
                    <img id="troll" x="200" y="200" className="troll" src="./assets/img/Puzzle_A.png" />
                    <img id="troll" x="200" y="200" className="troll" src="./assets/img/Puzzle_B.png" />
                    <img id="troll" x="200" y="200" className="troll" src="./assets/img/Puzzle_C.png" />
                    <img id="troll" x="200" y="200" className="troll" src="./assets/img/Puzzle_D.png" />
                    <img id="troll" x="200" y="200" className="troll" src="./assets/img/Puzzle_E.png" />
                </div>
			</div>
		);
    }
});

module.exports = PuzzlePieceMenu;