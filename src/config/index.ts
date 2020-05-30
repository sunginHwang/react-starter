import {localConfig} from './local';
import {stagingConfig} from './staging';
import {devConfig} from './dev';
import {prodConfig} from './prod';

type envConfig = "local" | "dev" | "stage" | "prod";

const getConfig = () => {
    const env: envConfig = (process.env.NODE_ENV as envConfig) || 'local';
    if (env === 'local') return localConfig;
    if (env === 'dev') return devConfig;
    if (env === 'stage') return stagingConfig;
    if (env === 'prod') return prodConfig;
    return localConfig;
};

export default getConfig;
