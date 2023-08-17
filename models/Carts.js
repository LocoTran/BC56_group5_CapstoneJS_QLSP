function Cart() {
  (this.products = []),
    (this.amount = 0),
    (this.addAmount = function (amount) {
      this.amount += amount;
    }),
    (this.reduceAmount = function (amount) {
      this.amount -= amount;
    }),
    (this.updateAmount = function () {
      this.amount = 0;
      for (let i = 0; i < this.products.length; i++) {
        this.amount += this.products[i].productAmount;
      }
    });
}
