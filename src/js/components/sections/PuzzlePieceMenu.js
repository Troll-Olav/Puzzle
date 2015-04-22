var React = require('react');
var Board = require('./Board.js');

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
	    	var x = this.x;
	    	var y = this.y;
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
			<div style={imgStyle} >
			<img 	id="troll"
					className="troll"
					x="200"
					y="200"
					src="./assets/img/troll.png" />
			</div>
		);
    }
});

module.exports = PuzzlePieceMenu;