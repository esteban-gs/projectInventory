#!/bin/bash
docker rm -f inventory-sqlser
docker run -d --name inventory-sqlser -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=!Passw0rd" -p 1433:1433 -v inventory:/usr mcr.microsoft.com/mssql/server
