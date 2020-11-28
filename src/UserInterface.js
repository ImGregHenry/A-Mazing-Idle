class UserInterface {
  constructor(game, disableUi = false) {
    this.game = game;
    this.disableUi = disableUi;
  }

  init() {
    if(this.disableUi) return;
    this.initText()
    this.initEventHooks();
  }

  initText() {
    this.setPointsText();
    this.setRngMovementUpgradeText();
    this.setMazeSizeUpgradeText();
    this.setPointsPerVisitUpgradeText();
    this.setFruitSpawnRateUpgradeText();
    this.setBuyBotAvoidRevisitLastPositionUpgradeText();
    this.setBuyBotPrioritizeUnvisitedUpgradeText();
    this.setBuyAutoExitMazeUpgradeText();
  }

  setDebugPanelVisible(isVisible) {
    $('#debug').css('display', isVisible ? 'block' : 'none');
  }

  setPointsText() {
    $('#points').text(`Points: ${this.game.points.points.toFixed(2)}`);
  }

  setRngMovementUpgradeText() {
    const cost = this.game.points.getRngMovementUpgradeCost();
    $('#buyBotMoveFaster').text(`Bot Moves Faster: ${cost.toFixed(2)} pts`);
  }

  setMazeSizeUpgradeText() {
    const cost = this.game.points.getMazeSizeUpgradeCost();
    $('#buyMazeSize').text(`Increase Maze Size: ${cost.toLocaleString()} pts`);
  }

  setPointsPerVisitUpgradeText() {
    const cost = this.game.points.getPointsPerVisitUpgradeCost();
    $("#buyPointsPerVisit").text(`Points Per Visit: ${cost.toLocaleString(2)} pts`);
  }

  setFruitSpawnRateUpgradeText() {
    const cost = this.game.points.getFruitSpawnRateUpgradeCost();
    $("#buyFruitSpawnRateUpgrade").text(`Fruit Spawn Rate: ${cost.toLocaleString(2)} pts`);
  }

  setBuyBotAvoidRevisitLastPositionUpgradeText() {
    $('#buyBotAvoidRevisitLastPosition').text(`Basic Avoid Revisit: ${BOT_AVOID_REVISIT_LAST_POSITION_UPGRADE_COST} pts`);
    $("#buyBotAvoidRevisitLastPosition").prop("disabled", this.game.points.rngBotAvoidRevisitLastPosition);
  }

  setBuyBotPrioritizeUnvisitedUpgradeText() {
    $('#buyBotPrioritizeUnvisited').text(`Prioritize Unvisited: ${BOT_PRIORITIZE_UNVISITED_UPGRADE_COST} pts`)
    $("#buyBotPrioritizeUnvisited").prop("disabled", this.game.points.rngBotPrioritizeUnvisited);
  }

  setBuyAutoExitMazeUpgradeText() {
    $('#buyBotAutoExitMaze').text(`Auto Exit Maze: ${BOT_AUTO_EXIT_MAZE_UPGRADE_COST} pts`)
    $("#buyBotAutoExitMaze").prop("disabled", this.game.points.rngBotAutoExitMaze);
  } 
  

  initEventHooks() {
    $('#buyBotMoveFaster').click(() => {
      this.game.points.buyRngMovementUpgrade();
      this.setRngMovementUpgradeText();
    });
    $('#buyMazeSize').click(() => {
      this.game.points.buyMazeSizeUpgrade();
      this.setMazeSizeUpgradeText();
    });
    $('#buyPointsPerVisit').click(() => {
      this.game.points.buyPointsPerVisitUpgrade();
      this.setPointsPerVisitUpgradeText();
    });
    $('#buyFruitSpawnRateUpgrade').click(() => {
      this.game.points.buyFruitSpawnRateUpgrade();
      this.setFruitSpawnRateUpgradeText();
    });
    $('#buyBotAvoidRevisitLastPosition').click(() => {
      this.game.points.buyBotAvoidRevisitLastPosition();
      this.setBuyBotAvoidRevisitLastPositionUpgradeText();
    });
    $('#buyBotPrioritizeUnvisited').click(() => {
      this.game.points.buyBotPrioritizeUnvisitedUpgrade();
      this.setBuyBotPrioritizeUnvisitedUpgradeText();
    });
    $('#buyBotAutoExitMaze').click(() => {
      this.game.points.buyBotAutoExitMazeUpgrade();
      this.setBuyAutoExitMazeUpgradeText();
    });
  }

  printMaze(maze, fruitSet) {
    if(this.disableUi) return;
    for (let y = 0; y < maze.length; y++) {
      $('#maze > tbody').append("<tr>");
      for (let x = 0; x < maze[y].length; x++) {
        let selector = generateTileKey(x, y);
        // Place cell element
        $('#maze > tbody').append(`<td id='${selector}'>&nbsp;</td>`);

        // Draw edges
        if (maze[y][x][0] == WALL) $(`#${selector}`).css('border-top', '2px solid black');
        if (maze[y][x][1] == WALL) $(`#${selector}`).css('border-right', '2px solid black');
        if (maze[y][x][2] == WALL) $(`#${selector}`).css('border-bottom', '2px solid black');
        if (maze[y][x][3] == WALL) $(`#${selector}`).css('border-left', '2px solid black');
        
        // Draw fruit in tile.
        if (fruitSet.has(selector)) {
          this.drawBanana(selector);
        }
      }
      
      $('#maze > tbody').append("</tr>");
    }
  }

  drawBanana(tileSelector) {
    $(`#${tileSelector}`).css('background-image', 'url("img/banana.png")');
    $(`#${tileSelector}`).css('background-size', '20px');
  }

  removeBanana(tileSelector) {
    $(`#${tileSelector}`).css('background-size', '');
  }
  
  deleteMaze() {
    if(this.disableUi) return;
    $("#maze td").remove();
    $("#maze tr").remove();
  }
}