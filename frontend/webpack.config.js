const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: "./src/index.tsx",
    output: {
        filename: "bundle.js",
        path: __dirname + "/static",
    },

    mode: "development",

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json", ".svg"],
    },

    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            { test: /\.(ts|tsx)?$/, loaders: ["awesome-typescript-loader"] },

            {
                test: /\.scss$/,
                loaders: ["style-loader", "css-loader?sourceMap", "sass-loader?sourceMap"],
            },

            {
                test: /\.(ttf|eot|woff|woff2)$/,
                loader: "url-loader",
            },

            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {},
                    },
                ],
            },

            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
        ],
    },

    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    externals: {},
    plugins: [new CopyWebpackPlugin([{ from: "src/assets/images/*.*", flatten: true }])],
    devServer: {
        headers: { "Access-Control-Allow-Origin": "*" },
        publicPath: "/static",
        historyApiFallback: true,
        hot: true,
        port: 4444,
        host: "0.0.0.0",
        proxy: {
            "/api": {
                target: "http://localhost:5000",
                // target: "https://app-store-backend.herokuapp.com",
                changeOrigin: true,
            },
        },
    },
};
