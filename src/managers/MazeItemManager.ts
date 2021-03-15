import { MazeItemKey } from "constants/ItemConstants";
import { UpgradeKey } from "constants/UpgradeConstants";
import Game from "managers/Game";
import UnlimitedSplitsItem from "items/definitions/UnlimitedSplitsItem";
import BlackHoleMazeItem from "items/definitions/BlackHoleMazeItem";
import BrainMazeItem from "items/definitions/BrainMazeItem";
import FruitMazeItem from "items/definitions/FruitMazeItem";
import MultiplierMazeItem from "items/definitions/MultiplierMazeItem";
import GhostMazeItem from "items/definitions/GhostMazeItem";
import MazeItem from "items/MazeItem";
import { Tile } from "managers/MazeManager";
import { generateTileKey } from "managers/MazeUtils";


class MazeItemManager {
  public mazeItemMap: Map<string, MazeItem>;
  private game: Game;

  constructor(game: Game) {
    this.mazeItemMap = new Map<string, MazeItem>();
    this.game = game;
  }

  public generateMazeItems(mazeSizeX: number, mazeSizeY: number) {
    for (let mazeItemKey in MazeItemKey) {
      this.generateMazeItemDrops(mazeItemKey as MazeItemKey, mazeSizeX, mazeSizeY);
    }
  }
 
  public isMazeItemUnlocked(mazeItemKey: MazeItemKey) {
    return this.game.biomes.isMazeItemUnlocked(mazeItemKey);
  }

  // //TODO: wtf? why is this not stored in the maze item base class.  Hello?  Greg?
  public getMazeItemSpawnProbability(mazeItemKey: MazeItemKey) {
    if (mazeItemKey === MazeItemKey.FRUIT) {
      return FruitMazeItem.getItemSpawnProbability(this.game);
    } else if (mazeItemKey === MazeItemKey.BRAIN) {
      return BrainMazeItem.getItemSpawnProbability(this.game);
    } else if (mazeItemKey === MazeItemKey.MULTIPLIER) {
      return MultiplierMazeItem.getItemSpawnProbability(this.game);
    } else if (mazeItemKey === MazeItemKey.BLACK_HOLE) {
      return BlackHoleMazeItem.getItemSpawnProbability(this.game);
    } else if (mazeItemKey === MazeItemKey.UNLIMITED_SPLITS) {
      return UnlimitedSplitsItem.getItemSpawnProbability();
    } else if (mazeItemKey === MazeItemKey.GHOST) {
      return GhostMazeItem.getItemSpawnProbability();
    } else {
      console.error('Failed to create maze item of type.  No valid type: ' + mazeItemKey);
      return;
    }
  }

  public createMazeItem(tile: Tile, mazeItemKey: MazeItemKey) {
    const tileKey = generateTileKey(tile.x, tile.y);
    let mazeItem = null;
    if (mazeItemKey === MazeItemKey.FRUIT) {
      mazeItem = new FruitMazeItem(this.game, tile, mazeItemKey);
    } else if (mazeItemKey === MazeItemKey.BRAIN) {
      mazeItem = new BrainMazeItem(this.game, tile, mazeItemKey);
    } else if (mazeItemKey === MazeItemKey.MULTIPLIER) {
      mazeItem = new MultiplierMazeItem(this.game, tile, mazeItemKey);
    } else if (mazeItemKey === MazeItemKey.BLACK_HOLE) {
      mazeItem = new BlackHoleMazeItem(this.game, tile, mazeItemKey);
    } else if (mazeItemKey === MazeItemKey.UNLIMITED_SPLITS) {
      mazeItem = new UnlimitedSplitsItem(this.game, tile, mazeItemKey);
    } else if (mazeItemKey === MazeItemKey.GHOST) {
      mazeItem = new GhostMazeItem(this.game, tile, mazeItemKey);
    } else {
      console.error('Failed to create maze item of type.  No valid type: ' + mazeItemKey);
      return;
    }

    //TODO: create items in a single loop to dedupe.
    if (this.hasMazeItem(tileKey)) {
      console.error('Cannot create item. Tile is already occupied.');
      return;
    }

    this.mazeItemMap.set(tileKey, mazeItem);
  }
  
  public clearAllItems() {
    this.mazeItemMap = new Map<string, MazeItem>();
  }
  
  public getMazeItem(tileKey: string): MazeItem {
    if (!this.hasMazeItem(tileKey)) return null;
    return this.mazeItemMap.get(tileKey);
  }

  public hasMazeItem(tileKey: string): boolean {
    return this.mazeItemMap.has(tileKey);
  }

  public drawItem(tileKey: string): void {
    if (!this.hasMazeItem(tileKey)) return;
    this.getMazeItem(tileKey).drawItem();
  }
  
  public pickupItem(tileKey: string, playerId: number) {
    if (!tileKey || !this.hasMazeItem(tileKey)) return;
    
    const mazeItem = this.mazeItemMap.get(tileKey);
    mazeItem.triggerPickup(playerId);
    this.applyItemToExtraBots(mazeItem, playerId);
    
    this.mazeItemMap.delete(tileKey);
  }

  public generateMazeItemDrops(mazeItemKey: MazeItemKey, mazeSizeX: number, mazeSizeY: number): void {
    if (!this.isMazeItemUnlocked(mazeItemKey)) {
      return;
    }

    const spawnProb: number = this.game.items.getMazeItemSpawnProbability(mazeItemKey);
    
    //TODO: calculate global probability and assign randomly
    for (let y = 0; y < mazeSizeX; y++) {
      for (let x = 0; x < mazeSizeY; x++) {
        let rand = Math.random();
        if(rand < spawnProb) {
          const tile: Tile = { x: x, y: y };
          this.game.items.createMazeItem(tile, mazeItemKey);
        }
      }
    }
  }

  public getItemUseExtraBotUpgradeCount(itemKey: MazeItemKey): number {
    if (itemKey === MazeItemKey.UNLIMITED_SPLITS) {
      return this.game.upgrades.getUpgradeLevel(UpgradeKey.UNLIMITED_SPLIT_ITEM_EXTRA_BOT);
    } else if (itemKey === MazeItemKey.MULTIPLIER) {
      return this.game.upgrades.getUpgradeLevel(UpgradeKey.MULTIPLIER_ITEM_EXTRA_BOT);
    }
    return 0;
  }
  
  public applyItemToExtraBots(mazeItem: MazeItem, playerId: number): void {
    let extraBotCount = this.getItemUseExtraBotUpgradeCount(mazeItem.mazeItemKey);
    if (extraBotCount === 0) {
      return;
    }

    // Get list of player id's (excluding current player).
    const playerIdList = this.game.players.getPlayerIdList().filter(pid => pid !== playerId);

    // Apply item to as many bots as possible based on upgrade level.
    for (let extraBotPlayerId of playerIdList) {
      const extraBotPlayer = this.game.players.getPlayer(extraBotPlayerId);
      //TODO: check if item is applied already!?!?!
      if (extraBotPlayer) {
        mazeItem.triggerPickup(extraBotPlayerId);
        extraBotCount--;
      }
      if (extraBotCount === 0) {
        return;
      }
    }
  }
}

export default MazeItemManager;
