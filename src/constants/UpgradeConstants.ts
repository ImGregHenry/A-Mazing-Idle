
export enum UpgradeKey {
  // Bot
  AUTO_MOVE = 'AUTO_MOVE',
  PRIORITIZE_UNVISITED = 'PRIORITIZE_UNVISITED',
  AVOID_REVISIT_LAST_POSITION = 'AVOID_REVISIT_LAST_POSITION',
  AUTO_EXIT_MAZE = 'AUTO_EXIT_MAZE',
  PLAYER_MOVE_INDEPENDENTLY = 'ALLOW_PLAYER_TO_MOVE_INDEPENDENTLY',
  TELEPORT_BOT_BACK_TO_PLAYER = 'TELEPORT_BOT_BACK_TO_PLAYER',
  TELEPORT_PLAYER_BACK_TO_BOT = 'TELEPORT_PLAYER_BACK_TO_BOT',
  BOT_SPLIT_DIRECTION = 'BOT_SPLIT_DIRECTION',
  BOT_SPLIT_BOT_AUTO_MERGE = 'BOT_SPLIT_BOT_AUTO_MERGE',
  BOT_MOVEMENT_SPEED = 'BOT_MOVEMENT_SPEED',
  BOT_REMEMBER_DEADEND_TILES = 'BOT_REMEMBER_DEADEND_TILES',
  // Maze
  MAZE_SIZE_UPGRADE = 'MAZE_SIZE_UPGRADE',
  POINTS_PER_VISIT = 'POINTS_PER_VISIT',
  POINTS_PER_REVISIT = 'POINTS_PER_REVISIT',
  MAZE_COMPLETION_BONUS = 'MAZE_COMPLETION_BONUS',
  TILE_REVISIT_MULTIPLIER = 'TILE_REVISIT_MULTIPLIER',
  // Items
  FRUIT_SPAWN = 'FRUIT_SPAWN',
  BRAIN_SPAWN = 'BRAIN_SPAWN',
  BRAIN_TILE_DISTANCE = 'BRAIN_TILE_DISTANCE',
  FRUIT_PICKUP_POINTS = 'FRUIT_PICKUP_POINTS',
  MULTIPLIER_ITEM_SPAWN_RATE = 'MULTIPLIER_ITEM_SPAWN_RATE',
  MULTIPLIER_ITEM_STRENGTH = 'MULTIPLIER_ITEM_STRENGTH',
  // "Feature" Upgrades
  DESTRUCTIBLE_WALLS = 'DESTRUCTIBLE WALLS',
  // Biomes
  BIOME = 'BIOME'
}

export const BOT_AUTO_MOVE_UPGRADE_COST = 100;

export const PRIORITIZE_UNVISITED_UPGRADE_COST = 300;
export const AVOID_REVISIT_LAST_POSITION_UPGRADE_COST = 500;
export const ALLOW_PLAYER_TO_MOVE_INDEPENDENTLY_UPGRADE_COST = 1500;

export const AUTO_EXIT_MAZE_UPGRADE_BASE_COST = 250;
export const AUTO_EXIT_MAZE_UPGRADE_BASE_COST_MULTIPLIER = 2;

export const TELEPORT_PLAYER_BACK_TO_BOT_UPGRADE_COST = 1000;
export const TELEPORT_BOT_BACK_TO_PLAYER_UPGRADE_COST = 1000;

export const SPLIT_DIRECTION_UPGRADE_BASE_COST = 1000;
export const SPLIT_DIRECTION_UPGRADE_BASE_MULTIPLIER = 5;

export const SPLIT_BOT_AUTO_MERGE_UPGRADE_COST = 50000;

export const MAZE_COMPLETION_BONUS_BASE_MULTIPLIER = 0.4;
export const MAZE_COMPLETION_BONUS_UPGRADE_SIZE_MULTIPLIER = 1.1;
export const MAZE_COMPLETION_BONUS_UPGRADE_BASE_COST = 100;
export const MAZE_COMPLETION_BONUS_UPGRADE_BASE_COST_MULTIPLIER = 1.2;

