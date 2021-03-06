import Game from "managers/Game";
import Upgrade from "upgrades/Upgrade";
import { BRAIN_TILE_DISTANCE_UPGRADE_BASE_COST, BRAIN_TILE_DISTANCE_UPGRADE_BASE_COST_MULTIPLIER, UpgradeKey, UpgradeType } from "constants/UpgradeConstants";
import BrainMazeItem from "items/definitions/BrainMazeItem";

const BUTTON_UI_ID = 'buyBrainTileDistanceUpgrade';
const TOOLTIP_TEXT = 'Bots with an active brain item will auto path X more tiles.';

export class BrainTileDistanceUpgrade extends Upgrade {
  
  constructor(game: Game, upgradeKey: UpgradeKey, upgradeLevel: number = 0) {
    super(game, UpgradeType.ITEM, BUTTON_UI_ID, TOOLTIP_TEXT, upgradeKey, upgradeLevel);
  }
  
  updateUiProperties(): void {
    const tileDistance = BrainMazeItem.getBrainTileDistanceAmount(this.game);
    this.setUiText(`Brain Tile Distance (${tileDistance} tiles): ${this.getPrettyPrintCost()} pts`);
  }

  getCost(): number {
    return BRAIN_TILE_DISTANCE_UPGRADE_BASE_COST * Math.pow(BRAIN_TILE_DISTANCE_UPGRADE_BASE_COST_MULTIPLIER, this.upgradeLevel);
  }
}
