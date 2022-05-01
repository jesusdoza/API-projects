//gameboard will have map tiles 
// each tile will have unique id, and mark placed on it by player
// tiles in dom will have class of game-tile and id of tile1, tile2 ... so on
// each tile will recieve a mark when clicked on by player different mark depending on player choice
// cannot overwrite mark once it is placed by a player

//when tile clicked tile.mark is set
// turns left counter decrements
// win conditions are checked'
    
    //if above and below have same mark win
    //if left and right have same mark win else
    //if above to left and below right same win else
    //if above right and left below win else
    //if turns are left continue else end of game and no win

// psuedo code above============================================================




// tiles class used inside game board
 class Tile {
    constructor(id_) {
        this.id = id_; // place on board
        this.mark = ''; // holds players mark 
        this.player=''; //player that has claimed this tile, empty string is falsy
        this.domElement={};
        // this.img='some url' // picture to display if wanted later
        
    };

    setMark(mark_) {
        this.mark = mark_;
        this.domElement.innerHTML=mark_;
    };

    setPlayer(playerId_){
        this.player=playerId_;
    };
    getMark(mark_) {
        return this.mark;
    };
    getPlayer() {
        return this.player;
    };
}





//gameboard holds tiles and does win logic after each tile is claimed by player
class GameBoard {
    constructor(){
        this.numOfTiles=9; // used to set up gameboard at start()
        this.gameTiles= new Map; // holds tiles for game
        this.players=[];
        this.currentPlayer=0;

    }
    
    //initialize tiles 
    start(tileDomClass_='.game-tile'){
        console.log('game board and tiles generated')

        // put tiles into map
        for(let i =0; i<this.numOfTiles;i++){
            this.gameTiles.set(i+1,new Tile(i+1))
        }

        //get the dom elements to use as game tiles
        let domTiles = document.querySelectorAll(tileDomClass_)

        //for each of the dom elements
        domTiles.forEach((tile)=>{

            //get the corresponding game tile from map in game board class
            //by using the dom elements data-tile value
            //currentTile is tile from map inside gameBoard
            //const currentTile= this.gameTiles.get(tile.dataset.tile)
            const currentTile= this.gameTiles.get(+tile.dataset.tile)

           //set the gameTiles domElement property
           currentTile.domElement=tile;

           //can change inner html with this
        // currentTile.domElement.innerHTML=currentTile.id;
        //    console.log(currentTile)
           

        })


    }



    //add players marks
    addPlayer(playerName_='name',playerMark_='playerMark_'){
        let player = {
            name:playerName_,
            mark:playerMark_,
        }

        // max of 2 players
        if(this.players.length < 2){
            this.players.push(player)
        }
        else{
            console.log(`already at ${this.players.length} players`)
        }
        
    }




    //when tile is clicked player property is set and mark is also set
    claimTile(tileId_=1,playerId_='playerName',mark_='testMark'){
        this.gameTiles.get(tileId_).setPlayer(playerId_) //claim for player
        this.gameTiles.get(tileId_).setMark(mark_)  //put players mark in it

        this.checkWin(tileId_)  // did i win after i placed my mark?
    }



    //check if current tile has won the game
    checkWin(tileId_){
        let whoWon=false;
        console.log('checking if any one won')
        // get what row tile is in top to bottom
       const whatRow = tileId_/3 <= 1 ? 1 
       :tileId_/3 <= 2 ? 2 
       :tileId_/3 <= 3 ? 3 : 0

       //get what col tile is in from left to right
       const whatCol = tileId_%3 == 1 ? 1 
       :tileId_%3 == 2 ? 2 
       :tileId_%3 == 0 ? 3 : 0

       //check if any has won yet
      whoWon =this.rowWin(whatRow) || this.colWin(whatCol) || this.diagWin()
        
      if(whoWon){
          console.log(`this person won ${whoWon}`)
      }
      else{
        console.log(`no one wins yet`)
      }
       
    }


    colWin(col_){
       const tile1Player=this.gameTiles.get(col_).getPlayer()   // top of col
       const tile2Player=this.gameTiles.get(col_+3).getPlayer() // mid of col
       const tile3Player=this.gameTiles.get(col_+6).getPlayer()  // bottom of col

       console.log(` colWin tile 1 ${tile1Player} tile 2 ${tile2Player} tile 3 ${tile3Player}`)

        //compare players
        if(tile1Player==tile2Player && tile1Player==tile3Player){
            console.log(`${tile1Player} wins`)
            return tile1Player
        }
        else{
            console.log('no col win')
            return false
        }
       
    }

    //check row for win by seeing all tiles in row have same player property
    //if win then return player name
    //else return false
    rowWin(row_){
       
        const tile3Player=this.gameTiles.get(row_*3).getPlayer()
        const tile2Player=this.gameTiles.get(row_*3 -1).getPlayer()
        const tile1Player=this.gameTiles.get(row_*3 - 2).getPlayer()

        console.log(` rowWin tile 1 ${tile1Player} tile 2 ${tile2Player} tile 3 ${tile3Player}`)

        // compare players 
        if(tile1Player==tile2Player && tile1Player==tile3Player){
            return tile1Player
        }
        else{
            console.log('no row win')
            return false
        }
    }

    diagWin(){

        console.log(`diag win check`)
       
        const tile1=this.gameTiles.get(1).getPlayer()
        const tile5=this.gameTiles.get(5).getPlayer()
        const tile9=this.gameTiles.get(9).getPlayer()
        const tile3=this.gameTiles.get(3).getPlayer()
        const tile7=this.gameTiles.get(7).getPlayer()
        

        // compare players 
        if(tile5==tile1 && tile5==tile9){
            return tile5
        }
        else if (tile5==tile3 && tile5==tile7) {
            return tile5
        }
        else{
            console.log('no diag win')
            return false;
        }
    }


    showGameBoard(){
        console.log(`${this.gameTiles.get(1).getMark()} ${this.gameTiles.get(2).getMark()} ${this.gameTiles.get(3).getMark()}`)
        console.log(`${this.gameTiles.get(4).getMark()} ${this.gameTiles.get(4).getMark()} ${this.gameTiles.get(5).getMark()}`)
        console.log(`${this.gameTiles.get(7).getMark()} ${this.gameTiles.get(8).getMark()} ${this.gameTiles.get(9).getMark()}`)

    }


    


}


let a = new GameBoard



