var React = require('react');
var Board = require('./Board.js');

var audio = new Audio('./assets/audio/cheer.mp3');
var finalSong = new Audio('./assets/audio/final.mp3');

var puzzleBrick;

var PuzzlePieceMenu = React.createClass({

componentDidMount: function(){

    var count = 0;
    var content = document.getElementById("content");
    var windowWidth = this.props.window;
	var puzzleWidth = windowWidth * 0.8;
	var puzzleHeight = puzzleWidth * 0.738;
	var margin_left = (windowWidth - puzzleWidth) / 2;
	var pixelsPerPercentWidth = puzzleWidth / 1000;
	var pixelsPerPercentHeight = puzzleHeight / 1000;

	console.log('windowWidth: ', windowWidth);
	console.log('puzzleHeight: ', puzzleHeight);
	console.log('puzzleWidth: ', puzzleWidth);
	console.log('margin_left: ', margin_left);

	var pieces = document.getElementsByClassName("troll");
	var bottomMenu = document.getElementsByClassName("characterMenuBottom");
	console.log('bottomMenu: ',bottomMenu);

	bottomMenu[0].style.top = puzzleHeight *0.6 + "px";

	for (var i=0, len = pieces.length; i < len; i++){
		piece = pieces[i];
		width = pieces[i].getAttribute('width')
		pieces[i].style.width = (pixelsPerPercentWidth*width) + "px";
		pieces[i].style.zIndex = 1;
	}



	puzzleBrick = Draggable.create(".troll", {
	    type:"x,y",
	    bounds: window,
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
	    	var x_percent = target.getAttribute('x');
	    	var y_percent = target.getAttribute('y');

	    	var y_goal = (pixelsPerPercentWidth * y_percent);
	    	var x_goal = margin_left + (pixelsPerPercentHeight * x_percent);



	    	console.log('x_goal: ',x_goal);
	    	console.log('y_goal: ',y_goal);
	    	var element = $(target);
	    	console.log(element);
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
	    	var threshold = 20;
	    	var that = this;

	    	if (x_diff < threshold && y_diff < threshold) {

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
		console.log('DISABLING DRAGGABLE');
        count++;
        if (count <= 4) {
            audio.play();
        } else {
            finalSong.play();
        }
        console.log("count:", count);

	}
    
	function animate(element, distance_top, distance_left, that){
		element
			.animate({
			top: distance_top,
			left: distance_left,
		}, 700, function(){

            var i;
            for (i=0;i<puzzleBrick.length;i++){
                if (puzzleBrick[i] === that){
                    disable(i);
                    element.css('z-index', 0);

                }	    
            }		
        }); 
	}

        
	},
    
    
    _onClick: function() {
    	console.log('clicked!');
    	window.location.reload()

    },
    
    muter: function() {
    	console.log('muted');
        audio.muted = !audio.muted;
        finalSong.muted = !finalSong.muted;
    },
    

    render: function(){

    	var style = {
    		left: ""
    	}
        
		return(
			<div>
			<div className="characterMenuTop col-md-12" style={style}>
                    <img x="245" y="238" className="troll" width="244" style={style} id="trollOlav" ref="pieceA"  key="pieceA" src="./assets/img/Puzzle_A.png" />
                    <img x="1091" y="500" className="troll" width="223"  style={style} id="girl" ref="pieceE"  key="pieceE" src="./assets/img/Puzzle_E.png" />
			</div>

			<div className="characterMenuBottom col-md-12">
                    <img x="345" y="560" className="troll" width="261"  style={style} id="sealBoy" ref="pieceB"  key="pieceC" src="./assets/img/Puzzle_B.png" />
                    <img x="663" y="359" className="troll" width="316" style={style} id="snowMan" ref="pieceC"  key="pieceD" src="./assets/img/Puzzle_C.png" />
                    <img x="1065" y="175" className="troll" width="260" style={style} id="sealGirl" ref="pieceD"  key="pieceE" src="./assets/img/Puzzle_D.png" />
			</div>



                <div className="buttonsDiv">
                    <div className="innerButtonDiv">
                        <button  value="Spill igjen" className="glyphicon glyphicon-refresh" id="playAgain" onClick={this._onClick} />
                        <button className="glyphicon glyphicon-volume-off" onClick={this.muter} />
                    </div>
                </div>
		
			</div>

		);
    }
});

module.exports = PuzzlePieceMenu;