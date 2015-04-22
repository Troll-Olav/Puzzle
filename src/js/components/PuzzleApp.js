var React           = require("react");
var Board           = require("./sections/Board");
var PuzzlePieceMenu = require("./sections/PuzzlePieceMenu");

var PuzzleApp = React.createClass({
    getInitialState: function(){
			return {
				position: {
					x : 0,
					y  : 0
				}
			};
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
        return (
            <div>
                <div className="row">
                    <Board position={this.state.position} />
                </div>
                <div className="row">
                    <PuzzlePieceMenu position={this.state.position} clickHandler={this.state.onClick} onDragHandler={this.state.onDrag} dragHandler={this.state.onDragStart} onDragEndHandler={this.state.onDragEnd} />
                </div>
            </div>
        );
    }
    
});

module.exports = PuzzleApp;