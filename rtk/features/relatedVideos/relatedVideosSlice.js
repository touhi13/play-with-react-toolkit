const { createAsyncThunk, createSlice } = require("@reduxjs/toolkit");
const { default: fetch } = require("node-fetch");
const { stringConverter } = require("../../../utils/utils");

//initial state
const initialState = {
    loading: false,
    error: '',
    relatedVideos: []
}

//create async thunk
const fetchRelatedVideos = createAsyncThunk('relatedVideos/fetchVideos', async (tags) => {

    const url = `http://localhost:9000/videos?${tags.map(tag => `tags_like=${tag}`).join("&")}`;
    const response = await fetch(url);
    const videos = await response.json();
    const sortedVideos = videos.sort(
        (a, b) => parseFloat(b.views) - parseFloat(a.views)
    );
    return sortedVideos;

});

//create slice
const relatedVideosSlice = createSlice({
    name: "relatedVideos",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchRelatedVideos.pending, (state, action) => {
                state.loading = true;
                state.error = '';
            })
            .addCase(fetchRelatedVideos.fulfilled, (state, action) => {
                state.loading = false;
                state.error = '';
                state.relatedVideos = action.payload;
            })
            .addCase(fetchRelatedVideos.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
                state.relatedVideos = [];
            })
    }
})

module.exports = relatedVideosSlice.reducer;
module.exports.fetchRelatedVideos = fetchRelatedVideos;
module.exports.fetchRelatedVideosAction = relatedVideosSlice.actions;