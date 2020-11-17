#!/bin/bash

top=$(dirname $0)/..

echo $(pwd)

if [ -z "$CONFIG_ENV" -o ! -f "$top/config/$CONFIG_ENV-env.sh" ]; then
    echo "\$CONFIG_ENV is not set or does not match one of the available configurations"
    exit 1
fi

echo "Loading $CONFIG_ENV config"
source "$top/config/$CONFIG_ENV-env.sh"

echo "Running database migrations"
set -e # Stop here if there is a failure
node_modules/.bin/sequelize db:migrate
set +e # Resume of no error occurs

echo "Starting the application"
exec node src/server.js 2>&1 #Redirect errors to stdout
