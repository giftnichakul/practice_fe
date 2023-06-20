const books = [
  {name: 'Book 1', background: 'https://i.pinimg.com/564x/f1/f1/ef/f1f1ef1d175e9157e2faf3931a110f11.jpg', amount: 2, price: 80},
  {name: 'Book 2', background: 'https://i.pinimg.com/564x/f2/f8/e8/f2f8e8342c5e6a70b468449a788ae4d3.jpg', amount: 3, price: 80},
  {name: 'Book 3', background: 'https://i.pinimg.com/564x/2a/42/ec/2a42ecbe908438c0e96f3b2f51c7ca4f.jpg', amount: 4, price: 80},
  {name: 'Book 4', background: 'https://i.pinimg.com/564x/0d/74/18/0d7418c27c6fe04a5fc765a1bd1c66c6.jpg', amount: 1, price: 80},
  {name: 'Book 5', background: 'https://i.pinimg.com/564x/03/2c/0d/032c0d5a97f219730f107b1ede12a620.jpg', amount: 1, price: 80}
]

var orders = {};

const displayOrder = () => {
  const gridOrder = document.querySelector('.book-order');
  gridOrder.innerHTML = '';
  if(Object.keys(orders).length == 0){
    gridOrder.textContent = 'No orders';
  }else{
    const listOfOrder = document.createElement('ul');
    Object.keys(orders).forEach( bookName => {
      var detail = document.createElement('li');
      detail.textContent = `${bookName} for ${orders[bookName]} books`;
      listOfOrder.appendChild(detail);
    })
    const orderLine = document.createElement('p');
    orderLine.textContent = listOfOrder;
    gridOrder.append(listOfOrder);
  }
}

const displayPrice = () => {
  const gridPrice = document.querySelector('.book-price');
  var TotalPrice = 0;
  Object.values(orders).forEach ( amount => {
    TotalPrice += amount*80;
  })
  switch (Object.keys(orders).length) {
    case 2:
      TotalPrice *= 0.95;
      break;
    case 3:
      TotalPrice *= 0.9;
      break;
    case 4:
      TotalPrice *= 0.8;
      break;
    case 5:
      TotalPrice *= 0.75;
      break;
  }
  gridPrice.textContent = `${TotalPrice} baht`;
}

const addToCart = (bookName, amount) => {
  if(amount == 0 && bookName in orders) delete orders[bookName];
  else if(amount > 0) orders[bookName] = amount;
  displayOrder();
  displayPrice();
}

const displayBook = () => {
  const gridContainer = document.querySelector('.book-info')

  gridContainer.innerHTML = "";

  books.forEach( book => {
    const bookItem = document.createElement('div');
    bookItem.classList.add('book');

    const bookImage = document.createElement('div');
    bookImage.classList.add('book-image');
    bookImage.style.backgroundImage = `url(${book.background})`;

    const bookTitle = document.createElement('h1');
    bookTitle.textContent = book.name;

    bookImage.appendChild(bookTitle);

    const bookDetail = document.createElement('div');
    bookDetail.classList.add('book-detail');

    const bookName = document.createElement('p');
    const spanName = document.createElement('span');
    spanName.textContent = 'Name: ';
    bookName.appendChild(spanName);
    bookName.innerHTML += book.name;

    const bookDetail2 = document.createElement('div');
    bookDetail2.classList.add('book-detail2');

    const bookPrice = document.createElement('p');
    bookPrice.textContent = `Price: ${book.price}`;
    bookPrice.style.flexBasis = '50%';
    const bookAmount = document.createElement('p');
    bookAmount.textContent = `Available: ${book.amount}`;
    bookDetail2.append(bookPrice, bookAmount);

    bookDetail.append(bookName, bookDetail2);


    const bookOrder = document.createElement('div');
    bookOrder.classList.add('book-button');

    var quantity = 0;

    const orderButton = document.createElement('button');
    orderButton.innerHTML = 'Add to cart';
    orderButton.type = 'submit';

    const select = document.createElement('select');

    for (var i=0; i <= book.amount; i++){
      var option = document.createElement('option');
      option.value = i;
      option.textContent = i;
      select.appendChild(option);
    }

    select.onchange = function() {
      quantity = this.value;
    }

    orderButton.onclick = function () {
      addToCart(book.name, quantity);
    }

    bookOrder.appendChild(select);
    bookOrder.appendChild(orderButton);

    bookItem.append(bookImage, bookDetail, bookOrder);
    gridContainer.appendChild(bookItem);
  })

}

displayOrder();
displayPrice();
displayBook();
