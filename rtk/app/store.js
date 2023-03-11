const { configureStore, getDefaultMiddleware } = require("@reduxjs/toolkit");
const videoReducer = require('../features/video/videoSlice');
const relatedVideoReducer = require('../features/relatedVideos/relatedVideosSlice');
const { createLogger } = require("redux-logger");

const logger = createLogger();

//configure store
const store = configureStore({
    reducer: {
        video: videoReducer,
        relatedVideo: relatedVideoReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(logger)
});

module.exports = store;