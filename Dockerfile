FROM node:12.16.1-alpine As ui-builder

WORKDIR /app

COPY ./Client ./Client

RUN cd Client \
    && npm install \
    && npm install -g @angular/cli@8.3.8 \
    && ng build --prod

FROM mcr.microsoft.com/dotnet/core/sdk:3.1-bionic AS build-env
WORKDIR /app

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

# COPY ./conf.d/https /https/

COPY --from=build-env /app/out .
COPY --from=ui-builder /app/Client/dist ./Client/dist
COPY --from=build-env /app/Infrastructure ./Infrastructure

ENTRYPOINT ["dotnet", "Inventory.Web.dll"]
