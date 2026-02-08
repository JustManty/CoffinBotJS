const path = require('node:path');
const dotenv = require('dotenv');
const DEV = 'DEV';
const PRD = 'PRD';

const env = getEnvArg() === PRD ? PRD : DEV;
const envFile = env === PRD ? '.env.prd' : '.env.dev';

dotenv.config({ path: path.resolve(process.cwd(), envFile) });

function required(name) {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required env var: ${name} (from ${envFile})`);
  return value;
}

function getEnvArg(defaultEnv = 'DEV') {
  const arg = process.argv.find(a => a.startsWith('--env='));
  return (arg ? arg.split('=')[1] : defaultEnv).toUpperCase();
}

module.exports = {
  env,
  isProd: env === PRD,
  token: required('TOKEN'),
  clientId: required('CLIENT_ID'),
  serverId: required('SERVER_ID'),
  ranksChannelId: required('RANKS_CHANNEL_ID'),
};