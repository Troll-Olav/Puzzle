var React = require('react');
var Board = require('./Board.js');

var x;
var y;
var imgArray;
var eachImage = [];
var tempValue, randomIndex;
var currentIndex;

var PuzzlePieceMenu = React.createClass({
    
    getInitialState: function() {
        return ({
             eachRandomArr: null
        });
    },

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
		
        var slicedArr = imgArray.slice();
        currentIndex = slicedArr.length;
		while (0 !== currentIndex) {
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;
			tempValue = slicedArr[currentIndex];
			slicedArr[currentIndex] = slicedArr[randomIndex];
			slicedArr[randomIndex] = tempValue;
            console.log("tempvalue:", tempValue);
            console.log("currentIndex:", currentIndex);
            console.log("randomindex:", randomIndex);
            
            this.setState({
                eachRandomArr: slicedArr.slice(0, 5)
            });
            
		}
    },
    
    

    render: function(){
		imgArray = [<img id="troll" x="200" y="200" className="troll" src="./assets/img/Puzzle_A.png" ref="pieceA" key="pieceA" />, <img id="troll" x="200" y="200" className="troll" src="./assets/img/Puzzle_B.png" ref="pieceB" key="pieceB" />, <img id="troll" x="200" y="200" className="troll" src="./assets/img/Puzzle_C.png" ref="pieceC" key="pieceC" />, <img id="troll" x="200" y="200" className="troll" src="./assets/img/Puzzle_D.png" ref="pieceD" key="pieceD" />, <img id="troll" x="200" y="200" className="troll" src="./assets/img/Puzzle_E.png" ref="pieceE" key="pieceE" />];
		
        console.log("each image is", eachImage);
		for (var i = 0; i < imgArray.length; i++) {
			eachImage.push(imgArray[i]);
        }
        var finalArr = this.state.eachRandomArr;
		return(
            <div>
                <div className="row">
                    <div className="col-md-12">
                        <input type="submit" value="Spill Igjen" id="playAgain" onClick={this._onClick} />
                    </div>
                </div>
                <div className="row">
                    {finalArr}
                </div>
            </div>
		);
	}
});

module.exports = PuzzlePieceMenu;