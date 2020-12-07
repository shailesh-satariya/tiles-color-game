# Tiles color game

# Description
The player is given an n x n board of tiles where each tile is given one of m colors. Each tile is connected to up to four adjacent tiles in the North, South, East, and West directions. A tile is connected to the origin (the tile in the upper left corner) if it has the same color as the origin and there is a path to the origin consisting only of tiles of this color. A player makes a move by choosing one of the m colors. After the choice is made, all tiles that are connected to the origin are changed to the chosen color. The game proceeds until all tiles of the board have the same color. The goal of the game is to change all the tiles to the same color, preferably with the fewest number of moves possible. 

[Demo](https://shailesh-satariya.github.io/tiles-color-game/demo/) (without server)

### Common
This module is shared between client and server

#### Installation
```bash
npm install
```

#### Testing

```bash
npm test
```


### Server

#### Installation
```bash
cd server 
npm install 
npm start
```

#### Testing

```bash
npm test
```

#### Build

```bash
npm run build
```

### Client

#### Installation
```bash
cd client 
npm install 
npm start
```

#### Testing

```bash
npm test
```

#### Build

```bash
npm run build
```

#### Configuration

To run without server, only locally set following setting in client/.env 
```
REACT_APP_WITHOUT_API=1
```
