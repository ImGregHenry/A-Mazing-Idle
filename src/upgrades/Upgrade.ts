import { IS_FREE_MODE_ENABLED } from '../dev/devUtils';
import Game from '../Game';
import { StatsKey } from '../models/Stats';
import UserInterface from '../UserInterface';
import { UpgradeKey } from '../constants/UpgradeConstants';
declare var $: any;


class Upgrade {
  public game: Game;
  public upgradeKey: UpgradeKey;
  public uiId: string;
  public tooptipText: string;
  public upgradeLevel: number;
  public isSinglePurchase: boolean = false;

  public constructor(game: Game, uiId: string, tooltipText = '', upgradeKey: UpgradeKey, 
      upgradeCount: number = 0, isSinglePurchase: boolean = false) {
    this.game = game;
    this.upgradeKey = upgradeKey;
    this.uiId = uiId;
    this.tooptipText = tooltipText;
    this.upgradeLevel = upgradeCount;
    this.isSinglePurchase = isSinglePurchase;
    
    this.initClickEvent();
  }

  buyUpgrade = () => {
    if (!this.canAffordToBuyUpgrade()) {
      console.error('Cannot afford to buy.');
      return;
    }
    this.game.points.spendPoints(this.getCost());
    this.upgradeLevel++;
    this.updateUiProperties();
    this.updateUiDisabled();
    this.updateVisibility();
  }

  getIsUpgraded(): boolean {
    return this.upgradeLevel >= 1;
  }

  canAffordToBuyUpgrade(): boolean {
    return IS_FREE_MODE_ENABLED || this.getCost() <= this.game.points.points;
  }
  
  setUiText(text: string): void {
    $(`#${this.uiId}`).attr('title', this.tooptipText);
    $(`#${this.uiId}`).text(text);
  }

  updateVisibility(): void {
    $(`#${this.uiId}`).css('display',  (this.isUnlocked() && !this.isMaxUpgradeLevel()) ? 'block' : 'none');
  }

  updateUiDisabled(): void {
    $(`#${this.uiId}`).prop("disabled", this.isDisabled());
  }

  initClickEvent(): void {
    $(`#${this.uiId}`).unbind("click");
    $(`#${this.uiId}`).click(() => this.buyUpgrade());
  }

  isDisabled(): boolean {
    //TODO: refactor out isSinglePurchase
    return (this.isSinglePurchase && this.upgradeLevel >= 1) || this.isMaxUpgradeLevel() || !this.canAffordToBuyUpgrade();
  }
  
  updateUiProperties(): void {
    throw 'updateUiProperties must be implemented.';
  }

  getCost(): number {
    throw 'getCost must be implemented.';
  }

  isUnlocked(): boolean {
    return this.game.biomes.isUpgradeUnlocked(this.upgradeKey);
  }

  prettyPrint(val): string {
    return UserInterface.getPrettyPrintNumberNoDecimals(val);
  }

  getPrettyPrintCost(): string {
    return this.prettyPrint(this.getCost());
  }

  isMaxUpgradeLevel(): boolean {
    return this.isSinglePurchase && this.upgradeLevel >= 1;
  }
}

export default Upgrade;