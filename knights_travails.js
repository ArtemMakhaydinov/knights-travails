class Knight {
    constructor() {
        this.board = this.buildBoard();
    }

    buildBoard() {
        const board = new Map();
        for (let x = 0; x <= 7; x++) {
            for (let y = 1; y <= 8; y++) {
                const moves = this.possibleMoves(x, y);
                board.set(`${String.fromCharCode(x + 97)}${y}`, moves);
            }
        }
        return board;
    }

    isCoordsValid(x, y) {
        if (x < 0 || x > 7 || y < 1 || y > 8) return false;
        return true;
    }

    possibleMoves(x, y) {
        const result = [];
        if (this.isCoordsValid(x + 1, y + 2)) result.push(`${String.fromCharCode(x + 97 + 1)}${y + 2}`);
        if (this.isCoordsValid(x + 2, y + 1)) result.push(`${String.fromCharCode(x + 97 + 2)}${y + 1}`);
        if (this.isCoordsValid(x + 2, y - 1)) result.push(`${String.fromCharCode(x + 97 + 2)}${y - 1}`);
        if (this.isCoordsValid(x + 1, y - 2)) result.push(`${String.fromCharCode(x + 97 + 1)}${y - 2}`);
        if (this.isCoordsValid(x - 1, y - 2)) result.push(`${String.fromCharCode(x + 97 - 1)}${y - 2}`);
        if (this.isCoordsValid(x - 2, y - 1)) result.push(`${String.fromCharCode(x + 97 - 2)}${y - 1}`);
        if (this.isCoordsValid(x - 2, y + 1)) result.push(`${String.fromCharCode(x + 97 - 2)}${y + 1}`);
        if (this.isCoordsValid(x - 1, y + 2)) result.push(`${String.fromCharCode(x + 97 - 1)}${y + 2}`);
        return result;
    }

    knightMoves(start, end, path = [end]) {
        if (start === end) return `You made it in ${path.length - 1} moves, here is your path: ${path.join(' => ')}`;
        const visited = new Set();
        const queue = [start];
        while (queue.length > 0) {
            const current = queue.shift();
            const moves = this.board.get(current);
            for (const move of moves) {
                if (move === end) {
                    path.unshift(current);
                    return this.knightMoves (start, current, path)
                }
                if (!visited.has(move)){
                    visited.add(move);
                    queue.push(move);
                }
            }
        }
        return null;
    }
 
}

const knight = new Knight();
console.log(knight.knightMoves('a1', 'b2'));
console.log(knight.knightMoves('d1', 'a8'));
console.log(knight.knightMoves('f1', 'a2'));
console.log(knight.knightMoves('d1', 'd2'));
console.log(knight.knightMoves('e2', 'e4'));