export const BOT_MOVEMENT_UPGRADE_BASE_COST = 10;
export const BOT_MOVEMENT_UPGRADE_BASE_COST_MUTLIPLIER = 1.1;

export const BOT_REMEMBER_DEADEND_TILES_UPGRADE_BASE_COST = 1000;
export const BOT_REMEMBER_DEADEND_TILES_UPGRADE_BASE_COST_MULTIPLIER = 3;

export const MAZE_SIZE_UPGRADE_BASE_COST = 300;
export const MAZE_SIZE_UPGRADE_BASE_COST_MULTIPLIER = 1.8;

export const POINTS_PER_VISIT_UPGRADE_BASE_COST = 10;
export const POINTS_PER_VISIT_UPGRADE_BASE_COST_MULTIPLIER = 1.3;
export const POINTS_PER_VISIT_BASE_AMOUNT_MULTIPLIER = 1.06;

export const POINTS_PER_REVISIT_UPGRADE_BASE_COST = 1000;
export const POINTS_PER_REVISIT_UPGRADE_BASE_COST_MULTIPLIER = 1.12;
export const TILE_REVISIT_BASE_MULTIPLIER = 0;
export const TILE_REVISIT_BASE_MULTIPLIER_INCREASE_PERCENT = 0.01;

export const FRUIT_SPAWN_UPGRADE_BASE_COST = 100;
export const FRUIT_SPAWN_UPGRADE_BASE_COST_MULTIPLIER = 1.3;
export const FRUIT_PICKUP_POINTS_UPGRADE_BASE_COST = 100;
export const FRUIT_PICKUP_POINTS_UPGRADE_BASE_COST_MULTIPLIER = 1.3;

export const BRAIN_SPAWN_RATE_UPGRADE_BASE_COST = 100;
export const BRAIN_SPAWN_RATE_UPGRADE_BASE_COST_MULTIPLIER = 2;

export const BRAIN_TILE_DISTANCE_UPGRADE_BASE_COST = 10000;
export const BRAIN_TILE_DISTANCE_UPGRADE_BASE_COST_MULTIPLIER = 1.5;
export const BRAIN_TILE_DISTANCE_UPGRADE_INCREASE_AMOUNT = 5;

export const MULTIPLIER_ITEM_STRENGTH_BASE_COST = 10000;
export const MULTIPLIER_ITEM_STRENGTH_BASE_COST_MULTIPLIER = 1.5;

export const MULTIPLIER_ITEM_SPAWN_RATE_BASE_COST = 10000;
export const MULTIPLIER_ITEM_SPAWN_RATE_COST_MULTIPLIER = 1.5;

export const POINTS_PER_VISIT_BASE_AMOUNT_BIOME_0 = 1;
export const POINTS_PER_VISIT_BASE_AMOUNT_BIOME_1 = 1.5;
export const POINTS_PER_VISIT_BASE_AMOUNT_BIOME_2 = 2;
export const POINTS_PER_VISIT_BASE_AMOUNT_BIOME_3 = 2.5;
export const POINTS_PER_VISIT_BASE_AMOUNT_BIOME_4 = 3;
export const POINTS_PER_VISIT_BASE_AMOUNT_BIOME_5 = 3.5;
export const POINTS_PER_VISIT_BASE_AMOUNT_BIOME_6 = 4;
export const POINTS_PER_VISIT_BASE_AMOUNT_BIOME_7 = 4.5;

export const BIOME_0_UPGRADE_COST = 100;
export const BIOME_1_UPGRADE_COST = 400;
export const BIOME_2_UPGRADE_COST = 1000;
export const BIOME_3_UPGRADE_COST = 2000;
export const BIOME_4_UPGRADE_COST = 4000;
export const BIOME_5_UPGRADE_COST = 10000;
export const BIOME_6_UPGRADE_COST = 15000;

export const BIOME_UPGRADE_SCALING_START_LEVEL = 7;
export const BIOME_UPGRADE_BASE_COST = 25000;
export const BIOME_UPGRADE_BASE_MULTPLIER = 1.2;
