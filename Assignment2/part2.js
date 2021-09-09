class QueenAttack {
    constructor(queens = {white: [4, 4], black: [7, 3]}) {
        if (queens.white[0] === queens.black[0] &&
            queens.white[1] === queens.black[1])
            return 'Queens cannot share the same space';
        this.queens = queens;
    }
    canAttack() {
        let [r1, c1] = this.queens.white;
        let [r2, c2] = this.queens.black;
        return (r1 === r2 || c1 === c2 || Math.abs(r1 - r2) === Math.abs(c1 - c2));
    }
}

let game = new QueenAttack();

if(game.canAttack())
    console.log("Queens can attack each other");
else
    console.log("Queens cannot attack each other");
