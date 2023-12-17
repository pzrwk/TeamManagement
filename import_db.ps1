# Variables
$DB_NAME = "TeamManagement"
$DB_USER = "postgres"
$DB_PASSWORD = "password"
$DB_HOST = "localhost"
$DB_PORT = "5432"

# Find the psql executable
$psql = Get-ChildItem -Path 'C:\Program Files\PostgreSQL\' -Filter psql.exe -Recurse -ErrorAction SilentlyContinue | Select-Object -First 1 -ExpandProperty FullName

if ($null -eq $psql) {
    Write-Error "Could not find psql.exe. Please ensure PostgreSQL is installed."
    exit 1
}

# Create the database
$env:PGPASSWORD = $DB_PASSWORD
& $psql -h $DB_HOST -U $DB_USER -p $DB_PORT -c "CREATE DATABASE $DB_NAME;"

# Unset the PGPASSWORD variable
Remove-Item Env:\PGPASSWORD