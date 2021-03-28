import Game from "managers/Game";
import { PowerUpKey, POWER_UP_TO_UI_KEY_MAP } from "constants/PowerUpConstants";
import { UserInterface } from "managers/UserInterface";

const UI_UPDATE_INTERVAL = 100;

export class PowerUp {
  protected game: Game;
  private powerUpKey: PowerUpKey;
  private _isPowerUpActive: boolean;
  private _isPowerUpOnCoolDown: boolean;
  private activateTimer: any; 
  private activateDurationCounterMs: number;
  private cooldownTimer: any;
  private cooldownDurationCounterMs: number;
  private uiUpdateTimer: any;

  constructor(game: Game, powerUpKey: PowerUpKey) {
    this.game = game;
    this.powerUpKey = powerUpKey;
    this.resetAllTimers();
    this.initClick();
  }

  protected getCooldownTimerDuration(): number {
    throw `No duration set for powerup ${this.powerUpKey}`;
  }

  protected getActivateDuration(): number {
    throw `No duration set for powerup ${this.powerUpKey}`;
  }
  
  protected getUiStringName(): string {
    throw `No power up string name for powerup ${this.powerUpKey}`;
  }

  public isPowerUpActiveOnPlayerId(playerId: number): boolean {
    return this.isPowerUpActive();
    // return this.activePlayerIdSet.has(playerId);
  }

  public getUiStatusString(): string {
    if (this._isPowerUpActive) {
      return `ACTIVE: ${this.formatDisplayString(this.getActivateTimeLeft())}`;
    } else if (this._isPowerUpOnCoolDown) {
      return `COOLDOWN: ${this.formatDisplayString(this.getCooldownTimeLeft())}`
    } else {
      return `READY`;
    }
  }

  public isPowerUpActive(): boolean {
    return this._isPowerUpActive;
  }

  private getUiHtml(): string {
    return `<div>${this.getUiStringName()}<br>${this.getUiStatusString()}</div>`;
  }

  private formatDisplayString(duration: number): string {
    return UserInterface.getPrettyPrintNumber(duration/1000, 1);
  }

  private getCooldownTimeLeft(): number {
    return this.getCooldownTimerDuration() - this.cooldownDurationCounterMs;
  }
  
  private getActivateTimeLeft(): number {
    return this.getActivateDuration() - this.activateDurationCounterMs;
  }

  private resetAllTimers(updateUiAfter: boolean = false): void {
    this.resetActivateTimer();
    this.resetCooldownTimer();
    this.resetUiTimer(updateUiAfter);  
  }

  private resetUiTimer(updateUiAfter: boolean = false): void {
    clearInterval(this.uiUpdateTimer);
    this.uiUpdateTimer = null;
    if (updateUiAfter) {
      this.updateUi();
    }
  }
  
  private resetActivateTimer(): void {
    clearTimeout(this.activateTimer);
    this.activateTimer = null;
    this.activateDurationCounterMs = 0;
    this._isPowerUpActive = false;
  }

  private resetCooldownTimer(): void {
    clearTimeout(this.cooldownTimer);
    this.cooldownTimer = null;
    this.cooldownDurationCounterMs = 0;
    this._isPowerUpOnCoolDown = false;
  }
  
  public activatePowerUpTimer(): void {
    if (this.activateTimer) {
      return;
    }
    this.resetAllTimers();
    this._isPowerUpActive = true;
    this.activateUiTimer();
    
    this.activateTimer = setTimeout(() => {
      this._isPowerUpActive = false;
      this.activateCooldownTimer();
    }, this.getActivateDuration());
  }

  private activateCooldownTimer(): void {
    if (this.cooldownTimer) {
      return;
    }
    this.resetAllTimers();
    this._isPowerUpOnCoolDown = true;
    this.activateUiTimer();
    
    this.cooldownTimer = setTimeout(() => {
      this._isPowerUpOnCoolDown = false;
      this.resetAllTimers();
      this.updateUi();
    }, this.getCooldownTimerDuration());
  }

  private activateUiTimer(): void {
    if (this.uiUpdateTimer) {
      return;
    }
    this.updateUi();

    this.uiUpdateTimer = setInterval(() => {
      if (this._isPowerUpOnCoolDown) {
        this.cooldownDurationCounterMs += UI_UPDATE_INTERVAL;
      } else if (this._isPowerUpActive) {
        this.activateDurationCounterMs += UI_UPDATE_INTERVAL;
      } else {
        console.log("NOTHING ACTIVE --> UI UPDATE");
      }
      this.updateUi();
    }, UI_UPDATE_INTERVAL);
  }

  private isButtonDisabled(): boolean {
    return this._isPowerUpActive || this._isPowerUpOnCoolDown;
  }

  private isButtonVisible(): boolean {
    return this.game.powerUps.isPowerUpUnlocked(this.powerUpKey);
  }

  private getUiElement(): any {
    return $(`#${this.getUiKey()}`);
  }

  private getUiKey(): string {
    return POWER_UP_TO_UI_KEY_MAP.get(this.powerUpKey);
  }

  public updateUi(): void {
    // this.getUiElement().text(this.getUiStatusString());
    this.getUiElement().html(this.getUiHtml());
    this.getUiElement().prop('disabled', this.isButtonDisabled());
    this.getUiElement().css('display', this.isButtonVisible() ? 'block' : 'none')
  }

  private initClick(): void {
    this.getUiElement().unbind("click");
    this.getUiElement().click(() => this.activatePowerUpTimer());
  }
}