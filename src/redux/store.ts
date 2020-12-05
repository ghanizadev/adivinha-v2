import { createSlice, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'

const gameSlice = createSlice({
  name: 'game',
  initialState: {
    config: {
      players: [],
      maxTime: 0,
      maxScore: 0,
      words: []
    },
    game: {
      players: [],
      maxTime: 0,
      maxScore: 0,
      words: [],
      inGame: false,
      inTurn: false,
      actualPlayer: {id: "", name: "", points: 0, skips: 0},
      actualWord: '',
      turn: 0,
      counterId: 0,
      turnPoints: 0
    },
    timer : 0,
    timeOver: false
  },
  reducers: {
    setPlayers: (state, action) => {
      state.config.players = action.payload
    },
    setMaxTime: (state, action) => {
      state.config.maxTime = action.payload
    },
    setMaxScore: (state, action) => {
      state.config.maxScore = action.payload
    },
    setWords: (state, action) => {
      state.config.maxScore = action.payload
    },
    removeWord: (state, action) => {
      state.config.words = state.config.words.filter(word => word !== action.payload)
    },
    updateGame: (state, action) => {
      state.game = {...state.game, ...action.payload};
    },
    countdown:(state) => {
      state.timer = state.timer - 1;
    },
    resetTimer:(state, action) => {
      state.timer = Number(action.payload);
    },
    setTimeOver:(state, action) => {
      state.timeOver = action.payload;
    }
  }
})

export const actions = gameSlice.actions

export const store = configureStore({
  reducer: gameSlice.reducer,
  middleware: [...getDefaultMiddleware({immutableCheck: false})]
});