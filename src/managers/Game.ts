import { printMazeCompleteData } from "dev/devUtils";
import { MazeManager } from "managers/MazeManager";
import { Points } from "managers/PointsManager";
import { RNGBotManager } from "managers/RNGBotManager";
import { UserInterface } from "managers/UserInterface";
import { UpgradeManager } from "managers/UpgradeManager";
import { Serializable } from "models/Serializable";
import { SaveManager } from "managers/SaveManager";
import { PlayerManager } from "managers/PlayerManager";
import { MazeItemManager } from "managers/MazeItemManager";
import { StatsManager } from "managers/StatsManager";
import { BiomeManager } from "managers/BiomeManager";
import { ColorManager } from "managers/ColorManager";
import { OfflineManager } from "managers/OfflineManager";
import { PowerUpManager } from "managers/PowerUpManager";
import { StatsKey } from "models/Stats";


const SERIALIZABLE_PROPERTIES: string[] = ['points', 'upgrades', 'stats', 'offline'];

class Game extends Serializable {
  public maze: MazeManager;
  public points: Points;
  public rngBot: RNGBotManager;
  public players: PlayerManager;
  public ui: UserInterface;
  public upgrades: UpgradeManager;
  public save: SaveManager;
  public items: MazeItemManager;
  public stats: StatsManager;
  public biomes: BiomeManager;
  public colors: ColorManager;
  public powerUps: PowerUpManager;
  public offline: OfflineManager;

  private isDevMode: boolean;
  private isDisableUi: boolean;
  
  constructor(isDisableUi = false, isDevMode = false) {
    super(SERIALIZABLE_PROPERTIES);
    this.isDevMode = isDevMode;
    this.isDisableUi = isDisableUi;
    this.maze = new MazeManager(this);
    this.points = new Points(this, this.isDevMode);
    this.rngBot = new RNGBotManager(this, this.isDevMode);
    this.biomes = new BiomeManager(this);
    this.ui = new UserInterface(this, this.isDisableUi);
    this.upgrades = new UpgradeManager(this);
    this.players = new PlayerManager(this);
    this.save = new SaveManager(this);
    this.items = new MazeItemManager(this);
    this.stats = new StatsManager(this);
    this.colors = new ColorManager(this);
    this.powerUps = new PowerUpManager(this);
    this.offline = new OfflineManager(this);
    
    this.upgrades.initUpgrades();
    this.upgrades.updateAllUpgradeUi();
    this.ui.init();
    this.stats.initStatsMap();
  }

  public hardResetGame(): void {
    this.save.clearLocalStorage();
    this.resetGame();
    this.maze = new MazeManager(this);
    this.points.points = 0;
    this.upgrades.initUpgrades();
    this.stats.initStatsMap();
    
    this.startGame();
    this.save.enableSaveTimer();
  }

  public reloadFromLocalStorage(): void {
    this.save.loadGameSaveFromLocalStorage();
    this.resetGame();
    
    this.startGame();
    this.save.enableSaveTimer();
    this.upgrades.hideAllUpgradeNewTextForUnlockedUpgrades();
  }

  public startGame(): void {
    this.ui.updateAllStatsKey();
    this.upgrades.updateAllUpgradeUi();
    this.powerUps.updateAllPowerUpsUi();
    this.players.resetAllPlayers();
    this.ui.deleteMaze();
    this.maze.newMaze();
    
    this.ui.printMazeV2(this.maze.maze);
    
    this.players.createDefaultPlayer();
    this.rngBot.enableGlobalRngBot();
  }
  
  public completeMaze(playerId: number): void {
    this.rngBot.disableGlobalMovement();
    this.players.resetAllPlayers();
    this.points.addMazeCompletionBonus(playerId);

    this.stats.addStatsToKey(1, StatsKey.TOTAL_MAZES_COMPLETED);
    this.stats.clearCurrentMazeStats();

    if (this.isDevMode) {
      printMazeCompleteData(this);
      return;
    }
    this.startGame();
  }
  
  public resetGame(): void {
    this.rngBot.disableGlobalMovement();
    this.rngBot.disableReEnableBotMovementTimer();
    this.players.resetAllPlayers();
  }
}

export default Game;
