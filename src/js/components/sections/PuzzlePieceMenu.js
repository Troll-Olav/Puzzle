var React = require('react');
var Board = require('./Board.js');

var PuzzlePieceMenu = React.createClass({

componentDidMount: function(){

    var content = document.getElementById("content");
    //TweenLite.set(content);

	var gridWidth = 200;
	var gridHeight = 100;

	//TweenLite.to(".troll", 2, { throwProps:{x:50, y:-30} });
	Draggable.create(".troll", {
	    type:"x,y",
	    throwProps:true,
	    bounds: content,
	    onDrag: function(){
	    	console.log('dragging');
	    	console.log(this.x);
	    	console.log(this.y);
	    },
	    onDragEnd: function(){
	    	console.log('ended');
	    	console.log(this.x);
	    	console.log(this.y);
	    	
	    },
	    snap: {
	        x: function(endValue) {
	             Math.round(endValue / gridWidth) * gridWidth;
	        },
	        y: function(endValue) {
	            Math.round(endValue / gridHeight) * gridHeight;
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
					src="./assets/img/troll.png" />
			</div>
		);
    }
});

module.exports = PuzzlePieceMenu;