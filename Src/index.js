//import Item from '.src/item.js'
const body = document.querySelector('.body')
const youbue = body.querySelector('.youbue ')
class Basket {
    basket = []
    constructor(...items) {
        this.basket.push(...items)
    }

    addProduct(item) {
        this.basket.push(item)
    }

    calcTotalPrice() {
        return this.basket.reduce((result, curItem) => {
            return result + curItem.price
        }, 0)
    }
    changeInnerText() { totalPricebox.innerText = this.calcTotalPrice() }

    removeAll() {
        this.basket.forEach((element) => { element.AlreadyBued = 'false' })
        this.basket = []
        this.calcTotalPrice()
        this.changeInnerText()
        youbue.innerHTML = ''
    }

    FindInBasket(good) {
        return this.basket.filter((good) => {
            this.basket[0].name == good.name
            console.log(this.basket)

        }
        )
    }
    removeProductFromBasket(item) {
        const delitemnumber = this.basket.indexOf(this.FindInBasket(item)[0])
        this.basket.splice(delitemnumber, 1)
        console.log(this.basket)
    }



}

class Item {
    name = ''
    price = 0
    AlreadyBued = 'false'
    Amoung = 1
    constructor(name, price) {
        this.name = name
        this.price = price
    }

    renderInBasket() {

        const product = document.createElement('a')
        youbue.appendChild(product)
        product.innerText = this.name
        product.setAttribute('href', `#`)
        product.classList.add(this.name)
        product.classList.add('product')
        const productPrice = document.createElement('div')
        youbue.appendChild(productPrice)
        productPrice.innerText = this.price
        productPrice.classList.add(this.name + 'price')
        productPrice.classList.add('price')
        const counter = document.createElement('div')
        product.appendChild(counter)
        counter.classList.add(this.name + 'counter')
        counter.classList.add('counter')
        const discreaser = document.createElement('div')
        product.appendChild(discreaser)
        discreaser.innerText = 'уменьшить'
        discreaser.classList.add('discreaser')
        discreaser.addEventListener('click', () => this.Discrease())


    }

    renderInList() {
        const AllProductsBox = document.querySelector('.AllProductsBox')
        const Newproduct = document.createElement('a')
        AllProductsBox.appendChild(Newproduct)
        Newproduct.innerText = this.name
        Newproduct.setAttribute('href', `#`)
        const NewproductPrice = document.createElement('div')
        AllProductsBox.appendChild(NewproductPrice)
        NewproductPrice.innerText = this.price
        const ByeBtn = document.createElement('div')
        ByeBtn.classList.add('ByeBtn')
        ByeBtn.innerText = 'Купить'
        Newproduct.appendChild(ByeBtn)
    }

    Discrease() {
        this.Amoung--
        myBasket.removeProductFromBasket(this)
        const addedPromise = new Promise(resolve => {
            if (this.Amoung > 0) {
                const counter = document.querySelector(`.${this.name}` + 'counter')
                counter.innerText = this.Amoung
            }
            else {
                const product = document.querySelector(`.${this.name}`)
                youbue.removeChild(product)
                const productPrice = document.querySelector(`.${this.name}` + 'price')
                youbue.removeChild(productPrice)
                this.AlreadyBued = 'false'
            }
            console.log(myBasket)
            resolve()
        })
        addedPromise.then(myBasket.calcTotalPrice(),
            myBasket.changeInnerText())

    }
}

const myBasket = new Basket()

class List {
    List = []

    constructor(...items) {

        let promise = this.fetchItem()
        promise.then(this.render.bind(this))



    }
    addNewProduct(item) {
        this.List.push(item)
    }


    render() {
        const AllProductsarr = this.List
        const AllProductsBox = document.createElement('div')
        AllProductsBox.classList.add('AllProductsBox')

        body.appendChild(AllProductsBox)

        AllProductsarr.forEach(element => {
            const Newproduct = document.createElement('a')
            AllProductsBox.appendChild(Newproduct)
            Newproduct.innerText = element.name
            Newproduct.setAttribute('href', `#`)
            const NewproductPrice = document.createElement('div')
            AllProductsBox.appendChild(NewproductPrice)
            NewproductPrice.innerText = element.price
            const ByeBtn = document.createElement('div')
            ByeBtn.classList.add('ByeBtn')
            ByeBtn.innerText = 'Купить'
            Newproduct.appendChild(ByeBtn)
            ByeBtn.addEventListener('click', this.onByeBtnclick.bind(element)),
                ByeBtn.addEventListener('click', this.changeAlreadybued.bind(element)),
                ByeBtn.addEventListener('click', myBasket.calcTotalPrice.bind(myBasket))
            ByeBtn.addEventListener('click', myBasket.changeInnerText.bind(myBasket))


        })
    }
    fetchItem() {

        return fetch('/database.json')
            .then(data => data.json())
            .then(result => {
                this.List = result.data.map(cur => new Item(cur.name, +cur.price))
            }
            )


    }


    changeAlreadybued() { this.AlreadyBued = 'true' }

    onByeBtnclick() {
        myBasket.addProduct(this)

        if (this.AlreadyBued == 'false') {

            this.renderInBasket()


        } else {
            this.Amoung++
            const counter = document.querySelector(`.${this.name}` + 'counter')
            counter.innerText = this.Amoung

        }
        console.log(myBasket)



    }


}

const myList = new List(Item1 = new Item('pc', 35000),
    Item2 = new Item('refregerater', 18000),
    Item3 = new Item('tv', 23000),
    Item4 = new Item('microvave_owen', 23000),
    Item5 = new Item('iphon10', 40000),
    Item6 = new Item('samsung_galaxy_S10', 38000),
    Item7 = new Item('airpods', 14000),
    Item8 = new Item('kettle', 3000),
    Item9 = new Item('vacuum_cleaner', 5000),
    Item10 = new Item('gas_stove', 25000),
)

const totalPricebox = document.createElement('div')
youbue.appendChild(totalPricebox)

const removeAll = document.querySelector('.removeall')
removeAll.addEventListener('click', () => myBasket.removeAll())

//const form = document.forms.feedback
//const inputname = form.elements.inputname
//const re = /[1234567890]/g
//function Check(event) {
 //   if (event.target.value.match(re) !== null) {
 //       console.log('введите корректное имя')
 //   }
//}
//inputname.addEventListener('input', (e) => Check(e))

