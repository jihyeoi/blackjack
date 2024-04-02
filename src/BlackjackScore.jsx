import {sampleSize} from 'lodash';

const BASE_URL = "https://deckofcardsapi.com/"

async function blackJack() {
    const deckResponse = await fetch(`${BASE_URL}/api/deck/new/shuffle/?deck_count=1`)
    const deckIdResponse = await deckResponse.json()
    const deckId = deckIdResponse.deck_id;

    return deckId;
}

async function drawCard(deckId) {
    const getTwoCards = await fetch(`${BASE_URL}/api/deck/${deckId}/draw/?count=2`)
    const twoCardResp = await getTwoCards.json();

    const card1Val = twoCardResp.cards[0].value;
    const card2Val = twoCardResp.cards[1].value;

    return {
        card1: card1Val,
        card2: card2Val
    };
}


function scoreCard(value) {
    if (Number(value)) return value;
    else if (value === "ACE") return 11;
    else return 10;
}


async function getAndScoreCards() {
    const deckId = await blackJack();
    const twoCardsInfo = await drawCard(deckId);

    const card1Score = scoreCard(twoCardsInfo.card1)
    const card2Score = scoreCard(twoCardsInfo.card2)

    console.log(card1Score)
    console.log(card2Score)

    const score = Number(card1Score) + Number(card2Score);
    return score;
}


