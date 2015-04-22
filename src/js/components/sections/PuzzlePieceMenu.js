var React = require('react');
var Board = require('./Board.js');

var PuzzlePieceMenu = React.createClass({

componentDidMount: function(){

    var content = document.getElementById("content");

	var puzzleBrick = Draggable.create(".troll", {
	    type:"x,y",
	    bounds: content,
	    onDrag: function(e){
	    	var target = e.target;
	    	var offset = $(target).offset();
	    	var x_center = offset.left + (target.width * 0.5);
	    	var y_center = offset.top + (target.height * 0.5);
	    	console.log('offset: ', offset);
	    	console.log('x_center: ', x_center);
	    	console.log('y_center: ', y_center);



	    },
	    onDragEnd: function(e){
	    	var target = e.target;
	    	var x_goal = target.getAttribute('x');
	    	var y_goal = target.getAttribute('y');
	    	console.log('x_goal: ',x_goal);
	    	console.log('y_goal: ',y_goal);
	    	var element = $(target);
	    	var offset = $(target).offset();
	    	console.log('element: ', element);
	    	//console.log('offset.left: ', offset.left);
	    	//console.log('offset.top: ', offset.top);

	    	var x_center = offset.left + (target.width * 0.5);
	    	console.log('x_center: ', x_center);
	    	var y_center = offset.top + (target.height * 0.5);
	    	console.log('y_center: ', y_center);


	    	var x_diff = Math.abs(x_center - x_goal);
	    	var y_diff = Math.abs(y_center - y_goal);
	    	console.log('x_diff: ', x_diff);
	    	console.log('y_diff: ', y_diff);
	    	var threshold = 100;
	    	var that = this;

	    	if (x_diff < 100 && y_diff < threshold) {


		    		// the object is within the threshold
		    		console.log('the object is within the threshold');
		    		console.log('x_diff to animate: ', x_diff);
	    			console.log('y_diff to animate: ', y_diff);

		    		if (x_goal > x_center){
			    		// the object is to the left of the x_goal

			    		var distance_left = x_goal - x_center;
			    		console.log('Distance left: ', distance_left);


		    			if (y_goal > y_center){
		    				// the object is above the y_goal
		    				var distance_top = y_goal - y_center;
		    				
		    				animate(element, distance_top, distance_left, that);


		    			} 
		    			else if (y_goal < y_center) {
		    				// the object is below the y_goal
		    				var distance_top = -(y_center - y_goal);
		    				console.log('Distance up to goal: ',distance_top);
		    				animate(element, distance_top, distance_left, that);

		    			}
		    		}

		    		else if (x_goal <= x_center){
		    			// the object is to the right of the x_goal

		    				var distance_left = -(x_center - x_goal);
		    				console.log('Distance left to goal: ', distance_left)


		    				if (y_goal > y_center){
		    				// the object is above the y_goal

			    				var distance_top = y_goal - y_center;
			    				console.log('Distance down to goal: ',distance_top);
			    				animate(element, distance_top, distance_left, that);

		    		
		    				
			    			} 
			    			else if (y_goal < y_center) {
			    				// the object is below the y_goal
			    				var distance_top = -(y_center - y_goal);
		    					console.log('Distance up to goal: ',distance_top);
		    					animate(element, distance_top, distance_left, that);


		    				}
		    		}

	    	}
	    	}
		});
	
	function disable(index){
		puzzleBrick[index].disable();
		console.log(puzzleBrick);
		console.log('DISABLING DRAGGABLE')
	};


	function animate(element, distance_top, distance_left, that){
		element.animate({
			top: distance_top,
			left: distance_left
		}, 700, function(){
		for (i=0;i<puzzleBrick.length;i++){
			if (puzzleBrick[i] === that){
				disable(i);
			}	    
		}		
});

	}

	},

    render: function(){

		return(
			<div className="row" >
                <div className="col-md-12">
                    <img x="370" y="180"  className="troll" src="./assets/img/Puzzle_A.png" />
                    <img x="440" y="420" className="troll" src="./assets/img/Puzzle_B.png" />
                    <img  x="600" y="260" className="troll" src="./assets/img/Puzzle_C.png" />
                    <img  x="850" y="130" className="troll" src="./assets/img/Puzzle_D.png" />
                    <img x="870" y="370"   className="troll" src="./assets/img/Puzzle_E.png" />

                </div>
			</div>
		);
    }
});

module.exports = PuzzlePieceMenu;