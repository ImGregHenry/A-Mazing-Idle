import Game from "managers/Game";
import Upgrade from "upgrades/Upgrade";
import { ALLOW_PLAYER_TO_MOVE_INDEPENDENTLY_UPGRADE_COST, UpgradeKey, UpgradeType } from "constants/UpgradeConstants";

const BUTTON_UI_ID = 'buyPlayerMoveIndependently';
const TOOLTIP_TEXT = 'Players can have one bot moving at the same time as they manually move.';

export class PlayerMoveIndependentlyUpgrade extends Upgrade {
  
  constructor(game: Game, upgradeKey: UpgradeKey, upgradeLevel: number = 0) {
    super(game, UpgradeType.MOVEMENT, BUTTON_UI_ID, TOOLTIP_TEXT, upgradeKey, upgradeLevel, true);
  }
  
  public updateUiProperties(): void {
    this.setUiText(`Player Can Move Independently: ${this.getPrettyPrintCost()} pts`);
  }

  public getCost(): number {
    return ALLOW_PLAYER_TO_MOVE_INDEPENDENTLY_UPGRADE_COST;
  }
}
