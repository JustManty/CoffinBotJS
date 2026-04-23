const got = require('got').default;

/**
 * @typedef {Object} RuneScapeVoS
 * @property {string} timestamp ISO-8601 date-time string
 * @property {string} district1
 * @property {string} district2
 * @property {string} source
 * @property {string|null} district1image Filename in ./assets/images/vos (e.g. "Amlodd_Clan.png")
 * @property {string|null} district2image Filename in ./assets/images/vos (e.g. "Hefin_Clan.png")
 */

const VOS_DISTRICTS = new Set([
    'Amlodd',
    'Cadarn',
    'Crwys',
    'Hefin',
    'Iorwerth',
    'Ithell',
    'Meilyr',
    'Trahaearn',
]);

/**
 * @param {string} district
 * @returns {string|null} e.g. "Amlodd_Clan.png"
 */
function districtToImageFileName(district) {
    if (!VOS_DISTRICTS.has(district)) return null;
    return `${district}_Clan.png`;
}

/**
 * Creates a small Weirdgloop VoS API client.
 *
 * @param {{ baseUrl?: string, userAgent?: string, timeoutMs?: number }} [options]
 * @returns {{ getVos: () => Promise<RuneScapeVoS> }}
 */
function createWeirdgloopVosClient(options = {}) {
    const baseUrl = options.baseUrl ?? 'https://api.weirdgloop.org';
    const userAgent = options.userAgent ?? 'CoffinBotJS/1.0';
    const timeoutMs = options.timeoutMs ?? 10_000;

    const http = got.extend({
        prefixUrl: baseUrl,
        headers: {
            'user-agent': userAgent,
            accept: 'application/json',
        },
        timeout: { request: timeoutMs },
        retry: { limit: 2 },
        responseType: 'json',
    });

    return {
        /**
         * Fetches the current RuneScape Voice of Seren districts.
         * @returns {Promise<RuneScapeVoS>}
         */
        async getVos() {
            const data = await http.get('runescape/vos').json();

            // Lightweight shape validation (helps catch API changes early)
            if (
                !data ||
                typeof data.timestamp !== 'string' ||
                typeof data.district1 !== 'string' ||
                typeof data.district2 !== 'string'
            ) {
                throw new Error('Unexpected response shape from Weirdgloop /runescape/vos');
            }

            return /** @type {RuneScapeVoS} */ ({
                ...data,
                district1image: districtToImageFileName(data.district1),
                district2image: districtToImageFileName(data.district2),
            });
        },
    };
}

module.exports = {
    createWeirdgloopVosClient,
};