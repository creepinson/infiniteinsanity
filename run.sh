
res "$(bash -c 'npm run start')" | tee >(head -n1) | grep -i "err" $res >> log.txt
