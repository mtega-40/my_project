@echo off
echo Setting up Farm Management Database...

"C:\Program Files\PostgreSQL\18\bin\psql.exe" -U farm_user -h localhost -d farm_management -f "C:\Users\user\Desktop\projects\project 4\database_setup.sql"

echo Database setup complete!
pause