### Build Project
This project support build for any os.
```shell
# handle import package version
go mod init client
go mod tidy

# build
GOOS={$YOUR_SYSTEM} GOARCH={$YOUR_CPU} go build -o {$EXE_FILE_NAME} -ldflags '-w -s' ./*.go
# run
./{$EXE_FILE_NAME}

# test build for arm linux device
GOOS=linux GOARCH=arm64 go build -o client -ldflags '-w -s' ./*.go
```

### Use it
You need to change the config.json before run it, make sure you split mqtt and sql server.

### Problem & Log
It will save log auto, check the log to help you debug.