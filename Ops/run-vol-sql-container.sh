#!/bin/bash
container_name=inventory-sqlser
volume_name=inventory

echo "."
echo "."
echo -e "\t This script will check if a container with name $container_name exists."
echo "."
echo -e "\t If it doesn't exist, one will be created with a mount to  a volume of name: $volume_name"
echo "."
echo -e "\t If it does exist, it will be started"
echo "."
echo "."
echo "Proceed?: y/n"
read proceed

if [[ $proceed == "y" ]]
then
    echo "You chose: y"
    echo "."
    
    if docker ps --filter "name=$container_name" --filter status=running | grep -Eq $container_name;
    then
        echo "."
        echo -e "\t Container with name $container_name exists and is running. You're all good!"
        echo "."
    elif docker ps -a --filter "name=$container_name" --filter status=paused | grep -Eq $container_name;
    then
        echo "."
        echo -e "\t  Container with name $container_name was paused. Starting"
        docker unpause $container_name;
        echo "."
    elif docker ps -a --filter "name=$container_name" --filter 'exited=255' | grep -Eq $container_name ||
    docker ps -a --filter "name=$container_name" --filter 'exited=0' | grep -Eq $container_name;
    then
        echo "."
        echo -e "\t  Container with name $container_name was stopped. Starting"
        docker start $container_name;
        echo "."
        
    elif docker container inspect $container_name | grep -Eq "No such container";
    then
        docker run -d --name $container_name -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=!Passw0rd" -p 1433:1433 -v $volume_name:/usr  mcr.microsoft.com/mssql/server
    else
        echo "."
        echo 'Container with name $container_name either DOES NOT exist Or has EXITED with an error';
        echo 'Running Docker ps -a'
        docker logs --tail -1000 inventory-sqlser
    fi
fi
