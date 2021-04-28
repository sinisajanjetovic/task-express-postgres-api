1. Obrisan je folder "models", jer je nepotreban i ostao je tu greškom, jer sam u početku krenuo sa konceptom da je potrebno kreirati objekte

2. Komanda "npm run migrate up" ne funkcioniše iz terminala proizvodi grešku koja je u MigrationError.jpg. Istovremeno, ova komanda funkcioniše iz Dockera CLI

3. U package.json sam u Dependencies dodao paket "node-pg-migrate": "^5.9.0", jer sam imao problem sa npm run migrate:create, odnosno nisam mogao da pronađem gdje je smješten migracioni fajl, odnosno moja greška je bila. Zbog ovoga sam kreirao i script: "migratefirst": "node-pg-migrate". U principu, oboje je višak.

4. Kada su datoteke kreirane, držao sam se zahtjeva, iako se u pravilu dodaje id polje, koje je primary key u pravilu.
