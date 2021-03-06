import Game from "managers/Game";
import { Array2D, Tile, TileVector } from "managers/MazeManager";
import { 
  getExitDirectionByGridLocation, 
  getGridCellByLocation, 
  getMazeDirectionIndexFromTileVector, 
  getNewTilePositionByVector, 
  getRandomInteger, 
  getTileFromTileKey, 
  GridLocation, 
  isTileEqual, 
  MazeDirectionIndex, 
  MazeGridType, 
  MazeWallTypes 
} from "managers/MazeUtils";
import { MazeCell } from "models/MazeCell";


export type MazeGridArray = Array2D<MazeCell>;

export class MazeGrid {
  protected game: Game;
  public grid: MazeGridArray;
  public sizeX: number;
  public sizeY: number;
  private tileCount: number;
  public mazeGridType: MazeGridType;
  private isRandomStartLocation: boolean = false;

  public internalStartTile: Tile;
  public internalExitTile: Tile;
  public externalExitTile: Tile;
  public exitDirectionVector: TileVector;
  
  constructor(game: Game, sizeX: number, sizeY: number, mazeGridType: MazeGridType) {
    this.game = game;
    this.sizeX = sizeX;
    this.sizeY = sizeY;
    this.mazeGridType = mazeGridType;
    this.tileCount = 0;
    this.generateMazeGrid();
    this.setStartAndEndTile();
  }

  public generateMazeGrid() {
    // Default fill the whole grid with regular cells
    this.grid = [];
    for (let y = 0; y < this.sizeY; y++) {
      this.grid[y] = new Array();
      for (let x = 0; x < this.sizeX; x++) {
        this.grid[y][x] = new MazeCell(x, y);
        this.tileCount++;
      }
    }
  }

  public setStartAndEndTile() {
    const startGridLocation = this.chooseMazeStartGridLocation();
    const startGridCell = getGridCellByLocation(this, startGridLocation);
    if (!startGridCell || startGridCell.isCellDead()) {
      throw 'Invalid grid cell starting point.';
    }
    this.internalStartTile = startGridCell;
    
    const exitGridLocation = this.chooseMazeEndGridLocation(startGridLocation);
    const exitGridCell = getGridCellByLocation(this, exitGridLocation);
    if (!exitGridCell || exitGridCell.isCellDead()) {
      throw 'Invalid grid cell ending point.';
    }
    this.internalExitTile = exitGridCell;
    this.exitDirectionVector = getExitDirectionByGridLocation(exitGridLocation);
    this.externalExitTile = getNewTilePositionByVector(this.internalExitTile, this.exitDirectionVector);
    
    this.getCell(this.internalExitTile).setWallTypeAtIndex(getMazeDirectionIndexFromTileVector(this.exitDirectionVector), MazeWallTypes.NO_WALL);
  }

  public resetVisitedTiles(): void {
    for (let y = 0; y < this.sizeY; y++) {
      for (let x = 0; x < this.sizeX; x++) {
        this.getCell({ x: x, y: y }, true).setVisited(false);  
      }
    }
  }

  public setDeadCell(tile: Tile): void {
    this.tileCount--;
    this.getCell(tile).setDeadCell();
  }
  
  public isValidTile(tile: Tile, includeDeadCells: boolean = false): boolean {
    //TODO: this should actually check the physical cell
    return tile.x >= 0 && tile.x < this.sizeX
        && tile.y >= 0 && tile.y < this.sizeY
        && (includeDeadCells || !this.grid[tile.y][tile.x].isCellDead());
  }
  
  public getCell(tile: Tile, includeDeadCells: boolean = false): MazeCell {
    if (!this.isValidTile(tile, includeDeadCells)) {
      return null;
    }
    return this.grid[tile.y][tile.x];
  }
    
  public isVisited(tile: Tile): boolean {
    // Exit tile is not visited.
    if (isTileEqual(tile, this.externalExitTile)) return false;
    const cell = this.getCell(tile);
    if (cell) {
      return cell.isVisited;
    }
  }

  public setVisited(tile: Tile): void {
    if (!this.isValidTile(tile)) return;
    this.getCell(tile).setVisited();
  }
  
  public getCellByTileKey(tileKey: string): MazeCell {
    return this.getCell(getTileFromTileKey(tileKey));
  }

  public getCellWallType(tile: Tile, wallDirectionIndex: MazeDirectionIndex): MazeWallTypes {
    return this.getCell(tile).walls[wallDirectionIndex];
  }

  public getTileCount(): number {
    return this.tileCount;
  }

  public isMazeExitTile(tile: Tile): boolean {
    return isTileEqual(tile, this.externalExitTile);
  }
  
  public getAllCells(): MazeCell[] {
    const cellList: MazeCell[] = [];
    for (let y = 0; y < this.sizeY; y++) {
      for (let x = 0; x < this.sizeX; x++) {
        const cell = this.getCell({ x: x, y: y});
        if (cell && !cell.isCellDead()) {
          cellList.push(cell);
        }
      }
    }
    return cellList;
  }

  private chooseMazeStartGridLocation(): GridLocation {
    const validStartLocations = this.getValidStartLocations();
    if (this.isRandomStartLocation) {
      return validStartLocations[getRandomInteger(0, validStartLocations.length - 1)];
    }
    return this.getDefaultStartingLocation();
  }

  private chooseMazeEndGridLocation(startingLocation: GridLocation): GridLocation {
    const validEndLocationsSet = new Set(this.getValidExitLocations());
    validEndLocationsSet.delete(startingLocation);
    const validEndLocations = Array.from(validEndLocationsSet);

    if (this.isRandomStartLocation) {
      return validEndLocations[getRandomInteger(0, validEndLocations.length - 1)];
    }
    return this.getDefaultExitLocation();
  }
  
  protected getValidStartLocations(): GridLocation[] {
    throw `No start location defined for grid type: ${this.mazeGridType}.`;
  }

  protected getValidExitLocations(): GridLocation[] {
    throw `No exit location defined for grid type: ${this.mazeGridType}`;
  }

  protected getDefaultStartingLocation(): GridLocation {
    throw `No default starat location defined for grid type: ${this.mazeGridType}`;
  }

  protected getDefaultExitLocation(): GridLocation {
    throw `No default exit location defined for grid type: ${this.mazeGridType}`;
  }
}
