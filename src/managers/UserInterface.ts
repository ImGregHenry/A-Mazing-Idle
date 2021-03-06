import Game from "managers/Game";
import { Tile } from "managers/MazeManager";
import {
  generateTileKey,
  MazeDirectionIndex,
  MazeWallTypes,
} from "managers/MazeUtils";
import { Maze } from "models/Maze";
import { StatsKey, STATS_TO_UI_ID_MAP } from "models/Stats";
declare var $: any;
declare var numberformat: any;

const FINISH_LINE_ICON = "img/finishLine.png";
const MAZE_BORDER_WIDTH = "4px";

export enum ModalType {
  CONTROLS_MODAL = "CONTROLS_MODAL",
  STATS_MODAL = "STATS_MODAL",
  SETTINGS_MODAL = "SETTINGS_MODAL",
  OFFLINE_SCORE_MODAL = "OFFLINE_SCORE_MODAL",
  HELP_MODAL = "HELP_MODAL",
  IMPORT_SAVE_MODAL = "IMPORT_SAVE_MODAL",
}

export class UserInterface {
  private game: Game;
  private disableUi: boolean;

  constructor(game: Game, disableUi: boolean = false) {
    this.game = game;
    this.disableUi = disableUi;
  }

  public init(): void {
    if (this.disableUi) return;
    this.initText();
    this.initEvents();
  }

  private initText(): void {
    this.setPointsText();
  }

  private initEvents(): void {
    $(`#manualSaveGame`).click(() => this.game.save.saveGameToLocalStorage());
    $(`#deleteSaveGame`).click(() => this.game.save.clearLocalStorage());
    $(`#newGame`).click(() => this.game.hardResetGame());
    $(`#clearAllStats`).click(() => this.game.stats.initStatsMap());
    $(`#statsButton`).click((e) => this.showModalByType(ModalType.STATS_MODAL, true, e));
    $(`#helpButton`).click((e) => {
      this.showModalByType(ModalType.SETTINGS_MODAL, false);
      this.showModalByType(ModalType.HELP_MODAL, true, e);
    });
    $(`#importSaveOpenModalButton`).click((e) => {
      $(`#importSaveErrorLabel`).text("")
      this.showModalByType(ModalType.SETTINGS_MODAL, false);
      this.showModalByType(ModalType.IMPORT_SAVE_MODAL, true, e);
    });
    
    
    $(`#openControlsModalButton`).click((e) => {
      this.showModalByType(ModalType.SETTINGS_MODAL, false);
      this.showModalByType(ModalType.CONTROLS_MODAL, true, e)
    });
    $(`#settingsButton`).click((e) => this.showModalByType(ModalType.SETTINGS_MODAL, true, e));
    $(`#copySaveJson`).click(() => this.game.save.copySaveToClipboard());
    $(`#importSaveModalButton`).click(() => {
      const saveJson = $(`#importSaveTextArea`).val();
      const importSuccess = this.game.save.importGameSaveFromString(saveJson);
      if (importSuccess) {
        this.showModalByType(ModalType.IMPORT_SAVE_MODAL, false);
      }
      $(`#importSaveErrorLabel`).text(importSuccess ? "" : "Failed to import save json.")
    });
  }

  public setPointsText(): void {
    $("#points").text(`Points: ${UserInterface.getPrettyPrintNumber(this.game.points.points)}`);
  }

  public printMazeV2(maze: Maze): void {
    // Extends one before/beyond grid to handle an exit cell.
    for (let y = -1; y < maze.grid.sizeY + 1; y++) {
      $("#maze > tbody").append("<tr>");

      for (let x = -1; x < maze.grid.sizeX + 1; x++) {
        let tileKey = generateTileKey(x, y);
        // Place cell element
        $("#maze > tbody").append(`<td id="${tileKey}">&nbsp;</td>`);

        // Draw edges
        this.setTileCssV2(maze, { x: x, y: y });

        // Draw item if present
        this.game.items.drawItem({ x: x, y: y });
      }
      $("#maze > tbody").append("</tr>");
    }

    this.setFinishLineIcon(maze.grid.externalExitTile);
  }

  public setTileCssV2(maze: Maze, tile: Tile): void {
    const cssSelector = generateTileKey(tile.x, tile.y);
    $(`#${cssSelector}`).css("border-top", this.getMazeBorderCss(maze.getCellWallType(tile, MazeDirectionIndex.UP)));
    $(`#${cssSelector}`).css("border-right", this.getMazeBorderCss(maze.getCellWallType(tile, MazeDirectionIndex.RIGHT)));
    $(`#${cssSelector}`).css("border-bottom", this.getMazeBorderCss(maze.getCellWallType(tile, MazeDirectionIndex.DOWN)));
    $(`#${cssSelector}`).css("border-left", this.getMazeBorderCss(maze.getCellWallType(tile, MazeDirectionIndex.LEFT)));
  }

