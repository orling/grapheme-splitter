module.exports = {
    presets: [
        ["@babel/preset-env", {
            debug: true,
            targets: {
                browsers: [
                    "> 0.5%",
                    "last 2 versions",
                    "Firefox ESR",
                    "not dead",
                    "maintained node versions"
                ]
            },
            useBuiltIns: false
        }]
    ]
};
