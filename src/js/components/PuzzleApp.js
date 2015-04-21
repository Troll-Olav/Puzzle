var React           = require("react");
var Board           = require("./sections/Board");
var PuzzlePieceMenu = require("./sections/PuzzlePieceMenu");

var PuzzleApp = React.createClass({
    
    render: function() {
        return (
            <div>
                <div className="row">
                    <Board />
                </div>
                <div className="row">
                    <PuzzlePieceMenu />
                </div>
            </div>
        );
    }
    
});

module.exports = PuzzleApp;