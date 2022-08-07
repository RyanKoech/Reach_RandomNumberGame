'reach 0.1';

const [ isOutcome, B_WINS, DRAW, A_WINS ] = makeEnum(3);
const [ isGuess, NUM_1, NUM_2, NUM_3 ] = makeEnum(3);

const Player = {
  ...hasRandom,
  getGuess: Fun([], UInt),
  setOutcome: Fun([UInt, UInt], Null),
  seed: UInt,
  informTimeout: Fun([], Null)
};

const getLuckyNumber = (lowerLimit, upperLimit, seedAlice, seedBob) => {
  const range = upperLimit - lowerLimit
  if(seedAlice > seedBob ){
    const randomBase = ((seedAlice - seedBob) * 10) / range
    if(randomBase == 10 ){
      return upperLimit;
    }else {
      const luckyNumber = (randomBase * (range + 1)) / 10 + lowerLimit
      return luckyNumber;
    }
  }else {
    const bob_alice = seedBob - seedAlice
    if(bob_alice == 0){
      return lowerLimit;
    }else {
      const randomBase = (bob_alice * 10) / range
      if(randomBase == 10 ){
        return upperLimit;
      }else {
        const luckyNumber = (randomBase * (range + 1)) / 10 + lowerLimit
        return luckyNumber;
      }
    }
  }
}

const getOutcome = (luckyNumber, guessAlice, guessBob) => {
  if (guessAlice == luckyNumber && guessBob == luckyNumber){
    return 1;
  }else if (guessAlice == luckyNumber) {
    return 2;
  }else if(guessBob == luckyNumber) {
    return 0;
  }else {
    return 1
  }
}

assert(getOutcome(NUM_1, NUM_1, NUM_2) == A_WINS)
assert(getOutcome(NUM_1, NUM_2, NUM_1) == B_WINS)
assert(getOutcome(NUM_1, NUM_1, NUM_1) == DRAW)
assert(getOutcome(NUM_1, NUM_2, NUM_3) == DRAW)

forall(UInt, guessAlice =>
  forall(UInt, guessBob => 
    forall(UInt, luckyNumber =>
      assert(isOutcome(getOutcome(luckyNumber, guessAlice, guessBob))))));

forall(UInt, guess => 
  forall(UInt, luckyNumber =>
    assert(getOutcome(luckyNumber, guess, guess) == DRAW)))

export const main = Reach.App(() => {

  const Alice = Participant('Alice', {
    ...Player,
    lowerLimit: UInt,
    upperLimit: UInt,
    wager: UInt,
    deadline: UInt,
  });

  const Bob   = Participant('Bob', {
   ...Player,
   acceptTerms: Fun([UInt, UInt, UInt], Null),
  });

  init();
  // write your program here
  const informTimeout = () => {
    each([Alice, Bob], () => {
      interact.informTimeout();
    });
  };

  const distributePayment = (outcome, wager) => {
    const            [forAlice, forBob] =
    outcome == 2 ? [       2,      0] :
    outcome == 0 ? [       0,      2] :
    /* tie      */ [       1,      1];
    transfer(forAlice * wager).to(Alice);
    transfer(forBob   * wager).to(Bob);
  }  

  const closeToAll = () => {
    Anybody.publish();
    const wager = balance() / 2
    distributePayment(DRAW, wager);
    informTimeout();
    commit();
    exit();
  }

  Alice.only(() => {
    const wager = declassify(interact.wager);
    const lowerLimit = declassify(interact.lowerLimit);
    const upperLimit = declassify(interact.upperLimit);
    const deadline = declassify(interact.deadline);
    const _seedAlice = interact.seed;
    const [_commitSeedAlice, _saltSeedAlice] = makeCommitment(interact, _seedAlice);
    const commitSeedAlice = declassify(_commitSeedAlice);
  });
  Alice.publish(wager, lowerLimit, upperLimit, deadline, commitSeedAlice)
    .pay(wager);
  commit();

  unknowable(Bob, Alice(_seedAlice, _seedAlice))

  Bob.only(() => {
    interact.acceptTerms(wager, lowerLimit, upperLimit);
    const _seedBob = interact.seed;
    const [_commitSeedBob, _saltSeedBob] = makeCommitment(interact, _seedBob);
    const commitSeedBob = declassify(_commitSeedBob);
  });
  Bob.publish(commitSeedBob)
    .pay(wager)
    .timeout(relativeTime(deadline), () => closeTo(Alice, informTimeout));
  commit();

  unknowable(Alice, Bob(_seedBob, _saltSeedBob));

  Alice.only(() => {
    const saltSeedAlice = declassify(_saltSeedAlice);
    const seedAlice = declassify(_seedAlice);
    const _guessAlice = interact.getGuess();
    const [_commitGuessAlice, _saltGuessAlice] = makeCommitment(interact, _guessAlice);
    const commitGuessAlice = declassify(_commitGuessAlice);
  });
  Alice.publish(saltSeedAlice, seedAlice, commitGuessAlice)
    .timeout(relativeTime(deadline), () => closeToAll());
  checkCommitment(commitSeedAlice, saltSeedAlice, seedAlice);
  commit();

  unknowable(Bob, Alice(_guessAlice, _saltGuessAlice))

  Bob.only(() => {
    const saltSeedBob = declassify(_saltSeedBob);
    const seedBob = declassify(_seedBob);
    const guessBob = declassify(interact.getGuess());
  });
  Bob.publish(guessBob, saltSeedBob, seedBob)
    .timeout(relativeTime(deadline), () => closeToAll());
  checkCommitment(commitSeedBob, saltSeedBob, seedBob);
  commit();

  Alice.only(()=>{
    const guessAlice = declassify(_guessAlice);
    const saltGuessAlice = declassify(_saltGuessAlice);
  });
  Alice.publish(guessAlice, saltGuessAlice)
    .timeout(relativeTime(deadline), () => closeTo(Bob, informTimeout))
  checkCommitment(commitGuessAlice, saltGuessAlice, guessAlice);

  const luckyNumber = getLuckyNumber(lowerLimit, upperLimit, seedAlice, seedBob);
  const outcome  = getOutcome(luckyNumber, guessAlice, guessBob);

  distributePayment(outcome, wager);
  commit();

  each([Alice, Bob], () => {
    interact.setOutcome(outcome, luckyNumber);
  })
});