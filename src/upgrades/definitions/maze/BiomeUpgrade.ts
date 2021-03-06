import Game from "managers/Game";
import Upgrade from "upgrades/Upgrade";
import { UpgradeKey, UpgradeType } from "constants/UpgradeConstants";
import { getBiomeUpgradeCost } from "constants/BiomeConstants";

const BUTTON_UI_ID = 'buyBiomeUpgrade';
const TOOLTIP_TEXT = 'This will bring you to a new biome with more difficult mazes, but with better items and increased point rewards!';

export class BiomeUpgrade extends Upgrade {
  
  constructor(game: Game, upgradeKey: UpgradeKey, upgradeLevel: number = 0) {
    super(game, UpgradeType.OTHER, BUTTON_UI_ID, TOOLTIP_TEXT, upgradeKey, upgradeLevel);
  }
  
  public updateUiProperties(): void {
    this.setUiText(`Unlock New Biome (${this.upgradeLevel}): ${this.getPrettyPrintCost()} pts`);
  }

  public getCost(): number {
    const nextBiomeKey = this.game.biomes.getCurrentBiomeKey();
    return getBiomeUpgradeCost(nextBiomeKey);
  }
}
