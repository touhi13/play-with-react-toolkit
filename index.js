const store = require("./rtk/app/store");
const { fetchVideo } = require("./rtk/features/video/videoSlice");

// subscribe to state changes
store.subscribe(() => {
    // console.log(store.getState());
});

// dispatch actions
store.dispatch(fetchVideo());
