import PlayerProps from "./interface/IPlayerProps";
import { store, actions } from "../redux/store";

let counterID = -1;

export class GameManager {
  constructor() {}

  public static newMatch() {
    const { player } = GameManager.drawAPlayer();

    const payload = {
      actualPlayer: player,
      inGame: true,
    };

    store.dispatch(actions.updateGame(payload));
  }

  public static finishTurn(winnerIds: string[]) {
    const { game } = store.getState();

    winnerIds.forEach((id) => {
      if (id === game.actualPlayer.id)
        throw new Error("it is not possible to add points to actual player");

      const index = game.players.findIndex((p: PlayerProps) => p.id === id)!;
      (game.players as PlayerProps[])[index].points += game.turnPoints;
    });

    if (winnerIds.length > 0) {
      (game.players as PlayerProps[]).find(
        (p) => p.id === game.actualPlayer.id
      )!.points += 15;
    }
  }

  public static newTurn() {
    const { game } = store.getState();

    if (!game.inGame) {
      GameManager.newMatch();
    } else if (game.turn === 0) {
      GameManager.drawAWord();
      store.dispatch(actions.updateGame({ inTurn: true, turn: game.turn + 1 }));
    } else {


      GameManager.drawAWord();

      const payload = {
        inTurn: true,
        turn: game.turn + 1,
      };

      store.dispatch(actions.updateGame(payload));
    }
  }

  public static startChronometer = () => {
    const { game } = store.getState();

    store.dispatch(actions.resetTimer(game.maxTime));

    counterID = setInterval(() => {
      const timer = store.getState().timer;

      if (timer <= 0) {
        //game over

        clearInterval(counterID);
        store.dispatch(actions.setTimeOver(true));
      } else {
        store.dispatch(actions.countdown());
      }
    }, 1000);
  };

  public static stopChronometer() {
    clearInterval(counterID);

    const { game, timer } = store.getState();
    const points = timer * (game.maxScore - 50) + 50;

    const payload = {
      turnPoints: points,
      // inTurn: false
    };

    store.dispatch(actions.updateGame(payload));
  }

  public static stopMatch() {
    GameManager.stopChronometer();

    const payload = {
      players: [],
      maxTime: 0,
      maxScore: 0,
      words: [],
      inGame: false,
      inTurn: false,
      actualPlayer: { id: "", name: "", points: 0, skips: 0 },
      actualWord: "",
      turn: 0,
      counterId: 0,
      turnPoints: 0,
    };

    store.dispatch(actions.updateGame(payload));
  }

  public static continue() {
    const {game} = store.getState();

    const index = game.players.findIndex(
      (p: PlayerProps) => p.id === game.actualPlayer.id
    );
    let nextIndex = index + 1;
    if (nextIndex > game.players.length - 1) nextIndex = 0;

    const payload = {
      actualPlayer: game.players[nextIndex],
      inTurn: false
    }

    store.dispatch(actions.updateGame(payload));
  }

  private static drawAPlayer() {
    const { game } = store.getState();

    const rnd = Math.trunc(Math.random() * game.players.length);

    return {
      player: game.players[rnd],
    };
  }

  private static drawAWord() {
    const { game } = store.getState();
    const rnd = Math.trunc(Math.random() * game.words.length);
    const selected = game.words[rnd];

    console.log(rnd, selected, game.words.length);

    store.dispatch(
      actions.updateGame({
        words: game.words.filter((word) => word !== selected),
        actualWord: selected,
      })
    );

    return selected;
  }
}
