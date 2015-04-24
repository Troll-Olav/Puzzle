var React           = require("react");
var Board           = require("./sections/Board");
var PuzzlePieceMenu = require("./sections/PuzzlePieceMenu");

var PuzzleApp = React.createClass({
	
		getInitialState: function() {
		    return {windowWidth: window.innerWidth,
		    		muted: false};
		 },

		update: function(e){
			this.setState({
				position: {
					x : 0,
					y : 0
				}
			});
		},

		toggleMute: function(){
			console.log('toggleMute in PuzzleApp')
			this.setState({
				windowWidth: window.innerWidth,
				muted: !this.state.muted
			});
		},

    render: function() {
        return (
            <div>
                <div >
                    <Board position={this.state.position} />
                    <PuzzlePieceMenu 	position={this.state.position} 
                    					window={this.state.windowWidth} 
                    					muted={this.state.muted}
                    					toggleMute={this.toggleMute} />
                </div>

            </div>
        );
    }
    
});

module.exports = PuzzleApp;