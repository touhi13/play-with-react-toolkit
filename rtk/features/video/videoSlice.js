const { createAsyncThunk, createSlice } = require("@reduxjs/toolkit");
const { default: fetch } = require("node-fetch");
const { fetchRelatedVideos } = require("../relatedVideos/relatedVideosSlice");

//initial state
const initialState = {
    loading: false,
    error: '',
    video: {}
}

// create async thunk
const fetchVideo = createAsyncThunk("video/fetchVideo", async (_, { dispatch }) => {

    const response = await fetch(
        `http://localhost:9000/videos`
    );
    const video = await response.json();

    dispatch(fetchRelatedVideos(video.tags));

    return video;
});

//create video slice
const videoSlice = createSlice({
    name: "video",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchVideo.pending, (state, action) => {
                state.loading = true;
                state.error = '';
            })
            .addCase(fetchVideo.fulfilled, (state, action) => {
                state.loading = false;
                state.error = '';
                state.video = action.payload;
            })
            .addCase(fetchVideo.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
                state.video = {};
            })
    }
});

module.exports = videoSlice.reducer;
module.exports.fetchVideo = fetchVideo;