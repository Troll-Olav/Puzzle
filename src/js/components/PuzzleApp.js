var React           = require("react");
var Board           = require("./sections/Board");
var PuzzlePieceMenu = require("./sections/PuzzlePieceMenu");

var PuzzleApp = React.createClass({
	
		getInitialState: function() {
		    return {windowWidth: window.innerWidth};
		 },

		update: function(e){
			this.setState({
				position: {
					x : 0,
					y : 0
				}
			});
		},

		onDragStart: function(e){
			console.log('onDragStart triggered');
			this.setState({
				position: {
					x: e.pageX - 88,
					y: e.pageY - 88
				}
			});
		},

		onDragEnd: function(e){
			console.log('onDragEnd triggered');
			this.setState({
				position: {
					x: e.pageX - 88,
					y: e.pageY - 88
				}
			});
		},

		onDrag: function(e){
			this.setState({
				position: {
					x: e.pageX - 88,
					y: e.pageY - 88
				}
			});
		},

		onClick: function(e){
			console.log('onClick');
			console.log(e.pageX);
			this.setState({
				position: {
					x: e.pageX - 88,
					y: e.pageY - 88
				}
			});
		},
    render: function() {
    	console.log('windowWitdh: ', this.state.windowWidth)
        return (
            <div>
                <div className="row">
                    <Board position={this.state.position} />
                    <PuzzlePieceMenu position={this.state.position} window={this.state.windowWidth} clickHandler={this.state.onClick} onDragHandler={this.state.onDrag} dragHandler={this.state.onDragStart} onDragEndHandler={this.state.onDragEnd} />
                </div>

            </div>
        );
    }
    
});

module.exports = PuzzleApp;