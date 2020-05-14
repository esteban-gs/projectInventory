[
  '{{repeat(5, 7)}}',
  {
    name: '{{firstName()}} {{surname()}}',
    description: '{{lorem(1, "sentences")}}',
    purchased: '{{date(new Date(2014, 0, 1), new Date(), "YYYY-MM-dd")}}',
    value: '{{floating(1000, 4000, 2, "0.00")}}',
    productId: '{{random("10b9d4dc", "edcaec07", "03066a26", "527424jjj")}}',
    deviceCategoryId: '{{integer(1,4)}}',
    makerId: '{{integer(1,4)}}',
  }
]
,
[
  '{{repeat(4)}}',
  {
    name: '{{random("Mobile", "Desktop", "Laptop", "Tablet")}}',
  }
]
,
[
  '{{repeat(4)}}',
  {
    name: '{{random("Apple", "Hp", "Lenovo", "Samsung")}}'
  }
]

