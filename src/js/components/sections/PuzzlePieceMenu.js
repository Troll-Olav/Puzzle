var React = require('react');

var PuzzlePieceMenu = React.createClass({

    render: function(){
		console.log(this.props);
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
			<img 	onClick={this.props.clickHandler} 
					onDrag={this.props.onDragHandler} 
					onDragStart={this.props.dragHandler} 
					onDragEnd={this.props.onDragEndHandler}
					draggable={true}
					src="./assets/img/troll.png" />
			</div>
		);
		}
});

module.exports = PuzzlePieceMenu;