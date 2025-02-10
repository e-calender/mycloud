import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getData = createAsyncThunk("data/getData", async (data) => {
  const res = await fetch("api/", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "post",
    body: JSON.stringify({ lang: data.lang }),
  }).then((data) => data.json());
  return res;
});

const initialState = {
  lastTyping: "",
  status: false,
  data: [],
  words: [],
  text: "",
  input: "",
  wordIndex: 0,
  time: 0,
  allTypedEntries: "",
  result: [
   
  ],
  accuracy: {
    correct: 0,
    incorrect: 0,
  },
  accuracyIndex: {
    correct: [],
    incorrect: [],
  },
};

export const typingSlice = createSlice({
  name: "typing",
  initialState,
  reducers: {
    changeText: (state, action) => {
      state.text = action.payload;
      state.words = state.data
        .filter((item) => item.name === state.text)[0]
        .value.split(" ")
        .sort(() => Math.random() - 0.5);
      state.accuracy = {
        correct: 0,
        incorrect: 0,
      };
      state.accuracyIndex = {
        correct: [],
        incorrect: [],
      };
      state.wordIndex = 0;
      state.input = "";
      state.status = false;
      state.time = 0;
      state.allTypedEntries = "";
    },
    changeTime: (state) => {
      state.time--;
    },
    addResult: (state, action) => {
      state.result.push({
        speed: Math.round((state.allTypedEntries.length / 5 - state.accuracy.incorrect) / 1),
        keystrokes: state.allTypedEntries.length,
        accuracy:
          ((state.accuracy.correct / (state.accuracy.incorrect + state.accuracy.correct)) * 100).toFixed(2),
        correctWords: state.accuracy.correct,
        wrongWords: state.accuracy.incorrect,
      });
    },
    changeInput: (state, action) => {
      if (state.time === 0 && state.status === false) {
        state.time = 60;
        state.status = true;
        state.allTypedEntries = "";
      }
      if (state.time !== 0) {
        state.allTypedEntries += action.payload.slice(-1);
        if (action.payload.includes(" ")) {
          if (state.words[state.wordIndex] === action.payload.slice(0, -1)) {
            state.accuracy.correct++;
            state.accuracyIndex.correct.push(state.wordIndex);
          } else {
            state.accuracy.incorrect++;
            state.accuracyIndex.incorrect.push(state.wordIndex);
          }
          if (action.payload !== " ") {
            state.input = "";
            state.wordIndex++;
          }
        } else {
          state.input = action.payload;
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getData.pending, (state) => {
        // state.status = true;
      })
      .addCase(getData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.words = action.payload[0].value.split(" ").sort(() => Math.random() - 0.5);
        state.text = action.payload[0].name;
        state.accuracy = {
          correct: 0,
          incorrect: 0,
        };
        state.accuracyIndex = {
          correct: [],
          incorrect: [],
        };
        state.wordIndex = 0;
        state.input = "";
        state.status = false;
        state.time = 0;
        state.allTypedEntries = "";
      });
  },
});

export const { changeText, addResult, changeInput, changeTime } = typingSlice.actions;

export default typingSlice.reducer;
