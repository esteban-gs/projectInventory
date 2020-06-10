FROM mcr.microsoft.com/dotnet/core/sdk:3.1-bionic AS build-env
WORKDIR /app

# Copy everything else and build
COPY . ./

# Need to configure upgrade TLS, per MS SQL requirements 
# See: https://github.com/dotnet/SqlClient/issues/222#issuecomment-535941637
RUN sed -i 's/DEFAULT@SECLEVEL=2/DEFAULT@SECLEVEL=1/g' /etc/ssl/openssl.cnf
RUN sed -i 's/MinProtocol = TLSv1.2/MinProtocol = TLSv1/g' /etc/ssl/openssl.cnf
RUN sed -i 's/DEFAULT@SECLEVEL=2/DEFAULT@SECLEVEL=1/g' /usr/lib/ssl/openssl.cnf
RUN sed -i 's/MinProtocol = TLSv1.2/MinProtocol = TLSv1/g' /usr/lib/ssl/openssl.cnf
RUN dotnet publish "Inventory.Web/Inventory.Web.csproj" -c Release -o out

# Build runtime image
FROM mcr.microsoft.com/dotnet/core/aspnet:3.1-bionic
WORKDIR /app
COPY --from=build-env /app/out .
COPY --from=build-env /app/Infrastructure ./Infrastructure
ENTRYPOINT ["dotnet", "Inventory.Web.dll"]



# FROM mcr.microsoft.com/dotnet/core/aspnet:3.1 AS base
# WORKDIR /app
# COPY  ./Infrastructure/deviceCategory.json Infrastructure
# COPY  ./Infrastructure/deviceMakers.json Infrastructure
# COPY  ./Infrastructure/devices.json Infrastructure
# COPY  ./Infrastructure/employees.json Infrastructure
# COPY  ./Infrastructure/employeesDevices.json Infrastructure

# COPY  ./Inventory.Web/appsettings.json Inventory.Web

# EXPOSE 80
# EXPOSE 443

# FROM mcr.microsoft.com/dotnet/core/sdk:3.1 AS build
# WORKDIR /src
# COPY . .
# RUN dotnet restore
# WORKDIR "/src"
# RUN ["dotnet", "build"] -c Release -o /app/build

# FROM build AS publish
# RUN dotnet publish "src/Inventory.Web/Inventory.Web.csproj" -c Release -o /app/publish

# FROM base AS final
# WORKDIR /app
# COPY --from=publish /app/publish /app/Inventory.Web
# ENTRYPOINT ["dotnet", "Inventory.Web.dll"]
