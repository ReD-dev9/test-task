import path from 'path';
import { Configuration as WebpackConfiguration, ProvidePlugin } from 'webpack';
import { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ESLintPlugin from 'eslint-webpack-plugin';

interface Configuration extends WebpackConfiguration {
    devServer?: WebpackDevServerConfiguration;
}

const config: Configuration = {
    mode: 'development',
    output: {
        publicPath: '/',
    },
    entry: './src/index.tsx',
    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/i,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
                    },
                },
            },
            {
                test: /\.(jpg|svg|ico|json|png|txt)$/i,
                use: ['file-loader'],
            },
            {
                test: /\.(scss|css)$/i,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'public/index.html',
        }),
        new ESLintPlugin({
            extensions: ['js', 'jsx', 'ts', 'tsx'],
        }),
        new ProvidePlugin({
            React: 'react',
        }),
    ],
    devtool: 'inline-source-map',
    devServer: {
        static: path.join(__dirname, 'build'),
        historyApiFallback: true,
        port: 4000,
        open: true,
        hot: true,
    },
};

export default config;
