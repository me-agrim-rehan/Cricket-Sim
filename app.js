import { TeamA, TeamB } from "./models/team.js";
import { simulateInnings } from "./engine/matchEngine.js";
import { tossAndDecision } from "./engine/toss.js";
import { playMatch } from "./engine/match.js";

playMatch(TeamA, TeamB);    