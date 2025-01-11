class MapStack {
    constructor() {
        this.map = new Map();
        this.stack = new Map();
        this.currentIndex = 0;
    }

    push(key, value) {
        this.map.set(key, value);
        this.stack.set(this.currentIndex, key);
        this.currentIndex++;
    }

    pop() {
        if (this.isEmpty()) {
            throw new Error("[MapStack] pop: 스택이 비었습니다.");
        }
        this.currentIndex--;
        const key = this.stack.get(this.currentIndex);
        this.stack.delete(this.currentIndex);
        this.map.delete(key);
        return this.map.get(key);
    }

    peek() {
        if (this.isEmpty()) {
            throw new Error("[MapStack] peek: 스택이 비었습니다.");
        }
        return this.map.get(this.stack.get(this.currentIndex - 1));
    }

    findValueByKey(key) {
        return this.map.get(key) || null;
    }

    deleteByKey(key) {
        if (this.map.has(key)) {
            const value = this.map.get(key);
            this.map.delete(key);
            for (let [index, k] of this.stack.entries()) {
                if (k === key) {
                    this.stack.delete(index);
                    this.currentIndex--;
                    break;
                }
            }
            return true;
        }
        return false;
    }

    forEach(callback) {
        for (let [index, key] of this.stack.entries()) {
            const value = this.map.get(key);
            callback(value, key, index);
        }
    }

    isEmpty() {
        return this.map.size === 0;
    }

    size() {
        return this.map.size;
    }

    keys() {
        return [...this.map.keys()];
    }
}

export default MapStack;