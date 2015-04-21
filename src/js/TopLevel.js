React.initializeTouchEvents(true);
var App = React.createClass({
		getInitialState: function(){
			return {
				position: {
					x : 0,
					y  : 0
				}
			}
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
			console.log('onDrag triggered');
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

	var PuzzleBit = React.createClass({

		render: function(){
		console.log(this.props);
		var position = this.props.position;
		console.log('position props: ', position);

		var imgStyle = {
			webkitTransform: "translate(" + this.props.position.x + "px, " + this.props.position.y +"px) scale(1.0, 1.0) translateZ(0)",
			webkitBackfaceVisibility: "hidden",
    		msTransform: "translate(" + this.props.position.x + "px, " + this.props.position.y +"px) scale(1.0, 1.0) translateZ(0)",
			msBackfaceVisibility: "hidden",

    		//WebkitTransform: "translateZ(0)",
			position: 'relative',
			opacity: 1,
			width: '100px',
			height: '100px'
		};


		return(
			<div >
				<img 	style={imgStyle}
						onClick={this.props.clickHandler} 
						onDrag={this.props.onDragHandler} 
						onDragStart={this.props.dragHandler} 
						onDragEnd={this.props.onDragEndHandler}
						draggable={true}
						src="./assets/img/ainsley.png" />
				

			</div>
		);
		}
	});



React.render( <App />, document.body);
