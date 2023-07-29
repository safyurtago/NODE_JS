class Food {
    constructor (ing1=null, ing2=null, ing3=null, ing4=null, ing5=null) {
        this.ing1 = ing1; this.ing2 = ing2; this.ing3 = ing3; this.ing4 = ing4; this.ing5 = ing5
    }
    ingredients() {
        return `Ingredients: ${this.ing1}, ${this.ing2}, ${this.ing3}, ${this.ing4}, ${this.ing5}`
    }
}

module.exports = Food