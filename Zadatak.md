Poštovani Siniša,

U skladu sa našim dogovorom, u nastavku Vam dostavljam testni zadatak koji smo pripremili za Vas.

Koristeći kao osnovu projekat dostupan na:

https://github.com/HugoDF/express-postgres-starter

potrebno je kreirati CRUD endpointe za tri modela (polja modela su navedena u zagradi):

CarModel (Model, Color, Production year)

Car (CarModel, User, RegistrationNumber)

Garage (Address)

Pored toga, potrebno je kreirati i endpoint:

- Find-my-car (finds where the user's car is parked using the registration number (licence plate) as the input) and provides detailed information about the car.

Zadatak je potrebno isporučiti u vidu javno dostupnog repozitorija (github) i poželjno je, ali nije neophodno, da se implementira u cijelosti.

---

Repozitorij koji služi kao osnova projekta koristi Docker, pa bi se za potrebe ovog zadatka prvo trebalo nakratko uputiti kako funkcioniše.

Docker je alat za virtualizaciju i pomoću njega je moguće na računaru zavrtiti servise bez da se operativni sistem zaprlja. Definicija servisa koje docker treba pokrenuti se nalaze u fajlu docker-compose.yaml, to je ono što docker komanda (docker-compose) koja pokreće aplikaciju uzme u obzir da kreira potrebne kontejnere (u našem slučaju backend aplikaciju i postgres bazu).

Dakle bilo bi dovoljno da se na računar koji ćete koristiti za izradu zadatka instalira docker i nakon toga isprate instrukcije navedene na početnoj strani gore navedenog repozitorija za pokretanje projekta.

---

Ako niste upoznati sa konceptom CRUD-a možete proći površno ovaj članak koji će Vas uputiti bolje u CRUD i rest API endpointe.

REST CRUD

https://stoplight.io › blog › crud-api-design

---

Rok za izradu zadatka je: 12.04.2021. godine

Srećno u radu na zadatku.

Srdačan pozdrav,
