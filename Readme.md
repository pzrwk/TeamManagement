#### To start the application:
1. Using Visual studio
    1. Make sure you have PostgreSQL & Visual Studio installed
    2. Execute ./import_db.ps1 (if not possible due to execution policy, open console with administrator priviliges and execute `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser`)
    3. Click `Start` in Visual Studio
    4. Application should start on https://localhost:5173/ with empty database, click `Zaimportuj członka zespołu` or `Dodaj członka zespołu` to add new member

2. Using `dotnet run`
    1. Go to the root solution directory
    2. Execute `dotnet run -p TeamManagement.Server`
    3. Application should start on https://localhost:5173/ with empty database, click `Zaimportuj członka zespołu` or `Dodaj członka zespołu` to add new member