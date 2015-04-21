var React = require("react");


React.initializeTouchEvents(true);

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
		render: function(){
			return (
				<div>Hello there
					<PuzzleBit position={this.state.position} clickHandler={this.onClick} onDragHandler={this.onDrag} dragHandler={this.onDragStart} onDragEndHandler={this.onDragEnd} />
				</div>
				);
		}
	});


module.exports = Board;