  private getMazeBorderCss(val: MazeWallTypes): string {
    const borderColor = this.game.colors.getMazeWallColor();
    if (val === MazeWallTypes.WALL) {
      return `${MAZE_BORDER_WIDTH} solid ${borderColor}`;
    } else if (val === MazeWallTypes.DESTRUCTIBLE_WALL) {
      return `2px dotted ${borderColor}`;
    } else if (val === MazeWallTypes.OUT_OF_BOUNDS_WALL || val == null) {
      return ``;
    } else {
      return `${MAZE_BORDER_WIDTH} solid transparent`;
    }
  }

  public deleteMaze(): void {
    if (this.disableUi) return;
    $("#maze td").remove();
    $("#maze tr").remove();
  }

  public updateStatsKey(statsKey: StatsKey): void {
    if (!STATS_TO_UI_ID_MAP.has(statsKey)) {
      console.debug("No stats key UI registered for: ", statsKey);
      return;
    }

    const statsValue = this.game.stats.getStat(statsKey);
    const statsUiId = STATS_TO_UI_ID_MAP.get(statsKey);

    if (!$(`#${statsUiId}`)) {
      console.info("No UI component registerd to stats key: ", statsUiId);
      return;
    }
    $(`#${statsUiId}`).text(" " + UserInterface.getPrettyPrintNumber(statsValue));
  }

  public updateAllStatsKey(): void {
    for (let statsKey of STATS_TO_UI_ID_MAP.keys()) {
      this.updateStatsKey(statsKey as StatsKey);
    }
  }

  public static getPrettyPrintNumber(num: number): string {
    if (!num) return "0";
    return numberformat.formatShort(num);
  }

  public static getDecimalPrettyPrintNumber(num: number, decimalLength: number = 0): string {
    return parseFloat(num.toFixed(decimalLength)).toLocaleString();
  }

  public setFinishLineIcon(tile: Tile): void {
    const tileKey = generateTileKey(tile.x, tile.y);
    $(`#${tileKey}`).css("background-image", `url("${FINISH_LINE_ICON}")`);
    $(`#${tileKey}`).css("background-repeat", `no-repeat`);
    $(`#${tileKey}`).css("background-position", `center`);
    $(`#${tileKey}`).css("background-size", "20px");
    $(`#${tileKey}`).css("background-color", "white");
    $(`#${tileKey}`).css("border-bottom", `3px solid ${this.game.colors.getMazeWallColor()}`);
  }

  public static setIdVisible(uid: string, setVisible: boolean = true): void {
    $(`#${uid}`).css("display", setVisible ? "block" : "none");
  }

  public showModalByType(modalType: ModalType, setVisible: boolean = true, clickEvent: any = null): void {
    // Prevent clicks from propagating to the global modal closing click event
    if (clickEvent) clickEvent.stopPropagation();
    
    if (modalType === ModalType.SETTINGS_MODAL) {
      this.showModalVisibleById("settingsModal", setVisible);
    } else if (modalType === ModalType.OFFLINE_SCORE_MODAL) {
      // this.showModalVisibleById("offlineModal", setVisible);
    } else if (modalType === ModalType.STATS_MODAL) {
      this.showModalVisibleById("statsModal", setVisible);
    } else if (modalType === ModalType.HELP_MODAL) {
      this.showModalVisibleById("helpModal", setVisible);
    } else if (modalType === ModalType.IMPORT_SAVE_MODAL) {
      this.showModalVisibleById("importSaveModal", setVisible);
    } else if (modalType === ModalType.CONTROLS_MODAL) {
      this.showModalVisibleById("controlsModal", setVisible);
    } else {
      console.error(`Invalid modal to show: ${modalType}`);
    }
  }

  private showModalVisibleById(modalId: string, setVisible: boolean = true): void {
    UserInterface.setIdVisible(modalId, setVisible);
    if (!setVisible) return;

    // Close dialog when clicked away from
    $(document).click((e) => {
      if ($(e.target).closest(`#${modalId}`).length === 0) {
        UserInterface.setIdVisible(modalId, false);
        $(document).unbind("click");
      }
    });
  }

  public closeAllModals(): void {
    for (const modalType in ModalType) {
      this.showModalByType(modalType as ModalType, false);
    }
  }

  public showSaveModalForDuration(visibilityDuration: number): void {
    UserInterface.setIdVisible('saveToastModal', true);
    
    setTimeout(() => {
      UserInterface.setIdVisible('saveToastModal', false);
    }, visibilityDuration)
  }
}
