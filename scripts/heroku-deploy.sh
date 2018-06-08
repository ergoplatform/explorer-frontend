#!/bin/bash
heroku container:login
heroku container:push web -a $HEROKU_APP_NAME
heroku container:release web -a $HEROKU_APP_NAME