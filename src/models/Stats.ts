
export enum StatsKey {
  // Points Stats
  TOTAL_POINTS_EARNED = "TOTAL_POINTS_EARNED",
  TOTAL_POINTS_SPENT = "TOTAL_POINTS_SPENT",
  TOTAL_POINTS_EARNED_FROM_VISITED_TILES = "TOTAL_POINTS_EARNED_FROM_VISITED_TILES",
  TOTAL_POINTS_EARNED_FROM_REVISITED_TILES = "TOTAL_POINTS_EARNED_FROM_REVISITED_TILES",
  TOTAL_POINTS_EARNED_FROM_MAZE_COMPLETIONS = "TOTAL_POINTS_EARNED_FROM_MAZE_COMPLETIONS",
  TOTAL_POINTS_EARNED_FROM_FRUITS = "TOTAL_POINTS_EARNED_FROM_FRUITS",
  TOTAL_POINTS_EARNED_FROM_MULTIPLIER_ITEM = "TOTAL_POINTS_EARNED_FROM_MULTIPLIER_ITEM",

  // Tile stats
  TOTAL_TILES_VISITED = "TOTAL_TILES_VISITED",
  TOTAL_TILES_REVISITED = "TOTAL_TILES_REVISITED",
  TOTAL_MAZES_COMPLETED = "TOTAL_MAZES_COMPLETED",
  
  // Item Stats
  TOTAL_FRUIT_ITEMS_PICKED_UP = "TOTAL_FRUIT_ITEMS_PICKED_UP",
  TOTAL_BRAIN_ITEMS_PICKED_UP = "TOTAL_BRAIN_ITEMS_PICKED_UP",
  TOTAL_BLACK_HOLE_ITEMS_PICKED_UP = "TOTAL_BLACK_HOLE_ITEMS_PICKED_UP",
  TOTAL_MULTIPLIER_ITEMS_PICKED_UP = "TOTAL_MULTIPLIER_ITEMS_PICKED_UP",
  
  // Bot Stats
  TOTAL_NUMBER_OF_BOT_SPLITS = "TOTAL_NUMBER_OF_BOT_SPLITS",
  TOTAL_NUMBER_OF_BOT_MERGES = "TOTAL_NUMBER_OF_BOT_MERGES",
  TOTAL_DEAD_ENDS_MARKED = "TOTAL_NUMBER_DEAD_ENDS_MARKED",
  
  // Current Maze Stats
  CURRENT_MAZE_POINTS_EARNED = "CURRENT_MAZE_POINTS_EARNED",
  CURRENT_MAZE_UNIQUE_TILES_VISITED = "CURRENT_MAZE_UNIQUE_TILES_VISITED",
  CURRENT_MAZE_TILES_REVISITED = "CURRENT_MAZE_TOTAL_TILES_REVISITED",

  //TODO: eventually do these probably
  // TOTAL_MANUAL_TILES_VISITED = "TOTAL_MANUAL_TILES_VISITED",
  // TOTAL_DESTRUCTIBLE_WALLS_DESTROYED = "TOTAL_DESTRUCTIBLE_WALLS_DESTROYED",
  // TOTAL_BRAIN_ITEM_TILE_DISTANCE = "TOTAL_BRAIN_ITEM_TILE_DISTANCE",
  // DEAD_ENDS_AVOIDED
}

export const STATS_TO_UI_ID_MAP: Map<StatsKey, string> = new Map([
  // Points Stats
  [StatsKey.TOTAL_POINTS_EARNED, 'statsTotalPointsEarned'],
  [StatsKey.TOTAL_POINTS_SPENT, 'statsTotalPointsSpent'],
  [StatsKey.TOTAL_POINTS_EARNED_FROM_VISITED_TILES, 'statsTotalPointsEarnedFromVisitedTiles'],
  [StatsKey.TOTAL_POINTS_EARNED_FROM_REVISITED_TILES, 'statsTotalPointsEarnedFromRevisitedTiles'],
  [StatsKey.TOTAL_POINTS_EARNED_FROM_MAZE_COMPLETIONS, 'statsTotalPointsEarnedFromMazeCompletions'],
  [StatsKey.TOTAL_POINTS_EARNED_FROM_FRUITS, 'statsTotalPointsEarnedFromFruits'],
  [StatsKey.TOTAL_POINTS_EARNED_FROM_MULTIPLIER_ITEM, 'statsTotalPointsEarnedFromMultiplierItem'],
  
  // Current Stats
  // [StatsKey.CURRENT_MAZE_POINTS_EARNED, 'statsCurrentMazePointsEarned'],
  // [StatsKey.CURRENT_MAZE_UNIQUE_TILES_VISITED, 'statsCurrentMazeUniqueTilesVisited'],
  // [StatsKey.CURRENT_MAZE_TILES_REVISITED, 'statsCurrentMazePointsEarned'],

  // Bot Stats
  [StatsKey.TOTAL_NUMBER_OF_BOT_SPLITS, 'statsTotalNumberOfBotSplits'],
  [StatsKey.TOTAL_NUMBER_OF_BOT_MERGES, 'statsTotalNumberOfBotMerges'],
  [StatsKey.TOTAL_DEAD_ENDS_MARKED, 'statsTotalDeadEndsMarked'],
  
  // Tile Stats
  [StatsKey.TOTAL_TILES_VISITED, 'statsTotalTilesVisited'],
  [StatsKey.TOTAL_TILES_REVISITED, 'statsTotalTilesRevisited'],
  [StatsKey.TOTAL_MAZES_COMPLETED, 'statsTotalMazesCompleted'],
  
  // Item Stats
  [StatsKey.TOTAL_FRUIT_ITEMS_PICKED_UP, 'statsTotalFruitItemsPickedUp'],
  [StatsKey.TOTAL_BRAIN_ITEMS_PICKED_UP, 'statsTotalBrainItemsPickedUp'],
  [StatsKey.TOTAL_BLACK_HOLE_ITEMS_PICKED_UP, 'statsTotalBlackHoleItemsPickedUp'],
  [StatsKey.TOTAL_MULTIPLIER_ITEMS_PICKED_UP, 'statsTotalMultiplierItemsPickedUp']
]);

export const CURRENT_MAZE_STATS: Set<StatsKey> = new Set(
  [
    StatsKey.CURRENT_MAZE_POINTS_EARNED,
    StatsKey.CURRENT_MAZE_TILES_REVISITED,
    StatsKey.CURRENT_MAZE_UNIQUE_TILES_VISITED
  ]
);
