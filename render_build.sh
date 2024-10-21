#!/usr/bin/env bash
# exit on error
set -o errexit

npm install
npm run build

pipenv install

flask run --host=0.0.0.0 --port=3001
