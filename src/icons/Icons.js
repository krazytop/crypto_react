import BTC from './icons_png/btc.png';
import ETH from './icons_png/eth.png';
import DOT from './icons_png/dot.png';
import LINK from './icons_png/link.png';
import VET from './icons_png/vet.png';
import BNB from './icons_png/bnb.png';
import SOL from './icons_png/sol.png';
import LTC from './icons_png/ltc.png';
import AVAX from './icons_png/avax.png';
import XRP from './icons_png/xrp.png';

const coinIcons = {
    BTC,
    ETH,
    DOT,
    LINK,
    VET,
    BNB,
    SOL,
    LTC,
    AVAX,
    XRP
};

export function getIcon(coin){
    return coinIcons[coin];
}

export default coinIcons;