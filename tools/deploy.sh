#!/bin/bash

echo "Start deploy"
ssh -tq root@88.198.50.217 "cd /data/explorer && bash deploy_front.sh"
echo "Deployed Successfully!"

exit 0
