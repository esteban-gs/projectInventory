#Devices
[
  '{{repeat(1000)}}',
  {
    name: '{{lorem(1, "words")}}',
    description: '{{lorem(1, "sentences")}}',
    purchased: '{{date(new Date(2014, 0, 1), new Date(), "YYYY-MM-dd")}}',
    value: '{{floating(1000, 4000, 2, "0.00")}}',
    productId: '{{random("10b9d4dc", "edcaec07", "03066a26", "527424jjj")}}',
    categoryId: '{{integer(1,4)}}',
    makerId: '{{integer(1,4)}}'
  }
]
#Category
[
  '{{repeat(4)}}',
  {
    name: '{{random("Mobile", "Desktop", "Laptop", "Tablet")}}',
  }
]

#Makers
[
  '{{repeat(4)}}',
  {
    name: '{{random("Apple", "Hp", "Lenovo", "Samsung")}}'
  }
]

#Employees
[
  '{{repeat(800)}}',
  {
    firstName: '{{firstName()}}',
    lastName: '{{surname()}}',
    socialSecurityNumber: '{{integer(100, 999)}}-{{integer(10, 99)}}-{{integer(1000, 9999)}}',
    badgeNumber: '{{integer(100, 999)}}{{random("A", "X", "DH", "UF", "TTY")}}{{integer(100, 999)}}',
    hireDate: '{{date(new Date(2000, 0, 1), new Date(), "YYYY-MM-dd")}}'
  }
]

#EmployeeDevice
[
  '{{repeat(1200)}}',
  {
    employeeId: '{{integer(1, 800)}}',
    deviceId: '{{integer(1, 1000)}}',
    checkOutDate: '{{date(new Date(2000, 0, 1), new Date(), "YYYY-MM-dd")}}',
	checkInDate: '{{date(new Date(2010, 0, 1), new Date(), "YYYY-MM-dd")}}'
  }
]

