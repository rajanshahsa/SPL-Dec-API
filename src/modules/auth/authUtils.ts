import * as mysql from "jm-ez-mysql";
import { Tables, PlayersTable, UserTable, TEAMTable } from "../../config/tables";
import { Log } from "../../helpers/logger";
import { ResponseBuilder } from "../../helpers/responseBuilder";

export class AuthUtils {
  // Create User
  private logger = Log.getLogger();

  // Get Players
  public async getPlayers() {
    const players = await mysql.findAll(
      Tables.PLAYERS,
      [
        PlayersTable.ID,
        PlayersTable.NAME,
        PlayersTable.BASEPRICE,
        PlayersTable.CURRENTPRICE,
        PlayersTable.BATTINGSTYLE,
        PlayersTable.BOWLINGSTYLE,
        PlayersTable.ISSOLD,
        PlayersTable.WANTTOBECAPTAIN,
        PlayersTable.SKILLS,
        PlayersTable.BATTINGRATING,
        PlayersTable.BOWLINGRATING,
        PlayersTable.SOLDTO,
      ],
      ` ${PlayersTable.SPORTS} like "%Cricket%"`
    );
    return ResponseBuilder.data({ data: players });
  }

  // Get Player
  public async getPlayer(id) {
    const player = await mysql.first(
      Tables.PLAYERS,
      [
        PlayersTable.ID,
        PlayersTable.NAME,
        PlayersTable.BASEPRICE,
        PlayersTable.CURRENTPRICE,
        PlayersTable.BATTINGSTYLE,
        PlayersTable.BOWLINGSTYLE,
        PlayersTable.ISSOLD,
        PlayersTable.WANTTOBECAPTAIN,
        PlayersTable.SKILLS,
        PlayersTable.BATTINGRATING,
        PlayersTable.BOWLINGRATING,
        PlayersTable.SOLDTO,
      ],
      `${PlayersTable.ID} = ? and ${PlayersTable.SPORTS} like %Cricket%`,
      [id]
    );
    return ResponseBuilder.data({ data: player });
  }
  // Get Player
  public async signIn(id, password) {
    const player = await mysql.first(
      `${Tables.USER} u left join ${Tables.TEAM} t on t.${TEAMTable.ID} = u.${UserTable.TEAMID}`,
      [
        `u.${UserTable.ID}`,
        `u.${UserTable.EMAIL}`,
        `u.${UserTable.PASSWORD}`,
        `u.${UserTable.USERTYPE}`,
        `u.${UserTable.TEAMID}`,
        `u.${UserTable.TEAMID}`,
        `t.${TEAMTable.NAME}`,
      ],
      `u.${UserTable.EMAIL} = ? and u.${UserTable.PASSWORD} =?`,
      [id, password]
    );
    return ResponseBuilder.data({ data: player });
  }

  // Get Player
  public async updatePlayer(id, playerData) {
    const updateData = await mysql.updateFirst(
      Tables.PLAYERS,
      playerData,
      `${PlayersTable.ID}=${id}`
    );
    return ResponseBuilder.data({ id: updateData.affectedRows });
  }

  public addPlayer = async (item) => {
    return await mysql.insert(Tables.PLAYERS, item);
  };

  public deleteAllPlayer = async () => {
    await mysql.delete(Tables.PLAYERS);
    return await mysql.query("ALTER TABLE `SPL-Dec`.players AUTO_INCREMENT=1");
  };
}
