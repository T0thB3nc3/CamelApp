# Mini Teve Nyilvántartó (Mini Camel Registry)

Ez egy full-stack tesztfeladat, amely egy teve-nyilvántartó rendszert valósít meg. A projekt egy ASP.NET Core Minimal API backend applikációból és egy Angular frontend appból áll.

## 1. Funkciók
- **Teljes CRUD**: Tevék listázása, rögzítése, szerkesztése és törlése.
- **Dinamikus Adatok**: Tevék nevének, púpszámának és színének kezelése.
- **Validáció**: Reactive Forms alapú validáció frontend oldalon (név min. 3 karakter, púpok száma 1-2), modellszintű validáció és típusbiztosítás backend oldalon.
- **Vizuális visszajelzés**: Bootstrap alapú reszponzív felület hibaüzenetekkel és validációs kiemelésekkel.
- **Etetés (Extra funkció)**: "Etetés" gomb, amely azonnal frissíti az adott teve utolsó etetési időpontját a táblázatban (és az adatbázisban).

## 2. Alkalmazott Technológiák

### Backend
- **Keretrendszer**: .NET 9 (Minimal API)
- **Adatbázis**: SQLite (Entity Framework Core-ral)
- **Dokumentáció**: Swagger / OpenAPI
- **Tesztelés**: xUnit

### Frontend
- **Keretrendszer**: Angular 21 (Standalone komponensek)
- **Stílus**: Bootstrap 5
- **Adatkezelés**: RxJS, HttpClient
- **Tesztelés**: Jasmine

## Projekt Felépítése
- `/Backend`: Az API projekt, a Solution fájl és a tesztprojekt. Itt található a `camels.db` adatbázis fájl is.
- `/Frontend`: Az Angular webalkalmazás forráskódja.

## 3. Telepítés és Futtatás

### 1. Backend indítása
A backend kiszolgálja az API végpontokat és kezeli az SQLite adatbázist.
1. Navigálj a `Backend` mappába (ahol a `.csproj` vagy `.sln` fájl található):
   ```bash
   cd Backend/CamelRegistry
   ```
2. Állítsd helyre a csomagokat és futtasd az alkalmazást:
   ```bash
   dotnet restore
   dotnet run
   ```
*Az API alapértelmezetten a https://localhost:7249 címen indul el. A futás után a Swagger UI-t a https://localhost:7249/swagger címen ellenőrizheted.*

### 2. Frontend indítása
A frontend biztosítja a felhasználói felületet.
1. Navigálj a `Frontend` mappába, és telepítsd a szükséges csomagokat:
```bash
  cd Frontend/CamelFrontend
  npm install
```
2. Indítsd el a fejlesztői servert:
```bash
ng serve
```
4. Nyisd meg a böngészőt a következő címen: http://localhost:4200

## 4. Tesztelés
- Backend: Futtasd a `dotnet test` (xUnit) parancsot a Backend mappájában az automatizált xUnit tesztek futtatásához.
- Frontend: Futtasd a `ng test` (Jasmine) parancsot a Frontend mappájában a komponens- és validációs tesztek futtatásához.

## Megjegyzés

Az `Backend` mappa tartalmaz egy előre definiált `camels.db` fájlt, amiben mintaadatok szerepelnek, kizárólag szemléltetési céllal. A fájl eltávolítása után a program egy üres adatbázis fájl-t hoz létre, amelyben ezek az adatok már nem szerepelnek. A helyi tesztfuttatáshoz a CORS policy be lett állítva az alapértelmezett címre(`localhost:4200`).
